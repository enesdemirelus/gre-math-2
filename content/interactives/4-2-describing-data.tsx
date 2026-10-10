"use client";
// Interactive explorers for section 4.2 Numerical Methods for Describing Data.
//  - DotPlotLab: add / remove points on a number line; every statistic updates (ETS rules).
//  - TransformExplorer: "multiply by k, then add c" and "add one more value" on a fixed list.

import { useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { Tex } from "@/components/Tex";

const ACTIVE: CSSProperties = { background: "var(--accent-soft)", borderColor: "var(--accent)", fontWeight: 600 };

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className="btn small" aria-pressed={on} style={on ? ACTIVE : undefined} onClick={onClick}>
      {children}
    </button>
  );
}

const r2 = (n: number) => Math.round(n * 100) / 100;
/** Up to 2 decimals, no trailing zeros. */
const f = (v: number) => String(Math.round(v * 100) / 100 === 0 ? 0 : Math.round(v * 100) / 100);

/* ------------------------------------------------------------------ */
/* ETS statistics                                                      */
/* ------------------------------------------------------------------ */

const medianOf = (s: number[]): number => {
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};

export interface Stats {
  n: number;
  mean: number;
  median: number;
  modes: number[];
  range: number;
  q1: number | null;
  q3: number | null;
  iqr: number | null;
  ss: number;
  variance: number;
  sd: number;
}

/**
 * ETS definitions: median of an ordered list (average of the two middle numbers if n is even);
 * Q1 and Q3 are the medians of the lower and upper halves (for odd n the median itself is left out of both halves);
 * standard deviation = square root of the mean of the squared differences (divide by n).
 */
export function statsOf(data: number[]): Stats {
  const s = [...data].sort((a, b) => a - b);
  const n = s.length;
  if (n === 0) return { n: 0, mean: 0, median: 0, modes: [], range: 0, q1: null, q3: null, iqr: null, ss: 0, variance: 0, sd: 0 };
  const mean = s.reduce((a, b) => a + b, 0) / n;
  const h = Math.floor(n / 2);
  const q1 = h > 0 ? medianOf(s.slice(0, h)) : null;
  const q3 = h > 0 ? medianOf(s.slice(n - h)) : null;
  const cnt = new Map<number, number>();
  s.forEach((v) => cnt.set(v, (cnt.get(v) ?? 0) + 1));
  const top = Math.max(...cnt.values());
  const modes = [...cnt.entries()].filter(([, c]) => c === top).map(([v]) => v);
  const ss = s.reduce((a, v) => a + (v - mean) ** 2, 0);
  return {
    n,
    mean,
    median: medianOf(s),
    modes: top === 1 && n > 1 ? [] : modes,
    range: s[n - 1] - s[0],
    q1,
    q3,
    iqr: q1 !== null && q3 !== null ? q3 - q1 : null,
    ss,
    variance: ss / n,
    sd: Math.sqrt(ss / n),
  };
}

