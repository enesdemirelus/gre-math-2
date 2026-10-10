// Data-display components for section 4.2 Numerical Methods for Describing Data.
// Everything is drawn to scale from the props: positions come from the data and the axis range.

import type { CSSProperties } from "react";

const r2 = (n: number) => Math.round(n * 100) / 100;
const T11: CSSProperties = { fontSize: 11 };
const T10: CSSProperties = { fontSize: 10 };
const GRID: CSSProperties = { stroke: "var(--fg)", strokeOpacity: 0.14 };

function fmt(v: number): string {
  return Number.isInteger(v) ? String(v) : String(r2(v));
}

function ticks(min: number, max: number, step: number): number[] {
  const out: number[] = [];
  for (let v = min; v <= max + 1e-9; v += step) out.push(r2(v));
  return out;
}

/** A horizontal number-line axis with ticks and numeric labels at y. */
function Axis({ x0, x1, y, min, max, step, sx }: { x0: number; x1: number; y: number; min: number; max: number; step: number; sx: (v: number) => number }) {
  return (
    <g>
      <line className="dg-line" x1={x0} y1={y} x2={x1} y2={y} />
      {ticks(min, max, step).map((t) => (
        <g key={t}>
          <line className="dg-line" x1={sx(t)} y1={y} x2={sx(t)} y2={y + 4} />
          <text className="dg-text" x={sx(t)} y={y + 16} textAnchor="middle" style={T10}>
            {fmt(t)}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Boxplot                                                             */
/* ------------------------------------------------------------------ */

export interface BoxStats {
  label?: string;
  L: number;
  Q1: number;
  M: number;
  Q3: number;
  G: number;
}

/**
 * One or more boxplots over a shared number line.
 * Whiskers run from the least value L to Q1 and from Q3 to the greatest value G;
 * the two boxes meet at the median M. `letters` names the five positions (best for a single plot).
 */
export function BoxPlot({
  plots,
  min = 0,
  max = 10,
  step = 1,
  letters = false,
  highlight = false,
}: {
  plots: BoxStats[];
  min?: number;
  max?: number;
  step?: number;
  letters?: boolean;
  highlight?: boolean;
}) {
  const W = 360;
  const hasLabels = plots.some((p) => p.label);
  const x0 = hasLabels ? 62 : 22;
  const x1 = W - 22;
  const sx = (v: number) => r2(x0 + ((v - min) / (max - min)) * (x1 - x0));
  const rowH = 52;
  const top = letters ? 30 : 10;
  const axisY = top + plots.length * rowH;
  const H = axisY + 24;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W }} role="img" aria-label="Boxplot">
      {ticks(min, max, step).map((t) => (
        <line key={t} x1={sx(t)} y1={top - 4} x2={sx(t)} y2={axisY} style={GRID} />
      ))}
      {plots.map((p, i) => {
        const cy = top + i * rowH + rowH / 2;
        const bh = 24;
        return (
          <g key={i}>
            {p.label && (
              <text className="dg-text" x={x0 - 8} y={cy + 4} textAnchor="end" style={T11}>
                {p.label}
              </text>
            )}
            <line className="dg-line" x1={sx(p.L)} y1={cy} x2={sx(p.Q1)} y2={cy} />
            <line className="dg-line" x1={sx(p.Q3)} y1={cy} x2={sx(p.G)} y2={cy} />
            <line className="dg-line" x1={sx(p.L)} y1={cy - 7} x2={sx(p.L)} y2={cy + 7} />
            <line className="dg-line" x1={sx(p.G)} y1={cy - 7} x2={sx(p.G)} y2={cy + 7} />
            <rect className={highlight ? "dg-accent-fill dg-line" : "dg-fill dg-line"} x={sx(p.Q1)} y={cy - bh / 2} width={r2(sx(p.M) - sx(p.Q1))} height={bh} />
            <rect className={highlight ? "dg-accent-fill dg-line" : "dg-fill dg-line"} x={sx(p.M)} y={cy - bh / 2} width={r2(sx(p.Q3) - sx(p.M))} height={bh} />
            <line className="dg-accent" x1={sx(p.M)} y1={cy - bh / 2} x2={sx(p.M)} y2={cy + bh / 2} style={{ strokeWidth: 2.5 }} />
            {letters && i === 0 && (
              <g>
                {(
                  [
                    ["L", p.L],
                    ["Q₁", p.Q1],
                    ["M", p.M],
                    ["Q₃", p.Q3],
                    ["G", p.G],
                  ] as [string, number][]
                ).map(([name, v]) => (
                  <g key={name}>
                    <text className="dg-label" x={sx(v)} y={top - 12} textAnchor="middle" style={T11}>
                      {name}
                    </text>
                    <line className="dg-thin" x1={sx(v)} y1={top - 8} x2={sx(v)} y2={cy - bh / 2 - 2} style={{ strokeDasharray: "2 2" }} />
                  </g>
                ))}
              </g>
            )}
          </g>
        );
      })}
      <Axis x0={x0} x1={x1} y={axisY} min={min} max={max} step={step} sx={sx} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Dot plot (one or more rows on a shared number line)                  */
/* ------------------------------------------------------------------ */

export interface DotRow {
  label?: string;
  data: number[];
}

const meanOf = (d: number[]) => d.reduce((a, b) => a + b, 0) / d.length;

/** Dots stacked above a number line; optional dashed mean line, one per row. */
export function DotPlot({
  rows,
  min = 0,
  max = 10,
  step = 1,
  showMean = false,
}: {
  rows: DotRow[];
  min?: number;
  max?: number;
  step?: number;
  showMean?: boolean;
}) {
  const W = 360;
  const hasLabels = rows.some((r) => r.label);
  const x0 = hasLabels ? 62 : 22;
  const x1 = W - 22;
  const sx = (v: number) => r2(x0 + ((v - min) / (max - min)) * (x1 - x0));
  const R = 5;
  const gap = 11;
  const maxStack = Math.max(
    ...rows.map((r) => {
      const c: Record<number, number> = {};
      r.data.forEach((v) => (c[v] = (c[v] ?? 0) + 1));
      return Math.max(...Object.values(c));
    }),
  );
  const rowH = 22 + maxStack * gap + 22;
  const H = 6 + rows.length * rowH + 6;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W }} role="img" aria-label="Dot plot">
      {rows.map((row, i) => {
        const base = 6 + i * rowH + rowH - 22;
        const c: Record<number, number> = {};
        const m = meanOf(row.data);
        return (
          <g key={i}>
            {row.label && (
              <text className="dg-text" x={x0 - 8} y={base - 4} textAnchor="end" style={T11}>
                {row.label}
              </text>
            )}
            {showMean && (
              <g>
                <line className="dg-accent" x1={sx(m)} y1={base - maxStack * gap - 8} x2={sx(m)} y2={base + 5} style={{ strokeDasharray: "4 3" }} />
                <text className="dg-text" x={sx(m)} y={base - maxStack * gap - 12} textAnchor="middle" style={T10}>
                  mean = {fmt(r2(m))}
                </text>
              </g>
            )}
            {[...row.data]
              .sort((a, b) => a - b)
              .map((v, j) => {
                c[v] = (c[v] ?? 0) + 1;
                return <circle key={j} className="dg-point" cx={sx(v)} cy={base - R - (c[v] - 1) * gap} r={R} />;
              })}
            <Axis x0={x0} x1={x1} y={base} min={min} max={max} step={step} sx={sx} />
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Deviations from the mean (the picture behind the standard deviation) */
/* ------------------------------------------------------------------ */

/** Each datum on its own row, with a segment to the mean labelled with the signed difference. */
export function Deviations({ data, min = 0, max = 14, step = 2 }: { data: number[]; min?: number; max?: number; step?: number }) {
  const W = 360;
  const x0 = 22;
  const x1 = W - 22;
  const sx = (v: number) => r2(x0 + ((v - min) / (max - min)) * (x1 - x0));
  const m = meanOf(data);
  const sorted = [...data].sort((a, b) => a - b);
  const rowH = 24;
  const top = 26;
  const axisY = top + sorted.length * rowH;
  const H = axisY + 24;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W }} role="img" aria-label="Differences from the mean">
      {ticks(min, max, step).map((t) => (
        <line key={t} x1={sx(t)} y1={top - 6} x2={sx(t)} y2={axisY} style={GRID} />
      ))}
      <line className="dg-accent" x1={sx(m)} y1={top - 8} x2={sx(m)} y2={axisY} style={{ strokeDasharray: "4 3" }} />
      <text className="dg-text" x={sx(m)} y={top - 12} textAnchor="middle" style={T10}>
        mean = {fmt(r2(m))}
      </text>
      {sorted.map((v, i) => {
        const y = top + i * rowH + rowH / 2;
        const d = r2(v - m);
        const labelRight = d < 0;
        return (
          <g key={i}>
            <line className="dg-line" x1={sx(m)} y1={y} x2={sx(v)} y2={y} />
            <circle className="dg-point" cx={sx(v)} cy={y} r={4.5} />
            <text className="dg-text" x={labelRight ? sx(v) - 9 : sx(v) + 9} y={y + 4} textAnchor={labelRight ? "end" : "start"} style={T10}>
              {d > 0 ? "+" : d < 0 ? "−" : ""}
              {fmt(Math.abs(d))}
            </text>
          </g>
        );
      })}
      <Axis x0={x0} x1={x1} y={axisY} min={min} max={max} step={step} sx={sx} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export const registry = {
  "4-2-describing-data/box-plot": BoxPlot,
  "4-2-describing-data/dot-plot": DotPlot,
  "4-2-describing-data/deviations": Deviations,
};
