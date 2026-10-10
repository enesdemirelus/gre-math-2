"use client";
// Interactive explorers for section 2.9 Graphs of Functions.
// Both draw to scale on a coordinate grid (equal units on the two axes).

import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactElement } from "react";
import { Tex } from "@/components/Tex";

type Base = "sq" | "abs" | "sqrt";

const r2 = (n: number) => Math.round(n * 100) / 100;

function baseVal(b: Base, t: number): number | null {
  if (b === "sq") return t * t;
  if (b === "abs") return Math.abs(t);
  return t < -1e-12 ? null : Math.sqrt(Math.max(0, t));
}

/** Number (multiple of 1/12) as TeX: integers plain, otherwise a reduced fraction. */
function numTex(v: number): string {
  if (Math.abs(v - Math.round(v)) < 1e-9) return `${Math.round(v)}`;
  for (let q = 2; q <= 12; q++) {
    const p = Math.round(v * q);
    if (Math.abs(v - p / q) < 1e-9) {
      let a = Math.abs(p);
      let b = q;
      while (b) [a, b] = [b, a % b];
      const pp = p / a;
      const qq = q / a;
      return pp < 0 ? `-\\tfrac{${-pp}}{${qq}}` : `\\tfrac{${pp}}{${qq}}`;
    }
  }
  return `${Math.round(v * 100) / 100}`;
}

function fmtWord(v: number): string {
  if (Math.abs(v - Math.round(v)) < 1e-9) return `${Math.round(v)}`;
  if (Math.abs(v * 2 - Math.round(v * 2)) < 1e-9) return `${Math.round(v * 2)}/2`;
  if (Math.abs(v * 3 - Math.round(v * 3)) < 1e-9) return `${Math.round(v * 3)}/3`;
  if (Math.abs(v * 4 - Math.round(v * 4)) < 1e-9) return `${Math.round(v * 4)}/4`;
  return `${v}`;
}

/* ------------------------------------------------------------------ */
/* Shared grid                                                          */
/* ------------------------------------------------------------------ */

interface Win {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  u: number;
  pad: number;
}

const toX = (w: Win, x: number) => r2(w.pad + (x - w.xmin) * w.u);
const toY = (w: Win, y: number) => r2(w.pad + (w.ymax - y) * w.u);

function Grid({ w }: { w: Win }) {
  const els: ReactElement[] = [];
  for (let v = Math.ceil(w.xmin); v <= w.xmax; v++) {
    if (v !== 0) els.push(<line key={`gx${v}`} x1={toX(w, v)} y1={toY(w, w.ymax)} x2={toX(w, v)} y2={toY(w, w.ymin)} className="dg-line dg-thin" style={{ strokeOpacity: 0.16 }} />);
  }
  for (let v = Math.ceil(w.ymin); v <= w.ymax; v++) {
    if (v !== 0) els.push(<line key={`gy${v}`} x1={toX(w, w.xmin)} y1={toY(w, v)} x2={toX(w, w.xmax)} y2={toY(w, v)} className="dg-line dg-thin" style={{ strokeOpacity: 0.16 }} />);
  }
  const X0 = toX(w, 0);
  const Y0 = toY(w, 0);
  const labels: ReactElement[] = [];
  for (let v = Math.ceil(w.xmin) + 1; v < w.xmax; v++) {
    if (v !== 0 && v % 2 === 0)
      labels.push(
        <text key={`lx${v}`} x={toX(w, v)} y={Y0 + 13} className="dg-text" textAnchor="middle" style={{ fontSize: 10 }}>
          {v < 0 ? `−${-v}` : v}
        </text>,
      );
  }
  for (let v = Math.ceil(w.ymin) + 1; v < w.ymax; v++) {
    if (v !== 0 && v % 2 === 0)
      labels.push(
        <text key={`ly${v}`} x={X0 - 5} y={toY(w, v)} className="dg-text" textAnchor="end" dominantBaseline="central" style={{ fontSize: 10 }}>
          {v < 0 ? `−${-v}` : v}
        </text>,
      );
  }
  return (
    <g>
      {els}
      <line x1={toX(w, w.xmin)} y1={Y0} x2={toX(w, w.xmax)} y2={Y0} className="dg-line dg-thin" />
      <line x1={X0} y1={toY(w, w.ymin)} x2={X0} y2={toY(w, w.ymax)} className="dg-line dg-thin" />
      <text x={toX(w, w.xmax) - 6} y={Y0 - 6} className="dg-label" textAnchor="middle" style={{ fontSize: 13 }}>
        x
      </text>
      <text x={X0 + 9} y={toY(w, w.ymax) + 12} className="dg-label" textAnchor="middle" style={{ fontSize: 13 }}>
        y
      </text>
      {labels}
    </g>
  );
}

