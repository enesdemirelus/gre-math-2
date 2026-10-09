// Original diagrams for section 1.4 Decimals.
// Number lines are drawn to scale (MC p. 11).

const r2 = (n: number) => Math.round(n * 100) / 100;
const minus = (s: string) => s.replace(/^-/, "−");

const PLACE_NAMES: Record<number, string> = {
  5: "Hundred thousands",
  4: "Ten thousands",
  3: "Thousands",
  2: "Hundreds",
  1: "Tens",
  0: "Ones or Units",
  [-1]: "Tenths",
  [-2]: "Hundredths",
  [-3]: "Thousandths",
  [-4]: "Ten-thousandths",
};

/** Place-value chart: each digit with its place name written vertically above it. */
export function PlaceValueChart({ value = "4,068.257", highlight }: { value?: string; highlight?: number }) {
  const clean = value.replace(/,/g, "");
  const [intPart, fracPart = ""] = clean.split(".");
  type Cell = { ch: string; power?: number };
  const cells: Cell[] = [];
  for (let i = 0; i < intPart.length; i++) {
    const power = intPart.length - 1 - i;
    cells.push({ ch: intPart[i], power });
    if (power > 0 && power % 3 === 0) cells.push({ ch: "," });
  }
  if (fracPart) {
    cells.push({ ch: "." });
    for (let j = 0; j < fracPart.length; j++) cells.push({ ch: fracPart[j], power: -(j + 1) });
  }
  const DW = 30; // width of a digit column
  const SW = 12; // width of a comma / point column
  const widths = cells.map((c) => (c.power === undefined ? SW : DW));
  const total = widths.reduce((s, w) => s + w, 0);
  const W = Math.max(total + 20, 200);
  let x = (W - total) / 2;
  const baseY = 128; // bottom of the vertical names
  const digitY = 150;
  return (
    <svg viewBox={`0 0 ${W} 166`} width={W} role="img" aria-label={`Place values of the digits of ${value}`}>
      {cells.map((c, i) => {
        const cx = r2(x + widths[i] / 2);
        x += widths[i];
        if (c.power === undefined) {
          return (
            <text key={i} x={cx} y={digitY} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 18 }}>
              {c.ch}
            </text>
          );
        }
        const hi = highlight === c.power;
        return (
          <g key={i}>
            {hi && <rect x={r2(cx - 12)} y={8} width={24} height={156} rx={5} className="dg-accent-fill" />}
            <text
              x={cx}
              y={baseY}
              transform={`rotate(-90 ${cx} ${baseY})`}
              className="dg-text"
              dominantBaseline="central"
              style={{ fontSize: 12 }}
            >
              {PLACE_NAMES[c.power] ?? ""}
            </text>
            <text x={cx} y={digitY} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 18 }}>
              {c.ch}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Number line from min to max with ticks every `step`; the interval [lo, hi) is highlighted
 * (closed dot at lo, open dot at hi) and `target` is marked. Decimal labels use `places` digits.
 */
export function RoundingInterval({
  min = 4.2,
  max = 4.4,
  step = 0.05,
  lo = 4.25,
  hi = 4.35,
  target = 4.3,
  places = 2,
  loClosed = true,
  hiClosed = false,
  targetPlaces,
  labelEvery = 1,
}: {
  min?: number;
  max?: number;
  step?: number;
  lo?: number;
  hi?: number;
  target?: number;
  places?: number;
  loClosed?: boolean;
  hiClosed?: boolean;
  targetPlaces?: number;
  /** label every k-th tick */
  labelEvery?: number;
}) {
  const X0 = 30;
  const X1 = 310;
  const Y = 50;
  const xOf = (v: number) => r2(X0 + ((v - min) / (max - min)) * (X1 - X0));
  const n = Math.round((max - min) / step);
  const ticks = Array.from({ length: n + 1 }, (_, k) => min + k * step);
  return (
    <svg viewBox="0 0 340 96" width={340} role="img" aria-label={`Numbers from ${lo} to ${hi}`}>
      <line x1={X0 - 16} y1={Y} x2={X1 + 16} y2={Y} className="dg-line" />
      <path d={`M ${X1 + 16} ${Y} l -7 -4 v 8 z`} className="dg-point" />
      <path d={`M ${X0 - 16} ${Y} l 7 -4 v 8 z`} className="dg-point" />
      <rect x={xOf(lo)} y={Y - 7} width={r2(xOf(hi) - xOf(lo))} height={14} className="dg-accent-fill" />
      <line x1={xOf(lo)} y1={Y} x2={xOf(hi)} y2={Y} className="dg-accent" style={{ strokeWidth: 4 }} />
      {ticks.map((t, k) => (
        <g key={k}>
          <line x1={xOf(t)} y1={Y - 6} x2={xOf(t)} y2={Y + 6} className="dg-line dg-thin" />
          {k % labelEvery === 0 && (
            <text x={xOf(t)} y={Y + 22} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12 }}>
              {minus(t.toFixed(places))}
            </text>
          )}
        </g>
      ))}
      <circle cx={xOf(lo)} cy={Y} r={5} className={loClosed ? "dg-point" : "dg-accent"} style={loClosed ? undefined : { fill: "var(--bg, #fff)" }} />
      <circle cx={xOf(hi)} cy={Y} r={5} className={hiClosed ? "dg-point" : "dg-accent"} style={hiClosed ? undefined : { fill: "var(--bg, #fff)" }} />
      <line x1={xOf(target)} y1={Y - 16} x2={xOf(target)} y2={Y - 8} className="dg-line dg-thin" />
      <text x={xOf(target)} y={Y - 26} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13 }}>
        {`rounds to ${minus(target.toFixed(targetPlaces ?? Math.max(0, places - 1)))}`}
      </text>
    </svg>
  );
}

export const registry = {
  "1-4-decimals/place-value": PlaceValueChart,
  "1-4-decimals/rounding-interval": RoundingInterval,
};
