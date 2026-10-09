"use client";
// Interactive explorers for section 1.5 Real Numbers.

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Tex } from "@/components/Tex";

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Formats a number for TeX with a proper minus sign and no trailing zeros. */
function fmt(n: number, digits = 2): string {
  const v = Math.round(n * 10 ** digits) / 10 ** digits;
  const s = Object.is(v, -0) ? "0" : String(v);
  return s;
}

/** Wraps negatives in parentheses, e.g. -3 -> (-3). */
function par(n: number): string {
  return n < 0 ? `(${fmt(n)})` : fmt(n);
}

function svgX(svg: SVGSVGElement, e: ReactPointerEvent): number {
  const rect = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  return vb.x + ((e.clientX - rect.left) / rect.width) * vb.width;
}

function signWord(n: number): string {
  if (n > 0) return "\\text{positive}";
  if (n < 0) return "\\text{negative}";
  return "0";
}

/* ------------------------------------------------------------------ */
/* Absolute value explorer: drag a and b                                 */
/* ------------------------------------------------------------------ */

export function AbsValueExplorer() {
  const MIN = -8;
  const MAX = 8;
  const W = 340;
  const pad = 20;
  const Y = 92;
  const [a, setA] = useState(-3);
  const [b, setB] = useState(5);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<"a" | "b" | null>(null);

  const X = (v: number) => r2(pad + ((v - MIN) / (MAX - MIN)) * (W - 2 * pad));
  const V = (x: number) => MIN + ((x - pad) / (W - 2 * pad)) * (MAX - MIN);
  const snap = (v: number) => Math.max(MIN, Math.min(MAX, Math.round(v * 2) / 2));

  const onDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const v = V(svgX(svg, e));
    drag.current = Math.abs(v - a) <= Math.abs(v - b) ? "a" : "b";
    e.currentTarget.setPointerCapture(e.pointerId);
    (drag.current === "a" ? setA : setB)(snap(v));
  };
  const onMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || !drag.current) return;
    const v = snap(V(svgX(svg, e)));
    (drag.current === "a" ? setA : setB)(v);
  };
  const stop = () => {
    drag.current = null;
  };

  const ticks: number[] = [];
  for (let t = MIN; t <= MAX; t++) ticks.push(t);

  const sum = a + b;
  const absSum = Math.abs(sum);
  const sumAbs = Math.abs(a) + Math.abs(b);
  const equal = Math.abs(absSum - sumAbs) < 1e-9;
  const prod = a * b;
  const dist = Math.abs(a - b);

  // bracket rows: distance |a-b| on top, |a| and |b| below it
  const yDist = 22;
  const yA = 46;
  const yB = 62;
  // nudge the two handle labels apart when the points are close
  const close = Math.abs(a - b) < 1.1;
  const dxA = close ? (a <= b ? -8 : 8) : 0;

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} 140`}
        width={W}
        style={{ touchAction: "none", maxWidth: "100%", userSelect: "none" }}
        role="img"
        aria-label={`Number line with a = ${a} and b = ${b}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={stop}
        onPointerCancel={stop}
      >
        <line x1={6} y1={Y} x2={W - 6} y2={Y} className="dg-line" />
        <path d={`M 4 ${Y} L 12 ${Y - 4.5} L 12 ${Y + 4.5} Z`} className="dg-point" />
        <path d={`M ${W - 4} ${Y} L ${W - 12} ${Y - 4.5} L ${W - 12} ${Y + 4.5} Z`} className="dg-point" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={Y - (t === 0 ? 7 : 4)} x2={X(t)} y2={Y + (t === 0 ? 7 : 4)} className="dg-line dg-thin" />
            {t % 2 === 0 && (
              <text x={X(t)} y={Y + 20} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
                {t < 0 ? `−${-t}` : t}
              </text>
            )}
          </g>
        ))}
        {/* distance between a and b */}
        {dist > 0 && (
          <Bracket x1={X(Math.min(a, b))} x2={X(Math.max(a, b))} y={yDist} text={`|a − b| = ${fmt(dist)}`} />
        )}
        {/* distances from 0 */}
        {a !== 0 && <Bracket x1={X(Math.min(a, 0))} x2={X(Math.max(a, 0))} y={yA} text="" thin />}
        {b !== 0 && <Bracket x1={X(Math.min(b, 0))} x2={X(Math.max(b, 0))} y={yB} text="" thin />}
        {a !== 0 && (
          <text x={X(a / 2)} y={yA - 4} className="dg-text" textAnchor="middle" style={{ fontSize: 11 }}>
            {`|a|`}
          </text>
        )}
        {b !== 0 && (
          <text x={X(b / 2)} y={yB - 4} className="dg-text" textAnchor="middle" style={{ fontSize: 11 }}>
            {`|b|`}
          </text>
        )}
        <Handle x={X(a)} y={Y} label="a" dx={dxA} />
        <Handle x={X(b)} y={Y} label="b" dx={-dxA} />
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.4rem", width: "100%", maxWidth: 360 }}>
        <label>
          <Tex tex={`a = ${fmt(a)}`} />
          <input type="range" style={{ width: "100%" }} min={MIN} max={MAX} step={0.5} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={`b = ${fmt(b)}`} />
          <input type="range" style={{ width: "100%" }} min={MIN} max={MAX} step={0.5} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex tex={`\\text{distance} = |a - b| = |${fmt(a)} - ${par(b)}| = ${fmt(dist)}`} />
        </div>
        <div>
          <Tex
            tex={`|a + b| = ${fmt(absSum)} \\;${equal ? "=" : "<"}\\; |a| + |b| = ${fmt(Math.abs(a))} + ${fmt(Math.abs(b))} = ${fmt(sumAbs)}`}
          />
        </div>
        <div style={{ fontSize: 14, color: "var(--muted)" }}>
          {equal
            ? a === 0 || b === 0
              ? "Equality: one of the numbers is 0."
              : "Equality: a and b have the same sign, so nothing cancels."
            : "Strict inequality: a and b have opposite signs, so part of the sum cancels."}
        </div>
        <div>
          <Tex tex={`ab = ${fmt(prod)} \\;(${signWord(prod)}), \\qquad |a||b| = |ab| = ${fmt(Math.abs(prod))}`} />
        </div>
        <div>
          <Tex tex={`a + b = ${fmt(sum)} \\;(${signWord(sum)})`} />
        </div>
      </div>
    </div>
  );
}

