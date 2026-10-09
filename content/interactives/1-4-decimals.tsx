"use client";
// Interactive explorers for section 1.4 Decimals.
// All arithmetic is exact (integers / BigInt); no floating-point rounding is used for displayed digits.

import { useState } from "react";
import { Tex } from "@/components/Tex";

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

const sup = (base: string, e: number) => (e === 1 ? base : `${base}^{${e}}`);

/* ------------------------------------------------------------------ */
/* Decimal expansion explorer                                           */
/* ------------------------------------------------------------------ */

interface Expansion {
  intPart: number;
  pre: number[]; // digits before the repeating block
  rep: number[]; // repeating block (empty if the decimal terminates)
  remainders: number[]; // remainder before each digit
}

/** Long division of p/q (p >= 0, q >= 1). */
function expand(p: number, q: number): Expansion {
  const intPart = Math.floor(p / q);
  let r = p % q;
  const seen = new Map<number, number>();
  const digits: number[] = [];
  const remainders: number[] = [];
  while (r !== 0 && !seen.has(r)) {
    seen.set(r, digits.length);
    remainders.push(r);
    r *= 10;
    digits.push(Math.floor(r / q));
    r %= q;
  }
  if (r === 0) return { intPart, pre: digits, rep: [], remainders };
  const start = seen.get(r)!;
  return { intPart, pre: digits.slice(0, start), rep: digits.slice(start), remainders };
}

function factorTex(q: number): { tex: string; m: number; n: number; other: number } {
  let m = 0;
  let n = 0;
  let rest = q;
  while (rest % 2 === 0) {
    rest /= 2;
    m++;
  }
  while (rest % 5 === 0) {
    rest /= 5;
    n++;
  }
  const others: string[] = [];
  let t = rest;
  for (let pr = 3; pr * pr <= t; pr += 2) {
    let e = 0;
    while (t % pr === 0) {
      t /= pr;
      e++;
    }
    if (e) others.push(sup(`${pr}`, e));
  }
  if (t > 1) others.push(`${t}`);
  const parts: string[] = [];
  if (m) parts.push(sup("2", m));
  if (n) parts.push(sup("5", n));
  const otherTex = others.map((o) => `\\mathbf{${o}}`);
  const all = [...parts, ...otherTex];
  return { tex: all.length ? all.join("\\cdot ") : "1", m, n, other: rest };
}

const PRESETS: [number, number][] = [
  [3, 40],
  [21, 56],
  [5, 12],
  [4, 11],
  [3, 7],
  [7, 22],
  [39, 130],
  [1, 17],
];

function NumBox({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
      {label}
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        style={{ width: "5.5rem" }}
        onChange={(e) => {
          const v = Math.round(Number(e.target.value));
          if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v)));
        }}
      />
    </label>
  );
}

