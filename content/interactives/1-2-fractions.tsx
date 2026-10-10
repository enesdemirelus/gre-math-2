"use client";
// Interactive explorer for section 1.2 Fractions: compare two fractions and place them on a number line.

import { useState } from "react";
import { Tex } from "@/components/Tex";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;
const r2 = (n: number) => Math.round(n * 100) / 100;
const fmt = (v: number, k: number) => (v < 0 ? "\u2212" + (-v).toFixed(k) : v.toFixed(k));

/** TeX for n/d (d > 0), with the sign in front. */
function fracTex(n: number, d: number): string {
  if (d === 1) return `${n}`;
  return n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`;
}
function reduced(n: number, d: number): [number, number] {
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <label style={{ display: "grid", gridTemplateColumns: "8.2rem 1fr 2.2rem", alignItems: "center", gap: "0.4rem" }}>
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>
      <input type="range" min={min} max={max} step={1} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ width: "100%" }} />
      <span style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </label>
  );
}

const PAIRS: [number, number, number, number][] = [
  [5, 8, 7, 11],
  [7, 12, 5, 9],
  [-3, 4, -2, 3],
  [11, 12, 12, 13],
  [4, 9, 5, 11],
  [-5, 6, -7, 9],
  [9, 7, 13, 10],
  [3, 10, 4, 13],
  [6, 9, 8, 12],
];

export function FractionCompare({ initial = [5, 8, 7, 11] }: { initial?: [number, number, number, number] }) {
  const [a, setA] = useState(initial[0]);
  const [b, setB] = useState(initial[1]);
  const [c, setC] = useState(initial[2]);
  const [d, setD] = useState(initial[3]);
  const [pick, setPick] = useState(0);

  const x = a / b;
  const y = c / d;
  const L = lcm(b, d);
  const ad = a * d;
  const bc = b * c;
  const rel = ad < bc ? "<" : ad > bc ? ">" : "=";

  // number line range: integers covering 0, both values, at least width 1
  const lo = Math.floor(Math.min(x, y, 0));
  let hi = Math.ceil(Math.max(x, y, 0));
  if (hi - lo < 1) hi = lo + 1;
  const span = hi - lo;
  const X0 = 22;
  const X1 = 318;
  const Y = 62;
  const sc = (X1 - X0) / span;
  const xOf = (v: number) => r2(X0 + (v - lo) * sc);
  // minor ticks at multiples of 1/L if not too dense
  const minorStep = span * L <= 72 ? 1 / L : span * b <= 72 ? 1 / b : null;
  const minor: number[] = [];
  if (minorStep) {
    const count = Math.round(span / minorStep);
    for (let k = 0; k <= count; k++) minor.push(lo + k * minorStep);
  }
  const majors: number[] = [];
  for (let k = lo; k <= hi; k++) majors.push(k);

  const px = xOf(x);
  const py = xOf(y);
  const close = Math.abs(px - py) < 46;

  const [ra, rb] = reduced(a, b);
  const [rc, rd] = reduced(c, d);

  const next = () => {
    const i = (pick + 1) % PAIRS.length;
    const p = PAIRS[i];
    setA(p[0]);
    setB(p[1]);
    setC(p[2]);
    setD(p[3]);
    setPick(i);
  };

  // Labels sit above the line; when the two points are close, they are pushed apart sideways.
  const sep = close ? 26 - Math.abs(px - py) / 2 : 0;
  const dxP = close ? (px <= py ? -sep : sep) : 0;
  const dxQ = -dxP;
  const label = (v: number, n: number, dd: number, dx: number, key: string) => {
    const xx = xOf(v);
    const lx = r2(xx + dx);
    const yy = Y - 38;
    return (
      <g key={key}>
        <line x1={xx} y1={Y - 9} x2={lx} y2={Y - 20} className="dg-line dg-thin" />
        <text x={lx} y={yy - 8} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
          {n < 0 ? `\u2212${-n}` : n}
        </text>
        <line x1={lx - 10} y1={yy} x2={lx + 10} y2={yy} className="dg-line dg-thin" />
        <text x={lx} y={yy + 9} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
          {dd}
        </text>
      </g>
    );
  };

  // Zoomed strip when the two points nearly coincide on the main line.
  const zoom = close && x !== y;
  const mid = (x + y) / 2;
  const half = Math.abs(x - y) * 1.6;
  const ZY = 132;
  const zx = (v: number) => r2(170 + ((v - mid) / half) * 130);
  const zl = mid - half;
  const zr = mid + half;
  const height = zoom ? 178 : 100;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 340 ${height}`} width={340} style={{ maxWidth: "100%" }} role="img" aria-label={`Number line showing ${a}/${b} and ${c}/${d}`}>
        <line x1={X0 - 12} y1={Y} x2={X1 + 12} y2={Y} className="dg-line" />
        {minor.map((v, i) => (
          <line key={`m${i}`} x1={xOf(v)} y1={Y - 3.5} x2={xOf(v)} y2={Y + 3.5} className="dg-line dg-thin" />
        ))}
        {majors.map((v) => (
          <g key={`M${v}`}>
            <line x1={xOf(v)} y1={Y - 7} x2={xOf(v)} y2={Y + 7} className="dg-line" />
            <text x={xOf(v)} y={Y + 20} className="dg-text" textAnchor="middle" dominantBaseline="central">
              {v < 0 ? `−${-v}` : v}
            </text>
          </g>
        ))}
        <circle cx={px} cy={Y} r={5} className="dg-point" />
        <circle cx={py} cy={Y} r={5} className="dg-accent" />
        {label(x, a, b, dxP, "p")}
        {label(y, c, d, dxQ, "q")}
        {zoom && (
          <g>
            <line x1={xOf(zl)} y1={Y + 30} x2={40} y2={ZY - 4} className="dg-line dg-thin dg-dashed" />
            <line x1={xOf(zr)} y1={Y + 30} x2={300} y2={ZY - 4} className="dg-line dg-thin dg-dashed" />
            <line x1={40} y1={ZY} x2={300} y2={ZY} className="dg-line" />
            <line x1={40} y1={ZY - 6} x2={40} y2={ZY + 6} className="dg-line dg-thin" />
            <line x1={300} y1={ZY - 6} x2={300} y2={ZY + 6} className="dg-line dg-thin" />
            <text x={40} y={ZY + 20} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12 }}>
              {fmt(zl, 3)}
            </text>
            <text x={300} y={ZY + 20} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12 }}>
              {fmt(zr, 3)}
            </text>
            <circle cx={zx(x)} cy={ZY} r={5} className="dg-point" />
            <circle cx={zx(y)} cy={ZY} r={5} className="dg-accent" />
            <text x={zx(x)} y={ZY + 18} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
              {`${a < 0 ? "\u2212" + -a : a}/${b}`}
            </text>
            <text x={zx(y)} y={ZY + 18} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
              {`${c < 0 ? "\u2212" + -c : c}/${d}`}
            </text>
            <text x={170} y={ZY - 14} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 11 }}>
              zoomed in
            </text>
          </g>
        )}
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 380 }}>
        <Stepper label="1st numerator" value={a} min={-12} max={12} onChange={setA} />
        <Stepper label="1st denominator" value={b} min={1} max={15} onChange={setB} />
        <Stepper label="2nd numerator" value={c} min={-12} max={12} onChange={setC} />
        <Stepper label="2nd denominator" value={d} min={1} max={15} onChange={setD} />
        <div>
          <button type="button" onClick={next}>
            Next tricky pair
          </button>
        </div>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          Common denominator <Tex tex={`${L}`} />: <Tex tex={`${fracTex(a, b)} = ${fracTex(a * (L / b), L)}`} /> and{" "}
          <Tex tex={`${fracTex(c, d)} = ${fracTex(c * (L / d), L)}`} />
        </div>
        <div>
          Cross products: <Tex tex={`(${a})(${d}) = ${ad}`} /> and <Tex tex={`(${b})(${c}) = ${bc}`} />
        </div>
        <div>
          So <Tex tex={`${fracTex(a, b)} \\; ${rel} \\; ${fracTex(c, d)}`} /> <span style={{ opacity: 0.75 }}>({fmt(x, 4)} vs. {fmt(y, 4)})</span>
        </div>
        {(ra !== a || rc !== c) && (
          <div>
            <Tex tex={`\\text{Lowest terms: } ${fracTex(ra, rb)} \\text{ and } ${fracTex(rc, rd)}`} />
          </div>
        )}
      </div>
    </div>
  );
}

export const registry = {
  "1-2-fractions/fraction-compare": FractionCompare,
};
