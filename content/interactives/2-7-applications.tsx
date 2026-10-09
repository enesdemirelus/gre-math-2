"use client";
// Interactive explorers for section 2.7 Applications.

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

/** Reduced fraction as TeX. */
function frac(num: number, den: number): string {
  if (num === 0) return "0";
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  const sign = n * d < 0 ? "-" : "";
  const an = Math.abs(n);
  const ad = Math.abs(d);
  return ad === 1 ? `${sign}${an}` : `${sign}\\frac{${an}}{${ad}}`;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

function hoursMinutes(h: number): string {
  const totalMin = Math.round(h * 60);
  const hh = Math.floor(totalMin / 60);
  const mm = totalMin % 60;
  if (hh === 0) return `${mm} min`;
  return mm === 0 ? `${hh} h` : `${hh} h ${mm} min`;
}

/* ------------------------------------------------------------------ */
/* Work-rate explorer                                                  */
/* ------------------------------------------------------------------ */

export function WorkRateExplorer() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(6);
  const [drain, setDrain] = useState(false);

  // Rates in jobs per hour (exact as fractions num/den with den = a*b).
  const den = a * b;
  const numA = b; // 1/a = b/(ab)
  const numB = a; // 1/b = a/(ab)
  const numT = drain ? numA - numB : numA + numB;
  const rateA = 1 / a;
  const rateB = 1 / b;
  const rateT = numT / den;
  const finishes = rateT > 0;
  const T = finishes ? den / numT : Infinity;

  // Bar chart of rates: scale so that 1 job per hour = full width when possible.
  const x0 = 70;
  const W = 270;
  const maxRate = Math.max(rateA + rateB, 1);
  const sx = (v: number) => (v / maxRate) * W;

  // Timeline: 0 .. max(a, T) hours.
  const tMax = finishes ? Math.max(a, b, T) : Math.max(a, b);
  const tx = (v: number) => x0 + (v / tMax) * W;

  const fast = Math.min(a, b);

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox="0 0 360 200" width={360} style={{ maxWidth: "100%" }} role="img" aria-label="Rates of the two machines and their combined rate">
        <text x={8} y={14} className="dg-text" style={{ fontSize: 12 }}>
          rate (jobs per hour)
        </text>
        {/* A */}
        <text x={x0 - 8} y={40} className="dg-label" textAnchor="end" dominantBaseline="central">
          A
        </text>
        <rect x={x0} y={30} width={sx(rateA)} height={20} className="dg-fill dg-line" />
        {/* B */}
        <text x={x0 - 8} y={70} className="dg-label" textAnchor="end" dominantBaseline="central">
          B
        </text>
        <rect x={x0} y={60} width={sx(rateB)} height={20} className={drain ? "dg-line dg-dashed" : "dg-fill dg-line"} />
        {drain && (
          <text x={x0 + sx(rateB) + 6} y={70} className="dg-text" dominantBaseline="central" style={{ fontSize: 12 }}>
            drains
          </text>
        )}
        {/* Combined */}
        <text x={x0 - 8} y={100} className="dg-text" textAnchor="end" dominantBaseline="central" style={{ fontSize: 12 }}>
          {drain ? "A − B" : "A + B"}
        </text>
        {finishes ? (
          drain ? (
            <rect x={x0} y={90} width={sx(rateT)} height={20} className="dg-accent-fill" />
          ) : (
            <>
              <rect x={x0} y={90} width={sx(rateA)} height={20} className="dg-accent-fill" />
              <rect x={x0 + sx(rateA)} y={90} width={sx(rateB)} height={20} className="dg-accent-fill" style={{ fillOpacity: 0.32 }} />
            </>
          )
        ) : null}
        <rect x={x0} y={90} width={Math.max(sx(Math.max(rateT, 0)), 0.01)} height={20} className="dg-accent" />
        {/* 1 job per hour marker */}
        <line x1={x0 + sx(1)} y1={26} x2={x0 + sx(1)} y2={114} className="dg-line dg-thin dg-dashed" />
        <text x={x0 + sx(1)} y={124} className="dg-text" textAnchor="middle" style={{ fontSize: 11 }}>
          1 job/h
        </text>
        <line x1={x0} y1={26} x2={x0} y2={114} className="dg-line dg-thin" />

        {/* Timeline */}
        <text x={8} y={146} className="dg-text" style={{ fontSize: 12 }}>
          time to finish (hours)
        </text>
        <line x1={x0} y1={172} x2={x0 + W} y2={172} className="dg-line dg-thin" />
        <text x={x0} y={190} className="dg-text" textAnchor="middle" style={{ fontSize: 11 }}>
          0
        </text>
        {[
          { v: a, label: "A" },
          ...(drain ? [] : [{ v: b, label: "B" }]),
        ].map((m) => (
          <g key={m.label}>
            <line x1={tx(m.v)} y1={166} x2={tx(m.v)} y2={178} className="dg-line" />
            <text x={tx(m.v)} y={190} className="dg-label" textAnchor="middle" style={{ fontSize: 12 }}>
              {m.label}
            </text>
          </g>
        ))}
        {!drain && (
          <line x1={tx(fast / 2)} y1={168} x2={tx(fast / 2)} y2={176} className="dg-line dg-thin" />
        )}
        {finishes && (
          <>
            <line x1={x0} y1={172} x2={tx(T)} y2={172} className="dg-accent" />
            <circle cx={tx(T)} cy={172} r={4} className="dg-point" />
            <text x={tx(T)} y={161} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
              {drain ? "fills" : "together"}
            </text>
          </>
        )}
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Machine <Tex tex="A" /> alone: <Tex tex={`${a}\\text{ hours}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={24} step={1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          {drain ? "Drain " : "Machine "}
          <Tex tex="B" /> alone: <Tex tex={`${b}\\text{ hours}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={24} step={1} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input type="checkbox" checked={drain} onChange={(e) => setDrain(e.target.checked)} />
          <span>
            <Tex tex="B" /> is a drain (it empties a full tank in {b} hours)
          </span>
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex tex={`\\text{rates: } \\frac{1}{${a}} ${drain ? "-" : "+"} \\frac{1}{${b}} = ${frac(numT, den)} \\text{ of the job per hour}`} />
        </div>
        {finishes ? (
          <div>
            <Tex tex={`\\text{time} = \\frac{1}{\\text{rate}} = ${frac(den, numT)} \\text{ hours} ${Number.isInteger(T) ? "" : `\\approx ${r2(T)}`}`} />{" "}
            ({hoursMinutes(T)})
          </div>
        ) : (
          <div>
            The drain empties at least as fast as <Tex tex="A" /> fills, so the tank never fills.
          </div>
        )}
        {finishes && !drain && (
          <div>
            Check: <Tex tex={`\\frac{${fast}}{2} = ${r2(fast / 2)} ${T === fast / 2 ? "=" : "<"} ${r2(T)} < ${fast}`} />. The combined time is
            less than the faster machine&apos;s time and at least half of it.
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Simple vs. compound interest                                        */
/* ------------------------------------------------------------------ */

function niceStep(range: number, target = 5): number {
  const raw = range / target;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / p;
  const k = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10;
  return k * p;
}

const money = (v: number) => "\\$" + Math.round(v).toLocaleString("en-US").replace(/,/g, "{,}");
const moneyText = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

const FREQS: { n: number; label: string }[] = [
  { n: 1, label: "annually" },
  { n: 2, label: "semiannually" },
  { n: 4, label: "quarterly" },
  { n: 12, label: "monthly" },
];

export function InterestGrowth() {
  const [P, setP] = useState(5000);
  const [r, setR] = useState(6);
  const [t, setT] = useState(10);
  const [n, setN] = useState(1);

  const simple = (y: number) => P * (1 + (r * y) / 100);
  const periods = n * t;
  const perRate = r / (100 * n);
  const compoundAt = (k: number) => P * Math.pow(1 + perRate, k); // after k compoundings

  const factor = 1 + perRate;
  const factorRounded = Number(factor.toFixed(6));
  const factorTex = `${Math.abs(factorRounded - factor) < 1e-12 ? "=" : "\\approx"} ${factorRounded}`;

  const Vs = simple(t);
  const Vc = compoundAt(periods);

  // Chart geometry
  const L = 58;
  const R = 344;
  const Tp = 14;
  const B = 196;
  const yMin = P;
  const step = niceStep(Math.max(Vc, Vs) - yMin || 1, 4);
  const yMax = yMin + Math.ceil((Math.max(Vc, Vs) - yMin) / step) * step;
  const X = (y: number) => L + (y / t) * (R - L);
  const Y = (v: number) => B - ((v - yMin) / (yMax - yMin)) * (B - Tp);

  // Compound: step function (value stays constant between compoundings).
  let stepPath = `M ${X(0)} ${Y(P)}`;
  for (let k = 1; k <= periods; k++) {
    const xk = X(k / n);
    stepPath += ` H ${r2(xk)} V ${r2(Y(compoundAt(k)))}`;
  }

  const yTicks: number[] = [];
  for (let v = yMin; v <= yMax + 1e-9; v += step) yTicks.push(v);
  const xStep = t <= 10 ? 1 : t <= 20 ? 2 : 5;
  const xTicks: number[] = [];
  for (let y = 0; y <= t; y += xStep) xTicks.push(y);

  const fmtTick = (v: number) => (v >= 10000 ? `${r2(v / 1000)}k` : Math.round(v).toLocaleString("en-US"));

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox="0 0 360 230" width={360} style={{ maxWidth: "100%" }} role="img" aria-label="Value of the investment over time, simple versus compound interest">
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={L} y1={Y(v)} x2={R} y2={Y(v)} className="dg-line dg-thin dg-dashed" style={{ opacity: 0.35 }} />
            <text x={L - 5} y={Y(v)} className="dg-text" textAnchor="end" dominantBaseline="central" style={{ fontSize: 10 }}>
              {fmtTick(v)}
            </text>
          </g>
        ))}
        {xTicks.map((y) => (
          <g key={y}>
            <line x1={X(y)} y1={B} x2={X(y)} y2={B + 4} className="dg-line dg-thin" />
            <text x={X(y)} y={B + 15} className="dg-text" textAnchor="middle" style={{ fontSize: 10 }}>
              {y}
            </text>
          </g>
        ))}
        <line x1={L} y1={B} x2={R} y2={B} className="dg-line dg-thin" />
        <line x1={L} y1={Tp} x2={L} y2={B} className="dg-line dg-thin" />
        <text x={(L + R) / 2} y={B + 29} className="dg-text" textAnchor="middle" style={{ fontSize: 11 }}>
          years
        </text>
        {/* simple interest: straight line */}
        <line x1={X(0)} y1={Y(P)} x2={X(t)} y2={Y(Vs)} className="dg-line dg-dashed" />
        {/* compound: steps */}
        <path d={stepPath} className="dg-accent" />
        {/* legend */}
        <line x1={L + 10} y1={Tp + 8} x2={L + 34} y2={Tp + 8} className="dg-accent" />
        <text x={L + 40} y={Tp + 8} className="dg-text" dominantBaseline="central" style={{ fontSize: 11 }}>
          compound
        </text>
        <line x1={L + 10} y1={Tp + 24} x2={L + 34} y2={Tp + 24} className="dg-line dg-dashed" />
        <text x={L + 40} y={Tp + 24} className="dg-text" dominantBaseline="central" style={{ fontSize: 11 }}>
          simple
        </text>
      </svg>
      <div style={{ fontSize: "0.85em", opacity: 0.8 }}>Vertical axis starts at the principal, {moneyText(P)}.</div>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Principal <Tex tex={`P = ${money(P)}`} />
          <input type="range" style={{ width: "100%" }} min={1000} max={20000} step={1000} value={P} onChange={(e) => setP(Number(e.target.value))} />
        </label>
        <label>
          Annual rate <Tex tex={`r = ${r}`} /> (percent)
          <input type="range" style={{ width: "100%" }} min={0.5} max={15} step={0.5} value={r} onChange={(e) => setR(Number(e.target.value))} />
        </label>
        <label>
          Years <Tex tex={`t = ${t}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={30} step={1} value={t} onChange={(e) => setT(Number(e.target.value))} />
        </label>
        <div className="row" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
          <span>Compounded</span>
          {FREQS.map((f) => (
            <button key={f.n} type="button" className={f.n === n ? "btn primary small" : "btn small"} aria-pressed={f.n === n} onClick={() => setN(f.n)}>
              {f.label} (<Tex tex={`n=${f.n}`} />)
            </button>
          ))}
        </div>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520, overflowX: "auto" }}>
        <div>
          <Tex tex={`\\text{simple: } ${money(P)}\\left(1 + \\frac{${r}(${t})}{100}\\right) \\approx ${money(Vs)}`} />
        </div>
        <div>
          <Tex
            tex={`\\text{compound: } ${money(P)}\\left(1 + \\frac{${r}}{${100 * n}}\\right)^{${n === 1 ? t : `${n}(${t})`}} \\approx ${money(Vc)}`}
          />
        </div>
        <div>
          Interest earned: simple {moneyText(Vs - P)}, compound {moneyText(Vc - P)}; compounding adds {moneyText(Vc - Vs)}.
        </div>
        <div style={{ fontSize: "0.9em", opacity: 0.85 }}>
          The compound line is drawn as steps: the value jumps each time interest is added and stays flat in between. There
          are <Tex tex={`${n}\\times${t} = ${periods}`} /> compoundings, each multiplying the value by <Tex tex={`1 + \\frac{${r}}{${100 * n}} ${factorTex}`} />.
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "2-7-applications/work-rate-explorer": WorkRateExplorer,
  "2-7-applications/interest-growth": InterestGrowth,
};