function curvePath(w: Win, f: (x: number) => number | null, extra: number[] = []): string {
  const xs: number[] = [];
  const N = 360;
  for (let i = 0; i <= N; i++) xs.push(w.xmin + ((w.xmax - w.xmin) * i) / N);
  xs.push(...extra.filter((e) => e > w.xmin && e < w.xmax));
  xs.sort((a, b) => a - b);
  const parts: string[] = [];
  let pen = false;
  for (const x of xs) {
    const y = f(x);
    if (y === null) {
      pen = false;
      continue;
    }
    const yy = Math.max(w.ymin - 3, Math.min(w.ymax + 3, y));
    parts.push(`${pen ? "L" : "M"} ${toX(w, x)} ${toY(w, yy)}`);
    pen = true;
  }
  return parts.join(" ");
}

function svgPoint(svg: SVGSVGElement, e: ReactPointerEvent): [number, number] {
  const rect = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  return [vb.x + ((e.clientX - rect.left) / rect.width) * vb.width, vb.y + ((e.clientY - rect.top) / rect.height) * vb.height];
}

const BASES: { id: Base; tex: string; inner: (s: string) => string; key: string }[] = [
  { id: "sq", tex: "x^2", inner: (s) => (s === "x" ? "x^2" : `(${s})^2`), key: "vertex" },
  { id: "abs", tex: "|x|", inner: (s) => `|${s}|`, key: "corner" },
  { id: "sqrt", tex: "\\sqrt{x}", inner: (s) => `\\sqrt{${s}}`, key: "endpoint" },
];

const CS = [0.25, 1 / 3, 0.5, 1, 1.5, 2, 3];

/* ------------------------------------------------------------------ */
/* Transformation explorer                                              */
/* ------------------------------------------------------------------ */

