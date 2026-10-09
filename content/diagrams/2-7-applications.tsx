// Diagrams for section 2.7 Applications.

interface MixtureBarsProps {
  /** Total amount before (e.g. liters) */
  before?: number;
  /** Total amount after */
  after?: number;
  /** Amount of the tracked ingredient (unchanged) */
  part?: number;
  unit?: string;
  partLabel?: string;
}

const fmt = (n: number) => String(Math.round(n * 100) / 100);

/** Two bars drawn to scale: same ingredient amount, larger total after adding water. */
export function MixtureBars({ before = 20, after = 50, part = 6, unit = "L", partLabel = "salt" }: MixtureBarsProps) {
  const x0 = 62;
  const maxW = 280;
  const scale = maxW / Math.max(before, after);
  const h = 26;
  const rows = [
    { y: 26, total: before, label: "before" },
    { y: 96, total: after, label: "after" },
  ];
  const pw = part * scale;
  return (
    <svg viewBox="0 0 360 150" width={360} role="img" aria-label={`Mixture bars: ${part} ${unit} of ${partLabel} in ${before} ${unit}, then in ${after} ${unit}`}>
      {rows.map((r) => {
        const w = r.total * scale;
        const pct = Math.round((part / r.total) * 1000) / 10;
        return (
          <g key={r.label}>
            <text x={x0 - 8} y={r.y + h / 2} className="dg-text" textAnchor="end" dominantBaseline="central">
              {r.label}
            </text>
            <rect x={x0} y={r.y} width={pw} height={h} className="dg-accent-fill" />
            <rect x={x0} y={r.y} width={w} height={h} className="dg-line" />
            <line x1={x0 + pw} y1={r.y} x2={x0 + pw} y2={r.y + h} className="dg-accent" />
            <text x={x0 + pw / 2} y={r.y + h + 15} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
              {`${fmt(part)} ${unit} ${partLabel}`}
            </text>
            <text x={x0 + w} y={r.y - 7} className="dg-text" textAnchor="end" style={{ fontSize: 12 }}>
              {`total ${fmt(r.total)} ${unit} · ${pct}% ${partLabel}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export const registry = {
  "2-7-applications/mixture-bars": MixtureBars,
};
