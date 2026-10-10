// Original diagrams for section 3.4 Quadrilaterals.
// SVG coordinates (y grows downward). Vertex labels are pushed away from the polygon's centroid.

type Pt = [number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;

function Label({ at, children, cls = "dg-label" }: { at: Pt; children: string; cls?: string }) {
  return (
    <text x={r2(at[0])} y={r2(at[1])} className={cls} textAnchor="middle" dominantBaseline="central">
      {children}
    </text>
  );
}

function Dot({ at, r = 2.6 }: { at: Pt; r?: number }) {
  return <circle cx={at[0]} cy={at[1]} r={r} className="dg-point" />;
}

function centroid(pts: Pt[]): Pt {
  const n = pts.length;
  return [pts.reduce((s, p) => s + p[0], 0) / n, pts.reduce((s, p) => s + p[1], 0) / n];
}

/** Position for a vertex label: `off` units from v, directly away from point c. */
function away(v: Pt, c: Pt, off = 13): Pt {
  const dx = v[0] - c[0];
  const dy = v[1] - c[1];
  const L = Math.hypot(dx, dy) || 1;
  return [v[0] + (off * dx) / L, v[1] + (off * dy) / L];
}

/** Midpoint of pq pushed `off` units perpendicular to pq, on the side away from c. */
function sideLabel(p: Pt, q: Pt, c: Pt, off = 12): Pt {
  const mx = (p[0] + q[0]) / 2;
  const my = (p[1] + q[1]) / 2;
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const L = Math.hypot(dx, dy);
  let nx = -dy / L;
  let ny = dx / L;
  if (nx * (mx - c[0]) + ny * (my - c[1]) < 0) {
    nx = -nx;
    ny = -ny;
  }
  return [mx + off * nx, my + off * ny];
}

/** Point inside the angle at v (between rays to a and b), at distance d along the bisector. */
function inAngle(v: Pt, a: Pt, b: Pt, d = 22): Pt {
  const u = (p: Pt): Pt => {
    const L = Math.hypot(p[0] - v[0], p[1] - v[1]);
    return [(p[0] - v[0]) / L, (p[1] - v[1]) / L];
  };
  const ua = u(a);
  const ub = u(b);
  const bx = ua[0] + ub[0];
  const by = ua[1] + ub[1];
  const L = Math.hypot(bx, by) || 1;
  return [v[0] + (d * bx) / L, v[1] + (d * by) / L];
}

/** Small right-angle square at v with sides toward a and b. */
function rightMark(v: Pt, a: Pt, b: Pt, s = 8): string {
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

/** Small angle arc at v from ray toward a to ray toward b (the smaller angle). */
function angleArc(v: Pt, a: Pt, b: Pt, rr = 14): string {
  const ang = (p: Pt) => Math.atan2(p[1] - v[1], p[0] - v[0]);
  const t1 = ang(a);
  const t2 = ang(b);
  const s: Pt = [v[0] + rr * Math.cos(t1), v[1] + rr * Math.sin(t1)];
  const e: Pt = [v[0] + rr * Math.cos(t2), v[1] + rr * Math.sin(t2)];
  let d = t2 - t1;
  while (d <= -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  const sweep = d > 0 ? 1 : 0;
  return `M ${r2(s[0])} ${r2(s[1])} A ${rr} ${rr} 0 0 ${sweep} ${r2(e[0])} ${r2(e[1])}`;
}

const poly = (pts: Pt[]) => pts.map((p) => `${r2(p[0])},${r2(p[1])}`).join(" ");

function Seg({ p, q, cls = "dg-line" }: { p: Pt; q: Pt; cls?: string }) {
  return <line x1={r2(p[0])} y1={r2(p[1])} x2={r2(q[0])} y2={r2(q[1])} className={cls} />;
}

/* ------------------------------------------------------------------ */
/* 1. General quadrilateral with a diagonal                             */
/* ------------------------------------------------------------------ */

export function Quadrilateral({ highlight = "diagonal" }: { highlight?: "outline" | "diagonal" }) {
  const P: Pt = [40, 150];
  const Q: Pt = [75, 45];
  const R: Pt = [215, 30];
  const S: Pt = [245, 160];
  const pts = [P, Q, R, S];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 280 190" width={280} role="img" aria-label="Quadrilateral PQRS">
      {highlight === "diagonal" && <polygon points={poly([P, Q, R])} className="dg-fill" />}
      <polygon points={poly(pts)} className={highlight === "outline" ? "dg-accent" : "dg-line"} />
      {highlight === "diagonal" && <Seg p={P} q={R} cls="dg-accent" />}
      {pts.map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      {(["P", "Q", "R", "S"] as const).map((n, i) => (
        <Label key={n} at={away(pts[i], c, 14)}>
          {n}
        </Label>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Rectangle ABCD with dashed diagonals                              */
/* ------------------------------------------------------------------ */

export function Rectangle({ highlight = "all" }: { highlight?: "all" | "rectangle" }) {
  const A: Pt = [40, 150];
  const B: Pt = [240, 150];
  const C: Pt = [240, 40];
  const D: Pt = [40, 40];
  const pts = [A, B, C, D];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 280 190" width={280} role="img" aria-label="Rectangle ABCD with its diagonals">
      <polygon points={poly(pts)} className={highlight === "rectangle" ? "dg-accent" : "dg-line"} />
      {pts.map((v, i) => (
        <path key={i} d={rightMark(v, pts[(i + 1) % 4], pts[(i + 3) % 4])} className="dg-line dg-thin" />
      ))}
      {highlight === "all" && (
        <>
          <Seg p={A} q={C} cls="dg-line dg-thin dg-dashed" />
          <Seg p={B} q={D} cls="dg-line dg-thin dg-dashed" />
        </>
      )}
      {(["A", "B", "C", "D"] as const).map((n, i) => (
        <Label key={n} at={away(pts[i], c, 14)}>
          {n}
        </Label>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Square with side s and diagonal s√2                               */
/* ------------------------------------------------------------------ */

export function Square() {
  const A: Pt = [70, 160];
  const B: Pt = [200, 160];
  const C: Pt = [200, 30];
  const D: Pt = [70, 30];
  const pts = [A, B, C, D];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 270 195" width={270} role="img" aria-label="Square with side s and diagonal s root 2">
      <polygon points={poly(pts)} className="dg-accent" />
      {pts.map((v, i) => (
        <path key={i} d={rightMark(v, pts[(i + 1) % 4], pts[(i + 3) % 4])} className="dg-line dg-thin" />
      ))}
      <Seg p={A} q={C} cls="dg-line dg-dashed" />
      <Label at={sideLabel(A, B, c, 14)}>s</Label>
      <Label at={sideLabel(B, C, c, 12)}>s</Label>
      <text x={150} y={108} className="dg-text" textAnchor="middle" dominantBaseline="central">
        s√2
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Parallelogram ABCD with angle labels                              */
/* ------------------------------------------------------------------ */

export function Parallelogram({
  highlight = "all",
}: {
  highlight?: "all" | "parallelogram" | "opposite-sides" | "opposite-angles";
}) {
  const A: Pt = [30, 150];
  const B: Pt = [200, 150];
  const C: Pt = [255, 45];
  const D: Pt = [85, 45];
  const pts = [A, B, C, D];
  const c = centroid(pts);
  const sidesAccent = highlight === "opposite-sides";
  const anglesAccent = highlight === "opposite-angles";
  const showAngles = highlight === "all" || anglesAccent;
  return (
    <svg viewBox="0 0 285 190" width={285} role="img" aria-label="Parallelogram ABCD">
      <polygon points={poly(pts)} className={highlight === "parallelogram" ? "dg-accent" : "dg-line"} />
      {sidesAccent && (
        <>
          <Seg p={A} q={B} cls="dg-accent" />
          <Seg p={D} q={C} cls="dg-accent" />
        </>
      )}
      {showAngles && (
        <>
          <path d={angleArc(A, B, D, 16)} className={anglesAccent ? "dg-accent" : "dg-line dg-thin"} />
          <path d={angleArc(C, D, B, 16)} className={anglesAccent ? "dg-accent" : "dg-line dg-thin"} />
          <Label at={inAngle(A, B, D, 32)} cls="dg-label">x°</Label>
          <Label at={inAngle(C, D, B, 32)} cls="dg-label">x°</Label>
          {!anglesAccent && (
            <>
              <Label at={inAngle(B, A, C, 22)} cls="dg-label">y°</Label>
              <Label at={inAngle(D, C, A, 22)} cls="dg-label">y°</Label>
            </>
          )}
        </>
      )}
      {(["A", "B", "C", "D"] as const).map((n, i) => (
        <Label key={n} at={away(pts[i], c, 14)}>
          {n}
        </Label>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Trapezoid KLMN                                                    */
/* ------------------------------------------------------------------ */

export function Trapezoid({ highlight = "bases" }: { highlight?: "bases" | "trapezoid" }) {
  const K: Pt = [30, 150];
  const L: Pt = [90, 45];
  const M: Pt = [175, 45];
  const N: Pt = [255, 150];
  const pts = [K, L, M, N];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 285 190" width={285} role="img" aria-label="Trapezoid KLMN with bases LM and KN">
      <polygon points={poly(pts)} className={highlight === "trapezoid" ? "dg-accent" : "dg-line"} />
      {highlight === "bases" && (
        <>
          <Seg p={L} q={M} cls="dg-accent" />
          <Seg p={K} q={N} cls="dg-accent" />
        </>
      )}
      {(["K", "L", "M", "N"] as const).map((n, i) => (
        <Label key={n} at={away(pts[i], c, 14)}>
          {n}
        </Label>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Parallelogram area: height inside / height on the extension       */
/* ------------------------------------------------------------------ */

function ParaWithHeight({ ox, lean, accent }: { ox: number; lean: number; accent?: "base" | "height" }) {
  // base from (ox, 140) to (ox + 110, 140); top side shifted by `lean`; height 80
  const A: Pt = [ox, 140];
  const B: Pt = [ox + 110, 140];
  const C: Pt = [ox + 110 + lean, 60];
  const D: Pt = [ox + lean, 60];
  const pts = [A, B, C, D];
  // height drawn from a point on the top side: inside if lean < 110, else from D down to the extension
  const inside = lean < 110;
  const footX = inside ? ox + Math.max(lean, 0) + 30 : D[0];
  const top: Pt = [footX, 60];
  const foot: Pt = [footX, 140];
  return (
    <g>
      <polygon points={poly(pts)} className="dg-line" />
      {!inside && <Seg p={B} q={[foot[0] + 8, 140]} cls="dg-line dg-thin dg-dashed" />}
      <Seg p={top} q={foot} cls={accent === "height" ? "dg-accent" : "dg-line dg-dashed"} />
      <path d={rightMark(foot, top, inside ? B : A, 7)} className="dg-line dg-thin" />
      {accent === "base" && <Seg p={A} q={B} cls="dg-accent" />}
      <Label at={[ox + 55, 156]}>b</Label>
      <Label at={[footX + 10, 100]}>h</Label>
    </g>
  );
}

export function ParallelogramArea({
  only,
  highlight,
}: {
  only?: "inside" | "outside";
  highlight?: "base" | "height";
}) {
  if (only === "inside")
    return (
      <svg viewBox="0 0 200 175" width={200} role="img" aria-label="Parallelogram with base b and height h">
        <ParaWithHeight ox={20} lean={45} accent={highlight} />
      </svg>
    );
  if (only === "outside")
    return (
      <svg viewBox="0 0 330 175" width={330} role="img" aria-label="Parallelogram with height on the extension of the base">
        <ParaWithHeight ox={20} lean={150} accent={highlight} />
      </svg>
    );
  return (
    <svg viewBox="0 0 430 175" width={360} role="img" aria-label="Two parallelograms with base b and height h">
      <ParaWithHeight ox={10} lean={40} />
      <ParaWithHeight ox={168} lean={150 - 135 + 120} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Trapezoid area: b1, b2, h                                          */
/* ------------------------------------------------------------------ */

export function TrapezoidArea() {
  const A: Pt = [30, 145];
  const B: Pt = [80, 50];
  const C: Pt = [180, 50];
  const D: Pt = [250, 145];
  const top: Pt = [150, 50];
  const foot: Pt = [150, 145];
  return (
    <svg viewBox="0 0 280 180" width={280} role="img" aria-label="Trapezoid with bases b1 and b2 and height h">
      <polygon points={poly([A, B, C, D])} className="dg-line" />
      <Seg p={top} q={foot} cls="dg-line dg-dashed" />
      <path d={rightMark(foot, top, D, 7)} className="dg-line dg-thin" />
      <path d={rightMark(top, foot, C, 7)} className="dg-line dg-thin" />
      <text x={130} y={36} className="dg-label" textAnchor="middle" dominantBaseline="central">
        b<tspan baselineShift="sub" fontSize="10">1</tspan>
      </text>
      <text x={140} y={162} className="dg-label" textAnchor="middle" dominantBaseline="central">
        b<tspan baselineShift="sub" fontSize="10">2</tspan>
      </text>
      <Label at={[161, 98]}>h</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Rhombus (vocabulary only)                                          */
/* ------------------------------------------------------------------ */

export function Rhombus() {
  // side 100, angle 60 deg at A
  const A: Pt = [40, 140];
  const B: Pt = [140, 140];
  const C: Pt = [190, 140 - 86.6];
  const D: Pt = [90, 140 - 86.6];
  const pts = [A, B, C, D];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 230 170" width={230} role="img" aria-label="Rhombus with four sides of length s">
      <polygon points={poly(pts)} className="dg-accent" />
      <Label at={sideLabel(A, B, c, 12)}>s</Label>
      <Label at={sideLabel(B, C, c, 12)}>s</Label>
      <Label at={sideLabel(C, D, c, 12)}>s</Label>
      <Label at={sideLabel(D, A, c, 12)}>s</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Example 3: trapezoid with bases 7, 21 and sides 13, 15            */
/* ------------------------------------------------------------------ */

export function TrapezoidLegs() {
  const u = 12; // pixels per unit, drawn to scale
  const ox = 30;
  const oy = 175;
  const P = (x: number, y: number): Pt => [ox + u * x, oy - u * y];
  const A = P(0, 0);
  const B = P(5, 12);
  const C = P(12, 12);
  const D = P(21, 0);
  const pts = [A, B, C, D];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 315 205" width={315} role="img" aria-label="Trapezoid ABCD with BC = 7, AD = 21, AB = 13, CD = 15">
      <polygon points={poly(pts)} className="dg-line" />
      {(["A", "B", "C", "D"] as const).map((n, i) => (
        <Label key={n} at={away(pts[i], c, 14)}>
          {n}
        </Label>
      ))}
      <Label at={sideLabel(B, C, c, 11)} cls="dg-text">7</Label>
      <Label at={sideLabel(A, D, c, 12)} cls="dg-text">21</Label>
      <Label at={sideLabel(A, B, c, 13)} cls="dg-text">13</Label>
      <Label at={sideLabel(C, D, c, 13)} cls="dg-text">15</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Quiz z3: trapezoid KLMN with diagonals LN and KM                  */
/* ------------------------------------------------------------------ */

export function TrapezoidDiagonals() {
  const K: Pt = [30, 150];
  const L: Pt = [55, 50];
  const M: Pt = [150, 50];
  const N: Pt = [260, 150];
  const pts = [K, L, M, N];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 290 185" width={290} role="img" aria-label="Quadrilateral KLMN with LM parallel to KN and segments LN and KM">
      <polygon points={poly(pts)} className="dg-line" />
      <Seg p={L} q={N} cls="dg-line" />
      <Seg p={K} q={M} cls="dg-line" />
      {(["K", "L", "M", "N"] as const).map((n, i) => (
        <Label key={n} at={away(pts[i], c, 14)}>
          {n}
        </Label>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 11. Quiz z5: parallelogram with 135° at B                              */
/* ------------------------------------------------------------------ */

export function Parallelogram135() {
  const u = 13;
  const ox = 25;
  const oy = 140;
  const P = (x: number, y: number): Pt => [ox + u * x, oy - u * y];
  const A = P(0, 0);
  const B = P(12, 0);
  const C = P(18, 6);
  const D = P(6, 6);
  const pts = [A, B, C, D];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 280 170" width={280} role="img" aria-label="Parallelogram ABCD with AB = 12, BC = 6 root 2, angle ABC = 135 degrees">
      <polygon points={poly(pts)} className="dg-line" />
      <path d={angleArc(B, A, C, 13)} className="dg-line dg-thin" />
      <Label at={inAngle(B, A, C, 30)} cls="dg-text">135°</Label>
      {(["A", "B", "C", "D"] as const).map((n, i) => (
        <Label key={n} at={away(pts[i], c, 14)}>
          {n}
        </Label>
      ))}
      <Label at={sideLabel(A, B, c, 13)} cls="dg-text">12</Label>
      <Label at={sideLabel(B, C, c, 20)} cls="dg-text">6√2</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 12. Quiz z6: right trapezoid                                          */
/* ------------------------------------------------------------------ */

export function RightTrapezoid() {
  const u = 14;
  const ox = 30;
  const oy = 150;
  const P = (x: number, y: number): Pt => [ox + u * x, oy - u * y];
  const A = P(0, 0);
  const B = P(16, 0);
  const C = P(10, 8);
  const D = P(0, 8);
  const pts = [A, B, C, D];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 290 180" width={290} role="img" aria-label="Quadrilateral ABCD with right angles at A and D, AB = 16, DC = 10">
      <polygon points={poly(pts)} className="dg-line" />
      <path d={rightMark(A, B, D)} className="dg-line dg-thin" />
      <path d={rightMark(D, A, C)} className="dg-line dg-thin" />
      {(["A", "B", "C", "D"] as const).map((n, i) => (
        <Label key={n} at={away(pts[i], c, 14)}>
          {n}
        </Label>
      ))}
      <Label at={sideLabel(A, B, c, 13)} cls="dg-text">16</Label>
      <Label at={sideLabel(D, C, c, 12)} cls="dg-text">10</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 13. Quiz z9: square with midpoints, shaded AEFC                       */
/* ------------------------------------------------------------------ */

export function SquareMidpoints() {
  const A: Pt = [40, 180];
  const B: Pt = [200, 180];
  const C: Pt = [200, 20];
  const D: Pt = [40, 20];
  const E: Pt = [120, 180];
  const F: Pt = [200, 100];
  const pts = [A, B, C, D];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 240 205" width={240} role="img" aria-label="Square ABCD with midpoints E of AB and F of BC; quadrilateral AEFC shaded">
      <polygon points={poly([A, E, F, C])} className="dg-fill" />
      <polygon points={poly(pts)} className="dg-line" />
      <Seg p={A} q={C} />
      <Seg p={E} q={F} />
      {pts.map((v, i) => (
        <path key={i} d={rightMark(v, pts[(i + 1) % 4], pts[(i + 3) % 4])} className="dg-line dg-thin" />
      ))}
      <Dot at={E} />
      <Dot at={F} />
      {(["A", "B", "C", "D"] as const).map((n, i) => (
        <Label key={n} at={away(pts[i], c, 14)}>
          {n}
        </Label>
      ))}
      <Label at={[E[0], E[1] + 14]}>E</Label>
      <Label at={[F[0] + 13, F[1]]}>F</Label>
    </svg>
  );
}

export const registry = {
  "3-4-quadrilaterals/quadrilateral": Quadrilateral,
  "3-4-quadrilaterals/rectangle": Rectangle,
  "3-4-quadrilaterals/square": Square,
  "3-4-quadrilaterals/parallelogram": Parallelogram,
  "3-4-quadrilaterals/trapezoid": Trapezoid,
  "3-4-quadrilaterals/parallelogram-area": ParallelogramArea,
  "3-4-quadrilaterals/trapezoid-area": TrapezoidArea,
  "3-4-quadrilaterals/rhombus": Rhombus,
  "3-4-quadrilaterals/trapezoid-legs": TrapezoidLegs,
  "3-4-quadrilaterals/trapezoid-diagonals": TrapezoidDiagonals,
  "3-4-quadrilaterals/parallelogram-135": Parallelogram135,
  "3-4-quadrilaterals/right-trapezoid": RightTrapezoid,
  "3-4-quadrilaterals/square-midpoints": SquareMidpoints,
};
