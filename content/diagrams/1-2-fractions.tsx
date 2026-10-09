// Original diagrams for section 1.2 Fractions.
// Number lines are drawn to scale (MC p. 11): x = X0 + (value - min) * scale.

const r2 = (n: number) => Math.round(n * 100) / 100;

/** A stacked fraction label "n/d" centered at (x, y) (y = the fraction bar). Sign is drawn in front. */
function FracText({ x, y, n, d }: { x: number; y: number; n: number; d: number }) {
  if (d === 1) {
    return (
      <text x={x} y={y} className="dg-text" textAnchor="middle" dominantBaseline="central">
        {n < 0 ? `−${-n}` : `${n}`}
      </text>
    );
  }
  const neg = n < 0;
  const a = Math.abs(n);
  const w = Math.max(String(a).length, String(d).length) * 7.5 + 4;
  const cx = neg ? x + 5 : x;
  return (
    <g>
      {neg && (
        <text x={cx - w / 2 - 6} y={y} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {"−"}
        </text>
      )}
      <text x={cx} y={y - 8} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
        {a}
      </text>
      <line x1={r2(cx - w / 2)} y1={y} x2={r2(cx + w / 2)} y2={y} className="dg-line dg-thin" />
      <text x={cx} y={y + 9} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
        {d}
      </text>
    </g>
  );
}

export interface NLPoint {
  n: number;
  d: number;
  /** "above" (default) or "below" the line, to keep close labels apart */
  side?: "above" | "below";
  accent?: boolean;
}

/** Number line from min to max (integers) with minor ticks every 1/den; points labeled as fractions. */
export function FractionNumberLine({
  min = -2,
  max = 2,
  den = 2,
  points = [],
}: {
  min?: number;
  max?: number;
  den?: number;
  points?: NLPoint[];
}) {
  const W = 340;
  const X0 = 20;
  const X1 = 320;
  const Y = 62;
  const scale = (X1 - X0) / (max - min);
  const xOf = (v: number) => r2(X0 + (v - min) * scale);
  const ticks: { v: number; major: boolean }[] = [];
  for (let k = min * den; k <= max * den; k++) ticks.push({ v: k / den, major: k % den === 0 });
  return (
    <svg viewBox={`0 0 ${W} 124`} width={W} role="img" aria-label="Number line with fractions">
      <line x1={X0 - 12} y1={Y} x2={X1 + 12} y2={Y} className="dg-line" />
      <path d={`M ${X1 + 12} ${Y} l -7 -4 v 8 z`} className="dg-point" />
      <path d={`M ${X0 - 12} ${Y} l 7 -4 v 8 z`} className="dg-point" />
      {ticks.map((t) => (
        <line
          key={t.v}
          x1={xOf(t.v)}
          y1={Y - (t.major ? 6 : 3.5)}
          x2={xOf(t.v)}
          y2={Y + (t.major ? 6 : 3.5)}
          className={t.major ? "dg-line" : "dg-line dg-thin"}
        />
      ))}
      {ticks
        .filter((t) => t.major)
        .map((t) => (
          <text key={`l${t.v}`} x={xOf(t.v)} y={Y + 18} className="dg-text" textAnchor="middle" dominantBaseline="central">
            {t.v < 0 ? `−${-t.v}` : `${t.v}`}
          </text>
        ))}
      {points.map((p, i) => {
        const x = xOf(p.n / p.d);
        const below = p.side === "below";
        return (
          <g key={i}>
            <circle cx={x} cy={Y} r={4} className="dg-point" />
            {p.accent && <circle cx={x} cy={Y} r={8} className="dg-accent" />}
            <FracText x={x} y={below ? Y + 42 : Y - 30} n={p.n} d={p.d} />
          </g>
        );
      })}
    </svg>
  );
}

/** Bars showing that n/d, (2n)/(2d), (4n)/(4d), ... cover the same length. */
export function FractionBars({ n = 2, d = 3, multipliers = [1, 2, 4] }: { n?: number; d?: number; multipliers?: number[] }) {
  const X0 = 64;
  const L = 260;
  const H = 22;
  const gap = 16;
  const W = 340;
  const height = multipliers.length * (H + gap) + 6;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} width={W} role="img" aria-label={`Equivalent fractions of ${n}/${d}`}>
      {multipliers.map((k, row) => {
        const y = 4 + row * (H + gap);
        const parts = d * k;
        const filled = n * k;
        const w = L / parts;
        return (
          <g key={k}>
            <FracText x={30} y={y + H / 2} n={filled} d={parts} />
            <rect x={X0} y={y} width={r2(w * filled)} height={H} className="dg-accent-fill" />
            {Array.from({ length: parts }, (_, j) => (
              <rect key={j} x={r2(X0 + j * w)} y={y} width={r2(w)} height={H} className="dg-line dg-thin" />
            ))}
            <rect x={X0} y={y} width={L} height={H} className="dg-line" />
          </g>
        );
      })}
      <line
        x1={r2(X0 + (L * n) / d)}
        y1={2}
        x2={r2(X0 + (L * n) / d)}
        y2={height - 2}
        className="dg-accent dg-dashed"
        style={{ strokeWidth: 1.4 }}
      />
    </svg>
  );
}

export const registry = {
  "1-2-fractions/number-line": FractionNumberLine,
  "1-2-fractions/fraction-bars": FractionBars,
};
