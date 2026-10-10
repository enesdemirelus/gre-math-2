// Original diagrams for section 2.8 Coordinate Geometry.
// Every figure is an xy-plane drawn to scale (MC pp. 11–12): equal units on both axes,
// grid lines at every integer. All positions are computed from plane coordinates.

import type React from "react";

type Pt = [number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;
/** Format a number with a true minus sign. */
const fmt = (n: number) => (n < 0 ? `−${Math.abs(n)}` : `${n}`);

/** Half-plane a*x + b*y <= c. */
interface HalfPlane {
  a: number;
  b: number;
  c: number;
}
/** y <= m x + k */
const below = (m: number, k: number): HalfPlane => ({ a: -m, b: 1, c: k });
/** y >= m x + k */
const above = (m: number, k: number): HalfPlane => ({ a: m, b: -1, c: -k });

type Dir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface PointSpec {
  at: Pt;
  name?: string; // italic letter, e.g. "P"
  coords?: boolean; // append "(x, y)"
  dir?: Dir;
  off?: number;
  accent?: boolean;
  hollow?: boolean;
}

interface LineSpec {
  m?: number; // slope (with k) ...
  k?: number; // ... y-intercept
  vx?: number; // or vertical line x = vx
  accent?: boolean;
  dashed?: boolean;
  thin?: boolean;
  label?: string; // upright text near the line
  labelAt?: Pt; // plane coordinates of label anchor
  labelAnchor?: "start" | "middle" | "end";
}

interface SegSpec {
  from: Pt;
  to: Pt;
  accent?: boolean;
  dashed?: boolean;
  thin?: boolean;
}

interface TextSpec {
  at: Pt; // plane coordinates
  text: string;
  italic?: boolean;
  size?: number;
  anchor?: "start" | "middle" | "end";
}

interface PlaneProps {
  x: [number, number];
  y: [number, number];
  u?: number; // px per unit
  every?: number; // label every n-th integer on the axes
  noNumbers?: boolean;
  shade?: HalfPlane[]; // intersection of these half-planes is shaded
  shadeAccent?: boolean;
  lines?: LineSpec[];
  segs?: SegSpec[];
  curves?: { f: (x: number) => number; accent?: boolean }[];
  circles?: { c: Pt; r: number; accent?: boolean }[];
  points?: PointSpec[];
  texts?: TextSpec[];
  rightAngles?: { v: Pt; a: Pt; b: Pt }[];
  quadrantLabels?: boolean;
  accentAxis?: "x" | "y" | "both";
  accentOrigin?: boolean;
  skipX?: number[]; // x-axis numbers to omit (to avoid label collisions)
  oSide?: "w" | "e"; // which side of the y-axis the origin label O goes
  label?: string;
}

const DIR: Record<Dir, Pt> = {
  n: [0, -1],
  s: [0, 1],
  e: [1, 0],
  w: [-1, 0],
  ne: [0.75, -0.75],
  nw: [-0.75, -0.75],
  se: [0.75, 0.75],
  sw: [-0.75, 0.75],
};

/** Sutherland–Hodgman: clip a convex polygon by a*x + b*y <= c. */
function clip(poly: Pt[], h: HalfPlane): Pt[] {
  const inside = (p: Pt) => h.a * p[0] + h.b * p[1] <= h.c + 1e-9;
  const out: Pt[] = [];
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i];
    const prev = poly[(i + poly.length - 1) % poly.length];
    const ci = inside(cur);
    const pi = inside(prev);
    if (ci !== pi) {
      const fp = h.a * prev[0] + h.b * prev[1] - h.c;
      const fc = h.a * cur[0] + h.b * cur[1] - h.c;
      const t = fp / (fp - fc);
      out.push([prev[0] + t * (cur[0] - prev[0]), prev[1] + t * (cur[1] - prev[1])]);
    }
    if (ci) out.push(cur);
  }
  return out;
}

