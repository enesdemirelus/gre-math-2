"use client";
// Interactive explorers for section 4.1 Methods for Presenting Data.

import { useState, type CSSProperties } from "react";
import { Tex } from "@/components/Tex";
import { BarGraph, CircleGraph, Histogram } from "../diagrams/4-1-presenting-data";

const r1 = (n: number) => Math.round(n * 10) / 10;
const num = (n: number) => String(r1(n));

const ACTIVE: CSSProperties = { background: "var(--accent-soft)", borderColor: "var(--accent)", fontWeight: 600 };

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className="btn small" aria-pressed={on} style={on ? ACTIVE : undefined} onClick={onClick}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* One data set, three displays                                        */
/* ------------------------------------------------------------------ */

interface DS {
  name: string;
  title: string;
  cats: string[];
  counts: number[];
}

const SETS: DS[] = [
  { name: "School commute", title: "How 80 students travel to school", cats: ["Bus", "Walk", "Bike", "Car", "Other"], counts: [28, 18, 14, 12, 8] },
  { name: "Class election", title: "Votes for class president (150 ballots)", cats: ["Ana", "Bora", "Can", "Deniz", "Ece"], counts: [54, 45, 30, 15, 6] },
  { name: "Household pets", title: "Main pet in 60 households", cats: ["Dog", "Cat", "Fish", "Bird", "None"], counts: [24, 18, 9, 6, 3] },
];

function niceAxis(max: number): { yMax: number; step: number; minor: number } {
  const step = max <= 12 ? 2 : max <= 30 ? 5 : max <= 60 ? 10 : 20;
  return { yMax: Math.ceil(max / step) * step, step, minor: step / 2 };
}