function Bracket({ x1, x2, y, text, thin = false }: { x1: number; x2: number; y: number; text: string; thin?: boolean }) {
  const st = { strokeWidth: thin ? 1.2 : 1.8 };
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} className={thin ? "dg-line" : "dg-accent"} style={st} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} className={thin ? "dg-line" : "dg-accent"} style={st} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} className={thin ? "dg-line" : "dg-accent"} style={st} />
      {text && (
        <text x={r2((x1 + x2) / 2)} y={y - 6} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
          {text}
        </text>
      )}
    </g>
  );
}

function Handle({ x, y, label, dx = 0 }: { x: number; y: number; label: string; dx?: number }) {
  return (
    <g style={{ cursor: "grab" }}>
      <circle cx={x} cy={y} r={10} className="dg-accent" style={{ fill: "var(--bg)", fillOpacity: 0.01 }} />
      <circle cx={x} cy={y} r={4} className="dg-point" style={{ fill: "var(--accent)" }} />
      <text x={x + dx} y={y + 36} className="dg-label" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Order explorer: where x, x^2, x^3, 1/x and -x land                    */
/* ------------------------------------------------------------------ */

type Expr = { key: string; tex: string; svg: string; f: (x: number) => number };

const EXPRS: Expr[] = [
  { key: "x", tex: "x", svg: "x", f: (x) => x },
  { key: "-x", tex: "-x", svg: "−x", f: (x) => -x },
  { key: "x2", tex: "x^2", svg: "x²", f: (x) => x * x },
  { key: "x3", tex: "x^3", svg: "x³", f: (x) => x * x * x },
  { key: "inv", tex: "\\frac{1}{x}", svg: "1/x", f: (x) => 1 / x },
];

const REGIONS: { test: (x: number) => boolean; name: string }[] = [
  { test: (x) => x < -1, name: "x < -1" },
  { test: (x) => x === -1, name: "x = -1" },
  { test: (x) => x > -1 && x < 0, name: "-1 < x < 0" },
  { test: (x) => x > 0 && x < 1, name: "0 < x < 1" },
  { test: (x) => x === 1, name: "x = 1" },
  { test: (x) => x > 1, name: "x > 1" },
];

export function OrderExplorer() {
  // x is stored in tenths to keep values exact
  const [t, setT] = useState(5); // x = 0.5
  const x = t / 10;
  const MIN = -4;
  const MAX = 4;
  const W = 340;
  const pad = 20;
  const Y = 100;
  const X = (v: number) => r2(pad + ((Math.max(MIN, Math.min(MAX, v)) - MIN) / (MAX - MIN)) * (W - 2 * pad));

  const vals = EXPRS.map((e) => ({ ...e, v: e.f(x) }));
  const sorted = [...vals].sort((p, q) => p.v - q.v);
  // order string with = for ties
  let order = "";
  sorted.forEach((e, i) => {
    if (i > 0) order += Math.abs(e.v - sorted[i - 1].v) < 1e-9 ? " = " : " < ";
    order += e.tex;
  });
  const region = REGIONS.find((r) => r.test(x))?.name ?? "";

  // stack labels so they do not collide: greedy rows by x position
  const placed: { x: number; row: number }[] = [];
  const rowsFor = sorted.map((e) => {
    const px = X(e.v);
    let row = 0;
    while (placed.some((p) => p.row === row && Math.abs(p.x - px) < 30)) row++;
    placed.push({ x: px, row });
    return { ...e, px, row };
  });

  const ticks: number[] = [];
  for (let k = MIN; k <= MAX; k++) ticks.push(k);

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 ${W} 132`} width={W} style={{ maxWidth: "100%" }} role="img" aria-label={`Values of x, -x, x squared, x cubed and 1 over x for x = ${x}`}>
        <line x1={6} y1={Y} x2={W - 6} y2={Y} className="dg-line" />
        <path d={`M 4 ${Y} L 12 ${Y - 4.5} L 12 ${Y + 4.5} Z`} className="dg-point" />
        <path d={`M ${W - 4} ${Y} L ${W - 12} ${Y - 4.5} L ${W - 12} ${Y + 4.5} Z`} className="dg-point" />
        <rect x={X(-1)} y={Y - 3} width={X(1) - X(-1)} height={6} className="dg-fill" />
        {ticks.map((k) => (
          <g key={k}>
            <line x1={X(k)} y1={Y - 5} x2={X(k)} y2={Y + 5} className="dg-line dg-thin" />
            <text x={X(k)} y={Y + 21} className="dg-text" textAnchor="middle" style={{ fontSize: 12 }}>
              {k < 0 ? `−${-k}` : k}
            </text>
          </g>
        ))}
        {rowsFor.map((e) => {
          const off = Math.abs(e.v) > MAX;
          const ly = Y - 16 - e.row * 17;
          return (
            <g key={e.key}>
              <line x1={e.px} y1={Y} x2={e.px} y2={ly + 4} className="dg-line dg-thin dg-dashed" />
              <circle cx={e.px} cy={Y} r={e.key === "x" ? 4.5 : 3.2} className="dg-point" style={e.key === "x" ? { fill: "var(--accent)" } : undefined} />
              <text x={e.px} y={ly} className="dg-label" textAnchor="middle" style={{ fontSize: 14 }}>
                {off ? `${e.svg} ${e.v > 0 ? "→" : "←"}` : e.svg}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.4rem", width: "100%", maxWidth: 360 }}>
        <label>
          <Tex tex={`x = ${fmt(x, 1)}`} />
          <input
            type="range"
            style={{ width: "100%" }}
            min={-30}
            max={30}
            step={1}
            value={t}
            onChange={(e) => {
              const n = Number(e.target.value);
              setT(n === 0 ? (t > 0 ? -1 : 1) : n);
            }}
          />
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {[-2, -0.5, 0.5, 2].map((v) => (
            <button key={v} type="button" onClick={() => setT(Math.round(v * 10))}>
              {`x = ${v < 0 ? "−" + -v : v}`}
            </button>
          ))}
        </div>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex tex={`\\text{Region: } ${region}`} />
        </div>
        <div>
          <Tex tex={vals.map((e) => `${e.tex} = ${fmt(e.v, 3)}`).join(",\\; ")} />
        </div>
        <div>
          <Tex tex={order} />
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "1-5-real-numbers/abs-explorer": AbsValueExplorer,
  "1-5-real-numbers/order-explorer": OrderExplorer,
};
