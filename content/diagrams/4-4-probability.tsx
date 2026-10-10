// Original diagrams for section 4.4 Probability: two-dice sample-space grid,
// two-stage probability trees, and a Venn diagram of two events.

import { Venn2, type Region2 } from "./4-3-counting-methods";

type Pt = [number, number];

/* ------------------------------------------------------------------ */
/* Sample space of two dice                                              */
/* ------------------------------------------------------------------ */

export type DiceEvent =
  | "none"
  | "doubles"
  | "sum-even"
  | "first-even"
  | "at-least-one-6"
  | "first-less-than-second"
  | `sum=${number}`
  | `sum>=${number}`;

/** Does the outcome (first roll a, second roll b) belong to the named event? */
export function inDiceEvent(ev: DiceEvent, a: number, b: number): boolean {
  if (ev === "none") return false;
  if (ev === "doubles") return a === b;
  if (ev === "sum-even") return (a + b) % 2 === 0;
  if (ev === "first-even") return a % 2 === 0;
  if (ev === "at-least-one-6") return a === 6 || b === 6;
  if (ev === "first-less-than-second") return a < b;
  if (ev.startsWith("sum>=")) return a + b >= Number(ev.slice(5));
  if (ev.startsWith("sum=")) return a + b === Number(ev.slice(4));
  return false;
}

/**
 * The 36 equally likely outcomes of rolling a fair die twice.
 * Cells of event `fill` are shaded; cells of event `outline` get a heavy border,
 * so cells with both marks are the overlap ("both occur").
 */
