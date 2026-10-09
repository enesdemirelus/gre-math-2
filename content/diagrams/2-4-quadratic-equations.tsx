// Original diagrams for section 2.4 Solving Quadratic Equations.
// Coordinate planes are drawn to scale (MC p. 11): equal units on both axes, every point computed
// from y = ax^2 + bx + c.

const r2 = (n: number) => Math.round(n * 100) / 100;

export interface PlaneWindow {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  /** pixels per unit (same on both axes) */
  u: number;
  /** left/top padding in pixels */
  ox: number;
  oy: number;
}

export const toX = (w: PlaneWindow, x: number) => r2(w.ox + (x - w.xmin) * w.u);
export const toY = (w: PlaneWindow, y: number) => r2(w.oy + (w.ymax - y) * w.u);

/** Polyline path(s) of y = ax^2 + bx + c inside the window (pieces outside the window are dropped). */
export function parabolaPath(w: PlaneWindow, a: number, b: number, c: number): string {
  const f = (x: number) => a * x * x + b * x + c;
  const N = 400;
  const parts: string[] = [];
  let cur: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = w.xmin + ((w.xmax - w.xmin) * i) / N;
    const y = f(x);
    if (y >= w.ymin - 1e-9 && y <= w.ymax + 1e-9) {
      cur.push(`${cur.length ? "L" : "M"} ${toX(w, x)} ${toY(w, y)}`);
    } else if (cur.length) {
      parts.push(cur.join(" "));
      cur = [];
    }
  }
  if (cur.length) parts.push(cur.join(" "));
  return parts.join(" ");
}

/** Axes with unit ticks, arrowheads, x / y / O labels. */
export function Axes({ w, tickLabels = [] as number[], yTickLabels = [] as number[] }: { w: PlaneWindow; tickLabels?: number[]; yTickLabels?: number[] }) {
  const X0 = toX(w, 0);
  const Y0 = toY(w, 0);
  const left = toX(w, w.xmin);
  const right = toX(w, w.xmax);
  const top = toY(w, w.ymax);
  const bottom = toY(w, w.ymin);
  const ticks: JSX.Element[] = [];
  for (let x = Math.ceil(w.xmin); x <= Math.floor(w.xmax); x++) {
    if (x === 0) continue;
    ticks.push(<line key={`tx${x}`} x1={toX(w, x)} y1={Y0 - 3} x2={toX(w, x)} y2={Y0 + 3} className="dg-line dg-thin" />);
  }
  for (let y = Math.ceil(w.ymin); y <= Math.floor(w.ymax); y++) {
    if (y === 0) continue;
    ticks.push(<line key={`ty${y}`} x1={X0 - 3} y1={toY(w, y)} x2={X0 + 3} y2={toY(w, y)} className="dg-line dg-thin" />);
  }
  return (
    <g>
      <line x1={left} y1={Y0} x2={right + 8} y2={Y0} className="dg-line dg-thin" />
      <line x1={X0} y1={bottom} x2={X0} y2={top - 8} className="dg-line dg-thin" />
      <path d={`M ${right + 10} ${Y0} l -7 -3.5 l 0 7 Z`} className="dg-point" />
      <path d={`M ${X0} ${top - 10} l -3.5 7 l 7 0 Z`} className="dg-point" />
      {ticks}
      <text x={right + 6} y={Y0 + 14} className="dg-label" textAnchor="middle">x</text>
      <text x={X0 + 12} y={top - 6} className="dg-label" textAnchor="middle">y</text>
      <text x={X0 - 9} y={Y0 + 14} className="dg-label" textAnchor="middle">O</text>
      {tickLabels.map((t) => (
        <text key={`lx${t}`} x={toX(w, t)} y={Y0 + 16} className="dg-text" textAnchor="middle" fontSize="12">
          {t < 0 ? `−${-t}` : t}
        </text>
      ))}
      {yTickLabels.map((t) => (
        <text key={`ly${t}`} x={X0 - 7} y={toY(w, t)} className="dg-text" textAnchor="end" dominantBaseline="central" fontSize="12">
          {t < 0 ? `−${-t}` : t}
        </text>
      ))}
    </g>
  );
}

type Highlight = "none" | "parabola" | "vertex" | "intercepts" | "axis" | "all";

/**
 * The parabola y = x^2 - 6x + 5 = (x - 1)(x - 5): x-intercepts 1 and 5, vertex (3, -4), line of symmetry x = 3.
 */
