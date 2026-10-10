// Data-display components for section 4.1 Methods for Presenting Data.
// Every display is drawn to scale from its props: positions come from the data and the axis range,
// never from hand-placed numbers. Broken scales (axis not starting at 0) are marked with a zigzag.

import type { CSSProperties, ReactNode } from "react";

const r2 = (n: number) => Math.round(n * 100) / 100;
const rad = (d: number) => (d * Math.PI) / 180;

const T11: CSSProperties = { fontSize: 11 };
const T10: CSSProperties = { fontSize: 10 };
const TT: CSSProperties = { fontSize: 12, fontWeight: 600 };
const GRID: CSSProperties = { stroke: "var(--fg)", strokeOpacity: 0.16 };
const GRID_MINOR: CSSProperties = { stroke: "var(--fg)", strokeOpacity: 0.07 };

export interface Fmt {
  prefix?: string;
  suffix?: string;
}

function fmtNum(v: number, f?: Fmt): string {
  const s = Number.isInteger(v) ? v.toLocaleString("en-US") : String(r2(v));
  return `${f?.prefix ?? ""}${s}${f?.suffix ?? ""}`;
}

/** Fill styles for up to four bar series (no hard-coded colors). */
const SERIES_STYLE: CSSProperties[] = [
  { fill: "var(--accent)", fillOpacity: 0.8, stroke: "var(--fg)", strokeWidth: 1 },
  { fill: "var(--dg-fill)", stroke: "var(--fg)", strokeWidth: 1 },
  { fill: "var(--fg)", fillOpacity: 0.4, stroke: "var(--fg)", strokeWidth: 1 },
  { fill: "var(--accent)", fillOpacity: 0.3, stroke: "var(--fg)", strokeWidth: 1 },
];
const HILITE: CSSProperties = { fill: "var(--accent)", fillOpacity: 0.95, stroke: "var(--fg)", strokeWidth: 2 };

/** Multi-line text split on "|". */
function Lines({ x, y, text, style, anchor = "middle", lh = 12 }: { x: number; y: number; text: string; style?: CSSProperties; anchor?: "start" | "middle" | "end"; lh?: number }) {
  const parts = text.split("|");
  return (
    <text x={x} y={y} textAnchor={anchor} className="dg-text" style={style}>
      {parts.map((p, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : lh}>
          {p}
        </tspan>
      ))}
    </text>
  );
}

/* ------------------------------------------------------------------ */
/* Shared frame: title, y axis with gridlines, optional broken scale   */
/* ------------------------------------------------------------------ */

interface FrameOpts {
  W: number;
  H: number;
  title?: string;
  legend?: string[];
  yMin: number;
  yMax: number;
  yStep: number;
  yMinor?: number;
  yLabel?: string;
  xLabel?: string;
  fmt?: Fmt;
  /** true when yMin > 0 and the axis is drawn as a broken scale (0, zigzag, then yMin...) */
  broken?: boolean;
  rightMargin?: number;
}

interface Frame {
  x0: number;
  x1: number;
  yTop: number;
  yBot: number;
  sy: (v: number) => number;
  /** y (px) of the baseline where bars start */
  base: number;
  grid: ReactNode;
  overlay: ReactNode;
}

const BREAK = 16;

