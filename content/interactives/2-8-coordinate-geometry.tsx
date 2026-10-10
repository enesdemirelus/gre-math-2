"use client";
// Interactive explorers for section 2.8 Coordinate Geometry.
// Both work on an integer grid (points snap to lattice points), so every
// displayed value is exact: slopes and intercepts as reduced fractions,
// distances as simplified radicals.

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Tex } from "@/components/Tex";

type Pt = [number, number];

const N = 6; // grid runs from -N to N on both axes
const U = 22; // px per unit
const PAD = 16;
const SIZE = 2 * N * U + 2 * PAD;
const X = (v: number) => PAD + (v + N) * U;
const Y = (v: number) => PAD + (N - v) * U;

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

/** Reduced fraction p/q as TeX (q != 0). */
function fracTex(p: number, q: number): string {
  if (q < 0) {
    p = -p;
    q = -q;
  }
  const g = gcd(p, q) || 1;
  p /= g;
  q /= g;
  if (q === 1) return `${p}`;
  return p < 0 ? `-\\frac{${-p}}{${q}}` : `\\frac{${p}}{${q}}`;
}

/** sqrt(n) simplified as TeX, n >= 0 integer. */
function sqrtTex(n: number): string {
  let k = 1;
  let s = n;
  for (let f = 2; f * f <= s; f++) {
    while (s % (f * f) === 0) {
      s /= f * f;
      k *= f;
    }
  }
  if (s === 1) return `${k}`;
  return k === 1 ? `\\sqrt{${s}}` : `${k}\\sqrt{${s}}`;
}

/** "y = mx + b" with m = mp/mq and b = bp/bq, written the way a textbook would. */
function lineTex(mp: number, mq: number, bp: number, bq: number): string {
  const g1 = gcd(mp, mq) || 1;
  mp /= g1;
  mq /= g1;
  if (mq < 0) {
    mp = -mp;
    mq = -mq;
  }
  let mPart: string;
  if (mp === 0) mPart = "";
  else if (mq === 1 && mp === 1) mPart = "x";
  else if (mq === 1 && mp === -1) mPart = "-x";
  else mPart = `${fracTex(mp, mq)}x`;
  const bZero = bp === 0;
  let bPart = "";
  if (!bZero) {
    const neg = bp * bq < 0;
    const abs = fracTex(Math.abs(bp), Math.abs(bq));
    if (mPart === "") bPart = neg ? `-${abs}` : abs;
    else bPart = neg ? ` - ${abs}` : ` + ${abs}`;
  }
  if (mPart === "" && bZero) return "y = 0";
  return `y = ${mPart}${bPart}`;
}

const fmtCoord = (p: Pt) => `(${p[0]}, ${p[1]})`;

function svgPoint(svg: SVGSVGElement, e: ReactPointerEvent): Pt {
  const rect = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  return [vb.x + ((e.clientX - rect.left) / rect.width) * vb.width, vb.y + ((e.clientY - rect.top) / rect.height) * vb.height];
}

/** Pointer position -> nearest lattice point in the grid. */
function toLattice(svg: SVGSVGElement, e: ReactPointerEvent): Pt {
  const [sx, sy] = svgPoint(svg, e);
  const x = Math.round((sx - PAD) / U - N);
  const y = Math.round(N - (sy - PAD) / U);
  return [Math.max(-N, Math.min(N, x)), Math.max(-N, Math.min(N, y))];
}

function Grid() {
  const els = [];
  for (let i = -N; i <= N; i++) {
    if (i === 0) continue;
    els.push(<line key={`v${i}`} x1={X(i)} y1={Y(-N)} x2={X(i)} y2={Y(N)} className="dg-line dg-thin" style={{ strokeOpacity: 0.16 }} />);
    els.push(<line key={`h${i}`} x1={X(-N)} y1={Y(i)} x2={X(N)} y2={Y(i)} className="dg-line dg-thin" style={{ strokeOpacity: 0.16 }} />);
    if (i % 2 === 0 && Math.abs(i) < N) {
      els.push(
        <text key={`nx${i}`} x={X(i)} y={Y(0) + 12} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 10 }}>
          {i < 0 ? `−${-i}` : i}
        </text>,
      );
      els.push(
        <text key={`ny${i}`} x={X(0) - 5} y={Y(i)} className="dg-text" textAnchor="end" dominantBaseline="central" style={{ fontSize: 10 }}>
          {i < 0 ? `−${-i}` : i}
        </text>,
      );
    }
  }
  return (
    <g>
      {els}
      <line x1={X(-N)} y1={Y(0)} x2={X(N)} y2={Y(0)} className="dg-line" />
      <line x1={X(0)} y1={Y(-N)} x2={X(0)} y2={Y(N)} className="dg-line" />
      <text x={X(N) + 2} y={Y(0) - 9} className="dg-label" textAnchor="end" dominantBaseline="central">
        x
      </text>
      <text x={X(0) + 10} y={Y(N) + 4} className="dg-label" textAnchor="middle" dominantBaseline="central">
        y
      </text>
    </g>
  );
}

