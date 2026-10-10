// Original diagrams for section 2.9 Graphs of Functions.
// Every graph is drawn to scale on a coordinate grid (MC: coordinate systems are drawn to scale):
// equal units on both axes, and every curve is sampled from its formula y = a * base(x - h) + k.

import type { ReactElement } from "react";

const r2 = (n: number) => Math.round(n * 100) / 100;
const mnum = (n: number) => (n < 0 ? `−${-n}` : `${n}`);

export type Base = "sq" | "abs" | "sqrt" | "lin";

/** y = a * base(x - h) + k, optionally restricted to from <= x <= to. For "lin", base(t) = t. */
export interface CurveSpec {
  base: Base;
  a?: number;
  h?: number;
  k?: number;
  from?: number;
  to?: number;
  style?: "accent" | "line" | "dashed";
}

export interface PointSpec {
  x: number;
  y: number;
  label?: string;
  /** label offset in pixels from the point (default: up-right) */
  dx?: number;
  dy?: number;
  open?: boolean;
  anchor?: "start" | "middle" | "end";
}

export interface TextSpec {
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "middle" | "end";
}

export interface SegSpec {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  style?: "accent" | "line" | "dashed";
}

export interface PlotProps {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  /** pixels per unit; default fits about 300 px of width */
  u?: number;
  curves?: CurveSpec[];
  points?: PointSpec[];
  texts?: TextSpec[];
  segs?: SegSpec[];
  /** tick labels to print (default: every integer, or every 2nd if the span is large) */
  xLabels?: number[];
  yLabels?: number[];
  grid?: boolean;
  /** shade the region between this curve (index) and the x-axis */
  shadeCurve?: number;
  ariaLabel?: string;
}

export function evalCurve(c: CurveSpec, x: number): number | null {
  const a = c.a ?? 1;
  const h = c.h ?? 0;
  const k = c.k ?? 0;
  if (c.from !== undefined && x < c.from - 1e-9) return null;
  if (c.to !== undefined && x > c.to + 1e-9) return null;
  const t = x - h;
  let b: number;
  switch (c.base) {
    case "sq":
      b = t * t;
      break;
    case "abs":
      b = Math.abs(t);
      break;
    case "sqrt":
      if (t < -1e-12) return null;
      b = Math.sqrt(Math.max(0, t));
      break;
    default:
      b = t;
  }
  return a * b + k;
}

const cls = (s: CurveSpec["style"]) => (s === "dashed" ? "dg-line dg-dashed" : s === "line" ? "dg-line" : "dg-accent");

