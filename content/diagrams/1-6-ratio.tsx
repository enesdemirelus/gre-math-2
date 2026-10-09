// Original diagrams for section 1.6 Ratio: bar ("parts") models.

const r2 = (n: number) => Math.round(n * 100) / 100;

export interface RatioGroup {
  /** name shown above the group, e.g. "boys" */
  label: string;
  /** number of equal parts in the ratio */
  parts: number;
  /** optional text under the group, e.g. "15" */
  value?: string;
}

const FILLS = [
  { className: "dg-accent-fill" },
  { className: "dg-fill" },
  { className: "dg-accent-fill", style: { fillOpacity: 0.42 } },
];

/** A bar split into equal parts, grouped by quantity. */
export function RatioBar({
  groups,
  partText,
  total,
  width = 340,
}: {
  groups: RatioGroup[];
  /** text written in every part, e.g. "5" */
  partText?: string;
  /** text for a bracket under the whole bar, e.g. "total 35" */
  total?: string;
  width?: number;
}) {
  const pad = 14;
  const S = groups.reduce((s, g) => s + g.parts, 0);
  const u = (width - 2 * pad) / S;
  const top = 34;
  const h = 34;
  const hasValues = groups.some((g) => g.value);
  const yVal = top + h + 18;
  const yTot = (hasValues ? yVal + 12 : top + h + 12);
  const H = total ? yTot + 30 : hasValues ? yVal + 10 : top + h + 12;
  let start = 0;
  return (
    <svg viewBox={`0 0 ${width} ${H}`} width={width} role="img" aria-label={`Bar model ${groups.map((g) => g.parts).join(" to ")}`}>
      {groups.map((g, gi) => {
        const x0 = r2(pad + start * u);
        const x1 = r2(pad + (start + g.parts) * u);
        const cells = Array.from({ length: g.parts }, (_, k) => start + k);
        start += g.parts;
        const fill = FILLS[gi % FILLS.length];
        return (
          <g key={gi}>
            {cells.map((c) => (
              <rect
                key={c}
                x={r2(pad + c * u)}
                y={top}
                width={r2(u)}
                height={h}
                className={fill.className}
                style={"style" in fill ? fill.style : undefined}
              />
            ))}
            {cells.map((c) => (
              <rect key={`o${c}`} x={r2(pad + c * u)} y={top} width={r2(u)} height={h} className="dg-line dg-thin" />
            ))}
            {partText &&
              cells.map((c) => (
                <text key={`t${c}`} x={r2(pad + (c + 0.5) * u)} y={top + h / 2 + 5} className="dg-text" textAnchor="middle" style={{ fontSize: 13 }}>
                  {partText}
                </text>
              ))}
            <rect x={x0} y={top} width={r2(x1 - x0)} height={h} className="dg-line" />
            {/* group bracket above */}
            <path d={`M ${x0 + 2} ${top - 6} L ${x0 + 2} ${top - 11} L ${x1 - 2} ${top - 11} L ${x1 - 2} ${top - 6}`} className="dg-line dg-thin" />
            <text x={r2((x0 + x1) / 2)} y={top - 16} className="dg-text" textAnchor="middle" style={{ fontSize: 13 }}>
              {g.label}
            </text>
            {g.value && (
              <text x={r2((x0 + x1) / 2)} y={yVal} className="dg-text" textAnchor="middle" style={{ fontSize: 13, fontWeight: 600 }}>
                {g.value}
              </text>
            )}
          </g>
        );
      })}
      {total && (
        <>
          <path
            d={`M ${pad} ${yTot} L ${pad} ${yTot + 6} L ${width - pad} ${yTot + 6} L ${width - pad} ${yTot}`}
            className="dg-line dg-thin"
          />
          <text x={width / 2} y={yTot + 22} className="dg-text" textAnchor="middle" style={{ fontSize: 13 }}>
            {total}
          </text>
        </>
      )}
    </svg>
  );
}

/** Lesson figure: boys to girls is 3 to 4 with 35 students, so each part is 5. */
export function BoysGirlsBar() {
  return (
    <RatioBar
      groups={[
        { label: "boys: 3 parts", parts: 3, value: "15" },
        { label: "girls: 4 parts", parts: 4, value: "20" },
      ]}
      partText="5"
      total="7 parts = 35 students"
    />
  );
}

/** Term figure: a plain 2 to 3 ratio. */
export function SimpleRatioBar() {
  return (
    <RatioBar
      groups={[
        { label: "s: 2 parts", parts: 2 },
        { label: "t: 3 parts", parts: 3 },
      ]}
    />
  );
}

/** Three-term ratio 2 to 3 to 5. */
export function ThreeTermBar() {
  return (
    <RatioBar
      groups={[
        { label: "r", parts: 2 },
        { label: "s", parts: 3 },
        { label: "t", parts: 5 },
      ]}
    />
  );
}

export const registry = {
  "1-6-ratio/ratio-bar": RatioBar,
  "1-6-ratio/boys-girls": BoysGirlsBar,
  "1-6-ratio/simple-ratio": SimpleRatioBar,
  "1-6-ratio/three-term": ThreeTermBar,
};
