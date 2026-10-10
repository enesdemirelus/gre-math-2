"use client";
// Interactive explorers for section 4.5 Distributions, Random Variables, and Probability Distributions.

import { useState } from "react";
import { Tex } from "@/components/Tex";

const r2 = (n: number) => Math.round(n * 100) / 100;
const phi = (z: number) => Math.exp(-(z * z) / 2) / Math.sqrt(2 * Math.PI);

/** erf via Abramowitz-Stegun 7.1.26 refinement (|error| < 1.5e-7). */
function erf(x: number): number {
  const s = x < 0 ? -1 : 1;
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
}
const Phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));

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
function fracTex(num: number, den: number): string {
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  return d === 1 ? `${n}` : `\\frac{${n}}{${d}}`;
}
const minus = (s: string) => s.replace("-", "−");

/* ------------------------------------------------------------------ */
/* Normal curve explorer                                                */
/* ------------------------------------------------------------------ */

// Cumulative probability at z = -2, -1, 0, 1, 2 from Mathematical Conventions Figure 7.
const FIG7_BREAKS = [-Infinity, -2, -1, 0, 1, 2, Infinity];
const FIG7_REGION = [0.02, 0.14, 0.34, 0.34, 0.14, 0.02];

export function NormalExplorer() {
  const [m, setM] = useState(5);
  const [d, setD] = useState(2);
  const [a, setA] = useState(3);
  const [b, setB] = useState(7);
  const [openL, setOpenL] = useState(false);
  const [openR, setOpenR] = useState(false);

  const lo = m - 4 * d;
  const hi = m + 4 * d;
  const clamp = (v: number) => Math.min(hi, Math.max(lo, v));
  const A = clamp(a);
  const B = clamp(b);
  const left = Math.min(A, B);
  const right = Math.max(A, B);

  // --- drawing (fixed axis -25..25 so that a smaller SD visibly gives a taller, narrower curve)
  const W = 360;
  const xmin = -20;
  const xmax = 20;
  const L = 18;
  const R = 342;
  const base = 168;
  const H = 130;
  const ymax = phi(0) / 1.5 * 1.08;
  const sx = (x: number) => L + ((x - xmin) / (xmax - xmin)) * (R - L);
  const sy = (x: number) => base - (phi((x - m) / d) / d / ymax) * H;
  const curvePts: string[] = [];
  for (let i = 0; i <= 250; i++) {
    const x = xmin + ((xmax - xmin) * i) / 250;
    curvePts.push(`${r2(sx(x))} ${r2(sy(x))}`);
  }
  const sLo = openL ? xmin : Math.max(xmin, left);
  const sHi = openR ? xmax : Math.min(xmax, right);
  let shade = "";
  if (sHi > sLo) {
    const pts = [`${r2(sx(sLo))} ${base}`];
    for (let i = 0; i <= 120; i++) {
      const x = sLo + ((sHi - sLo) * i) / 120;
      pts.push(`${r2(sx(x))} ${r2(sy(x))}`);
    }
    pts.push(`${r2(sx(sHi))} ${base}`);
    shade = "M " + pts.join(" L ") + " Z";
  }
  const pxPerSd = ((R - L) / (xmax - xmin)) * d;
  const sdMarks = (pxPerSd >= 24 ? [-3, -2, -1, 0, 1, 2, 3] : [-4, -2, 0, 2, 4]);

  // --- probability
  const zl = openL ? -Infinity : (left - m) / d;
  const zr = openR ? Infinity : (right - m) / d;
  const eps = 1e-9;
  const isInt = (z: number) => !Number.isFinite(z) || (Math.abs(z - Math.round(z)) < eps && Math.abs(Math.round(z)) <= 2);
  const onFig = isInt(zl) && isInt(zr);
  let lower = 0;
  let upper = 0;
  for (let i = 0; i < FIG7_REGION.length; i++) {
    const rl = FIG7_BREAKS[i];
    const rh = FIG7_BREAKS[i + 1];
    if (rl >= zl - eps && rh <= zr + eps) lower += FIG7_REGION[i];
    if (rl < zr - eps && rh > zl + eps) upper += FIG7_REGION[i];
  }
  const exact = (Number.isFinite(zr) ? Phi(zr) : 1) - (Number.isFinite(zl) ? Phi(zl) : 0);
  const zText = (x: number) => {
    const z = (x - m) / d;
    if (Math.abs(z) < 1e-9) return "at the mean";
    return `${Math.abs(z).toFixed(2).replace(/\.?0+$/, "")} SD ${z > 0 ? "above" : "below"} the mean`;
  };

  const set = (na: number, nb: number, ol = false, or = false) => {
    setA(na);
    setB(nb);
    setOpenL(ol);
    setOpenR(or);
  };

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 ${W} 214`} width={W} style={{ maxWidth: "100%" }} role="img" aria-label={`Normal curve with mean ${m} and standard deviation ${d}`}>
        {shade && <path d={shade} className="dg-accent-fill" />}
        <path d={"M " + curvePts.join(" L ")} className="dg-line" />
        <line x1={L - 6} y1={base} x2={R + 6} y2={base} className="dg-line" />
        <line x1={r2(sx(m))} y1={base} x2={r2(sx(m))} y2={r2(sy(m))} className="dg-line dg-dashed" />
        {sdMarks.map((k) => {
          const x = m + k * d;
          if (x < xmin || x > xmax) return null;
          return (
            <g key={k}>
              <line x1={r2(sx(x))} y1={base} x2={r2(sx(x))} y2={base + 5} className="dg-line" />
              <text x={r2(sx(x))} y={base + 17} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12 }}>
                {minus(String(r2(x)))}
              </text>
              {k === 0 && (
                <text x={r2(sx(x))} y={base + 31} className="dg-label" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12, opacity: 0.7 }}>
                  mean
                </text>
              )}
            </g>
          );
        })}
        {!openL && left >= xmin && left <= xmax && <line x1={r2(sx(left))} y1={base} x2={r2(sx(left))} y2={r2(sy(left))} className="dg-accent" />}
        {!openR && right >= xmin && right <= xmax && <line x1={r2(sx(right))} y1={base} x2={r2(sx(right))} y2={r2(sy(right))} className="dg-accent" />}
      </svg>

      <div style={{ display: "grid", gap: "0.45rem", width: "100%", maxWidth: 420 }}>
        <label>
          mean <Tex tex={`m = ${minus(String(m))}`} />
          <input type="range" min={-10} max={10} step={0.5} value={m} onChange={(e) => setM(Number(e.target.value))} style={{ width: "100%" }} />
        </label>
        <label>
          standard deviation <Tex tex={`d = ${d}`} />
          <input type="range" min={1.5} max={6} step={0.5} value={d} onChange={(e) => setD(Number(e.target.value))} style={{ width: "100%" }} />
        </label>
        <label>
          left end <Tex tex={`a = ${minus(String(A))}`} />
          <input type="range" min={lo} max={hi} step={0.5} value={A} disabled={openL} onChange={(e) => setA(Number(e.target.value))} style={{ width: "100%" }} />
          <span style={{ marginLeft: 8 }}>
            <input type="checkbox" checked={openL} onChange={(e) => setOpenL(e.target.checked)} /> no left end (everything below)
          </span>
        </label>
        <label>
          right end <Tex tex={`b = ${minus(String(B))}`} />
          <input type="range" min={lo} max={hi} step={0.5} value={B} disabled={openR} onChange={(e) => setB(Number(e.target.value))} style={{ width: "100%" }} />
          <span style={{ marginLeft: 8 }}>
            <input type="checkbox" checked={openR} onChange={(e) => setOpenR(e.target.checked)} /> no right end (everything above)
          </span>
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <button type="button" onClick={() => set(m - d, m + d)}>within 1 SD</button>
          <button type="button" onClick={() => set(m - 2 * d, m + 2 * d)}>within 2 SD</button>
          <button type="button" onClick={() => set(m, m, false, true)}>above the mean</button>
          <button type="button" onClick={() => set(m + d, m + 2 * d)}>1 to 2 SD above</button>
          <button type="button" onClick={() => set(m - 0.5 * d, m + 1.5 * d)}>a non-whole-SD case</button>
        </div>
      </div>

      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        {!openL && (
          <div>
            <Tex tex={`z_a = \\dfrac{${minus(String(left))} - ${minus(String(m))}}{${d}} = ${minus(r2((left - m) / d).toString())}`} /> <span>: {zText(left)}</span>
          </div>
        )}
        {!openR && (
          <div>
            <Tex tex={`z_b = \\dfrac{${minus(String(right))} - ${minus(String(m))}}{${d}} = ${minus(r2((right - m) / d).toString())}`} /> <span>: {zText(right)}</span>
          </div>
        )}
        <div>
          {onFig ? (
            <>
              Using the approximate probabilities in Math Conventions Figure 7:{" "}
              <Tex tex={`P \\approx ${lower.toFixed(2)}`} />
            </>
          ) : (
            <>
              An end is not a whole number of SDs from the mean (or lies beyond 2 SD), so Figure 7 only brackets the answer:{" "}
              <Tex tex={`${lower.toFixed(2)} \\le P \\le ${upper.toFixed(2)}`} /> (whole regions inside the interval, and all regions it touches).
            </>
          )}
        </div>
        <div style={{ opacity: 0.8 }}>
          More precise value (calculation beyond the scope of the ETS review): <Tex tex={`P \\approx ${exact.toFixed(3)}`} />. The probability of any single value, such as <Tex tex="X = a" />, is <Tex tex="0" />.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Expected value explorer                                              */
/* ------------------------------------------------------------------ */

const VALUES = [1, 2, 3, 4, 5, 6];

const PRESETS: { name: string; w: number[] }[] = [
  { name: "fair (uniform)", w: [1, 1, 1, 1, 1, 1] },
  { name: "weighted toward 6", w: [1, 1, 1, 1, 2, 4] },
  { name: "two extremes", w: [5, 0, 0, 0, 0, 5] },
  { name: "centered", w: [0, 1, 4, 4, 1, 0] },
];

export function ExpectedValueExplorer() {
  const [w, setW] = useState<number[]>([1, 1, 1, 1, 2, 4]);
  const total = w.reduce((s, x) => s + x, 0);
  const weighted = w.reduce((s, x, i) => s + x * VALUES[i], 0);
  const mean = total > 0 ? weighted / total : 0;
  const probs = w.map((x) => (total > 0 ? x / total : 0));

  const Wd = 360;
  const left = 46;
  const right = 340;
  const top = 26;
  const base = 142;
  const step = (right - left) / VALUES.length;
  const bw = step * 0.78;
  const cx = (i: number) => left + step * (i + 0.5);
  const maxP = Math.max(0.5, Math.ceil(Math.max(...probs, 0.01) * 10) / 10);
  const sy = (p: number) => base - (p / maxP) * (base - top);
  const meanX = left + step * (0.5 + (mean - 1));
  const below = w.reduce((s, x, i) => (VALUES[i] < mean - 1e-12 ? s + x : s), 0);
  const above = w.reduce((s, x, i) => (VALUES[i] > mean + 1e-12 ? s + x : s), 0);

  const setOne = (i: number, v: number) => setW((old) => old.map((x, j) => (j === i ? v : x)));
  const tickStep = maxP <= 0.5 ? 0.1 : 0.2;
  const yTicks: number[] = [];
  for (let t = 0; t <= maxP + 1e-9; t += tickStep) yTicks.push(r2(t));

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.7rem", justifyItems: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
        {PRESETS.map((p) => (
          <button type="button" key={p.name} onClick={() => setW(p.w)}>
            {p.name}
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${Wd} 206`} width={Wd} style={{ maxWidth: "100%" }} role="img" aria-label="Probability histogram of X">
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={left - 4} y1={r2(sy(t))} x2={left} y2={r2(sy(t))} className="dg-line" />
            <text x={left - 8} y={r2(sy(t))} className="dg-text" textAnchor="end" dominantBaseline="central" style={{ fontSize: 12 }}>
              {t === 0 ? "0" : t.toFixed(1)}
            </text>
          </g>
        ))}
        {VALUES.map((v, i) => (
          <g key={v}>
            <rect x={r2(cx(i) - bw / 2)} y={r2(sy(probs[i]))} width={r2(bw)} height={r2(base - sy(probs[i]))} className="dg-accent-fill dg-line" />
            <text x={r2(cx(i))} y={base + 13} className="dg-text" textAnchor="middle" dominantBaseline="central">{v}</text>
          </g>
        ))}
        <line x1={left} y1={top - 8} x2={left} y2={base} className="dg-line" />
        <line x1={left} y1={base} x2={right} y2={base} className="dg-line" />
        {total > 0 && (
          <g>
            <path d={`M ${r2(meanX)} ${base + 24} l -7 12 l 14 0 Z`} className="dg-accent-fill dg-line" />
            <text x={r2(meanX)} y={base + 51} className="dg-text" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12 }}>mean (balance point)</text>
          </g>
        )}
        <text x={left - 24} y={top - 14} className="dg-label" textAnchor="middle" dominantBaseline="central">P(X)</text>
      </svg>

      <div style={{ display: "grid", gap: "0.2rem", width: "100%", maxWidth: 420 }}>
        <div style={{ opacity: 0.8, fontSize: 14 }}>
          Weight (how many of {total || 0} equally likely tickets show each value). Probability = weight / total.
        </div>
        {VALUES.map((v, i) => (
          <label key={v} style={{ display: "grid", gridTemplateColumns: "3.2rem 1fr 5.2rem", alignItems: "center", gap: 8 }}>
            <span>
              <Tex tex={`X=${v}`} />
            </span>
            <input type="range" min={0} max={10} step={1} value={w[i]} onChange={(e) => setOne(i, Number(e.target.value))} />
            <span>{total > 0 ? <Tex tex={`P = ${fracTex(w[i], total)}`} /> : null}</span>
          </label>
        ))}
      </div>

      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        {total === 0 ? (
          <div>Give at least one value a positive weight: the probabilities must add up to 1.</div>
        ) : (
          <>
            <div style={{ overflowX: "auto" }}>
              <Tex
                tex={`E(X) = ${VALUES.filter((_, i) => w[i] > 0)
                  .map((v) => `${v}\\cdot ${fracTex(w[v - 1], total)}`)
                  .join(" + ")}`}
              />
            </div>
            <div>
              <Tex tex={`E(X) = \\dfrac{${weighted}}{${total}} = ${fracTex(weighted, total)} \\approx ${mean.toFixed(3).replace(/\.?0+$/, "")}`} />
            </div>
            <div>
              <Tex tex={`P(X < E(X)) = ${fracTex(below, total)} \\approx ${(below / total).toFixed(2)},\\quad P(X > E(X)) = ${fracTex(above, total)} \\approx ${(above / total).toFixed(2)}`} />
            </div>
            <div style={{ opacity: 0.8, fontSize: 14 }}>
              The expected value is the balance point of the histogram, and it need not be a possible value of X. Probabilities always sum to 1.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export const registry = {
  "4-5-distributions/normal-explorer": NormalExplorer,
  "4-5-distributions/expected-value-explorer": ExpectedValueExplorer,
};
