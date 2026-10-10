"use client";
// Interactive explorers for section 3.4 Quadrilaterals.

import { useState } from "react";
import { Tex } from "@/components/Tex";

const r2 = (n: number) => Math.round(n * 100) / 100;
const fmt = (n: number) => {
  const s = (Math.round(n * 100) / 100).toString();
  return s;
};

/* ------------------------------------------------------------------ */
/* Fixed-perimeter rectangles                                           */
/* ------------------------------------------------------------------ */

export function PerimeterExplorer() {
  const [P, setP] = useState(24);
  const [len, setLen] = useState(9);
  const half = P / 2;
  const l = Math.min(len, half - 0.5);
  const w = half - l;
  const area = l * w;
  const side = P / 4;
  const maxArea = side * side;
  const d = Math.abs(l - side);

  // drawing scale: the longest possible side (half-0.5) maps to 220 px
  const scale = 220 / (half - 0.5);
  const W = l * scale;
  const H = w * scale;
  const x0 = 20;
  const y0 = 20;
  const sq = side * scale;
  const isSquare = Math.abs(l - w) < 1e-9;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox="0 0 270 250" width={270} style={{ maxWidth: "100%" }} role="img" aria-label={`Rectangle ${fmt(l)} by ${fmt(w)}`}>
        <rect x={x0} y={y0} width={sq} height={sq} className="dg-thin dg-dashed" fill="none" />
        <rect x={x0} y={y0} width={W} height={H} className={isSquare ? "dg-accent-fill" : "dg-fill"} />
        <rect x={x0} y={y0} width={W} height={H} className={isSquare ? "dg-accent" : "dg-line"} />
        <text x={x0 + W / 2} y={y0 + H + 16} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {fmt(l)}
        </text>
        <text x={x0 + W + 12} y={y0 + H / 2} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {fmt(w)}
        </text>
        <text x={135} y={238} className="dg-text" textAnchor="middle" dominantBaseline="central">
          dashed: the square with the same perimeter
        </text>
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Perimeter <Tex tex={`P = ${P}`} />
          <input
            type="range"
            style={{ width: "100%" }}
            min={12}
            max={40}
            step={4}
            value={P}
            onChange={(e) => {
              const np = Number(e.target.value);
              setP(np);
              setLen(Math.min(len, np / 2 - 0.5));
            }}
          />
        </label>
        <label>
          Length <Tex tex={`\\ell = ${fmt(l)}`} />
          <input type="range" style={{ width: "100%" }} min={0.5} max={half - 0.5} step={0.5} value={l} onChange={(e) => setLen(Number(e.target.value))} />
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex tex={`w = \\frac{P}{2} - \\ell = ${half} - ${fmt(l)} = ${fmt(w)}`} />
        </div>
        <div>
          <Tex tex={`A = \\ell w = ${fmt(l)}\\cdot ${fmt(w)} = ${fmt(area)}`} />
        </div>
        <div>
          <Tex tex={`\\left(\\frac{P}{4}\\right)^2 - d^2 = ${fmt(maxArea)} - ${fmt(d * d)} = ${fmt(maxArea - d * d)}\\quad (d = |\\ell - ${side}| = ${fmt(d)})`} />
        </div>
        <div>{isSquare ? "A square: the maximum possible area for this perimeter." : `Still ${fmt(maxArea - area)} short of the square's area ${fmt(maxArea)}.`}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shear: same base, same height, same area                             */
/* ------------------------------------------------------------------ */

export function ShearExplorer() {
  const b = 10;
  const h = 6;
  const [s, setS] = useState(3); // horizontal offset of the top side, in units
  const k = 18; // px per unit
  const ox = 50;
  const oy = 190;
  const A: [number, number] = [ox, oy];
  const B: [number, number] = [ox + b * k, oy];
  const C: [number, number] = [ox + (b + s) * k, oy - h * k];
  const D: [number, number] = [ox + s * k, oy - h * k];
  const F: [number, number] = [D[0], oy];
  const slant = Math.hypot(s, h);
  const slant2 = slant; // opposite sides equal
  const perim = 2 * b + 2 * slant;
  const outside = s < 0 || s > b;
  const pts = [A, B, C, D].map((p) => `${r2(p[0])},${r2(p[1])}`).join(" ");
  const footLeft = Math.min(F[0], A[0]);
  const footRight = Math.max(F[0], B[0]);
  const ext = outside ? <line x1={footLeft} y1={oy} x2={footRight} y2={oy} className="dg-line dg-thin dg-dashed" /> : null;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox="0 0 340 230" width={340} style={{ maxWidth: "100%" }} role="img" aria-label="Parallelogram with fixed base and height">
        {ext}
        <polygon points={pts} className="dg-fill" />
        <polygon points={pts} className="dg-line" />
        <line x1={D[0]} y1={D[1]} x2={F[0]} y2={F[1]} className="dg-accent dg-dashed" />
        <text x={(A[0] + B[0]) / 2} y={oy + 18} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {`b = ${b}`}
        </text>
        <text x={F[0] + (s >= 0 ? -12 : 12)} y={(D[1] + F[1]) / 2} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {`h = ${h}`}
        </text>
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Slide the top side <Tex tex={`\\text{offset} = ${fmt(s)}`} />
          <input type="range" style={{ width: "100%" }} min={-4} max={14} step={0.5} value={s} onChange={(e) => setS(Number(e.target.value))} />
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex tex={`\\text{slanted side} = \\sqrt{${fmt(s)}^2 + ${h}^2} \\approx ${fmt(slant2)}`} />
        </div>
        <div>
          <Tex tex={`\\text{perimeter} = 2(${b}) + 2(${fmt(slant)}) \\approx ${fmt(perim)}`} />
        </div>
        <div>
          <Tex tex={`A = bh = ${b}\\cdot ${h} = ${b * h}`} /> (never changes)
        </div>
        <div>{s === 0 ? "Offset 0: a rectangle, so the height is a side." : s === b ? "The foot of the height is exactly the vertex B, the end of the base." : outside ? "The foot of the height lies on the extension of the base." : "The foot of the height lies inside the base."}</div>
      </div>
    </div>
  );
}

export const registry = {
  "3-4-quadrilaterals/perimeter-explorer": PerimeterExplorer,
  "3-4-quadrilaterals/shear-explorer": ShearExplorer,
};
