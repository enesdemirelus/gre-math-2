"use client";
// Interactive explorers for section 3.6 Three-Dimensional Figures.

import { useState } from "react";
import { Tex } from "@/components/Tex";

type Pt = [number, number];
const r2 = (n: number) => Math.round(n * 100) / 100;
const poly = (pts: Pt[]) => pts.map((p) => `${r2(p[0])},${r2(p[1])}`).join(" ");

/** Writes sqrt(n) in simplest radical form as TeX. */
function sqrtTex(n: number): string {
  let out = 1;
  let rest = n;
  for (let f = 2; f * f <= rest; f++) {
    while (rest % (f * f) === 0) {
      rest /= f * f;
      out *= f;
    }
  }
  if (rest === 1) return `${out}`;
  return out === 1 ? `\\sqrt{${rest}}` : `${out}\\sqrt{${rest}}`;
}

/* ------------------------------------------------------------------ */
/* Rectangular solid explorer                                           */
/* ------------------------------------------------------------------ */

export function BoxExplorer() {
  const [l, setL] = useState(4);
  const [w, setW] = useState(3);
  const [h, setH] = useState(12);
  const [showDiag, setShowDiag] = useState(true);

  const k = 13;
  const W = w * k;
  const H = h * k;
  const dx = l * k * 0.55;
  const dy = l * k * 0.4;
  const x0 = 24;
  const yb = 262;
  const FBL: Pt = [x0, yb];
  const FBR: Pt = [x0 + W, yb];
  const FTL: Pt = [x0, yb - H];
  const FTR: Pt = [x0 + W, yb - H];
  const BBL: Pt = [x0 + dx, yb - dy];
  const BBR: Pt = [x0 + W + dx, yb - dy];
  const BTL: Pt = [x0 + dx, yb - H - dy];
  const BTR: Pt = [x0 + W + dx, yb - H - dy];

  const V = l * w * h;
  const SA = 2 * (l * w + l * h + w * h);
  const f2 = l * l + w * w;
  const d2 = f2 + h * h;
  const isCube = l === w && w === h;

  const slider = (label: string, tex: string, val: number, set: (n: number) => void) => (
    <label>
      {label} <Tex tex={`${tex} = ${val}`} />
      <input type="range" style={{ width: "100%" }} min={1} max={12} step={1} value={val} onChange={(e) => set(Number(e.target.value))} />
    </label>
  );

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox="0 0 310 280" width={310} style={{ maxWidth: "100%" }} role="img" aria-label={`Rectangular solid ${l} by ${w} by ${h}`}>
        <polygon points={poly([FTL, FTR, FBR, FBL])} className="dg-fill" />
        <line x1={FBL[0]} y1={FBL[1]} x2={BBL[0]} y2={BBL[1]} className="dg-line dg-thin dg-dashed" />
        <line x1={BBL[0]} y1={BBL[1]} x2={BTL[0]} y2={BTL[1]} className="dg-line dg-thin dg-dashed" />
        <line x1={BBL[0]} y1={BBL[1]} x2={BBR[0]} y2={BBR[1]} className="dg-line dg-thin dg-dashed" />
        <polygon points={poly([FTL, FTR, FBR, FBL])} className="dg-line" />
        <polyline points={poly([FTL, BTL, BTR, FTR])} className="dg-line" />
        <line x1={FBR[0]} y1={FBR[1]} x2={BBR[0]} y2={BBR[1]} className="dg-line" />
        <line x1={BTR[0]} y1={BTR[1]} x2={BBR[0]} y2={BBR[1]} className="dg-line" />
        {showDiag && (
          <>
            <line x1={FBL[0]} y1={FBL[1]} x2={BBR[0]} y2={BBR[1]} className="dg-accent dg-thin dg-dashed" />
            <line x1={FBL[0]} y1={FBL[1]} x2={BTR[0]} y2={BTR[1]} className="dg-accent" />
          </>
        )}
        <text x={x0 + W / 2} y={yb + 15} className="dg-label" textAnchor="middle" dominantBaseline="central">
          {`w = ${w}`}
        </text>
        <text x={FBR[0] + dx / 2 + 16} y={FBR[1] - dy / 2 + 12} className="dg-label" textAnchor="middle" dominantBaseline="central">
          {`ℓ = ${l}`}
        </text>
        <text x={Math.min(BBR[0] + 18, 288)} y={yb - dy - H / 2} className="dg-label" textAnchor="middle" dominantBaseline="central">
          {`h = ${h}`}
        </text>
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        {slider("Length", "\\ell", l, setL)}
        {slider("Width", "w", w, setW)}
        {slider("Height", "h", h, setH)}
        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input type="checkbox" checked={showDiag} onChange={(e) => setShowDiag(e.target.checked)} /> Show the face diagonal and the space diagonal
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        {isCube && <div>All three dimensions are equal: this solid is a cube.</div>}
        <div>
          <Tex tex={`V = \\ell w h = ${l}\\cdot ${w}\\cdot ${h} = ${V}`} />
        </div>
        <div>
          <Tex tex={`A = 2(\\ell w + \\ell h + wh) = 2(${l * w} + ${l * h} + ${w * h}) = ${SA}`} />
        </div>
        <div>
          <Tex tex={`\\text{step 1 (floor): } \\sqrt{${l}^2 + ${w}^2} = \\sqrt{${f2}} = ${sqrtTex(f2)}`} />
        </div>
        <div>
          <Tex tex={`\\text{step 2 (up): } \\sqrt{${f2} + ${h}^2} = \\sqrt{${d2}} = ${sqrtTex(d2)}`} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cylinder explorer: r, h -> V, A, with the lateral surface unrolled    */
/* ------------------------------------------------------------------ */

function piTerm(n: number): string {
  // n * pi; n may be a multiple of 0.5 or 0.25
  const s = Number.isInteger(n) ? `${n}` : `${r2(n)}`;
  return `${s}\\pi`;
}

export function CylinderExplorer() {
  const [r, setR] = useState(3);
  const [h, setH] = useState(6);

  const k = 11;
  const rx = r * k;
  const ry = Math.max(6, rx * 0.28);
  const hp = h * k;
  const cx = 120;
  const yTop = 14 + ry;
  const yBot = yTop + hp;
  const cylH = yBot + ry + 8;

  // unrolled lateral surface
  const ks = 300 / (2 * Math.PI * 8);
  const RW = 2 * Math.PI * r * ks;
  const RH = h * ks;

  const base = r * r; // times pi
  const lat = 2 * r * h; // times pi
  const V = r * r * h; // times pi
  const A = 2 * base + lat;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 270 ${cylH}`} width={270} style={{ maxWidth: "100%" }} role="img" aria-label={`Right circular cylinder with radius ${r} and height ${h}`}>
        <path
          d={`M ${cx - rx} ${yTop} L ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBot} L ${cx + rx} ${yTop} A ${rx} ${ry} 0 0 1 ${cx - rx} ${yTop} Z`}
          className="dg-accent-fill"
        />
        <line x1={cx - rx} y1={yTop} x2={cx - rx} y2={yBot} className="dg-line" />
        <line x1={cx + rx} y1={yTop} x2={cx + rx} y2={yBot} className="dg-line" />
        <ellipse cx={cx} cy={yTop} rx={rx} ry={ry} className="dg-fill" />
        <ellipse cx={cx} cy={yTop} rx={rx} ry={ry} className="dg-line" />
        <path d={`M ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBot}`} className="dg-line" />
        <path d={`M ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yBot}`} className="dg-line dg-thin dg-dashed" />
        <line x1={cx} y1={yTop} x2={cx + rx} y2={yTop} className="dg-line" />
        <circle cx={cx} cy={yTop} r={2.6} className="dg-point" />
        <text x={cx + rx / 2} y={yTop - 8} className="dg-label" textAnchor="middle" dominantBaseline="central">
          {`r = ${r}`}
        </text>
        <text x={Math.min(cx + rx + 22, 240)} y={(yTop + yBot) / 2} className="dg-label" textAnchor="middle" dominantBaseline="central">
          {`h = ${h}`}
        </text>
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Radius <Tex tex={`r = ${r}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={8} step={1} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label>
          Height <Tex tex={`h = ${h}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={12} step={1} value={h} onChange={(e) => setH(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ fontSize: "0.9rem" }}>The curved side, cut open and unrolled, is a rectangle:</div>
      <svg viewBox="0 0 380 120" width={380} style={{ maxWidth: "100%" }} role="img" aria-label="Unrolled lateral surface: a rectangle 2 pi r by h">
        <rect x={10} y={10} width={r2(RW)} height={r2(RH)} className="dg-accent-fill" />
        <rect x={10} y={10} width={r2(RW)} height={r2(RH)} className="dg-accent" />
        <text x={10 + RW / 2} y={10 + RH + 14} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {`2πr = ${r2(2 * r)}π`}
        </text>
        <text x={10 + RW / 2} y={10 + RH / 2} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {RH > 16 ? `${r2(2 * r)}π × ${h}` : ""}
        </text>
        <text x={10 + RW + 12} y={10 + RH / 2} className="dg-label" textAnchor="start" dominantBaseline="central">
          {`h = ${h}`}
        </text>
      </svg>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex tex={`\\text{one base: } \\pi r^2 = ${piTerm(base)}`} />
        </div>
        <div>
          <Tex tex={`\\text{lateral surface: } 2\\pi r h = 2\\pi(${r})(${h}) = ${piTerm(lat)}`} />
        </div>
        <div>
          <Tex tex={`V = \\pi r^2 h = \\pi(${r})^2(${h}) = ${piTerm(V)}`} />
        </div>
        <div>
          <Tex tex={`A = 2\\pi r^2 + 2\\pi r h = ${piTerm(2 * base)} + ${piTerm(lat)} = ${piTerm(A)}`} />
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "3-6-three-dimensional-figures/box-explorer": BoxExplorer,
  "3-6-three-dimensional-figures/cylinder-explorer": CylinderExplorer,
};
