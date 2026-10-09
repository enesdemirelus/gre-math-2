"use client";
// Interactive explorers for section 2.3 Solving Linear Equations.

import { useState } from "react";
import { Tex } from "@/components/Tex";

const r2 = (n: number) => Math.round(n * 100) / 100;

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

/** Exact fraction num/den as TeX (den may be negative). */
function fracTex(num: number, den: number): string {
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  if (d === 1) return `${n}`;
  return n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`;
}

/** A multiple of 1/2 (given as twice its value, an integer) as TeX. */
const half = (twice: number) => fracTex(twice, 2);

/** TeX for y = m x + b where m = M/2, b = B/2. */
function lineTex(M: number, B: number): string {
  let s = "y = ";
  if (M === 0) s += "";
  else if (M === 2) s += "x";
  else if (M === -2) s += "-x";
  else s += `${half(M)}x`;
  if (B === 0) return M === 0 ? s + "0" : s;
  if (M === 0) return s + half(B);
  return s + (B > 0 ? ` + ${half(B)}` : ` - ${half(-B)}`);
}

/* ------------------------------------------------------------------ */
/* Two-line system explorer                                            */
/* ------------------------------------------------------------------ */

const PRESETS: { name: string; v: [number, number, number, number] }[] = [
  { name: "Lines cross", v: [2, -2, -1, 4] },
  { name: "Parallel", v: [1, 4, 1, -2] },
  { name: "Same line", v: [-3, 2, -3, 2] },
];

export function SystemExplorer() {
  // slopes and intercepts stored as twice their value (steps of 0.5)
  const [m1, setM1] = useState(2);
  const [b1, setB1] = useState(-2);
  const [m2, setM2] = useState(-1);
  const [b2, setB2] = useState(4);

  const S = 300;
  const pad = 10;
  const R = 6; // window is [-6, 6] x [-6, 6]
  const X = (x: number) => r2(pad + ((x + R) / (2 * R)) * S);
  const Y = (y: number) => r2(pad + ((R - y) / (2 * R)) * S);

  const seg = (M: number, B: number): [number, number, number, number] | null => {
    const m = M / 2;
    const b = B / 2;
    let lo = -R;
    let hi = R;
    if (m !== 0) {
      const xa = (-R - b) / m;
      const xb = (R - b) / m;
      lo = Math.max(lo, Math.min(xa, xb));
      hi = Math.min(hi, Math.max(xa, xb));
    }
    if (hi <= lo) return null;
    return [X(lo), Y(m * lo + b), X(hi), Y(m * hi + b)];
  };

  const sameSlope = m1 === m2;
  const same = sameSlope && b1 === b2;
  // intersection: (m1 - m2) x = b2 - b1  (all values doubled, so the 2s cancel in x)
  const xNum = b2 - b1;
  const xDen = m1 - m2; // x = xNum / xDen
  const ix = sameSlope ? 0 : xNum / xDen;
  const iy = sameSlope ? 0 : ((m1 / 2) * ix + b1 / 2);
  // y exactly: y = m1 x + b1 = (m1/2)(xNum/xDen) + b1/2 = (m1*xNum + b1*xDen) / (2 xDen)
  const yNum = m1 * xNum + b1 * xDen;
  const yDen = 2 * xDen;
  const inView = !sameSlope && Math.abs(ix) <= R && Math.abs(iy) <= R;

  const s1 = seg(m1, b1);
  const s2 = seg(m2, b2);

  const grid: number[] = [];
  for (let t = -R; t <= R; t++) grid.push(t);

  const slider = (label: string, val: number, set: (n: number) => void, sym: string) => (
    <label style={{ display: "block" }}>
      {label} <Tex tex={`${sym} = ${half(val)}`} />
      <input type="range" style={{ width: "100%" }} min={-8} max={8} step={1} value={val} onChange={(e) => set(Number(e.target.value))} />
    </label>
  );

  // elimination: subtract the equations y = m1 x + b1 and y = m2 x + b2
  const coef = fracTex(m1 - m2, 2);
  const rhs = fracTex(b2 - b1, 2);
  const minus = (p: number, q: number) => `${half(p)} - ${q < 0 ? `(${half(q)})` : half(q)}`;
  const elimTex = `0 = (${minus(m1, m2)})x + (${minus(b1, b2)}) \\;\\Longrightarrow\\; ${
    sameSlope ? `0 = ${fracTex(b1 - b2, 2)}` : `${coef === "1" ? "" : coef === "-1" ? "-" : coef}x = ${rhs}`
  }`;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 ${S + 2 * pad} ${S + 2 * pad}`} width={300} style={{ maxWidth: "100%" }} role="img" aria-label="Two lines in the xy-plane">
        {grid.map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={Y(-R)} x2={X(t)} y2={Y(R)} className="dg-line dg-thin" style={{ opacity: t === 0 ? 1 : 0.15 }} />
            <line x1={X(-R)} y1={Y(t)} x2={X(R)} y2={Y(t)} className="dg-line dg-thin" style={{ opacity: t === 0 ? 1 : 0.15 }} />
          </g>
        ))}
        <text x={X(R) - 4} y={Y(0) - 6} className="dg-label" textAnchor="end">
          x
        </text>
        <text x={X(0) + 6} y={Y(R) + 14} className="dg-label">
          y
        </text>
        {s1 && <line x1={s1[0]} y1={s1[1]} x2={s1[2]} y2={s1[3]} className="dg-line" style={same ? { strokeWidth: 6, opacity: 0.35 } : { strokeWidth: 2.2 }} />}
        {s2 && <line x1={s2[0]} y1={s2[1]} x2={s2[2]} y2={s2[3]} className="dg-accent" style={same ? { strokeDasharray: "7 5" } : undefined} />}
        {inView && (
          <g>
            <circle cx={X(ix)} cy={Y(iy)} r={8} className="dg-accent" />
            <circle cx={X(ix)} cy={Y(iy)} r={3.5} className="dg-point" />
          </g>
        )}
      </svg>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => {
              setM1(p.v[0]);
              setB1(p.v[1]);
              setM2(p.v[2]);
              setB2(p.v[3]);
            }}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.4rem", width: "100%", maxWidth: 420, gridTemplateColumns: "1fr 1fr", columnGap: "1rem" }}>
        <div>
          <div style={{ fontWeight: 600 }}>Line 1 (black)</div>
          {slider("slope", m1, setM1, "m_1")}
          {slider("y-intercept", b1, setB1, "b_1")}
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>Line 2 (accent)</div>
          {slider("slope", m2, setM2, "m_2")}
          {slider("y-intercept", b2, setB2, "b_2")}
        </div>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex tex={`\\begin{aligned} &${lineTex(m1, b1)} \\\\ &${lineTex(m2, b2)} \\end{aligned}`} />
        </div>
        <div>
          Subtract the equations (elimination): <Tex tex={elimTex} />
        </div>
        <div>
          {same ? (
            <span>
              <strong>Infinitely many solutions.</strong> Elimination leaves <Tex tex="0 = 0" />, which is always true: the two equations describe the same line, and every point on it solves both.
            </span>
          ) : sameSlope ? (
            <span>
              <strong>No solution.</strong> Elimination leaves <Tex tex={`0 = ${fracTex(b1 - b2, 2)}`} />, which is false. Equal slopes with different intercepts: the lines are parallel and never meet.
            </span>
          ) : (
            <span>
              <strong>Exactly one solution:</strong> <Tex tex={`(x, y) = \\left(${fracTex(xNum, xDen)},\\ ${fracTex(yNum, yDen)}\\right)`} />
              {!inView && " (outside the visible grid)"}. Different slopes, so the lines cross at exactly one point.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "2-3-linear-equations/system-explorer": SystemExplorer,
};
