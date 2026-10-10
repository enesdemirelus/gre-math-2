// Original diagrams for section 3.1 Lines and Angles.
// Directions are in degrees, measured counterclockwise from the positive x-direction
// (SVG y grows downward, so a point at distance d in direction deg from v is
// [v.x + d cos(deg), v.y - d sin(deg)]). All intersections and label positions are computed.

type Pt = [number, number];

const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Point at distance d from v in direction deg. */
function along(v: Pt, deg: number, d: number): Pt {
  return [r2(v[0] + d * Math.cos(rad(deg))), r2(v[1] - d * Math.sin(rad(deg)))];
}

/** Direction (degrees, math convention, 0..360) from p to q. */
function dirDeg(p: Pt, q: Pt): number {
  const d = (Math.atan2(-(q[1] - p[1]), q[0] - p[0]) * 180) / Math.PI;
  return d < 0 ? d + 360 : d;
}

/** Counterclockwise span from d1 to d2, in (0, 360]. */
function span(d1: number, d2: number): number {
  const s = (((d2 - d1) % 360) + 360) % 360;
  return s === 0 ? 360 : s;
}

/** Small arc at vertex v of radius rr, counterclockwise (visually) from direction d1 to d2. */
function angleArc(v: Pt, rr: number, d1: number, d2: number): string {
  const s = along(v, d1, rr);
  const e = along(v, d2, rr);
  const large = span(d1, d2) > 180 ? 1 : 0;
  return `M ${s[0]} ${s[1]} A ${rr} ${rr} 0 ${large} 0 ${e[0]} ${e[1]}`;
}

