// Original diagrams for section 4.3 Counting Methods: Venn diagrams (2 and 3 sets),
// a sequential-choice tree, and "slot" boxes for the multiplication principle.

type Pt = [number, number];
type Circle = { cx: number; cy: number; r: number };
type Count = string | number;

/* ------------------------------------------------------------------ */
/* Shared: highlighted Venn region = (inside all `inn`) minus (any `out`) */
/* ------------------------------------------------------------------ */

function Region({ id, W, H, circles, inn, out }: { id: string; W: number; H: number; circles: Circle[]; inn: number[]; out: number[] }) {
  const maskId = `${id}-m`;
  let node = <rect x={0} y={0} width={W} height={H} className="dg-accent-fill" mask={out.length ? `url(#${maskId})` : undefined} />;
  for (const i of [...inn].reverse()) {
    node = <g clipPath={`url(#${id}-c${i})`}>{node}</g>;
  }
  return (
    <g>
      <defs>
        {inn.map((i) => (
          <clipPath key={i} id={`${id}-c${i}`}>
            <circle cx={circles[i].cx} cy={circles[i].cy} r={circles[i].r} />
          </clipPath>
        ))}
        {out.length > 0 && (
          <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
            <rect x={0} y={0} width={W} height={H} fill="white" />
            {out.map((i) => (
              <circle key={i} cx={circles[i].cx} cy={circles[i].cy} r={circles[i].r} fill="black" />
            ))}
          </mask>
        )}
      </defs>
      {node}
    </g>
  );
}

