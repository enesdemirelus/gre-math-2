"use client";
// Interactive explorers for section 2.5 Solving Linear Inequalities.

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Tex } from "@/components/Tex";

const r2 = (n: number) => Math.round(n * 100) / 100;

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a || 1;
}

/** Exact fraction num/den as TeX. */
function fracTex(num: number, den: number): string {
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  if (d === 1) return `${n}`;
  return n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`;
}

/** Number for display: up to 2 decimals, no -0. */
function num(n: number): string {
  const v = Math.round(n * 100) / 100;
  return Object.is(v, -0) ? "0" : String(v);
}

const axTex = (a: number) => (a === 1 ? "x" : a === -1 ? "-x" : `${a}x`);
const shiftWord = (b: number) => (b > 0 ? `subtract ${b} from` : `add ${-b} to`);

/** TeX for a x + b. */
function linTex(a: number, b: number): string {
  const ax = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
  if (b === 0) return ax;
  return b > 0 ? `${ax} + ${b}` : `${ax} - ${-b}`;
}

type Op = "<" | "\\le" | ">" | "\\ge";
const OPS: Op[] = ["<", "\\le", ">", "\\ge"];
const OP_TEXT: Record<Op, string> = { "<": "<", "\\le": "≤", ">": ">", "\\ge": "≥" };
const flip = (op: Op): Op => ({ "<": ">", "\\le": "\\ge", ">": "<", "\\ge": "\\le" })[op] as Op;
const holds = (lhs: number, op: Op, rhs: number) =>
  op === "<" ? lhs < rhs - 1e-12 : op === "\\le" ? lhs <= rhs + 1e-12 : op === ">" ? lhs > rhs + 1e-12 : lhs >= rhs - 1e-12;

function svgX(svg: SVGSVGElement, e: ReactPointerEvent): number {
  const rect = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  return vb.x + ((e.clientX - rect.left) / rect.width) * vb.width;
}

/** Solution set as a list of pieces on the real line. */
interface Piece {
  from: number | null;
  to: number | null;
  fromOpen: boolean;
  toOpen: boolean;
}

/* ------------------------------------------------------------------ */
/* Inequality number-line builder                                      */
/* ------------------------------------------------------------------ */

export function InequalityBuilder() {
  const [mode, setMode] = useState<"single" | "double">("single");
  const [a, setA] = useState(-3);
  const [b, setB] = useState(5);
  const [op, setOp] = useState<Op>("\\le");
  const [c, setC] = useState(-7);
  // double: L op1 ax + b op2 R, op1/op2 in {<, \le}
  const [L, setL] = useState(-7);
  const [R, setR] = useState(9);
  const [op1, setOp1] = useState<Op>("<");
  const [op2, setOp2] = useState<Op>("\\le");
  const [t, setT] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const setAsafe = (v: number) => setA(v === 0 ? (a > 0 ? -1 : 1) : v);

  /* ---- algebra ---- */
  const lines: string[] = [];
  let pieces: Piece[] = [];
  let boundaries: number[] = [];
  let flipped = false;
  let original = "";
  let resultTex = "";

  if (mode === "single") {
    original = `${linTex(a, b)} ${op} ${c}`;
    lines.push(original);
    if (b !== 0) lines.push(`${axTex(a)} ${op} ${c - b} \\quad \\text{(${shiftWord(b)} both sides)}`);
    const bound = (c - b) / a;
    const opF = a < 0 ? flip(op) : op;
    flipped = a < 0;
    resultTex = `x ${opF} ${fracTex(c - b, a)}`;
    if (a !== 1) lines.push(`${resultTex} \\quad \\text{(divide both sides by ${a}${a < 0 ? "; reverse the sign" : ""})}`);
    boundaries = [bound];
    const open = opF === "<" || opF === ">";
    pieces = opF === "<" || opF === "\\le" ? [{ from: null, to: bound, fromOpen: false, toOpen: open }] : [{ from: bound, to: null, fromOpen: open, toOpen: false }];
  } else {
    original = `${L} ${op1} ${linTex(a, b)} ${op2} ${R}`;
    lines.push(original);
    if (b !== 0) lines.push(`${L - b} ${op1} ${axTex(a)} ${op2} ${R - b} \\quad \\text{(${shiftWord(b)} all three parts)}`);
    const lo = (L - b) / a;
    const hi = (R - b) / a;
    flipped = a < 0;
    if (a > 0) {
      if (a !== 1) lines.push(`${fracTex(L - b, a)} ${op1} x ${op2} ${fracTex(R - b, a)} \\quad \\text{(divide by ${a})}`);
      resultTex = `${fracTex(L - b, a)} ${op1} x ${op2} ${fracTex(R - b, a)}`;
      boundaries = [lo, hi];
      pieces = lo < hi || (lo === hi && op1 === "\\le" && op2 === "\\le") ? [{ from: lo, to: hi, fromOpen: op1 === "<", toOpen: op2 === "<" }] : [];
    } else {
      lines.push(`${fracTex(L - b, a)} ${flip(op1)} x ${flip(op2)} ${fracTex(R - b, a)} \\quad \\text{(divide by ${a}; reverse both signs)}`);
      // rewrite left to right: hi op2 x op1 lo
      resultTex = `${fracTex(R - b, a)} ${op2} x ${op1} ${fracTex(L - b, a)}`;
      lines.push(resultTex + ` \\quad \\text{(same statement, read from the left)}`);
      boundaries = [hi, lo];
      pieces = hi < lo || (hi === lo && op1 === "\\le" && op2 === "\\le") ? [{ from: hi, to: lo, fromOpen: op2 === "<", toOpen: op1 === "<" }] : [];
    }
  }
  const empty = pieces.length === 0;

  /* ---- number line window ---- */
  const bmin = Math.min(...boundaries);
  const bmax = Math.max(...boundaries);
  let MIN = Math.floor(bmin) - 4;
  let MAX = Math.ceil(bmax) + 4;
  if (MAX - MIN < 12) {
    const mid = Math.round((MIN + MAX) / 2);
    MIN = mid - 6;
    MAX = mid + 6;
  }
  const span = MAX - MIN;
  const labelStep = span <= 14 ? 1 : span <= 28 ? 2 : 5;
  const W = 340;
  const pad = 22;
  const Y = 58;
  const X = (v: number) => r2(pad + ((v - MIN) / span) * (W - 2 * pad));
  const V = (x: number) => MIN + ((x - pad) / (W - 2 * pad)) * span;
  const tt = Math.min(MAX, Math.max(MIN, t));

  const inSet = (v: number) => {
    if (mode === "single") return holds(a * v + b, op, c);
    return holds(L, op1, a * v + b) && holds(a * v + b, op2, R);
  };
  const testIn = inSet(tt);
  const lhsVal = a * tt + b;

  const onPointer = (e: ReactPointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const v = V(svgX(svg, e));
    setT(Math.max(MIN, Math.min(MAX, Math.round(v * 2) / 2)));
  };

  const ticks: number[] = [];
  for (let k = MIN; k <= MAX; k++) ticks.push(k);

  const stepper = (label: string, val: number, set: (n: number) => void, lo: number, hi: number) => (
    <label style={{ display: "block" }}>
      {label} = {val}
      <input type="range" style={{ width: "100%" }} min={lo} max={hi} step={1} value={val} onChange={(e) => set(Number(e.target.value))} />
    </label>
  );
  const opButtons = (cur: Op, set: (o: Op) => void, choices: Op[]) => (
    <span style={{ display: "inline-flex", gap: "0.25rem" }}>
      {choices.map((o) => (
        <button key={o} type="button" onClick={() => set(o)} aria-pressed={cur === o} style={cur === o ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined}>
          {OP_TEXT[o]}
        </button>
      ))}
    </span>
  );

  const endDot = (x: number, open: boolean, key: string) => (
    <circle key={key} cx={x} cy={Y} r={5} className="dg-accent" style={{ fill: open ? "var(--bg)" : "var(--accent)", strokeWidth: 2 }} />
  );

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" aria-pressed={mode === "single"} onClick={() => setMode("single")} style={mode === "single" ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined}>
          One inequality
        </button>
        <button type="button" aria-pressed={mode === "double"} onClick={() => setMode("double")} style={mode === "double" ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined}>
          Compound (between)
        </button>
      </div>
      <div style={{ fontSize: "1.15em" }}>
        <Tex tex={original} />
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} 92`}
        width={W}
        style={{ maxWidth: "100%", touchAction: "none", cursor: "pointer" }}
        role="img"
        aria-label="Solution set on a number line with a draggable test point"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          onPointer(e);
        }}
        onPointerMove={(e) => {
          if (dragging.current) onPointer(e);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <line x1={8} y1={Y} x2={W - 8} y2={Y} className="dg-line" />
        <path d={`M 6 ${Y} L 14 ${Y - 4.5} L 14 ${Y + 4.5} Z`} className="dg-point" />
        <path d={`M ${W - 6} ${Y} L ${W - 14} ${Y - 4.5} L ${W - 14} ${Y + 4.5} Z`} className="dg-point" />
        {ticks.map((k) => (
          <g key={k}>
            <line x1={X(k)} y1={Y - 5} x2={X(k)} y2={Y + 5} className="dg-line dg-thin" />
            {k % labelStep === 0 && (
              <text x={X(k)} y={Y + 20} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
                {k < 0 ? `−${-k}` : k}
              </text>
            )}
          </g>
        ))}
        {pieces.map((p, i) => {
          const x1 = p.from === null ? 16 : X(p.from);
          const x2 = p.to === null ? W - 16 : X(p.to);
          return (
            <g key={i}>
              <line x1={x1} y1={Y} x2={x2} y2={Y} className="dg-accent" style={{ strokeWidth: 5 }} />
              {p.from === null && <path d={`M 8 ${Y} L 18 ${Y - 6} L 18 ${Y + 6} Z`} style={{ fill: "var(--accent)" }} />}
              {p.to === null && <path d={`M ${W - 8} ${Y} L ${W - 18} ${Y - 6} L ${W - 18} ${Y + 6} Z`} style={{ fill: "var(--accent)" }} />}
              {p.from !== null && endDot(X(p.from), p.fromOpen, "f")}
              {p.to !== null && endDot(X(p.to), p.toOpen, "t")}
            </g>
          );
        })}
        {/* test point */}
        <line x1={X(tt)} y1={Y - 28} x2={X(tt)} y2={Y - 8} className="dg-line dg-thin" />
        <path d={`M ${X(tt)} ${Y - 7} L ${X(tt) - 5} ${Y - 15} L ${X(tt) + 5} ${Y - 15} Z`} className="dg-point" />
        <text x={X(tt)} y={Y - 33} className="dg-text" textAnchor="middle" style={{ fontSize: 13 }}>
          {`test x = ${tt < 0 ? "−" + num(-tt) : num(tt)}`}
        </text>
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.4rem", width: "100%", maxWidth: 420, gridTemplateColumns: "1fr 1fr", columnGap: "1rem" }}>
        {stepper("a (coefficient of x)", a, setAsafe, -5, 5)}
        {stepper("b (constant)", b, setB, -10, 10)}
        {mode === "single" ? (
          <>
            <div>
              sign {opButtons(op, setOp, OPS)}
            </div>
            {stepper("c (right side)", c, setC, -10, 10)}
          </>
        ) : (
          <>
            {stepper("left end", L, setL, -12, 12)}
            {stepper("right end", R, setR, -12, 12)}
            <div>
              left sign {opButtons(op1, setOp1, ["<", "\\le"])}
            </div>
            <div>
              right sign {opButtons(op2, setOp2, ["<", "\\le"])}
            </div>
          </>
        )}
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div style={{ overflowX: "auto" }}>
          <Tex display tex={`\\begin{aligned} ${lines.map((l) => `&${l}`).join(" \\\\ ")} \\end{aligned}`} />
        </div>
        {flipped && (
          <div>
            <strong>Sign reversed:</strong> you divided by the negative number {a}, so the direction of the inequality {mode === "double" ? "signs" : "sign"} reversed (MR p. 52).
          </div>
        )}
        <div>
          {empty ? (
            <span>
              <strong>Solution set: empty.</strong> No number is greater than the right end and less than the left end at the same time.
            </span>
          ) : (
            <span>
              <strong>Solution set:</strong> <Tex tex={resultTex} />. A solid dot means the endpoint is included, a hollow dot that it is not.
            </span>
          )}
        </div>
        <div>
          Test point: <Tex tex={`${linTex(a, b).replace(/x/g, `(${num(tt)})`)} = ${num(lhsVal)}`} />, so the original inequality is{" "}
          <strong>{testIn ? "true" : "false"}</strong> at <Tex tex={`x = ${num(tt)}`} />
          {testIn ? ": the point is in the solution set." : ": the point is not in the solution set."}
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "2-5-linear-inequalities/inequality-builder": InequalityBuilder,
};
