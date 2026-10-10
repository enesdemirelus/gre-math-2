// Original diagrams for section 4.5 Distributions, Random Variables, and Probability Distributions.
// All curves are computed from the true normal density / gamma density; nothing is hand-drawn.

const r2 = (n: number) => Math.round(n * 100) / 100;

const W = 360;
const LEFT = 24;
const RIGHT = 336;
const BASE = 160;

/** Standard normal density. */
const phi = (z: number) => Math.exp(-(z * z) / 2) / Math.sqrt(2 * Math.PI);
/** Normal density with mean m and SD d. */
const npdf = (x: number, m: number, d: number) => phi((x - m) / d) / d;

function Axis({ y = BASE }: { y?: number }) {
  return <line x1={LEFT - 8} y1={y} x2={RIGHT + 8} y2={y} className="dg-line" />;
}

function T({ x, y, children, cls = "dg-text", anchor = "middle" }: { x: number; y: number; children: string; cls?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={r2(x)} y={r2(y)} className={cls} textAnchor={anchor} dominantBaseline="central">
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Normal curve with optional shading, tick labels and labels       */
/* ------------------------------------------------------------------ */

export interface NormalCurveProps {
  mean: number;
  sd: number;
  xmin: number;
  xmax: number;
  /** Shaded interval; null or undefined end means "unbounded" (clipped to the axis). */
  shade?: [number | null, number | null];
  /** Tick marks (x values) and their labels. */
  ticks?: number[];
  tickLabels?: string[];
  /** Vertical lines drawn from the axis up to the curve. */
  vlines?: number[];
  /** Texts placed inside the plot at x (data units), height as a fraction 0..1 of the plot height. */
  labels?: { x: number; text: string; h?: number }[];
  /** Dashed vertical line at the mean. */
  meanLine?: boolean;
  /** Reserved density so that several figures can share a vertical scale. */
  ymax?: number;
}

export function NormalCurve(p: NormalCurveProps) {
  const ymax = p.ymax ?? npdf(p.mean, p.mean, p.sd) * 1.08;
  const H = 128;
  const sx = (x: number) => LEFT + ((x - p.xmin) / (p.xmax - p.xmin)) * (RIGHT - LEFT);
  const sy = (f: number) => BASE - (f / ymax) * H;
  const N = 220;
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const x = p.xmin + ((p.xmax - p.xmin) * i) / N;
    pts.push([sx(x), sy(npdf(x, p.mean, p.sd))]);
  }
  const curve = "M " + pts.map((q) => `${r2(q[0])} ${r2(q[1])}`).join(" L ");

  let shadeD = "";
  if (p.shade) {
    const lo = Math.max(p.shade[0] ?? p.xmin, p.xmin);
    const hi = Math.min(p.shade[1] ?? p.xmax, p.xmax);
    if (hi > lo) {
      const M = 120;
      const s: string[] = [`${r2(sx(lo))} ${BASE}`];
      for (let i = 0; i <= M; i++) {
        const x = lo + ((hi - lo) * i) / M;
        s.push(`${r2(sx(x))} ${r2(sy(npdf(x, p.mean, p.sd)))}`);
      }
      s.push(`${r2(sx(hi))} ${BASE}`);
      shadeD = "M " + s.join(" L ") + " Z";
    }
  }

  return (
    <svg viewBox={`0 0 ${W} 212`} width={W} role="img" aria-label={`Normal curve with mean ${p.mean} and standard deviation ${p.sd}`}>
      {shadeD && <path d={shadeD} className="dg-accent-fill" />}
      <path d={curve} className="dg-line" />
      <Axis />
      {(p.vlines ?? []).map((v) => (
        <line key={`v${v}`} x1={r2(sx(v))} y1={BASE} x2={r2(sx(v))} y2={r2(sy(npdf(v, p.mean, p.sd)))} className="dg-line dg-thin" />
      ))}
      {p.meanLine && (
        <line x1={r2(sx(p.mean))} y1={BASE} x2={r2(sx(p.mean))} y2={r2(sy(npdf(p.mean, p.mean, p.sd)))} className="dg-line dg-dashed" />
      )}
      {(p.ticks ?? []).map((t, i) => (
        <g key={`t${i}`}>
          <line x1={r2(sx(t))} y1={BASE} x2={r2(sx(t))} y2={BASE + 5} className="dg-line" />
          <T x={sx(t)} y={BASE + 16}>{((p.tickLabels ?? [])[i] ?? String(t)).replace("-", "\u2212")}</T>
        </g>
      ))}
      {(p.labels ?? []).map((l, i) => (
        <T key={`l${i}`} x={sx(l.x)} y={BASE - (l.h ?? 0.12) * H}>{l.text}</T>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Two normal curves: same spread / different centers, or the other */
/* ------------------------------------------------------------------ */

export function NormalCompare({ mode }: { mode: "shift" | "spread" }) {
  const xmin = mode === "shift" ? 10 : 20;
  const xmax = mode === "shift" ? 90 : 80;
  const a = mode === "shift" ? { m: 35, d: 6 } : { m: 50, d: 4 };
  const b = mode === "shift" ? { m: 62, d: 6 } : { m: 50, d: 10 };
  const ymax = npdf(a.m, a.m, a.d) * 1.1;
  const H = 128;
  const sx = (x: number) => LEFT + ((x - xmin) / (xmax - xmin)) * (RIGHT - LEFT);
  const sy = (f: number) => BASE - (f / ymax) * H;
  const path = (c: { m: number; d: number }) => {
    const out: string[] = [];
    for (let i = 0; i <= 240; i++) {
      const x = xmin + ((xmax - xmin) * i) / 240;
      out.push(`${r2(sx(x))} ${r2(sy(npdf(x, c.m, c.d)))}`);
    }
    return "M " + out.join(" L ");
  };
  const ticks = mode === "shift" ? [20, 35, 50, 62, 80] : [20, 35, 50, 65, 80];
  return (
    <svg viewBox={`0 0 ${W} 212`} width={W} role="img" aria-label={mode === "shift" ? "Two normal curves with the same spread and different centers" : "Two normal curves with the same center and different spreads"}>
      <path d={path(b)} className="dg-line" />
      <path d={path(a)} className="dg-accent" />
      <Axis />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={r2(sx(t))} y1={BASE} x2={r2(sx(t))} y2={BASE + 5} className="dg-line" />
          <T x={sx(t)} y={BASE + 16}>{String(t)}</T>
        </g>
      ))}
      <T x={mode === "shift" ? sx(a.m) - 30 : sx(56)} y={mode === "shift" ? BASE - 0.55 * H : BASE - 0.62 * H} cls="dg-label">A</T>
      <T x={mode === "shift" ? sx(b.m) + 30 : sx(70)} y={mode === "shift" ? BASE - 0.55 * H : BASE - 0.2 * H} cls="dg-label">B</T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Standard normal curve with the six interval probabilities (like  */
/*    Mathematical Conventions Figure 7)                               */
/* ------------------------------------------------------------------ */

export function StdNormalFigure() {
  const xmin = -3.6;
  const xmax = 3.6;
  const ymax = phi(0) * 1.08;
  const H = 128;
  const sx = (x: number) => LEFT + ((x - xmin) / (xmax - xmin)) * (RIGHT - LEFT);
  const sy = (f: number) => BASE - (f / ymax) * H;
  const curve: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const x = xmin + ((xmax - xmin) * i) / 240;
    curve.push(`${r2(sx(x))} ${r2(sy(phi(x)))}`);
  }
  const tail = (lo: number, hi: number) => {
    const s: string[] = [`${r2(sx(lo))} ${BASE}`];
    for (let i = 0; i <= 40; i++) {
      const x = lo + ((hi - lo) * i) / 40;
      s.push(`${r2(sx(x))} ${r2(sy(phi(x)))}`);
    }
    s.push(`${r2(sx(hi))} ${BASE}`);
    return "M " + s.join(" L ") + " Z";
  };
  const lines = [-2, -1, 0, 1, 2];
  const mids: [number, string][] = [
    [-1.5, "0.14"],
    [-0.5, "0.34"],
    [0.5, "0.34"],
    [1.5, "0.14"],
  ];
  return (
    <svg viewBox={`0 0 ${W} 212`} width={W} role="img" aria-label="Standard normal curve with approximate probabilities 0.02, 0.14, 0.34, 0.34, 0.14, 0.02">
      <path d={tail(xmin, -2)} className="dg-accent-fill" />
      <path d={tail(2, xmax)} className="dg-accent-fill" />
      <path d={"M " + curve.join(" L ")} className="dg-line" />
      <Axis />
      {lines.map((v) => (
        <g key={v}>
          <line x1={r2(sx(v))} y1={BASE} x2={r2(sx(v))} y2={r2(sy(phi(v)))} className="dg-line dg-thin" />
          <line x1={r2(sx(v))} y1={BASE} x2={r2(sx(v))} y2={BASE + 5} className="dg-line" />
          <T x={sx(v)} y={BASE + 16}>{String(v).replace("-", "−")}</T>
        </g>
      ))}
      {mids.map(([x, t]) => (
        <T key={x} x={sx(x)} y={BASE - 0.1 * H}>{t}</T>
      ))}
      <T x={sx(-3.05)} y={BASE - 0.3 * H}>0.02</T>
      <line x1={r2(sx(-3.05))} y1={BASE - 0.3 * H + 8} x2={r2(sx(-2.5))} y2={r2(sy(phi(2.5)) - 1)} className="dg-line dg-thin" />
      <T x={sx(3.05)} y={BASE - 0.3 * H}>0.02</T>
      <line x1={r2(sx(3.05))} y1={BASE - 0.3 * H + 8} x2={r2(sx(2.5))} y2={r2(sy(phi(2.5)) - 1)} className="dg-line dg-thin" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Relative frequency histogram -> distribution curve (gamma shape) */
/* ------------------------------------------------------------------ */

/** Gamma(shape 3, scale 1) density and cdf (right-skewed, mean 3). */
const g3 = (x: number) => (x <= 0 ? 0 : (x * x * Math.exp(-x)) / 2);
const G3 = (x: number) => (x <= 0 ? 0 : 1 - Math.exp(-x) * (1 + x + (x * x) / 2));

export function HistToCurve({ mode, slice }: { mode: "bars" | "both" | "curve"; slice?: [number, number] }) {
  const xmin = 0;
  const xmax = 10;
  const ymax = 0.29;
  const H = 128;
  const sx = (x: number) => LEFT + ((x - xmin) / (xmax - xmin)) * (RIGHT - LEFT);
  const sy = (f: number) => BASE - (f / ymax) * H;
  const bw = 0.5;
  const bars = [];
  for (let k = 0; k < 20; k++) {
    const lo = k * bw;
    const h = (G3(lo + bw) - G3(lo)) / bw; // relative frequency per unit of x: bar AREA = proportion
    bars.push(<rect key={k} x={r2(sx(lo))} y={r2(sy(h))} width={r2(sx(lo + bw) - sx(lo))} height={r2(BASE - sy(h))} className="dg-line dg-thin" style={{ fill: "var(--dg-fill)" }} />);
  }
  const curve: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const x = (xmax * i) / 200;
    curve.push(`${r2(sx(x))} ${r2(sy(g3(x)))}`);
  }
  let sliceD = "";
  if (slice) {
    const s: string[] = [`${r2(sx(slice[0]))} ${BASE}`];
    for (let i = 0; i <= 60; i++) {
      const x = slice[0] + ((slice[1] - slice[0]) * i) / 60;
      s.push(`${r2(sx(x))} ${r2(sy(g3(x)))}`);
    }
    s.push(`${r2(sx(slice[1]))} ${BASE}`);
    sliceD = "M " + s.join(" L ") + " Z";
  }
  return (
    <svg viewBox={`0 0 ${W} 212`} width={W} role="img" aria-label="Relative frequency histogram and its smooth distribution curve">
      {mode !== "curve" && bars}
      {sliceD && <path d={sliceD} className="dg-accent-fill" />}
      {mode !== "bars" && <path d={"M " + curve.join(" L ")} className={mode === "both" ? "dg-accent" : "dg-line"} />}
      <Axis />
      {slice && (
        <>
          <line x1={r2(sx(slice[0]))} y1={BASE} x2={r2(sx(slice[0]))} y2={r2(sy(g3(slice[0])))} className="dg-line" />
          <line x1={r2(sx(slice[1]))} y1={BASE} x2={r2(sx(slice[1]))} y2={r2(sy(g3(slice[1])))} className="dg-line" />
          <T x={sx(slice[0])} y={BASE + 16} cls="dg-label">a</T>
          <T x={sx(slice[1])} y={BASE + 16} cls="dg-label">b</T>
          <T x={sx((slice[0] + slice[1]) / 2)} y={BASE - 24}>area</T>
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Skewed curve: mode, median, mean (gamma shape 2)                 */
/* ------------------------------------------------------------------ */

export function SkewMeanMedian() {
  const g2 = (x: number) => (x <= 0 ? 0 : x * Math.exp(-x));
  const G2 = (x: number) => 1 - Math.exp(-x) * (1 + x);
  let lo = 0;
  let hi = 8;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (G2(mid) < 0.5) lo = mid;
    else hi = mid;
  }
  const median = (lo + hi) / 2; // 1.678...
  const xmin = 0;
  const xmax = 8;
  const ymax = 0.4;
  const H = 128;
  const sx = (x: number) => LEFT + ((x - xmin) / (xmax - xmin)) * (RIGHT - LEFT);
  const sy = (f: number) => BASE - (f / ymax) * H;
  const curve: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const x = (xmax * i) / 200;
    curve.push(`${r2(sx(x))} ${r2(sy(g2(x)))}`);
  }
  const marks: [number, string, number, string][] = [
    [1, "mode", 1, "dg-line dg-dashed"],
    [median, "median", 2, "dg-line dg-dashed"],
    [2, "mean", 1, "dg-accent"],
  ];
  return (
    <svg viewBox={`0 0 ${W} 212`} width={W} role="img" aria-label="Right-skewed distribution curve with mode, median and mean marked">
      <path d={"M " + curve.join(" L ")} className="dg-line" />
      <Axis />
      {marks.map(([x, name, row, cls]) => (
        <g key={name}>
          <line x1={r2(sx(x))} y1={BASE} x2={r2(sx(x))} y2={r2(sy(g2(x)))} className={cls} />
          <T x={sx(x)} y={BASE + 6 + row * 16} cls="dg-text">{name}</T>
        </g>
      ))}
      <T x={sx(5.6)} y={BASE - 0.2 * H}>long right tail</T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Probability histogram for a discrete random variable             */
/* ------------------------------------------------------------------ */

export interface ProbHistogramProps {
  values: number[];
  probs: number[];
  /** Probability axis tick values (e.g. [0, 0.1, 0.2, 0.3]). */
  yTicks: number[];
  /** Values whose bars are highlighted. */
  highlight?: number[];
  /** Mark the mean with a small triangle under the axis. */
  mean?: number;
  xLabel?: string;
}

export function ProbHistogram(p: ProbHistogramProps) {
  const top = 30;
  const base = 150;
  const left = 54;
  const right = 340;
  const ymax = p.yTicks[p.yTicks.length - 1];
  const n = p.values.length;
  const step = (right - left) / n;
  const bw = step * 0.84;
  const cx = (i: number) => left + step * (i + 0.5);
  const sy = (f: number) => base - (f / ymax) * (base - top);
  const dec = (t: number) => (Math.abs(t * 100 - Math.round(t * 100)) < 1e-9 && Math.round(t * 100) % 10 !== 0 ? t.toFixed(2) : t.toFixed(1)).replace(/^0\.0$/, "0");
  const meanX = p.mean === undefined ? null : left + step * (0.5 + (p.mean - p.values[0]) / (p.values[1] - p.values[0]));
  return (
    <svg viewBox={`0 0 ${W} 212`} width={W} role="img" aria-label="Probability histogram of a discrete random variable">
      {p.yTicks.map((t) => (
        <g key={t}>
          <line x1={left - 4} y1={r2(sy(t))} x2={left} y2={r2(sy(t))} className="dg-line" />
          {t > 0 && <line x1={left} y1={r2(sy(t))} x2={right} y2={r2(sy(t))} className="dg-line dg-thin dg-dashed" opacity={0.35} />}
          <T x={left - 8} y={sy(t)} anchor="end">{dec(t)}</T>
        </g>
      ))}
      {p.values.map((v, i) => (
        <rect
          key={v}
          x={r2(cx(i) - bw / 2)}
          y={r2(sy(p.probs[i]))}
          width={r2(bw)}
          height={r2(base - sy(p.probs[i]))}
          className={(p.highlight ?? []).includes(v) ? "dg-accent-fill dg-line" : "dg-line"}
          style={(p.highlight ?? []).includes(v) ? undefined : { fill: "var(--dg-fill)" }}
        />
      ))}
      <line x1={left} y1={top - 6} x2={left} y2={base} className="dg-line" />
      <line x1={left} y1={base} x2={right} y2={base} className="dg-line" />
      {p.values.map((v, i) => (
        <T key={v} x={cx(i)} y={base + 13}>{String(v)}</T>
      ))}
      {meanX !== null && (
        <g>
          <path d={`M ${r2(meanX)} ${base + 22} l -6 10 l 12 0 Z`} className="dg-accent-fill dg-line" />
          <T x={meanX + 10} y={base + 28} anchor="start">mean</T>
        </g>
      )}
      <T x={(left + right) / 2} y={base + 46} cls="dg-label">{p.xLabel ?? "X"}</T>
      <T x={left - 22} y={top - 18} cls="dg-label">P(X)</T>
    </svg>
  );
}

export const registry = {
  "4-5-distributions/normal-curve": NormalCurve,
  "4-5-distributions/normal-compare": NormalCompare,
  "4-5-distributions/std-normal": StdNormalFigure,
  "4-5-distributions/hist-to-curve": HistToCurve,
  "4-5-distributions/skew": SkewMeanMedian,
  "4-5-distributions/prob-histogram": ProbHistogram,
};