function Txt({ at, children, cls = "dg-text" }: { at: Pt; children: Count; cls?: string }) {
  return (
    <text x={at[0]} y={at[1]} className={cls} textAnchor="middle" dominantBaseline="central">
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ */
/* Venn diagram, two sets                                               */
/* ------------------------------------------------------------------ */

export type Region2 = "a" | "b" | "ab" | "none";
export type Venn2Layout = "overlap" | "disjoint" | "subset";

const SPEC2: Record<Region2, { inn: number[]; out: number[] }> = {
  a: { inn: [0], out: [1] },
  b: { inn: [1], out: [0] },
  ab: { inn: [0, 1], out: [] },
  none: { inn: [], out: [0, 1] },
};

const LAYOUT2: Record<Venn2Layout, { circles: Circle[]; pos: Record<Region2, Pt>; names: [Pt, Pt] }> = {
  overlap: {
    circles: [
      { cx: 105, cy: 100, r: 62 },
      { cx: 175, cy: 100, r: 62 },
    ],
    pos: { a: [74, 100], ab: [140, 100], b: [206, 100], none: [234, 174] },
    names: [
      [56, 30],
      [224, 30],
    ],
  },
  disjoint: {
    circles: [
      { cx: 85, cy: 100, r: 50 },
      { cx: 195, cy: 100, r: 50 },
    ],
    pos: { a: [85, 100], ab: [140, 100], b: [195, 100], none: [234, 174] },
    names: [
      [85, 34],
      [195, 34],
    ],
  },
  subset: {
    circles: [
      { cx: 150, cy: 100, r: 38 },
      { cx: 140, cy: 100, r: 75 },
    ],
    pos: { a: [150, 100], ab: [150, 112], b: [88, 100], none: [234, 174] },
    names: [
      [150, 84],
      [218, 26],
    ],
  },
};

/**
 * Two-set Venn diagram inside a rectangle (the universal set).
 * highlight: regions to shade ("a" = in A only, "b" = in B only, "ab" = in both, "none" = in neither).
 * counts: optional numbers (or text) printed in each region. In the "subset" layout, A lies inside B,
 * so "ab" is all of A and "b" is the part of B outside A.
 */
export function Venn2({
  labels = ["A", "B"],
  counts,
  highlight = [],
  layout = "overlap",
  universe = true,
  universeLabel = "U",
}: {
  labels?: [string, string];
  counts?: Partial<Record<Region2, Count>>;
  highlight?: Region2[];
  layout?: Venn2Layout;
  universe?: boolean;
  universeLabel?: string;
}) {
  const W = 280;
  const H = 200;
  const L = LAYOUT2[layout];
  const id = `v2-${layout}`;
  const regions = (Object.keys(SPEC2) as Region2[]).filter((k) => !(layout === "disjoint" && k === "ab") && !(layout === "subset" && k === "a"));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={300} role="img" aria-label="Venn diagram of two sets">
      {universe && <rect x={8} y={8} width={W - 16} height={H - 16} className="dg-line" />}
      {highlight
        .filter((k) => regions.includes(k) && (universe || k !== "none"))
        .map((k) => (
          <Region key={`${k}`} id={`${id}-${k}`} W={W} H={H} circles={L.circles} inn={SPEC2[k].inn} out={SPEC2[k].out} />
        ))}
      {L.circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} className="dg-line" />
      ))}
      {universe && (
        <Txt at={[24, 24]} cls="dg-label">
          {universeLabel}
        </Txt>
      )}
      <Txt at={L.names[0]} cls="dg-label">
        {labels[0]}
      </Txt>
      <Txt at={L.names[1]} cls="dg-label">
        {labels[1]}
      </Txt>
      {counts &&
        regions.map((k) => (counts[k] === undefined || (k === "none" && !universe) ? null : <Txt key={k} at={L.pos[k]}>{counts[k] as Count}</Txt>))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Venn diagram, three sets                                             */
/* ------------------------------------------------------------------ */

export type Region3 = "a" | "b" | "c" | "ab" | "ac" | "bc" | "abc" | "none";

const C3: Circle[] = [
  { cx: 115, cy: 95, r: 58 },
  { cx: 185, cy: 95, r: 58 },
  { cx: 150, cy: 155, r: 58 },
];

const SPEC3: Record<Region3, { inn: number[]; out: number[] }> = {
  a: { inn: [0], out: [1, 2] },
  b: { inn: [1], out: [0, 2] },
  c: { inn: [2], out: [0, 1] },
  ab: { inn: [0, 1], out: [2] },
  ac: { inn: [0, 2], out: [1] },
  bc: { inn: [1, 2], out: [0] },
  abc: { inn: [0, 1, 2], out: [] },
  none: { inn: [], out: [0, 1, 2] },
};

const POS3: Record<Region3, Pt> = {
  a: [90, 74],
  b: [210, 74],
  c: [150, 190],
  ab: [150, 70],
  ac: [118, 133],
  bc: [182, 133],
  abc: [150, 113],
  none: [262, 232],
};

/**
 * Three-set Venn diagram. Region keys name the elements' membership exactly:
 * "a" = in A only, "ab" = in A and B but not C, "abc" = in all three, "none" = in none of them.
 */
export function Venn3({
  labels = ["A", "B", "C"],
  counts,
  highlight = [],
  universe = true,
}: {
  labels?: [string, string, string];
  counts?: Partial<Record<Region3, Count>>;
  highlight?: Region3[];
  universe?: boolean;
}) {
  const W = 300;
  const H = 260;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={320} role="img" aria-label="Venn diagram of three sets">
      {universe && <rect x={8} y={8} width={W - 16} height={H - 16} className="dg-line" />}
      {highlight.map((k) => (
        <Region key={k} id={`v3-${k}`} W={W} H={H} circles={C3} inn={SPEC3[k].inn} out={SPEC3[k].out} />
      ))}
      {C3.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} className="dg-line" />
      ))}
      {universe && (
        <Txt at={[24, 24]} cls="dg-label">
          U
        </Txt>
      )}
      <Txt at={[58, 38]} cls="dg-label">
        {labels[0]}
      </Txt>
      <Txt at={[242, 38]} cls="dg-label">
        {labels[1]}
      </Txt>
      <Txt at={[222, 218]} cls="dg-label">
        {labels[2]}
      </Txt>
      {counts &&
        (Object.keys(POS3) as Region3[]).map((k) => (counts[k] === undefined || (k === "none" && !universe) ? null : <Txt key={k} at={POS3[k]}>{counts[k] as Count}</Txt>))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Tree for two sequential, independent choices                         */
/* ------------------------------------------------------------------ */

/**
 * Every path from the root to a leaf is one possible pair of choices.
 * first: names of the first choice's options; second: names of the second choice's options.
 */
export function ChoiceTree({ first = ["S1", "S2"], second = ["P1", "P2", "P3"], firstTitle, secondTitle }: { first?: string[]; second?: string[]; firstTitle?: string; secondTitle?: string }) {
  const rowH = 34;
  const leaves = first.length * second.length;
  const top = firstTitle || secondTitle ? 30 : 12;
  const H = leaves * rowH + top + 10;
  const rootX = 16;
  const x1 = 100;
  const x2 = 200;
  const cy = top + (leaves * rowH) / 2;
  const leafY = (i: number, j: number) => top + (i * second.length + j) * rowH + rowH / 2;
  const firstY = (i: number) => (leafY(i, 0) + leafY(i, second.length - 1)) / 2;
  const lab = (x: number, y: number, t: string, cls = "dg-text") => (
    <text x={x} y={y} className={cls} textAnchor="middle" dominantBaseline="central">
      {t}
    </text>
  );
  return (
    <svg viewBox={`0 0 300 ${H}`} width={300} role="img" aria-label="Tree diagram of two sequential choices">
      {firstTitle && lab(x1, 12, firstTitle)}
      {secondTitle && lab(x2, 12, secondTitle)}
      {first.map((f, i) => (
        <g key={i}>
          <line x1={rootX} y1={cy} x2={x1 - 14} y2={firstY(i)} className="dg-line" />
          <circle cx={x1} cy={firstY(i)} r={14} className="dg-line" />
          {lab(x1, firstY(i), f)}
          {second.map((s, j) => (
            <g key={j}>
              <line x1={x1 + 14} y1={firstY(i)} x2={x2 - 14} y2={leafY(i, j)} className="dg-line" />
              <circle cx={x2} cy={leafY(i, j)} r={14} className="dg-line" />
              {lab(x2, leafY(i, j), s)}
              <text x={x2 + 24} y={leafY(i, j)} className="dg-text" dominantBaseline="central">
                {`${f}, ${s}`}
              </text>
            </g>
          ))}
        </g>
      ))}
      <circle cx={rootX} cy={cy} r={3} className="dg-point" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Slots: boxes with the number of options for each position            */
/* ------------------------------------------------------------------ */

/** A row of boxes joined by multiplication signs, e.g. 7 x 6 x 5 = 210. */
export function Slots({ items, result, names }: { items: Count[]; result?: Count; names?: string[] }) {
  const bw = 46;
  const gap = 24;
  const n = items.length;
  const rowW = n * bw + (n - 1) * gap;
  const resW = result !== undefined ? 90 : 0;
  const W = rowW + resW + 20;
  const H = names ? 78 : 56;
  const y0 = 10;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={Math.min(W, 340)} role="img" aria-label="Slots for the multiplication principle">
      {items.map((it, i) => {
        const x = 10 + i * (bw + gap);
        return (
          <g key={i}>
            <rect x={x} y={y0} width={bw} height={38} rx={4} className="dg-line" />
            <Txt at={[x + bw / 2, y0 + 19]}>{it}</Txt>
            {i < n - 1 && <Txt at={[x + bw + gap / 2, y0 + 19]}>×</Txt>}
            {names && (
              <text x={x + bw / 2} y={y0 + 56} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12 }}>
                {names[i]}
              </text>
            )}
          </g>
        );
      })}
      {result !== undefined && (
        <g>
          <Txt at={[10 + rowW + 14, y0 + 19]}>=</Txt>
          <text x={10 + rowW + 28} y={y0 + 19} className="dg-text" dominantBaseline="central" style={{ fontWeight: 700 }}>
            {result}
          </text>
        </g>
      )}
    </svg>
  );
}

export const registry = {
  "4-3-counting-methods/venn2": Venn2,
  "4-3-counting-methods/venn3": Venn3,
  "4-3-counting-methods/choice-tree": ChoiceTree,
  "4-3-counting-methods/slots": Slots,
};
