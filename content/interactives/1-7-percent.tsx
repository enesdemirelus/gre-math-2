"use client";
// Interactive explorers for section 1.7 Percent.

import { useState } from "react";
import { Tex } from "@/components/Tex";

/** Formats a number with at most `d` decimals, trimming trailing zeros. */
function fmt(n: number, d = 2): string {
  const s = (Math.round(n * 10 ** d) / 10 ** d).toFixed(d);
  return s.includes(".") ? s.replace(/0+$/, "").replace(/\.$/, "") : s;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a || 1;
}

/** Reduced fraction n/d as TeX (n may be negative). */
function frac(n: number, d: number): string {
  const g = gcd(n, d);
  const nn = n / g;
  const dd = d / g;
  if (dd === 1) return `${nn}`;
  return nn < 0 ? `-\\frac{${-nn}}{${dd}}` : `\\frac{${nn}}{${dd}}`;
}

/** Percent value as TeX: exact if it terminates within 2 decimals, otherwise "\approx". */
function pctTex(p: number): string {
  const r = Math.round(p * 100) / 100;
  const exact = Math.abs(r - p) < 1e-9;
  return `${exact ? "=" : "\\approx"} ${fmt(p, 2)}\\%`;
}

const signed = (n: number) => (n > 0 ? `+${n}` : `${n}`);

const rowStyle = { display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 } as const;

/* ------------------------------------------------------------------ */
/* Percent change calculator: old -> new, with the base made explicit  */
/* ------------------------------------------------------------------ */