export function ParabolaFigure({ highlight = "all" }: { highlight?: Highlight }) {
  const w: PlaneWindow = { xmin: -1.5, xmax: 7.5, ymin: -5, ymax: 6.5, u: 26, ox: 14, oy: 22 };
  const on = (h: Highlight) => highlight === "all" || highlight === h;
  const X0 = toX(w, 0);
  const vx = toX(w, 3);
  const vy = toY(w, -4);
  return (
    <svg viewBox="0 0 270 330" width={270} role="img" aria-label="Parabola y equals x squared minus 6x plus 5">
      <Axes w={w} tickLabels={[1, 3, 5]} yTickLabels={[5]} />
      {on("axis") && <line x1={vx} y1={toY(w, w.ymax)} x2={vx} y2={toY(w, w.ymin)} className="dg-line dg-dashed dg-thin" />}
      <path d={parabolaPath(w, 1, -6, 5)} className={highlight === "parabola" || highlight === "all" ? "dg-accent" : "dg-line"} />
      {on("intercepts") && (
        <g>
          <circle cx={toX(w, 1)} cy={toY(w, 0)} r={4} className={highlight === "intercepts" ? "dg-accent" : "dg-point"} />
          <circle cx={toX(w, 5)} cy={toY(w, 0)} r={4} className={highlight === "intercepts" ? "dg-accent" : "dg-point"} />
          <circle cx={toX(w, 1)} cy={toY(w, 0)} r={2.5} className="dg-point" />
          <circle cx={toX(w, 5)} cy={toY(w, 0)} r={2.5} className="dg-point" />
        </g>
      )}
      {on("vertex") && (
        <g>
          <circle cx={vx} cy={vy} r={highlight === "vertex" ? 4 : 3} className={highlight === "vertex" ? "dg-accent" : "dg-point"} />
          <circle cx={vx} cy={vy} r={2.5} className="dg-point" />
          <text x={vx + 10} y={vy + 14} className="dg-text" textAnchor="start" fontSize="13">
            (3, −4)
          </text>
        </g>
      )}
      {(highlight === "all" || highlight === "parabola") && (
        <text x={toX(w, 6.15)} y={toY(w, 6.2)} className="dg-text" textAnchor="end" fontSize="13">
          <tspan className="dg-label">y</tspan>
          {" = "}
          <tspan className="dg-label">x</tspan>
          <tspan dy={-6} fontSize="9">2</tspan>
          <tspan dy={6}>{" − 6"}</tspan>
          <tspan className="dg-label">x</tspan>
          {" + 5"}
        </text>
      )}
      {on("axis") && (
        <text x={vx + 6} y={toY(w, 5.6)} className="dg-text" textAnchor="start" fontSize="13">
          <tspan className="dg-label">x</tspan> = 3
        </text>
      )}
      {/* y-intercept tick label sits left of the axis at y = 5 */}
      <circle cx={X0} cy={toY(w, 5)} r={2.5} className="dg-point" />
    </svg>
  );
}

/**
 * Three parabolas y = x^2 - 4x + c with c = 3, 4, 6: b^2 - 4ac = 4, 0, -8 (two, one, no x-intercepts).
 */
export function ThreeCases() {
  const cs = [3, 4, 6];
  const D = cs.map((c) => 16 - 4 * c);
  const panelW = 116;
  return (
    <svg viewBox="0 0 360 230" width={360} role="img" aria-label="Three parabolas with two, one and no x-intercepts">
      {cs.map((c, i) => {
        const w: PlaneWindow = { xmin: -0.8, xmax: 4.8, ymin: -1.5, ymax: 6.5, u: 18, ox: 6 + i * (panelW + 4), oy: 22 };
        const roots = D[i] > 0 ? [2 - Math.sqrt(D[i]) / 2, 2 + Math.sqrt(D[i]) / 2] : D[i] === 0 ? [2] : [];
        const label = D[i] > 0 ? "two solutions" : D[i] === 0 ? "one solution" : "no real solution";
        const cx = w.ox + ((w.xmax - w.xmin) * w.u) / 2;
        return (
          <g key={c}>
            <Axes w={w} />
            <path d={parabolaPath(w, 1, -4, c)} className="dg-accent" />
            {roots.map((r) => (
              <circle key={r} cx={toX(w, r)} cy={toY(w, 0)} r={3} className="dg-point" />
            ))}
            <text x={cx} y={toY(w, w.ymin) + 20} className="dg-text" textAnchor="middle" fontSize="12">
              {`c = ${c}:  b² − 4ac = ${D[i] < 0 ? "−" + -D[i] : D[i]}`}
            </text>
            <text x={cx} y={toY(w, w.ymin) + 37} className="dg-text" textAnchor="middle" fontSize="12">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export const registry = {
  "2-4-quadratic-equations/parabola": ParabolaFigure,
  "2-4-quadratic-equations/three-cases": ThreeCases,
};
