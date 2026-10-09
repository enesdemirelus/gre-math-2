// Original diagrams for section 1.1 Integers.
// Number lines are drawn to scale from props.

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Quotient and remainder with 0 <= r < |d| (MR p. 5, MC p. 5). */
export function divmod(n: number, d: number): { q: number; r: number } {
  const ad = Math.abs(d);
  const r = ((n % ad) + ad) % ad;
  const q = (n - r) / d;
  return { q, r };
}

/** Text for a signed integer with a real minus sign. */
export function signed(n: number): string {
  return n < 0 ? `−${-n}` : `${n}`;
}

export interface RemainderLineProps {
  n?: number;
  d?: number;
  /** Width of the svg in user units. */
  width?: number;
}

/**
 * Number line for n = qd + r: integer ticks, multiples of d labelled, the greatest
 * multiple qd <= n marked, and a bracket of length r from qd up to n.
 * Window: from qd - d to qd + 2d (three steps of d).
 */
export function RemainderLine({ n = -23, d = 5, width = 340 }: RemainderLineProps) {
  const { q, r } = divmod(n, d);
  const m = q * d; // greatest multiple of d that is <= n
  const lo = m - d;
  const hi = m + 2 * d;
  const padL = 22;
  const padR = 22;
  const W = width;
  const scale = (W - padL - padR) / (hi - lo);
  const X = (v: number) => r2(padL + (v - lo) * scale);
  const y = 70; // axis
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v++) ticks.push(v);
  const multiples = [lo, m, m + d, hi];

  return (
    <svg viewBox={`0 0 ${W} 118`} width={W} role="img" aria-label={`Number line showing ${n} = (${q})(${d}) + ${r}`}>
      {/* axis with arrows */}
      <line x1={6} y1={y} x2={W - 6} y2={y} className="dg-line" />
      <path d={`M ${W - 12} ${y - 5} L ${W - 5} ${y} L ${W - 12} ${y + 5}`} className="dg-line" />
      <path d={`M 12 ${y - 5} L 5 ${y} L 12 ${y + 5}`} className="dg-line" />
      {ticks.map((v) => {
        const big = multiples.includes(v);
        return <line key={v} x1={X(v)} y1={y - (big ? 7 : 4)} x2={X(v)} y2={y + (big ? 7 : 4)} className={big ? "dg-line" : "dg-line dg-thin"} />;
      })}
      {multiples.map((v) => (
        <text key={`t${v}`} x={X(v)} y={y + 24} className="dg-text" textAnchor="middle">
          {signed(v)}
        </text>
      ))}
      {/* greatest multiple of d that is <= n */}
      <circle cx={X(m)} cy={y} r={4} className="dg-point" />
      {/* remainder bracket */}
      {r > 0 && (
        <>
          <line x1={X(m)} y1={y} x2={X(n)} y2={y} className="dg-accent" />
          <path d={`M ${X(m)} ${y - 18} L ${X(m)} ${y - 24} L ${X(n)} ${y - 24} L ${X(n)} ${y - 18}`} className="dg-line dg-thin" />
          <text x={r2((X(m) + X(n)) / 2)} y={y - 31} className="dg-text" textAnchor="middle">
            {`r = ${r}`}
          </text>
        </>
      )}
      <circle cx={X(n)} cy={y} r={4.5} className="dg-accent" />
      <circle cx={X(n)} cy={y} r={2.5} className="dg-point" />
      {/* label n below its point if it isn't a labelled multiple */}
      {r > 0 && (
        <text x={X(n)} y={y + 24} className="dg-text" textAnchor="middle">
          {signed(n)}
        </text>
      )}
      <text x={X(m)} y={y + 44} className="dg-text" textAnchor="middle">
        {`(${signed(q)})(${d})`}
      </text>
    </svg>
  );
}

export interface DivisorGridProps {
  /** primes p, s and exponents a, b: shows the divisors of p^a s^b as an (a+1) by (b+1) grid */
  p?: number;
  a?: number;
  s?: number;
  b?: number;
}

/** Grid of the positive divisors of p^a s^b: row i = p^i, column j = s^j. */
export function DivisorGrid({ p = 2, a = 3, s = 3, b = 2 }: DivisorGridProps) {
  const cell = 46;
  const left = 64;
  const top = 40;
  const cols = b + 1;
  const rows = a + 1;
  const W = left + cols * cell + 12;
  const H = top + rows * cell + 12;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} role="img" aria-label={`The ${(a + 1) * (b + 1)} positive divisors of ${p}^${a} times ${s}^${b}`}>
      {Array.from({ length: cols }, (_, j) => (
        <text key={`c${j}`} x={left + j * cell + cell / 2} y={top - 12} className="dg-text" textAnchor="middle">
          {j === 0 ? "1" : j === 1 ? `${s}` : `${s}`}
          {j >= 2 && <tspan dy={-6} fontSize={10}>{j}</tspan>}
        </text>
      ))}
      {Array.from({ length: rows }, (_, i) => (
        <text key={`r${i}`} x={left - 14} y={top + i * cell + cell / 2 + 5} className="dg-text" textAnchor="end">
          {i === 0 ? "1" : `${p}`}
          {i >= 2 && <tspan dy={-6} fontSize={10}>{i}</tspan>}
        </text>
      ))}
      <text x={left - 14} y={top - 12} className="dg-text" textAnchor="end">
        ×
      </text>
      {Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => (
          <g key={`${i}-${j}`}>
            <rect x={left + j * cell} y={top + i * cell} width={cell} height={cell} className="dg-line dg-thin" />
            <text x={left + j * cell + cell / 2} y={top + i * cell + cell / 2 + 5} className="dg-text" textAnchor="middle">
              {p ** i * s ** j}
            </text>
          </g>
        )),
      )}
    </svg>
  );
}

export const registry = {
  "1-1-integers/remainder-line": RemainderLine,
  "1-1-integers/divisor-grid": DivisorGrid,
};