function makeFrame(o: FrameOpts): Frame {
  const x0 = 56;
  const x1 = o.W - (o.rightMargin ?? 14);
  const legendH = o.legend && o.legend.length ? 16 : 0;
  const yTop = (o.title ? 30 : 12) + legendH;
  const yBot = o.H - (o.xLabel ? 50 : 38);
  const brk = o.broken ? BREAK : 0;
  const sy = (v: number) => r2(yBot - brk - ((v - o.yMin) / (o.yMax - o.yMin)) * (yBot - brk - yTop));
  const ticks: number[] = [];
  for (let v = o.yMin; v <= o.yMax + 1e-9; v += o.yStep) ticks.push(r2(v));
  const minors: number[] = [];
  if (o.yMinor) for (let v = o.yMin; v <= o.yMax + 1e-9; v += o.yMinor) minors.push(r2(v));
  const grid = (
    <g>
      {minors.map((v) => (
        <line key={"m" + v} x1={x0} x2={x1} y1={sy(v)} y2={sy(v)} style={GRID_MINOR} />
      ))}
      {ticks.map((v) => (
        <g key={"t" + v}>
          <line x1={x0} x2={x1} y1={sy(v)} y2={sy(v)} style={GRID} />
          <line x1={x0 - 4} x2={x0} y1={sy(v)} y2={sy(v)} className="dg-line dg-thin" />
          <text x={x0 - 7} y={sy(v) + 4} textAnchor="end" className="dg-text" style={T11}>
            {fmtNum(v, o.fmt)}
          </text>
        </g>
      ))}
      {o.broken && (
        <text x={x0 - 7} y={yBot + 4} textAnchor="end" className="dg-text" style={T11}>
          {fmtNum(0, o.fmt)}
        </text>
      )}
    </g>
  );
  const mid = yBot - brk / 2;
  const overlay = (
    <g>
      {o.broken && (
        <g>
          <line x1={x0 - 1} x2={x1} y1={mid} y2={mid} style={{ stroke: "var(--bg)", strokeWidth: 7 }} />
          <path
            d={`M ${x0 - 6} ${mid + 4} L ${x0 + 2} ${mid + 1} L ${x0 - 2} ${mid - 1} L ${x0 + 6} ${mid - 4}`}
            className="dg-line dg-thin"
          />
        </g>
      )}
      <line x1={x0} x2={x0} y1={yTop} y2={yBot} className="dg-line" />
      <line x1={x0} x2={x1} y1={yBot} y2={yBot} className="dg-line" />
    </g>
  );
  return { x0, x1, yTop, yBot, sy, base: yBot, grid, overlay };
}

