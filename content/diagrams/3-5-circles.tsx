// Original diagrams for section 3.5 Circles.
// Angles are in degrees, measured counterclockwise from the positive x-direction
// (SVG y grows downward, so y = cy - r sin(angle)). All points on circles are computed.

type Pt = [number, number];

const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Point on circle (cx, cy, r) at angle deg. */
function onC(cx: number, cy: number, r: number, deg: number): Pt {
  return [r2(cx + r * Math.cos(rad(deg))), r2(cy - r * Math.sin(rad(deg)))];
}

/** SVG arc path along the circle, counterclockwise (visually) from a1 to a2 (a2 > a1). */
function arcD(cx: number, cy: number, r: number, a1: number, a2: number): string {
  const [sx, sy] = onC(cx, cy, r, a1);
  const [ex, ey] = onC(cx, cy, r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 0 ${ex} ${ey}`;
}

/** Closed sector path (center, arc a1 -> a2 counterclockwise). */
function sectorD(cx: number, cy: number, r: number, a1: number, a2: number): string {
  return `M ${cx} ${cy} L ${arcD(cx, cy, r, a1, a2).slice(2)} Z`;
}

/** Ring between two concentric circles (even-odd fill). */
function ringD(cx: number, cy: number, R: number, r: number): string {
  const c = (q: number) =>
    `M ${cx + q} ${cy} A ${q} ${q} 0 1 0 ${cx - q} ${cy} A ${q} ${q} 0 1 0 ${cx + q} ${cy} Z`;
  return `${c(R)} ${c(r)}`;
}

/** Small right-angle square at vertex v, sides toward points a and b. */
function rightMark(v: Pt, a: Pt, b: Pt, s = 9): string {
  const u = (p: Pt): Pt => {
    const dx = p[0] - v[0];
    const dy = p[1] - v[1];
    const L = Math.hypot(dx, dy);
    return [dx / L, dy / L];
  };
  const ua = u(a);
  const ub = u(b);
  const p1: Pt = [v[0] + s * ua[0], v[1] + s * ua[1]];
  const p2: Pt = [p1[0] + s * ub[0], p1[1] + s * ub[1]];
  const p3: Pt = [v[0] + s * ub[0], v[1] + s * ub[1]];
  return `M ${r2(p1[0])} ${r2(p1[1])} L ${r2(p2[0])} ${r2(p2[1])} L ${r2(p3[0])} ${r2(p3[1])}`;
}

/** Small angle arc at vertex v between directions (in degrees) d1 -> d2 counterclockwise. */
function angleArc(v: Pt, rr: number, d1: number, d2: number): string {
  return arcD(v[0], v[1], rr, d1, d2);
}

/** Direction (degrees, math convention) from p to q. */
function dirDeg(p: Pt, q: Pt): number {
  return (Math.atan2(-(q[1] - p[1]), q[0] - p[0]) * 180) / Math.PI;
}

function Label({ at, children, cls = "dg-label" }: { at: Pt; children: string; cls?: string }) {
  return (
    <text x={at[0]} y={at[1]} className={cls} textAnchor="middle" dominantBaseline="central">
      {children}
    </text>
  );
}

function Dot({ at, r = 3 }: { at: Pt; r?: number }) {
  return <circle cx={at[0]} cy={at[1]} r={r} className="dg-point" />;
}

/** Label placed radially outside a point on a circle. */
function OutLabel({ cx, cy, r, deg, text, off = 14 }: { cx: number; cy: number; r: number; deg: number; text: string; off?: number }) {
  return <Label at={onC(cx, cy, r + off, deg)}>{text}</Label>;
}

/** Point midway along segment pq, pushed `off` units perpendicular (toward the side given by sign). */
function sideLabelPos(p: Pt, q: Pt, off: number): Pt {
  const mx = (p[0] + q[0]) / 2;
  const my = (p[1] + q[1]) / 2;
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const L = Math.hypot(dx, dy);
  // perpendicular (rotate +90 in screen coords)
  return [r2(mx + (off * -dy) / L), r2(my + (off * dx) / L)];
}

/* ------------------------------------------------------------------ */
/* 1. Parts of a circle                                                 */
/* ------------------------------------------------------------------ */

export type CirclePart =
  | "all"
  | "circle"
  | "center"
  | "radius"
  | "diameter"
  | "chord"
  | "circumference"
  | "area"
  | "pi";

export function CircleParts({ highlight = "all" }: { highlight?: CirclePart }) {
  const cx = 130;
  const cy = 110;
  const R = 80;
  const O: Pt = [cx, cy];
  const show = (p: CirclePart) => highlight === "all" || highlight === p;
  const circleAccent = highlight === "circle" || highlight === "circumference" || highlight === "pi";
  const Sdeg = 145;
  const Tdeg = -35;
  const Pdeg = 168;
  const Qdeg = 250;
  const S = onC(cx, cy, R, Sdeg);
  const T = onC(cx, cy, R, Tdeg);
  const P = onC(cx, cy, R, Pdeg);
  const Q = onC(cx, cy, R, Qdeg);
  const E = onC(cx, cy, R, 0);
  const diaAccent = highlight === "diameter" || highlight === "pi";
  return (
    <svg viewBox="0 0 260 220" width={260} role="img" aria-label="Circle with center O">
      {highlight === "area" && <circle cx={cx} cy={cy} r={R} className="dg-accent-fill" />}
      <circle cx={cx} cy={cy} r={R} className={circleAccent ? "dg-accent" : "dg-line"} />
      {show("radius") && (
        <>
          <line x1={cx} y1={cy} x2={E[0]} y2={E[1]} className={highlight === "radius" ? "dg-accent" : "dg-line"} />
          <Label at={[cx + R / 2, cy - 11]}>r</Label>
        </>
      )}
      {(show("diameter") || highlight === "pi") && (
        <>
          <line x1={S[0]} y1={S[1]} x2={T[0]} y2={T[1]} className={diaAccent ? "dg-accent" : "dg-line"} />
          {highlight === "pi" ? (
            <>
              <Label at={sideLabelPos(S, O, -12)}>d</Label>
              <OutLabel cx={cx} cy={cy} r={R} deg={60} text="C" off={14} />
            </>
          ) : (
            <>
              <Dot at={S} />
              <Dot at={T} />
              <OutLabel cx={cx} cy={cy} r={R} deg={Sdeg} text="S" />
              <OutLabel cx={cx} cy={cy} r={R} deg={Tdeg} text="T" />
            </>
          )}
        </>
      )}
      {show("chord") && (
        <>
          <line x1={P[0]} y1={P[1]} x2={Q[0]} y2={Q[1]} className={highlight === "chord" ? "dg-accent" : "dg-line"} />
          <Dot at={P} />
          <Dot at={Q} />
          <OutLabel cx={cx} cy={cy} r={R} deg={Pdeg} text="P" />
          <OutLabel cx={cx} cy={cy} r={R} deg={Qdeg} text="Q" />
        </>
      )}
      {highlight === "circumference" && <OutLabel cx={cx} cy={cy} r={R} deg={45} text="C" off={14} />}
      {highlight === "center" && <circle cx={cx} cy={cy} r={7} className="dg-accent" />}
      <Dot at={O} />
      <Label at={[cx - 6, cy + 16]}>O</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Congruent circles                                                 */
/* ------------------------------------------------------------------ */

export function CongruentCircles() {
  const R = 55;
  const c1: Pt = [80, 85];
  const c2: Pt = [220, 85];
  const e1 = onC(c1[0], c1[1], R, 0);
  const e2 = onC(c2[0], c2[1], R, 0);
  return (
    <svg viewBox="0 0 300 170" width={300} role="img" aria-label="Two congruent circles">
      <circle cx={c1[0]} cy={c1[1]} r={R} className="dg-line" />
      <circle cx={c2[0]} cy={c2[1]} r={R} className="dg-line" />
      <line x1={c1[0]} y1={c1[1]} x2={e1[0]} y2={e1[1]} className="dg-accent" />
      <line x1={c2[0]} y1={c2[1]} x2={e2[0]} y2={e2[1]} className="dg-accent" />
      <Dot at={c1} />
      <Dot at={c2} />
      <Label at={[c1[0] - 4, c1[1] + 15]}>O</Label>
      <Label at={[c2[0] - 4, c2[1] + 15]}>P</Label>
      <Label at={[c1[0] + R / 2, c1[1] - 11]}>r</Label>
      <Label at={[c2[0] + R / 2, c2[1] - 11]}>r</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Arcs, central angle, sector                                       */
/* ------------------------------------------------------------------ */

export type ArcHighlight =
  | "lesson"
  | "arc"
  | "minor-major"
  | "central-angle"
  | "arc-measure"
  | "arc-length"
  | "sector";

export function ArcFigure({ highlight = "lesson" }: { highlight?: ArcHighlight }) {
  const cx = 130;
  const cy = 112;
  const R = 80;
  const O: Pt = [cx, cy];
  const aA = 150;
  const aB = 115;
  const aC = 80;
  const aD = 300;
  const A = onC(cx, cy, R, aA);
  const B = onC(cx, cy, R, aB);
  const C = onC(cx, cy, R, aC);
  const D = onC(cx, cy, R, aD);
  const radii = highlight !== "arc" && highlight !== "minor-major";
  const radiiCls = highlight === "central-angle" ? "dg-accent" : "dg-line";
  const showAngle = highlight === "lesson" || highlight === "central-angle" || highlight === "arc-measure" || highlight === "sector";
  const shortArcAccent = highlight !== "central-angle" && highlight !== "sector";
  return (
    <svg viewBox="0 0 260 225" width={260} role="img" aria-label="Arc ABC and central angle">
      {highlight === "sector" && <path d={sectorD(cx, cy, R, aC, aA)} className="dg-accent-fill" />}
      {highlight === "minor-major" ? (
        <>
          <path d={arcD(cx, cy, R, aA, aC + 360)} className="dg-line dg-dashed" />
          <Label at={onC(cx, cy, R - 24, aB)} cls="dg-text">minor</Label>
          <Label at={onC(cx, cy, R - 26, 250)} cls="dg-text">major</Label>
        </>
      ) : (
        <circle cx={cx} cy={cy} r={R} className="dg-line" />
      )}
      {shortArcAccent && <path d={arcD(cx, cy, R, aC, aA)} className="dg-accent" />}
      {radii && (
        <>
          <line x1={cx} y1={cy} x2={A[0]} y2={A[1]} className={radiiCls} />
          <line x1={cx} y1={cy} x2={C[0]} y2={C[1]} className={radiiCls} />
        </>
      )}
      {showAngle && (
        <>
          <path d={angleArc(O, 14, aC, aA)} className="dg-line dg-thin" />
          <Label at={onC(cx, cy, 32, (aA + aC) / 2)} cls="dg-text">70°</Label>
        </>
      )}
      {highlight === "arc-length" && <Label at={sideLabelPos(O, A, 10)}>r</Label>}
      {[A, B, C, D].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <OutLabel cx={cx} cy={cy} r={R} deg={aA} text="A" />
      <OutLabel cx={cx} cy={cy} r={R} deg={aB} text="B" />
      <OutLabel cx={cx} cy={cy} r={R} deg={aC} text="C" />
      <OutLabel cx={cx} cy={cy} r={R} deg={aD} text="D" />
      <Dot at={O} />
      <Label at={[cx + 4, cy + 16]}>O</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Tangent                                                           */
/* ------------------------------------------------------------------ */

export function TangentFigure({ highlight = "all" }: { highlight?: "all" | "tangent" | "point" }) {
  const cx = 150;
  const cy = 82;
  const R = 60;
  const P: Pt = [cx, cy + R];
  return (
    <svg viewBox="0 0 300 180" width={300} role="img" aria-label="Line tangent to a circle at P">
      <circle cx={cx} cy={cy} r={R} className="dg-line" />
      <line x1={30} y1={P[1]} x2={270} y2={P[1]} className={highlight === "tangent" ? "dg-accent" : "dg-line"} />
      <line x1={cx} y1={cy} x2={P[0]} y2={P[1]} className="dg-line" />
      <path d={rightMark(P, [cx, cy], [270, P[1]])} className="dg-line dg-thin" />
      {highlight === "point" && <circle cx={P[0]} cy={P[1]} r={7} className="dg-accent" />}
      <Dot at={P} />
      <Dot at={[cx, cy]} />
      <Label at={[cx - 13, cy]}>O</Label>
      <Label at={[cx, P[1] + 16]}>P</Label>
      <Label at={[262, P[1] - 12]} cls="dg-text">tangent</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Polygon inscribed in a circle / circle circumscribed about it     */
/* ------------------------------------------------------------------ */

export function InscribedPolygon({ highlight = "polygon" }: { highlight?: "polygon" | "circle" | "none" }) {
  const cx = 120;
  const cy = 108;
  const R = 82;
  const angs = [110, 200, 262, 345];
  const names = ["A", "B", "C", "D"];
  const pts = angs.map((a) => onC(cx, cy, R, a));
  const d = `M ${pts.map((p) => p.join(" ")).join(" L ")} Z`;
  return (
    <svg viewBox="0 0 240 220" width={240} role="img" aria-label="Quadrilateral ABCD inscribed in a circle">
      <circle cx={cx} cy={cy} r={R} className={highlight === "circle" ? "dg-accent" : "dg-line"} />
      <path d={d} className={highlight === "polygon" ? "dg-accent" : "dg-line"} />
      {pts.map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      {angs.map((a, i) => (
        <OutLabel key={i} cx={cx} cy={cy} r={R} deg={a} text={names[i]} />
      ))}
      <Dot at={[cx, cy]} />
      <Label at={[cx + 4, cy - 14]}>O</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Polygon circumscribed about a circle / circle inscribed in it     */
/* ------------------------------------------------------------------ */

export function CircumscribedPolygon({ highlight = "polygon" }: { highlight?: "polygon" | "circle" | "none" }) {
  const cx = 125;
  const cy = 115;
  const R = 62;
  // tangent points (degrees); consecutive tangent lines meet at angle (a+b)/2, distance R / cos((b-a)/2)
  const tps = [80, 175, 270, 355];
  const verts: Pt[] = tps.map((a, i) => {
    const b = i + 1 < tps.length ? tps[i + 1] : tps[0] + 360;
    return onC(cx, cy, R / Math.cos(rad((b - a) / 2)), (a + b) / 2);
  });
  const vAngles = tps.map((a, i) => {
    const b = i + 1 < tps.length ? tps[i + 1] : tps[0] + 360;
    return (a + b) / 2;
  });
  const names = ["A", "B", "C", "D"];
  const d = `M ${verts.map((p) => p.join(" ")).join(" L ")} Z`;
  return (
    <svg viewBox="0 0 250 230" width={250} role="img" aria-label="Quadrilateral ABCD circumscribed about a circle">
      <circle cx={cx} cy={cy} r={R} className={highlight === "circle" ? "dg-accent" : "dg-line"} />
      <path d={d} className={highlight === "polygon" ? "dg-accent" : "dg-line"} />
      {verts.map((p, i) => (
        <Label key={i} at={onC(p[0], p[1], 12, vAngles[i])}>{names[i]}</Label>
      ))}
      <Dot at={[cx, cy]} />
      <Label at={[cx + 4, cy + 15]}>O</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Concentric circles                                                */
/* ------------------------------------------------------------------ */

export function ConcentricCircles({ variant = "term" }: { variant?: "term" | "ring" }) {
  const cx = 110;
  const cy = 105;
  if (variant === "term") {
    return (
      <svg viewBox="0 0 220 210" width={220} role="img" aria-label="Three concentric circles">
        {[34, 60, 86].map((q) => (
          <circle key={q} cx={cx} cy={cy} r={q} className="dg-accent" />
        ))}
        <Dot at={[cx, cy]} />
        <Label at={[cx + 4, cy + 15]}>O</Label>
      </svg>
    );
  }
  const R = 86;
  const r = 48;
  const eR = onC(cx, cy, R, 30);
  const er = onC(cx, cy, r, 150);
  return (
    <svg viewBox="0 0 220 210" width={220} role="img" aria-label="Ring between two concentric circles">
      <path d={ringD(cx, cy, R, r)} className="dg-fill" fillRule="evenodd" />
      <circle cx={cx} cy={cy} r={R} className="dg-line" />
      <circle cx={cx} cy={cy} r={r} className="dg-line" />
      <line x1={cx} y1={cy} x2={eR[0]} y2={eR[1]} className="dg-line" />
      <line x1={cx} y1={cy} x2={er[0]} y2={er[1]} className="dg-line" />
      <Label at={sideLabelPos([cx, cy], eR, -10)}>R</Label>
      <Label at={sideLabelPos([cx, cy], er, 10)}>r</Label>
      <Dot at={[cx, cy]} />
      <Label at={[cx, cy + 15]}>O</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Where the center lies for an inscribed triangle                   */
/* ------------------------------------------------------------------ */

export function CenterPositions() {
  const R = 46;
  const cy = 62;
  const cases: { cx: number; angs: number[]; text: string }[] = [
    { cx: 60, angs: [90, 210, 330], text: "inside" },
    { cx: 180, angs: [180, 0, 65], text: "on a side" },
    { cx: 300, angs: [165, 15, 95], text: "outside" },
  ];
  return (
    <svg viewBox="0 0 360 135" width={360} role="img" aria-label="Center inside, on a side of, or outside an inscribed triangle">
      {cases.map(({ cx, angs, text }) => {
        const pts = angs.map((a) => onC(cx, cy, R, a));
        return (
          <g key={cx}>
            <circle cx={cx} cy={cy} r={R} className="dg-line" />
            <path d={`M ${pts.map((p) => p.join(" ")).join(" L ")} Z`} className="dg-accent" />
            <Dot at={[cx, cy]} />
            <Label at={[cx, cy + R + 22]} cls="dg-text">{text}</Label>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Triangle with a side that is a diameter                           */
/* ------------------------------------------------------------------ */

export interface DiameterTriangleProps {
  /** labels for left end, right end, and the third vertex */
  left?: string;
  right?: string;
  top?: string;
  /** angle position (degrees) of the third vertex on the circle */
  topDeg?: number;
  center?: string | null;
  rightAngle?: boolean;
  /** angle label at the left or right endpoint */
  angleAt?: "left" | "right" | null;
  angleText?: string;
  /** label on the side from the third vertex to the left (or right) endpoint */
  leftSide?: string;
  rightSide?: string;
  shadeOutside?: boolean;
}

export function DiameterTriangle({
  left = "A",
  right = "C",
  top = "B",
  topDeg = 62,
  center = "O",
  rightAngle = true,
  angleAt = null,
  angleText = "",
  leftSide,
  rightSide,
  shadeOutside = false,
}: DiameterTriangleProps) {
  const cx = 130;
  const cy = 112;
  const R = 85;
  const L = onC(cx, cy, R, 180);
  const Rt = onC(cx, cy, R, 0);
  const V = onC(cx, cy, R, topDeg);
  const tri = `M ${L.join(" ")} L ${V.join(" ")} L ${Rt.join(" ")} Z`;
  let angleEl = null;
  if (angleAt === "left") {
    const d = dirDeg(L, V);
    angleEl = (
      <>
        <path d={angleArc(L, 22, 0, d)} className="dg-line dg-thin" />
        <Label at={onC(L[0], L[1], 38, d / 2)} cls="dg-text">{angleText}</Label>
      </>
    );
  } else if (angleAt === "right") {
    const d = dirDeg(Rt, V); // between 90 and 180
    angleEl = (
      <>
        <path d={angleArc(Rt, 22, d, 180)} className="dg-line dg-thin" />
        <Label at={onC(Rt[0], Rt[1], 40, (d + 180) / 2)} cls="dg-text">{angleText}</Label>
      </>
    );
  }
  return (
    <svg viewBox="0 0 260 225" width={260} role="img" aria-label="Triangle inscribed in a circle with one side a diameter">
      {shadeOutside && (
        <path
          d={`M ${cx + R} ${cy} A ${R} ${R} 0 1 0 ${cx - R} ${cy} A ${R} ${R} 0 1 0 ${cx + R} ${cy} Z ${tri}`}
          className="dg-fill"
          fillRule="evenodd"
        />
      )}
      <circle cx={cx} cy={cy} r={R} className="dg-line" />
      <path d={tri} className="dg-line" />
      {rightAngle && <path d={rightMark(V, L, Rt)} className="dg-line dg-thin" />}
      {angleEl}
      {leftSide && <Label at={sideLabelPos(L, V, -12)} cls="dg-text">{leftSide}</Label>}
      {rightSide && <Label at={sideLabelPos(V, Rt, -12)} cls="dg-text">{rightSide}</Label>}
      <Dot at={L} />
      <Dot at={Rt} />
      <Dot at={V} />
      <Label at={[L[0] - 13, L[1]]}>{left}</Label>
      <Label at={[Rt[0] + 13, Rt[1]]}>{right}</Label>
      <OutLabel cx={cx} cy={cy} r={R} deg={topDeg} text={top} />
      {center && (
        <>
          <Dot at={[cx, cy]} />
          <Label at={[cx, cy + 15]}>{center}</Label>
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Square inscribed in a circle; circle inscribed in a square       */
/* ------------------------------------------------------------------ */

export function SquareAndCircle() {
  // left: square inscribed in circle of radius 62; right: circle of radius 50 inscribed in square of side 100
  const c1: Pt = [80, 90];
  const R1 = 62;
  const sq = [45, 135, 225, 315].map((a) => onC(c1[0], c1[1], R1, a));
  const c2: Pt = [255, 90];
  const r = 52;
  const tp: Pt = [c2[0], c2[1] - r];
  return (
    <svg viewBox="0 0 340 190" width={340} role="img" aria-label="Square inscribed in a circle and circle inscribed in a square">
      {/* left */}
      <circle cx={c1[0]} cy={c1[1]} r={R1} className="dg-line" />
      <path d={`M ${sq.map((p) => p.join(" ")).join(" L ")} Z`} className="dg-accent" />
      <line x1={sq[1][0]} y1={sq[1][1]} x2={sq[3][0]} y2={sq[3][1]} className="dg-line dg-dashed" />
      <Dot at={c1} />
      <Label at={[c1[0] + 13, c1[1] - 5]}>O</Label>
      <Label at={[c1[0], sq[2][1] + 15]}>s</Label>
      <Label at={sideLabelPos(sq[1], c1, -10)}>r</Label>
      <Label at={[c1[0], 178]} cls="dg-text">diagonal = 2r</Label>
      {/* right */}
      <rect x={c2[0] - r} y={c2[1] - r} width={2 * r} height={2 * r} className="dg-line" />
      <circle cx={c2[0]} cy={c2[1]} r={r} className="dg-accent" />
      <line x1={c2[0]} y1={c2[1]} x2={tp[0]} y2={tp[1]} className="dg-line" />
      <path d={rightMark(tp, c2, [c2[0] + r, tp[1]], 7)} className="dg-line dg-thin" />
      <Dot at={c2} />
      <Label at={[c2[0] - 11, c2[1] - r / 2]}>r</Label>
      <Label at={[c2[0], c2[1] + r + 12]}>s</Label>
      <Label at={[c2[0], 178]} cls="dg-text">s = 2r</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 11. Inscribed angle (optional term)                                  */
/* ------------------------------------------------------------------ */

export function InscribedAngleFig() {
  const cx = 120;
  const cy = 105;
  const R = 80;
  const aV = 240;
  const aA = 140;
  const aB = 20;
  const V = onC(cx, cy, R, aV);
  const A = onC(cx, cy, R, aA);
  const B = onC(cx, cy, R, aB);
  const dA = dirDeg(V, A);
  const dB = dirDeg(V, B);
  return (
    <svg viewBox="0 0 240 210" width={240} role="img" aria-label="Inscribed angle AVB">
      <circle cx={cx} cy={cy} r={R} className="dg-line" />
      <line x1={V[0]} y1={V[1]} x2={A[0]} y2={A[1]} className="dg-accent" />
      <line x1={V[0]} y1={V[1]} x2={B[0]} y2={B[1]} className="dg-accent" />
      <path d={angleArc(V, 18, dB, dA)} className="dg-line dg-thin" />
      {[V, A, B].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <OutLabel cx={cx} cy={cy} r={R} deg={aV} text="V" />
      <OutLabel cx={cx} cy={cy} r={R} deg={aA} text="A" />
      <OutLabel cx={cx} cy={cy} r={R} deg={aB} text="B" />
      <Dot at={[cx, cy]} />
      <Label at={[cx + 13, cy - 4]}>O</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Question figures                                                     */
/* ------------------------------------------------------------------ */

/** Example: sector with central angle 72 degrees (shaded). */
export function SectorExample() {
  const cx = 120;
  const cy = 108;
  const R = 82;
  const a1 = 20;
  const a2 = 92;
  const A = onC(cx, cy, R, a1);
  const B = onC(cx, cy, R, a2);
  return (
    <svg viewBox="0 0 240 210" width={240} role="img" aria-label="Circle with shaded sector AOB">
      <path d={sectorD(cx, cy, R, a1, a2)} className="dg-fill" />
      <circle cx={cx} cy={cy} r={R} className="dg-line" />
      <line x1={cx} y1={cy} x2={A[0]} y2={A[1]} className="dg-line" />
      <line x1={cx} y1={cy} x2={B[0]} y2={B[1]} className="dg-line" />
      <path d={angleArc([cx, cy], 14, a1, a2)} className="dg-line dg-thin" />
      <Label at={onC(cx, cy, 33, (a1 + a2) / 2)} cls="dg-text">72°</Label>
      <Dot at={A} />
      <Dot at={B} />
      <OutLabel cx={cx} cy={cy} r={R} deg={a1} text="A" />
      <OutLabel cx={cx} cy={cy} r={R} deg={a2} text="B" />
      <Dot at={[cx, cy]} />
      <Label at={[cx - 4, cy + 15]}>O</Label>
    </svg>
  );
}

/** Example: chord AB of the larger of two concentric circles, tangent to the smaller circle at T. */
export function RingChord() {
  const cx = 120;
  const cy = 100;
  const R = 88;
  const r = 50;
  const half = Math.sqrt(R * R - r * r);
  const A: Pt = [r2(cx - half), cy + r];
  const B: Pt = [r2(cx + half), cy + r];
  const T: Pt = [cx, cy + r];
  return (
    <svg viewBox="0 0 240 205" width={240} role="img" aria-label="Concentric circles with a chord of the larger tangent to the smaller">
      <path d={ringD(cx, cy, R, r)} className="dg-fill" fillRule="evenodd" />
      <circle cx={cx} cy={cy} r={R} className="dg-line" />
      <circle cx={cx} cy={cy} r={r} className="dg-line" />
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className="dg-line" />
      {[A, B, T].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <Label at={[A[0] - 11, A[1] + 6]}>A</Label>
      <Label at={[B[0] + 11, B[1] + 6]}>B</Label>
      <Label at={[T[0], T[1] + 14]}>T</Label>
      <Dot at={[cx, cy]} />
      <Label at={[cx, cy - 14]}>O</Label>
    </svg>
  );
}

/** Quiz: chord AB with central angle labeled 58 degrees and radius 6 (deliberately not to scale). */
export function ChordAngleQC() {
  const cx = 120;
  const cy = 95;
  const R = 80;
  const aA = 228;
  const aB = 312; // drawn as 84 degrees on purpose
  const A = onC(cx, cy, R, aA);
  const B = onC(cx, cy, R, aB);
  return (
    <svg viewBox="0 0 240 200" width={240} role="img" aria-label="Circle with center O and chord AB">
      <circle cx={cx} cy={cy} r={R} className="dg-line" />
      <line x1={cx} y1={cy} x2={A[0]} y2={A[1]} className="dg-line" />
      <line x1={cx} y1={cy} x2={B[0]} y2={B[1]} className="dg-line" />
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className="dg-line" />
      <path d={angleArc([cx, cy], 14, aA, aB)} className="dg-line dg-thin" />
      <Label at={onC(cx, cy, 30, 270)} cls="dg-text">58°</Label>
      <Label at={sideLabelPos([cx, cy], A, 10)} cls="dg-text">6</Label>
      <Dot at={A} />
      <Dot at={B} />
      <OutLabel cx={cx} cy={cy} r={R} deg={aA} text="A" />
      <OutLabel cx={cx} cy={cy} r={R} deg={aB} text="B" />
      <Dot at={[cx, cy]} />
      <Label at={[cx, cy - 14]}>O</Label>
    </svg>
  );
}

/** Quiz: tangent PT, with P, Q, O collinear (Q on the circle). Drawn to scale for r = 5, PT = 12, PQ = 8. */
export function TangentQuestion() {
  const k = 11; // pixels per unit
  const O: Pt = [70, 118];
  const R = 5 * k;
  const P: Pt = [O[0] + 13 * k, O[1]];
  const tDeg = (Math.acos(5 / 13) * 180) / Math.PI;
  const T = onC(O[0], O[1], R, tDeg);
  const Q: Pt = [O[0] + R, O[1]];
  // extend the tangent line beyond T and beyond P
  const ux = (T[0] - P[0]) / (12 * k);
  const uy = (T[1] - P[1]) / (12 * k);
  const E1: Pt = [r2(T[0] + 30 * ux), r2(T[1] + 30 * uy)];
  const E2: Pt = [r2(P[0] - 22 * ux), r2(P[1] - 22 * uy)];
  return (
    <svg viewBox="0 0 270 190" width={270} role="img" aria-label="Line PT tangent to the circle at T">
      <circle cx={O[0]} cy={O[1]} r={R} className="dg-line" />
      <line x1={E1[0]} y1={E1[1]} x2={E2[0]} y2={E2[1]} className="dg-line" />
      <line x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} className="dg-line" />
      <line x1={O[0]} y1={O[1]} x2={T[0]} y2={T[1]} className="dg-line dg-dashed" />
      <path d={rightMark(T, O, P, 8)} className="dg-line dg-thin" />
      {[O, P, T, Q].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <Label at={[O[0], O[1] + 15]}>O</Label>
      <Label at={[Q[0] + 9, Q[1] + 17]}>Q</Label>
      <Label at={[P[0] + 6, P[1] + 15]}>P</Label>
      <Label at={onC(T[0], T[1], 16, tDeg + 55)}>T</Label>
      <Label at={sideLabelPos(T, P, -12)} cls="dg-text">12</Label>
      <Label at={[(Q[0] + P[0]) / 2, Q[1] + 14]} cls="dg-text">8</Label>
    </svg>
  );
}
