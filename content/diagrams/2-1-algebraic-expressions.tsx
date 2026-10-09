// Original diagrams for section 2.1 Algebraic Expressions.
// Area models are drawn with a = 7 and b = 3 units (scaled); every rectangle is computed from a and b.

import type { ReactNode } from "react";

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Text with an optional exponent rendered as a raised, smaller tspan (works in all browsers via dy). */
export function SupText({
  x,
  y,
  base,
  exp,
  after,
  cls = "dg-label",
  anchor = "middle",
}: {
  x: number;
  y: number;
  base: string;
  exp?: string;
  after?: string;
  cls?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} className={cls} textAnchor={anchor} dominantBaseline="central">
      {base}
      {exp && (
        <tspan dy={-6} fontSize="10">
          {exp}
        </tspan>
      )}
      {exp && after !== undefined && <tspan dy={6}>{after}</tspan>}
      {exp && after === undefined && <tspan dy={6}>{"​"}</tspan>}
    </text>
  );
}

function Rect({ x, y, w, h, cls }: { x: number; y: number; w: number; h: number; cls: string }) {
  return <rect x={r2(x)} y={r2(y)} width={r2(w)} height={r2(h)} className={cls} />;
}

function Lbl({ x, y, children, cls = "dg-label" }: { x: number; y: number; children: ReactNode; cls?: string }) {
  return (
    <text x={r2(x)} y={r2(y)} className={cls} textAnchor="middle" dominantBaseline="central">
      {children}
    </text>
  );
}

/**
 * Area models for identities 3, 4 and 5.
 *   mode "sum":  (a + b)^2 = a^2 + 2ab + b^2
 *   mode "diff": (a - b)^2 = a^2 - 2ab + b^2
 *   mode "dos":  a^2 - b^2 = (a + b)(a - b)
 */
