"use client";
// Interactive explorers for section 1.1 Integers.

import { useState, type CSSProperties, type ReactNode } from "react";
import { Tex } from "@/components/Tex";
import { RemainderLine, divmod, signed } from "../diagrams/1-1-integers";

/* ------------------------------------------------------------------ */
/* Number theory helpers (exact integer arithmetic)                    */
/* ------------------------------------------------------------------ */

type Factor = [number, number]; // [prime, exponent]

function factorize(n: number): Factor[] {
  const out: Factor[] = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    if (m % p === 0) {
      let e = 0;
      while (m % p === 0) {
        m /= p;
        e++;
      }
      out.push([p, e]);
    }
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

function divisors(n: number): number[] {
  const small: number[] = [];
  const large: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      small.push(i);
      if (i * i !== n) large.push(n / i);
    }
  }
  return small.concat(large.reverse());
}

/** ETS style: (2^3)(3^2)(5) */
function factorTex(f: Factor[]): string {
  return f.map(([p, e]) => (e === 1 ? `(${p})` : `(${p}^{${e}})`)).join("");
}

function fmt(n: number): string {
  return n.toLocaleString("en-US").replace(/,/g, "{,}");
}

const MAX = 1_000_000;

function parse(s: string): number | null {
  const t = s.trim().replace(/,/g, "");
  if (!/^\d+$/.test(t)) return null;
  const v = Number(t);
  if (!Number.isSafeInteger(v) || v < 1 || v > MAX) return null;
  return v;
}

/* ------------------------------------------------------------------ */
/* Factor explorer                                                     */
/* ------------------------------------------------------------------ */

type Filter = "all" | "odd" | "even";

function NumberSummary({ n, label }: { n: number; label: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const f = factorize(n);
  const divs = divisors(n);
  const count = divs.length;
  const shown = divs.filter((x) => (filter === "all" ? true : filter === "odd" ? x % 2 === 1 : x % 2 === 0));
  const isSquare = Math.round(Math.sqrt(n)) ** 2 === n;
  const countTex = f.length === 0 ? "1" : f.map(([, e]) => `(${e} + 1)`).join("") + ` = ${count}`;
  const twoExp = f.find(([p]) => p === 2)?.[1] ?? 0;
  const oddPart = n / 2 ** twoExp;

  let status: string;
  if (n === 1) status = "1 is neither prime nor composite.";
  else if (f.length === 1 && f[0][1] === 1) status = `${n} is prime: its only positive divisors are 1 and ${n}.`;
  else status = `${fmt(n).replace(/\{,\}/g, ",")} is composite.`;

  return (
    <div style={{ display: "grid", gap: "0.4rem" }}>
      <div>
        <Tex tex={n === 1 ? `${label} = 1` : `${label} = ${fmt(n)} = ${factorTex(f)}`} />
      </div>
      <div style={{ fontSize: "0.95em" }}>{status}</div>
      <div>
        <Tex tex={`\\text{positive divisors: } ${countTex}`} />
        {"  "}
        <span style={{ fontSize: "0.9em", opacity: 0.85 }}>
          ({2 * count} integer factors, counting negatives{isSquare ? "; odd count because " : ""}
          {isSquare ? <Tex tex={`${fmt(n)} = ${Math.round(Math.sqrt(n))}^2`} /> : null}
          {isSquare ? " is a perfect square" : ""})
        </span>
      </div>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "0.9em" }}>Show:</span>
        {(["all", "odd", "even"] as Filter[]).map((k) => (
          <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)} style={{ fontWeight: filter === k ? 700 : 400 }}>
            {k}
          </button>
        ))}
        <span style={{ fontSize: "0.9em" }}>
          {filter === "odd" && (
            <>
              odd divisors = divisors of the odd part <Tex tex={`${fmt(oddPart)}`} />: {shown.length}
            </>
          )}
          {filter === "even" && (
            <>
              even divisors = {count} − {count - shown.length} = {shown.length}
            </>
          )}
        </span>
      </div>
      <div style={{ lineHeight: 1.7, wordBreak: "break-word", fontSize: "0.95em" }}>{shown.length ? shown.map((x) => x.toLocaleString("en-US")).join(", ") : "none"}</div>
    </div>
  );
}

