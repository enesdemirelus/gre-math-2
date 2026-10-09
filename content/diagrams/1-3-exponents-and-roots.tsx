// Original diagrams for section 1.3 Exponents and Roots.
// Number lines are drawn to scale (MC p. 11): positions are computed from the values.

type Tick = { value: number; label?: string };
type Mark = { value: number; label: string };

const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * A horizontal number line drawn to scale, with arrowheads at both ends,
 * labeled tick marks below the line and labeled points above it.
 */
export function NumberLine({
  min = -2,
  max = 2,
  ticks = [
    { value: -1, label: "−1" },
    { value: 0, label: "0" },
    { value: 1, label: "1" },
  ],
  points = [{ value: -0.4, label: "x" }],
}: {
  min?: number;
  max?: number;
  ticks?: Tick[];
  points?: Mark[];
}) {
  const W = 340;
  const pad = 26;
  const y = 44;
  const X = (v: number) => r2(pad + ((v - min) / (max - min)) * (W - 2 * pad));
  const arrow = 7;
  return (
    <svg viewBox={`0 0 ${W} 78`} width={W} role="img" aria-label="Number line">
      <line x1={8} y1={y} x2={W - 8} y2={y} className="dg-line" />
      <path d={`M ${8 + arrow} ${y - arrow / 1.6} L 8 ${y} L ${8 + arrow} ${y + arrow / 1.6}`} className="dg-line" />
      <path d={`M ${W - 8 - arrow} ${y - arrow / 1.6} L ${W - 8} ${y} L ${W - 8 - arrow} ${y + arrow / 1.6}`} className="dg-line" />
      {ticks.map((t) => (
        <g key={`t${t.value}`}>
          <line x1={X(t.value)} y1={y - 6} x2={X(t.value)} y2={y + 6} className="dg-line dg-thin" />
          {t.label !== undefined && (
            <text x={X(t.value)} y={y + 22} className="dg-text" textAnchor="middle">
              {t.label}
            </text>
          )}
        </g>
      ))}
      {points.map((p) => (
        <g key={`p${p.label}`}>
          <circle cx={X(p.value)} cy={y} r={3.5} className="dg-point" />
          <text x={X(p.value)} y={y - 13} className="dg-label" textAnchor="middle">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export const registry = {
  "1-3-exponents-and-roots/number-line": NumberLine,
};
