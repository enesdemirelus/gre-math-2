"use client";
// Interactive explorer for section 4.4 Probability: exact probability vs. simulated frequency.

import { useState } from "react";
import { Tex } from "@/components/Tex";

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}
function fracTex(num: number, den: number): string {
  if (num === 0) return "0";
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  return d === 1 ? `${n}` : `\\frac{${n}}{${d}}`;
}

/* ---------------- Two dice ---------------- */

type DiceKey = "sum-eq" | "sum-ge" | "doubles" | "six" | "no-six";
const DICE_LABEL: Record<DiceKey, string> = {
  "sum-eq": "the sum equals s",
  "sum-ge": "the sum is at least s",
  doubles: "doubles (both dice match)",
  six: "at least one die shows 6",
  "no-six": "neither die shows 6",
};
function diceHit(key: DiceKey, s: number, a: number, b: number): boolean {
  switch (key) {
    case "sum-eq":
      return a + b === s;
    case "sum-ge":
      return a + b >= s;
    case "doubles":
      return a === b;
    case "six":
      return a === 6 || b === 6;
    case "no-six":
      return a !== 6 && b !== 6;
  }
}

/* ---------------- Draws from a bag ---------------- */

type DrawKey = "both-red" | "same" | "some-red" | "no-red" | "red-then-blue";
const DRAW_LABEL: Record<DrawKey, string> = {
  "both-red": "both are red",
  same: "both are the same color",
  "some-red": "at least one is red",
  "no-red": "neither is red",
  "red-then-blue": "the first is red and the second is blue",
};
// colors: 0 = red, 1 = blue, 2 = green
function drawHit(key: DrawKey, c1: number, c2: number): boolean {
  switch (key) {
    case "both-red":
      return c1 === 0 && c2 === 0;
    case "same":
      return c1 === c2;
    case "some-red":
      return c1 === 0 || c2 === 0;
    case "no-red":
      return c1 !== 0 && c2 !== 0;
    case "red-then-blue":
      return c1 === 0 && c2 === 1;
  }
}

const COLOR_NAMES = ["red", "blue", "green"];
const COLOR_FILL = ["hsl(0 70% 55%)", "hsl(215 75% 55%)", "hsl(135 55% 42%)"];