/** Clip the infinite line through a and b to the visible square. */
function clipLine(a: Pt, b: Pt): [Pt, Pt] {
  if (a[0] === b[0]) return [[a[0], -N], [a[0], N]];
  const m = (b[1] - a[1]) / (b[0] - a[0]);
  const k = a[1] - m * a[0];
  if (m === 0) return [[-N, k], [N, k]];
  const xa = (-N - k) / m;
  const xb = (N - k) / m;
  const lo = Math.max(-N, Math.min(xa, xb));
  const hi = Math.min(N, Math.max(xa, xb));
  return [[lo, m * lo + k], [hi, m * hi + k]];
}

const handleStyle = { cursor: "grab" } as const;

/* ------------------------------------------------------------------ */
/* 1. Line explorer: two points -> slope, equation, intercepts, distance */
/* ------------------------------------------------------------------ */

export function LineExplorer() {
  const [P, setP] = useState<Pt>([-4, -1]);
  const [Q, setQ] = useState<Pt>([2, 3]);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<"P" | "Q" | null>(null);

  const move = (e: ReactPointerEvent) => {
    const svg = svgRef.current;
    if (!svg || !drag.current) return;
    const p = toLattice(svg, e);
    if (drag.current === "P") {
      if (p[0] !== Q[0] || p[1] !== Q[1]) setP(p);
    } else if (p[0] !== P[0] || p[1] !== P[1]) setQ(p);
  };

  const onDown = (e: ReactPointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return;
    const [sx, sy] = svgPoint(svg, e);
    const dP = Math.hypot(sx - X(P[0]), sy - Y(P[1]));
    const dQ = Math.hypot(sx - X(Q[0]), sy - Y(Q[1]));
    drag.current = dP <= dQ ? "P" : "Q";
    svg.setPointerCapture(e.pointerId);
    move(e);
  };

  const run = Q[0] - P[0];
  const rise = Q[1] - P[1];
  const vertical = run === 0;
  const horizontal = rise === 0;
  const [L1, L2] = clipLine(P, Q);
  const corner: Pt = [Q[0], P[1]];

  // exact values (as fractions of integers)
  // b = P.y - m P.x = (P.y * run - rise * P.x) / run
  const bNum = P[1] * run - rise * P[0];
  // x-intercept = -b/m = (rise * P.x - P.y * run) / rise
  const xiNum = rise * P[0] - P[1] * run;
  const d2 = run * run + rise * rise;

  let slopeTex: string;
  let eqTex: string;
  let xIntTex: string;
  let yIntTex: string;
  if (vertical) {
    slopeTex = String.raw`\text{rise} = ${rise},\ \text{run} = 0:\ \text{slope undefined}`;
    eqTex = `x = ${P[0]}`;
    xIntTex = P[0] === 0 ? String.raw`\text{the line is the } y\text{-axis}` : `x\\text{-intercept} = ${P[0]}`;
    yIntTex = P[0] === 0 ? "" : String.raw`\text{no } y\text{-intercept}`;
  } else {
    slopeTex = String.raw`\text{slope} = \frac{\text{rise}}{\text{run}} = \frac{${rise}}{${run}} = ${fracTex(rise, run)}`;
    eqTex = lineTex(rise, run, bNum, run);
    yIntTex = `y\\text{-intercept} = ${fracTex(bNum, run)}`;
    if (horizontal) xIntTex = P[1] === 0 ? String.raw`\text{the line is the } x\text{-axis}` : String.raw`\text{no } x\text{-intercept}`;
    else xIntTex = `x\\text{-intercept} = ${fracTex(xiNum, rise)}`;
  }
  const distTex = String.raw`PQ = \sqrt{${Math.abs(run)}^2 + ${Math.abs(rise)}^2} = \sqrt{${d2}}${sqrtTex(d2) === `\\sqrt{${d2}}` ? "" : ` = ${sqrtTex(d2)}`}${
    Number.isInteger(Math.sqrt(d2)) ? "" : ` \\approx ${Math.sqrt(d2).toFixed(2)}`
  }`;

  // intercept markers (only if inside the window)
  const markers: Pt[] = [];
  if (!vertical) {
    const b = bNum / run;
    if (Math.abs(b) <= N) markers.push([0, b]);
  }
  if (!horizontal) {
    const xi = vertical ? P[0] : xiNum / rise;
    if (Math.abs(xi) <= N && !(vertical && P[0] === 0)) markers.push([xi, 0]);
  }

  // Labels go on the side of the line away from the rise/run triangle.
  const ddx = run;
  const ddy = rise;
  const dl = Math.hypot(ddx, ddy) || 1;
  let nx = -ddy / dl;
  let ny = ddx / dl;
  if (nx * (corner[0] - P[0]) + ny * (corner[1] - P[1]) > 0) {
    nx = -nx;
    ny = -ny;
  }
  const lbl = (p: Pt, name: string) => (
    <text x={X(p[0]) + nx * 17} y={Y(p[1]) - ny * 17} className="dg-label" textAnchor="middle" dominantBaseline="central">
      {name}
    </text>
  );

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width={SIZE}
        style={{ touchAction: "none", maxWidth: "100%" }}
        role="img"
        aria-label={`Line through P${fmtCoord(P)} and Q${fmtCoord(Q)}`}
        onPointerDown={onDown}
        onPointerMove={move}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        <Grid />
        <line x1={X(L1[0])} y1={Y(L1[1])} x2={X(L2[0])} y2={Y(L2[1])} className="dg-accent" />
        {!vertical && !horizontal && (
          <>
            <line x1={X(P[0])} y1={Y(P[1])} x2={X(corner[0])} y2={Y(corner[1])} className="dg-line dg-dashed" />
            <line x1={X(corner[0])} y1={Y(corner[1])} x2={X(Q[0])} y2={Y(Q[1])} className="dg-line dg-dashed" />
            <path
              d={`M ${X(corner[0]) - Math.sign(run) * 8} ${Y(corner[1])} L ${X(corner[0]) - Math.sign(run) * 8} ${Y(corner[1]) - Math.sign(rise) * 8} L ${X(corner[0])} ${
                Y(corner[1]) - Math.sign(rise) * 8
              }`}
              className="dg-line dg-thin"
            />
            <text
              x={(X(P[0]) + X(corner[0])) / 2}
              y={Y(corner[1]) + (rise > 0 ? 12 : -12)}
              className="dg-text"
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontSize: 12 }}
            >
              {`run = ${run}`}
            </text>
            <text
              x={X(corner[0]) + (run > 0 ? 6 : -6)}
              y={(Y(corner[1]) + Y(Q[1])) / 2}
              className="dg-text"
              textAnchor={run > 0 ? "start" : "end"}
              dominantBaseline="central"
              style={{ fontSize: 12 }}
            >
              {`rise = ${rise}`}
            </text>
          </>
        )}
        {markers.map((m, i) => (
          <circle key={i} cx={X(m[0])} cy={Y(m[1])} r={4} className="dg-line" style={{ fill: "var(--bg, white)" }} />
        ))}
        {[P, Q].map((p, i) => (
          <g key={i}>
            <circle cx={X(p[0])} cy={Y(p[1])} r={10} className="dg-accent" style={handleStyle} />
            <circle cx={X(p[0])} cy={Y(p[1])} r={3.5} className="dg-point" />
          </g>
        ))}
        {lbl(P, "P")}
        {lbl(Q, "Q")}
      </svg>
      <div style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 380, fontSize: "0.95rem" }}>
        <div>
          <Tex tex={`P${fmtCoord(P)},\\quad Q${fmtCoord(Q)}`} />
        </div>
        <div>
          <Tex tex={slopeTex} />
        </div>
        <div>
          <Tex tex={eqTex} />
        </div>
        <div>
          <Tex tex={xIntTex} />
          {yIntTex && (
            <>
              {",  "}
              <Tex tex={yIntTex} />
            </>
          )}
        </div>
        <div>
          <Tex tex={distTex} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Reflection explorer                                               */
