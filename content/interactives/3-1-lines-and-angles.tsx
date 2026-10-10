"use client";
// Interactive explorer for section 3.1 Lines and Angles.

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Tex } from "@/components/Tex";

type Pt = [number, number];

const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Point at distance d from v in direction deg (math convention; SVG y points down). */
function along(v: Pt, deg: number, d: number): Pt {
  return [r2(v[0] + d * Math.cos(rad(deg))), r2(v[1] - d * Math.sin(rad(deg)))];
}

function sectorPath(v: Pt, r: number, d1: number, d2: number): string {
  const s = along(v, d1, r);
  const e = along(v, d2, r);
  const large = d2 - d1 > 180 ? 1 : 0;
  return `M ${v[0]} ${v[1]} L ${s[0]} ${s[1]} A ${r} ${r} 0 ${large} 0 ${e[0]} ${e[1]} Z`;
}

/** Intersection of the line through p (direction a) with the line through q (direction b). */
function meet(p: Pt, a: number, q: Pt, b: number): Pt {
  const ax = Math.cos(rad(a));
  const ay = -Math.sin(rad(a));
  const bx = Math.cos(rad(b));
  const by = -Math.sin(rad(b));
  const det = ax * -by - ay * -bx;
  const t = ((q[0] - p[0]) * -by - (q[1] - p[1]) * -bx) / det;
  return [r2(p[0] + t * ax), r2(p[1] + t * ay)];
}

function svgPoint(svg: SVGSVGElement, e: ReactPointerEvent): Pt {
  const rect = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  return [vb.x + ((e.clientX - rect.left) / rect.width) * vb.width, vb.y + ((e.clientY - rect.top) / rect.height) * vb.height];
}

const C0: Pt = [170, 120]; // pivot of line p
const KY = 62; // line k height
const MPT: Pt = [170, 178]; // point of line m it turns about

