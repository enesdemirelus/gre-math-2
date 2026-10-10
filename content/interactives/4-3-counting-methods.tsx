"use client";
// Interactive explorers for section 4.3 Counting Methods.

import { useState } from "react";
import { Tex } from "@/components/Tex";
import { Venn2, Venn3, type Region2, type Region3 } from "@/content/diagrams/4-3-counting-methods";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ------------------------------------------------------------------ */
/* Venn explorer                                                         */
/* ------------------------------------------------------------------ */

const H2: { id: string; label: string; regions: Region2[] }[] = [
  { id: "none", label: "No shading", regions: [] },
  { id: "a", label: "A", regions: ["a", "ab"] },
  { id: "b", label: "B", regions: ["b", "ab"] },
  { id: "union", label: "A ∪ B", regions: ["a", "b", "ab"] },
  { id: "inter", label: "A ∩ B", regions: ["ab"] },
  { id: "aonly", label: "A only", regions: ["a"] },
  { id: "neither", label: "Neither", regions: ["none"] },
];

function TwoSets() {
  const [total, setTotal] = useState(60);
  const [A, setA] = useState(35);
  const [B, setB] = useState(28);
  const [both, setBoth] = useState(12);
  const [hl, setHl] = useState("union");

  const a = Math.min(A, total);
  const b = Math.min(B, total);
  const lo = Math.max(0, a + b - total);
  const hi = Math.min(a, b);
  const x = clamp(both, lo, hi);
  const union = a + b - x;
  const neither = total - union;
  const regions = H2.find((h) => h.id === hl)?.regions ?? [];

  return (
    <div style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <Venn2 counts={{ a: a - x, ab: x, b: b - x, none: neither }} highlight={regions} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", justifyContent: "center" }}>
        {H2.map((h) => (
          <button key={h.id} type="button" onClick={() => setHl(h.id)} aria-pressed={hl === h.id} style={hl === h.id ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined}>
            {h.label}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 380 }}>
        <label>
          Everyone (universal set) <Tex tex={`= ${total}`} />
          <input type="range" style={{ width: "100%" }} min={10} max={100} value={total} onChange={(e) => setTotal(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={`|A| = ${a}`} />
          <input type="range" style={{ width: "100%" }} min={0} max={total} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={`|B| = ${b}`} />
          <input type="range" style={{ width: "100%" }} min={0} max={total} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={`|A \\cap B| = ${x}`} /> (allowed: {lo} to {hi})
          <input type="range" style={{ width: "100%" }} min={lo} max={hi} value={x} onChange={(e) => setBoth(Number(e.target.value))} disabled={lo === hi} />
        </label>
      </div>
      <div style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex tex={`|A \\cup B| = |A| + |B| - |A \\cap B| = ${a} + ${b} - ${x} = ${union}`} />
        </div>
        <div>
          <Tex tex={`\\text{neither} = ${total} - ${union} = ${neither}`} />
        </div>
        <div>
          <Tex tex={`\\text{only } A = ${a} - ${x} = ${a - x}, \\qquad \\text{only } B = ${b} - ${x} = ${b - x}`} />
        </div>
        <div style={{ fontSize: "0.9em", opacity: 0.85 }}>
          Try pushing <Tex tex="|A|" /> and <Tex tex="|B|" /> up: when <Tex tex="|A| + |B|" /> exceeds the total, the overlap is forced to be at least <Tex tex="|A| + |B| - \text{total}" />.
        </div>
      </div>
    </div>
  );
}

const R3: Region3[] = ["a", "b", "c", "ab", "ac", "bc", "abc", "none"];
const R3NAME: Record<Region3, string> = { a: "A only", b: "B only", c: "C only", ab: "A,B only", ac: "A,C only", bc: "B,C only", abc: "all three", none: "none" };

function ThreeSets() {
  const [v, setV] = useState<Record<Region3, number>>({ a: 8, b: 6, c: 5, ab: 4, ac: 3, bc: 2, abc: 1, none: 7 });
  const [hl, setHl] = useState<Region3[]>([]);
  const set = (k: Region3, n: number) => setV((p) => ({ ...p, [k]: clamp(Number.isFinite(n) ? Math.round(n) : 0, 0, 99) }));
  const A = v.a + v.ab + v.ac + v.abc;
  const B = v.b + v.ab + v.bc + v.abc;
  const C = v.c + v.ac + v.bc + v.abc;
  const AB = v.ab + v.abc;
  const AC = v.ac + v.abc;
  const BC = v.bc + v.abc;
  const union = v.a + v.b + v.c + v.ab + v.ac + v.bc + v.abc;
  const exactlyOne = v.a + v.b + v.c;
  const exactlyTwo = v.ab + v.ac + v.bc;
  const total = union + v.none;
  const ie = A + B + C - AB - AC - BC + v.abc;
  const toggle = (k: Region3) => setHl((h) => (h.includes(k) ? h.filter((x) => x !== k) : [...h, k]));
  return (
    <div style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <Venn3 counts={v} highlight={hl} />
      <div style={{ fontSize: "0.9em", opacity: 0.85, textAlign: "center" }}>Type a count for each of the eight regions. Tap a name to shade that region.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.4rem", width: "100%", maxWidth: 480 }}>
        {R3.map((k) => (
          <label key={k} style={{ display: "grid", gap: 2 }}>
            <button type="button" onClick={() => toggle(k)} aria-pressed={hl.includes(k)} style={hl.includes(k) ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined}>
              {R3NAME[k]}
            </button>
            <input type="number" inputMode="numeric" min={0} max={99} value={v[k]} onChange={(e) => set(k, Number(e.target.value))} />
          </label>
        ))}
      </div>
      <div style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 560 }}>
        <div>
          <Tex tex={`|A| = ${A},\\ |B| = ${B},\\ |C| = ${C}`} />
        </div>
        <div>
          <Tex tex={`|A\\cap B| = ${AB},\\ |A\\cap C| = ${AC},\\ |B\\cap C| = ${BC},\\ |A\\cap B\\cap C| = ${v.abc}`} />
        </div>
        <div>
          <Tex tex={`|A\\cup B\\cup C| = ${union}, \\quad \\text{neither} = ${v.none}, \\quad \\text{total} = ${total}`} />
        </div>
        <div>
          <Tex tex={`\\text{exactly one: } ${exactlyOne}, \\quad \\text{exactly two: } ${exactlyTwo}, \\quad \\text{all three: } ${v.abc}`} />
        </div>
        <div style={{ fontSize: "0.9em", opacity: 0.85 }}>
          Check (add singles, subtract pairs, add the triple back, which follows from counting regions):
          <Tex tex={`${A}+${B}+${C}-${AB}-${AC}-${BC}+${v.abc} = ${ie}`} />
        </div>
      </div>
    </div>
  );
}

export function VennExplorer() {
  const [mode, setMode] = useState<2 | 3>(2);
  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem" }}>
      <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center" }}>
        <button type="button" onClick={() => setMode(2)} aria-pressed={mode === 2} style={mode === 2 ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined}>
          Two sets
        </button>
        <button type="button" onClick={() => setMode(3)} aria-pressed={mode === 3} style={mode === 3 ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined}>
          Three sets
        </button>
      </div>
      {mode === 2 ? <TwoSets /> : <ThreeSets />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Permutations vs combinations                                          */
/* ------------------------------------------------------------------ */

const LETTERS = "ABCDEFGH";
const LIST_CAP = 120;

function fact(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function perms(n: number, k: number, cap: number): number[][] {
  const out: number[][] = [];
  const used = new Array(n).fill(false);
  const cur: number[] = [];
  const rec = () => {
    if (out.length >= cap) return;
    if (cur.length === k) {
      out.push([...cur]);
      return;
    }
    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(i);
      rec();
      cur.pop();
      used[i] = false;
      if (out.length >= cap) return;
    }
  };
  rec();
  return out;
}

function combos(n: number, k: number, cap: number): number[][] {
  const out: number[][] = [];
  const cur: number[] = [];
  const rec = (start: number) => {
    if (out.length >= cap) return;
    if (cur.length === k) {
      out.push([...cur]);
      return;
    }
    for (let i = start; i < n; i++) {
      cur.push(i);
      rec(i + 1);
      cur.pop();
      if (out.length >= cap) return;
    }
  };
  rec(0);
  return out;
}

export function PermCombExplorer() {
  const [n, setN] = useState(5);
  const [k, setK] = useState(3);
  const [order, setOrder] = useState(true);
  const kk = Math.min(k, n);

  const nPk = fact(n) / fact(n - kk);
  const nCk = nPk / fact(kk);
  const rep = Math.pow(n, kk);

  const items = order ? perms(n, kk, LIST_CAP) : combos(n, kk, LIST_CAP);
  const total = order ? nPk : nCk;
  const hueOf = (arr: number[]) => {
    // group by the underlying set: color chips of the same combination alike
    const key = [...arr].sort((p, q) => p - q);
    let h = 0;
    for (const d of key) h = (h * 9 + d + 1) % 360;
    return (h * 47) % 360;
  };
  const chipStyle = (arr: number[]) => {
    const h = hueOf(arr);
    return {
      padding: "2px 7px",
      borderRadius: 6,
      border: `1px solid hsl(${h} 60% 45%)`,
      background: `hsl(${h} 70% 55% / 0.22)`,
      fontFamily: "ui-monospace, Menlo, monospace",
      fontSize: 14,
    } as const;
  };
  const fallingProduct = Array.from({ length: kk }, (_, i) => n - i).join(" \\cdot ");

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem" }}>
      <div style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 380 }}>
        <label>
          Objects to choose from <Tex tex={`n = ${n}`} /> ({LETTERS.slice(0, n).split("").join(", ")})
          <input
            type="range"
            style={{ width: "100%" }}
            min={1}
            max={8}
            value={n}
            onChange={(e) => {
              const nn = Number(e.target.value);
              setN(nn);
              if (k > nn) setK(nn);
            }}
          />
        </label>
        <label>
          Number chosen <Tex tex={`k = ${kk}`} />
          <input type="range" style={{ width: "100%" }} min={0} max={n} value={kk} onChange={(e) => setK(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        <button type="button" onClick={() => setOrder(true)} aria-pressed={order} style={order ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined}>
          Order matters (permutations)
        </button>
        <button type="button" onClick={() => setOrder(false)} aria-pressed={!order} style={!order ? { fontWeight: 700, outline: "2px solid var(--accent)" } : undefined}>
          Order does not matter (combinations)
        </button>
      </div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <div>
          <Tex tex={`{}_{${n}}P_{${kk}} = \\dfrac{${n}!}{${n - kk}!} = ${kk === 0 ? "1" : fallingProduct} = ${nPk}`} />
        </div>
        <div>
          <Tex tex={`{}_{${n}}C_{${kk}} = \\dfrac{${n}!}{${kk}!\\,${n - kk}!} = \\dfrac{${nPk}}{${fact(kk)}} = ${nCk}`} />
        </div>
        <div>
          <Tex tex={`{}_{${n}}P_{${kk}} = {}_{${n}}C_{${kk}} \\cdot ${kk}! \\quad (${nPk} = ${nCk} \\cdot ${fact(kk)})`} />
        </div>
        <div style={{ fontSize: "0.9em", opacity: 0.85 }}>
          For comparison, if repeats were allowed (ordered, repeats fine) there would be <Tex tex={`${n}^{${kk}} = ${rep}`} /> arrangements.
        </div>
      </div>
      <div>
        <strong>{order ? `${total} ordered selections` : `${total} unordered selections`}</strong>
        {order && kk > 1 ? " (chips of the same color use the same objects, just in a different order)" : ""}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
          {items.map((it, i) => (
            <span key={i} style={chipStyle(it)}>
              {kk === 0 ? "(empty)" : it.map((d) => LETTERS[d]).join("")}
            </span>
          ))}
          {total > items.length && <span style={{ alignSelf: "center" }}>… and {total - items.length} more</span>}
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "4-3-counting-methods/venn-explorer": VennExplorer,
  "4-3-counting-methods/perm-comb-explorer": PermCombExplorer,
};