export function Plane(props: PlaneProps) {
  const { x, y, u = 22, every = 1, noNumbers } = props;
  const pad = 18;
  const W = (x[1] - x[0]) * u + 2 * pad;
  const H = (y[1] - y[0]) * u + 2 * pad;
  const X = (v: number) => r2(pad + (v - x[0]) * u);
  const Y = (v: number) => r2(pad + (y[1] - v) * u);
  const P = (p: Pt): Pt => [X(p[0]), Y(p[1])];

  const grid: React.ReactElement[] = [];
  for (let i = Math.ceil(x[0]); i <= x[1]; i++)
    if (i !== 0) grid.push(<line key={`gx${i}`} x1={X(i)} y1={Y(y[0])} x2={X(i)} y2={Y(y[1])} className="dg-line dg-thin" style={{ strokeOpacity: 0.16 }} />);
  for (let j = Math.ceil(y[0]); j <= y[1]; j++)
    if (j !== 0) grid.push(<line key={`gy${j}`} x1={X(x[0])} y1={Y(j)} x2={X(x[1])} y2={Y(j)} className="dg-line dg-thin" style={{ strokeOpacity: 0.16 }} />);

  const nums: React.ReactElement[] = [];
  if (!noNumbers) {
    const hasXAxis = y[0] <= 0 && y[1] >= 0;
    const hasYAxis = x[0] <= 0 && x[1] >= 0;
    if (hasXAxis)
      for (let i = Math.ceil(x[0]) + 1; i < x[1]; i++)
        if (i !== 0 && i % every === 0 && !(props.skipX ?? []).includes(i))
          nums.push(
            <text key={`nx${i}`} x={X(i)} y={Y(0) + 12} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 10 }}>
              {fmt(i)}
            </text>,
          );
    if (hasYAxis)
      for (let j = Math.ceil(y[0]) + 1; j < y[1]; j++)
        if (j !== 0 && j % every === 0)
          nums.push(
            <text key={`ny${j}`} x={X(0) - 5} y={Y(j)} className="dg-text" textAnchor="end" dominantBaseline="central" style={{ fontSize: 10 }}>
              {fmt(j)}
            </text>,
          );
  }

  // shading
  let shadePath = "";
  if (props.shade && props.shade.length) {
    let poly: Pt[] = [
      [x[0], y[0]],
      [x[1], y[0]],
      [x[1], y[1]],
      [x[0], y[1]],
    ];
    for (const h of props.shade) poly = clip(poly, h);
    if (poly.length >= 3) shadePath = "M " + poly.map((p) => `${X(p[0])} ${Y(p[1])}`).join(" L ") + " Z";
  }

  const lineEls = (props.lines ?? []).map((l, i) => {
    let a: Pt;
    let b: Pt;
    if (l.vx !== undefined) {
      a = [l.vx, y[0]];
      b = [l.vx, y[1]];
    } else {
      const m = l.m ?? 0;
      const k = l.k ?? 0;
      if (m === 0) {
        a = [x[0], k];
        b = [x[1], k];
      } else {
        const xa = (y[0] - k) / m;
        const xb = (y[1] - k) / m;
        const lo = Math.max(x[0], Math.min(xa, xb));
        const hi = Math.min(x[1], Math.max(xa, xb));
        a = [lo, m * lo + k];
        b = [hi, m * hi + k];
      }
    }
    const cls = [l.accent ? "dg-accent" : "dg-line", l.dashed ? "dg-dashed" : "", l.thin ? "dg-thin" : ""].join(" ").trim();
    return (
      <g key={`l${i}`}>
        <line x1={X(a[0])} y1={Y(a[1])} x2={X(b[0])} y2={Y(b[1])} className={cls} />
        {l.label && l.labelAt && (
          <text x={X(l.labelAt[0])} y={Y(l.labelAt[1])} className={l.label.length === 1 ? "dg-label" : "dg-text"} textAnchor={l.labelAnchor ?? "middle"} dominantBaseline="central" style={{ fontSize: l.label.length === 1 ? 15 : 12 }}>
            {l.label}
          </text>
        )}
      </g>
    );
  });

  const curveEls = (props.curves ?? []).map((c, i) => {
    const pts: string[] = [];
    const segs: string[] = [];
    const N = 400;
    for (let s = 0; s <= N; s++) {
      const xv = x[0] + ((x[1] - x[0]) * s) / N;
      const yv = c.f(xv);
      if (yv >= y[0] - 1e-9 && yv <= y[1] + 1e-9) pts.push(`${X(xv)} ${Y(yv)}`);
      else if (pts.length) {
        segs.push("M " + pts.join(" L "));
        pts.length = 0;
      }
    }
    if (pts.length) segs.push("M " + pts.join(" L "));
    return <path key={`c${i}`} d={segs.join(" ")} className={c.accent ? "dg-accent" : "dg-line"} />;
  });

  const rightEls = (props.rightAngles ?? []).map((ra, i) => {
    const v = P(ra.v);
    const unit = (q: Pt): Pt => {
      const p = P(q);
      const L = Math.hypot(p[0] - v[0], p[1] - v[1]);
      return [(p[0] - v[0]) / L, (p[1] - v[1]) / L];
    };
    const s = 8;
    const ua = unit(ra.a);
    const ub = unit(ra.b);
    const p1: Pt = [v[0] + s * ua[0], v[1] + s * ua[1]];
    const p2: Pt = [p1[0] + s * ub[0], p1[1] + s * ub[1]];
    const p3: Pt = [v[0] + s * ub[0], v[1] + s * ub[1]];
    return <path key={`ra${i}`} d={`M ${r2(p1[0])} ${r2(p1[1])} L ${r2(p2[0])} ${r2(p2[1])} L ${r2(p3[0])} ${r2(p3[1])}`} className="dg-line dg-thin" />;
  });

  const ox = X(0);
  const oy = Y(0);
  const showXAxis = y[0] <= 0 && y[1] >= 0;
  const showYAxis = x[0] <= 0 && x[1] >= 0;

  return (
    <svg viewBox={`0 0 ${r2(W)} ${r2(H)}`} width={Math.min(360, r2(W))} role="img" aria-label={props.label ?? "Coordinate plane"}>
      {grid}
      {shadePath && <path d={shadePath} className={props.shadeAccent ? "dg-accent-fill" : "dg-fill"} />}
      {showXAxis && <line x1={X(x[0])} y1={oy} x2={X(x[1])} y2={oy} className={props.accentAxis === "x" || props.accentAxis === "both" ? "dg-accent" : "dg-line"} />}
      {showYAxis && <line x1={ox} y1={Y(y[0])} x2={ox} y2={Y(y[1])} className={props.accentAxis === "y" || props.accentAxis === "both" ? "dg-accent" : "dg-line"} />}
      {showXAxis && (
        <text x={X(x[1]) + 4} y={oy - 9} className="dg-label" textAnchor="end" dominantBaseline="central">
          x
        </text>
      )}
      {showYAxis && (
        <text x={ox + 10} y={Y(y[1]) + 4} className="dg-label" textAnchor="middle" dominantBaseline="central">
          y
        </text>
      )}
      {nums}
      {showXAxis && showYAxis && (
        <text x={props.oSide === "e" ? ox + 8 : ox - 8} y={oy + 11} className="dg-label" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
          O
        </text>
      )}
      {props.quadrantLabels &&
        (
          [
            ["I", 1, 1],
            ["II", -1, 1],
            ["III", -1, -1],
            ["IV", 1, -1],
          ] as [string, number, number][]
        ).map(([t, sx, sy]) => (
          <text
            key={t}
            x={X(sx > 0 ? x[1] * 0.62 : x[0] * 0.62)}
            y={Y(sy > 0 ? y[1] * 0.62 : y[0] * 0.62)}
            className="dg-text"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: 17, fontWeight: 600 }}
          >
            {t}
          </text>
        ))}
      {curveEls}
      {(props.circles ?? []).map((c, i) => (
        <circle key={`ci${i}`} cx={X(c.c[0])} cy={Y(c.c[1])} r={r2(c.r * u)} className={c.accent ? "dg-accent" : "dg-line"} />
      ))}
      {lineEls}
      {(props.segs ?? []).map((s, i) => (
        <line
          key={`s${i}`}
          x1={X(s.from[0])}
          y1={Y(s.from[1])}
          x2={X(s.to[0])}
          y2={Y(s.to[1])}
          className={[s.accent ? "dg-accent" : "dg-line", s.dashed ? "dg-dashed" : "", s.thin ? "dg-thin" : ""].join(" ").trim()}
        />
      ))}
      {rightEls}
      {props.accentOrigin && <circle cx={ox} cy={oy} r={7} className="dg-accent" />}
      {(props.texts ?? []).map((t, i) => (
        <text
          key={`t${i}`}
          x={X(t.at[0])}
          y={Y(t.at[1])}
          className={t.italic ? "dg-label" : "dg-text"}
          textAnchor={t.anchor ?? "middle"}
          dominantBaseline="central"
          style={{ fontSize: t.size ?? 12 }}
        >
          {t.text}
        </text>
      ))}
      {(props.points ?? []).map((p, i) => {
        const [px, py] = P(p.at);
        const d = DIR[p.dir ?? "ne"];
        const off = p.off ?? 13;
        const anchor = d[0] > 0.1 ? "start" : d[0] < -0.1 ? "end" : "middle";
        const lx = r2(px + d[0] * off - (anchor === "start" ? 2 : anchor === "end" ? -2 : 0));
        const ly = r2(py + d[1] * off);
        return (
          <g key={`p${i}`}>
            {p.hollow ? (
              <circle cx={px} cy={py} r={3.5} className="dg-line" style={{ fill: "var(--bg, white)" }} />
            ) : (
              <circle cx={px} cy={py} r={p.accent ? 4 : 3} className="dg-point" />
            )}
            {p.accent && <circle cx={px} cy={py} r={7} className="dg-accent" />}
            {(p.name || p.coords) && (
              <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="central">
                {p.name && <tspan className="dg-label">{p.name}</tspan>}
                {p.coords && (
                  <tspan className="dg-text" style={{ fontSize: 12 }}>
                    {`(${fmt(p.at[0])}, ${fmt(p.at[1])})`}
                  </tspan>
                )}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Axes, origin, quadrants, coordinates                              */
/* ------------------------------------------------------------------ */

export type QuadHighlight = "all" | "x-axis" | "y-axis" | "origin" | "quadrants" | "coords" | "x-coord" | "y-coord" | "system";

export function Quadrants({ highlight = "all" }: { highlight?: QuadHighlight }) {
  const showPoint = highlight === "all" || highlight === "coords" || highlight === "x-coord" || highlight === "y-coord";
  const A: Pt = [-3, 2];
  return (
    <Plane
      x={[-5, 5]}
      y={[-5, 5]}
      u={24}
      noNumbers={highlight === "quadrants"}
      quadrantLabels={highlight === "all" || highlight === "quadrants" || highlight === "system"}
      accentAxis={highlight === "x-axis" ? "x" : highlight === "y-axis" ? "y" : highlight === "system" ? "both" : undefined}
      accentOrigin={highlight === "origin"}
      segs={
        showPoint
          ? [
              { from: A, to: [-3, 0], dashed: true, thin: true, accent: highlight === "coords" || highlight === "y-coord" },
              { from: A, to: [0, 2], dashed: true, thin: true, accent: highlight === "coords" || highlight === "x-coord" },
            ]
          : []
      }
      points={showPoint ? [{ at: A, name: "A", coords: true, dir: "nw", off: 10 }] : []}
      label="The xy-plane with its four quadrants"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 2. Reflections of P(3, 5)                                            */
/* ------------------------------------------------------------------ */

export type ReflHighlight = "all" | "x-axis" | "y-axis" | "origin" | "y=x";

export function Reflections({ highlight = "all" }: { highlight?: ReflHighlight }) {
  const P0: Pt = [3, 5];
  const show = (h: ReflHighlight) => highlight === "all" || highlight === h;
  const pts: PointSpec[] = [{ at: P0, name: "P", coords: true, dir: "e", off: 9 }];
  const segs: SegSpec[] = [];
  if (show("x-axis")) {
    pts.push({ at: [3, -5], name: "R", coords: true, dir: "e", off: 9 });
    segs.push({ from: P0, to: [3, -5], dashed: true, thin: true, accent: highlight === "x-axis" });
  }
  if (show("y-axis")) {
    pts.push({ at: [-3, 5], name: "S", coords: true, dir: "w", off: 9 });
    segs.push({ from: P0, to: [-3, 5], dashed: true, thin: true, accent: highlight === "y-axis" });
  }
  if (show("origin")) {
    pts.push({ at: [-3, -5], name: "T", coords: true, dir: "w", off: 9 });
    segs.push({ from: P0, to: [-3, -5], dashed: true, thin: true, accent: highlight === "origin" });
  }
  const lines: LineSpec[] = [];
  if (highlight === "y=x") {
    lines.push({ m: 1, k: 0, thin: true, label: "y = x", labelAt: [-4.6, -3.6] });
    pts.push({ at: [5, 3], name: "U", coords: true, dir: "se", off: 8 });
    segs.push({ from: P0, to: [5, 3], dashed: true, thin: true, accent: true });
  }
  return (
    <Plane x={[-6, 6]} y={[-6, 6]} u={22} every={2} lines={lines} segs={segs} points={pts} label="Reflections of the point P(3, 5)" />
  );
}

/* ------------------------------------------------------------------ */
/* 3. Distance via a right triangle (and the midpoint)                  */
/* ------------------------------------------------------------------ */

export function Distance({ midpoint = false }: { midpoint?: boolean }) {
  const A: Pt = [-1, -3];
  const B: Pt = [7, 3];
  const C: Pt = [7, -3];
  return (
    <Plane
      x={[-3, 9]}
      y={[-5, 5]}
      u={22}
      every={2}
      segs={[
        { from: A, to: B, accent: true },
        { from: A, to: C, dashed: !midpoint, thin: midpoint },
        { from: C, to: B, dashed: !midpoint, thin: midpoint },
      ]}
      rightAngles={[{ v: C, a: A, b: B }]}
      texts={
        midpoint
          ? []
          : [
              { at: [3, -3.6], text: "8" },
              { at: [7.5, 0], text: "6" },
              { at: [1.9, 0.9], text: "10" },
            ]
      }
      points={[
        { at: A, name: "A", coords: true, dir: "sw", off: 8 },
        { at: B, name: "B", coords: true, dir: "ne", off: 8 },
        { at: C, name: "C", coords: true, dir: "se", off: 7 },
        ...(midpoint ? [{ at: [3, 0] as Pt, name: "M", coords: true, dir: "nw" as Dir, off: 9, accent: true }] : []),
      ]}
      label={midpoint ? "Midpoint M(3, 0) of segment AB" : "Distance from A to B via a right triangle"}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 4. Slope and intercepts: the line through (-1, -1) and (3, 5)        */
/* ------------------------------------------------------------------ */

export type SlopeHighlight = "all" | "slope" | "y-intercept" | "x-intercept" | "graph";

export function SlopeFigure({ highlight = "all" }: { highlight?: SlopeHighlight }) {
  const Pp: Pt = [-1, -1];
  const Q: Pt = [3, 5];
  const corner: Pt = [3, -1];
  const showTri = highlight === "all" || highlight === "slope";
  const pts: PointSpec[] = [
    { at: Pp, name: "P", coords: true, dir: "w", off: 9 },
    { at: Q, name: "Q", coords: true, dir: "w", off: 9 },
  ];
  if (highlight === "y-intercept") pts.push({ at: [0, 0.5], dir: "e", off: 0, accent: highlight === "y-intercept", hollow: highlight !== "y-intercept" });
  if (highlight === "x-intercept") pts.push({ at: [-1 / 3, 0], dir: "e", off: 0, accent: highlight === "x-intercept", hollow: highlight !== "x-intercept" });
  const texts: TextSpec[] = [];
  if (showTri) {
    texts.push({ at: [1, -1.6], text: "run = 4" });
    texts.push({ at: [3.25, 2], text: "rise = 6", anchor: "start" });
  }
  if (highlight === "y-intercept") texts.push({ at: [-0.35, 1.0], text: "(0, 1/2)", anchor: "end" });
  if (highlight === "x-intercept") texts.push({ at: [-0.6, 0.55], text: "(−1/3, 0)", anchor: "end" });
  return (
    <Plane
      x={[-4, 6]}
      y={[-3, 7]}
      u={22}
      every={2}
      oSide="e"
      lines={[{ m: 1.5, k: 0.5, accent: highlight !== "y-intercept" && highlight !== "x-intercept" }]}
      segs={showTri ? [{ from: Pp, to: corner, dashed: true, thin: true }, { from: corner, to: Q, dashed: true, thin: true }] : []}
      rightAngles={showTri ? [{ v: corner, a: Pp, b: Q }] : []}
      texts={texts}
      points={pts}
      label="The line through P(-1, -1) and Q(3, 5), with slope 3/2"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 5. Horizontal and vertical lines                                     */
/* ------------------------------------------------------------------ */

export function HorizVert({ highlight = "both" }: { highlight?: "both" | "horizontal" | "vertical" }) {
  const lines: LineSpec[] = [];
  if (highlight !== "vertical") lines.push({ m: 0, k: -2, accent: true, label: "y = −2", labelAt: [-3.6, -2.5] });
  if (highlight !== "horizontal") lines.push({ vx: 3, accent: true, label: "x = 3", labelAt: [3.85, 3.6] });
  return <Plane x={[-5, 5]} y={[-5, 5]} u={22} every={2} lines={lines} label="Horizontal line y = -2 and vertical line x = 3" />;
}

/* ------------------------------------------------------------------ */
/* 6. Parallel and perpendicular lines                                  */
/* ------------------------------------------------------------------ */

export function ParallelPerp({ highlight = "all" }: { highlight?: "all" | "parallel" | "perpendicular" }) {
  const lines: LineSpec[] = [{ m: 3, k: 2, label: "ℓ", labelAt: [1.35, 4.6] }];
  if (highlight !== "perpendicular") lines.push({ m: 3, k: -4, accent: highlight === "parallel", label: "m", labelAt: [3.05, 3] });
  if (highlight !== "parallel") lines.push({ m: -1 / 3, k: 1, accent: highlight === "perpendicular", label: "n", labelAt: [-4.2, 3.0] });
  const I: Pt = [-0.3, 1.1];
  return (
    <Plane
      x={[-5, 5]}
      y={[-5, 5]}
      u={24}
      every={2}
      lines={lines}
      rightAngles={highlight !== "parallel" ? [{ v: I, a: [0.3, 2.9], b: [2.7, 0.1] }] : []}
      label="Parallel lines have equal slopes; perpendicular lines have negative reciprocal slopes"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 7. A system of two linear equations                                  */
/* ------------------------------------------------------------------ */

export function SystemFigure() {
  return (
    <Plane
      x={[-3, 6]}
      y={[-3, 7]}
      u={22}
      every={2}
      lines={[
        { m: 2, k: -1, label: "y = 2x − 1", labelAt: [4.1, 6.2], labelAnchor: "start" },
        { m: -1, k: 5, label: "y = −x + 5", labelAt: [5.9, -1.9], labelAnchor: "end" },
      ]}
      points={[{ at: [2, 3], coords: true, dir: "e", off: 10, accent: true }]}
      label="Two lines intersecting at (2, 3)"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 8. Linear inequalities: half-planes and systems                      */
/* ------------------------------------------------------------------ */

export function InequalityFigure({ variant = "system" }: { variant?: "half-plane" | "system" }) {
  if (variant === "half-plane") {
    return (
      <Plane
        x={[-5, 5]}
        y={[-5, 5]}
        u={22}
        every={2}
        shade={[above(2, -2)]}
        shadeAccent
        lines={[{ m: 2, k: -2, label: "y = 2x − 2", labelAt: [3.75, 3] }]}
        texts={[{ at: [-2.4, 2.6], text: "y ≥ 2x − 2", size: 13 }]}
        label="The half-plane y >= 2x - 2"
      />
    );
  }
  return (
    <Plane
      x={[-5, 7]}
      y={[-5, 6]}
      u={22}
      every={2}
      shade={[below(-0.5, 3), above(1, -3)]}
      shadeAccent
      lines={[
        { m: -0.5, k: 3, label: "y = −½x + 3", labelAt: [-2.6, 5.4] },
        { m: 1, k: -3, label: "y = x − 3", labelAt: [5.1, 3.6] },
      ]}
      points={[{ at: [4, 1], coords: true, dir: "e", off: 20 }]}
      label="Solution region of y <= -x/2 + 3 and y >= x - 3"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 9. Reflection about the line y = x                                   */
/* ------------------------------------------------------------------ */

export function SymmetryYX({ highlight = "all" }: { highlight?: "all" | "axis" }) {
  return (
    <Plane
      x={[-4, 7]}
      y={[-4, 7]}
      u={22}
      every={2}
      skipX={[2]}
      lines={[
        { m: 1, k: 0, dashed: true, thin: true, accent: highlight === "axis", label: "y = x", labelAt: [6, 5.2] },
        { m: 3, k: -6, label: "y = 3x − 6", labelAt: [1.25, 5.4] },
        { m: 1 / 3, k: 2, label: "y = ⅓x + 2", labelAt: [7, 2.2], labelAnchor: "end" },
      ]}
      points={[
        { at: [2, 0], coords: true, dir: "se", off: 7 },
        { at: [0, 2], coords: true, dir: "nw", off: 7 },
        { at: [3, 3], coords: true, dir: "nw", off: 9, accent: highlight === "axis" },
      ]}
      label="y = 3x - 6 and its reflection about y = x"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 10. Parabola y = x^2 - 6x + 5                                        */
/* ------------------------------------------------------------------ */

export function ParabolaFigure({ highlight = "all" }: { highlight?: "all" | "parabola" | "vertex" | "axis" }) {
  const f = (t: number) => t * t - 6 * t + 5;
  const pts: PointSpec[] = [];
  if (highlight === "all" || highlight === "vertex") pts.push({ at: [3, -4], coords: true, dir: "se", off: 8, accent: highlight === "vertex" });
  if (highlight === "all" || highlight === "parabola") {
    pts.push({ at: [1, 0], coords: true, dir: "ne", off: 6 });
    pts.push({ at: [5, 0], coords: true, dir: "nw", off: 6 });
    pts.push({ at: [0, 5], coords: true, dir: "e", off: 8 });
  }
  return (
    <Plane
      x={[-2, 8]}
      y={[-5, 7]}
      u={21}
      every={2}
      curves={[{ f, accent: highlight === "parabola" || highlight === "all" }]}
      lines={
        highlight === "parabola"
          ? []
          : [{ vx: 3, dashed: true, thin: true, accent: highlight === "axis", label: "x = 3", labelAt: [3.85, 6.3] }]
      }
      points={pts}
      label="The parabola y = x^2 - 6x + 5"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 11. Circle (x + 2)^2 + (y - 3)^2 = 25                                */
/* ------------------------------------------------------------------ */

export function CircleFigure({ highlight = "all" }: { highlight?: "all" | "circle" }) {
  const C: Pt = [-2, 3];
  const Pp: Pt = [1, 7];
  const K: Pt = [1, 3];
  const tri = highlight === "all";
  return (
    <Plane
      x={[-8, 4]}
      y={[-3, 9]}
      u={22}
      every={2}
      circles={[{ c: C, r: 5, accent: true }]}
      segs={
        tri
          ? [
              { from: C, to: Pp },
              { from: C, to: K, dashed: true, thin: true },
              { from: K, to: Pp, dashed: true, thin: true },
            ]
          : [{ from: C, to: [3, 3] }]
      }
      rightAngles={tri ? [{ v: K, a: C, b: Pp }] : []}
      texts={
        tri
          ? [
              { at: [-0.5, 3.45], text: "3" },
              { at: [1.45, 5], text: "4", anchor: "start" },
              { at: [-1, 5.6], text: "5" },
            ]
          : [{ at: [1.6, 3.5], text: "r = 5" }]
      }
      points={[
        { at: C, name: "C", coords: true, dir: "sw", off: 8 },
        ...(tri ? [{ at: Pp, coords: true, dir: "ne" as Dir, off: 7 }] : []),
      ]}
      label="Circle with center (-2, 3) and radius 5"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 12. Worked example 4: region x + 2y <= 8 and 3x - y >= 3             */
/* ------------------------------------------------------------------ */

export function ExampleRegion() {
  return (
    <Plane
      x={[-5, 8]}
      y={[-7, 6]}
      u={20}
      every={2}
      shade={[below(-0.5, 4), below(3, -3)]}
      lines={[
        { m: -0.5, k: 4, label: "x + 2y = 8", labelAt: [-3, 4.4] },
        { m: 3, k: -3, label: "3x − y = 3", labelAt: [4.4, 4.6] },
      ]}
      label="Shaded region bounded by x + 2y = 8 and 3x - y = 3"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 13. Quiz: line k through (0, 4) and (6, 0)                           */
/* ------------------------------------------------------------------ */

export function QuizLineK() {
  return (
    <Plane
      x={[-2, 8]}
      y={[-2, 6]}
      u={22}
      every={2}
      lines={[{ m: -2 / 3, k: 4, label: "k", labelAt: [4.8, 1.55] }]}
      points={[
        { at: [0, 4], coords: true, dir: "ne", off: 12 },
        { at: [6, 0], coords: true, dir: "ne", off: 7 },
      ]}
      label="Line k through (0, 4) and (6, 0)"
    />
  );
}

export const registry = {
  "2-8-coordinate-geometry/quadrants": Quadrants,
  "2-8-coordinate-geometry/reflections": Reflections,
  "2-8-coordinate-geometry/distance": Distance,
  "2-8-coordinate-geometry/slope": SlopeFigure,
  "2-8-coordinate-geometry/horiz-vert": HorizVert,
  "2-8-coordinate-geometry/parallel-perp": ParallelPerp,
  "2-8-coordinate-geometry/system": SystemFigure,
  "2-8-coordinate-geometry/inequality": InequalityFigure,
  "2-8-coordinate-geometry/symmetry-yx": SymmetryYX,
  "2-8-coordinate-geometry/parabola": ParabolaFigure,
  "2-8-coordinate-geometry/circle": CircleFigure,
  "2-8-coordinate-geometry/example-region": ExampleRegion,
  "2-8-coordinate-geometry/quiz-line-k": QuizLineK,
};