export function DisplayExplorer() {
  const [si, setSi] = useState(0);
  const [view, setView] = useState<"freq" | "rel" | "circle">("freq");
  const [sel, setSel] = useState(0);
  const d = SETS[si];
  const total = d.counts.reduce((a, b) => a + b, 0);
  const rel = d.counts.map((c) => (c / total) * 100);
  const ang = rel.map((p) => (p / 100) * 360);
  const s = Math.min(sel, d.cats.length - 1);

  const freqAxis = niceAxis(Math.max(...d.counts));
  const relAxis = niceAxis(Math.max(...rel));

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem", justifyItems: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
        {SETS.map((x, i) => (
          <Choice key={x.name} on={i === si} onClick={() => { setSi(i); setSel(0); }}>
            {x.name}
          </Choice>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
        <Choice on={view === "freq"} onClick={() => setView("freq")}>Frequency bars</Choice>
        <Choice on={view === "rel"} onClick={() => setView("rel")}>Relative frequency bars</Choice>
        <Choice on={view === "circle"} onClick={() => setView("circle")}>Circle graph</Choice>
      </div>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        {view === "freq" && (
          <BarGraph title={d.title} categories={d.cats} series={[{ name: "Count", values: d.counts }]} yMax={freqAxis.yMax} yStep={freqAxis.step} yMinor={freqAxis.minor} yLabel="Frequency" showValues highlight={s} />
        )}
        {view === "rel" && (
          <BarGraph title={d.title} categories={d.cats} series={[{ name: "Percent", values: rel.map(r1) }]} yMax={relAxis.yMax} yStep={relAxis.step} yMinor={relAxis.minor} yLabel="Relative frequency" fmt={{ suffix: "%" }} showValues highlight={s} />
        )}
        {view === "circle" && (
          <CircleGraph title={d.title} totalText={`Total: ${total}`} slices={d.cats.map((c, i) => ({ label: c, value: d.counts[i] }))} showAngle highlight={s} />
        )}
      </div>
      <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.85, textAlign: "center" }}>
        The bar shapes in the two bar graphs are identical; only the labels on the vertical axis change. Tap a row to highlight a category.
      </p>
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <table style={{ borderCollapse: "collapse", fontSize: "0.92rem" }}>
          <thead>
            <tr>
              {["Category", "Frequency", "Relative frequency", "Central angle"].map((h) => (
                <th key={h} style={{ padding: "0.25rem 0.6rem", borderBottom: "1px solid var(--border)", textAlign: "right" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.cats.map((c, i) => (
              <tr key={c} onClick={() => setSel(i)} style={{ cursor: "pointer", background: i === s ? "var(--accent-soft)" : undefined }}>
                <td style={{ padding: "0.25rem 0.6rem", textAlign: "right" }}>{c}</td>
                <td style={{ padding: "0.25rem 0.6rem", textAlign: "right" }}>{d.counts[i]}</td>
                <td style={{ padding: "0.25rem 0.6rem", textAlign: "right" }}>{num(rel[i])}%</td>
                <td style={{ padding: "0.25rem 0.6rem", textAlign: "right" }}>{num(ang[i])}°</td>
              </tr>
            ))}
            <tr style={{ borderTop: "1px solid var(--border)", fontWeight: 600 }}>
              <td style={{ padding: "0.25rem 0.6rem", textAlign: "right" }}>Total</td>
              <td style={{ padding: "0.25rem 0.6rem", textAlign: "right" }}>{total}</td>
              <td style={{ padding: "0.25rem 0.6rem", textAlign: "right" }}>100%</td>
              <td style={{ padding: "0.25rem 0.6rem", textAlign: "right" }}>360°</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "center" }}>
        <Tex tex={`\\text{relative frequency} = \\frac{${d.counts[s]}}{${total}} = ${num(rel[s])}\\%`} />
        <br />
        <Tex tex={`\\text{central angle} = ${num(rel[s])}\\% \\times 360^\\circ = ${num(ang[s])}^\\circ`} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Histogram class-width explorer                                      */
/* ------------------------------------------------------------------ */

// 40 integer scores, all between 41 and 100.
const SCORES = [
  43, 47, 52, 56, 58, 60, 61, 63, 64, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 82, 83, 84, 85, 86, 88, 89, 90, 91, 93, 95, 96, 97, 99, 100, 65,
];
const WIDTHS = [5, 10, 15, 20, 30, 60];
const START = 40;

export function HistogramExplorer() {
  const [w, setW] = useState(10);
  const k = 60 / w;
  const edges = Array.from({ length: k + 1 }, (_, i) => START + i * w);
  const counts = edges.slice(0, -1).map((lo) => SCORES.filter((x) => x > lo && x <= lo + w).length);
  const n = SCORES.length;
  const maxC = Math.max(...counts);
  const step = maxC <= 8 ? 2 : maxC <= 20 ? 4 : maxC <= 40 ? 10 : 10;
  const yMax = Math.ceil(maxC / step) * step;
  const tallest = counts.indexOf(maxC);
  const label = (i: number) => `${edges[i] + 1}–${edges[i + 1]}`;
  const sum = counts.reduce((a, b) => a + b, 0);

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem", justifyItems: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center", alignItems: "center" }}>
        <span style={{ fontSize: "0.9rem" }}>Class width:</span>
        {WIDTHS.map((x) => (
          <Choice key={x} on={x === w} onClick={() => setW(x)}>{x}</Choice>
        ))}
      </div>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        <Histogram
          title={`${n} test scores, class width ${w}`}
          edges={edges}
          counts={counts}
          yMax={yMax}
          yStep={step}
          yMinor={step / 2}
          xLabel="Score"
          yLabel="Frequency"
          showValues
          highlight={[tallest]}
          xEvery={k > 8 ? 2 : 1}
        />
      </div>
      <div style={{ textAlign: "center", fontSize: "0.92rem", lineHeight: 1.5 }}>
        <div>
          Classes: {counts.map((c, i) => (
            <span key={i} style={{ whiteSpace: "nowrap" }}>{label(i)}: <strong>{c}</strong>{i < counts.length - 1 ? "; " : ""}</span>
          ))}
        </div>
        <div>Sum of the bar heights = <strong>{sum}</strong> = the number of scores. Tallest class: {label(tallest)}.</div>
        <div style={{ opacity: 0.85 }}>
          A class like {label(0)} holds the integer scores {edges[0] + 1}, {edges[0] + 2}, ... {edges[1]}. Bars touch because the classes fill the number line with no gaps; the same data can look flat, lumpy or one-peaked depending on the class width.
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "4-1-presenting-data/display-explorer": DisplayExplorer,
  "4-1-presenting-data/histogram-explorer": HistogramExplorer,
};
