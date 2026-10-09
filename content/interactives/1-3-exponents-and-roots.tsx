"use client";
// Interactive explorer for section 1.3 Exponents and Roots:
// where x, x^2, x^3, sqrt(x) and 1/x fall on the number line, region by region.

import { useState } from "react";
import { Tex } from "@/components/Tex";

type Item = { id: string; tex: string; svg: string; v: number | null };

const EPS = 1e-9;

/** Readable decimal: 3 decimals normally, 2 significant figures for tiny nonzero values. */
function fmt(n: number): string {
  if (Math.abs(n) < EPS) return "0";
  if (Math.abs(n) < 0.01) return Number(n.toPrecision(2)).toString();
  const r = Math.round(n * 1000) / 1000;
  return (Object.is(r, -0) ? 0 : r).toString();
}

function region(x: number): string {
  if (Math.abs(x + 1) < EPS) return "x = -1";
  if (Math.abs(x) < EPS) return "x = 0";
  if (Math.abs(x - 1) < EPS) return "x = 1";
  if (x < -1) return "x < -1";
  if (x < 0) return "-1 < x < 0";
  if (x < 1) return "0 < x < 1";
  return "x > 1";
}

const PRESETS: { label: string; k: number }[] = [
  { label: "x < −1", k: -160 },
  { label: "−1 < x < 0", k: -50 },
  { label: "0 < x < 1", k: 50 },
  { label: "x > 1", k: 160 },
];

export function PowersExplorer({ initialX = 0.5 }: { initialX?: number }) {
  const [k, setK] = useState(Math.round(initialX * 20) * 5); // x = k / 100
  const [showOrder, setShowOrder] = useState(true);
  const x = k / 100;

  const items: Item[] = [
    { id: "x", tex: "x", svg: "x", v: x },
    { id: "x2", tex: "x^2", svg: "x²", v: x * x },
    { id: "x3", tex: "x^3", svg: "x³", v: x * x * x },
    { id: "sqrt", tex: "\\sqrt{x}", svg: "√x", v: x >= 0 ? Math.sqrt(x) : null },
    { id: "recip", tex: "\\frac{1}{x}", svg: "1/x", v: Math.abs(x) < EPS ? null : 1 / x },
  ];

  // number line geometry (drawn to scale on [-LIM, LIM])
  const W = 360;
  const LIM = 2;
  const pad = 22;
  const lineY = 150;
  const X = (v: number) => pad + ((v + LIM) / (2 * LIM)) * (W - 2 * pad);

  // place labels in rows so they do not overlap
  const shown = items
    .filter((it) => it.v !== null)
    .map((it) => {
      const v = it.v as number;
      const off = v > LIM ? 1 : v < -LIM ? -1 : 0;
      const px = X(Math.max(-LIM, Math.min(LIM, v)));
      return { ...it, v, px, off };
    })
    .sort((a, b) => a.px - b.px);
  const rowEnd: number[] = [];
  const placed = shown.map((it) => {
    const w = it.svg.length * 9 + 8 + (it.off ? 12 : 0);
    const start = it.px - w / 2;
    let row = 0;
    while (rowEnd[row] !== undefined && rowEnd[row] > start) row++;
    rowEnd[row] = it.px + w / 2;
    return { ...it, row };
  });

  // ordering, with 0 as a reference point
  const ord = [...items.filter((it) => it.v !== null).map((it) => ({ tex: it.tex, v: it.v as number })), { tex: "0", v: 0 }].sort(
    (a, b) => a.v - b.v,
  );
  let orderTex = ord[0].tex;
  for (let i = 1; i < ord.length; i++) orderTex += `${Math.abs(ord[i].v - ord[i - 1].v) < EPS ? " = " : " < "}${ord[i].tex}`;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 ${W} 190`} width={W} style={{ maxWidth: "100%" }} role="img" aria-label={`Number line with x = ${x}`}>
        {/* shade the current region */}
        {(() => {
          const r = region(x);
          const span: Record<string, [number, number]> = {
            "x < -1": [-LIM, -1],
            "-1 < x < 0": [-1, 0],
            "0 < x < 1": [0, 1],
            "x > 1": [1, LIM],
          };
          const s = span[r];
          return s ? <rect x={X(s[0])} y={lineY - 8} width={X(s[1]) - X(s[0])} height={16} className="dg-accent-fill" /> : null;
        })()}
        <line x1={6} y1={lineY} x2={W - 6} y2={lineY} className="dg-line" />
        <path d={`M 13 ${lineY - 4.5} L 6 ${lineY} L 13 ${lineY + 4.5}`} className="dg-line" />
        <path d={`M ${W - 13} ${lineY - 4.5} L ${W - 6} ${lineY} L ${W - 13} ${lineY + 4.5}`} className="dg-line" />
        {Array.from({ length: 4 * LIM + 1 }, (_, i) => i / 2 - LIM).map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={lineY - (Number.isInteger(t) ? 6 : 3)} x2={X(t)} y2={lineY + (Number.isInteger(t) ? 6 : 3)} className="dg-line dg-thin" />
            {Number.isInteger(t) && (
              <text x={X(t)} y={lineY + 22} className="dg-text" textAnchor="middle">
                {t < 0 ? `−${-t}` : `${t}`}
              </text>
            )}
          </g>
        ))}
        {placed.map((it) => {
          const ly = lineY - 18 - it.row * 22;
          const text = it.off === 1 ? `${it.svg} →` : it.off === -1 ? `← ${it.svg}` : it.svg;
          return (
            <g key={it.id}>
              <line x1={it.px} y1={lineY - 4} x2={it.px} y2={ly + 4} className="dg-line dg-thin dg-dashed" />
              <circle cx={it.px} cy={lineY} r={3.5} className="dg-point" />
              {it.id === "x" && <circle cx={it.px} cy={lineY} r={7} className="dg-accent" />}
              <text x={it.px} y={ly} className="dg-label" textAnchor="middle">
                {text}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          <Tex tex={`x = ${fmt(x)}`} />
          <input type="range" style={{ width: "100%" }} min={-250} max={250} step={5} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
        <div className="row" style={{ justifyContent: "center" }}>
          {PRESETS.map((p) => (
            <button key={p.label} type="button" className="btn small" onClick={() => setK(p.k)}>
              {p.label}
            </button>
          ))}
        </div>
        <label>
          <input type="checkbox" checked={showOrder} onChange={(e) => setShowOrder(e.target.checked)} /> Show the ordering (turn off to
          predict it first)
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          Region: <Tex tex={region(x)} />
        </div>
        {showOrder && (
          <div style={{ overflowX: "auto" }}>
            <Tex tex={orderTex} />
          </div>
        )}
        {showOrder && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem 1.2rem" }}>
            {items.map((it) => (
              <span key={it.id}>
                <Tex tex={`${it.tex} ${it.v === null ? "\\text{ not defined}" : `= ${fmt(it.v)}`}`} />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const registry = {
  "1-3-exponents-and-roots/powers-explorer": PowersExplorer,
};
