"use client";
// Interactive drill for section 2.2 Rules of Exponents: random exponent problems with worked solutions.
// A seeded generator keeps server and client renders identical; "New problem" advances the seed.

import { useMemo, useState } from "react";
import { Tex } from "@/components/Tex";

type Step = { text: string; tex: string };
type Problem = { kind: string; prompt: string; tex: string; base: number | null; answer: number; steps: Step[] };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;
const ri = (rng: Rng, lo: number, hi: number) => lo + Math.floor(rng() * (hi - lo + 1));
const pick = <T,>(rng: Rng, xs: T[]): T => xs[Math.floor(rng() * xs.length)];
const riNZ = (rng: Rng, lo: number, hi: number) => {
  let v = 0;
  while (v === 0) v = ri(rng, lo, hi);
  return v;
};
/** "a + b" written cleanly for TeX when b may be negative. */
const plus = (a: number | string, b: number) => (b < 0 ? `${a} - ${-b}` : `${a} + ${b}`);
const minus = (a: number | string, b: number) => (b < 0 ? `${a} + ${-b}` : `${a} - ${b}`);
/** m x + c as TeX. */
const lin = (m: number, c: number) => {
  const head = m === 1 ? "x" : m === -1 ? "-x" : `${m}x`;
  return c === 0 ? head : plus(head, c);
};

/* ---------------- generators ---------------- */

function sameBase(rng: Rng): Problem {
  const p = pick(rng, [2, 3, 5, 7]);
  const a = ri(rng, 2, 9);
  const b = riNZ(rng, -5, 6);
  const c = riNZ(rng, -4, 9);
  const s = a + b;
  const ans = s - c;
  return {
    kind: "Same base",
    prompt: `Write as a single power of ${p}. Enter the exponent.`,
    tex: `\\frac{${p}^{${a}}\\cdot ${p}^{${b}}}{${p}^{${c}}}`,
    base: p,
    answer: ans,
    steps: [
      { text: "Rule 2: multiplying powers of the same base adds the exponents.", tex: `${p}^{${a}}\\cdot ${p}^{${b}} = ${p}^{${plus(a, b)}} = ${p}^{${s}}` },
      { text: "Rule 3: dividing subtracts the exponent of the denominator.", tex: `\\frac{${p}^{${s}}}{${p}^{${c}}} = ${p}^{${minus(s, c)}} = ${p}^{${ans}}` },
    ],
  };
}

function changeBase(rng: Rng): Problem {
  const fam = pick(rng, [
    { p: 2, qs: [4, 8, 16] },
    { p: 3, qs: [9, 27] },
  ]);
  const p = fam.p;
  const q1 = pick(rng, fam.qs);
  let q2 = pick(rng, fam.qs);
  if (fam.qs.length > 1) while (q2 === q1) q2 = pick(rng, fam.qs);
  const e = (q: number) => Math.round(Math.log(q) / Math.log(p));
  const e1 = e(q1);
  const e2 = e(q2);
  const m = ri(rng, 2, 6);
  const n = riNZ(rng, -3, 5);
  const c = ri(rng, 1, 12);
  const top = e1 * m + e2 * n;
  const ans = top - c;
  return {
    kind: "Change of base",
    prompt: `Write as a single power of ${p}. Enter the exponent.`,
    tex: `\\frac{${q1}^{${m}}\\cdot ${q2}^{${n}}}{${p}^{${c}}}`,
    base: p,
    answer: ans,
    steps: [
      { text: `Rewrite each base as a power of ${p} and use Rule 7, (x^a)^b = x^{ab}.`, tex: `${q1}^{${m}} = (${p}^{${e1}})^{${m}} = ${p}^{${e1 * m}},\\quad ${q2}^{${n}} = (${p}^{${e2}})^{${n}} = ${p}^{${e2 * n}}` },
      { text: "Rule 2 for the numerator.", tex: `${p}^{${e1 * m}}\\cdot ${p}^{${e2 * n}} = ${p}^{${top}}` },
      { text: "Rule 3 for the quotient.", tex: `\\frac{${p}^{${top}}}{${p}^{${c}}} = ${p}^{${minus(top, c)}} = ${p}^{${ans}}` },
    ],
  };
}

