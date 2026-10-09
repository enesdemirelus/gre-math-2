"use client";
// Interactive explorer for section 1.6 Ratio: a bar ("parts") model for a : b : c.

import { useState, type CSSProperties } from "react";
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
  return a;
}

function frac(n: number, d: number): string {
  const g = gcd(n, d) || 1;
  const nn = n / g;
  const dd = d / g;
  return dd === 1 ? `${nn}` : `\\frac{${nn}}{${dd}}`;
}

/** Exact value of T * p / S as TeX (integer, or fraction). */
function exact(T: number, p: number, S: number): string {
  return frac(T * p, S);
}

const NAMES = ["A", "B", "C"];
const FILLS: { className: string; style?: CSSProperties }[] = [
  { className: "dg-accent-fill" },
  { className: "dg-fill" },
  { className: "dg-accent-fill", style: { fillOpacity: 0.42 } },
];

export function RatioExplorer() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(5);
  const [c, setC] = useState(4);
  const [T, setT] = useState(96);

  const parts = [a, b, c].filter((_, i) => i < 2 || c > 0);
  const S = parts.reduce((s, p) => s + p, 0);
  const g = parts.reduce((x, p) => gcd(x, p), 0);
  const reduced = parts.map((p) => p / g);
  const Sr = S / g; // sum of the reduced ratio
  const whole = T % Sr === 0;
  const unit = T / S;

  // bar geometry
  const W = 340;
  const pad = 10;
  const u = (W - 2 * pad) / S;
  const top = 30;
  const h = 34;
  let start = 0;

  const ratioTex = parts.join(" : ");
  const reducedTex = reduced.join(" : ");
  const lower = Math.floor(T / Sr) * Sr;
  const upper = lower + Sr;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 ${W} 100`} width={W} style={{ maxWidth: "100%" }} role="img" aria-label={`Bar model for the ratio ${parts.join(" to ")} with total ${T}`}>
        {parts.map((p, gi) => {
          const x0 = r2(pad + start * u);
          const x1 = r2(pad + (start + p) * u);
          const cells = Array.from({ length: p }, (_, k) => start + k);
          start += p;
          const f = FILLS[gi];
          const showText = u >= 26;
          return (
            <g key={gi}>
              {cells.map((k) => (
                <rect key={k} x={r2(pad + k * u)} y={top} width={r2(u)} height={h} className={f.className} style={f.style} />
              ))}
              {cells.map((k) => (
                <rect key={`o${k}`} x={r2(pad + k * u)} y={top} width={r2(u)} height={h} className="dg-line dg-thin" />
              ))}
              {showText &&
                cells.map((k) => (
                  <text key={`t${k}`} x={r2(pad + (k + 0.5) * u)} y={top + h / 2 + 4} className="dg-text" textAnchor="middle" style={{ fontSize: 11 }}>
                    {Number.isInteger(unit) ? unit : r2(unit)}
                  </text>
                ))}
              <rect x={x0} y={top} width={r2(x1 - x0)} height={h} className="dg-line" />
              <text x={r2((x0 + x1) / 2)} y={top - 9} className="dg-label" textAnchor="middle" style={{ fontSize: 14 }}>
                {NAMES[gi]}
              </text>
              <text x={r2((x0 + x1) / 2)} y={top + h + 20} className="dg-text" textAnchor="middle" style={{ fontSize: 13, fontWeight: 600 }}>
                {Number.isInteger((T * p) / S) ? (T * p) / S : r2((T * p) / S)}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.4rem", width: "100%", maxWidth: 360 }}>
        <label>
          <Tex tex={`A:\\ ${a}\\text{ parts}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={12} step={1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={`B:\\ ${b}\\text{ parts}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={12} step={1} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={c > 0 ? `C:\\ ${c}\\text{ parts}` : `C:\\ \\text{off (two-term ratio)}`} />
          <input type="range" style={{ width: "100%" }} min={0} max={12} step={1} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={`\\text{Total} = ${T}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={180} step={1} value={T} onChange={(e) => setT(Number(e.target.value))} />
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex
            tex={
              g > 1
                ? `${ratioTex} \\;=\\; ${reducedTex} \\quad (\\text{divide by } ${g})`
                : `${ratioTex} \\quad (\\text{already in lowest terms})`
            }
          />
        </div>
        <div>
          <Tex tex={`\\text{one part} = \\frac{${T}}{${S}} = ${frac(T, S)}${Number.isInteger(unit) ? "" : ` \\approx ${r2(unit)}`}`} />
        </div>
        <div>
          <Tex tex={parts.map((p, i) => `${NAMES[i]} = ${p}\\cdot ${frac(T, S)} = ${exact(T, p, S)}`).join(",\\quad ")} />
        </div>
        <div>
          <Tex tex={parts.map((p, i) => `\\frac{${NAMES[i]}}{\\text{total}} = ${frac(p, S)}`).join(",\\quad ")} />
        </div>
        <div style={{ fontSize: 14, color: whole ? "var(--good)" : "var(--bad)" }}>
          {whole
            ? `Whole-number counts: the total ${T} is a multiple of ${Sr} (the sum of the reduced ratio ${reduced.join(" : ")}).`
            : `Not whole numbers: for whole-number counts the total must be a multiple of ${Sr}. Nearest possible totals: ${lower > 0 ? `${lower} and ` : ""}${upper}.`}
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "1-6-ratio/ratio-explorer": RatioExplorer,
};
