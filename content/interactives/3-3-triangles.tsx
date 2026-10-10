"use client";
// Interactive explorers for section 3.3 Triangles.

import { useState } from "react";
import { Tex } from "@/components/Tex";

type Pt = [number, number];
const r2 = (n: number) => Math.round(n * 100) / 100;

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

/* ------------------------------------------------------------------ */
/* Triangle inequality explorer                                         */
/* ------------------------------------------------------------------ */

export function InequalityExplorer() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(7);
  const [c, setC] = useState(10);

  const checks: { lhs: number; o: number; p: number; name: string }[] = [
    { lhs: a, o: b, p: c, name: "a" },
    { lhs: b, o: a, p: c, name: "b" },
    { lhs: c, o: a, p: b, name: "c" },
  ];
  const ok = checks.every((k) => k.lhs < k.o + k.p);
  const lo = Math.abs(a - b);
  const hi = a + b;

  const W = 320;
  const H = 190;
  let content = null;
  if (ok) {
    // place A=(0,0), B=(c,0), C with AC = b, BC = a
    const x = (c * c + b * b - a * a) / (2 * c);
    const y = Math.sqrt(Math.max(0, b * b - x * x));
    const pts: Pt[] = [
      [0, 0],
      [c, 0],
      [x, y],
    ];
    const minx = Math.min(...pts.map((p) => p[0]));
    const maxx = Math.max(...pts.map((p) => p[0]));
    const maxy = y;
    const s = Math.min((W - 80) / (maxx - minx || 1), (H - 70) / (maxy || 1));
    const ox = (W - (maxx - minx) * s) / 2 - minx * s;
    const oy = H - 36 - Math.max(0, (H - 70 - maxy * s) / 2);
    const m = (p: Pt): Pt => [r2(ox + p[0] * s), r2(oy - p[1] * s)];
    const [A, B, C] = pts.map(m);
    content = (
      <>
        <path d={`M ${A[0]} ${A[1]} L ${B[0]} ${B[1]} L ${C[0]} ${C[1]} Z`} className="dg-accent-fill dg-line" />
        <text x={(A[0] + B[0]) / 2} y={A[1] + 16} className="dg-text" textAnchor="middle">{c}</text>
        <text x={(A[0] + C[0]) / 2 - 12} y={(A[1] + C[1]) / 2 - 4} className="dg-text" textAnchor="middle">{b}</text>
        <text x={(B[0] + C[0]) / 2 + 12} y={(B[1] + C[1]) / 2 - 4} className="dg-text" textAnchor="middle">{a}</text>
      </>
    );
  } else {
    // show the three segments laid out; the longest one cannot be closed
    const total = Math.max(a, b, c);
    const s = (W - 60) / Math.max(total, a + b + c - total, 1);
    const long = Math.max(a, b, c);
    const rest = [a, b, c];
    rest.splice(rest.indexOf(long), 1);
    const y0 = 70;
    content = (
      <>
        <line x1={30} y1={y0} x2={30 + long * s} y2={y0} className="dg-accent" />
        <text x={30 + (long * s) / 2} y={y0 - 10} className="dg-text" textAnchor="middle">{long} (longest)</text>
        <line x1={30} y1={y0 + 50} x2={30 + rest[0] * s} y2={y0 + 50} className="dg-line" />
        <line x1={30 + rest[0] * s} y1={y0 + 50} x2={30 + (rest[0] + rest[1]) * s} y2={y0 + 50} className="dg-line dg-dashed" />
        <circle cx={30 + rest[0] * s} cy={y0 + 50} r={3} className="dg-point" />
        <text x={30 + (rest[0] * s) / 2} y={y0 + 70} className="dg-text" textAnchor="middle">{rest[0]}</text>
        <text x={30 + (rest[0] + rest[1] / 2) * s} y={y0 + 70} className="dg-text" textAnchor="middle">{rest[1]}</text>
        <text x={W / 2} y={H - 14} className="dg-text" textAnchor="middle">the two short sides together are too short</text>
      </>
    );
  }

  const row = (name: string, lhs: number, o: number, p: number) => {
    const good = lhs < o + p;
    return (
      <div key={name}>
        <Tex tex={`${name} = ${lhs}\;${good ? "<" : "\\not<"}\; ${o} + ${p} = ${o + p}`} /> {good ? "✓" : "✗"}
      </div>
    );
  };

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} style={{ maxWidth: "100%" }} role="img" aria-label={ok ? "Triangle with the chosen sides" : "These lengths do not form a triangle"}>
        {content}
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Side <Tex tex={`a = ${a}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={20} step={1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          Side <Tex tex={`b = ${b}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={20} step={1} value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <label>
          Side <Tex tex={`c = ${c}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={40} step={1} value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        {checks.map((k) => row(k.name, k.lhs, k.o, k.p))}
        <div>
          <strong>{ok ? "A triangle exists." : "No triangle: one side is at least as long as the other two together."}</strong>
        </div>
        <div>
          <Tex tex={`\\text{With } a = ${a},\\ b = ${b}: \\quad ${lo} < c < ${hi}`} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Special right triangle explorer                                      */
/* ------------------------------------------------------------------ */

/** A value (p/q) * sqrt(n), n in {1,2,3}. */
type Val = { p: number; q: number; n: number };

function val(p: number, q: number, n: number): Val {
  const g = gcd(p, q) || 1;
  return { p: p / g, q: q / g, n };
}
const num = (v: Val) => (v.p / v.q) * Math.sqrt(v.n);

function valTex(v: Val): string {
  const root = v.n === 1 ? "" : "\\sqrt{" + v.n + "}";
  if (v.q === 1) {
    if (v.n === 1) return `${v.p}`;
    return v.p === 1 ? root : `${v.p}${root}`;
  }
  if (v.n === 1) return `\\frac{${v.p}}{${v.q}}`;
  return `\\frac{${v.p === 1 ? "" : v.p}${root}}{${v.q}}`;
}

type Kind = "45" | "30";
type Given = "leg" | "short" | "long" | "hyp";

export function SpecialExplorer() {
  const [kind, setKind] = useState<Kind>("30");
  const [given, setGiven] = useState<Given>("short");
  const [v, setV] = useState(6);

  const g: Given = kind === "45" ? (given === "hyp" ? "hyp" : "leg") : given === "leg" ? "short" : given;

  let sides: { name: string; value: Val; role: Given }[];
  if (kind === "45") {
    if (g === "leg") sides = [
      { name: "leg", value: val(v, 1, 1), role: "leg" },
      { name: "other leg", value: val(v, 1, 1), role: "leg" },
      { name: "hypotenuse", value: val(v, 1, 2), role: "hyp" },
    ];
    else sides = [
      { name: "leg", value: val(v, 2, 2), role: "leg" },
      { name: "other leg", value: val(v, 2, 2), role: "leg" },
      { name: "hypotenuse", value: val(v, 1, 1), role: "hyp" },
    ];
  } else if (g === "short") {
    sides = [
      { name: "short leg (opposite 30°)", value: val(v, 1, 1), role: "short" },
      { name: "long leg (opposite 60°)", value: val(v, 1, 3), role: "long" },
      { name: "hypotenuse", value: val(2 * v, 1, 1), role: "hyp" },
    ];
  } else if (g === "long") {
    sides = [
      { name: "short leg (opposite 30°)", value: val(v, 3, 3), role: "short" },
      { name: "long leg (opposite 60°)", value: val(v, 1, 1), role: "long" },
      { name: "hypotenuse", value: val(2 * v, 3, 3), role: "hyp" },
    ];
  } else {
    sides = [
      { name: "short leg (opposite 30°)", value: val(v, 2, 1), role: "short" },
      { name: "long leg (opposite 60°)", value: val(v, 2, 3), role: "long" },
      { name: "hypotenuse", value: val(v, 1, 1), role: "hyp" },
    ];
  }

  // drawing, with side lengths to scale (scaled to fit)
  const W = 300;
  const H = 200;
  const a = num(sides[0].value);
  const b = num(sides[1].value);
  const c = num(sides[2].value);
  // right angle at origin: horizontal leg = long/other leg b, vertical leg = a
  const s = Math.min((W - 90) / b, (H - 70) / a);
  const ox = (W - b * s) / 2;
  const oy = H - 36;
  const P: Pt = [r2(ox), r2(oy)];
  const Rr: Pt = [r2(ox + b * s), r2(oy)];
  const Q: Pt = [r2(ox), r2(oy - a * s)];
  const hi = (role: Given) => (role === g || (kind === "45" && role === "leg" && g === "leg") ? "dg-accent" : "dg-line");
  const rm = 10;
  const angQ = kind === "45" ? "45°" : "60°";
  const angR = kind === "45" ? "45°" : "30°";
  const dec = (x: number) => (Math.round(x * 1000) / 1000).toString();

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} style={{ maxWidth: "100%" }} role="img" aria-label="Special right triangle">
        <path d={`M ${P[0]} ${P[1]} L ${Rr[0]} ${Rr[1]} L ${Q[0]} ${Q[1]} Z`} className="dg-line" />
        <line x1={P[0]} y1={P[1]} x2={Q[0]} y2={Q[1]} className={hi(sides[0].role)} />
        <line x1={P[0]} y1={P[1]} x2={Rr[0]} y2={Rr[1]} className={hi(sides[1].role)} />
        <line x1={Q[0]} y1={Q[1]} x2={Rr[0]} y2={Rr[1]} className={hi("hyp")} />
        <path d={`M ${P[0] + rm} ${P[1]} L ${P[0] + rm} ${P[1] - rm} L ${P[0]} ${P[1] - rm}`} className="dg-line dg-thin" />
        <text x={Q[0] + 18} y={Q[1] + 34} className="dg-text" textAnchor="middle">{angQ}</text>
        <text x={Rr[0] - 32} y={Rr[1] - 8} className="dg-text" textAnchor="middle">{angR}</text>
        <text x={P[0] - 12} y={(P[1] + Q[1]) / 2} className="dg-text" textAnchor="middle">{dec(a)}</text>
        <text x={(P[0] + Rr[0]) / 2} y={P[1] + 17} className="dg-text" textAnchor="middle">{dec(b)}</text>
        <text x={(Q[0] + Rr[0]) / 2 + 16} y={(Q[1] + Rr[1]) / 2 - 6} className="dg-text" textAnchor="middle">{dec(c)}</text>
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button type="button" aria-pressed={kind === "45"} onClick={() => setKind("45")} style={{ fontWeight: kind === "45" ? 700 : 400 }}>45°-45°-90°</button>
          <button type="button" aria-pressed={kind === "30"} onClick={() => setKind("30")} style={{ fontWeight: kind === "30" ? 700 : 400 }}>30°-60°-90°</button>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <span>I know the</span>
          {(kind === "45" ? (["leg", "hyp"] as Given[]) : (["short", "long", "hyp"] as Given[])).map((o) => (
            <button key={o} type="button" aria-pressed={g === o} onClick={() => setGiven(o)} style={{ fontWeight: g === o ? 700 : 400 }}>
              {o === "leg" ? "leg" : o === "short" ? "short leg" : o === "long" ? "long leg" : "hypotenuse"}
            </button>
          ))}
        </div>
        <label>
          Its length: <Tex tex={`${v}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={20} step={1} value={v} onChange={(e) => setV(Number(e.target.value))} />
        </label>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        {sides.map((sd, i) => (
          <div key={i}>
            {sd.name}: <Tex tex={`${valTex(sd.value)} \\approx ${dec(num(sd.value))}`} />
          </div>
        ))}
        <div>
          <Tex tex={`\\text{area} = \\frac{1}{2}(${valTex(sides[0].value)})(${valTex(sides[1].value)}) \\approx ${dec((a * b) / 2)}`} />
        </div>
        <div>
          <Tex tex={kind === "45" ? "x : x : x\\sqrt{2}" : "x : x\\sqrt{3} : 2x"} />
        </div>
      </div>
    </div>
  );
}

export const registry = {
  "3-3-triangles/inequality-explorer": InequalityExplorer,
  "3-3-triangles/special-explorer": SpecialExplorer,
};
