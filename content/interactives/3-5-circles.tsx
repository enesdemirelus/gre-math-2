"use client";
// Interactive explorers for section 3.5 Circles.

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Tex } from "@/components/Tex";

type Pt = [number, number];

const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;

function onC(cx: number, cy: number, r: number, deg: number): Pt {
  return [r2(cx + r * Math.cos(rad(deg))), r2(cy - r * Math.sin(rad(deg)))];
}

function arcD(cx: number, cy: number, r: number, a1: number, a2: number): string {
  const [sx, sy] = onC(cx, cy, r, a1);
  const [ex, ey] = onC(cx, cy, r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 0 ${ex} ${ey}`;
}

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

/** Exact multiple of pi as TeX, e.g. num/den = 5/3 -> \frac{5\pi}{3}. */
function piFrac(num: number, den: number): string {
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  const top = n === 1 ? "\\pi" : `${n}\\pi`;
  return d === 1 ? top : `\\frac{${top}}{${d}}`;
}

function frac(num: number, den: number): string {
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  return d === 1 ? `${n}` : `\\frac{${n}}{${d}}`;
}

/** Converts a pointer position to SVG user coordinates. */
function svgPoint(svg: SVGSVGElement, e: ReactPointerEvent): Pt {
  const rect = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  return [vb.x + ((e.clientX - rect.left) / rect.width) * vb.width, vb.y + ((e.clientY - rect.top) / rect.height) * vb.height];
}

/* ------------------------------------------------------------------ */
/* Sector explorer: central angle and radius -> arc length, sector area */
/* ------------------------------------------------------------------ */

export function SectorExplorer() {
  const [x, setX] = useState(80);
  const [r, setR] = useState(6);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const cx = 130;
  const cy = 120;
  const R = 95; // drawn radius (fixed; r is the radius used in the formulas)
  const a1 = 0;
  const a2 = x;
  const A = onC(cx, cy, R, a1);
  const B = onC(cx, cy, R, a2);
  const handle = B;

  const updateFromPointer = (e: ReactPointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return;
    const [px, py] = svgPoint(svg, e);
    let deg = (Math.atan2(-(py - cy), px - cx) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    deg = Math.round(deg);
    if (deg < 1) deg = deg === 0 && x > 180 ? 359 : 1;
    if (deg > 359) deg = 359;
    setX(deg);
  };

  const sectorPath = `M ${cx} ${cy} L ${arcD(cx, cy, R, a1, a2).slice(2)} Z`;
  const labelPos = onC(cx, cy, x < 40 ? 62 : 40, x / 2);

  const arcExact = piFrac(r * x, 180); // (x/360)*2*pi*r = r x pi / 180
  const areaExact = piFrac(r * r * x, 360); // (x/360)*pi*r^2
  const arcDec = ((x / 360) * 2 * Math.PI * r).toFixed(2);
  const areaDec = ((x / 360) * Math.PI * r * r).toFixed(2);

  return (
    <div className="explorer">
      <svg
        ref={svgRef}
        viewBox="0 0 260 240"
        width={260}
        style={{ touchAction: "none", maxWidth: "100%" }}
        role="img"
        aria-label={`Sector with central angle ${x} degrees`}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
          updateFromPointer(e);
        }}
        onPointerMove={(e) => {
          if (dragging.current) updateFromPointer(e);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <path d={sectorPath} className="dg-accent-fill" />
        <circle cx={cx} cy={cy} r={R} className="dg-line" />
        <path d={arcD(cx, cy, R, a1, a2)} className="dg-accent" />
        <line x1={cx} y1={cy} x2={A[0]} y2={A[1]} className="dg-line" />
        <line x1={cx} y1={cy} x2={B[0]} y2={B[1]} className="dg-line" />
        <path d={arcD(cx, cy, 16, a1, a2)} className="dg-line dg-thin" />
        <text x={labelPos[0]} y={labelPos[1]} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {`${x}°`}
        </text>
        <circle cx={cx} cy={cy} r={3} className="dg-point" />
        <circle cx={A[0]} cy={A[1]} r={3} className="dg-point" />
        <circle cx={handle[0]} cy={handle[1]} r={9} className="dg-accent" style={{ cursor: "grab" }} />
        <circle cx={handle[0]} cy={handle[1]} r={3} className="dg-point" />
      </svg>
      <div className="explorer-controls">
        <label>
          Central angle <Tex tex={`x = ${x}^\\circ`} />
          <input type="range" min={1} max={359} step={1} value={x} onChange={(e) => setX(Number(e.target.value))} />
        </label>
        <label>
          Radius <Tex tex={`r = ${r}`} />
          <input type="range" min={1} max={12} step={1} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
      </div>
      <div className="explorer-readout">
        <div>
          <Tex tex={`\\text{fraction of the circle} = \\frac{${x}}{360} = ${frac(x, 360)}`} />
        </div>
        <div>
          <Tex tex={`\\text{arc length} = \\frac{${x}}{360}\\cdot 2\\pi(${r}) = ${arcExact} \\approx ${arcDec}`} />
        </div>
        <div>
          <Tex tex={`\\text{sector area} = \\frac{${x}}{360}\\cdot \\pi(${r})^2 = ${areaExact} \\approx ${areaDec}`} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Diameter explorer: drag B; the angle at B stays 90 degrees            */
/* ------------------------------------------------------------------ */

function angleAt(v: Pt, p: Pt, q: Pt): number {
  const a = [p[0] - v[0], p[1] - v[1]];
  const b = [q[0] - v[0], q[1] - v[1]];
  const c = (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1]));
  return (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
}

function rightMark(v: Pt, a: Pt, b: Pt, s = 10): string {
  const u = (p: Pt): Pt => {
    const L = Math.hypot(p[0] - v[0], p[1] - v[1]);
    return [(p[0] - v[0]) / L, (p[1] - v[1]) / L];
  };
  const ua = u(a);
  const ub = u(b);
  const p1: Pt = [v[0] + s * ua[0], v[1] + s * ua[1]];
  const p2: Pt = [p1[0] + s * ub[0], p1[1] + s * ub[1]];
  const p3: Pt = [v[0] + s * ub[0], v[1] + s * ub[1]];
  return `M ${r2(p1[0])} ${r2(p1[1])} L ${r2(p2[0])} ${r2(p2[1])} L ${r2(p3[0])} ${r2(p3[1])}`;
}

export function DiameterExplorer() {
  const [t, setT] = useState(115); // position of B on the circle, degrees
  const [showRadius, setShowRadius] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const cx = 140;
  const cy = 120;
  const R = 100;
  const A: Pt = [cx - R, cy];
  const C: Pt = [cx + R, cy];
  const B = onC(cx, cy, R, t);
  const O: Pt = [cx, cy];

  const update = (e: ReactPointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return;
    const [px, py] = svgPoint(svg, e);
    let deg = (Math.atan2(-(py - cy), px - cx) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    deg = Math.round(deg);
    // keep B away from A (180) and C (0/360)
    if (deg < 8) deg = 8;
    if (deg > 352) deg = 352;
    if (deg > 172 && deg < 188) deg = deg < 180 ? 172 : 188;
    setT(deg);
  };

  const angB = angleAt(B, A, C);
  const angA = angleAt(A, B, C);
  const angC = angleAt(C, A, B);
  const labelSide = t < 180 ? 1 : -1; // B above or below AC

  return (
    <div className="explorer">
      <svg
        ref={svgRef}
        viewBox="0 0 280 245"
        width={280}
        style={{ touchAction: "none", maxWidth: "100%" }}
        role="img"
        aria-label="Triangle ABC inscribed in a circle with AC a diameter"
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
        <circle cx={cx} cy={cy} r={R} className="dg-line" />
        <path d={`M ${A.join(" ")} L ${B.join(" ")} L ${C.join(" ")} Z`} className="dg-accent" />
        <path d={rightMark(B, A, C)} className="dg-line dg-thin" />
        {showRadius && <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} className="dg-line dg-dashed" />}
        <circle cx={O[0]} cy={O[1]} r={3} className="dg-point" />
        <circle cx={A[0]} cy={A[1]} r={3} className="dg-point" />
        <circle cx={C[0]} cy={C[1]} r={3} className="dg-point" />
        <circle cx={B[0]} cy={B[1]} r={9} className="dg-accent" style={{ cursor: "grab" }} />
        <circle cx={B[0]} cy={B[1]} r={3} className="dg-point" />
        <text x={A[0] - 13} y={A[1]} className="dg-label" textAnchor="middle" dominantBaseline="central">A</text>
        <text x={C[0] + 13} y={C[1]} className="dg-label" textAnchor="middle" dominantBaseline="central">C</text>
        <text x={cx} y={cy + 16 * labelSide} className="dg-label" textAnchor="middle" dominantBaseline="central">O</text>
        {(() => {
          const L = onC(cx, cy, R + 18, t);
          return (
            <text x={L[0]} y={L[1]} className="dg-label" textAnchor="middle" dominantBaseline="central">B</text>
          );
        })()}
      </svg>
      <div className="explorer-controls">
        <label>
          <input type="checkbox" checked={showRadius} onChange={(e) => setShowRadius(e.target.checked)} /> Draw radius{" "}
          <Tex tex="OB" />
        </label>
      </div>
      <div className="explorer-readout">
        <div>
          <Tex tex={`\\text{angle } ABC = ${angB.toFixed(1)}^\\circ`} />
        </div>
        <div>
          <Tex tex={`\\text{angle } BAC + \\text{angle } BCA = ${angA.toFixed(1)}^\\circ + ${angC.toFixed(1)}^\\circ = ${(angA + angC).toFixed(1)}^\\circ`} />
        </div>
        {showRadius && (
          <div>
            <Tex tex={`OA = OB = OC \\text{, so triangles } AOB \\text{ and } COB \\text{ are isosceles}`} />
          </div>
        )}
      </div>
    </div>
  );
}