export function PercentChangeCalculator() {
  const [oldV, setOld] = useState(80);
  const [newV, setNew] = useState(100);

  const diff = newV - oldV;
  const fwd = (diff / oldV) * 100;
  const back = (-diff / newV) * 100;
  const ratio = (newV / oldV) * 100;

  // bar drawing
  const W = 300;
  const maxV = Math.max(oldV, newV) * 1.05;
  const x0 = 46;
  const scale = (W - x0 - 10) / maxV;
  const bar = (v: number) => Math.max(1, v * scale);
  const word = (p: number) => (Math.abs(p) < 1e-9 ? "(no change)" : `(a ${fmt(Math.abs(p))}% ${p > 0 ? "increase" : "decrease"})`);

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 ${W} 112`} width={W} style={{ maxWidth: "100%" }} role="img" aria-label={`Old value ${oldV}, new value ${newV}`}>
        <text x={x0 - 6} y={30} className="dg-text" textAnchor="end" dominantBaseline="central">
          old
        </text>
        <rect x={x0} y={18} width={bar(oldV)} height={24} className="dg-fill dg-line" />
        <text x={x0 - 6} y={76} className="dg-text" textAnchor="end" dominantBaseline="central">
          new
        </text>
        <rect x={x0} y={64} width={bar(Math.min(oldV, newV))} height={24} className="dg-fill dg-line" />
        {diff !== 0 && (
          <rect
            x={x0 + bar(Math.min(oldV, newV))}
            y={64}
            width={bar(Math.abs(diff))}
            height={24}
            className={diff > 0 ? "dg-accent-fill dg-accent" : "dg-accent dg-dashed"}
          />
        )}
        <line x1={x0 + bar(oldV)} y1={10} x2={x0 + bar(oldV)} y2={100} className="dg-line dg-dashed dg-thin" />
        <text x={x0 + bar(oldV)} y={108} className="dg-text" textAnchor="middle" style={{ fontSize: 10 }}>
          base
        </text>
      </svg>
      <div style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Old value (the base) <Tex tex={`= ${oldV}`} />
          <input type="range" style={{ width: "100%" }} min={10} max={400} step={5} value={oldV} onChange={(e) => setOld(Number(e.target.value))} />
        </label>
        <label>
          New value <Tex tex={`= ${newV}`} />
          <input type="range" style={{ width: "100%" }} min={10} max={400} step={5} value={newV} onChange={(e) => setNew(Number(e.target.value))} />
        </label>
      </div>
      <div style={rowStyle}>
        <div>
          <strong>Old → new</strong>, percent change:{" "}
          <Tex tex={`\\frac{${newV} - ${oldV}}{${oldV}} = ${frac(diff, oldV)} ${pctTex(fwd)}`} /> {word(fwd)}
        </div>
        <div>
          <strong>New → old</strong> (trip back), percent change:{" "}
          <Tex tex={`\\frac{${oldV} - ${newV}}{${newV}} = ${frac(-diff, newV)} ${pctTex(back)}`} /> {word(back)}
        </div>
        <div>
          New as a percent <em>of</em> old: <Tex tex={`\\frac{${newV}}{${oldV}} ${pctTex(ratio)}`} />
          {diff !== 0 && (
            <>
              {" "}
              (that is {fmt(Math.abs(fwd))}% {diff > 0 ? "greater than" : "less than"} old)
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Successive change explorer: two changes in a row, starting at 100   */
/* ------------------------------------------------------------------ */

export function SuccessiveChangeExplorer() {
  const [a, setA] = useState(20);
  const [b, setB] = useState(-20);

  const m1 = 1 + a / 100;
  const m2 = 1 + b / 100;
  const v1 = 100 * m1;
  const v2 = v1 * m2;
  const rawNet = v2 - 100; // percent, since start = 100
  const net = Math.abs(rawNet) < 1e-9 ? 0 : rawNet;
  const naive = a + b;
  const gap = (a * b) / 100;

  // chart: three bars, values 0..400
  const W = 300;
  const H = 170;
  const base = 140;
  const top = 14;
  const maxV = Math.max(100, v1, v2) * 1.12;
  const y = (v: number) => base - ((base - top) * v) / maxV;
  const bars = [
    { label: "start", v: 100, x: 56 },
    { label: `${signed(a).replace("-", "−")}%`, v: v1, x: 146 },
    { label: `${signed(b).replace("-", "−")}%`, v: v2, x: 236 },
  ];
  const bw = 50;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} style={{ maxWidth: "100%" }} role="img" aria-label={`100 changed by ${a}% then ${b}% gives ${fmt(v2)}`}>
        <line x1={50} y1={base} x2={W - 10} y2={base} className="dg-line" />
        {bars.map((br, i) => (
          <g key={br.label + i}>
            <rect x={br.x} y={y(br.v)} width={bw} height={base - y(br.v)} className={i === 2 ? "dg-accent-fill dg-accent" : "dg-fill dg-line"} />
            <text x={br.x + bw / 2} y={y(br.v) - 6} className="dg-text" textAnchor="middle">
              {fmt(br.v)}
            </text>
            <text x={br.x + bw / 2} y={base + 16} className="dg-text" textAnchor="middle">
              {br.label}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          First change <Tex tex={`a = ${signed(a)}\\%`} />
          <input type="range" style={{ width: "100%" }} min={-90} max={100} step={1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          Second change <Tex tex={`b = ${signed(b)}\\%`} />
          <input type="range" style={{ width: "100%" }} min={-90} max={100} step={1} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button type="button" onClick={() => { setA(20); setB(-20); }}>
            +20% then −20%
          </button>
          <button type="button" onClick={() => { setA(b); setB(a); }}>
            Swap order
          </button>
          <button type="button" onClick={() => { setA(-20); setB(25); }}>
            −20% then +25%
          </button>
        </div>
      </div>
      <div style={rowStyle}>
        <div>
          <Tex tex={`\\text{net multiplier} = ${fmt(m1, 2)} \\times ${fmt(m2, 2)} = ${fmt(m1 * m2, 4)}`} />
        </div>
        <div>
          <Tex
            tex={`\\text{net change} = ${fmt(m1 * m2, 4)} - 1 = ${net === 0 ? "0" : fmt(net / 100, 4)} \\;\\to\\; ${net === 0 ? "0\\%" : `\\text{a } ${fmt(Math.abs(net), 2)}\\% \\text{ ${net > 0 ? "increase" : "decrease"}}`}`}
          />
        </div>
        <div>
          <Tex tex={`\\text{naive sum } a + b = ${signed(naive)}\\%, \\quad \\text{gap } \\tfrac{ab}{100} = ${fmt(gap, 2)} \\text{ percentage points}`} />
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "1-7-percent/percent-change-calculator": PercentChangeCalculator,
  "1-7-percent/successive-change-explorer": SuccessiveChangeExplorer,
};
