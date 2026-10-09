// Original diagrams for section 2.3 Solving Linear Equations.
// Coordinate planes are drawn to scale (MC p. 11): every pixel position is computed from the data.

const r2 = (n: number) => Math.round(n * 100) / 100;

interface Win {
  x0: number; // left pixel
  y0: number; // top pixel
  w: number;
  h: number;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

const px = (W: Win, x: number) => r2(W.x0 + ((x - W.xmin) / (W.xmax - W.xmin)) * W.w);
const py = (W: Win, y: number) => r2(W.y0 + ((W.ymax - y) / (W.ymax - W.ymin)) * W.h);

/** Segment of the line y = m x + b inside the window, or null if it misses it. */
function clipLine(W: Win, m: number, b: number): [number, number, number, number] | null {
  let lo = W.xmin;
  let hi = W.xmax;
  if (m !== 0) {
    const xa = (W.ymin - b) / m;
    const xb = (W.ymax - b) / m;
    lo = Math.max(lo, Math.min(xa, xb));
    hi = Math.min(hi, Math.max(xa, xb));
  } else if (b < W.ymin || b > W.ymax) return null;
  if (hi <= lo) return null;
  return [px(W, lo), py(W, m * lo + b), px(W, hi), py(W, m * hi + b)];
}

/** Axes with unit grid lines for a window. */
function Axes({ W, grid = true }: { W: Win; grid?: boolean }) {
  const xs: number[] = [];
  for (let t = Math.ceil(W.xmin); t <= W.xmax; t++) xs.push(t);
  const ys: number[] = [];
  for (let t = Math.ceil(W.ymin); t <= W.ymax; t++) ys.push(t);
  return (
    <g>
      {grid &&
        xs.map((t) => <line key={`gx${t}`} x1={px(W, t)} y1={W.y0} x2={px(W, t)} y2={W.y0 + W.h} className="dg-line dg-thin" style={{ opacity: 0.18 }} />)}
      {grid &&
        ys.map((t) => <line key={`gy${t}`} x1={W.x0} y1={py(W, t)} x2={W.x0 + W.w} y2={py(W, t)} className="dg-line dg-thin" style={{ opacity: 0.18 }} />)}
      <line x1={W.x0} y1={py(W, 0)} x2={W.x0 + W.w} y2={py(W, 0)} className="dg-line dg-thin" />
      <line x1={px(W, 0)} y1={W.y0} x2={px(W, 0)} y2={W.y0 + W.h} className="dg-line dg-thin" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Three cases for a system of two linear equations                    */
/* ------------------------------------------------------------------ */

export type SystemCase = "all" | "one" | "none" | "many";

function CasePanel({ x0, kind }: { x0: number; kind: "one" | "none" | "many" }) {
  const W: Win = { x0, y0: 8, w: 100, h: 100, xmin: -5, xmax: 5, ymin: -5, ymax: 5 };
  const lines: { m: number; b: number; accent?: boolean; dashed?: boolean }[] =
    kind === "one"
      ? [
          { m: 1, b: -1 },
          { m: -0.5, b: 2, accent: true },
        ]
      : kind === "none"
        ? [
            { m: 0.5, b: 2 },
            { m: 0.5, b: -2, accent: true },
          ]
        : [
            { m: -1, b: 1, accent: true },
            { m: -1, b: 1, dashed: true },
          ];
  const caption = kind === "one" ? "one solution" : kind === "none" ? "no solution" : "infinitely many";
  return (
    <g>
      <Axes W={W} />
      {lines.map((l, i) => {
        const s = clipLine(W, l.m, l.b);
        if (!s) return null;
        return (
          <line
            key={i}
            x1={s[0]}
            y1={s[1]}
            x2={s[2]}
            y2={s[3]}
            className={l.accent ? "dg-accent" : l.dashed ? "dg-line dg-dashed" : "dg-line"}
            style={l.accent && kind === "many" ? { strokeWidth: 5, strokeOpacity: 0.55 } : undefined}
          />
        );
      })}
      {kind === "one" && <circle cx={px(W, 2)} cy={py(W, 1)} r={3.5} className="dg-point" />}
      <text x={x0 + 50} y={128} className="dg-text" textAnchor="middle" style={{ fontSize: 13 }}>
        {caption}
      </text>
    </g>
  );
}

/** The three possible outcomes for two linear equations in two variables. */
export function SystemCases({ which = "all" }: { which?: SystemCase }) {
  if (which !== "all") {
    return (
      <svg viewBox="0 0 116 136" width={160} role="img" aria-label={`System with ${which === "one" ? "one solution" : which === "none" ? "no solution" : "infinitely many solutions"}`}>
        <CasePanel x0={8} kind={which} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 352 136" width={352} role="img" aria-label="Two lines that cross, two parallel lines, and two equations with the same line">
      <CasePanel x0={8} kind="one" />
      <CasePanel x0={126} kind="none" />
      <CasePanel x0={244} kind="many" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Solutions of one linear equation in two variables: a line of points */
/* ------------------------------------------------------------------ */

/** The graph of 2x + 3y = 12 with several of its solutions marked. */
export function LineSolutions({ showPoints = true }: { showPoints?: boolean }) {
  const W: Win = { x0: 14, y0: 10, w: 300, h: 200, xmin: -4.5, xmax: 10.5, ymin: -2.5, ymax: 7.5 };
  const s = clipLine(W, -2 / 3, 4)!;
  const pts: { x: number; y: number; label: string; dx: number; dy: number; anchor: "start" | "end" }[] = [
    { x: -3, y: 6, label: "(−3, 6)", dx: 8, dy: -8, anchor: "start" },
    { x: 0, y: 4, label: "(0, 4)", dx: 8, dy: -8, anchor: "start" },
    { x: 3, y: 2, label: "(3, 2)", dx: 8, dy: -8, anchor: "start" },
    { x: 6, y: 0, label: "(6, 0)", dx: 2, dy: 18, anchor: "start" },
    { x: 9, y: -2, label: "(9, −2)", dx: -8, dy: 2, anchor: "end" },
  ];
  return (
    <svg viewBox="0 0 330 222" width={330} role="img" aria-label="Graph of 2x + 3y = 12 with several solutions marked">
      <Axes W={W} />
      <text x={W.x0 + W.w - 4} y={py(W, 0) - 6} className="dg-label" textAnchor="end">
        x
      </text>
      <text x={px(W, 0) + 6} y={W.y0 + 12} className="dg-label">
        y
      </text>
      <line x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} className="dg-accent" />
      <text x={px(W, 7.6) } y={py(W, 3.2)} className="dg-text" textAnchor="middle">
        2x + 3y = 12
      </text>
      {showPoints &&
        pts.map((p) => (
          <g key={p.label}>
            <circle cx={px(W, p.x)} cy={py(W, p.y)} r={3.5} className="dg-point" />
            <text x={px(W, p.x) + p.dx} y={py(W, p.y) + p.dy} className="dg-text" textAnchor={p.anchor} style={{ fontSize: 13 }}>
              {p.label}
            </text>
          </g>
        ))}
    </svg>
  );
}

export const registry = {
  "2-3-linear-equations/system-cases": SystemCases,
  "2-3-linear-equations/line-solutions": LineSolutions,
};
