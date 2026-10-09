// Original diagrams for section 1.5 Real Numbers.
// Number lines are drawn to scale (MC p. 10): every x-coordinate is computed from the value.

const r2 = (n: number) => Math.round(n * 100) / 100;

export interface NLPoint {
  /** value on the number line */
  v: number;
  /** label shown above the point (or below with `below`) */
  label?: string;
  /** stack level for the label (0 = closest to the line) to avoid collisions */
  row?: number;
  below?: boolean;
  /** draw as an open (hollow) dot */
  open?: boolean;
  accent?: boolean;
  /** label in upright text (numbers) instead of italic (letters) */
  upright?: boolean;
}

export interface NLInterval {
  /** left endpoint; null = extends without bound to the left */
  from: number | null;
  /** right endpoint; null = extends without bound to the right */
  to: number | null;
  fromOpen?: boolean;
  toOpen?: boolean;
}

export interface NLBracket {
  from: number;
  to: number;
  text: string;
  /** stack level above the line */
  row?: number;
}

export interface NumberLineProps {
  min: number;
  max: number;
  /** tick spacing (default 1) */
  step?: number;
  /** which tick values get numbers: "all" (default), "none", or a list */
  tickLabels?: "all" | "none" | number[];
  points?: NLPoint[];
  intervals?: NLInterval[];
  brackets?: NLBracket[];
  /** total SVG height (default computed) */
  height?: number;
  width?: number;
}