export function AreaModel({
  mode = "sum",
  a = 7,
  b = 3,
  numbers = false,
}: {
  mode?: "sum" | "diff" | "dos";
  a?: number;
  b?: number;
  /** show the numeric values of a, b and the areas instead of the letters (used by the explorer) */
  numbers?: boolean;
}) {
  // a region label is drawn only if the region is big enough to hold it
  const fits = (w: number, h: number) => w >= 24 && h >= 20;
  const sq = (letter: string, v: number, x: number, y: number, w: number, h: number) =>
    !fits(w, h) ? null : numbers ? <Lbl x={x} y={y} cls="dg-text">{String(v)}</Lbl> : <SupText x={x} y={y} base={letter} exp="2" />;
  const txt = (letter: string, v: number, x: number, y: number, w: number, h: number) =>
    !fits(w, h) ? null : numbers ? <Lbl x={x} y={y} cls="dg-text">{String(v)}</Lbl> : <Lbl x={x} y={y}>{letter}</Lbl>;
  const side = (letter: string, v: number) => (numbers ? String(v) : letter);
  if (mode === "sum") {
    const u = 190 / (a + b);
    const x0 = 40;
    const y0 = 30;
    const A = a * u;
    const B = b * u;
    return (
      <svg viewBox="0 0 260 250" width={260} role="img" aria-label="Square of side a plus b split into a squared, two a b rectangles and b squared">
        <Rect x={x0} y={y0} w={A} h={A} cls="dg-fill" />
        <Rect x={x0 + A} y={y0} w={B} h={A} cls="dg-accent-fill" />
        <Rect x={x0} y={y0 + A} w={A} h={B} cls="dg-accent-fill" />
        <Rect x={x0 + A} y={y0 + A} w={B} h={B} cls="dg-fill" />
        <Rect x={x0} y={y0} w={A + B} h={A + B} cls="dg-line" />
        <line x1={x0 + A} y1={y0} x2={x0 + A} y2={y0 + A + B} className="dg-line dg-thin" />
        <line x1={x0} y1={y0 + A} x2={x0 + A + B} y2={y0 + A} className="dg-line dg-thin" />
        {/* side labels */}
        <Lbl x={x0 + A / 2} y={y0 - 13}>{side("a", a)}</Lbl>
        <Lbl x={x0 + A + B / 2} y={y0 - 13}>{side("b", b)}</Lbl>
        <Lbl x={x0 - 14} y={y0 + A / 2}>{side("a", a)}</Lbl>
        <Lbl x={x0 - 14} y={y0 + A + B / 2}>{side("b", b)}</Lbl>
        {/* region labels */}
        {sq("a", a * a, x0 + A / 2, y0 + A / 2, A, A)}
        {txt("ab", a * b, x0 + A + B / 2, y0 + A / 2, B, A)}
        {txt("ab", a * b, x0 + A / 2, y0 + A + B / 2, A, B)}
        {sq("b", b * b, x0 + A + B / 2, y0 + A + B / 2, B, B)}
      </svg>
    );
  }
  if (mode === "diff") {
    const u = 190 / a;
    const x0 = 50;
    const y0 = 30;
    const A = a * u;
    const B = b * u;
    const D = A - B; // a - b
    return (
      <svg viewBox="0 0 270 250" width={270} role="img" aria-label="Square of side a containing the square of side a minus b">
        <Rect x={x0} y={y0} w={D} h={D} cls="dg-accent-fill" />
        <Rect x={x0 + D} y={y0 + D} w={B} h={B} cls="dg-fill" />
        <Rect x={x0} y={y0} w={A} h={A} cls="dg-line" />
        <Rect x={x0} y={y0} w={D} h={D} cls="dg-accent" />
        <line x1={x0 + D} y1={y0} x2={x0 + D} y2={y0 + A} className="dg-line dg-thin dg-dashed" />
        <line x1={x0} y1={y0 + D} x2={x0 + A} y2={y0 + D} className="dg-line dg-thin dg-dashed" />
        <Lbl x={x0 + D / 2} y={y0 - 13}>{side("a − b", a - b)}</Lbl>
        <Lbl x={x0 + D + B / 2} y={y0 - 13}>{side("b", b)}</Lbl>
        <Lbl x={x0 - 22} y={y0 + D / 2}>{side("a − b", a - b)}</Lbl>
        <Lbl x={x0 - 14} y={y0 + D + B / 2}>{side("b", b)}</Lbl>
        {D >= 50 || numbers ? sq("(a − b)", (a - b) * (a - b), x0 + D / 2, y0 + D / 2, D, D) : null}
        {sq("b", b * b, x0 + D + B / 2, y0 + D + B / 2, B, B)}
      </svg>
    );
  }
  // difference of squares: L-shape, then the same two pieces rearranged into an (a + b) by (a - b) rectangle
  const u = 90 / a;
  const A = a * u;
  const B = b * u;
  const D = A - B;
  const x0 = 46;
  const y0 = 30;
  // right panel
  const x1 = 176;
  const y1 = 30 + B; // align bottoms loosely
  const W = A + B;
  return (
    <svg viewBox="0 0 360 160" width={360} role="img" aria-label="a squared minus b squared rearranged into a rectangle a plus b by a minus b">
      {/* left: a-by-a square with the b-by-b corner removed */}
      <Rect x={x0} y={y0} w={A} h={D} cls="dg-fill" />
      <Rect x={x0} y={y0 + D} w={D} h={B} cls="dg-accent-fill" />
      <path
        d={`M ${x0} ${y0} H ${r2(x0 + A)} V ${r2(y0 + D)} H ${r2(x0 + D)} V ${r2(y0 + A)} H ${x0} Z`}
        className="dg-line"
      />
      <Rect x={x0 + D} y={y0 + D} w={B} h={B} cls="dg-line dg-thin dg-dashed" />
      <line x1={x0} y1={y0 + D} x2={x0 + D} y2={y0 + D} className="dg-line dg-thin" />
      <Lbl x={x0 + A / 2} y={y0 - 13}>{side("a", a)}</Lbl>
      {D >= 14 && <Lbl x={x0 - 22} y={y0 + D / 2}>{side("a − b", a - b)}</Lbl>}
      <Lbl x={x0 - 13} y={y0 + D + B / 2}>{side("b", b)}</Lbl>
      {sq("b", b * b, x0 + D + B / 2, y0 + D + B / 2, B, B)}
      <Lbl x={x0 + D / 2} y={y0 + A + 13}>{side("a − b", a - b)}</Lbl>
      {/* arrow */}
      <line x1={144} y1={80} x2={166} y2={80} className="dg-line dg-thin" />
      <path d="M 166 80 L 159 76 L 159 84 Z" className="dg-point" />
      {/* right: (a + b) by (a - b) rectangle */}
      <Rect x={x1} y={y1} w={A} h={D} cls="dg-fill" />
      <Rect x={x1 + A} y={y1} w={B} h={D} cls="dg-accent-fill" />
      <Rect x={x1} y={y1} w={W} h={D} cls="dg-line" />
      <line x1={x1 + A} y1={y1} x2={x1 + A} y2={y1 + D} className="dg-line dg-thin" />
      <Lbl x={x1 + A / 2} y={y1 - 13}>{side("a", a)}</Lbl>
      <Lbl x={x1 + A + B / 2} y={y1 - 13}>{side("b", b)}</Lbl>
      <Lbl x={x1 + W / 2} y={y1 + D + 14}>{side("a + b", a + b)}</Lbl>
    </svg>
  );
}