function Cell({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--border, rgba(128,128,128,.35))", borderRadius: 8, padding: "0.3rem 0.5rem", minWidth: 0 }}>
      <div style={{ fontSize: "0.72rem", opacity: 0.75 }}>{label}</div>
      <div style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dot plot lab                                                        */
/* ------------------------------------------------------------------ */

const LO = 0;
const HI = 20;
const MAX_STACK = 8;
const MAX_N = 30;

const PRESETS: { name: string; data: number[] }[] = [
  { name: "Symmetric", data: [6, 8, 9, 10, 10, 11, 12, 14] },
  { name: "One far-out value", data: [3, 4, 5, 5, 6, 7, 8, 19] },
  { name: "Two clusters", data: [2, 2, 3, 3, 3, 15, 16, 16, 17] },
];

function toCounts(data: number[]): number[] {
  const c = Array(HI - LO + 1).fill(0);
  data.forEach((v) => (c[v - LO] += 1));
  return c;
}

export function DotPlotLab() {
  const [counts, setCounts] = useState<number[]>(toCounts(PRESETS[0].data));
  const [mode, setMode] = useState<"add" | "remove">("add");

  const data: number[] = [];
  counts.forEach((c, i) => {
    for (let k = 0; k < c; k++) data.push(LO + i);
  });
  const st = statsOf(data);

  const W = 360;
  const x0 = 22;
  const x1 = W - 22;
  const sx = (v: number) => r2(x0 + ((v - LO) / (HI - LO)) * (x1 - x0));
  const base = 120;
  const R = 5.5;
  const gap = 12;
  const boxY = 168;

  const onPointer = (e: ReactPointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ux = ((e.clientX - rect.left) / rect.width) * W;
    const v = Math.max(LO, Math.min(HI, Math.round(LO + ((ux - x0) / (x1 - x0)) * (HI - LO))));
    setCounts((prev) => {
      const next = [...prev];
      const total = next.reduce((a, b) => a + b, 0);
      if (mode === "add") {
        if (next[v - LO] < MAX_STACK && total < MAX_N) next[v - LO] += 1;
      } else if (next[v - LO] > 0) next[v - LO] -= 1;
      return next;
    });
  };

  const sorted = [...data].sort((a, b) => a - b);
  const stepsText =
    st.n > 0
      ? `Σ(x − ${f(st.mean)})² = ${f(st.ss)};  ÷ ${st.n} = ${f(st.variance)};  √ = ${f(st.sd)}`
      : "";

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem", justifyItems: "center" }}>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Choice on={mode === "add"} onClick={() => setMode("add")}>
          Tap to add
        </Choice>
        <Choice on={mode === "remove"} onClick={() => setMode("remove")}>
          Tap to remove
        </Choice>
        <button type="button" className="btn small" onClick={() => setCounts(Array(HI - LO + 1).fill(0))}>
          Clear
        </button>
      </div>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
        {PRESETS.map((p) => (
          <button key={p.name} type="button" className="btn small" onClick={() => setCounts(toCounts(p.data))}>
            {p.name}
          </button>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${W} 200`}
        width="100%"
        style={{ maxWidth: W, touchAction: "manipulation", cursor: "pointer" }}
        role="img"
        aria-label={`Dot plot of ${st.n} values`}
        onPointerDown={onPointer}
      >
        <rect x={0} y={0} width={W} height={200} fill="transparent" />
        {st.n > 0 && (
          <g>
            <line className="dg-accent" x1={sx(st.mean)} y1={22} x2={sx(st.mean)} y2={base + 5} style={{ strokeDasharray: "4 3" }} />
            <text className="dg-text" x={sx(st.mean)} y={16} textAnchor="middle" style={{ fontSize: 10 }}>
              mean = {f(st.mean)}
            </text>
          </g>
        )}
        {counts.map((c, i) =>
          Array.from({ length: c }).map((_, k) => <circle key={`${i}-${k}`} className="dg-point" cx={sx(LO + i)} cy={base - R - k * gap} r={R} />),
        )}
        <line className="dg-line" x1={x0} y1={base} x2={x1} y2={base} />
        {Array.from({ length: HI - LO + 1 }).map((_, i) => (
          <g key={i}>
            <line className="dg-line" x1={sx(LO + i)} y1={base} x2={sx(LO + i)} y2={base + (i % 5 === 0 ? 5 : 3)} />
            {i % 5 === 0 && (
              <text className="dg-text" x={sx(LO + i)} y={base + 17} textAnchor="middle" style={{ fontSize: 10 }}>
                {LO + i}
              </text>
            )}
          </g>
        ))}
        {st.n >= 2 && st.q1 !== null && st.q3 !== null && (
          <g>
            <line className="dg-line" x1={sx(sorted[0])} y1={boxY} x2={sx(st.q1)} y2={boxY} />
            <line className="dg-line" x1={sx(st.q3)} y1={boxY} x2={sx(sorted[st.n - 1])} y2={boxY} />
            <line className="dg-line" x1={sx(sorted[0])} y1={boxY - 6} x2={sx(sorted[0])} y2={boxY + 6} />
            <line className="dg-line" x1={sx(sorted[st.n - 1])} y1={boxY - 6} x2={sx(sorted[st.n - 1])} y2={boxY + 6} />
            <rect className="dg-fill dg-line" x={sx(st.q1)} y={boxY - 11} width={r2(sx(st.median) - sx(st.q1))} height={22} />
            <rect className="dg-fill dg-line" x={sx(st.median)} y={boxY - 11} width={r2(sx(st.q3) - sx(st.median))} height={22} />
            <line className="dg-accent" x1={sx(st.median)} y1={boxY - 11} x2={sx(st.median)} y2={boxY + 11} style={{ strokeWidth: 2.5 }} />
          </g>
        )}
        {st.n < 2 && (
          <text className="dg-text" x={W / 2} y={boxY + 4} textAnchor="middle" style={{ fontSize: 11, opacity: 0.7 }}>
            {st.n === 0 ? "Tap the number line to add points" : "Add at least 2 points for a boxplot"}
          </text>
        )}
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(92px, 1fr))", gap: "0.4rem", width: "100%", maxWidth: 420 }}>
        <Cell label="n">{st.n}</Cell>
        <Cell label="mean">{st.n ? f(st.mean) : "—"}</Cell>
        <Cell label="median (Q₂)">{st.n ? f(st.median) : "—"}</Cell>
        <Cell label="mode">{st.n ? (st.modes.length ? st.modes.map(f).join(", ") : "none repeats") : "—"}</Cell>
        <Cell label="range">{st.n ? f(st.range) : "—"}</Cell>
        <Cell label="Q₁">{st.q1 !== null ? f(st.q1) : "—"}</Cell>
        <Cell label="Q₃">{st.q3 !== null ? f(st.q3) : "—"}</Cell>
        <Cell label="IQR">{st.iqr !== null ? f(st.iqr) : "—"}</Cell>
        <Cell label="standard deviation">{st.n ? f(st.sd) : "—"}</Cell>
      </div>
      {st.n > 0 && (
        <p style={{ fontSize: "0.85rem", margin: 0, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
          ETS standard deviation, step by step: {stepsText}
        </p>
      )}
      <p style={{ fontSize: "0.8rem", opacity: 0.75, margin: 0, textAlign: "center", maxWidth: 420 }}>
        Quartiles use the ETS rule: Q₁ and Q₃ are the medians of the lower and upper halves. With an odd number of points the middle point is left out of both halves.
        The standard deviation divides by n, not n − 1.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Transform / add-a-value explorer                                    */
/* ------------------------------------------------------------------ */

const BASES: { name: string; data: number[] }[] = [
  { name: "Evenly spread", data: [4, 6, 7, 9, 11, 12, 13, 18] },
  { name: "One far-out value", data: [5, 6, 6, 7, 8, 9, 10, 29] },
  { name: "Clustered", data: [8, 9, 9, 10, 10, 10, 11, 11, 12] },
];

function niceStep(span: number): number {
  const raw = span / 6;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const m = raw / pow;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * pow;
}

function Rows({ rows, newValue }: { rows: { label: string; data: number[] }[]; newValue?: number }) {
  const all = rows.flatMap((r) => r.data);
  const step = niceStep(Math.max(...all) - Math.min(...all) || 1);
  const min = Math.floor((Math.min(...all) - step / 2) / step) * step;
  const max = Math.ceil((Math.max(...all) + step / 2) / step) * step;
  const W = 360;
  const x0 = 56;
  const x1 = W - 20;
  const sx = (v: number) => r2(x0 + ((v - min) / (max - min)) * (x1 - x0));
  const R = 4.5;
  const gap = 10;
  const stackOf = (d: number[]) => {
    const c = new Map<number, number>();
    d.forEach((v) => c.set(v, (c.get(v) ?? 0) + 1));
    return Math.max(...c.values());
  };
  const rowH = 20 + Math.max(...rows.map((r) => stackOf(r.data))) * gap + 8;
  const H = rows.length * rowH + 28;
  const ticksList: number[] = [];
  for (let v = min; v <= max + 1e-9; v += step) ticksList.push(r2(v));
  const axisY = rows.length * rowH + 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W }} role="img" aria-label="Before and after dot plots">
      {ticksList.map((t) => (
        <g key={t}>
          <line x1={sx(t)} y1={2} x2={sx(t)} y2={axisY} style={{ stroke: "var(--fg)", strokeOpacity: 0.12 }} />
          <text className="dg-text" x={sx(t)} y={axisY + 14} textAnchor="middle" style={{ fontSize: 10 }}>
            {f(t)}
          </text>
        </g>
      ))}
      <line className="dg-line" x1={x0} y1={axisY} x2={x1} y2={axisY} />
      {rows.map((row, i) => {
        const base = (i + 1) * rowH - 4;
        const s = statsOf(row.data);
        const c = new Map<number, number>();
        const sorted = [...row.data].sort((a, b) => a - b);
        return (
          <g key={i}>
            <text className="dg-text" x={x0 - 6} y={base - 4} textAnchor="end" style={{ fontSize: 11 }}>
              {row.label}
            </text>
            <line className="dg-line dg-thin" x1={x0} y1={base} x2={x1} y2={base} />
            {sorted.map((v, j) => {
              c.set(v, (c.get(v) ?? 0) + 1);
              const isNew = newValue !== undefined && i === 1 && v === newValue && c.get(v) === sorted.filter((u) => u === v).length;
              return <circle key={j} className={isNew ? "dg-accent dg-accent-fill" : "dg-point"} cx={sx(v)} cy={base - R - ((c.get(v) ?? 1) - 1) * gap} r={R} />;
            })}
            <line className="dg-accent" x1={sx(s.mean)} y1={base - rowH + 6} x2={sx(s.mean)} y2={base + 3} style={{ strokeDasharray: "3 3" }} />
          </g>
        );
      })}
    </svg>
  );
}

function arrow(a: number, b: number): string {
  if (Math.abs(a - b) < 1e-9) return "same";
  return b > a ? "up" : "down";
}

export function TransformExplorer() {
  const [bi, setBi] = useState(0);
  const [mode, setMode] = useState<"transform" | "add">("transform");
  const [k, setK] = useState(1);
  const [c, setC] = useState(0);
  const [v, setV] = useState(10);

  const base = BASES[bi].data;
  const after = mode === "transform" ? base.map((x) => r2(k * x + c)) : [...base, v];
  const a = statsOf(base);
  const b = statsOf(after);

  const rowsDef: { name: string; tex: string; before: number; after: number; rule?: string }[] = [
    { name: "mean", tex: "\\text{mean}", before: a.mean, after: b.mean, rule: mode === "transform" ? "k·mean + c" : undefined },
    { name: "median", tex: "\\text{median}", before: a.median, after: b.median, rule: mode === "transform" ? "k·median + c" : undefined },
    { name: "range", tex: "\\text{range}", before: a.range, after: b.range, rule: mode === "transform" ? "|k|·range" : undefined },
    { name: "IQR", tex: "\\text{IQR}", before: a.iqr ?? 0, after: b.iqr ?? 0, rule: mode === "transform" ? "|k|·IQR" : undefined },
    { name: "SD", tex: "\\sigma", before: a.sd, after: b.sd, rule: mode === "transform" ? "|k|·SD" : undefined },
  ];

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem", justifyItems: "center" }}>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Choice on={mode === "transform"} onClick={() => setMode("transform")}>
          Change every value
        </Choice>
        <Choice on={mode === "add"} onClick={() => setMode("add")}>
          Add one more value
        </Choice>
      </div>
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
        {BASES.map((B, i) => (
          <Choice key={B.name} on={bi === i} onClick={() => setBi(i)}>
            {B.name}
          </Choice>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: "0.85rem", textAlign: "center", fontVariantNumeric: "tabular-nums" }}>Original list: {base.join(", ")}</p>
      <div style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        {mode === "transform" ? (
          <>
            <label>
              Multiply every value by <Tex tex={`k = ${f(k)}`} />
              <input type="range" style={{ width: "100%" }} min={-3} max={3} step={0.5} value={k} onChange={(e) => setK(Number(e.target.value))} />
            </label>
            <label>
              Then add <Tex tex={`c = ${f(c)}`} />
              <input type="range" style={{ width: "100%" }} min={-10} max={10} step={1} value={c} onChange={(e) => setC(Number(e.target.value))} />
            </label>
          </>
        ) : (
          <label>
            New value <Tex tex={`v = ${v}`} />
            <input type="range" style={{ width: "100%" }} min={0} max={40} step={1} value={v} onChange={(e) => setV(Number(e.target.value))} />
          </label>
        )}
      </div>
      <Rows
        rows={[
          { label: "before", data: base },
          { label: "after", data: after },
        ]}
        newValue={mode === "add" ? v : undefined}
      />
      <table style={{ width: "100%", maxWidth: 420, fontSize: "0.85rem", fontVariantNumeric: "tabular-nums", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", opacity: 0.8 }}>
            <th style={{ padding: "2px 4px" }}>statistic</th>
            <th style={{ padding: "2px 4px" }}>before</th>
            <th style={{ padding: "2px 4px" }}>after</th>
            <th style={{ padding: "2px 4px" }}>{mode === "transform" ? "rule" : "change"}</th>
          </tr>
        </thead>
        <tbody>
          {rowsDef.map((r) => (
            <tr key={r.name} style={{ borderTop: "1px solid var(--border, rgba(128,128,128,.3))" }}>
              <td style={{ padding: "2px 4px" }}>{r.name}</td>
              <td style={{ padding: "2px 4px" }}>{f(r.before)}</td>
              <td style={{ padding: "2px 4px", fontWeight: 600 }}>{f(r.after)}</td>
              <td style={{ padding: "2px 4px" }}>{mode === "transform" ? r.rule : arrow(r.before, r.after)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: "0.8rem", opacity: 0.75, margin: 0, textAlign: "center", maxWidth: 420 }}>
        {mode === "transform"
          ? "Adding c slides everything (position statistics move, spread statistics do not). Multiplying by k stretches: spread statistics scale by |k|, so a negative k flips the picture but spread stays positive."
          : "Try v equal to the mean: the mean does not move, but the standard deviation shrinks. Try a very large v: the mean and range jump, the median and IQR barely change."}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export const registry = {
  "4-2-describing-data/dot-plot-lab": DotPlotLab,
  "4-2-describing-data/transform-explorer": TransformExplorer,
};