/** Generic number line drawn to scale. */
export function NumberLine({
  min,
  max,
  step = 1,
  tickLabels = "all",
  points = [],
  intervals = [],
  brackets = [],
  height,
  width = 340,
}: NumberLineProps) {
  const pad = 22;
  const maxRow = Math.max(
    0,
    ...points.filter((p) => !p.below && p.label).map((p) => p.row ?? 0),
    ...brackets.map((b) => (b.row ?? 0) + 1.6),
  );
  const top = 22 + maxRow * 17 + (brackets.length ? 10 : 0);
  const Y = top + 8;
  const hasBelowLabels = points.some((p) => p.below && p.label);
  const H = height ?? Y + (tickLabels === "none" ? 14 : 28) + (hasBelowLabels ? 16 : 0);
  const X = (v: number) => r2(pad + ((v - min) / (max - min)) * (width - 2 * pad));
  const ticks: number[] = [];
  for (let t = min; t <= max + 1e-9; t += step) ticks.push(r2(t));
  const showTickLabel = (t: number) => tickLabels === "all" || (Array.isArray(tickLabels) && tickLabels.some((x) => Math.abs(x - t) < 1e-9));
  const fmt = (t: number) => (t < 0 ? `−${r2(-t)}` : `${r2(t)}`);
  const xL = 6;
  const xR = width - 6;
  const arrow = (x: number, dir: 1 | -1, accent = false) => (
    <path
      d={`M ${x} ${Y} L ${x - dir * 8} ${Y - 4.5} L ${x - dir * 8} ${Y + 4.5} Z`}
      className="dg-point"
      style={accent ? { fill: "var(--accent)" } : undefined}
    />
  );

  return (
    <svg viewBox={`0 0 ${width} ${H}`} width={width} role="img" aria-label="Number line">
      <line x1={xL + 2} y1={Y} x2={xR - 2} y2={Y} className="dg-line" />
      {arrow(xL, -1)}
      {arrow(xR, 1)}
      {ticks.map((t) => (
        <g key={`t${t}`}>
          <line x1={X(t)} y1={Y - 5} x2={X(t)} y2={Y + 5} className="dg-line dg-thin" />
          {showTickLabel(t) && (
            <text x={X(t)} y={Y + 19} className="dg-text" textAnchor="middle" style={{ fontSize: 13 }}>
              {fmt(t)}
            </text>
          )}
        </g>
      ))}
      {intervals.map((iv, i) => {
        const x1 = iv.from === null ? xL + 10 : X(iv.from);
        const x2 = iv.to === null ? xR - 10 : X(iv.to);
        return (
          <g key={`i${i}`}>
            <line x1={x1} y1={Y} x2={x2} y2={Y} className="dg-accent" style={{ strokeWidth: 4 }} />
            {iv.from === null && arrow(xL + 4, -1, true)}
            {iv.to === null && arrow(xR - 4, 1, true)}
            {iv.from !== null && <EndDot x={X(iv.from)} y={Y} open={!!iv.fromOpen} />}
            {iv.to !== null && <EndDot x={X(iv.to)} y={Y} open={!!iv.toOpen} />}
          </g>
        );
      })}
      {brackets.map((b, i) => {
        const yb = Y - 18 - (b.row ?? 0) * 17;
        const x1 = X(b.from);
        const x2 = X(b.to);
        return (
          <g key={`b${i}`}>
            <line x1={x1} y1={yb} x2={x2} y2={yb} className="dg-accent" style={{ strokeWidth: 1.6 }} />
            <line x1={x1} y1={yb - 4} x2={x1} y2={yb + 4} className="dg-accent" style={{ strokeWidth: 1.6 }} />
            <line x1={x2} y1={yb - 4} x2={x2} y2={yb + 4} className="dg-accent" style={{ strokeWidth: 1.6 }} />
            <text x={r2((x1 + x2) / 2)} y={yb - 7} className="dg-text" textAnchor="middle" style={{ fontSize: 13 }}>
              {b.text}
            </text>
          </g>
        );
      })}
      {points.map((p, i) => {
        const x = X(p.v);
        const ly = p.below ? Y + 34 : Y - 13 - (p.row ?? 0) * 17;
        return (
          <g key={`p${i}`}>
            {p.open ? (
              <EndDot x={x} y={Y} open />
            ) : (
              <circle cx={x} cy={Y} r={p.accent ? 4 : 3.2} className="dg-point" style={p.accent ? { fill: "var(--accent)" } : undefined} />
            )}
            {p.label && (
              <text x={x} y={ly} className={p.upright ? "dg-text" : "dg-label"} textAnchor="middle" style={{ fontSize: p.upright ? 13 : 15 }}>
                {p.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function EndDot({ x, y, open }: { x: number; y: number; open: boolean }) {
  return open ? (
    <circle cx={x} cy={y} r={4.5} className="dg-accent" style={{ fill: "var(--bg)", strokeWidth: 2 }} />
  ) : (
    <circle cx={x} cy={y} r={4.5} className="dg-accent" style={{ fill: "var(--accent)", strokeWidth: 2 }} />
  );
}

/* ------------------------------------------------------------------ */
/* Presets used in the lesson, terms and questions                      */
/* ------------------------------------------------------------------ */

/** The real number line with some rational and irrational points. */
export function RealLine() {
  return (
    <NumberLine
      min={-4}
      max={4}
      points={[
        { v: -2.5, label: "−2.5", upright: true, row: 0 },
        { v: -Math.sqrt(2), label: "−√2", upright: true, row: 1 },
        { v: -0.6, label: "−0.6", upright: true, row: 0 },
        { v: 1 / 3, label: "1/3", upright: true, row: 1 },
        { v: Math.sqrt(3), label: "√3", upright: true, row: 0 },
        { v: Math.PI, label: "π", upright: true, row: 1 },
      ]}
    />
  );
}

export type IntervalVariant = "open" | "half" | "closed" | "ray" | "between";

/** Intervals: two-endpoint and one-endpoint. */
export function IntervalFigure({ variant = "half" }: { variant?: IntervalVariant }) {
  switch (variant) {
    case "open":
    case "between":
      return <NumberLine min={-3} max={5} intervals={[{ from: -1, to: 3, fromOpen: true, toOpen: true }]} />;
    case "closed":
      return <NumberLine min={-3} max={5} intervals={[{ from: -1, to: 3 }]} />;
    case "ray":
      return <NumberLine min={-3} max={5} intervals={[{ from: 1, to: null }]} />;
    case "half":
    default:
      return <NumberLine min={-3} max={5} intervals={[{ from: -1, to: 3, fromOpen: true }]} />;
  }
}

/** Absolute value as distance from 0: |-3| = |3| = 3. */
export function AbsValueFigure() {
  return (
    <NumberLine
      min={-5}
      max={5}
      points={[
        { v: -3, accent: true },
        { v: 0 },
        { v: 3, accent: true },
      ]}
      brackets={[
        { from: -3, to: 0, text: "3" },
        { from: 0, to: 3, text: "3" },
      ]}
    />
  );
}

/** Distance between two numbers: |5 - (-2)| = 7. */
export function DistanceFigure() {
  return (
    <NumberLine
      min={-4}
      max={7}
      points={[
        { v: -2, accent: true },
        { v: 5, accent: true },
      ]}
      brackets={[{ from: -2, to: 5, text: "|5 − (−2)| = 7" }]}
    />
  );
}

/** Opposite signs: the distance between r and s is |r| + |s|. Used in a worked example. */
export function OppositeSidesFigure() {
  return (
    <NumberLine
      min={-3}
      max={3}
      tickLabels={[-3, -2, -1, 0, 1, 2, 3]}
      points={[
        { v: -1.6, label: "r" },
        { v: 0.7, label: "s" },
      ]}
    />
  );
}

/** a < b < 0 < c, used in a quiz question. */
export function ThreePointsFigure() {
  return (
    <NumberLine
      min={-4}
      max={3}
      tickLabels={[0]}
      points={[
        { v: -3.2, label: "a" },
        { v: -1.3, label: "b" },
        { v: 2.1, label: "c" },
      ]}
    />
  );
}

export const registry = {
  "1-5-real-numbers/number-line": NumberLine,
  "1-5-real-numbers/real-line": RealLine,
  "1-5-real-numbers/interval": IntervalFigure,
  "1-5-real-numbers/abs-value": AbsValueFigure,
  "1-5-real-numbers/distance": DistanceFigure,
  "1-5-real-numbers/opposite-sides": OppositeSidesFigure,
  "1-5-real-numbers/three-points": ThreePointsFigure,
};