/* ------------------------------------------------------------------ */

type Mirror = "x" | "y" | "o" | "yx";

const MIRRORS: { id: Mirror; name: string; label: string; rule: string; map: (p: Pt) => Pt }[] = [
  { id: "x", name: "A", label: "x-axis", rule: String.raw`(a, b) \to (a, -b)`, map: ([a, b]) => [a, -b] },
  { id: "y", name: "B", label: "y-axis", rule: String.raw`(a, b) \to (-a, b)`, map: ([a, b]) => [-a, b] },
  { id: "o", name: "C", label: "origin", rule: String.raw`(a, b) \to (-a, -b)`, map: ([a, b]) => [-a, -b] },
  { id: "yx", name: "D", label: "line y = x", rule: String.raw`(a, b) \to (b, a)`, map: ([a, b]) => [b, a] },
];

function quadrant([a, b]: Pt): string {
  if (a === 0 && b === 0) return "the origin";
  if (a === 0) return "on the y-axis";
  if (b === 0) return "on the x-axis";
  if (a > 0) return b > 0 ? "Quadrant I" : "Quadrant IV";
  return b > 0 ? "Quadrant II" : "Quadrant III";
}

export function ReflectionExplorer() {
  const [P, setP] = useState<Pt>([4, 1]);
  const [on, setOn] = useState<Record<Mirror, boolean>>({ x: true, y: false, o: false, yx: false });
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const move = (e: ReactPointerEvent) => {
    const svg = svgRef.current;
    if (!svg || !dragging.current) return;
    setP(toLattice(svg, e));
  };

  const fmtTexPt = (p: Pt) => `(${p[0]}, ${p[1]})`;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
        {MIRRORS.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={on[m.id]}
            onClick={() => setOn({ ...on, [m.id]: !on[m.id] })}
            style={{ fontWeight: on[m.id] ? 700 : 400, opacity: on[m.id] ? 1 : 0.7 }}
          >
            {`${on[m.id] ? "✓ " : ""}about the ${m.label}`}
          </button>
        ))}
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width={SIZE}
        style={{ touchAction: "none", maxWidth: "100%" }}
        role="img"
        aria-label={`Point P${fmtCoord(P)} and its reflections`}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
          move(e);
        }}
        onPointerMove={move}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Grid />
        {on.yx && (
          <>
            <line x1={X(-N)} y1={Y(-N)} x2={X(N)} y2={Y(N)} className="dg-line dg-thin dg-dashed" />
            <text x={X(N) - 4} y={Y(N) + 22} className="dg-text" textAnchor="end" dominantBaseline="central" style={{ fontSize: 12 }}>
              y = x
            </text>
          </>
        )}
        {MIRRORS.filter((m) => on[m.id]).map((m) => {
          const R = m.map(P);
          const same = R[0] === P[0] && R[1] === P[1];
          // label offset: away from P (or up-right if R coincides with P)
          const dx = R[0] - P[0];
          const dy = R[1] - P[1];
          const L = Math.hypot(dx, dy);
          const ux = L ? dx / L : 0.7;
          const uy = L ? dy / L : 0.7;
          return (
            <g key={m.id}>
              {!same && <line x1={X(P[0])} y1={Y(P[1])} x2={X(R[0])} y2={Y(R[1])} className="dg-line dg-thin dg-dashed" />}
              <circle cx={X(R[0])} cy={Y(R[1])} r={3.5} className="dg-point" />
              <text x={X(R[0]) + ux * 14} y={Y(R[1]) - uy * 14} className="dg-label" textAnchor="middle" dominantBaseline="central">
                {m.name}
              </text>
            </g>
          );
        })}
        <circle cx={X(P[0])} cy={Y(P[1])} r={10} className="dg-accent" style={handleStyle} />
        <circle cx={X(P[0])} cy={Y(P[1])} r={3.5} className="dg-point" />
        <text x={X(P[0]) - 14} y={Y(P[1]) - 14} className="dg-label" textAnchor="middle" dominantBaseline="central">
          P
        </text>
      </svg>
      <div style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 380, fontSize: "0.95rem" }}>
        <div>
          <Tex tex={`P${fmtTexPt(P)}`} /> {`— ${quadrant(P)}`}
        </div>
        {MIRRORS.filter((m) => on[m.id]).map((m) => {
          const R = m.map(P);
          return (
            <div key={m.id}>
              {`About the ${m.label}: `}
              <Tex tex={`${m.rule},\\ \\ ${m.name}${fmtTexPt(R)}`} /> {`— ${quadrant(R)}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const registry = {
  "2-8-coordinate-geometry/line-explorer": LineExplorer,
  "2-8-coordinate-geometry/reflection-explorer": ReflectionExplorer,
};
