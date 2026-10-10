"use client";
// Interactive explorers for section 4.6 Data Interpretation Examples.

import { useState } from "react";
import { Tex } from "@/components/Tex";
import { BarGraph, LineGraph } from "@/content/diagrams/4-1-presenting-data";

const YEARS = ["2019", "2020", "2021", "2022", "2023"];

interface Case {
  kind: "bar" | "line";
  yMin: number;
  values: number[];
  i: number;
  j: number;
}

function makeCase(rnd: () => number): Case {
  const yMin = [0, 0, 40, 60][Math.floor(rnd() * 4)];
  const values = YEARS.map(() => yMin + 10 + 5 * Math.floor(rnd() * 17));
  let i = Math.floor(rnd() * 5);
  let j = Math.floor(rnd() * 5);
  while (j === i) j = Math.floor(rnd() * 5);
  if (i > j) [i, j] = [j, i];
  return { kind: rnd() < 0.5 ? "bar" : "line", yMin, values, i, j };
}

/** Small deterministic generator for the first (server-rendered) case. */
function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const pctStr = (x: number) => `${x >= 0 ? "+" : "−"}${Math.abs(Math.round(x * 10) / 10)}\\%`;

/* ------------------------------------------------------------------ */
/* Estimation trainer                                                  */
/* ------------------------------------------------------------------ */

export function EstimationTrainer() {
  const [c, setC] = useState<Case>(() => makeCase(seeded(7)));
  const [guess, setGuess] = useState(0);
  const [shown, setShown] = useState(false);
  const [tries, setTries] = useState(0);
  const [close, setClose] = useState(0);

  const vi = c.values[c.i];
  const vj = c.values[c.j];
  const exact = ((vj - vi) / vi) * 100;
  const err = Math.abs(guess - exact);
  const common = { title: "Quantity over five years", categories: YEARS, yMin: c.yMin, yMax: c.yMin + 100, yStep: 20, yMinor: 10 };

  const reveal = () => {
    if (shown) return;
    setShown(true);
    setTries((t) => t + 1);
    if (err <= 5) setClose((k) => k + 1);
  };
  const next = () => {
    setC(makeCase(Math.random));
    setGuess(0);
    setShown(false);
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ maxWidth: 360 }}>
        {c.kind === "bar" ? (
          <BarGraph {...common} series={[{ name: "Value", values: c.values }]} highlight={c.j} />
        ) : (
          <LineGraph {...common} xs={YEARS} series={[{ name: "Value", values: c.values }]} guides={[c.i, c.j]} />
        )}
      </div>
      <p style={{ margin: 0 }}>
        Estimate the percent change from <strong>{YEARS[c.i]}</strong> to <strong>{YEARS[c.j]}</strong>.{" "}
        {c.yMin > 0 && <em>(Careful: the vertical scale is broken and starts at {c.yMin}.)</em>}
      </p>
      <label style={{ display: "grid", gap: 4 }}>
        <span>
          Your estimate: <Tex tex={pctStr(guess)} />
        </span>
        <input type="range" min={-80} max={400} step={5} value={guess} disabled={shown} onChange={(e) => setGuess(Number(e.target.value))} aria-label="Estimated percent change" />
      </label>
      {shown && (
        <div>
          <Tex display tex={String.raw`\frac{${vj} - ${vi}}{${vi}} \times 100\% = ${pctStr(exact)}`} />
          <p style={{ margin: 0 }}>
            {err <= 5 ? "Within 5 points: good enough for an estimation question." : `Off by about ${Math.round(err)} percentage points. Re-read both values and use the start year as the base.`}
          </p>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <button onClick={reveal} disabled={shown}>
          Reveal exact value
        </button>
        <button onClick={next}>New graph</button>
        <span style={{ fontSize: 13 }}>
          Within 5 points: {close} of {tries}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Same percent, different totals                                      */
/* ------------------------------------------------------------------ */

export function BaseTrap() {
  const [p1, setP1] = useState(30);
  const [t1, setT1] = useState(400);
  const [p2, setP2] = useState(35);
  const [t2, setT2] = useState(300);
  const n1 = (p1 * t1) / 100;
  const n2 = (p2 * t2) / 100;
  const verdict = n1 > n2 ? "Year 1 has the larger count." : n1 < n2 ? "Year 2 has the larger count." : "The counts are equal.";
  const share = p1 === 0 ? null : ((p2 - p1) / p1) * 100;
  const total = ((t2 - t1) / t1) * 100;
  const count = n1 === 0 ? null : ((n2 - n1) / n1) * 100;
  const Row = ({ label, p, setP, t, setT, n }: { label: string; p: number; setP: (v: number) => void; t: number; setT: (v: number) => void; n: number }) => (
    <div style={{ display: "grid", gap: 4 }}>
      <strong>{label}</strong>
      <label style={{ display: "grid", gap: 2 }}>
        <span>Percent: {p}%</span>
        <input type="range" min={0} max={100} step={1} value={p} onChange={(e) => setP(Number(e.target.value))} aria-label={`${label} percent`} />
      </label>
      <label style={{ display: "grid", gap: 2 }}>
        <span>Total: {t}</span>
        <input type="range" min={100} max={1000} step={10} value={t} onChange={(e) => setT(Number(e.target.value))} aria-label={`${label} total`} />
      </label>
      <Tex tex={String.raw`${p}\% \times ${t} = ${Math.round(n * 100) / 100}`} />
    </div>
  );
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Row label="Year 1" p={p1} setP={setP1} t={t1} setT={setT1} n={n1} />
      <Row label="Year 2" p={p2} setP={setP2} t={t2} setT={setT2} n={n2} />
      <p style={{ margin: 0 }}>
        <strong>{verdict}</strong>
      </p>
      <p style={{ margin: 0, fontSize: 14 }}>
        Share: {p2 - p1 >= 0 ? "+" : "−"}
        {Math.abs(p2 - p1)} percentage points{share !== null ? ` (${Math.round(share * 10) / 10}% change of the share)` : ""}. Total changed by {Math.round(total * 10) / 10}%. Count changed by{" "}
        {count !== null ? `${Math.round(count * 10) / 10}%` : "an undefined percent (Year 1 count is 0)"}.
      </p>
    </div>
  );
}

export const registry = {
  "4-6-data-interpretation/EstimationTrainer": EstimationTrainer,
  "4-6-data-interpretation/BaseTrap": BaseTrap,
};
