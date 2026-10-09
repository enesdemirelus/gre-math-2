"use client";
// Interactive explorers for section 2.6 Functions.

import { useState } from "react";
import { Tex } from "@/components/Tex";

/* ------------------------------------------------------------------ */
/* Number formatting helpers                                            */
/* ------------------------------------------------------------------ */

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

/** Exact rational p/q as TeX (q > 0 assumed after normalising). */
function ratTex(p: number, q: number): string {
  if (q < 0) {
    p = -p;
    q = -q;
  }
  const g = gcd(p, q) || 1;
  p /= g;
  q /= g;
  if (q === 1) return `${p}`;
  return p < 0 ? `-\\frac{${-p}}{${q}}` : `\\frac{${p}}{${q}}`;
}

/** Best exact-looking TeX for a real number: integer, small fraction, sqrt of an integer or fraction, else a decimal with ≈. */
function numTex(v: number): { tex: string; exact: boolean } {
  const eps = 1e-9;
  if (Math.abs(v - Math.round(v)) < eps) return { tex: `${Math.round(v)}`, exact: true };
  for (let q = 2; q <= 64; q++) {
    const p = Math.round(v * q);
    if (Math.abs(v - p / q) < eps) return { tex: ratTex(p, q), exact: true };
  }
  if (v > 0) {
    const s = v * v;
    if (Math.abs(s - Math.round(s)) < 1e-7) return { tex: `\\sqrt{${Math.round(s)}}`, exact: true };
    for (let q = 2; q <= 64; q++) {
      const p = Math.round(s * q);
      if (Math.abs(s - p / q) < 1e-7) return { tex: `\\sqrt{${ratTex(p, q)}}`, exact: true };
    }
  }
  return { tex: `${Math.round(v * 1000) / 1000}`, exact: false };
}

/** Wrap a value for substitution: always in parentheses, as on paper. */
const paren = (t: string) => `\\left(${t}\\right)`;

/* ------------------------------------------------------------------ */
/* Function machine                                                     */
/* ------------------------------------------------------------------ */

interface Rule {
  id: string;
  /** TeX of the right-hand side in the variable x */
  rhs: string;
  /** right-hand side with the input substituted (TeX of the input given) */
  sub: (s: string) => string;
  /** null if allowed, otherwise a reason in TeX/plain words */
  domainIssue: (x: number) => string | null;
  domainTex: string;
  f: (x: number) => number;
}

const RULES: Rule[] = [
  {
    id: "quad",
    rhs: "x^2 - 3x",
    sub: (s) => `${s}^2 - 3${s}`,
    domainIssue: () => null,
    domainTex: "\\text{all real numbers}",
    f: (x) => x * x - 3 * x,
  },
  {
    id: "recip",
    rhs: "\\dfrac{12}{x - 2}",
    sub: (s) => `\\dfrac{12}{${s} - 2}`,
    domainIssue: (x) => (Math.abs(x - 2) < 1e-12 ? "the denominator would be 0" : null),
    domainTex: "x \\ne 2",
    f: (x) => 12 / (x - 2),
  },
  {
    id: "root",
    rhs: "\\sqrt{10 - x}",
    sub: (s) => `\\sqrt{10 - ${s}}`,
    domainIssue: (x) => (10 - x < -1e-12 ? "the number under the square root would be negative" : null),
    domainTex: "x \\le 10",
    f: (x) => Math.sqrt(Math.max(0, 10 - x)),
  },
  {
    id: "abs",
    rhs: "|x - 4|",
    sub: (s) => `\\left|${s} - 4\\right|`,
    domainIssue: () => null,
    domainTex: "\\text{all real numbers}",
    f: (x) => Math.abs(x - 4),
  },
  {
    id: "lin",
    rhs: "2x - 1",
    sub: (s) => `2${s} - 1`,
    domainIssue: () => null,
    domainTex: "\\text{all real numbers}",
    f: (x) => 2 * x - 1,
  },
];

function RulePicker({ name, value, onChange }: { name: string; value: number; onChange: (i: number) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", alignItems: "center" }}>
      <span style={{ minWidth: "1.5rem" }}>
        <Tex tex={`${name}:`} />
      </span>
      {RULES.map((r, i) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onChange(i)}
          aria-pressed={value === i}
          style={{ fontWeight: value === i ? 700 : 400, outline: value === i ? "2px solid var(--accent)" : undefined }}
        >
          <Tex tex={`${name}(x) = ${r.rhs.replace("\\dfrac", "\\frac")}`} />
        </button>
      ))}
    </div>
  );
}