export function DecimalExpansion({ initial = [7, 22] }: { initial?: [number, number] }) {
  const [a, setA] = useState(initial[0]);
  const [b, setB] = useState(initial[1]);
  const [nth, setNth] = useState(50);

  const g = gcd(a, b) || b;
  const p = a / g;
  const q = b / g;
  const f = factorTex(q);
  const ex = expand(p, q);
  const terminates = ex.rep.length === 0;
  const k = Math.max(f.m, f.n);

  const preStr = ex.pre.join("");
  const repStr = ex.rep.join("");
  const decTex = terminates
    ? `${ex.intPart}${preStr ? "." + preStr : ""}`
    : `${ex.intPart}.${preStr}\\overline{${repStr}}`;

  // n-th digit after the decimal point
  let nthDigit = 0;
  let nthWhy = "";
  if (nth <= ex.pre.length) {
    nthDigit = ex.pre[nth - 1];
    nthWhy = `before the repeating block, digit ${nth}`;
  } else if (terminates) {
    nthDigit = 0;
    nthWhy = `the decimal has ended, so the digit is 0`;
  } else {
    const pos = ((nth - ex.pre.length - 1) % ex.rep.length) + 1;
    nthDigit = ex.rep[pos - 1];
    nthWhy =
      ex.pre.length > 0
        ? `skip ${ex.pre.length} digit${ex.pre.length > 1 ? "s" : ""} before the block; ${nth - ex.pre.length} = ${ex.rep.length}(${Math.floor((nth - ex.pre.length - 1) / ex.rep.length)}) + ${pos}, so it is digit ${pos} of the block`
        : `${nth} = ${ex.rep.length}(${Math.floor((nth - 1) / ex.rep.length)}) + ${pos}, so it is digit ${pos} of the block`;
  }

  const shownRem = ex.remainders.slice(0, 24);

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem", width: "100%" }}>
      <div className="explorer-controls" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem 1rem", alignItems: "center" }}>
        <NumBox label="Numerator" value={a} min={0} max={999} onChange={setA} />
        <NumBox label="Denominator" value={b} min={1} max={999} onChange={setB} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {PRESETS.map(([x, y]) => (
          <button
            key={`${x}/${y}`}
            type="button"
            onClick={() => {
              setA(x);
              setB(y);
            }}
          >
            <Tex tex={`\\frac{${x}}{${y}}`} />
          </button>
        ))}
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.45rem" }}>
        <div>
          <strong>1. Lowest terms.</strong>{" "}
          <Tex tex={g > 1 ? `\\frac{${a}}{${b}} = \\frac{${p}}{${q}}` : `\\frac{${a}}{${b}} \\text{ is already in lowest terms}`} />
        </div>
        <div>
          <strong>2. Factor the denominator.</strong> <Tex tex={`${q} = ${f.tex}`} />
        </div>
        <div>
          <strong>3. Verdict.</strong>{" "}
          {q === 1 ? (
            <>It is an integer, so there is nothing after the decimal point.</>
          ) : terminates ? (
            <>
              Only 2s and 5s, so it <strong>terminates</strong> after <Tex tex={`\\max(${f.m}, ${f.n}) = ${k}`} /> digit{k > 1 ? "s" : ""}:{" "}
              <Tex tex={`\\frac{${p}}{${q}} = \\frac{${p * (10 ** k / q)}}{${10 ** k}}`} />
            </>
          ) : (
            <>
              A prime factor other than 2 or 5 (in bold) survives, so it <strong>repeats</strong>: {ex.pre.length} digit
              {ex.pre.length === 1 ? "" : "s"} before the block, block length {ex.rep.length}.
            </>
          )}
        </div>
        <div style={{ overflowX: "auto", paddingBottom: 2 }}>
          <Tex tex={`\\frac{${a}}{${b}} = ${decTex}`} />
        </div>
        {!terminates && (
          <div style={{ fontSize: "0.92em" }}>
            Remainders in the long division: {shownRem.join(", ")}
            {ex.remainders.length > shownRem.length ? ", …" : ""}. The next remainder is{" "}
            {ex.remainders[ex.pre.length]} again, so from there the digits repeat.
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
          <NumBox label="Digit number" value={nth} min={1} max={9999} onChange={setNth} />
          <span>
            after the decimal point is <strong>{nthDigit}</strong> ({nthWhy}).
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Place-value and rounding explorer                                    */
/* ------------------------------------------------------------------ */

const S = 6; // decimal places stored
const MAXINT = 7; // integer digits allowed
const TEN = BigInt(10);
const ZERO = BigInt(0);
const pow10 = (e: number) => TEN ** BigInt(e);

const PLACE: Record<number, string> = {
  6: "millions",
  5: "hundred thousands",
  4: "ten thousands",
  3: "thousands",
  2: "hundreds",
  1: "tens",
  0: "ones (units)",
  [-1]: "tenths",
  [-2]: "hundredths",
  [-3]: "thousandths",
  [-4]: "ten-thousandths",
  [-5]: "hundred-thousandths",
  [-6]: "millionths",
};

/** Parses "−1,234.5" into an integer scaled by 10^S, or null. */
function parse(text: string): bigint | null {
  const t = text.replace(/,/g, "").replace(/−/g, "-").trim();
  const m = /^(-?)(\d{0,7})(?:\.(\d{0,6}))?$/.exec(t);
  if (!m || (m[2] === "" && (m[3] ?? "") === "")) return null;
  const intDigits = m[2] || "0";
  const frac = (m[3] ?? "").padEnd(S, "0");
  const v = BigInt(intDigits) * pow10(S) + BigInt(frac);
  return m[1] === "-" ? -v : v;
}

/** Formats a scaled integer with comma grouping and the minimal number of decimals. */
function format(v: bigint, minDecimals = 0): string {
  const neg = v < ZERO;
  const a = neg ? -v : v;
  const ip = (a / pow10(S)).toString();
  let fp = (a % pow10(S)).toString().padStart(S, "0").replace(/0+$/, "");
  if (fp.length < minDecimals) fp = fp.padEnd(minDecimals, "0");
  const grouped = ip.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (neg ? "−" : "") + grouped + (fp ? "." + fp : "");
}

/** Digit of |v| at power e (e from -S to MAXINT-1). */
function digitAt(v: bigint, e: number): number {
  const a = v < ZERO ? -v : v;
  return Number((a / pow10(S + e)) % TEN);
}

/** Rounds to the place 10^e following the Math Conventions (halves go away from 0). */
function roundTo(v: bigint, e: number): bigint {
  const neg = v < ZERO;
  const a = neg ? -v : v;
  const u = pow10(S + e);
  let q = a / u;
  const rem = a % u;
  if (rem * BigInt(2) >= u) q += BigInt(1);
  const r = q * u;
  return neg ? -r : r;
}

const PV_PRESETS = ["4,068.257", "0.0905", "-36.45", "57.0449", "2,999.96"];

export function PlaceValueExplorer({ initial = "4,068.257", place = -2 }: { initial?: string; place?: number }) {
  const [text, setText] = useState(initial);
  const [val, setVal] = useState<bigint>(parse(initial) ?? ZERO);
  const [sel, setSel] = useState(place);

  const setFromText = (t: string) => {
    setText(t);
    const v = parse(t);
    if (v !== null) setVal(v);
  };
  const setValue = (v: bigint) => {
    setVal(v);
    setText(format(v).replace("−", "-"));
  };

  const a = val < ZERO ? -val : val;
  // highest nonzero integer place (at least the ones place)
  let top = 0;
  for (let e = MAXINT - 1; e > 0; e--) {
    if (a >= pow10(S + e)) {
      top = e;
      break;
    }
  }
  // lowest nonzero decimal place (at least tenths shown)
  let bottom = -1;
  for (let e = -S; e < 0; e++) {
    if (digitAt(val, e) !== 0) {
      bottom = e;
      break;
    }
  }
  const lowShown = Math.min(bottom, sel);
  const highShown = Math.max(top, sel);
  const places: number[] = [];
  for (let e = highShown; e >= lowShown; e--) places.push(e);

  const d = digitAt(val, sel);
  const placeValueTex = sel >= 0 ? `${d}\\cdot 10^{${sel}} = ${format(BigInt(d) * pow10(S + sel)).replace(/,/g, "{,}")}` : `${d}\\cdot 10^{${sel}} = ${d}\\left(\\frac{1}{${format(pow10(S - sel)).replace(/,/g, "{,}")}}\\right) = ${format(BigInt(d) * pow10(S + sel))}`;

  const rounded = roundTo(val, sel);
  const roundedStr = format(rounded, Math.max(0, -sel));
  const half = val !== ZERO && (a % pow10(S + sel)) * BigInt(2) === pow10(S + sel);

  const canTimes = a * TEN < pow10(S + MAXINT); // stays within the digits shown
  const canDivide = a % TEN === ZERO; // no digit would fall off the last stored place

  const expanded = places
    .filter((e) => digitAt(val, e) !== 0)
    .map((e) => `${digitAt(val, e)}(10^{${e}})`)
    .join(" + ");

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem", width: "100%" }}>
      <div className="explorer-controls" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
        <label style={{ display: "inline-flex", gap: "0.4rem", alignItems: "center" }}>
          Number
          <input type="text" inputMode="decimal" value={text} onChange={(e) => setFromText(e.target.value)} style={{ width: "9rem" }} />
        </label>
        {PV_PRESETS.map((p) => (
          <button key={p} type="button" onClick={() => setFromText(p)}>
            {p.replace("-", "−")}
          </button>
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, justifyContent: "center", minWidth: "fit-content", margin: "0 auto" }}>
          {val < ZERO && <span style={{ fontSize: "1.5rem", padding: "0 2px 1.3rem" }}>{"−"}</span>}
          {places.map((e) => (
            <div key={e} style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                type="button"
                onClick={() => setSel(e)}
                aria-label={`${PLACE[e]} digit`}
                style={{
                  display: "grid",
                  justifyItems: "center",
                  padding: "4px 2px",
                  minWidth: 26,
                  fontSize: "1.35rem",
                  fontVariantNumeric: "tabular-nums",
                  border: e === sel ? "2px solid var(--accent)" : "1px solid var(--border)",
                  background: e === sel ? "var(--accent-soft)" : "transparent",
                  borderRadius: 6,
                  color: "inherit",
                }}
              >
                {digitAt(val, e)}
                <span style={{ fontSize: "0.6rem", opacity: 0.8 }}>
                  <Tex tex={`10^{${e}}`} />
                </span>
              </button>
              {e === 0 && <span style={{ fontSize: "1.5rem", padding: "0 1px 1.3rem" }}>.</span>}
              {e > 0 && e % 3 === 0 && <span style={{ fontSize: "1.5rem", padding: "0 1px 1.3rem" }}>,</span>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
        <button type="button" disabled={!canTimes} onClick={() => setValue(val * TEN)}>
          × 10
        </button>
        <button type="button" disabled={!canDivide} onClick={() => setValue(val / TEN)}>
          ÷ 10
        </button>
        <button type="button" disabled={sel >= MAXINT - 1} onClick={() => setSel(sel + 1)}>
          ← place
        </button>
        <button type="button" disabled={sel <= -S} onClick={() => setSel(sel - 1)}>
          place →
        </button>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.45rem" }}>
        <div>
          The <strong>{PLACE[sel]}</strong> digit is <strong>{d}</strong>; its value is <Tex tex={placeValueTex} />.
        </div>
        <div>
          Rounded to the nearest {sel === 0 ? "whole number (ones)" : PLACE[sel].replace(/s$/, "").replace(" (unit)", "")}: <strong>{roundedStr}</strong>
          {half ? (
            <span>
              {" "}
              (exactly halfway, so it goes to the {val < ZERO ? "lesser" : "greater"} possibility, MC p. 4)
            </span>
          ) : null}
        </div>
        {expanded && (
          <div style={{ overflowX: "auto" }}>
            <Tex tex={`${val < ZERO ? "-\\left(" : ""}${expanded}${val < ZERO ? "\\right)" : ""}`} />
          </div>
        )}
      </div>
    </div>
  );
}

export const registry = {
  "1-4-decimals/decimal-expansion": DecimalExpansion,
  "1-4-decimals/place-value-explorer": PlaceValueExplorer,
};