/**
 * Multiplication grid for (2x - 3)(x + 4): every term of the first factor times every term of the second.
 */
export function ProductGrid() {
  const x0 = 70;
  const y0 = 40;
  const cw = 110;
  const ch = 50;
  return (
    <svg viewBox="0 0 300 150" width={300} role="img" aria-label="Grid multiplying 2x minus 3 by x plus 4">
      <rect x={x0} y={y0} width={cw} height={ch} className="dg-fill" />
      <rect x={x0 + cw} y={y0} width={cw} height={ch} className="dg-accent-fill" />
      <rect x={x0} y={y0 + ch} width={cw} height={ch} className="dg-accent-fill" />
      <rect x={x0 + cw} y={y0 + ch} width={cw} height={ch} className="dg-fill" />
      <rect x={x0} y={y0} width={2 * cw} height={2 * ch} className="dg-line" />
      <line x1={x0 + cw} y1={y0} x2={x0 + cw} y2={y0 + 2 * ch} className="dg-line dg-thin" />
      <line x1={x0} y1={y0 + ch} x2={x0 + 2 * cw} y2={y0 + ch} className="dg-line dg-thin" />
      {/* headers */}
      <Lbl x={x0 + cw / 2} y={y0 - 16}>2x</Lbl>
      <Lbl x={x0 + 1.5 * cw} y={y0 - 16}>−3</Lbl>
      <Lbl x={x0 - 22} y={y0 + ch / 2}>x</Lbl>
      <Lbl x={x0 - 22} y={y0 + 1.5 * ch}>+4</Lbl>
      {/* cells */}
      <SupText x={x0 + cw / 2} y={y0 + ch / 2} base="2x" exp="2" />
      <Lbl x={x0 + 1.5 * cw} y={y0 + ch / 2}>−3x</Lbl>
      <Lbl x={x0 + cw / 2} y={y0 + 1.5 * ch}>8x</Lbl>
      <Lbl x={x0 + 1.5 * cw} y={y0 + 1.5 * ch}>−12</Lbl>
    </svg>
  );
}

export const registry = {
  "2-1-algebraic-expressions/area-model": AreaModel,
  "2-1-algebraic-expressions/product-grid": ProductGrid,
};