function negative(rng: Rng): Problem {
  const p = pick(rng, [2, 3, 5, 10]);
  const a = ri(rng, 2, 4);
  const b = ri(rng, 2, 4);
  const c = ri(rng, 1, 9);
  const ab = a * b;
  const ans = ab - c;
  return {
    kind: "Negative exponents",
    prompt: `Write as a single power of ${p}. Enter the exponent.`,
    tex: `\\left(\\frac{1}{${p}^{${a}}}\\right)^{-${b}}\\cdot ${p}^{-${c}}`,
    base: p,
    answer: ans,
    steps: [
      { text: "Rule 1 backwards: a reciprocal of a power is a negative power.", tex: `\\frac{1}{${p}^{${a}}} = ${p}^{-${a}}` },
      { text: "Rule 7: a power of a power multiplies the exponents.", tex: `\\left(${p}^{-${a}}\\right)^{-${b}} = ${p}^{(-${a})(-${b})} = ${p}^{${ab}}` },
      { text: "Rule 2.", tex: `${p}^{${ab}}\\cdot ${p}^{-${c}} = ${p}^{${ans}}` },
    ],
  };
}

function sums(rng: Rng): Problem {
  const n = ri(rng, 5, 20);
  const v = ri(rng, 0, 3);
  if (v === 0 || v === 1) {
    const p = v === 0 ? 2 : 3;
    const terms = Array(p).fill(`${p}^{${n}}`).join(" + ");
    return {
      kind: "Sums and differences",
      prompt: `Write as a single power of ${p}. Enter the exponent.`,
      tex: terms,
      base: p,
      answer: n + 1,
      steps: [
        { text: `There are ${p} equal terms, so the sum is ${p} times one of them.`, tex: `${terms} = ${p}\\cdot ${p}^{${n}}` },
        { text: "Rule 2 (the coefficient is itself a power of the base).", tex: `${p}^{1}\\cdot ${p}^{${n}} = ${p}^{${n + 1}}` },
      ],
    };
  }
  if (v === 2) {
    const terms = Array(4).fill(`4^{${n}}`).join(" + ");
    return {
      kind: "Sums and differences",
      prompt: "Write as a single power of 2. Enter the exponent.",
      tex: terms,
      base: 2,
      answer: 2 * n + 2,
      steps: [
        { text: "Four equal terms make 4 times one of them.", tex: `${terms} = 4\\cdot 4^{${n}} = 4^{${n + 1}}` },
        { text: "Change to base 2 with Rule 7.", tex: `4^{${n + 1}} = (2^2)^{${n + 1}} = 2^{${2 * n + 2}}` },
      ],
    };
  }
  const p = pick(rng, [2, 3, 5]);
  const coef = p - 1;
  const second = coef === 1 ? `${p}^{${n}}` : `${coef}\\cdot ${p}^{${n}}`;
  return {
    kind: "Sums and differences",
    prompt: `Write as a single power of ${p}. Enter the exponent.`,
    tex: `${p}^{${n + 1}} - ${second}`,
    base: p,
    answer: n,
    steps: [
      { text: "Factor out the smaller power.", tex: `${p}^{${n + 1}} - ${second} = ${p}^{${n}}(${p} - ${coef})` },
      { text: "Simplify the parentheses.", tex: `${p}^{${n}}(${p - coef}) = ${p}^{${n}}` },
    ],
  };
}

function equation(rng: Rng): Problem {
  const fam = pick(rng, [
    { p: 2, opts: [4, 8] },
    { p: 3, opts: [9, 27] },
  ]);
  const p = fam.p;
  const q = pick(rng, fam.opts);
  const k = Math.round(Math.log(q) / Math.log(p));
  const x = ri(rng, -3, 8);
  const d = riNZ(rng, -3, 4);
  let m = ri(rng, 1, 5);
  while (m === k) m = ri(rng, 1, 5);
  const c = k * (x + d) - m * x;
  const rhs = k * d;
  return {
    kind: "Equations",
    prompt: "Solve for x.",
    tex: `${p}^{${lin(m, c)}} = ${q}^{${lin(1, d)}}`,
    base: null,
    answer: x,
    steps: [
      { text: `Write both sides with base ${p} (Rule 7).`, tex: `${q}^{${lin(1, d)}} = (${p}^{${k}})^{${lin(1, d)}} = ${p}^{${lin(k, rhs)}}` },
      { text: `Equal powers of the same positive base other than 1 have equal exponents.`, tex: `${lin(m, c)} = ${lin(k, rhs)}` },
      { text: "Solve the linear equation.", tex: `${m - k === 1 ? "" : m - k === -1 ? "-" : m - k}x = ${rhs - c} \\quad\\Longrightarrow\\quad x = ${x}` },
    ],
  };
}

