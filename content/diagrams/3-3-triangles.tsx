// Original diagrams for section 3.3 Triangles.
// Figures are built in "model" coordinates (y up, any units) and mapped into the SVG
// viewBox by a fitting transform, so every vertex is computed, not eyeballed.
// No tick marks (ETS does not use them): equal lengths are shown with equal labels.

import type { ReactNode } from "react";

type Pt = [number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;
const rad = (d: number) => (d * Math.PI) / 180;

/** Fit model points (y up) into a W x H box with margins; returns a mapper to SVG coordinates. */
function fitMap(pts: Pt[], W: number, H: number, mx = 30, my = 26, ox = 0, oy = 0) {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minx = Math.min(...xs);
  const maxx = Math.max(...xs);
  const miny = Math.min(...ys);
  const maxy = Math.max(...ys);
  const dx = maxx - minx || 1;
  const dy = maxy - miny || 1;
  const s = Math.min((W - 2 * mx) / dx, (H - 2 * my) / dy);
  const padX = (W - dx * s) / 2;
  const padY = (H - dy * s) / 2;
  return (p: Pt): Pt => [r2(ox + padX + (p[0] - minx) * s), r2(oy + H - padY - (p[1] - miny) * s)];
}

const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
const mul = (a: Pt, k: number): Pt => [a[0] * k, a[1] * k];
const len = (a: Pt) => Math.hypot(a[0], a[1]);
const unit = (a: Pt): Pt => mul(a, 1 / (len(a) || 1));
const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const centroid = (...p: Pt[]): Pt => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];

/** Third vertex C of a triangle with A = (0,0), B = (c,0), AC = b, BC = a (C above AB). */
function fromSides(c: number, b: number, a: number): Pt {
  const x = (c * c + b * b - a * a) / (2 * c);
  return [x, Math.sqrt(Math.max(0, b * b - x * x))];
}

const poly = (...p: Pt[]) => `M ${p.map((q) => `${q[0]} ${q[1]}`).join(" L ")} Z`;

/** Small right-angle square at v, sides toward a and b (SVG coordinates). */
function rightMark(v: Pt, a: Pt, b: Pt, s = 9): string {
  const ua = unit(sub(a, v));
  const ub = unit(sub(b, v));
  const p1 = add(v, mul(ua, s));
  const p2 = add(p1, mul(ub, s));
  const p3 = add(v, mul(ub, s));
  return `M ${r2(p1[0])} ${r2(p1[1])} L ${r2(p2[0])} ${r2(p2[1])} L ${r2(p3[0])} ${r2(p3[1])}`;
}

/** Arc marking the (smaller) angle at v between rays toward p and q (SVG coordinates). */
function angleArc(v: Pt, p: Pt, q: Pt, r = 18): string {
  const up = unit(sub(p, v));
  const uq = unit(sub(q, v));
  const s = add(v, mul(up, r));
  const e = add(v, mul(uq, r));
  const cz = up[0] * uq[1] - up[1] * uq[0];
  return `M ${r2(s[0])} ${r2(s[1])} A ${r} ${r} 0 0 ${cz > 0 ? 1 : 0} ${r2(e[0])} ${r2(e[1])}`;
}

/** Position for an angle label: along the bisector of angle pvq at distance d from v. */
function angleLabelPos(v: Pt, p: Pt, q: Pt, d = 30): Pt {
  const b = unit(add(unit(sub(p, v)), unit(sub(q, v))));
  return add(v, mul(b, d));
}

/** Vertex label pushed away from the point `from` (usually the centroid). */
function vertexPos(v: Pt, from: Pt, off = 14): Pt {
  return add(v, mul(unit(sub(v, from)), off));
}

/** Side label: midpoint of pq pushed perpendicular, away from `away` (usually the centroid). */
function sidePos(p: Pt, q: Pt, away: Pt, off = 12): Pt {
  const m = lerp(p, q, 0.5);
  const d = unit(sub(q, p));
  let n: Pt = [-d[1], d[0]];
  if ((m[0] - away[0]) * n[0] + (m[1] - away[1]) * n[1] < 0) n = mul(n, -1);
  return add(m, mul(n, off));
}

function T({ at, children, cls = "dg-label" }: { at: Pt; children: ReactNode; cls?: string }) {
  return (
    <text x={r2(at[0])} y={r2(at[1])} className={cls} textAnchor="middle" dominantBaseline="central">
      {children}
    </text>
  );
}

function Dot({ at }: { at: Pt }) {
  return <circle cx={at[0]} cy={at[1]} r={2.6} className="dg-point" />;
}