export function ProbSimulator() {
  const [mode, setMode] = useState<"dice" | "bag">("bag");
  const [diceEv, setDiceEv] = useState<DiceKey>("sum-eq");
  const [s, setS] = useState(7);
  const [bag, setBag] = useState<[number, number, number]>([4, 3, 2]);
  const [replace, setReplace] = useState(false);
  const [drawEv, setDrawEv] = useState<DrawKey>("both-red");
  const [trials, setTrials] = useState(0);
  const [hits, setHits] = useState(0);

  const reset = () => {
    setTrials(0);
    setHits(0);
  };

  // ---- exact probability by listing all equally likely ordered outcomes ----
  let favorable = 0;
  let possible = 0;
  const balls: number[] = [];
  bag.forEach((cnt, c) => {
    for (let i = 0; i < cnt; i++) balls.push(c);
  });
  if (mode === "dice") {
    for (let a = 1; a <= 6; a++)
      for (let b = 1; b <= 6; b++) {
        possible++;
        if (diceHit(diceEv, s, a, b)) favorable++;
      }
  } else {
    for (let i = 0; i < balls.length; i++)
      for (let j = 0; j < balls.length; j++) {
        if (!replace && i === j) continue;
        possible++;
        if (drawHit(drawEv, balls[i], balls[j])) favorable++;
      }
  }
  const exact = possible ? favorable / possible : 0;

  const run = (m: number) => {
    let h = 0;
    for (let t = 0; t < m; t++) {
      if (mode === "dice") {
        const a = 1 + Math.floor(Math.random() * 6);
        const b = 1 + Math.floor(Math.random() * 6);
        if (diceHit(diceEv, s, a, b)) h++;
      } else {
        const i = Math.floor(Math.random() * balls.length);
        let j = Math.floor(Math.random() * balls.length);
        if (!replace) {
          j = Math.floor(Math.random() * (balls.length - 1));
          if (j >= i) j++;
        }
        if (drawHit(drawEv, balls[i], balls[j])) h++;
      }
    }
    setTrials((t) => t + m);
    setHits((x) => x + h);
  };

  const sim = trials ? hits / trials : 0;
  const total = balls.length;
  const bagOk = total >= 2;
  const barW = 300;

  const pill = (active: boolean) => (active ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined);

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem" }}>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        <button
          type="button"
          aria-pressed={mode === "bag"}
          style={pill(mode === "bag")}
          onClick={() => {
            setMode("bag");
            reset();
          }}
        >
          Draw two from a bag
        </button>
        <button
          type="button"
          aria-pressed={mode === "dice"}
          style={pill(mode === "dice")}
          onClick={() => {
            setMode("dice");
            reset();
          }}
        >
          Roll two dice
        </button>
      </div>

      {mode === "dice" ? (
        <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
          <label>
            Event:{" "}
            <select
              value={diceEv}
              onChange={(e) => {
                setDiceEv(e.target.value as DiceKey);
                reset();
              }}
            >
              {(Object.keys(DICE_LABEL) as DiceKey[]).map((k) => (
                <option key={k} value={k}>
                  {DICE_LABEL[k]}
                </option>
              ))}
            </select>
          </label>
          {(diceEv === "sum-eq" || diceEv === "sum-ge") && (
            <label>
              <Tex tex={`s = ${s}`} />
              <input
                type="range"
                style={{ width: "100%" }}
                min={2}
                max={12}
                value={s}
                onChange={(e) => {
                  setS(Number(e.target.value));
                  reset();
                }}
              />
            </label>
          )}
          <div style={{ fontSize: "0.9em", opacity: 0.85 }}>Two fair six-sided dice: 36 equally likely ordered outcomes.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "0.5rem", maxWidth: 420 }}>
          {([0, 1, 2] as const).map((c) => (
            <label key={c}>
              {COLOR_NAMES[c]} balls: {bag[c]}
              <input
                type="range"
                style={{ width: "100%" }}
                min={c === 2 ? 0 : 1}
                max={8}
                value={bag[c]}
                onChange={(e) => {
                  const nb: [number, number, number] = [...bag];
                  nb[c] = Number(e.target.value);
                  setBag(nb);
                  reset();
                }}
              />
            </label>
          ))}
          <svg viewBox={`0 0 ${Math.max(total, 1) * 22 + 4} 26`} width={Math.min(Math.max(total, 1) * 22 + 4, 380)} role="img" aria-label="Balls in the bag">
            {balls.map((c, i) => (
              <circle key={i} cx={13 + i * 22} cy={13} r={9} fill={COLOR_FILL[c]} className="dg-thin" stroke="currentColor" />
            ))}
          </svg>
          <label>
            Event:{" "}
            <select
              value={drawEv}
              onChange={(e) => {
                setDrawEv(e.target.value as DrawKey);
                reset();
              }}
            >
              {(Object.keys(DRAW_LABEL) as DrawKey[]).map((k) => (
                <option key={k} value={k}>
                  {DRAW_LABEL[k]}
                </option>
              ))}
            </select>
          </label>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button
              type="button"
              aria-pressed={!replace}
              style={pill(!replace)}
              onClick={() => {
                setReplace(false);
                reset();
              }}
            >
              Without replacement
            </button>
            <button
              type="button"
              aria-pressed={replace}
              style={pill(replace)}
              onClick={() => {
                setReplace(true);
                reset();
              }}
            >
              With replacement
            </button>
          </div>
        </div>
      )}

      {mode === "bag" && !bagOk ? (
        <div>Put at least two balls in the bag.</div>
      ) : (
        <>
          <div style={{ display: "grid", gap: "0.35rem" }}>
            <div>
              <Tex tex={`P = \\dfrac{\\text{favorable}}{\\text{possible}} = \\dfrac{${favorable}}{${possible}} = ${fracTex(favorable, possible)} \\approx ${exact.toFixed(4)}`} />
            </div>
            {mode === "bag" && !replace && (
              <div style={{ fontSize: "0.9em", opacity: 0.85 }}>
                Without replacement the {total} balls give {total}·{total - 1} = {possible} ordered pairs (a ball cannot be drawn twice).
              </div>
            )}
            {mode === "bag" && replace && (
              <div style={{ fontSize: "0.9em", opacity: 0.85 }}>
                With replacement the draws are independent: {total}·{total} = {possible} ordered pairs.
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <button type="button" onClick={() => run(1)}>
              +1 trial
            </button>
            <button type="button" onClick={() => run(10)}>
              +10
            </button>
            <button type="button" onClick={() => run(100)}>
              +100
            </button>
            <button type="button" onClick={() => run(1000)}>
              +1000
            </button>
            <button type="button" onClick={reset}>
              Reset
            </button>
          </div>

          <svg viewBox={`0 0 ${barW + 20} 62`} width={barW + 20} style={{ maxWidth: "100%" }} role="img" aria-label="Exact probability versus simulated frequency">
            <text x={0} y={10} className="dg-text" style={{ fontSize: 12 }}>
              exact
            </text>
            <rect x={10} y={14} width={barW} height={10} className="dg-line dg-thin" />
            <rect x={10} y={14} width={barW * exact} height={10} className="dg-accent-fill" />
            <text x={0} y={42} className="dg-text" style={{ fontSize: 12 }}>
              simulated
            </text>
            <rect x={10} y={46} width={barW} height={10} className="dg-line dg-thin" />
            <rect x={10} y={46} width={barW * sim} height={10} className="dg-accent-fill" />
          </svg>
          <div>
            {trials === 0 ? (
              "Run some trials to compare."
            ) : (
              <Tex tex={`\\text{${hits} hits in ${trials} trials} \\;\\Rightarrow\\; \\text{relative frequency} = ${(sim).toFixed(4)} \\quad (\\text{exact } ${exact.toFixed(4)})`} />
            )}
          </div>
          <div style={{ fontSize: "0.9em", opacity: 0.85 }}>
            The simulated frequency wanders for a few trials and settles near the exact probability as the number of trials grows. The exact value is always favorable outcomes divided by possible outcomes, because every ordered outcome listed is equally likely.
          </div>
        </>
      )}
    </div>
  );
}

export const registry = {
  "4-4-probability/prob-simulator": ProbSimulator,
};