const KINDS: { id: string; label: string; gen: (r: Rng) => Problem }[] = [
  { id: "same", label: "Same base", gen: sameBase },
  { id: "change", label: "Change of base", gen: changeBase },
  { id: "neg", label: "Negative exponents", gen: negative },
  { id: "sum", label: "Sums and differences", gen: sums },
  { id: "eq", label: "Equations", gen: equation },
];

export function makeProblem(seed: number, kind: string): Problem {
  const rng = mulberry32(seed * 7919 + 17);
  const k = kind === "mixed" ? KINDS[Math.floor(rng() * KINDS.length)] : KINDS.find((x) => x.id === kind)!;
  return k.gen(rng);
}

export function ExponentDrill() {
  const [seed, setSeed] = useState(1);
  const [kind, setKind] = useState("mixed");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<null | "right" | "wrong">(null);
  const [showSol, setShowSol] = useState(false);
  const [score, setScore] = useState({ right: 0, tried: 0 });
  const prob = useMemo(() => makeProblem(seed, kind), [seed, kind]);

  const next = (k = kind) => {
    setKind(k);
    setSeed((s) => s + 1);
    setInput("");
    setStatus(null);
    setShowSol(false);
  };
  const check = () => {
    const v = Number(input.trim().replace("−", "-"));
    if (input.trim() === "" || !Number.isFinite(v)) return;
    const ok = v === prob.answer;
    if (status === null) setScore((s) => ({ right: s.right + (ok ? 1 : 0), tried: s.tried + 1 }));
    setStatus(ok ? "right" : "wrong");
    if (ok) setShowSol(true);
  };

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem", justifyItems: "center" }}>
      <div className="explorer-controls row" style={{ justifyContent: "center", width: "100%" }}>
        <label>
          Problem type{" "}
          <select value={kind} onChange={(e) => next(e.target.value)}>
            <option value="mixed">Mixed</option>
            {KINDS.map((k) => (
              <option key={k.id} value={k.id}>
                {k.label}
              </option>
            ))}
          </select>
        </label>
        <span className="badge">
          {score.right} / {score.tried} correct
        </span>
      </div>
      <div style={{ textAlign: "center", width: "100%", maxWidth: 520 }}>
        <div style={{ color: "var(--muted)", fontSize: 15 }}>
          {prob.kind}: {prob.prompt}
        </div>
        <div style={{ overflowX: "auto", fontSize: "1.15em" }}>
          <Tex tex={prob.tex} display />
        </div>
      </div>
      <form
        className="row"
        style={{ justifyContent: "center" }}
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        {prob.base !== null ? (
          <Tex tex={`= ${prob.base}^{\\,n}\\qquad n =`} />
        ) : (
          <Tex tex="x =" />
        )}
        <input
          type="text"
          inputMode="numeric"
          aria-label="Your answer"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (status === "wrong") setStatus(null);
          }}
          style={{ width: "5.5em", textAlign: "center" }}
        />
        <button type="submit" className="btn primary small">
          Check
        </button>
        <button type="button" className="btn small" onClick={() => setShowSol(true)}>
          Show solution
        </button>
        <button type="button" className="btn small" onClick={() => next()}>
          New problem
        </button>
      </form>
      {status && (
        <div style={{ color: status === "right" ? "var(--good)" : "var(--bad)", fontWeight: 600 }}>
          {status === "right" ? "Correct." : "Not quite. Try again, or show the solution."}
        </div>
      )}
      {showSol && (
        <div className="explorer-readout" style={{ display: "grid", gap: "0.45rem", width: "100%", maxWidth: 560 }}>
          {prob.steps.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 15 }}>{s.text}</div>
              <div style={{ overflowX: "auto" }}>
                <Tex tex={s.tex} />
              </div>
            </div>
          ))}
          <div>
            Answer:{" "}
            <Tex tex={prob.base !== null ? `${prob.base}^{${prob.answer}}` : `x = ${prob.answer}`} />
          </div>
        </div>
      )}
    </div>
  );
}

export const registry = {
  "2-2-rules-of-exponents/exponent-drill": ExponentDrill,
};