export function FactorExplorer() {
  const [aText, setAText] = useState("360");
  const [bText, setBText] = useState("84");
  const [compare, setCompare] = useState(true);
  const a = parse(aText);
  const b = parse(bText);

  let gcdBlock: ReactNode = null;
  if (compare && a !== null && b !== null) {
    const fa = new Map(factorize(a));
    const fb = new Map(factorize(b));
    const primes = Array.from(new Set([...fa.keys(), ...fb.keys()])).sort((x, y) => x - y);
    let g = 1;
    let l = 1;
    const rows = primes.map((p) => {
      const ea = fa.get(p) ?? 0;
      const eb = fb.get(p) ?? 0;
      g *= p ** Math.min(ea, eb);
      l *= p ** Math.max(ea, eb);
      return { p, ea, eb };
    });
    const gF: Factor[] = rows.filter((r) => Math.min(r.ea, r.eb) > 0).map((r) => [r.p, Math.min(r.ea, r.eb)]);
    const lF: Factor[] = rows.filter((r) => Math.max(r.ea, r.eb) > 0).map((r) => [r.p, Math.max(r.ea, r.eb)]);
    const cell: CSSProperties = { padding: "0.2rem 0.6rem", textAlign: "center", borderBottom: "1px solid var(--border, #ccc)" };
    gcdBlock = (
      <div style={{ display: "grid", gap: "0.4rem" }}>
        {rows.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", fontSize: "0.95em" }}>
              <thead>
                <tr>
                  <th style={cell}>prime</th>
                  <th style={cell}>in a</th>
                  <th style={cell}>in b</th>
                  <th style={cell}>GCD (min)</th>
                  <th style={cell}>LCM (max)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.p}>
                    <td style={cell}>{r.p}</td>
                    <td style={cell}>{r.ea}</td>
                    <td style={cell}>{r.eb}</td>
                    <td style={cell}>{Math.min(r.ea, r.eb)}</td>
                    <td style={cell}>{Math.max(r.ea, r.eb)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div>
          <Tex tex={`\\text{GCD} = ${gF.length ? factorTex(gF) + " = " : ""}${fmt(g)}`} />
        </div>
        <div>
          <Tex tex={`\\text{LCM} = ${lF.length ? factorTex(lF) + " = " : ""}${fmt(l)}`} />
        </div>
        <div>
          <Tex tex={`\\text{GCD}\\cdot\\text{LCM} = ${fmt(g)}\\cdot ${fmt(l)} = ${fmt(g * l)}`} />
        </div>
        <div>
          <Tex tex={`ab = ${fmt(a)}\\cdot ${fmt(b)} = ${fmt(a * b)}`} />
        </div>
      </div>
    );
  }

  const inputStyle: CSSProperties = { width: "8.5em", fontSize: "1rem", padding: "0.25rem 0.4rem" };

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.8rem", width: "100%", maxWidth: 560 }}>
      <div className="explorer-controls" style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "center" }}>
        <label>
          <Tex tex="a = " />{" "}
          <input type="text" inputMode="numeric" value={aText} onChange={(e) => setAText(e.target.value)} style={inputStyle} aria-label="first positive integer" />
        </label>
        <label>
          <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} /> compare with{" "}
          <Tex tex="b = " />{" "}
          <input type="text" inputMode="numeric" value={bText} onChange={(e) => setBText(e.target.value)} style={inputStyle} disabled={!compare} aria-label="second positive integer" />
        </label>
      </div>
      <div style={{ fontSize: "0.85em", opacity: 0.8 }}>Positive integers from 1 to 1,000,000.</div>
      <div className="explorer-readout" style={{ display: "grid", gap: "1rem" }}>
        {a === null ? <div>Enter a positive integer up to 1,000,000 for a.</div> : <NumberSummary key={`a${a}`} n={a} label="a" />}
        {compare && (b === null ? <div>Enter a positive integer up to 1,000,000 for b.</div> : <NumberSummary key={`b${b}`} n={b} label="b" />)}
        {gcdBlock}
      </div>
      <div style={{ fontSize: "0.85em", opacity: 0.8 }}>
        The divisor-count formula and the smaller/larger-exponent rule for GCD and LCM are standard facts, though not stated in the ETS Math Review.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Remainder explorer                                                  */
/* ------------------------------------------------------------------ */

const neg = (x: number) => (x < 0 ? `(${x})` : `${x}`);

export function RemainderExplorer() {
  const [n, setN] = useState(-23);
  const [d, setD] = useState(5);
  const { q, r } = divmod(n, d);
  const clampN = (v: number) => Math.max(-60, Math.min(60, v));

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center", width: "100%" }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <RemainderLineFluid n={n} d={d} />
      </div>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Dividend <Tex tex={`n = ${n}`} />
          <input type="range" style={{ width: "100%" }} min={-60} max={60} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setN(clampN(n - d))}>
            n − d
          </button>
          <button type="button" onClick={() => setN(clampN(n - 1))}>
            n − 1
          </button>
          <button type="button" onClick={() => setN(clampN(n + 1))}>
            n + 1
          </button>
          <button type="button" onClick={() => setN(clampN(n + d))}>
            n + d
          </button>
          <button type="button" onClick={() => setN(clampN(-n))}>
            −n
          </button>
        </div>
        <label>
          Divisor <Tex tex={`d = ${d}`} />
          <input type="range" style={{ width: "100%" }} min={2} max={12} step={1} value={d} onChange={(e) => setD(Number(e.target.value))} />
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          Greatest multiple of {d} that is ≤ {signed(n)}: <Tex tex={`(${q})(${d}) = ${q * d}`} />
        </div>
        <div>
          <Tex tex={`${n} = (${q})(${d}) + ${r}`} />
        </div>
        <div>
          <Tex tex={`\\text{quotient } q = ${q}`} />
        </div>
        <div>
          <Tex tex={`\\text{remainder } r = ${n} - ${neg(q * d)} = ${r}`} />
        </div>
        {n < 0 && r > 0 && (
          <div style={{ fontSize: "0.92em" }}>
            Not <Tex tex={`${n} = (${q + 1})(${d}) - ${d - r}`} />: a remainder is never negative, so <Tex tex={`-${d - r}`} /> becomes <Tex tex={`-${d - r} + ${d} = ${r}`} />.
          </div>
        )}
        {r === 0 && <div style={{ fontSize: "0.92em" }}>Remainder 0: {signed(n)} is a multiple of {d}.</div>}
      </div>
    </div>
  );
}

/** RemainderLine scaled to its container width. */
function RemainderLineFluid({ n, d }: { n: number; d: number }) {
  return (
    <div style={{ width: "100%" }} className="remainder-line-fluid">
      <style>{`.remainder-line-fluid svg { width: 100%; height: auto; }`}</style>
      <RemainderLine n={n} d={d} width={340} />
    </div>
  );
}

export const registry = {
  "1-1-integers/factor-explorer": FactorExplorer,
  "1-1-integers/remainder-explorer": RemainderExplorer,
};