/** Small right-angle square at vertex v, sides along directions d1 and d2 (90 degrees apart). */
function rightMarkDir(v: Pt, d1: number, d2: number, s = 9): string {
  const p1 = along(v, d1, s);
  const p3 = along(v, d2, s);
  const p2: Pt = [r2(p1[0] + p3[0] - v[0]), r2(p1[1] + p3[1] - v[1])];
  return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]}`;
}

/** Rough width of a label string (15px serif). */
function textW(t: string): number {
  return t.length * 7.4;
}

/**
 * Distance along the bisector of the angle from d1 to d2 (counterclockwise) at which a
 * w x h label box clears both sides of the angle by `pad`.
 */
function labelDist(d1: number, d2: number, w: number, h = 14, pad = 4): number {
  const half = span(d1, d2) / 2;
  const s = half >= 90 ? 1 : Math.sin(rad(half));
  let need = 0;
  for (const d of [d1, d2]) {
    const nx = -Math.sin(rad(d));
    const ny = Math.cos(rad(d));
    const e = (w / 2) * Math.abs(nx) + (h / 2) * Math.abs(ny) + pad;
    need = Math.max(need, e / s);
  }
  return Math.max(need, 15);
}

/**
 * Position for a label inside the angle d1 -> d2 at vertex v: the point closest to v whose
 * label box (plus padding) does not touch either full line through v along d1 or d2.
 */
function angleLabelAt(v: Pt, d1: number, d2: number, text: string, extra = 0): Pt {
  const w = textW(text);
  const h = 14;
  const pad = 3;
  const sp = span(d1, d2);
  const dirs = [d1, d1 + 180, d2, d2 + 180];
  const clear = (c: Pt) => {
    // keep the box outside a circle of radius `extra` around v (room for an angle arc)
    const nx = Math.max(Math.abs(c[0] - v[0]) - w / 2, 0);
    const ny = Math.max(Math.abs(c[1] - v[1]) - h / 2, 0);
    if (Math.hypot(nx, ny) < extra) return false;
    for (const d of dirs) {
      for (let t = 0; t <= 260; t += 2) {
        const q = along(v, d, t);
        if (Math.abs(q[0] - c[0]) < w / 2 + pad && Math.abs(q[1] - c[1]) < h / 2 + pad) return false;
      }
    }
    return true;
  };
  let best: Pt | null = null;
  let bestD = Infinity;
  const m = Math.min(8, sp / 4);
  for (let a = d1 + m; a <= d1 + sp - m + 1e-9; a += Math.max(1, (sp - 2 * m) / 24)) {
    for (let dist = 12; dist < Math.min(bestD, 160); dist += 2) {
      const c = along(v, a, dist);
      if (clear(c)) {
        if (dist < bestD) {
          bestD = dist;
          best = c;
        }
        break;
      }
    }
  }
  if (!best) best = along(v, d1 + sp / 2, labelDist(d1, d2, w));
  return best;
}

/** Intersection of line through p with direction a and line through q with direction b. */
function meet(p: Pt, a: number, q: Pt, b: number): Pt {
  const ux = Math.cos(rad(a));
  const uy = -Math.sin(rad(a));
  const vx = Math.cos(rad(b));
  const vy = -Math.sin(rad(b));
  const den = ux * vy - uy * vx;
  const t = ((q[0] - p[0]) * vy - (q[1] - p[1]) * vx) / den;
  return [r2(p[0] + t * ux), r2(p[1] + t * uy)];
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

function Seg({ a, b, cls = "dg-line" }: { a: Pt; b: Pt; cls?: string }) {
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={cls} />;
}

/** Angle measure text placed inside the angle. */
function AngleText({ v, d1, d2, text, extra = 0 }: { v: Pt; d1: number; d2: number; text: string; extra?: number }) {
  return (
    <Label at={angleLabelAt(v, d1, d2, text, extra)} cls="dg-text">
      {text}
    </Label>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Line, segment, endpoints, congruent segments, midpoint            */
/* ------------------------------------------------------------------ */

export type SegmentHighlight = "all" | "line" | "segment" | "endpoints" | "length" | "congruent" | "midpoint";

export function SegmentFigure({ highlight = "all" }: { highlight?: SegmentHighlight }) {
  const y = 58;
  // scale: 10 px per unit; PQ = 10, QR = 7, RS = 7
  const P: Pt = [60, y];
  const Q: Pt = [160, y];
  const R: Pt = [230, y];
  const S: Pt = [300, y];
  const pts: [Pt, string][] = [
    [P, "P"],
    [Q, "Q"],
    [R, "R"],
    [S, "S"],
  ];
  const showNums = highlight === "all" || highlight === "length" || highlight === "congruent" || highlight === "midpoint";
  return (
    <svg viewBox="0 0 360 92" width={360} role="img" aria-label="Points P, Q, R, S on line l">
      <line x1={22} y1={y} x2={338} y2={y} className={highlight === "line" ? "dg-accent" : "dg-line"} />
      <Label at={[12, y]}>ℓ</Label>
      {(highlight === "segment" || highlight === "endpoints" || highlight === "length") && <Seg a={P} b={Q} cls="dg-accent" />}
      {highlight === "congruent" && (
        <>
          <Seg a={Q} b={R} cls="dg-accent" />
          <Seg a={R} b={S} cls="dg-accent" />
        </>
      )}
      {highlight === "midpoint" && <Seg a={Q} b={S} cls="dg-accent" />}
      {highlight === "endpoints" && (
        <>
          <circle cx={P[0]} cy={P[1]} r={7} className="dg-accent" />
          <circle cx={Q[0]} cy={Q[1]} r={7} className="dg-accent" />
        </>
      )}
      {highlight === "midpoint" && <circle cx={R[0]} cy={R[1]} r={7} className="dg-accent" />}
      {pts.map(([p, n]) => (
        <g key={n}>
          <Dot at={p} />
          <Label at={[p[0], p[1] + 20]}>{n}</Label>
        </g>
      ))}
      {showNums && (
        <>
          {(highlight === "all" || highlight === "length") && <Label at={[110, y - 16]} cls="dg-text">10</Label>}
          {highlight !== "length" && (
            <>
              <Label at={[195, y - 16]} cls="dg-text">7</Label>
              <Label at={[265, y - 16]} cls="dg-text">7</Label>
            </>
          )}
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Two intersecting lines: angles, vertex, opposite angles           */
/* ------------------------------------------------------------------ */

export type IntersectHighlight = "all" | "angle" | "vertex" | "vertical" | "congruent";

export function IntersectingLines({ highlight = "all" }: { highlight?: IntersectHighlight }) {
  const V: Pt = [170, 100];
  const dk = 160; // line k: toward E (upper left) and G (lower right, 340)
  const dm = 20; // line m: toward F (upper right) and H (lower left, 200)
  const L = 150;
  const E = along(V, dk, 95);
  const G = along(V, dk + 180, 95);
  const F = along(V, dm, 95);
  const H = along(V, dm + 180, 95);
  // angles (counterclockwise spans): FVE top (20 -> 160) = 140, EVH left (160 -> 200) = 40,
  // HVG bottom (200 -> 340) = 140, GVF right (340 -> 20) = 40
  const showNums = highlight === "all" || highlight === "congruent" || highlight === "vertical";
  return (
    <svg viewBox="0 0 340 200" width={340} role="img" aria-label="Lines k and m intersecting at V">
      <line {...lineAttrs(along(V, dk, L), along(V, dk + 180, L))} className="dg-line" />
      <line {...lineAttrs(along(V, dm, L), along(V, dm + 180, L))} className="dg-line" />
      {highlight === "angle" && (
        <>
          <Seg a={V} b={along(V, 340, L)} cls="dg-accent" />
          <Seg a={V} b={along(V, 20, L)} cls="dg-accent" />
          <path d={angleArc(V, 22, 340, 20)} className="dg-accent" />
        </>
      )}
      {(highlight === "vertical" || highlight === "congruent") && (
        <>
          <path d={angleArc(V, 20, 340, 20)} className="dg-accent" />
          <path d={angleArc(V, 20, 160, 200)} className="dg-accent" />
        </>
      )}
      {highlight === "vertex" && <circle cx={V[0]} cy={V[1]} r={8} className="dg-accent" />}
      {showNums && (
        <>
          {highlight !== "congruent" && <AngleText v={V} d1={20} d2={160} text="140°" />}
          {highlight !== "congruent" && <AngleText v={V} d1={200} d2={340} text="140°" />}
          <AngleText v={V} d1={340} d2={20} text="40°" extra={10} />
          <AngleText v={V} d1={160} d2={200} text="40°" extra={10} />
        </>
      )}
      {[E, F, G, H].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <Label at={[E[0] + 2, E[1] - 16]}>E</Label>
      <Label at={[F[0] - 2, F[1] - 16]}>F</Label>
      <Label at={[G[0] - 2, G[1] + 17]}>G</Label>
      <Label at={[H[0] + 2, H[1] + 17]}>H</Label>
      <Dot at={V} />
      <Label at={[V[0], V[1] + 30]}>V</Label>
      <Label at={along(V, dk, L + 10)}>k</Label>
      <Label at={along(V, dm, L + 10)}>m</Label>
    </svg>
  );
}

function lineAttrs(a: Pt, b: Pt) {
  return { x1: a[0], y1: a[1], x2: b[0], y2: b[1] };
}

/* ------------------------------------------------------------------ */
/* 3. Perpendicular lines                                               */
/* ------------------------------------------------------------------ */

export function PerpendicularLines({ highlight = "lines" }: { highlight?: "lines" | "angles" }) {
  const V: Pt = [150, 95];
  const dk = 125;
  const dm = 35;
  const L = 85;
  const cls = highlight === "lines" ? "dg-accent" : "dg-line";
  return (
    <svg viewBox="0 0 300 190" width={300} role="img" aria-label="Perpendicular lines k and m">
      <line {...lineAttrs(along(V, dk, L), along(V, dk + 180, L))} className={cls} />
      <line {...lineAttrs(along(V, dm, L), along(V, dm + 180, L))} className={cls} />
      {highlight === "lines" ? (
        <path d={rightMarkDir(V, dm, dk, 11)} className="dg-line dg-thin" />
      ) : (
        <>
          <AngleText v={V} d1={dm} d2={dk} text="90°" />
          <AngleText v={V} d1={dk} d2={dm + 180} text="90°" />
          <AngleText v={V} d1={dm + 180} d2={dk + 180} text="90°" />
          <AngleText v={V} d1={dk + 180} d2={dm + 360} text="90°" />
        </>
      )}
      <Label at={along(V, dk, L + 11)}>k</Label>
      <Label at={along(V, dm, L + 11)}>m</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Right, acute and obtuse angles                                    */
/* ------------------------------------------------------------------ */

export type AngleKind = "all" | "right" | "acute" | "obtuse";

function OneAngle({ v, deg, kind, letters, accent }: { v: Pt; deg: number; kind: "right" | "acute" | "obtuse"; letters: [string, string, string]; accent: boolean }) {
  const L = 82;
  const d1 = 0;
  const d2 = deg;
  const A = along(v, d2, L - 12);
  const C = along(v, d1, L - 12);
  const cls = accent ? "dg-accent" : "dg-line";
  return (
    <g>
      <Seg a={v} b={along(v, d1, L)} cls={cls} />
      <Seg a={v} b={along(v, d2, L)} cls={cls} />
      {kind === "right" ? (
        <path d={rightMarkDir(v, d1, d2, 10)} className="dg-line dg-thin" />
      ) : (
        <>
          <path d={angleArc(v, 16, d1, d2)} className="dg-line dg-thin" />
          <AngleText v={v} d1={d1} d2={d2} text={`${deg}°`} extra={20} />
        </>
      )}
      <Dot at={A} />
      <Dot at={C} />
      <Dot at={v} />
      <Label at={along(A, deg + 90 > 180 ? deg - 90 : deg + 90, 13)}>{letters[0]}</Label>
      <Label at={[v[0] - 4, v[1] + 16]}>{letters[1]}</Label>
      <Label at={[C[0], C[1] + 16]}>{letters[2]}</Label>
    </g>
  );
}

export function AngleTypes({ kind = "all" }: { kind?: AngleKind }) {
  if (kind !== "all") {
    const deg = kind === "right" ? 90 : kind === "acute" ? 38 : 128;
    const vx = kind === "obtuse" ? 110 : 60;
    return (
      <svg viewBox="0 0 200 125" width={200} role="img" aria-label={`A ${kind} angle`}>
        <OneAngle v={[vx, 100]} deg={deg} kind={kind} letters={["A", "B", "C"]} accent />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 360 140" width={360} role="img" aria-label="An acute, a right, and an obtuse angle">
      <OneAngle v={[16, 98]} deg={38} kind="acute" letters={["A", "B", "C"]} accent={false} />
      <OneAngle v={[132, 98]} deg={90} kind="right" letters={["D", "E", "F"]} accent={false} />
      <OneAngle v={[262, 98]} deg={128} kind="obtuse" letters={["G", "H", "J"]} accent={false} />
      <Label at={[58, 130]} cls="dg-text">acute</Label>
      <Label at={[174, 130]} cls="dg-text">right</Label>
      <Label at={[290, 130]} cls="dg-text">obtuse</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Two parallel lines and a third line crossing them                 */
/* ------------------------------------------------------------------ */

/** Quadrant order used by labels/arcs: [upper-left, upper-right, lower-left, lower-right]. */
type Quad = [string | null, string | null, string | null, string | null];

export interface ParallelProps {
  /** direction of the crossing line p (degrees, 20..160, not 90 unless you want perpendicular) */
  theta?: number;
  /** angle labels at the intersection with k (top) and m (bottom) */
  labels?: { k?: Quad; m?: Quad };
  /** "parallel" accents k and m; "transversal" accents p; others draw accent arcs */
  highlight?: "none" | "parallel" | "transversal" | "corresponding" | "alternate" | "same-class";
  /** which quadrants get an accent arc (overrides highlight presets) */
  arcs?: { k?: boolean[]; m?: boolean[] };
}

export function ParallelLines({ theta = 62, labels, highlight = "none", arcs }: ParallelProps) {
  const yk = 62;
  const ym = 162;
  const xc = 165;
  const cot = Math.cos(rad(theta)) / Math.sin(rad(theta));
  const X1: Pt = [r2(xc + 50 * cot), yk];
  const X2: Pt = [r2(xc - 50 * cot), ym];
  const xAt = (y: number) => xc - (y - (yk + ym) / 2) * cot;
  const pTop: Pt = [r2(xAt(12)), 12];
  const pBot: Pt = [r2(xAt(204)), 204];
  // quadrant spans [d1, d2] counterclockwise: UL, UR, LL, LR
  const spans: [number, number][] = [
    [theta, 180],
    [0, theta],
    [180, 180 + theta],
    [180 + theta, 360],
  ];
  let arcSet = arcs;
  if (!arcSet) {
    if (highlight === "corresponding") arcSet = { k: [false, true, false, false], m: [false, true, false, false] };
    if (highlight === "alternate") arcSet = { k: [false, false, true, false], m: [false, true, false, false] };
    if (highlight === "same-class") arcSet = { k: [false, true, true, false], m: [false, true, true, false] };
  }
  const lineCls = highlight === "parallel" ? "dg-accent" : "dg-line";
  const pCls = highlight === "transversal" ? "dg-accent" : "dg-line";
  const pNameAt = along(pBot, theta + 180, 12);
  const renderAt = (X: Pt, q?: Quad, a?: boolean[]) => (
    <>
      {a?.map((on, i) =>
        on ? <path key={`a${i}`} d={angleArc(X, 15, spans[i][0], spans[i][1])} className="dg-accent" /> : null,
      )}
      {q?.map((t, i) => (t ? <AngleText key={`t${i}`} v={X} d1={spans[i][0]} d2={spans[i][1]} text={t} extra={1} /> : null))}
    </>
  );
  return (
    <svg viewBox="0 0 340 228" width={340} role="img" aria-label="Lines k and m crossed by line p">
      <line x1={18} y1={yk} x2={310} y2={yk} className={lineCls} />
      <line x1={18} y1={ym} x2={310} y2={ym} className={lineCls} />
      <line x1={pTop[0]} y1={pTop[1]} x2={pBot[0]} y2={pBot[1]} className={pCls} />
      {renderAt(X1, labels?.k, arcSet?.k)}
      {renderAt(X2, labels?.m, arcSet?.m)}
      <Label at={[322, yk]}>k</Label>
      <Label at={[322, ym]}>m</Label>
      <Label at={pNameAt}>p</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Supplementary and complementary angles (vocabulary only)          */
/* ------------------------------------------------------------------ */

export function AnglePair({ kind = "supplementary" }: { kind?: "supplementary" | "complementary" }) {
  if (kind === "supplementary") {
    const B: Pt = [150, 95];
    const d = 64;
    return (
      <svg viewBox="0 0 300 125" width={300} role="img" aria-label="Two adjacent angles on a line, 64 and 116 degrees">
        <line x1={30} y1={B[1]} x2={270} y2={B[1]} className="dg-line" />
        <Seg a={B} b={along(B, d, 88)} cls="dg-accent" />
        <path d={angleArc(B, 16, 0, d)} className="dg-line dg-thin" />
        <path d={angleArc(B, 20, d, 180)} className="dg-line dg-thin" />
        <AngleText v={B} d1={0} d2={d} text="64°" extra={20} />
        <AngleText v={B} d1={d} d2={180} text="116°" extra={24} />
        <Dot at={B} />
        <Label at={[B[0], B[1] + 17]}>B</Label>
      </svg>
    );
  }
  const B: Pt = [70, 105];
  const d = 34;
  return (
    <svg viewBox="0 0 220 135" width={220} role="img" aria-label="A right angle split into 34 and 56 degrees">
      <Seg a={B} b={along(B, 0, 130)} />
      <Seg a={B} b={along(B, 90, 92)} />
      <Seg a={B} b={along(B, d, 120)} cls="dg-accent" />
      <path d={rightMarkDir(B, 0, 90, 9)} className="dg-line dg-thin" />
      <path d={angleArc(B, 22, 0, d)} className="dg-line dg-thin" />
      <path d={angleArc(B, 18, d, 90)} className="dg-line dg-thin" />
      <AngleText v={B} d1={0} d2={d} text="34°" extra={26} />
      <AngleText v={B} d1={d} d2={90} text="56°" extra={22} />
      <Dot at={B} />
      <Label at={[B[0] - 4, B[1] + 16]}>B</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Distance from a point to a line; between two parallel lines       */
/* ------------------------------------------------------------------ */

export function DistanceFigure({ kind = "point" }: { kind?: "point" | "parallel" }) {
  if (kind === "point") {
    const P: Pt = [130, 30];
    const Q: Pt = [130, 120];
    const R: Pt = [232, 120];
    return (
      <svg viewBox="0 0 300 150" width={300} role="img" aria-label="Perpendicular segment PQ from point P to line l">
        <line x1={20} y1={120} x2={280} y2={120} className="dg-line" />
        <Seg a={P} b={Q} cls="dg-accent" />
        <Seg a={P} b={R} cls="dg-line dg-dashed" />
        <path d={rightMarkDir(Q, 0, 90, 9)} className="dg-line dg-thin" />
        <Dot at={P} />
        <Dot at={Q} />
        <Dot at={R} />
        <Label at={[P[0], P[1] - 15]}>P</Label>
        <Label at={[Q[0], Q[1] + 17]}>Q</Label>
        <Label at={[R[0], R[1] + 17]}>R</Label>
        <Label at={[290, 120]}>ℓ</Label>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 140" width={300} role="img" aria-label="Distance between parallel lines k and m">
      <line x1={20} y1={30} x2={270} y2={30} className="dg-line" />
      <line x1={20} y1={112} x2={270} y2={112} className="dg-line" />
      <Seg a={[150, 30]} b={[150, 112]} cls="dg-accent" />
      <path d={rightMarkDir([150, 112], 0, 90, 9)} className="dg-line dg-thin" />
      <Label at={[283, 30]}>k</Label>
      <Label at={[283, 112]}>m</Label>
      <Label at={[138, 71]}>d</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 8. "Angle ABC" means the smaller angle (Math Conventions)            */
/* ------------------------------------------------------------------ */

export function SmallerAngle() {
  const B: Pt = [130, 95];
  const dA = 180;
  const dC = 48;
  const A = along(B, dA, 90);
  const C = along(B, dC, 100);
  return (
    <svg viewBox="0 0 300 170" width={300} role="img" aria-label="Segments BA and BC form two angles at B">
      <Seg a={B} b={A} />
      <Seg a={B} b={C} />
      <path d={angleArc(B, 22, dC, dA)} className="dg-accent" />
      <path d={angleArc(B, 30, dA, dC + 360)} className="dg-line dg-dashed" />
      <Dot at={A} />
      <Dot at={B} />
      <Dot at={C} />
      <Label at={[A[0], A[1] + 17]}>A</Label>
      <Label at={along(B, 270, 44)}>B</Label>
      <Label at={[C[0] + 12, C[1] + 4]}>C</Label>
      <Label at={along(B, 114, 44)} cls="dg-text">132°</Label>
      <Label at={along(B, 300, 50)} cls="dg-text">228°</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Question figures                                                  */
/* ------------------------------------------------------------------ */

/** Three lines through one point; labels in three of the six angles. */
export function ThreeLines() {
  const O: Pt = [170, 108];
  const dirs = [10, 54, 102];
  const L = 100;
  return (
    <svg viewBox="0 0 340 215" width={340} role="img" aria-label="Three lines through one point">
      {dirs.map((d) => (
        <line key={d} {...lineAttrs(along(O, d, L), along(O, d + 180, L))} className="dg-line" />
      ))}
      <AngleText v={O} d1={10} d2={54} text="x°" extra={6} />
      <AngleText v={O} d1={102} d2={190} text="2x°" extra={2} />
      <AngleText v={O} d1={234} d2={282} text="48°" extra={6} />
      <Dot at={O} />
    </svg>
  );
}

/** Two parallel lines with a point P between them joined to A on k and B on m. */
export function Zigzag() {
  const yk = 40;
  const ym = 190;
  const A: Pt = [55, yk];
  const B: Pt = [55, ym];
  const P = meet(A, -38, B, 47);
  return (
    <svg viewBox="0 0 340 225" width={340} role="img" aria-label="Point P between parallel lines k and m">
      <line x1={18} y1={yk} x2={300} y2={yk} className="dg-line" />
      <line x1={18} y1={ym} x2={300} y2={ym} className="dg-line" />
      <Seg a={A} b={P} />
      <Seg a={B} b={P} />
      <path d={angleArc(A, 22, -38, 0)} className="dg-line dg-thin" />
      <path d={angleArc(B, 22, 0, 47)} className="dg-line dg-thin" />
      <AngleText v={A} d1={-38} d2={0} text="38°" extra={26} />
      <AngleText v={B} d1={0} d2={47} text="47°" extra={26} />
      <path d={angleArc(P, 16, dirDeg(P, A), dirDeg(P, B))} className="dg-line dg-thin" />
      <AngleText v={P} d1={dirDeg(P, A)} d2={dirDeg(P, B)} text="x°" extra={20} />
      <Dot at={A} />
      <Dot at={B} />
      <Dot at={P} />
      <Label at={[A[0] - 2, A[1] - 15]}>A</Label>
      <Label at={[B[0] - 2, B[1] + 17]}>B</Label>
      <Label at={[P[0] + 15, P[1]]}>P</Label>
      <Label at={[312, yk]}>k</Label>
      <Label at={[312, ym]}>m</Label>
    </svg>
  );
}

/** Lines p and q meet at V above k; both cross the parallel lines k and m. */
export function TwoCrossingLines() {
  const yk = 104;
  const ym = 196;
  const V: Pt = [170, 54];
  const dp = 62; // p rises to the right
  const dq = 105; // q rises to the left
  const xAt = (d: number, y: number) => V[0] + (V[1] - y) / Math.tan(rad(d));
  const C: Pt = [r2(xAt(dp, ym)), ym];
  const D: Pt = [r2(xAt(dq, ym)), ym];
  const pEndTop = along(V, dp, 30);
  const pEndBot = along(C, dp + 180, 16);
  const qEndTop = along(V, dq, 30);
  const qEndBot = along(D, dq + 180, 16);
  return (
    <svg viewBox="0 0 340 240" width={340} role="img" aria-label="Lines p and q crossing parallel lines k and m">
      <line x1={18} y1={yk} x2={310} y2={yk} className="dg-line" />
      <line x1={18} y1={ym} x2={310} y2={ym} className="dg-line" />
      <Seg a={pEndTop} b={pEndBot} />
      <Seg a={qEndTop} b={qEndBot} />
      <AngleText v={C} d1={0} d2={dp} text="62°" extra={6} />
      <AngleText v={D} d1={dq} d2={180} text="75°" extra={6} />
      <AngleText v={V} d1={dp} d2={dq} text="x°" extra={2} />
      <Label at={[322, yk]}>k</Label>
      <Label at={[322, ym]}>m</Label>
      <Label at={along(pEndBot, dp + 180, 11)}>p</Label>
      <Label at={along(qEndBot, dq + 180, 11)}>q</Label>
    </svg>
  );
}

/** Segment SR perpendicular to line l at R, with P and Q on l. Used for a "what may be assumed" question. */
export function ConventionsFigure() {
  const y = 150;
  const P: Pt = [40, y];
  const R: Pt = [120, y];
  const Q: Pt = [290, y];
  const S: Pt = [120, 40];
  return (
    <svg viewBox="0 0 330 185" width={330} role="img" aria-label="Triangle PSQ with segment SR perpendicular to PQ">
      <line x1={15} y1={y} x2={315} y2={y} className="dg-line" />
      <Seg a={P} b={S} />
      <Seg a={S} b={Q} />
      <Seg a={S} b={R} />
      <path d={rightMarkDir(R, 0, 90, 10)} className="dg-line dg-thin" />
      {[P, S, Q, R].map((p, i) => (
        <Dot key={i} at={p} />
      ))}
      <Label at={[P[0], P[1] + 17]}>P</Label>
      <Label at={[R[0], R[1] + 17]}>R</Label>
      <Label at={[Q[0], Q[1] + 17]}>Q</Label>
      <Label at={[S[0], S[1] - 15]}>S</Label>
      <Label at={[322, y]}>ℓ</Label>
    </svg>
  );
}

export const registry = {
  "3-1-lines-and-angles/segment": SegmentFigure,
  "3-1-lines-and-angles/intersecting": IntersectingLines,
  "3-1-lines-and-angles/perpendicular": PerpendicularLines,
  "3-1-lines-and-angles/angle-types": AngleTypes,
  "3-1-lines-and-angles/parallel": ParallelLines,
  "3-1-lines-and-angles/angle-pair": AnglePair,
  "3-1-lines-and-angles/distance": DistanceFigure,
  "3-1-lines-and-angles/smaller-angle": SmallerAngle,
  "3-1-lines-and-angles/three-lines": ThreeLines,
  "3-1-lines-and-angles/zigzag": Zigzag,
  "3-1-lines-and-angles/two-crossing-lines": TwoCrossingLines,
  "3-1-lines-and-angles/conventions": ConventionsFigure,
};