export function ParallelExplorer() {
  const [theta, setTheta] = useState(62); // direction of p, degrees (25..155)
  const [tau, setTau] = useState(0); // tilt of m, degrees (-20..20)
  const [sel, setSel] = useState<number | null>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const parallel = tau === 0;
  const Xk = meet(C0, theta, [0, KY], 0);
  const Xm = meet(C0, theta, MPT, tau);
  // angle i: 0..3 at k, 4..7 at m. Quadrants counterclockwise from the line's rightward ray.
  const vals: number[] = [];
  const geo: { v: Pt; d1: number; d2: number }[] = [];
  const crossings: { X: Pt; a: number }[] = [
    { X: Xk, a: 0 },
    { X: Xm, a: tau },
  ];
  for (const { X, a } of crossings) {
    const delta = theta - a;
    const spans: [number, number][] = [
      [a, a + delta],
      [a + delta, a + 180],
      [a + 180, a + 180 + delta],
      [a + 180 + delta, a + 360],
    ];
    spans.forEach(([d1, d2]) => {
      vals.push(r2(d2 - d1));
      geo.push({ v: X, d1, d2 });
    });
  }
  const same = (i: number, j: number) => Math.abs(vals[i] - vals[j]) < 0.01;
  const supp = (i: number, j: number) => Math.abs(vals[i] + vals[j] - 180) < 0.01;

  const update = (e: ReactPointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return;
    const [px, py] = svgPoint(svg, e);
    let deg = (Math.atan2(-(py - C0[1]), px - C0[0]) * 180) / Math.PI;
    deg = ((deg % 180) + 180) % 180;
    setTheta(Math.max(25, Math.min(155, Math.round(deg))));
  };

  const pTop = along(C0, theta, 112);
  const pBot = along(C0, theta + 180, 112);
  const handle = along(C0, theta, 100);
  const mL: Pt = [18, r2(MPT[1] + (170 - 18) * Math.tan(rad(tau)))];
  const mR: Pt = [322, r2(MPT[1] - (322 - 170) * Math.tan(rad(tau)))];

  const R = 30;
  const num = (v: number) => (Math.abs(v - Math.round(v)) < 0.01 ? String(Math.round(v)) : v.toFixed(1));

  const nSame = sel === null ? 0 : vals.filter((_, j) => same(sel, j)).length;
  const nSupp = sel === null ? 0 : vals.filter((_, j) => j !== sel && supp(sel, j)).length;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg
        ref={svgRef}
        viewBox="0 0 340 240"
        width={340}
        style={{ touchAction: "none", maxWidth: "100%" }}
        role="img"
        aria-label="Lines k and m crossed by line p, with eight angles"
        onPointerDown={(e) => {
          const t = e.target as SVGElement;
          if (t.dataset.handle) {
            dragging.current = true;
            (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
            update(e);
          }
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
        {geo.map((g, i) => {
          const isEq = sel !== null && (i === sel || same(sel, i));
          const isSupp = sel !== null && !isEq && supp(sel, i);
          const cls = isEq ? "dg-accent-fill" : isSupp ? "dg-fill" : "";
          return (
            <path
              key={`s${i}`}
              d={sectorPath(g.v, R, g.d1, g.d2)}
              className={cls}
              style={{ fill: cls ? undefined : "transparent", fillOpacity: isEq ? 0.5 : isSupp ? 0.25 : undefined, cursor: "pointer" }}
              onClick={() => setSel(i)}
            />
          );
        })}
        <line x1={18} y1={KY} x2={322} y2={KY} className="dg-line" />
        <line x1={mL[0]} y1={mL[1]} x2={mR[0]} y2={mR[1]} className="dg-line" />
        <line x1={pTop[0]} y1={pTop[1]} x2={pBot[0]} y2={pBot[1]} className="dg-line" />
        {geo.map((g, i) => {
          const mid = (g.d1 + g.d2) / 2;
          const half = (g.d2 - g.d1) / 2;
          const dist = Math.min(56, Math.max(40, 20 / Math.sin(rad(Math.min(half, 89)))));
          const p = along(g.v, mid, dist);
          const hot = sel !== null && (i === sel || same(sel, i));
          return (
            <text
              key={`t${i}`}
              x={p[0]}
              y={p[1]}
              className="dg-text"
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontSize: 11, fontWeight: hot ? 700 : 400, pointerEvents: "none" }}
            >
              {`${num(vals[i])}°`}
            </text>
          );
        })}
        <circle cx={Xk[0]} cy={Xk[1]} r={3} className="dg-point" />
        <circle cx={Xm[0]} cy={Xm[1]} r={3} className="dg-point" />
        <circle cx={handle[0]} cy={handle[1]} r={10} className="dg-accent" style={{ cursor: "grab" }} data-handle="1" />
        <circle cx={handle[0]} cy={handle[1]} r={3} className="dg-point" style={{ pointerEvents: "none" }} />
        <text x={328} y={KY} className="dg-label" dominantBaseline="central">k</text>
        <text x={328} y={mR[1]} className="dg-label" dominantBaseline="central">m</text>
        <text x={pBot[0] + 10} y={pBot[1] + 4} className="dg-label">p</text>
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Direction of <Tex tex="p" />: angle with <Tex tex="k" /> is <Tex tex={`${theta}^\\circ`} />
          <input type="range" style={{ width: "100%" }} min={25} max={155} step={1} value={theta} onChange={(e) => setTheta(Number(e.target.value))} />
        </label>
        <label>
          Tilt of <Tex tex="m" />: <Tex tex={`${tau}^\\circ`} /> {parallel ? "(parallel to k)" : "(not parallel to k)"}
          <input type="range" style={{ width: "100%" }} min={-20} max={20} step={1} value={tau} onChange={(e) => setTau(Number(e.target.value))} />
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        {parallel ? (
          theta === 90 ? (
            <div>
              <Tex tex="k \\parallel m:" /> all eight angles are <Tex tex="90^\\circ" />.
            </div>
          ) : (
          <div>
            <Tex tex={`k \\parallel m:\\ \\text{acute angles } ${num(Math.min(theta, 180 - theta))}^\\circ,\\ \\text{obtuse angles } ${num(Math.max(theta, 180 - theta))}^\\circ,\\ ${num(Math.min(theta, 180 - theta))} + ${num(Math.max(theta, 180 - theta))} = 180`} />
          </div>
          )
        ) : (
          <div>
            <Tex tex={`\\text{At } k: ${num(theta)}^\\circ,\\ ${num(180 - theta)}^\\circ.\\quad \\text{At } m: ${num(theta - tau)}^\\circ,\\ ${num(180 - theta + tau)}^\\circ.\\quad \\text{Not parallel, so the two crossings do not match.}`} />
          </div>
        )}
        {sel !== null ? (
          <div>
            Selected angle: <Tex tex={`${num(vals[sel])}^\\circ`} />. It equals {nSame - 1} other angle{nSame - 1 === 1 ? "" : "s"} (shaded
            dark) and adds to <Tex tex="180^\circ" /> with {nSupp} angle{nSupp === 1 ? "" : "s"} (shaded light). Tap another angle to compare.
          </div>
        ) : (
          <div>Tap any angle in the figure.</div>
        )}
      </div>
    </div>
  );
}

export const registry = {
  "3-1-lines-and-angles/parallel-explorer": ParallelExplorer,
};
