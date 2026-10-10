// Original diagrams for section 3.6 Three-Dimensional Figures.
// Oblique projection: the front face is drawn true-to-shape; depth runs up and to the right.
// SVG coordinates (y grows downward). Hidden edges are dashed.

type Pt = [number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;

function Label({ at, children, cls = "dg-label" }: { at: Pt; children: string; cls?: string }) {
  return (
    <text x={r2(at[0])} y={r2(at[1])} className={cls} textAnchor="middle" dominantBaseline="central">
      {children}
    </text>
  );
}

function Dot({ at, r = 2.6, cls = "dg-point" }: { at: Pt; r?: number; cls?: string }) {
  return <circle cx={r2(at[0])} cy={r2(at[1])} r={r} className={cls} />;
}

function Seg({ p, q, cls = "dg-line" }: { p: Pt; q: Pt; cls?: string }) {
  return <line x1={r2(p[0])} y1={r2(p[1])} x2={r2(q[0])} y2={r2(q[1])} className={cls} />;
}

const poly = (pts: Pt[]) => pts.map((p) => `${r2(p[0])},${r2(p[1])}`).join(" ");

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

/** Point a fraction t of the way from p to q, pushed `off` units perpendicular, on the side away from c. */
function alongLabel(p: Pt, q: Pt, t: number, c: Pt, off = 12): Pt {
  const mx = p[0] + t * (q[0] - p[0]);
  const my = p[1] + t * (q[1] - p[1]);
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

/** Small right-angle square at v with sides toward a and b. */
function rightMark(v: Pt, a: Pt, b: Pt, s = 7): string {
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

/* ------------------------------------------------------------------ */
/* 1. Rectangular solid (oblique view)                                  */
/* ------------------------------------------------------------------ */

export type SolidHighlight = "none" | "dimensions" | "face" | "surface" | "edge" | "vertex" | "diagonals";

export interface SolidProps {
  highlight?: SolidHighlight;
  /** Labels for the front-bottom edge (w), the receding edge (l) and the vertical edge (h). */
  w?: string;
  l?: string;
  h?: string;
  /** Labels for the face diagonal and space diagonal when highlight = "diagonals". */
  f?: string;
  d?: string;
  /** Draw as a cube (equal edges). */
  cube?: boolean;
}

export function RectangularSolid({ highlight = "dimensions", w, l, h, f, d, cube = false }: SolidProps) {
  const W = cube ? 96 : 130;
  const H = cube ? 96 : 80;
  const dx = cube ? 52 : 62;
  const dy = cube ? 40 : 46;
  const x0 = 44;
  const yb = 150;
  const FBL: Pt = [x0, yb];
  const FBR: Pt = [x0 + W, yb];
  const FTL: Pt = [x0, yb - H];
  const FTR: Pt = [x0 + W, yb - H];
  const BBL: Pt = [x0 + dx, yb - dy];
  const BBR: Pt = [x0 + W + dx, yb - dy];
  const BTL: Pt = [x0 + dx, yb - H - dy];
  const BTR: Pt = [x0 + W + dx, yb - H - dy];
  const c: Pt = [x0 + (W + dx) / 2, yb - (H + dy) / 2];

  const dimLabels = highlight === "dimensions" || w !== undefined || l !== undefined || h !== undefined;
  const wl = w ?? (cube ? "s" : "w");
  const ll = l ?? (cube ? "s" : "ℓ");
  const hl = h ?? (cube ? "s" : "h");

  return (
    <svg viewBox="0 0 290 190" width={290} role="img" aria-label={cube ? "A cube" : "A rectangular solid"}>
      {highlight === "face" && <polygon points={poly([FTL, FTR, FBR, FBL])} className="dg-accent-fill" />}
      {highlight === "surface" && (
        <>
          <polygon points={poly([FTL, FTR, FBR, FBL])} className="dg-accent-fill" />
          <polygon points={poly([FTL, FTR, BTR, BTL])} className="dg-accent-fill" />
          <polygon points={poly([FTR, BTR, BBR, FBR])} className="dg-accent-fill" />
        </>
      )}
      {/* hidden edges */}
      <Seg p={FBL} q={BBL} cls="dg-line dg-thin dg-dashed" />
      <Seg p={BBL} q={BTL} cls="dg-line dg-thin dg-dashed" />
      <Seg p={BBL} q={BBR} cls="dg-line dg-thin dg-dashed" />
      {/* visible edges */}
      <polygon points={poly([FTL, FTR, FBR, FBL])} className="dg-line" />
      <Seg p={FTL} q={BTL} />
      <Seg p={FTR} q={BTR} />
      <Seg p={FBR} q={BBR} />
      <Seg p={BTL} q={BTR} />
      <Seg p={BTR} q={BBR} />
      {highlight === "edge" && <Seg p={FTR} q={BTR} cls="dg-accent" />}
      {highlight === "vertex" && (
        <>
          {[FBL, FBR, FTL, FTR, BTL, BTR, BBR, BBL].map((p, i) => (
            <Dot key={i} at={p} r={i === 3 ? 5 : 3} cls={i === 3 ? "dg-accent-fill dg-accent" : "dg-point"} />
          ))}
        </>
      )}
      {highlight === "diagonals" && (
        <>
          <Seg p={FBL} q={BBR} cls="dg-accent dg-thin dg-dashed" />
          <Seg p={FBL} q={BTR} cls="dg-accent" />
          <Dot at={FBL} />
          <Dot at={BBR} />
          <Dot at={BTR} />
          {f !== undefined && <Label at={alongLabel(FBL, BBR, 0.62, c, 11)} cls="dg-text">{f}</Label>}
          {d !== undefined && <Label at={alongLabel(FBL, BTR, 0.3, c, 11)} cls="dg-text">{d}</Label>}
        </>
      )}
      {dimLabels && (
        <>
          <Label at={[x0 + W / 2, yb + 15]} cls={/^[a-zℓ]$/.test(wl) ? "dg-label" : "dg-text"}>{wl}</Label>
          <Label at={sideLabel(FBR, BBR, c, 13)} cls={/^[a-zℓ]$/.test(ll) ? "dg-label" : "dg-text"}>{ll}</Label>
          <Label at={[x0 + W + dx + 13, yb - dy - H / 2]} cls={/^[a-zℓ]$/.test(hl) ? "dg-label" : "dg-text"}>{hl}</Label>
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Right circular cylinder                                           */
/* ------------------------------------------------------------------ */

export type CylinderHighlight = "all" | "base" | "lateral" | "axis" | "none";

export interface CylinderProps {
  highlight?: CylinderHighlight;
  /** Label texts for the radius and the height (default "r" and "h"). */
  r?: string;
  h?: string;
  /** Show the centers P, Q, the axis and the radii (right-angle marks). */
  construction?: boolean;
}

export function RightCircularCylinder({ highlight = "all", r = "r", h = "h", construction = true }: CylinderProps) {
  const cx = 130;
  const rx = 70;
  const ry = 20;
  const yTop = 40;
  const yBot = 160;
  const topC: Pt = [cx, yTop];
  const botC: Pt = [cx, yBot];
  const isLetter = (s: string) => /^[a-z]$/.test(s);
  const showAxis = construction || highlight === "axis";
  return (
    <svg viewBox="0 0 260 205" width={260} role="img" aria-label="A right circular cylinder">
      {highlight === "lateral" && (
        <path
          d={`M ${cx - rx} ${yTop} L ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBot} L ${cx + rx} ${yTop} A ${rx} ${ry} 0 0 1 ${cx - rx} ${yTop} Z`}
          className="dg-accent-fill"
        />
      )}
      {highlight === "base" && <ellipse cx={cx} cy={yTop} rx={rx} ry={ry} className="dg-accent-fill" />}
      {highlight === "base" && (
        <path d={`M ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx - rx} ${yBot} Z`} className="dg-accent-fill" />
      )}
      {/* sides */}
      <Seg p={[cx - rx, yTop]} q={[cx - rx, yBot]} />
      <Seg p={[cx + rx, yTop]} q={[cx + rx, yBot]} />
      {/* top base */}
      <ellipse cx={cx} cy={yTop} rx={rx} ry={ry} className={highlight === "base" ? "dg-accent" : "dg-line"} />
      {/* bottom base: front half solid, back half dashed */}
      <path d={`M ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBot}`} className={highlight === "base" ? "dg-accent" : "dg-line"} />
      <path d={`M ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yBot}`} className="dg-line dg-thin dg-dashed" />
      {showAxis && (
        <>
          <Seg p={topC} q={botC} cls={highlight === "axis" ? "dg-accent dg-dashed" : "dg-line dg-thin dg-dashed"} />
          <Dot at={topC} />
          <Dot at={botC} />
          <Label at={[cx - 12, yTop - 3]}>P</Label>
          <Label at={[cx - 12, yBot + 3]}>Q</Label>
          <Seg p={topC} q={[cx + rx, yTop]} cls="dg-line" />
          <Seg p={botC} q={[cx + rx, yBot]} cls="dg-line dg-thin dg-dashed" />
          <path d={rightMark(topC, [cx, yTop + 10], [cx + rx, yTop], 7)} className="dg-line dg-thin" />
          <path d={rightMark(botC, [cx, yBot - 10], [cx + rx, yBot], 7)} className="dg-line dg-thin" />
          <Label at={[cx + rx / 2, yTop - 9]} cls={isLetter(r) ? "dg-label" : "dg-text"}>{r}</Label>
          <Label at={[cx + 11, (yTop + yBot) / 2]} cls={isLetter(h) ? "dg-label" : "dg-text"}>{h}</Label>
        </>
      )}
      {!showAxis && (
        <>
          <Label at={[cx + rx + 14, (yTop + yBot) / 2]} cls={isLetter(h) ? "dg-label" : "dg-text"}>{h}</Label>
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Cylinder net: lateral surface unrolled                            */
/* ------------------------------------------------------------------ */

export function CylinderNet({ h = "h", circ = "2\u03C0r" }: { h?: string; circ?: string }) {
  const R = 25;
  const Wd = 2 * Math.PI * R; // about 157
  const Hd = 70;
  const x0 = (300 - Wd) / 2;
  const y0 = 20;
  const yc = y0 + Hd / 2;
  const yd = y0 + Hd + 16;
  const isLetter = (s: string) => /^[a-z]$/.test(s);
  return (
    <svg viewBox="0 0 300 140" width={300} role="img" aria-label="Net of a right circular cylinder: a rectangle and two circles">
      <rect x={r2(x0)} y={y0} width={r2(Wd)} height={Hd} className="dg-accent-fill" />
      <rect x={r2(x0)} y={y0} width={r2(Wd)} height={Hd} className="dg-accent" />
      <circle cx={r2(x0 - R)} cy={yc} r={R} className="dg-fill" />
      <circle cx={r2(x0 - R)} cy={yc} r={R} className="dg-line" />
      <circle cx={r2(x0 + Wd + R)} cy={yc} r={R} className="dg-fill" />
      <circle cx={r2(x0 + Wd + R)} cy={yc} r={R} className="dg-line" />
      <Label at={[x0 - R, yc]} cls="dg-text">base</Label>
      <Label at={[x0 + Wd + R, yc]} cls="dg-text">base</Label>
      <Label at={[300 / 2, yc - 9]} cls="dg-text">lateral surface</Label>
      <Label at={[300 / 2, yc + 9]} cls="dg-text">{`${circ} \u00D7 ${h}`}</Label>
      {/* width dimension line */}
      <Seg p={[x0, yd]} q={[x0 + Wd, yd]} cls="dg-line dg-thin" />
      <Seg p={[x0, yd - 4]} q={[x0, yd + 4]} cls="dg-line dg-thin" />
      <Seg p={[x0 + Wd, yd - 4]} q={[x0 + Wd, yd + 4]} cls="dg-line dg-thin" />
      <Label at={[300 / 2, yd + 13]} cls="dg-text">{circ}</Label>
      {/* height dimension line inside the rectangle */}
      <Seg p={[x0 + 12, y0 + 6]} q={[x0 + 12, y0 + Hd - 6]} cls="dg-line dg-thin" />
      <Label at={[x0 + 24, yc]} cls={isLetter(h) ? "dg-label" : "dg-text"}>{h}</Label>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. The other solids the Math Review only names                        */
/* ------------------------------------------------------------------ */

export function NamedSolid({ kind = "sphere" }: { kind?: "sphere" | "cone" | "pyramid" }) {
  if (kind === "sphere") {
    const cx = 100;
    const cy = 95;
    const R = 70;
    return (
      <svg viewBox="0 0 200 190" width={200} role="img" aria-label="A sphere">
        <circle cx={cx} cy={cy} r={R} className="dg-line" />
        <path d={`M ${cx - R} ${cy} A ${R} 20 0 0 0 ${cx + R} ${cy}`} className="dg-line dg-thin" />
        <path d={`M ${cx - R} ${cy} A ${R} 20 0 0 1 ${cx + R} ${cy}`} className="dg-line dg-thin dg-dashed" />
        <Dot at={[cx, cy]} />
      </svg>
    );
  }
  if (kind === "cone") {
    const cx = 100;
    const rx = 62;
    const ry = 18;
    const yb = 150;
    const apex: Pt = [cx, 20];
    return (
      <svg viewBox="0 0 200 190" width={200} role="img" aria-label="A cone">
        <Seg p={apex} q={[cx - rx, yb]} />
        <Seg p={apex} q={[cx + rx, yb]} />
        <path d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yb}`} className="dg-line" />
        <path d={`M ${cx - rx} ${yb} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yb}`} className="dg-line dg-thin dg-dashed" />
      </svg>
    );
  }
  // pyramid with a square base, oblique view
  const FBL: Pt = [30, 140];
  const FBR: Pt = [130, 140];
  const BBL: Pt = [75, 105];
  const BBR: Pt = [175, 105];
  const apex: Pt = [102, 20];
  return (
    <svg viewBox="0 0 200 190" width={200} role="img" aria-label="A pyramid">
      <Seg p={FBL} q={BBL} cls="dg-line dg-thin dg-dashed" />
      <Seg p={BBL} q={BBR} cls="dg-line dg-thin dg-dashed" />
      <Seg p={BBL} q={apex} cls="dg-line dg-thin dg-dashed" />
      <Seg p={FBL} q={FBR} />
      <Seg p={FBR} q={BBR} />
      <Seg p={apex} q={FBL} />
      <Seg p={apex} q={FBR} />
      <Seg p={apex} q={BBR} />
    </svg>
  );
}

export const registry = {
  "3-6-three-dimensional-figures/solid": RectangularSolid,
  "3-6-three-dimensional-figures/cylinder": RightCircularCylinder,
  "3-6-three-dimensional-figures/cylinder-net": CylinderNet,
  "3-6-three-dimensional-figures/named-solid": NamedSolid,
};