function MachineBox({ name, input, output, bad }: { name: string; input: string; output: string | null; bad: boolean }) {
  return (
    <svg viewBox="0 0 300 70" width={300} style={{ maxWidth: "100%" }} role="img" aria-label={`machine ${name}`}>
      <foreignObject x={0} y={18} width={84} height={34}>
        <div style={{ textAlign: "center", fontSize: 15 }}>
          <Tex tex={input} />
        </div>
      </foreignObject>
      <line x1={86} y1={35} x2={112} y2={35} className="dg-line dg-thin" />
      <path d="M 118 35 l -7 -3.5 l 0 7 Z" className="dg-point" />
      <rect x={120} y={12} width={60} height={46} rx={6} className="dg-fill" />
      <rect x={120} y={12} width={60} height={46} rx={6} className={bad ? "dg-line dg-dashed" : "dg-accent"} />
      <text x={150} y={36} className="dg-label" textAnchor="middle" dominantBaseline="central" fontSize="20">
        {name}
      </text>
      <line x1={182} y1={35} x2={208} y2={35} className={bad ? "dg-line dg-thin dg-dashed" : "dg-line dg-thin"} />
      {!bad && <path d="M 214 35 l -7 -3.5 l 0 7 Z" className="dg-point" />}
      <foreignObject x={216} y={18} width={84} height={34}>
        <div style={{ textAlign: "center", fontSize: 15 }}>{output === null ? <span>✕</span> : <Tex tex={output} />}</div>
      </foreignObject>
    </svg>
  );
}

