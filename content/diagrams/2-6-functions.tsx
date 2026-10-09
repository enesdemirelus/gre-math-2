// Original diagrams for section 2.6 Functions.
// The domain number line is drawn to scale from its props.

const r2 = (n: number) => Math.round(n * 100) / 100;
const minus = (n: number) => (n < 0 ? `−${-n}` : `${n}`);

function Arrow({ x1, y1, x2, y2, accent = false }: { x1: number; y1: number; x2: number; y2: number; accent?: boolean }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy);
  const ux = dx / L;
  const uy = dy / L;
  // arrowhead: tip at (x2, y2), length 8, half-width 3.5
  const bx = x2 - 8 * ux;
  const by = y2 - 8 * uy;
  const p1 = [r2(bx - 3.5 * uy), r2(by + 3.5 * ux)];
  const p2 = [r2(bx + 3.5 * uy), r2(by - 3.5 * ux)];
  return (
    <g>
      <line x1={r2(x1)} y1={r2(y1)} x2={r2(bx)} y2={r2(by)} className={accent ? "dg-accent" : "dg-line dg-thin"} />
      <path d={`M ${r2(x2)} ${r2(y2)} L ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} Z`} className="dg-point" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Mapping diagrams: function vs. not a function                     */
/* ------------------------------------------------------------------ */

interface MapSpec {
  inputs: string[];
  outputs: string[];
  /** [input index, output index] */
  arrows: [number, number][];
  bad?: number; // input index highlighted as the offender
}

function Mapping({ spec, ox, title }: { spec: MapSpec; ox: number; title: string }) {
  const top = 40;
  const gap = 34;
  const n = Math.max(spec.inputs.length, spec.outputs.length);
  const h = (n - 1) * gap + 40;
  const lx = ox + 32;
  const rx = ox + 128;
  const yIn = (i: number) => top + 20 + i * gap + ((n - spec.inputs.length) * gap) / 2;
  const yOut = (j: number) => top + 20 + j * gap + ((n - spec.outputs.length) * gap) / 2;
  return (
    <g>
      <text x={ox + 80} y={18} className="dg-text" textAnchor="middle" style={{ fontSize: 13 }}>
        {title}
      </text>
      <ellipse cx={lx} cy={top + h / 2} rx={22} ry={h / 2 + 4} className="dg-line dg-thin" />
      <ellipse cx={rx} cy={top + h / 2} rx={22} ry={h / 2 + 4} className="dg-line dg-thin" />
      {spec.inputs.map((s, i) => (
        <text key={`i${i}`} x={lx} y={yIn(i)} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {s}
        </text>
      ))}
      {spec.outputs.map((s, j) => (
        <text key={`o${j}`} x={rx} y={yOut(j)} className="dg-text" textAnchor="middle" dominantBaseline="central">
          {s}
        </text>
      ))}
      {spec.arrows.map(([i, j], k) => (
        <Arrow key={`a${k}`} x1={lx + 12} y1={yIn(i)} x2={rx - 19} y2={yOut(j)} accent={spec.bad === i} />
      ))}
      <text x={lx} y={top + h + 22} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
        inputs
      </text>
      <text x={rx} y={top + h + 22} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
        outputs
      </text>
    </g>
  );
}

const FUNC: MapSpec = { inputs: ["1", "3", "5"], outputs: ["−4", "−8"], arrows: [[0, 0], [1, 1], [2, 0]] };
const NOT: MapSpec = { inputs: ["1", "2", "5"], outputs: ["0", "4", "7"], arrows: [[0, 0], [1, 1], [1, 2], [2, 2]], bad: 1 };

export function MappingDiagram({ variant = "both" }: { variant?: "both" | "function" | "not-function" }) {
  if (variant === "function") {
    return (
      <svg viewBox="0 0 160 200" width={160} role="img" aria-label="Mapping diagram of a function">
        <Mapping spec={FUNC} ox={0} title="a function" />
      </svg>
    );
  }
  if (variant === "not-function") {
    return (
      <svg viewBox="0 0 160 200" width={160} role="img" aria-label="Mapping diagram that is not a function">
        <Mapping spec={NOT} ox={0} title="not a function" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 340 200" width={340} role="img" aria-label="A function and a rule that is not a function">
      <Mapping spec={FUNC} ox={0} title="a function" />
      <Mapping spec={NOT} ox={180} title="not a function" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Function machine (single or composed)                             */
/* ------------------------------------------------------------------ */

function Machine({ x, y, name }: { x: number; y: number; name: string }) {
  // box 56 x 44 with a funnel on top
  return (
    <g>
      <rect x={x} y={y} width={56} height={44} rx={6} className="dg-fill" />
      <rect x={x} y={y} width={56} height={44} rx={6} className="dg-accent" />
      <text x={x + 28} y={y + 22} className="dg-label" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 20 }}>
        {name}
      </text>
    </g>
  );
}

export function FunctionMachineDiagram({ variant = "single" }: { variant?: "single" | "composition" }) {
  if (variant === "single") {
    // x --> [f] --> f(x), with example 3 -> 5 for f(x) = 4x - 7
    return (
      <svg viewBox="0 0 300 120" width={300} role="img" aria-label="Function machine: input x, output f of x">
        <text x={30} y={46} className="dg-label" textAnchor="middle" dominantBaseline="central">
          x
        </text>
        <text x={30} y={86} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
          input
        </text>
        <Arrow x1={44} y1={46} x2={118} y2={46} />
        <Machine x={122} y={24} name="f" />
        <Arrow x1={182} y1={46} x2={240} y2={46} />
        <text x={266} y={46} className="dg-label" textAnchor="middle" dominantBaseline="central">
          f(x)
        </text>
        <text x={266} y={86} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
          output
        </text>
      </svg>
    );
  }
  // composition: x -> [f] -> f(x) -> [g] -> g(f(x)), example values 3, 5, 26 for f(x) = 2x - 1, g(x) = x^2 + 1
  return (
    <svg viewBox="0 0 350 124" width={350} role="img" aria-label="Composition: x goes into f, f of x goes into g">
      <text x={16} y={46} className="dg-label" textAnchor="middle" dominantBaseline="central">
        x
      </text>
      <Arrow x1={28} y1={46} x2={68} y2={46} />
      <Machine x={72} y={24} name="f" />
      <Arrow x1={130} y1={46} x2={188} y2={46} />
      <text x={158} y={34} className="dg-label" textAnchor="middle" style={{ fontSize: 14 }}>
        f(x)
      </text>
      <Machine x={192} y={24} name="g" />
      <Arrow x1={250} y1={46} x2={282} y2={46} />
      <text x={318} y={46} className="dg-label" textAnchor="middle" dominantBaseline="central">
        g(f(x))
      </text>
      <text x={100} y={86} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
        2x − 1
      </text>
      <text x={220} y={86} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
        x² + 1
      </text>
      <text x={16} y={112} className="dg-text" textAnchor="middle">3</text>
      <text x={158} y={112} className="dg-text" textAnchor="middle">5</text>
      <text x={318} y={112} className="dg-text" textAnchor="middle">26</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Domain on a number line (to scale)                                */
/* ------------------------------------------------------------------ */

export interface DomainLineProps {
  min: number;
  max: number;
  /** left end of the domain (omit for -infinity) */
  from?: number;
  fromClosed?: boolean;
  /** right end of the domain (omit for +infinity) */
  to?: number;
  toClosed?: boolean;
  /** excluded single points inside the domain */
  holes?: number[];
  ticks?: number[];
}

export function DomainLine({ min, max, from, fromClosed = true, to, toClosed = true, holes = [], ticks = [] }: DomainLineProps) {
  const W = 320;
  const pad = 20;
  const y = 34;
  const u = (W - 2 * pad - 12) / (max - min);
  const X = (v: number) => r2(pad + 6 + (v - min) * u);
  const a = from === undefined ? pad - 6 : X(from);
  const b = to === undefined ? W - pad + 4 : X(to);
  const Dot = ({ v, closed }: { v: number; closed: boolean }) =>
    closed ? (
      <circle cx={X(v)} cy={y} r={4.5} className="dg-point" />
    ) : (
      <circle cx={X(v)} cy={y} r={4.5} className="dg-accent" style={{ fill: "var(--bg)", strokeWidth: 2 }} />
    );
  return (
    <svg viewBox={`0 0 ${W} 64`} width={W} role="img" aria-label="Domain shown on a number line">
      <line x1={pad - 6} y1={y} x2={W - pad + 6} y2={y} className="dg-line dg-thin" />
      <path d={`M ${W - pad + 10} ${y} l -7 -3.5 l 0 7 Z`} className="dg-point" />
      <path d={`M ${pad - 10} ${y} l 7 -3.5 l 0 7 Z`} className="dg-point" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={X(t)} y1={y - 4} x2={X(t)} y2={y + 4} className="dg-line dg-thin" />
          <text x={X(t)} y={y + 20} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
            {minus(t)}
          </text>
        </g>
      ))}
      <line x1={a} y1={y} x2={b} y2={y} className="dg-accent" style={{ strokeWidth: 4 }} />
      {from !== undefined && <Dot v={from} closed={fromClosed} />}
      {to !== undefined && <Dot v={to} closed={toClosed} />}
      {holes.map((h) => (
        <Dot key={`h${h}`} v={h} closed={false} />
      ))}
    </svg>
  );
}

export const registry = {
  "2-6-functions/mapping": MappingDiagram,
  "2-6-functions/machine": FunctionMachineDiagram,
  "2-6-functions/domain-line": DomainLine,
};
