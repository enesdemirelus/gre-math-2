// Original diagrams for section 3.2 Polygons.
// All polygons are drawn from vertex coordinates (SVG pixels). Interior angles, label positions
// and arcs are computed from the coordinates, so the drawn angles match the geometry.

type Pt = [number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;
const LETTERS = "ABCDEFGHIJKL";

/** Regular n-gon centred at c with circumradius R; the first vertex is at the given direction (degrees, math convention). */
export function regularPts(n: number, c: Pt = [170, 118], R = 92, start?: number): Pt[] {
  const a0 = start ?? 90 + 180 / n; // flat bottom side
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = ((a0 + (i * 360) / n) * Math.PI) / 180;
    pts.push([r2(c[0] + R * Math.cos(a)), r2(c[1] - R * Math.sin(a))]);
  }
  return pts;
}

const PRESETS: Record<string, Pt[]> = {
  triangle: [[50, 178], [292, 190], [128, 44]],
  quadrilateral: [[48, 182], [292, 196], [316, 84], [112, 40]],
  pentagon: [[62, 168], [172, 204], [290, 160], [276, 66], [118, 38]],
};

function unit(a: Pt, b: Pt): Pt {
  const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return [(b[0] - a[0]) / d, (b[1] - a[1]) / d];
}

function centroid(p: Pt[]): Pt {
  return [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
}

/** Interior angle (degrees) at vertex i of a convex polygon. */
export function interiorAngle(p: Pt[], i: number): number {
  const n = p.length;
  const u = unit(p[i], p[(i + 1) % n]);
  const w = unit(p[i], p[(i + n - 1) % n]);
  return (Math.acos(Math.max(-1, Math.min(1, u[0] * w[0] + u[1] * w[1]))) * 180) / Math.PI;
}

function arcAt(p: Pt[], i: number, rr: number): string {
  const n = p.length;
  const v = p[i];
  const u = unit(v, p[(i + 1) % n]);
  const w = unit(v, p[(i + n - 1) % n]);
  const s: Pt = [r2(v[0] + rr * u[0]), r2(v[1] + rr * u[1])];
  const e: Pt = [r2(v[0] + rr * w[0]), r2(v[1] + rr * w[1])];
  const cross = u[0] * w[1] - u[1] * w[0];
  return `M ${s[0]} ${s[1]} A ${rr} ${rr} 0 0 ${cross > 0 ? 1 : 0} ${e[0]} ${e[1]}`;
}

function rightMarkAt(p: Pt[], i: number, s = 9): string {
  const n = p.length;
  const v = p[i];
  const u = unit(v, p[(i + 1) % n]);
  const w = unit(v, p[(i + n - 1) % n]);
  const a: Pt = [r2(v[0] + s * u[0]), r2(v[1] + s * u[1])];
  const c: Pt = [r2(v[0] + s * w[0]), r2(v[1] + s * w[1])];
  const b: Pt = [r2(a[0] + c[0] - v[0]), r2(a[1] + c[1] - v[1])];
  return `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]} L ${c[0]} ${c[1]}`;
}

function Txt({ at, children, cls = "dg-label" }: { at: Pt; children: string; cls?: string }) {
  return (
    <text x={at[0]} y={at[1]} className={cls} textAnchor="middle" dominantBaseline="central">
      {children}
    </text>
  );
}

export type PolyHighlight =
  | "none"
  | "sides"
  | "vertices"
  | "angles"
  | "angle"
  | "diagonal"
  | "fan"
  | "region"
  | "perimeter";

export interface PolygonProps {
  /** number of sides, used when `pts` and `shape` are not given */
  n?: number;
  /** "regular" or a preset name for 3, 4, 5 sides ("irregular") */
  shape?: "regular" | "irregular";
  /** explicit vertices (SVG pixels), in order around the polygon */
  pts?: Pt[];
  /** vertex names, default A, B, C, ... Use "" to hide a name */
  names?: string[];
  /** text shown inside the interior angle at each vertex (null = none) */
  angles?: (string | null)[];
  /** text shown beside each side i (from vertex i to vertex i+1) */
  sideLabels?: (string | null)[];
  highlight?: PolyHighlight;
  /** vertex index used by "angle", "diagonal" and "fan" */
  at?: number;
  /** explicit diagonals as vertex-index pairs (for "diagonal") */
  diagonals?: [number, number][];
  /** mark these vertices with a right-angle square */
  rightAt?: number[];
  /** show the names of the vertices */
  showNames?: boolean;
  /** viewBox height */
  h?: number;
}

export function PolygonFigure({
  n = 5,
  shape = "irregular",
  pts,
  names,
  angles,
  sideLabels,
  highlight = "none",
  at = 0,
  diagonals,
  rightAt,
  showNames = true,
  h = 230,
}: PolygonProps) {
  const p: Pt[] = pts ?? (shape === "regular" || !PRESETS[n === 3 ? "triangle" : n === 4 ? "quadrilateral" : "pentagon"] || n > 5
    ? regularPts(n)
    : PRESETS[n === 3 ? "triangle" : n === 4 ? "quadrilateral" : "pentagon"]);
  const m = p.length;
  const c = centroid(p);
  const nm = names ?? Array.from({ length: m }, (_, i) => LETTERS[i]);
  const path = p.map((q, i) => `${i === 0 ? "M" : "L"} ${q[0]} ${q[1]}`).join(" ") + " Z";

  // diagonals to draw
  let diags: [number, number][] = diagonals ?? [];
  if (!diagonals && highlight === "diagonal") diags = [[at, (at + 2) % m]];
  if (!diagonals && highlight === "fan") {
    diags = [];
    for (let j = 2; j < m - 1; j++) diags.push([at, (at + j) % m]);
  }

  // fan triangles
  const fanTris: Pt[][] = [];
  if (highlight === "fan") {
    for (let j = 1; j < m - 1; j++) fanTris.push([p[at], p[(at + j) % m], p[(at + j + 1) % m]]);
  }

  const sideCls = highlight === "sides" || highlight === "perimeter" ? "dg-accent" : "dg-line";
  const arcSet: number[] = highlight === "angles" ? p.map((_, i) => i) : highlight === "angle" ? [at] : [];

  return (
    <svg viewBox={`0 0 340 ${h}`} width={340} role="img" aria-label={`Polygon with ${m} sides`}>
      {highlight === "region" && <path d={path} className="dg-accent-fill" />}
      {fanTris.map((t, i) => (
        <path
          key={`f${i}`}
          d={`M ${t[0][0]} ${t[0][1]} L ${t[1][0]} ${t[1][1]} L ${t[2][0]} ${t[2][1]} Z`}
          className={i % 2 === 0 ? "dg-accent-fill" : "dg-fill"}
        />
      ))}
      <path d={path} className={sideCls} fill="none" />
      {diags.map(([a, b], i) => (
        <line key={`d${i}`} x1={p[a][0]} y1={p[a][1]} x2={p[b][0]} y2={p[b][1]} className={highlight === "diagonal" ? "dg-accent" : "dg-line dg-dashed"} />
      ))}
      {arcSet.map((i) => (
        <path key={`a${i}`} d={arcAt(p, i, 18)} className="dg-accent" />
      ))}
      {(rightAt ?? []).map((i) => (
        <path key={`r${i}`} d={rightMarkAt(p, i)} className="dg-line dg-thin" />
      ))}
      {p.map((q, i) => (
        <circle key={`p${i}`} cx={q[0]} cy={q[1]} r={highlight === "vertices" ? 4.5 : 3} className={highlight === "vertices" ? "dg-point dg-accent" : "dg-point"} />
      ))}
      {showNames &&
        p.map((q, i) => {
          if (!nm[i]) return null;
          const u = unit(c, q);
          return <Txt key={`n${i}`} at={[r2(q[0] + 15 * u[0]), r2(q[1] + 15 * u[1])]}>{nm[i]}</Txt>;
        })}
      {angles?.map((t, i) => {
        if (!t) return null;
        const u = unit(p[i], p[(i + 1) % m]);
        const w = unit(p[i], p[(i + m - 1) % m]);
        const b = unit([0, 0], [u[0] + w[0], u[1] + w[1]]);
        const half = (interiorAngle(p, i) / 2) * (Math.PI / 180);
        const need = (t.length * 3.7 + 8) / Math.sin(Math.max(0.3, half)) / 1.0;
        const dist = Math.min(64, Math.max(30, need * 0.62));
        return <Txt key={`t${i}`} at={[r2(p[i][0] + dist * b[0]), r2(p[i][1] + dist * b[1])]} cls="dg-text">{t}</Txt>;
      })}
      {sideLabels?.map((t, i) => {
        if (!t) return null;
        const a = p[i];
        const b = p[(i + 1) % m];
        const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const u = unit(c, mid);
        return <Txt key={`s${i}`} at={[r2(mid[0] + 14 * u[0]), r2(mid[1] + 14 * u[1])]} cls="dg-text">{t}</Txt>;
      })}
    </svg>
  );
}

/** The three polygons of the opening definition: triangle, quadrilateral, pentagon side by side. */
export function PolygonFamily() {
  const sh = (pts: Pt[], dx: number, dy: number, s: number): Pt[] => pts.map(([x, y]) => [r2(dx + x * s), r2(dy + y * s)]);
  const tri = sh(PRESETS.triangle, 4, 20, 0.34);
  const quad = sh(PRESETS.quadrilateral, 118, 20, 0.34);
  const pent = sh(PRESETS.pentagon, 232, 20, 0.34);
  const d = (p: Pt[]) => p.map((q, i) => `${i === 0 ? "M" : "L"} ${q[0]} ${q[1]}`).join(" ") + " Z";
  return (
    <svg viewBox="0 0 340 130" width={340} role="img" aria-label="Triangle, quadrilateral and pentagon">
      <path d={d(tri)} className="dg-line" fill="none" />
      <path d={d(quad)} className="dg-line" fill="none" />
      <path d={d(pent)} className="dg-line" fill="none" />
      {[...tri, ...quad, ...pent].map((q, i) => (
        <circle key={i} cx={q[0]} cy={q[1]} r={2.6} className="dg-point" />
      ))}
      <text x={54} y={112} className="dg-text" textAnchor="middle">3 sides</text>
      <text x={168} y={112} className="dg-text" textAnchor="middle">4 sides</text>
      <text x={282} y={112} className="dg-text" textAnchor="middle">5 sides</text>
    </svg>
  );
}

/** A figure that is NOT a polygon in the ETS sense: the interior angle at D is more than 180 degrees. */
export function NonConvex() {
  const A: Pt = [50, 170];
  const B: Pt = [170, 36];
  const C: Pt = [290, 170];
  const D: Pt = [170, 112];
  // reflex interior angle at D: from direction D->C counterclockwise to D->A, going through "up"
  const rr = 20;
  const uC = unit(D, C);
  const uA = unit(D, A);
  const s: Pt = [r2(D[0] + rr * uC[0]), r2(D[1] + rr * uC[1])];
  const e: Pt = [r2(D[0] + rr * uA[0]), r2(D[1] + rr * uA[1])];
  return (
    <svg viewBox="0 0 340 215" width={340} role="img" aria-label="A four-sided figure with an interior angle larger than 180 degrees">
      <path d={`M ${A[0]} ${A[1]} L ${B[0]} ${B[1]} L ${C[0]} ${C[1]} L ${D[0]} ${D[1]} Z`} className="dg-line" fill="none" />
      <path d={`M ${s[0]} ${s[1]} A ${rr} ${rr} 0 1 0 ${e[0]} ${e[1]}`} className="dg-accent" />
      {[A, B, C, D].map((q, i) => (
        <circle key={i} cx={q[0]} cy={q[1]} r={3} className="dg-point" />
      ))}
      <Txt at={[36, 182]}>A</Txt>
      <Txt at={[170, 20]}>B</Txt>
      <Txt at={[304, 182]}>C</Txt>
      <Txt at={[170, 130]}>D</Txt>
      <Txt at={[170, 86]} cls="dg-text">x°</Txt>
    </svg>
  );
}

/** Quadrilateral ABCD split by diagonal AC into two triangles (angle sums 180 + 180). */
export function QuadSplit() {
  return <PolygonFigure pts={PRESETS.quadrilateral} highlight="fan" at={0} />;
}

/** Fan triangulation of an n-gon from vertex A. */
export function Fan({ n = 5, regular = false }: { n?: number; regular?: boolean }) {
  const pts = regular || n > 5 ? regularPts(n) : PRESETS[n === 3 ? "triangle" : n === 4 ? "quadrilateral" : "pentagon"];
  return <PolygonFigure pts={pts} highlight="fan" at={0} />;
}

/** Regular octagon-like figure: a regular n-gon with a chosen number of angles labeled. */
export function RegularFigure({ n = 6, label }: { n?: number; label?: string }) {
  const pts = regularPts(n);
  const angles = pts.map((_, i) => (label && i === 0 ? label : null));
  const names = pts.map((_, i) => LETTERS[i]);
  return <PolygonFigure pts={pts} angles={angles} names={names} highlight="angle" at={0} />;
}

/** Perimeter figure: sides labelled with lengths. */
export function PerimeterFigure() {
  return (
    <PolygonFigure
      pts={[[60, 180], [250, 180], [292, 96], [176, 36], [76, 80]]}
      highlight="perimeter"
      sideLabels={["9", "5", "6", "7", "8"]}
    />
  );
}

/** Area figure: the region enclosed by the polygon shaded. */
export function AreaFigure() {
  return <PolygonFigure pts={PRESETS.pentagon} highlight="region" showNames={false} />;
}

/** Example pentagon with six unknown-angle labels, drawn to the stated angles. */
export function LabeledPentagon() {
  return (
    <PolygonFigure
      pts={[[59.5, 203.5], [239.5, 203.5], [309.9, 71.1], [194.0, 40.0], [50.0, 68.0]]}
      angles={["94°", "118°", "x°", "2x°", "(x + 20)°"]}
      names={["P", "Q", "R", "S", "T"]}
    />
  );
}

/** Regular pentagon ABCDE with diagonal AC drawn and angle EAC marked. */
export function PentagonDiagonal() {
  const pts = regularPts(5, [170, 122], 92, 90 + 36);
  // vertex order: start at lower-left going counterclockwise visually
  const [A, , C, , E] = pts;
  const u1 = unit(A, E);
  const u2 = unit(A, C);
  const rr = 22;
  const s: Pt = [r2(A[0] + rr * u1[0]), r2(A[1] + rr * u1[1])];
  const e: Pt = [r2(A[0] + rr * u2[0]), r2(A[1] + rr * u2[1])];
  const cross = u1[0] * u2[1] - u1[1] * u2[0];
  const c = centroid(pts);
  return (
    <svg viewBox="0 0 340 235" width={340} role="img" aria-label="Regular pentagon ABCDE with diagonal AC">
      <path d={pts.map((q, i) => `${i === 0 ? "M" : "L"} ${q[0]} ${q[1]}`).join(" ") + " Z"} className="dg-line" fill="none" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className="dg-line dg-dashed" />
      <path d={`M ${s[0]} ${s[1]} A ${rr} ${rr} 0 0 ${cross > 0 ? 1 : 0} ${e[0]} ${e[1]}`} className="dg-accent" />
      {pts.map((q, i) => (
        <circle key={i} cx={q[0]} cy={q[1]} r={3} className="dg-point" />
      ))}
      {pts.map((q, i) => {
        const u = unit(c, q);
        return <Txt key={i} at={[r2(q[0] + 15 * u[0]), r2(q[1] + 15 * u[1])]}>{LETTERS[i]}</Txt>;
      })}
    </svg>
  );
}

/** Two quadrilateral-like figures side by side are not needed; hexagon with some interior angles labeled. */
export function LabeledHexagon() {
  return <PolygonFigure n={6} shape="regular" angles={["x°", null, "x°", null, "x°", null]} />;
}

export const registry = {
  "3-2-polygons/polygon": PolygonFigure,
  "3-2-polygons/family": PolygonFamily,
  "3-2-polygons/non-convex": NonConvex,
  "3-2-polygons/quad-split": QuadSplit,
  "3-2-polygons/fan": Fan,
  "3-2-polygons/regular": RegularFigure,
  "3-2-polygons/perimeter": PerimeterFigure,
  "3-2-polygons/area": AreaFigure,
  "3-2-polygons/labeled-pentagon": LabeledPentagon,
  "3-2-polygons/pentagon-diagonal": PentagonDiagonal,
  "3-2-polygons/labeled-hexagon": LabeledHexagon,
};