export function FunctionMachine() {
  const [fi, setFi] = useState(0);
  const [gi, setGi] = useState(2);
  const [x, setX] = useState(5);
  const [compose, setCompose] = useState(false);

  const F = RULES[fi];
  const G = RULES[gi];
  const xs = `${x}`;
  const fIssue = F.domainIssue(x);
  const fx = fIssue ? null : F.f(x);
  const fxT = fx === null ? null : numTex(fx);
  const gIssue = fx === null ? null : G.domainIssue(fx);
  const gfx = fx === null || gIssue ? null : G.f(fx);
  const gfxT = gfx === null ? null : numTex(gfx);
  const eq = (t: { tex: string; exact: boolean }) => (t.exact ? `= ${t.tex}` : `\\approx ${t.tex}`);

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem" }}>
      <RulePicker name="f" value={fi} onChange={setFi} />
      <label>
        Input <Tex tex={`x = ${xs}`} />
        <input type="range" style={{ width: "100%" }} min={-6} max={12} step={1} value={x} onChange={(e) => setX(Number(e.target.value))} />
      </label>
      <div style={{ justifySelf: "center" }}>
        <MachineBox name="f" input={xs} output={fxT ? fxT.tex : null} bad={fx === null} />
      </div>
      <div>
        {fIssue ? (
          <span>
            <Tex tex={`x = ${xs}`} /> is not in the domain of <Tex tex="f" /> (<Tex tex={F.domainTex} />): {fIssue}.
          </span>
        ) : (
          <Tex tex={`f(${xs}) = ${F.sub(paren(xs))} ${eq(fxT!)}`} />
        )}
      </div>
      <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input type="checkbox" checked={compose} onChange={(e) => setCompose(e.target.checked)} />
        Feed the output into a second machine <Tex tex="g" /> (composition <Tex tex="g(f(x))" />)
      </label>
      {compose && (
        <>
          <RulePicker name="g" value={gi} onChange={setGi} />
          <div style={{ justifySelf: "center" }}>
            <MachineBox name="g" input={fxT ? fxT.tex : "\\text{—}"} output={gfxT ? gfxT.tex : null} bad={gfx === null} />
          </div>
          <div>
            {fx === null ? (
              <span>
                <Tex tex={`f(${xs})`} /> does not exist, so <Tex tex={`g(f(${xs}))`} /> does not exist either.
              </span>
            ) : gIssue ? (
              <span>
                <Tex tex={`f(${xs}) = ${fxT!.tex}`} /> is not in the domain of <Tex tex="g" /> (<Tex tex={G.domainTex} />): {gIssue}. So{" "}
                <Tex tex={`g(f(${xs}))`} /> is undefined even though <Tex tex={`f(${xs})`} /> exists.
              </span>
            ) : (
              <Tex tex={`g(f(${xs})) = g\\left(${fxT!.tex}\\right) = ${G.sub(paren(fxT!.tex))} ${eq(gfxT!)}`} />
            )}
          </div>
          <div style={{ fontSize: "0.92em", color: "var(--muted)" }}>
            Order matters: with these rules, <Tex tex={`f(g(${xs}))`} />{" "}
            {(() => {
              const gIss0 = G.domainIssue(x);
              if (gIss0) return <span>is undefined, because {xs} is not in the domain of g.</span>;
              const gx = G.f(x);
              const fIss1 = F.domainIssue(gx);
              if (fIss1) return <span>is undefined, because g({xs}) is not in the domain of f.</span>;
              return <Tex tex={eq(numTex(F.f(gx)))} />;
            })()}
            .
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Defined-operation evaluator                                          */
/* ------------------------------------------------------------------ */

interface Op {
  id: string;
  sym: string;
  /** definition TeX in a, b */
  def: string;
  /** substituted right-hand side; a, b are TeX of the inputs (already parenthesised) */
  sub: (a: string, b: string) => string;
  /** exact value as a rational [p, q], or null if undefined */
  val: (a: number, b: number) => [number, number] | null;
  cond: string;
}

const OPS: Op[] = [
  {
    id: "star",
    sym: "\\star",
    def: "a \\star b = ab - b^2",
    sub: (a, b) => `${a}${b} - ${b}^2`,
    val: (a, b) => [a * b - b * b, 1],
    cond: "\\text{for all numbers } a, b",
  },
  {
    id: "tri",
    sym: "\\triangle",
    def: "a \\triangle b = \\dfrac{a + 2b}{a - b}",
    sub: (a, b) => `\\dfrac{${a} + 2${b}}{${a} - ${b}}`,
    val: (a, b) => (a === b ? null : [a + 2 * b, a - b]),
    cond: "\\text{for all numbers } a \\ne b",
  },
  {
    id: "hash",
    sym: "\\#",
    def: "a \\# b = 2^a - b",
    sub: (a, b) => `2^{${a}} - ${b}`,
    val: (a, b) => (a >= 0 ? [2 ** a - b, 1] : [1 - b * 2 ** -a, 2 ** -a]),
    cond: "\\text{for all integers } a, b",
  },
  {
    id: "box",
    sym: "\\boxdot",
    def: "a \\boxdot b = a + b + ab",
    sub: (a, b) => `${a} + ${b} + ${a}${b}`,
    val: (a, b) => [a + b + a * b, 1],
    cond: "\\text{for all numbers } a, b",
  },
];

function OpLine({ op, a, b }: { op: Op; a: number; b: number }) {
  const v = op.val(a, b);
  const head = `${a < 0 ? paren(`${a}`) : a} ${op.sym} ${b < 0 ? paren(`${b}`) : b}`;
  if (!v) {
    return (
      <div>
        <Tex tex={`${head} = ${op.sub(paren(`${a}`), paren(`${b}`))}`} /> — undefined: the denominator is 0 (the operation requires <Tex tex="a \ne b" />).
      </div>
    );
  }
  return (
    <div>
      <Tex tex={`${head} = ${op.sub(paren(`${a}`), paren(`${b}`))} = ${ratTex(v[0], v[1])}`} />
    </div>
  );
}

export function OperatorEvaluator() {
  const [oi, setOi] = useState(0);
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const op = OPS[oi];
  const v1 = op.val(a, b);
  const v2 = op.val(b, a);
  const same = v1 && v2 ? v1[0] * v2[1] === v2[0] * v1[1] : null;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {OPS.map((o, i) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setOi(i)}
            aria-pressed={oi === i}
            style={{ fontWeight: oi === i ? 700 : 400, outline: oi === i ? "2px solid var(--accent)" : undefined }}
          >
            <Tex tex={o.def.replace("\\dfrac", "\\frac")} />
          </button>
        ))}
      </div>
      <div>
        Definition: <Tex tex={`${op.def}, \\quad ${op.cond}`} />
      </div>
      <label>
        First input <Tex tex={`a = ${a}`} />
        <input type="range" style={{ width: "100%" }} min={-5} max={5} step={1} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <label>
        Second input <Tex tex={`b = ${b}`} />
        <input type="range" style={{ width: "100%" }} min={-5} max={5} step={1} value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>
      <div style={{ display: "grid", gap: "0.35rem", overflowX: "auto" }}>
        <OpLine op={op} a={a} b={b} />
        <OpLine op={op} a={b} b={a} />
      </div>
      <div style={{ fontSize: "0.92em", color: "var(--muted)" }}>
        {a === b
          ? "With equal inputs, swapping them changes nothing. Pick different inputs to test whether order matters."
          : same === null
            ? "One of the two orders is undefined."
            : same
              ? "Same result in both orders for these inputs."
              : "Different results: for this operation the order of the inputs matters."}
      </div>
    </div>
  );
}

export const registry = {
  "2-6-functions/function-machine": FunctionMachine,
  "2-6-functions/operator-evaluator": OperatorEvaluator,
};