export function DiceGrid({ fill = "none", outline = "none" }: { fill?: DiceEvent; outline?: DiceEvent }) {
  const c = 28;
  const x0 = 40;
  const y0 = 34;
  const faces = [1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 230 214" width={260} role="img" aria-label="The 36 outcomes of two rolls of a die">
      <text x={x0 + 3 * c} y={10} className="dg-text" textAnchor="middle" dominantBaseline="central">
        second roll
      </text>
      <text x={12} y={y0 + 3 * c} className="dg-text" textAnchor="middle" dominantBaseline="central" transform={`rotate(-90 12 ${y0 + 3 * c})`}>
        first roll
      </text>
      {faces.map((f) => (
        <g key={f}>
          <text x={x0 + (f - 0.5) * c} y={y0 - 10} className="dg-text" textAnchor="middle" dominantBaseline="central">
            {f}
          </text>
          <text x={x0 - 12} y={y0 + (f - 0.5) * c} className="dg-text" textAnchor="middle" dominantBaseline="central">
            {f}
          </text>
        </g>
      ))}
      {faces.map((a) =>
        faces.map((b) => {
          const x = x0 + (b - 1) * c;
          const y = y0 + (a - 1) * c;
          const f = inDiceEvent(fill, a, b);
          const o = inDiceEvent(outline, a, b);
          return (
            <g key={`${a}${b}`}>
              {f && <rect x={x} y={y} width={c} height={c} className="dg-accent-fill" />}
              <rect x={x} y={y} width={c} height={c} className="dg-line dg-thin" />
              {o && <rect x={x + 4} y={y + 4} width={c - 8} height={c - 8} rx={3} className="dg-accent" />}
              {(f || o) && <circle cx={x + c / 2} cy={y + c / 2} r={2.2} className="dg-point" />}
            </g>
          );
        }),
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Two-stage probability tree                                            */
/* ------------------------------------------------------------------ */

export interface TreeBranch {
  label: string; // e.g. "B"
  p: string; // e.g. "5/8"
}
export interface TreeStage1 extends TreeBranch {
  children: (TreeBranch & { result?: string })[]; // result = product shown at the leaf
}

function perp(from: Pt, to: Pt, off: number, sign: 1 | -1): Pt {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const L = Math.hypot(dx, dy) || 1;
  return [(from[0] + to[0]) / 2 + (sign * off * dy) / L, (from[1] + to[1]) / 2 - (sign * off * dx) / L];
}

/**
 * Two-stage tree: branch labels are probabilities, circles carry the outcome names,
 * and each leaf shows the probability of the whole path (the product along it).
 * highlight: list of [firstIndex, secondIndex] paths to draw in the accent color.
 */
export function ProbTree({ stages, highlight = [] }: { stages: TreeStage1[]; highlight?: [number, number][] }) {
  const rowH = 36;
  const leaves = stages.reduce((s, st) => s + st.children.length, 0);
  const H = leaves * rowH + 20;
  const rootX = 14;
  const x1 = 112;
  const x2 = 226;
  const cy = H / 2;
  const R = 13;
  let idx = 0;
  const items = stages.map((st, i) => {
    const ys = st.children.map(() => 10 + (idx++ + 0.5) * rowH);
    return { st, i, ys, y1: (ys[0] + ys[ys.length - 1]) / 2 };
  });
  const isHi = (i: number, j: number) => highlight.some(([a, b]) => a === i && b === j);
  const isHi1 = (i: number) => highlight.some(([a]) => a === i);
  return (
    <svg viewBox={`0 0 340 ${H}`} width={340} role="img" aria-label="Two-stage probability tree">
      <circle cx={rootX} cy={cy} r={3} className="dg-point" />
      {items.map(({ st, i, ys, y1 }) => {
        const from: Pt = [rootX, cy];
        const to: Pt = [x1 - R, y1];
        const dir = y1 < cy ? 1 : -1; // put label on the outer side
        const lp = perp(from, to, 11, y1 === cy ? 1 : dir);
        return (
          <g key={i}>
            <line x1={rootX} y1={cy} x2={x1 - R} y2={y1} className={isHi1(i) ? "dg-accent" : "dg-line"} />
            <text x={lp[0]} y={lp[1]} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
              {st.p}
            </text>
            <circle cx={x1} cy={y1} r={R} className="dg-line" />
            <text x={x1} y={y1} className="dg-text" textAnchor="middle" dominantBaseline="central">
              {st.label}
            </text>
            {st.children.map((ch, j) => {
              const f2: Pt = [x1 + R, y1];
              const t2: Pt = [x2 - R, ys[j]];
              const sg: 1 | -1 = ys[j] < y1 ? 1 : ys[j] > y1 ? -1 : 1;
              const lp2 = perp(f2, t2, 11, sg);
              const hi = isHi(i, j);
              return (
                <g key={j}>
                  <line x1={x1 + R} y1={y1} x2={x2 - R} y2={ys[j]} className={hi ? "dg-accent" : "dg-line"} />
                  <text x={lp2[0]} y={lp2[1]} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
                    {ch.p}
                  </text>
                  <circle cx={x2} cy={ys[j]} r={R} className={hi ? "dg-accent" : "dg-line"} />
                  <text x={x2} y={ys[j]} className="dg-text" textAnchor="middle" dominantBaseline="central">
                    {ch.label}
                  </text>
                  {ch.result && (
                    <text x={x2 + R + 10} y={ys[j]} className="dg-text" dominantBaseline="central" style={hi ? { fontWeight: 700 } : undefined}>
                      {ch.result}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Venn diagram of two events (probabilities in the regions)             */
/* ------------------------------------------------------------------ */

export function EventVenn({
  labels = ["E", "F"],
  counts,
  highlight = [],
  layout = "overlap",
}: {
  labels?: [string, string];
  counts?: Partial<Record<Region2, string | number>>;
  highlight?: Region2[];
  layout?: "overlap" | "disjoint";
}) {
  return <Venn2 labels={labels} counts={counts} highlight={highlight} layout={layout} universeLabel="S" />;
}

export const registry = {
  "4-4-probability/dice-grid": DiceGrid,
  "4-4-probability/prob-tree": ProbTree,
  "4-4-probability/event-venn": EventVenn,
};