function Seg({ a, b, cls = "dg-line" }: { a: Pt; b: Pt; cls?: string }) {
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={cls} />;
}

/** "x√3"-style label: italic variable, upright radical. */
function Rad({ v, n }: { v: string; n: number }) {
  return (
    <>
      {v}
      <tspan className="dg-text" style={{ fontStyle: "normal" }}>{`√${n}`}</tspan>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Interior and exterior angles                                      */
/* ------------------------------------------------------------------ */

export function AnglesFigure({ variant = "interior" }: { variant?: "interior" | "exterior" }) {
  const W = 320;
  const H = 200;
  const mA: Pt = [0, 0];
  const mB: Pt = [3.2, 4.2];
  const mC: Pt = [8, 0];
  const mE: Pt = [10.6, 0];
  const m = fitMap([mA, mB, mC, mE], W, H, 28, 28);
  const A = m(mA);
  const B = m(mB);
  const C = m(mC);
  const E = m(mE);
  const G = centroid(A, B, C);
  const ext = variant === "exterior";
  const inCls = ext ? "dg-line dg-thin" : "dg-accent";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Triangle ABC with its angles marked">
      {ext && <Seg a={C} b={E} />}
      <path d={poly(A, B, C)} className="dg-line" />
      <path d={angleArc(A, B, C, 20)} className={inCls} />
      <path d={angleArc(B, A, C, 18)} className={inCls} />
      <path d={angleArc(C, A, B, 20)} className={inCls} />
      <T at={angleLabelPos(A, B, C, 36)}>x°</T>
      <T at={angleLabelPos(B, A, C, 34)}>y°</T>
      <T at={angleLabelPos(C, A, B, 36)}>z°</T>
      {ext && (
        <>
          <path d={angleArc(C, B, E, 22)} className="dg-accent" />
          <T at={angleLabelPos(C, B, E, 38)}>w°</T>
        </>
      )}
      {[A, B, C].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <T at={vertexPos(A, G, 14)}>A</T>
      <T at={vertexPos(B, G, 14)}>B</T>
      <T at={vertexPos(C, G, 14)}>C</T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Triangle inequality: a triangle that exists, and one that cannot  */
/* ------------------------------------------------------------------ */

export function InequalityFigure({ variant = "ok" }: { variant?: "ok" | "fail" }) {
  const W = 320;
  const H = 190;
  if (variant === "ok") {
    const mA: Pt = [0, 0];
    const mB: Pt = [9, 0];
    const mC = fromSides(9, 5, 6);
    const m = fitMap([mA, mB, mC], W, H, 40, 34);
    const A = m(mA);
    const B = m(mB);
    const C = m(mC);
    const G = centroid(A, B, C);
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Triangle with sides 5, 6 and 9">
        <path d={poly(A, B, C)} className="dg-line" />
        <Seg a={A} b={B} cls="dg-accent" />
        <T at={sidePos(A, C, G, 13)} cls="dg-text">5</T>
        <T at={sidePos(B, C, G, 13)} cls="dg-text">6</T>
        <T at={sidePos(A, B, G, 14)} cls="dg-text">9</T>
        {[A, B, C].map((p, i) => (
          <Dot key={i} at={p} />
        ))}
      </svg>
    );
  }
  // fail: base 12, arms 4 and 5 cannot meet. Dashed arcs show every position each arm can reach.
  const u = 20;
  const A: Pt = [40, 160];
  const B: Pt = [40 + 12 * u, 160];
  const ra = 4 * u;
  const rb = 5 * u;
  const armA = add(A, [ra * Math.cos(rad(60)), -ra * Math.sin(rad(60))]);
  const armB = add(B, [-rb * Math.cos(rad(55)), -rb * Math.sin(rad(55))]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Sides 4 and 5 cannot meet over a base of 12">
      <path d={`M ${A[0] + ra} ${A[1]} A ${ra} ${ra} 0 0 0 ${A[0] - ra} ${A[1]}`} className="dg-line dg-thin dg-dashed" />
      <path d={`M ${B[0] + rb} ${B[1]} A ${rb} ${rb} 0 0 0 ${B[0] - rb} ${B[1]}`} className="dg-line dg-thin dg-dashed" />
      <Seg a={A} b={B} cls="dg-accent" />
      <Seg a={A} b={armA} />
      <Seg a={B} b={armB} />
      <T at={add(lerp(A, armA, 0.5), [-12, -2])} cls="dg-text">4</T>
      <T at={add(lerp(B, armB, 0.5), [12, -2])} cls="dg-text">5</T>
      <T at={[(A[0] + B[0]) / 2, A[1] + 16]} cls="dg-text">12</T>
      {[A, B, armA, armB].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Equilateral, isosceles, scalene; acute and obtuse                 */
/* ------------------------------------------------------------------ */

export function TypesFigure({ kind = "isosceles" }: { kind?: "equilateral" | "isosceles" | "scalene" | "acute-obtuse" }) {
  const W = 300;
  const H = 200;
  if (kind === "acute-obtuse") {
    const W2 = 340;
    // acute: angles 50, 60, 70 (A, B at base); obtuse: angle 125 at the left base vertex
    const aA: Pt = [0, 0];
    const aB: Pt = [6, 0];
    // apex from base angles 50 (at aA) and 70 (at aB)
    const t50 = Math.tan(rad(50));
    const t70 = Math.tan(rad(70));
    const ax = (6 * t70) / (t50 + t70);
    const aC: Pt = [ax, ax * t50];
    const oA: Pt = [8.5, 0];
    const oB: Pt = [14.5, 0];
    const oC: Pt = add(oA, [2.6 * Math.cos(rad(125)), 2.6 * Math.sin(rad(125))]);
    const m = fitMap([aA, aB, aC, oA, oB, oC, [8.5 - 1.6, 0]], W2, H, 18, 36);
    const P = [aA, aB, aC].map(m);
    const Q = [oA, oB, oC].map(m);
    const Gp = centroid(P[0], P[1], P[2]);
    return (
      <svg viewBox={`0 0 ${W2} ${H}`} width={W2} role="img" aria-label="An acute triangle and an obtuse triangle">
        <path d={poly(P[0], P[1], P[2])} className="dg-line" />
        <path d={poly(Q[0], Q[1], Q[2])} className="dg-line" />
        <path d={angleArc(P[0], P[1], P[2], 16)} className="dg-line dg-thin" />
        <path d={angleArc(P[1], P[0], P[2], 16)} className="dg-line dg-thin" />
        <path d={angleArc(P[2], P[0], P[1], 14)} className="dg-line dg-thin" />
        <T at={angleLabelPos(P[0], P[1], P[2], 32)} cls="dg-text">50°</T>
        <T at={angleLabelPos(P[1], P[0], P[2], 32)} cls="dg-text">70°</T>
        <T at={angleLabelPos(P[2], P[0], P[1], 30)} cls="dg-text">60°</T>
        <path d={angleArc(Q[0], Q[1], Q[2], 16)} className="dg-accent" />
        <T at={add(Q[0], [16, -24])} cls="dg-text">125°</T>
        <T at={[Gp[0], H - 14]} cls="dg-text">acute</T>
        <T at={[(Q[0][0] + Q[1][0]) / 2 - 10, H - 14]} cls="dg-text">obtuse</T>
      </svg>
    );
  }
  const sides: Record<string, [number, number, number]> = {
    equilateral: [7, 7, 7],
    isosceles: [6, 9, 9],
    scalene: [9, 5, 7],
  };
  const [c, b, a] = sides[kind];
  const mA: Pt = [0, 0];
  const mB: Pt = [c, 0];
  const mC = fromSides(c, b, a);
  const m = fitMap([mA, mB, mC], W, H, 50, 30);
  const A = m(mA);
  const B = m(mB);
  const C = m(mC);
  const G = centroid(A, B, C);
  const eq = kind === "equilateral";
  const iso = kind === "isosceles";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label={`${kind} triangle`}>
      <path d={poly(A, B, C)} className="dg-line" />
      {(eq || iso) && <Seg a={A} b={C} cls="dg-accent" />}
      {(eq || iso) && <Seg a={B} b={C} cls="dg-accent" />}
      {eq && <Seg a={A} b={B} cls="dg-accent" />}
      <T at={sidePos(A, B, G, 14)} cls="dg-text">{String(c)}</T>
      <T at={sidePos(A, C, G, 13)} cls="dg-text">{String(b)}</T>
      <T at={sidePos(B, C, G, 13)} cls="dg-text">{String(a)}</T>
      {(eq || iso) && (
        <>
          <path d={angleArc(A, B, C, 18)} className="dg-line dg-thin" />
          <path d={angleArc(B, A, C, 18)} className="dg-line dg-thin" />
          <T at={angleLabelPos(A, B, C, 33)} cls={eq ? "dg-text" : "dg-label"}>{eq ? "60°" : "x°"}</T>
          <T at={angleLabelPos(B, A, C, 33)} cls={eq ? "dg-text" : "dg-label"}>{eq ? "60°" : "x°"}</T>
        </>
      )}
      {eq && (
        <>
          <path d={angleArc(C, A, B, 16)} className="dg-line dg-thin" />
          <T at={angleLabelPos(C, A, B, 31)} cls="dg-text">60°</T>
        </>
      )}
      {[A, B, C].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <T at={vertexPos(A, G, 14)}>A</T>
      <T at={vertexPos(B, G, 14)}>C</T>
      <T at={vertexPos(C, G, 14)}>B</T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Right triangle: hypotenuse and legs                               */
/* ------------------------------------------------------------------ */

export function RightFigure({
  highlight = "all",
  labels = "letters",
}: {
  highlight?: "all" | "hypotenuse" | "legs" | "none";
  labels?: "letters" | "abc";
}) {
  const W = 280;
  const H = 210;
  const mP: Pt = [0, 0];
  const mQ: Pt = [0, 5];
  const mR: Pt = [7.5, 0];
  const m = fitMap([mP, mQ, mR], W, H, 50, 30);
  const P = m(mP);
  const Q = m(mQ);
  const R = m(mR);
  const G = centroid(P, Q, R);
  const hyp = highlight === "all" || highlight === "hypotenuse";
  const legs = highlight === "all" || highlight === "legs";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Right triangle with the right angle at P">
      <path d={poly(P, Q, R)} className="dg-line" />
      {hyp && <Seg a={Q} b={R} cls="dg-accent" />}
      {legs && <Seg a={P} b={Q} cls="dg-accent" />}
      {legs && <Seg a={P} b={R} cls="dg-accent" />}
      <path d={rightMark(P, Q, R, 11)} className="dg-line dg-thin" />
      {labels === "abc" ? (
        <>
          <T at={sidePos(P, Q, G, 13)}>a</T>
          <T at={sidePos(P, R, G, 14)}>b</T>
          <T at={sidePos(Q, R, G, 13)}>c</T>
        </>
      ) : (
        <>
          {[P, Q, R].map((p, i) => (
            <Dot key={i} at={p} />
          ))}
          <T at={vertexPos(P, G, 15)}>P</T>
          <T at={vertexPos(Q, G, 14)}>Q</T>
          <T at={vertexPos(R, G, 14)}>R</T>
          {highlight === "hypotenuse" && <T at={sidePos(Q, R, G, 16)} cls="dg-text">hypotenuse</T>}
          {highlight === "legs" && (
            <>
              <T at={sidePos(P, Q, G, 22)} cls="dg-text">leg</T>
              <T at={sidePos(P, R, G, 14)} cls="dg-text">leg</T>
            </>
          )}
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. The 45°-45°-90° triangle                                          */
/* ------------------------------------------------------------------ */

export function IsoRightFigure() {
  const W = 260;
  const H = 210;
  const mA: Pt = [0, 0];
  const mB: Pt = [0, 1];
  const mC: Pt = [1, 0];
  const m = fitMap([mA, mB, mC], W, H, 55, 30);
  const A = m(mA);
  const B = m(mB);
  const C = m(mC);
  const G = centroid(A, B, C);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Isosceles right triangle with legs x and hypotenuse x times root 2">
      <path d={poly(A, B, C)} className="dg-line" />
      <Seg a={B} b={C} cls="dg-accent" />
      <path d={rightMark(A, B, C, 11)} className="dg-line dg-thin" />
      <path d={angleArc(B, A, C, 18)} className="dg-line dg-thin" />
      <path d={angleArc(C, A, B, 18)} className="dg-line dg-thin" />
      <T at={angleLabelPos(B, A, C, 36)} cls="dg-text">45°</T>
      <T at={angleLabelPos(C, A, B, 38)} cls="dg-text">45°</T>
      <T at={sidePos(A, B, G, 13)}>x</T>
      <T at={sidePos(A, C, G, 14)}>x</T>
      <T at={sidePos(B, C, G, 18)}>
        <Rad v="x" n={2} />
      </T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. The 30°-60°-90° triangle as half of an equilateral triangle       */
/* ------------------------------------------------------------------ */

export function ThirtySixtyFigure() {
  const W = 280;
  const H = 220;
  const s3 = Math.sqrt(3);
  const mA: Pt = [0, 0];
  const mM: Pt = [1, 0];
  const mT: Pt = [1, s3];
  const mB: Pt = [2, 0];
  const m = fitMap([mA, mM, mT, mB], W, H, 40, 26);
  const A = m(mA);
  const M = m(mM);
  const Tp = m(mT);
  const B = m(mB);
  const G = centroid(A, M, Tp);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Equilateral triangle cut in half into two 30-60-90 triangles">
      <path d={poly(A, M, Tp)} className="dg-line" />
      <Seg a={Tp} b={B} cls="dg-line dg-thin dg-dashed" />
      <Seg a={M} b={B} cls="dg-line dg-thin dg-dashed" />
      <path d={rightMark(M, Tp, A, 10)} className="dg-line dg-thin" />
      <path d={angleArc(A, M, Tp, 18)} className="dg-line dg-thin" />
      <path d={angleArc(Tp, A, M, 24)} className="dg-line dg-thin" />
      <T at={angleLabelPos(A, M, Tp, 34)} cls="dg-text">60°</T>
      <T at={angleLabelPos(Tp, A, M, 42)} cls="dg-text">30°</T>
      <T at={sidePos(A, Tp, G, 16)}>2x</T>
      <T at={sidePos(A, M, G, 14)}>x</T>
      <T at={add(lerp(M, Tp, 0.5), [-18, 0])}>
        <Rad v="x" n={3} />
      </T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Base and height: inside, a leg, outside                           */
/* ------------------------------------------------------------------ */

type BHVariant = "inside" | "right" | "outside";

function BaseHeightParts({
  variant,
  ox,
  w,
  H,
  bLabel,
  hLabel,
  highlight,
}: {
  variant: BHVariant;
  ox: number;
  w: number;
  H: number;
  bLabel: string;
  hLabel: string;
  highlight: "base" | "height" | "both" | "none";
}) {
  // base from (0,0) to (12,0), height 5
  const apexX = variant === "inside" ? 4 : variant === "right" ? 0 : -3;
  const mA: Pt = [0, 0];
  const mB: Pt = [12, 0];
  const mC: Pt = [apexX, 5];
  const mF: Pt = [apexX, 0];
  const m = fitMap([mA, mB, mC, mF], w, H, 14, 30, ox, 0);
  const A = m(mA);
  const B = m(mB);
  const C = m(mC);
  const F = m(mF);
  const baseCls = highlight === "base" || highlight === "both" ? "dg-accent" : "dg-line";
  const hCls = highlight === "height" || highlight === "both" ? "dg-accent dg-dashed" : "dg-line dg-dashed";
  const lab = (t: string) => (t.length === 1 ? "dg-label" : "dg-text");
  return (
    <g>
      <path d={poly(A, B, C)} className="dg-line" />
      <Seg a={A} b={B} cls={baseCls} />
      {variant === "outside" && <Seg a={F} b={A} cls="dg-line dg-thin dg-dashed" />}
      {variant === "right" ? (
        <Seg a={A} b={C} cls={highlight === "height" || highlight === "both" ? "dg-accent" : "dg-line"} />
      ) : (
        <Seg a={C} b={F} cls={hCls} />
      )}
      <path d={rightMark(F, C, B, 8)} className="dg-line dg-thin" />
      <T at={[(A[0] + B[0]) / 2, A[1] + 15]} cls={lab(bLabel)}>
        {bLabel}
      </T>
      <T at={[F[0] + (variant === "inside" ? 11 : -11), (F[1] + C[1]) / 2]} cls={lab(hLabel)}>
        {hLabel}
      </T>
    </g>
  );
}

export function BaseHeightFigure({
  variant = "all",
  b = "12",
  h = "5",
  highlight = "both",
}: {
  variant?: BHVariant | "all";
  b?: string;
  h?: string;
  highlight?: "base" | "height" | "both" | "none";
}) {
  if (variant === "all") {
    const W = 360;
    const H = 130;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Three triangles with the same base and height">
        <BaseHeightParts variant="inside" ox={0} w={120} H={H} bLabel={b} hLabel={h} highlight="none" />
        <BaseHeightParts variant="right" ox={120} w={120} H={H} bLabel={b} hLabel={h} highlight="none" />
        <BaseHeightParts variant="outside" ox={240} w={120} H={H} bLabel={b} hLabel={h} highlight="none" />
      </svg>
    );
  }
  const W = 280;
  const H = 170;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="A triangle with a base and its height">
      <BaseHeightParts variant={variant} ox={0} w={W} H={H} bLabel={b} hLabel={h} highlight={highlight} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Any side can be the base (same obtuse triangle, two choices)      */
/* ------------------------------------------------------------------ */

export function AnyBaseFigure() {
  const W = 360;
  const H = 150;
  const mK: Pt = [0, 0];
  const mL: Pt = [10, 0];
  const mM: Pt = [-3, 4];
  const mF: Pt = [-3, 0];
  // foot of the perpendicular from K to LM
  const d = sub(mM, mL);
  const t = -(mL[0] * d[0] + mL[1] * d[1]) / (d[0] * d[0] + d[1] * d[1]);
  const mG = add(mL, mul(d, t));
  const pts: Pt[] = [mK, mL, mM, mF];
  const parts = [0, 180].map((ox) => {
    const m = fitMap(pts, 180, H, 22, 30, ox, 0);
    return { K: m(mK), L: m(mL), M: m(mM), F: m(mF), G: m(mG) };
  });
  const [p1, p2] = parts;
  const c1 = centroid(p1.K, p1.L, p1.M);
  const c2 = centroid(p2.K, p2.L, p2.M);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="The same obtuse triangle with two different bases">
      {/* left: base KL, height from M lands on the extension of LK */}
      <path d={poly(p1.K, p1.L, p1.M)} className="dg-line" />
      <Seg a={p1.K} b={p1.L} cls="dg-accent" />
      <Seg a={p1.F} b={p1.K} cls="dg-line dg-thin dg-dashed" />
      <Seg a={p1.M} b={p1.F} cls="dg-accent dg-dashed" />
      <path d={rightMark(p1.F, p1.M, p1.K, 7)} className="dg-line dg-thin" />
      <T at={add(lerp(p1.M, p1.F, 0.5), [-10, 0])}>h</T>
      <T at={vertexPos(p1.K, c1, 13)}>K</T>
      <T at={vertexPos(p1.L, c1, 13)}>L</T>
      <T at={vertexPos(p1.M, c1, 13)}>M</T>
      {/* right: base LM, height from K inside */}
      <path d={poly(p2.K, p2.L, p2.M)} className="dg-line" />
      <Seg a={p2.L} b={p2.M} cls="dg-accent" />
      <Seg a={p2.K} b={p2.G} cls="dg-accent dg-dashed" />
      <path d={rightMark(p2.G, p2.K, p2.L, 7)} className="dg-line dg-thin" />
      <T at={add(lerp(p2.K, p2.G, 0.5), [-9, -2])}>k</T>
      <T at={vertexPos(p2.K, c2, 13)}>K</T>
      <T at={vertexPos(p2.L, c2, 13)}>L</T>
      <T at={vertexPos(p2.M, c2, 13)}>M</T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Congruent triangles PQR and STU (STU is a mirror image)           */
/* ------------------------------------------------------------------ */

export type CongHighlight = "corr" | "sss" | "sas" | "asa" | "aas";

export function CongruentFigure({ highlight = "corr" }: { highlight?: CongHighlight }) {
  const W = 340;
  const H = 180;
  const mP: Pt = [0, 0];
  const mQ: Pt = [1.6, 3.3];
  const mR: Pt = [5, 0];
  const off = 13;
  const mirror = (p: Pt): Pt => [off - p[0], p[1]];
  const m = fitMap([mP, mQ, mR, mirror(mP), mirror(mR)], W, H, 22, 32);
  const P = m(mP);
  const Q = m(mQ);
  const R = m(mR);
  const S = m(mirror(mP));
  const Tt = m(mirror(mQ));
  const U = m(mirror(mR));
  const g1 = centroid(P, Q, R);
  const g2 = centroid(S, Tt, U);
  const h = highlight;
  const side = (on: boolean) => (on ? "dg-accent" : "dg-line");
  const showSides = { a: h !== "aas", b: h !== "asa", c: h === "sss" || h === "corr" };
  // a = PQ/ST, b = QR/TU, c = PR/SU
  const acc = {
    a: h === "sss" || h === "sas" || h === "asa",
    b: h === "sss" || h === "sas" || h === "aas",
    c: h === "sss",
  };
  const angP = h === "asa" || h === "aas";
  const angQ = h === "sas" || h === "asa" || h === "aas";
  const tri = (X: Pt, Y: Pt, Z: Pt, g: Pt, names: [string, string, string]) => (
    <>
      <path d={poly(X, Y, Z)} className="dg-line" />
      <Seg a={X} b={Y} cls={side(acc.a)} />
      <Seg a={Y} b={Z} cls={side(acc.b)} />
      <Seg a={X} b={Z} cls={side(acc.c)} />
      {showSides.a && <T at={sidePos(X, Y, g, 12)}>a</T>}
      {showSides.b && <T at={sidePos(Y, Z, g, 12)}>b</T>}
      {showSides.c && <T at={sidePos(X, Z, g, 13)}>c</T>}
      {angP && (
        <>
          <path d={angleArc(X, Y, Z, 16)} className="dg-accent" />
          <T at={angleLabelPos(X, Y, Z, 30)}>x°</T>
        </>
      )}
      {angQ && (
        <>
          <path d={angleArc(Y, X, Z, 15)} className="dg-accent" />
          <T at={angleLabelPos(Y, X, Z, 29)}>y°</T>
        </>
      )}
      {[X, Y, Z].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <T at={vertexPos(X, g, 14)}>{names[0]}</T>
      <T at={vertexPos(Y, g, 14)}>{names[1]}</T>
      <T at={vertexPos(Z, g, 14)}>{names[2]}</T>
    </>
  );
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Congruent triangles PQR and STU">
      {tri(P, Q, R, g1, ["P", "Q", "R"])}
      {tri(S, Tt, U, g2, ["S", "T", "U"])}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Similar triangles ABC and DEF (scale factor 3 : 2)               */
/* ------------------------------------------------------------------ */

export function SimilarFigure({ labels = true }: { labels?: boolean }) {
  const W = 360;
  const H = 150;
  const mA: Pt = [0, 0];
  const mC: Pt = [12, 0];
  const mB = fromSides(12, 6, 9);
  const k = 2 / 3;
  const off = 16;
  const mD: Pt = [off, 0];
  const mE: Pt = [off + mB[0] * k, mB[1] * k];
  const mF: Pt = [off + 12 * k, 0];
  const m = fitMap([mA, mB, mC, mD, mE, mF], W, H, 18, 26);
  const [A, B, C, D, E, F] = [mA, mB, mC, mD, mE, mF].map(m);
  const g1 = centroid(A, B, C);
  const g2 = centroid(D, E, F);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Similar triangles ABC and DEF">
      <path d={poly(A, B, C)} className="dg-line" />
      <path d={poly(D, E, F)} className="dg-accent" />
      {labels && (
        <>
          <T at={sidePos(A, B, g1, 12)} cls="dg-text">6</T>
          <T at={sidePos(B, C, g1, 12)} cls="dg-text">9</T>
          <T at={sidePos(A, C, g1, 13)} cls="dg-text">12</T>
          <T at={sidePos(D, E, g2, 11)} cls="dg-text">4</T>
          <T at={sidePos(E, F, g2, 11)} cls="dg-text">6</T>
          <T at={sidePos(D, F, g2, 13)} cls="dg-text">8</T>
        </>
      )}
      {[A, B, C, D, E, F].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <T at={vertexPos(A, g1, 13)}>A</T>
      <T at={vertexPos(B, g1, 13)}>B</T>
      <T at={vertexPos(C, g1, 13)}>C</T>
      <T at={vertexPos(D, g2, 13)}>D</T>
      <T at={vertexPos(E, g2, 13)}>E</T>
      <T at={vertexPos(F, g2, 13)}>F</T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 11. A segment parallel to one side cuts off a similar triangle       */
/* ------------------------------------------------------------------ */

export function NestedFigure({ variant = "lesson" }: { variant?: "lesson" | "example" }) {
  const W = 300;
  const H = 220;
  const mB: Pt = [0, 0];
  const mC: Pt = [10, 0];
  const mA: Pt = [3.6, 7];
  const t = 0.4;
  const mD = lerp(mA, mB, t);
  const mE = lerp(mA, mC, t);
  const m = fitMap([mA, mB, mC], W, H, 40, 28);
  const [A, B, C, D, E] = [mA, mB, mC, mD, mE].map(m);
  const G = centroid(A, B, C);
  const ex = variant === "example";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Triangle ABC with segment DE parallel to BC">
      {ex && <path d={poly(D, B, C, E)} className="dg-fill" />}
      <path d={poly(A, B, C)} className="dg-line" />
      <Seg a={D} b={E} cls={ex ? "dg-line" : "dg-accent"} />
      {!ex && <path d={poly(A, D, E)} className="dg-accent-fill" />}
      {ex && (
        <>
          <T at={sidePos(A, D, G, 13)} cls="dg-text">4</T>
          <T at={sidePos(D, B, G, 13)} cls="dg-text">6</T>
        </>
      )}
      {[A, B, C, D, E].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <T at={vertexPos(A, G, 14)}>A</T>
      <T at={vertexPos(B, G, 14)}>B</T>
      <T at={vertexPos(C, G, 14)}>C</T>
      <T at={add(D, [-13, -4])}>D</T>
      <T at={add(E, [13, -4])}>E</T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 12. Question figure: obtuse triangle PQR with angle Q = 120°         */
/* ------------------------------------------------------------------ */

export function ObtuseQuestionFigure() {
  const W = 300;
  const H = 170;
  const mQ: Pt = [0, 0];
  const mP: Pt = [8, 0];
  const mR: Pt = [5 * Math.cos(rad(120)), 5 * Math.sin(rad(120))];
  const m = fitMap([mQ, mP, mR], W, H, 34, 28);
  const [Q, P, R] = [mQ, mP, mR].map(m);
  const G = centroid(P, Q, R);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Triangle PQR with angle Q of 120 degrees">
      <path d={poly(P, Q, R)} className="dg-line" />
      <path d={angleArc(Q, P, R, 15)} className="dg-line dg-thin" />
      <T at={angleLabelPos(Q, P, R, 32)} cls="dg-text">120°</T>
      <T at={sidePos(Q, P, G, 14)} cls="dg-text">8</T>
      <T at={sidePos(Q, R, G, 12)} cls="dg-text">5</T>
      {[P, Q, R].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <T at={vertexPos(P, G, 14)}>P</T>
      <T at={add(Q, [2, 15])}>Q</T>
      <T at={vertexPos(R, G, 14)}>R</T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 13. Question figure: triangle split by a height into 30-60-90 and 45-45-90 */
/* ------------------------------------------------------------------ */

export function TwoSpecialFigure() {
  const W = 320;
  const H = 170;
  const s3 = Math.sqrt(3);
  const mB: Pt = [0, 0];
  const mD: Pt = [6 * s3, 0];
  const mA: Pt = [6 * s3, 6];
  const mC: Pt = [6 * s3 + 6, 0];
  const m = fitMap([mA, mB, mC], W, H, 30, 28);
  const [A, B, C, D] = [mA, mB, mC, mD].map(m);
  const G = centroid(A, B, C);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Triangle ABC with height AD">
      <path d={poly(A, B, C)} className="dg-line" />
      <Seg a={A} b={D} cls="dg-line dg-dashed" />
      <path d={rightMark(D, A, C, 9)} className="dg-line dg-thin" />
      <path d={angleArc(B, A, C, 28)} className="dg-line dg-thin" />
      <path d={angleArc(C, A, B, 18)} className="dg-line dg-thin" />
      <T at={angleLabelPos(B, A, C, 46)} cls="dg-text">30°</T>
      <T at={angleLabelPos(C, A, B, 36)} cls="dg-text">45°</T>
      <T at={add(lerp(A, D, 0.5), [-10, 0])} cls="dg-text">6</T>
      {[A, B, C, D].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <T at={vertexPos(A, G, 14)}>A</T>
      <T at={vertexPos(B, G, 14)}>B</T>
      <T at={vertexPos(C, G, 14)}>C</T>
      <T at={add(D, [0, 15])}>D</T>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 14. Question figure: right triangle with a perpendicular segment DE  */
/* ------------------------------------------------------------------ */

export function RightNestedFigure() {
  const W = 300;
  const H = 210;
  const mA: Pt = [0, 0];
  const mC: Pt = [12, 0];
  const mB: Pt = [12, 9];
  const mD: Pt = [8, 0];
  const mE: Pt = [8, 6];
  const m = fitMap([mA, mB, mC], W, H, 36, 26);
  const [A, B, C, D, E] = [mA, mB, mC, mD, mE].map(m);
  const G = centroid(A, B, C);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label="Right triangle ABC with segment DE perpendicular to AC">
      <path d={poly(A, B, C)} className="dg-line" />
      <Seg a={D} b={E} />
      <path d={rightMark(C, B, A, 10)} className="dg-line dg-thin" />
      <path d={rightMark(D, E, A, 10)} className="dg-line dg-thin" />
      <T at={sidePos(C, B, G, 12)} cls="dg-text">9</T>
      <T at={add(lerp(D, E, 0.5), [-10, 0])} cls="dg-text">6</T>
      {[A, B, C, D, E].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <T at={vertexPos(A, G, 14)}>A</T>
      <T at={vertexPos(B, G, 14)}>B</T>
      <T at={add(C, [10, 12])}>C</T>
      <T at={add(D, [0, 15])}>D</T>
      <T at={add(E, [-6, -14])}>E</T>
    </svg>
  );
}

export const registry = {
  "3-3-triangles/angles": AnglesFigure,
  "3-3-triangles/inequality": InequalityFigure,
  "3-3-triangles/types": TypesFigure,
  "3-3-triangles/right": RightFigure,
  "3-3-triangles/iso-right": IsoRightFigure,
  "3-3-triangles/thirty-sixty": ThirtySixtyFigure,
  "3-3-triangles/base-height": BaseHeightFigure,
  "3-3-triangles/any-base": AnyBaseFigure,
  "3-3-triangles/congruent": CongruentFigure,
  "3-3-triangles/similar": SimilarFigure,
  "3-3-triangles/nested": NestedFigure,
  "3-3-triangles/obtuse-question": ObtuseQuestionFigure,
  "3-3-triangles/two-special": TwoSpecialFigure,
  "3-3-triangles/right-nested": RightNestedFigure,
};
