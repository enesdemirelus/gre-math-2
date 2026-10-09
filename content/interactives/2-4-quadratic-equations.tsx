"use client";
// Interactive explorer for section 2.4 Solving Quadratic Equations:
// sliders for a, b, c -> parabola, b^2 - 4ac, the quadratic formula with numbers, and the real solutions.

import { useState } from "react";
import { Tex } from "@/components/Tex";
import { Axes, parabolaPath, toX, toY, type PlaneWindow } from "../diagrams/2-4-quadratic-equations";

const A_VALUES = [-3, -2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3];

/** Number as TeX, at most 2 decimals, true minus sign. */
function fmt(v: number): string {
  const r = Math.round(v * 100) / 100;
  const s = String(Math.abs(r) < 1e-12 ? 0 : r);
  return s.startsWith("-") ? `-${s.slice(1)}` : s;
}
/** Wrap negatives in parentheses for substitution. */
const par = (v: number) => (v < 0 ? `(${fmt(v)})` : fmt(v));
/** True if v has at most two decimal places (so fmt(v) is exact). */
const exact2 = (v: number) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-9;
const eq = (v: number) => (exact2(v) ? "=" : "\\approx");

const PRESETS: { label: string; a: number; b: number; c: number }[] = [
  { label: "Two solutions", a: 1, b: -1, c: -6 },
  { label: "One solution", a: 1, b: 6, c: 9 },
  { label: "No real solution", a: 1, b: 2, c: 3 },
  { label: "Opens downward", a: -0.5, b: 1, c: 4 },
];

export function QuadraticExplorer() {
  const [ai, setAi] = useState(A_VALUES.indexOf(1));
  const [b, setB] = useState(-1);
  const [c, setC] = useState(-6);
  const a = A_VALUES[ai];

  const w: PlaneWindow = { xmin: -6, xmax: 6, ymin: -6, ymax: 6, u: 22, ox: 18, oy: 22 };
  const D = b * b - 4 * a * c; // exact: a, b, c are multiples of 0.5
  const axisX = -b / (2 * a);
  const vertexY = a * axisX * axisX + b * axisX + c;

  let roots: number[] = [];
  if (D > 0) {
    const s = Math.sqrt(D);
    roots = [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((p, q) => p - q);
  } else if (D === 0) {
    roots = [axisX];
  }

  const count = D > 0 ? "two real solutions" : D === 0 ? "exactly one real solution" : "no real solution";
  const sign = D > 0 ? "> 0" : D === 0 ? "= 0" : "< 0";
  const sqrtD = D >= 0 ? Math.sqrt(D) : NaN;

  const coef = (v: number) => (Math.abs(v) === 1 ? "" : fmt(Math.abs(v)));
  const eqTex =
    `${a === 1 ? "" : a === -1 ? "-" : fmt(a)}x^2` +
    (b === 0 ? "" : ` ${b < 0 ? "-" : "+"} ${coef(b)}x`) +
    (c === 0 ? "" : ` ${c < 0 ? "-" : "+"} ${fmt(Math.abs(c))}`) +
    " = 0";
  const discTex = `b^2 - 4ac = ${par(b)}^2 - 4${par(a)}${par(c)} = ${fmt(D)} ${sign}`;
  const formulaTex =
    `x = \\frac{-${par(b)} \\pm \\sqrt{${fmt(D)}}}{2${par(a)}}` +
    (D >= 0 ? ` = \\frac{${fmt(-b)} \\pm ${exact2(sqrtD) ? fmt(sqrtD) : `\\sqrt{${fmt(D)}}`}}{${fmt(2 * a)}}` : "");
  const rootsTex =
    roots.length === 2
      ? `x ${eq(roots[0])} ${fmt(roots[0])} \\ \\text{ or } \\ x ${eq(roots[1])} ${fmt(roots[1])}`
      : roots.length === 1
        ? `x = ${fmt(roots[0])}`
        : `\\sqrt{${fmt(D)}} \\text{ is not a real number}`;

  const inWin = (x: number) => x >= w.xmin && x <= w.xmax;
  const vertexIn = inWin(axisX) && vertexY >= w.ymin && vertexY <= w.ymax;
  const offscreen = roots.some((r) => !inWin(r));

  return (
    <div style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setAi(A_VALUES.indexOf(p.a));
              setB(p.b);
              setC(p.c);
            }}
            style={{ padding: "0.25rem 0.6rem", borderRadius: 6, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--fg)", cursor: "pointer", fontSize: "0.9rem" }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div style={{ width: "100%", maxWidth: 320 }}>
        <svg viewBox="0 0 310 310" width="100%" role="img" aria-label={`Graph of y = ${eqTex.replace(" = 0", "")}`}>
          <Axes w={w} tickLabels={[-5, 5]} yTickLabels={[-5, 5]} />
          {inWin(axisX) && <line x1={toX(w, axisX)} y1={toY(w, w.ymax)} x2={toX(w, axisX)} y2={toY(w, w.ymin)} className="dg-line dg-thin dg-dashed" />}
          <path d={parabolaPath(w, a, b, c)} className="dg-accent" />
          {vertexIn && <circle cx={toX(w, axisX)} cy={toY(w, vertexY)} r={2.5} className="dg-point" />}
          {roots.filter(inWin).map((r) => (
            <g key={r}>
              <circle cx={toX(w, r)} cy={toY(w, 0)} r={5} className="dg-accent" />
              <circle cx={toX(w, r)} cy={toY(w, 0)} r={2.5} className="dg-point" />
            </g>
          ))}
        </svg>
      </div>
      <div style={{ display: "grid", gap: "0.45rem", width: "100%", maxWidth: 360 }}>
        <label>
          <Tex tex={`a = ${fmt(a)}`} />
          <input type="range" style={{ width: "100%", touchAction: "none" }} min={0} max={A_VALUES.length - 1} step={1} value={ai} onChange={(e) => setAi(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={`b = ${fmt(b)}`} />
          <input type="range" style={{ width: "100%", touchAction: "none" }} min={-6} max={6} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={`c = ${fmt(c)}`} />
          <input type="range" style={{ width: "100%", touchAction: "none" }} min={-6} max={6} step={0.5} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ display: "grid", gap: "0.4rem", width: "100%", maxWidth: 520, overflowX: "auto" }}>
        <div>
          <Tex tex={eqTex} />
        </div>
        <div>
          <Tex tex={discTex} />
        </div>
        <div>
          <Tex tex={formulaTex} />
        </div>
        <div>
          <Tex tex={rootsTex} />
        </div>
        <div style={{ fontSize: "0.95rem" }}>
          <strong>{count[0].toUpperCase() + count.slice(1)}.</strong>{" "}
          <span style={{ color: "var(--muted)" }}>
            {D > 0
              ? "The parabola crosses the x-axis twice."
              : D === 0
                ? "The parabola touches the x-axis only at its vertex."
                : `The parabola stays entirely ${a > 0 ? "above" : "below"} the x-axis.`}{" "}
            {a > 0 ? "a > 0, so it opens upward." : "a < 0, so it opens downward."} The dashed line of symmetry is x = {fmt(axisX).replace("-", "−")}.
            {offscreen ? " (A solution lies outside the window shown.)" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "2-4-quadratic-equations/quadratic-explorer": QuadraticExplorer,
};