export function Plot({
  xmin,
  xmax,
  ymin,
  ymax,
  u,
  curves = [],
  points = [],
  texts = [],
  segs = [],
  xLabels,
  yLabels,
  grid = true,
  shadeCurve,
  ariaLabel = "Graph in the xy-plane",
}: PlotProps) {
  const unit = u ?? Math.min(32, Math.floor(290 / (xmax - xmin)));
  const padL = 16;
  const padR = 22;
  const padT = 22;
  const padB = 22;
  const W = r2(padL + (xmax - xmin) * unit + padR);
  const H = r2(padT + (ymax - ymin) * unit + padB);
  const X = (x: number) => r2(padL + (x - xmin) * unit);
  const Y = (y: number) => r2(padT + (ymax - y) * unit);
  const span = Math.max(xmax - xmin, ymax - ymin);
  const step = span > 12 ? 2 : 1;
  const ints = (lo: number, hi: number) => {
    const out: number[] = [];
    for (let v = Math.ceil(lo); v <= Math.floor(hi); v++) out.push(v);
    return out;
  };
  const xl = xLabels ?? ints(xmin, xmax).filter((v) => v !== 0 && v % step === 0 && v > xmin && v < xmax);
  const yl = yLabels ?? ints(ymin, ymax).filter((v) => v !== 0 && v % step === 0 && v > ymin && v < ymax);
  const X0 = X(0);
  const Y0 = Y(0);
  const clipId = `c29-${xmin}-${xmax}-${ymin}-${ymax}`.replace(/\./g, "_");

  const curvePath = (c: CurveSpec): string => {
    const lo = Math.max(xmin, c.from ?? -Infinity, c.base === "sqrt" ? c.h ?? 0 : -Infinity);
    const hi = Math.min(xmax, c.to ?? Infinity);
    if (hi <= lo) return "";
    const N = 240;
    const xs: number[] = [];
    for (let i = 0; i <= N; i++) xs.push(lo + ((hi - lo) * i) / N);
    const hh = c.h ?? 0;
    if (hh > lo && hh < hi) xs.push(hh);
    // dense sampling near the start of a square-root curve
    if (c.base === "sqrt") for (let i = 1; i < 20; i++) xs.push(lo + (i * i * (hi - lo)) / (N * 40));
    xs.sort((p, q) => p - q);
    const parts: string[] = [];
    for (const x of xs) {
      const y = evalCurve(c, x);
      if (y === null) continue;
      const yy = Math.max(ymin - 2, Math.min(ymax + 2, y));
      parts.push(`${parts.length ? "L" : "M"} ${X(x)} ${Y(yy)}`);
    }
    return parts.join(" ");
  };

  const gridLines: ReactElement[] = [];
  if (grid) {
    for (const v of ints(xmin, xmax)) {
      if (v === 0) continue;
      gridLines.push(<line key={`gx${v}`} x1={X(v)} y1={Y(ymax)} x2={X(v)} y2={Y(ymin)} className="dg-line dg-thin" style={{ strokeOpacity: 0.16 }} />);
    }
    for (const v of ints(ymin, ymax)) {
      if (v === 0) continue;
      gridLines.push(<line key={`gy${v}`} x1={X(xmin)} y1={Y(v)} x2={X(xmax)} y2={Y(v)} className="dg-line dg-thin" style={{ strokeOpacity: 0.16 }} />);
    }
  }

  let shade: ReactElement | null = null;
  if (shadeCurve !== undefined && curves[shadeCurve]) {
    const c = curves[shadeCurve];
    const lo = Math.max(xmin, c.from ?? -Infinity);
    const hi = Math.min(xmax, c.to ?? Infinity);
    const pts: string[] = [`M ${X(lo)} ${Y0}`];
    const N = 200;
    const xs: number[] = [];
    for (let i = 0; i <= N; i++) xs.push(lo + ((hi - lo) * i) / N);
    const hh = c.h ?? 0;
    if (hh > lo && hh < hi) xs.push(hh);
    xs.sort((p, q) => p - q);
    for (const x of xs) {
      const y = evalCurve(c, x);
      if (y !== null) pts.push(`L ${X(x)} ${Y(y)}`);
    }
    pts.push(`L ${X(hi)} ${Y0} Z`);
    shade = <path d={pts.join(" ")} className="dg-accent-fill" />;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label={ariaLabel}>
      <defs>
        <clipPath id={clipId}>
          <rect x={X(xmin)} y={Y(ymax)} width={r2((xmax - xmin) * unit)} height={r2((ymax - ymin) * unit)} />
        </clipPath>
      </defs>
      {gridLines}
      {shade}
      {/* axes */}
      <line x1={X(xmin)} y1={Y0} x2={X(xmax) + 8} y2={Y0} className="dg-line dg-thin" />
      <line x1={X0} y1={Y(ymin)} x2={X0} y2={Y(ymax) - 8} className="dg-line dg-thin" />
      <path d={`M ${X(xmax) + 12} ${Y0} l -7 -3.5 l 0 7 Z`} className="dg-point" />
      <path d={`M ${X0} ${Y(ymax) - 12} l -3.5 7 l 7 0 Z`} className="dg-point" />
      <text x={X(xmax) + 12} y={Y0 + 15} className="dg-label" textAnchor="middle">
        x
      </text>
      <text x={X0 + 11} y={Y(ymax) - 6} className="dg-label" textAnchor="middle">
        y
      </text>
      <text x={X0 - 8} y={Y0 + 14} className="dg-label" textAnchor="middle" style={{ fontSize: 13 }}>
        O
      </text>
      {ints(xmin, xmax).map((v) =>
        v === 0 ? null : <line key={`tx${v}`} x1={X(v)} y1={Y0 - 3} x2={X(v)} y2={Y0 + 3} className="dg-line dg-thin" />,
      )}
      {ints(ymin, ymax).map((v) =>
        v === 0 ? null : <line key={`ty${v}`} x1={X0 - 3} y1={Y(v)} x2={X0 + 3} y2={Y(v)} className="dg-line dg-thin" />,
      )}
      {xl.map((v) => (
        <text key={`lx${v}`} x={X(v)} y={Y0 + 14} className="dg-text" textAnchor="middle" style={{ fontSize: 11 }}>
          {mnum(v)}
        </text>
      ))}
      {yl.map((v) => (
        <text key={`ly${v}`} x={X0 - 6} y={Y(v)} className="dg-text" textAnchor="end" dominantBaseline="central" style={{ fontSize: 11 }}>
          {mnum(v)}
        </text>
      ))}
      <g clipPath={`url(#${clipId})`}>
        {segs.map((s, i) => (
          <line key={`s${i}`} x1={X(s.x1)} y1={Y(s.y1)} x2={X(s.x2)} y2={Y(s.y2)} className={s.style === "accent" ? "dg-accent" : s.style === "line" ? "dg-line" : "dg-line dg-thin dg-dashed"} />
        ))}
        {curves.map((c, i) => (
          <path key={`c${i}`} d={curvePath(c)} className={cls(c.style)} />
        ))}
      </g>
      {points.map((p, i) => (
        <g key={`p${i}`}>
          {p.open ? (
            <circle cx={X(p.x)} cy={Y(p.y)} r={3.5} className="dg-line" style={{ fill: "var(--bg)" }} />
          ) : (
            <circle cx={X(p.x)} cy={Y(p.y)} r={3.2} className="dg-point" />
          )}
          {p.label && (
            <text x={X(p.x) + (p.dx ?? 6)} y={Y(p.y) + (p.dy ?? -8)} className="dg-text" textAnchor={p.anchor ?? "start"} style={{ fontSize: 12 }}>
              {p.label}
            </text>
          )}
        </g>
      ))}
      {texts.map((t, i) => (
        <text key={`t${i}`} x={X(t.x)} y={Y(t.y)} className="dg-label" textAnchor={t.anchor ?? "start"} style={{ fontSize: 13 }}>
          {t.text}
        </text>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery of the elementary graphs (four small panels)                 */
/* ------------------------------------------------------------------ */

const PANELS: { title: string; props: PlotProps }[] = [
  {
    title: "linear: y = 2x − 3",
    props: {
      xmin: -3, xmax: 4, ymin: -4, ymax: 4, u: 20, xLabels: [-2, 2], yLabels: [-2, 2],
      curves: [{ base: "lin", a: 2, k: -3 }],
    },
  },
  {
    title: "quadratic: y = x²",
    props: {
      xmin: -3, xmax: 4, ymin: -4, ymax: 4, u: 20, xLabels: [-2, 2], yLabels: [-2, 2],
      curves: [{ base: "sq" }],
    },
  },
  {
    title: "absolute value: y = |x|",
    props: {
      xmin: -3, xmax: 4, ymin: -4, ymax: 4, u: 20, xLabels: [-2, 2], yLabels: [-2, 2],
      curves: [{ base: "abs" }],
    },
  },
  {
    title: "square roots: y = √x, y = −√x",
    props: {
      xmin: -3, xmax: 4, ymin: -4, ymax: 4, u: 20, xLabels: [-2, 2], yLabels: [-2, 2],
      curves: [{ base: "sqrt" }, { base: "sqrt", a: -1, style: "line" }],
    },
  },
];

export function BasicGraphs() {
  // each panel: 16 + 7*20 + 22 = 178 wide, 22 + 8*20 + 22 = 204 high, plus a 20 px title
  const pw = 178;
  const ph = 204;
  return (
    <svg viewBox={`0 0 ${2 * pw} ${2 * (ph + 22)}`} width={2 * pw} role="img" aria-label="Graphs of a linear, a quadratic, an absolute value and the square root functions">
      {PANELS.map((p, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <g key={i}>
            <text x={col * pw + pw / 2} y={row * (ph + 22) + 15} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
              {p.title}
            </text>
            <svg x={col * pw} y={row * (ph + 22) + 20} width={pw} height={ph} viewBox={`0 0 ${pw} ${ph}`}>
              <Plot {...p.props} />
            </svg>
          </g>
        );
      })}
    </svg>
  );
}

export const registry = {
  "2-9-graphs-of-functions/plot": Plot,
  "2-9-graphs-of-functions/basic-graphs": BasicGraphs,
};