export function TransformationExplorer() {
  const [bi, setBi] = useState(0);
  const [h, setH] = useState(1);
  const [k, setK] = useState(-2);
  const [ci, setCi] = useState(5); // c = 2
  const [refl, setRefl] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const B = BASES[bi];
  const c = CS[ci];
  const s = refl ? -1 : 1;
  const w: Win = { xmin: -6, xmax: 6, ymin: -6, ymax: 6, u: 25, pad: 10 };
  const size = 2 * w.pad + 12 * w.u;

  const f0 = (x: number) => baseVal(B.id, x);
  const f1 = (x: number) => {
    const v = baseVal(B.id, x - h);
    return v === null ? null : s * c * v + k;
  };

  const update = (e: ReactPointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return;
    const [px, py] = svgPoint(svg, e);
    const x = (px - w.pad) / w.u + w.xmin;
    const y = w.ymax - (py - w.pad) / w.u;
    const snap = (v: number) => Math.max(-4, Math.min(4, Math.round(v * 2) / 2));
    setH(snap(x));
    setK(snap(y));
  };

  // formula
  const insideTex = h === 0 ? "x" : h > 0 ? `x - ${numTex(h)}` : `x + ${numTex(-h)}`;
  const cTex = c === 1 ? "" : numTex(c);
  const kTex = k === 0 ? "" : k > 0 ? ` + ${numTex(k)}` : ` - ${numTex(-k)}`;
  const formula = `y = ${refl ? "-" : ""}${cTex}${B.inner(insideTex)}${kTex}`;

  const moves: string[] = [];
  if (h !== 0) moves.push(`shift ${h > 0 ? "right" : "left"} ${fmtWord(Math.abs(h))}`);
  if (c > 1) moves.push(`stretch vertically by a factor of ${fmtWord(c)}`);
  if (c < 1) moves.push(`shrink vertically by a factor of ${fmtWord(c)}`);
  if (refl) moves.push("reflect in the x-axis");
  if (k !== 0) moves.push(`shift ${k > 0 ? "up" : "down"} ${fmtWord(Math.abs(k))}`);

  // a second anchor point: base point (1, 1) moves to (h + 1, k + s*c)
  const ax = h + 1;
  const ay = k + s * c;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", justifyContent: "center" }}>
        {BASES.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBi(i)}
            aria-pressed={bi === i}
            style={{ fontWeight: bi === i ? 700 : 400, outline: bi === i ? "2px solid var(--accent)" : undefined }}
          >
            <Tex tex={`f(x) = ${b.tex}`} />
          </button>
        ))}
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        style={{ touchAction: "none", maxWidth: "100%" }}
        role="img"
        aria-label={`Graph of ${formula}`}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
          update(e);
        }}
        onPointerMove={(e) => {
          if (dragging.current) update(e);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <defs>
          <clipPath id="te29clip">
            <rect x={w.pad} y={w.pad} width={12 * w.u} height={12 * w.u} />
          </clipPath>
        </defs>
        <Grid w={w} />
        <g clipPath="url(#te29clip)">
          <path d={curvePath(w, f0, [0])} className="dg-line dg-dashed" />
          <path d={curvePath(w, f1, [h])} className="dg-accent" />
        </g>
        {Math.abs(ay) <= 6 && Math.abs(ax) <= 6 && <circle cx={toX(w, ax)} cy={toY(w, ay)} r={3} className="dg-point" />}
        <circle cx={toX(w, h)} cy={toY(w, k)} r={10} className="dg-accent" style={{ cursor: "grab" }} />
        <circle cx={toX(w, h)} cy={toY(w, k)} r={3.5} className="dg-point" />
      </svg>
      <div style={{ fontSize: "1.1em" }}>
        <Tex tex={formula} />
      </div>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.45rem", width: "100%", maxWidth: 360 }}>
        <label>
          Horizontal shift <Tex tex={`h = ${numTex(h)}`} />
          <input type="range" style={{ width: "100%" }} min={-4} max={4} step={0.5} value={h} onChange={(e) => setH(Number(e.target.value))} />
        </label>
        <label>
          Vertical shift <Tex tex={`k = ${numTex(k)}`} />
          <input type="range" style={{ width: "100%" }} min={-4} max={4} step={0.5} value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
        <label>
          Vertical factor <Tex tex={`c = ${numTex(c)}`} />
          <input type="range" style={{ width: "100%" }} min={0} max={CS.length - 1} step={1} value={ci} onChange={(e) => setCi(Number(e.target.value))} />
        </label>
        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input type="checkbox" checked={refl} onChange={(e) => setRefl(e.target.checked)} />
          Reflect in the <Tex tex="x" />-axis (minus sign in front)
        </label>
      </div>
      <div style={{ width: "100%", maxWidth: 520, display: "grid", gap: "0.3rem" }}>
        <div>
          <b>Moves, in order:</b> {moves.length ? moves.join(" → ") : "none (this is the base graph)"}.
        </div>
        <div>
          The {B.key} moves from <Tex tex="(0, 0)" /> to <Tex tex={`(${numTex(h)}, ${numTex(k)})`} />, and the point <Tex tex="(1, 1)" /> of the base graph moves to{" "}
          <Tex tex={`(${numTex(ax)}, ${numTex(ay)})`} />.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Intersection explorer: y = x^2 or y = |x| against y = mx + b         */
/* ------------------------------------------------------------------ */

/** a + b*sqrt(d) over q, as TeX (d not a perfect square). */
function surd(a: number, sign: 1 | -1, d: number, q: number): string {
  const top = `${a === 0 ? (sign < 0 ? "-" : "") : `${numTex(a)} ${sign < 0 ? "-" : "+"} `}\\sqrt{${numTex(d)}}`;
  return q === 1 ? top : `\\frac{${top}}{${q}}`;
}

export function IntersectionExplorer() {
  const [bi, setBi] = useState<0 | 1>(0);
  const [m, setM] = useState(1);
  const [b, setB] = useState(2);
  const w: Win = { xmin: -6, xmax: 6, ymin: -3, ymax: 9, u: 25, pad: 10 };
  const size = 2 * w.pad + 12 * w.u;
  const base: Base = bi === 0 ? "sq" : "abs";
  const f = (x: number) => baseVal(base, x);
  const g = (x: number) => m * x + b;

  let pts: { x: number; xTex: string }[] = [];
  let infinite = false;
  let work = "";
  if (base === "sq") {
    const D = m * m + 4 * b;
    work = `x^2 = ${m === 0 ? "" : `${numTex(m)}x`}${b === 0 ? (m === 0 ? "0" : "") : b > 0 ? `${m === 0 ? "" : " + "}${numTex(b)}` : ` - ${numTex(-b)}`} \\;\\Longrightarrow\\; x^2 ${m === 0 ? "" : m > 0 ? `- ${numTex(m)}x` : `+ ${numTex(-m)}x`} ${b === 0 ? "" : b > 0 ? `- ${numTex(b)}` : `+ ${numTex(-b)}`} = 0, \\quad b^2 - 4ac = ${numTex(D)}`;
    if (D > 1e-12) {
      const sq = Math.sqrt(D);
      const exact = Math.abs(sq * 2 - Math.round(sq * 2)) < 1e-9;
      pts = [
        { x: (m - sq) / 2, xTex: exact ? numTex((m - sq) / 2) : surd(m, -1, D, 2) },
        { x: (m + sq) / 2, xTex: exact ? numTex((m + sq) / 2) : surd(m, 1, D, 2) },
      ];
    } else if (Math.abs(D) <= 1e-12) {
      pts = [{ x: m / 2, xTex: numTex(m / 2) }];
    }
  } else {
    work = `\\text{for } x \\ge 0:\\ x = ${numTex(m)}x ${b >= 0 ? "+" : "-"} ${numTex(Math.abs(b))}; \\qquad \\text{for } x < 0:\\ -x = ${numTex(m)}x ${b >= 0 ? "+" : "-"} ${numTex(Math.abs(b))}`;
    // x >= 0 piece: (1 - m) x = b
    if (Math.abs(1 - m) < 1e-12) {
      if (Math.abs(b) < 1e-12) infinite = true;
    } else {
      const x = b / (1 - m);
      if (x >= -1e-12) pts.push({ x, xTex: numTex(x) });
    }
    // x < 0 piece: -(1 + m) x = b
    if (Math.abs(1 + m) < 1e-12) {
      if (Math.abs(b) < 1e-12) infinite = true;
    } else {
      const x = -b / (1 + m);
      if (x < -1e-12) pts.push({ x, xTex: numTex(x) });
    }
    pts.sort((p, q) => p.x - q.x);
  }

  const lineTex = `y = ${m === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${numTex(m)}x`}${b === 0 ? (m === 0 ? "0" : "") : b > 0 ? `${m === 0 ? "" : " + "}${numTex(b)}` : ` - ${numTex(-b)}`}`;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <div style={{ display: "flex", gap: "0.35rem" }}>
        {(["y = x^2", "y = |x|"] as const).map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setBi(i as 0 | 1)}
            aria-pressed={bi === i}
            style={{ fontWeight: bi === i ? 700 : 400, outline: bi === i ? "2px solid var(--accent)" : undefined }}
          >
            <Tex tex={t} />
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} style={{ maxWidth: "100%" }} role="img" aria-label={`Graphs of the curve and the line ${lineTex}`}>
        <defs>
          <clipPath id="ie29clip">
            <rect x={w.pad} y={w.pad} width={12 * w.u} height={12 * w.u} />
          </clipPath>
        </defs>
        <Grid w={w} />
        <g clipPath="url(#ie29clip)">
          <path d={curvePath(w, f, [0])} className="dg-accent" />
          <path d={curvePath(w, g)} className="dg-line" />
        </g>
        {pts.map((p, i) => {
          const y = f(p.x)!;
          if (Math.abs(p.x) > 6 || y < w.ymin || y > w.ymax) return null;
          return <circle key={i} cx={toX(w, p.x)} cy={toY(w, y)} r={4.5} className="dg-point" />;
        })}
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.45rem", width: "100%", maxWidth: 360 }}>
        <label>
          Slope <Tex tex={`m = ${numTex(m)}`} />
          <input type="range" style={{ width: "100%" }} min={-3} max={3} step={0.5} value={m} onChange={(e) => setM(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex="y" />-intercept <Tex tex={`b = ${numTex(b)}`} />
          <input type="range" style={{ width: "100%" }} min={-4} max={4} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ width: "100%", maxWidth: 520, display: "grid", gap: "0.3rem", overflowX: "auto" }}>
        <div>
          Line: <Tex tex={lineTex} />
        </div>
        <div>
          <Tex tex={work} />
        </div>
        <div>
          {infinite ? (
            <span>The line contains a whole arm of the V: infinitely many intersection points.</span>
          ) : pts.length === 0 ? (
            <span>
              <b>0</b> intersection points: the equation has no real solution{base === "abs" ? " on either piece" : ""}.
            </span>
          ) : (
            <span>
              <b>{pts.length}</b> intersection point{pts.length > 1 ? "s" : ""}, at{" "}
              {pts.map((p, i) => (
                <span key={i}>
                  {i > 0 ? " and " : ""}
                  <Tex tex={`x = ${p.xTex}`} />
                  {Math.abs(p.x - Math.round(p.x * 12) / 12) > 1e-9 ? <> (<Tex tex={`\\approx ${r2(p.x)}`} />)</> : null}
                </span>
              ))}
              .
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "2-9-graphs-of-functions/transformation-explorer": TransformationExplorer,
  "2-9-graphs-of-functions/intersection-explorer": IntersectionExplorer,
};