function Titles({ o, f }: { o: FrameOpts; f: Frame }) {
  const lg = o.legend ?? [];
  return (
    <g>
      {o.title && (
        <text x={(f.x0 + f.x1) / 2} y={16} textAnchor="middle" className="dg-text" style={TT}>
          {o.title}
        </text>
      )}
      {o.yLabel && (
        <text transform={`translate(13 ${(f.yTop + f.yBot) / 2}) rotate(-90)`} textAnchor="middle" className="dg-text" style={T11}>
          {o.yLabel}
        </text>
      )}
      {o.xLabel && (
        <text x={(f.x0 + f.x1) / 2} y={o.H - 6} textAnchor="middle" className="dg-text" style={T11}>
          {o.xLabel}
        </text>
      )}
      {lg.length > 0 && (
        <g>
          {lg.map((name, i) => {
            const lx = f.x0 + i * 100;
            const ly = o.title ? 30 : 14;
            return (
              <g key={name}>
                <rect x={lx} y={ly - 8} width={10} height={10} style={SERIES_STYLE[i % 4]} />
                <text x={lx + 14} y={ly + 1} className="dg-text" style={T11}>
                  {name}
                </text>
              </g>
            );
          })}
        </g>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Bar graph (single, grouped / side-by-side, stacked / segmented)     */
/* ------------------------------------------------------------------ */

export interface BarSeries {
  name: string;
  values: number[];
}

export interface BarGraphProps {
  title?: string;
  categories: string[];
  series: BarSeries[];
  mode?: "single" | "grouped" | "stacked";
  yMin?: number;
  yMax: number;
  yStep: number;
  yMinor?: number;
  yLabel?: string;
  xLabel?: string;
  fmt?: Fmt;
  /** print the value above each bar (stacked: the segment value inside it) */
  showValues?: boolean;
  /** category index to emphasise */
  highlight?: number;
  width?: number;
  height?: number;
}

export function BarGraph(p: BarGraphProps) {
  const W = p.width ?? 340;
  const H = p.height ?? 250;
  const mode = p.mode ?? "single";
  const yMin = p.yMin ?? 0;
  const broken = yMin > 0;
  const legend = p.series.length > 1 ? p.series.map((s) => s.name) : [];
  const o: FrameOpts = { W, H, title: p.title, legend, yMin, yMax: p.yMax, yStep: p.yStep, yMinor: p.yMinor, yLabel: p.yLabel, xLabel: p.xLabel, fmt: p.fmt, broken };
  const f = makeFrame(o);
  const n = p.categories.length;
  const slot = (f.x1 - f.x0) / n;
  const nGroup = mode === "grouped" ? p.series.length : 1;
  const barW = Math.min(46, (slot * 0.72) / nGroup);
  const groupW = barW * nGroup;
  const stackTop: number[] = new Array(n).fill(0);
  const bars: ReactNode[] = [];
  const labels: ReactNode[] = [];
  p.categories.forEach((c, ci) => {
    const cx = f.x0 + slot * (ci + 0.5);
    labels.push(<Lines key={"c" + ci} x={cx} y={f.yBot + 15} text={c} style={T11} />);
    p.series.forEach((s, si) => {
      const v = s.values[ci];
      if (v === undefined) return;
      const style = p.highlight === ci && mode !== "stacked" ? HILITE : SERIES_STYLE[si % 4];
      if (mode === "stacked") {
        const lo = stackTop[ci];
        const hi = lo + v;
        stackTop[ci] = hi;
        const yTopPx = f.sy(hi);
        const yLoPx = lo === 0 ? f.base : f.sy(lo);
        bars.push(<rect key={`b${ci}-${si}`} x={r2(cx - barW / 2)} y={yTopPx} width={r2(barW)} height={r2(yLoPx - yTopPx)} style={style} />);
        if (p.showValues) {
          bars.push(
            <text key={`v${ci}-${si}`} x={cx} y={r2((yTopPx + yLoPx) / 2 + 4)} textAnchor="middle" className="dg-text" style={{ ...T10, fill: "var(--fg)" }}>
              {fmtNum(v, p.fmt)}
            </text>,
          );
        }
      } else {
        const bx = cx - groupW / 2 + si * (mode === "grouped" ? barW : 0);
        const yv = f.sy(v);
        bars.push(<rect key={`b${ci}-${si}`} x={r2(bx)} y={yv} width={r2(barW)} height={r2(f.base - yv)} style={style} />);
        if (p.showValues) {
          bars.push(
            <text key={`v${ci}-${si}`} x={r2(bx + barW / 2)} y={yv - 3} textAnchor="middle" className="dg-text" style={T10}>
              {fmtNum(v, p.fmt)}
            </text>,
          );
        }
      }
    });
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label={p.title ?? "Bar graph"}>
      {f.grid}
      {bars}
      {f.overlay}
      {labels}
      <Titles o={o} f={f} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Histogram                                                           */
/* ------------------------------------------------------------------ */

export interface HistogramProps {
  title?: string;
  /** class boundaries, ascending; counts[i] belongs to the interval edges[i]..edges[i+1] */
  edges: number[];
  counts: number[];
  yMax: number;
  yStep: number;
  yMinor?: number;
  yLabel?: string;
  xLabel?: string;
  fmt?: Fmt;
  /** "edges": number line labelled at class boundaries; "mids": bar centred on each value (few values) */
  tickMode?: "edges" | "mids";
  /** labels for tickMode "mids" (default: the midpoints) */
  midLabels?: string[];
  showValues?: boolean;
  /** x tick label every k-th edge (default 1) */
  xEvery?: number;
  /** bar indices to emphasise */
  highlight?: number[];
  width?: number;
  height?: number;
}

export function Histogram(p: HistogramProps) {
  const W = p.width ?? 340;
  const H = p.height ?? 240;
  const o: FrameOpts = { W, H, title: p.title, yMin: 0, yMax: p.yMax, yStep: p.yStep, yMinor: p.yMinor, yLabel: p.yLabel, xLabel: p.xLabel, fmt: p.fmt, rightMargin: 16 };
  const f = makeFrame(o);
  const lo = p.edges[0];
  const hi = p.edges[p.edges.length - 1];
  const sx = (x: number) => r2(f.x0 + ((x - lo) / (hi - lo)) * (f.x1 - f.x0));
  const every = p.xEvery ?? 1;
  const mode = p.tickMode ?? "edges";
  const bars = p.counts.map((c, i) => {
    const hl = p.highlight?.includes(i);
    const x = sx(p.edges[i]);
    const w = r2(sx(p.edges[i + 1]) - x);
    const y = f.sy(c);
    return (
      <g key={i}>
        <rect x={x} y={y} width={w} height={r2(f.base - y)} style={hl ? HILITE : SERIES_STYLE[0]} />
        {p.showValues && c > 0 && (
          <text x={r2(x + w / 2)} y={y - 3} textAnchor="middle" className="dg-text" style={T10}>
            {fmtNum(c, p.fmt)}
          </text>
        )}
      </g>
    );
  });
  const ticks =
    mode === "edges"
      ? p.edges.map((e, i) => (i % every === 0 ? { x: sx(e), t: String(e) } : null)).filter(Boolean) as { x: number; t: string }[]
      : p.counts.map((_, i) => ({ x: r2((sx(p.edges[i]) + sx(p.edges[i + 1])) / 2), t: p.midLabels ? p.midLabels[i] : String((p.edges[i] + p.edges[i + 1]) / 2) }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label={p.title ?? "Histogram"}>
      {f.grid}
      {bars}
      {f.overlay}
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={t.x} x2={t.x} y1={f.yBot} y2={f.yBot + 4} className="dg-line dg-thin" />
          <text x={t.x} y={f.yBot + 16} textAnchor="middle" className="dg-text" style={T11}>
            {t.t}
          </text>
        </g>
      ))}
      <Titles o={o} f={f} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Circle graph                                                        */
/* ------------------------------------------------------------------ */

export interface Slice {
  label: string;
  value: number;
}

export interface CircleGraphProps {
  title?: string;
  /** values may be percents or raw amounts; each sector is value / sum of values */
  slices: Slice[];
  /** text under the title, e.g. "Total: $2,400" */
  totalText?: string;
  /** show "label" and percent outside each sector (default true) */
  showPercent?: boolean;
  /** also show central angle in degrees */
  showAngle?: boolean;
  /** use "?" instead of the percent for these slice indices */
  hidePercent?: number[];
  highlight?: number;
  width?: number;
  height?: number;
}

function pctText(x: number): string {
  const v = Math.round(x * 10) / 10;
  return (Number.isInteger(v) ? String(v) : v.toFixed(1)) + "%";
}

export function CircleGraph(p: CircleGraphProps) {
  const W = p.width ?? 340;
  const H = p.height ?? 250;
  const sum = p.slices.reduce((a, s) => a + s.value, 0);
  const cx = W / 2;
  const cy = p.title ? (p.totalText ? 140 : 132) : 120;
  const R = 70;
  const showP = p.showPercent ?? true;
  let acc = 0;
  const parts = p.slices.map((s, i) => {
    const frac = s.value / sum;
    const a1 = acc * 360;
    const a2 = (acc + frac) * 360;
    acc += frac;
    const mid = (a1 + a2) / 2;
    // clockwise from 12 o'clock: x = sin, y = -cos
    const pt = (r: number, a: number): [number, number] => [r2(cx + r * Math.sin(rad(a))), r2(cy - r * Math.cos(rad(a)))];
    const [sx, sy] = pt(R, a1);
    const [ex, ey] = pt(R, a2);
    const large = a2 - a1 > 180 ? 1 : 0;
    const d = frac >= 0.9999 ? `M ${cx} ${cy - R} A ${R} ${R} 0 1 1 ${cx - 0.01} ${cy - R} Z` : `M ${cx} ${cy} L ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${ex} ${ey} Z`;
    const [lx0, ly0] = pt(R, mid);
    const [lx1, ly1] = pt(R + 9, mid);
    const [tx, ty] = pt(R + 13, mid);
    const right = Math.sin(rad(mid)) >= 0;
    const hl = p.highlight === i;
    const fillStyle: CSSProperties = hl ? HILITE : SERIES_STYLE[i % 2 === 0 ? (i % 4 === 0 ? 0 : 2) : i % 4 === 1 ? 1 : 3];
    const pctStr = p.hidePercent?.includes(i) ? "?" : pctText(frac * 100);
    const angStr = `${r2(frac * 360)}°`;
    const second = showP ? (p.showAngle ? `${pctStr}, ${angStr}` : pctStr) : "";
    // vertical offset so two-line labels centre on the leader end
    const dy = Math.cos(rad(mid)) > 0.5 ? -2 : Math.cos(rad(mid)) < -0.5 ? 12 : 4;
    return (
      <g key={i}>
        <path d={d} style={{ ...fillStyle, stroke: "var(--bg)", strokeWidth: 1.5 }} />
        <line x1={lx0} y1={ly0} x2={lx1} y2={ly1} className="dg-line dg-thin" />
        <text x={tx} y={ty + dy - (second ? 6 : 0)} textAnchor={right ? "start" : "end"} className="dg-text" style={T11}>
          <tspan x={tx}>{s.label}</tspan>
          {second && (
            <tspan x={tx} dy={12}>
              {second}
            </tspan>
          )}
        </text>
      </g>
    );
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label={p.title ?? "Circle graph"}>
      {p.title && (
        <text x={W / 2} y={16} textAnchor="middle" className="dg-text" style={TT}>
          {p.title}
        </text>
      )}
      {p.totalText && (
        <text x={W / 2} y={31} textAnchor="middle" className="dg-text" style={T11}>
          {p.totalText}
        </text>
      )}
      {parts}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Scatterplot with optional trend line                                */
/* ------------------------------------------------------------------ */

export interface ScatterProps {
  title?: string;
  points: [number, number][];
  xMin: number;
  xMax: number;
  xStep: number;
  yMin?: number;
  yMax: number;
  yStep: number;
  yMinor?: number;
  xLabel?: string;
  yLabel?: string;
  /** trend line through (x1,y1) and (x2,y2), drawn across the whole x range */
  trend?: [number, number, number, number];
  /** label for the trend line and its position in data coordinates */
  trendLabel?: string;
  trendLabelPos?: [number, number];
  /** vertical dashed guide at this x */
  guideX?: number;
  /** indices of points to emphasise */
  highlight?: number[];
  fmt?: Fmt;
  width?: number;
  height?: number;
}

export function Scatterplot(p: ScatterProps) {
  const W = p.width ?? 340;
  const H = p.height ?? 250;
  const yMin = p.yMin ?? 0;
  const broken = yMin > 0;
  const o: FrameOpts = { W, H, title: p.title, yMin, yMax: p.yMax, yStep: p.yStep, yMinor: p.yMinor, yLabel: p.yLabel, xLabel: p.xLabel, fmt: p.fmt, broken, rightMargin: 16 };
  const f = makeFrame(o);
  const sx = (x: number) => r2(f.x0 + ((x - p.xMin) / (p.xMax - p.xMin)) * (f.x1 - f.x0));
  const xt: number[] = [];
  for (let v = p.xMin; v <= p.xMax + 1e-9; v += p.xStep) xt.push(r2(v));
  let trend: ReactNode = null;
  if (p.trend) {
    const [x1, y1, x2, y2] = p.trend;
    const m = (y2 - y1) / (x2 - x1);
    const yAt = (x: number) => y1 + m * (x - x1);
    const ya = yAt(p.xMin);
    const yb = yAt(p.xMax);
    trend = (
      <g>
        <line x1={sx(p.xMin)} y1={f.sy(ya)} x2={sx(p.xMax)} y2={f.sy(yb)} className="dg-accent" />
        {p.trendLabel && p.trendLabelPos && (
          <text x={sx(p.trendLabelPos[0])} y={f.sy(p.trendLabelPos[1])} textAnchor="middle" className="dg-text" style={{ ...T11, fill: "var(--accent)" }}>
            {p.trendLabel}
          </text>
        )}
      </g>
    );
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label={p.title ?? "Scatterplot"}>
      {f.grid}
      {xt.map((v) => (
        <g key={v}>
          <line x1={sx(v)} x2={sx(v)} y1={f.yTop} y2={f.yBot} style={GRID_MINOR} />
          <line x1={sx(v)} x2={sx(v)} y1={f.yBot} y2={f.yBot + 4} className="dg-line dg-thin" />
          <text x={sx(v)} y={f.yBot + 16} textAnchor="middle" className="dg-text" style={T11}>
            {v}
          </text>
        </g>
      ))}
      {p.guideX !== undefined && <line x1={sx(p.guideX)} x2={sx(p.guideX)} y1={f.yTop} y2={f.yBot} className="dg-line dg-thin dg-dashed" />}
      {trend}
      {f.overlay}
      {p.points.map(([x, y], i) => (
        <circle key={i} cx={sx(x)} cy={f.sy(y)} r={p.highlight?.includes(i) ? 4.2 : 3} className="dg-point" style={p.highlight?.includes(i) ? { fill: "var(--accent)", stroke: "var(--fg)" } : undefined} />
      ))}
      <Titles o={o} f={f} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Line graph / time series                                            */
/* ------------------------------------------------------------------ */

export interface LineSeries {
  name: string;
  values: (number | null)[];
  dashed?: boolean;
}

export interface LineGraphProps {
  title?: string;
  /** labels on the horizontal axis, equally spaced (e.g. years) */
  xs: string[];
  series: LineSeries[];
  yMin?: number;
  yMax: number;
  yStep: number;
  yMinor?: number;
  xLabel?: string;
  yLabel?: string;
  fmt?: Fmt;
  /** x indices to emphasise with a dashed guide */
  guides?: number[];
  showValues?: boolean;
  width?: number;
  height?: number;
}

export function LineGraph(p: LineGraphProps) {
  const W = p.width ?? 340;
  const H = p.height ?? 250;
  const yMin = p.yMin ?? 0;
  const broken = yMin > 0;
  const legend = p.series.length > 1 ? p.series.map((s) => s.name) : [];
  const o: FrameOpts = { W, H, title: p.title, legend, yMin, yMax: p.yMax, yStep: p.yStep, yMinor: p.yMinor, yLabel: p.yLabel, xLabel: p.xLabel, fmt: p.fmt, broken, rightMargin: 16 };
  const f = makeFrame(o);
  const n = p.xs.length;
  const pad = 14;
  const sx = (i: number) => r2(f.x0 + pad + (i * (f.x1 - f.x0 - 2 * pad)) / (n - 1));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label={p.title ?? "Line graph"}>
      {f.grid}
      {p.xs.map((x, i) => (
        <g key={i}>
          <line x1={sx(i)} x2={sx(i)} y1={f.yBot} y2={f.yBot + 4} className="dg-line dg-thin" />
          <text x={sx(i)} y={f.yBot + 16} textAnchor="middle" className="dg-text" style={n > 7 ? T10 : T11}>
            {x}
          </text>
        </g>
      ))}
      {(p.guides ?? []).map((i) => (
        <line key={"g" + i} x1={sx(i)} x2={sx(i)} y1={f.yTop} y2={f.yBot} className="dg-line dg-thin dg-dashed" />
      ))}
      {f.overlay}
      {p.series.map((s, si) => {
        const pts = s.values.map((v, i) => (v === null ? null : ([sx(i), f.sy(v)] as [number, number])));
        const segs: string[] = [];
        let cur = "";
        pts.forEach((pt) => {
          if (!pt) {
            if (cur) segs.push(cur);
            cur = "";
          } else cur += `${cur ? " L" : "M"} ${pt[0]} ${pt[1]}`;
        });
        if (cur) segs.push(cur);
        const cls = si === 0 ? "dg-accent" : "dg-line";
        return (
          <g key={si}>
            {segs.map((d, k) => (
              <path key={k} d={d} className={cls + (s.dashed ? " dg-dashed" : "")} />
            ))}
            {pts.map((pt, i) =>
              pt ? (
                <g key={i}>
                  <circle cx={pt[0]} cy={pt[1]} r={3} className="dg-point" />
                  {p.showValues && (
                    <text x={pt[0]} y={pt[1] - 6} textAnchor="middle" className="dg-text" style={T10}>
                      {fmtNum(s.values[i] as number, p.fmt)}
                    </text>
                  )}
                </g>
              ) : null,
            )}
          </g>
        );
      })}
      <Titles o={o} f={f} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export const registry = {
  "4-1-presenting-data/bar-graph": BarGraph,
  "4-1-presenting-data/histogram": Histogram,
  "4-1-presenting-data/circle-graph": CircleGraph,
  "4-1-presenting-data/scatterplot": Scatterplot,
  "4-1-presenting-data/line-graph": LineGraph,
};
