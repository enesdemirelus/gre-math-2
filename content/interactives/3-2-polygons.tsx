"use client";
// Interactive explorer for section 3.2 Polygons.

import { useMemo, useState } from "react";
import { Tex } from "@/components/Tex";

type Pt = [number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;
const LETTERS = "ABCDEFGHIJKL";

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : Math.abs(a);
}

/** Small deterministic pseudo-random generator so the shape depends only on the seed. */
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** n points on a circle: equal spacing when regular, jittered spacing otherwise (always convex). */
function makePts(n: number, regular: boolean, seed: number): Pt[] {
  const c: Pt = [160, 120];
  const R = 100;
  const gaps: number[] = [];
  if (regular) {
    for (let i = 0; i < n; i++) gaps.push(1);
  } else {
    const rand = rng(seed * 7919 + n);
    for (let i = 0; i < n; i++) gaps.push(0.45 + rand() * 1.1);
  }
  const total = gaps.reduce((a, b) => a + b, 0);
  let a = regular ? 90 + 180 / n : 100;
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const rad = (a * Math.PI) / 180;
    pts.push([r2(c[0] + R * Math.cos(rad)), r2(c[1] - R * Math.sin(rad))]);
    a += (360 * gaps[i]) / total;
  }
  return pts;
}

function interior(p: Pt[], i: number): number {
  const n = p.length;
  const v = p[i];
  const u = [p[(i + 1) % n][0] - v[0], p[(i + 1) % n][1] - v[1]];
  const w = [p[(i + n - 1) % n][0] - v[0], p[(i + n - 1) % n][1] - v[1]];
  const cs = (u[0] * w[0] + u[1] * w[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(w[0], w[1]));
  return (Math.acos(Math.max(-1, Math.min(1, cs))) * 180) / Math.PI;
}

export function PolygonExplorer() {
  const [n, setN] = useState(6);
  const [regular, setRegular] = useState(true);
  const [seed, setSeed] = useState(1);
  const [fan, setFan] = useState(true);

  const pts = useMemo(() => makePts(n, regular, seed), [n, regular, seed]);
  const c: Pt = [160, 120];
  const sum = (n - 2) * 180;
  const g = gcd(sum, n);
  const eachExact = g === n ? `${sum / n}` : `\\frac{${sum / g}}{${n / g}}`;
  const eachDec = sum / n;
  const showAngles = n <= 9;
  const measured = pts.map((_, i) => interior(pts, i));
  const measuredSum = measured.reduce((a, b) => a + b, 0);

  const path = pts.map((q, i) => `${i === 0 ? "M" : "L"} ${q[0]} ${q[1]}`).join(" ") + " Z";
  const tris: Pt[][] = [];
  for (let j = 1; j < n - 1; j++) tris.push([pts[0], pts[j], pts[j + 1]]);

  return (
    <div className="explorer" style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <svg viewBox="0 0 320 240" width={320} style={{ maxWidth: "100%" }} role="img" aria-label={`Polygon with ${n} sides`}>
        {fan &&
          tris.map((t, i) => (
            <path
              key={`t${i}`}
              d={`M ${t[0][0]} ${t[0][1]} L ${t[1][0]} ${t[1][1]} L ${t[2][0]} ${t[2][1]} Z`}
              className={i % 2 === 0 ? "dg-accent-fill" : "dg-fill"}
            />
          ))}
        <path d={path} className="dg-line" fill="none" />
        {fan &&
          pts.slice(2, n - 1).map((q, i) => (
            <line key={`d${i}`} x1={pts[0][0]} y1={pts[0][1]} x2={q[0]} y2={q[1]} className="dg-line dg-dashed" />
          ))}
        {pts.map((q, i) => (
          <circle key={`p${i}`} cx={q[0]} cy={q[1]} r={3} className="dg-point" />
        ))}
        {pts.map((q, i) => {
          const dx = q[0] - c[0];
          const dy = q[1] - c[1];
          const L = Math.hypot(dx, dy) || 1;
          return (
            <text key={`n${i}`} x={r2(q[0] + (14 * dx) / L)} y={r2(q[1] + (14 * dy) / L)} className="dg-label" textAnchor="middle" dominantBaseline="central">
              {LETTERS[i]}
            </text>
          );
        })}
        {showAngles &&
          pts.map((q, i) => {
            const nx = pts[(i + 1) % n];
            const pv = pts[(i + n - 1) % n];
            const u: Pt = [nx[0] - q[0], nx[1] - q[1]];
            const w: Pt = [pv[0] - q[0], pv[1] - q[1]];
            const lu = Math.hypot(u[0], u[1]);
            const lw = Math.hypot(w[0], w[1]);
            const b: Pt = [u[0] / lu + w[0] / lw, u[1] / lu + w[1] / lw];
            const lb = Math.hypot(b[0], b[1]) || 1;
            const half = (measured[i] / 2) * (Math.PI / 180);
            const dist = Math.min(52, Math.max(26, 15 / Math.sin(Math.max(0.25, half))));
            const label = `${Math.round(measured[i])}°`;
            return (
              <text
                key={`a${i}`}
                x={r2(q[0] + (dist * b[0]) / lb)}
                y={r2(q[1] + (dist * b[1]) / lb)}
                className="dg-text"
                style={{ fontSize: 10.5 }}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {label}
              </text>
            );
          })}
      </svg>
      <div className="explorer-controls" style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          Number of sides <Tex tex={`n = ${n}`} />
          <input type="range" style={{ width: "100%" }} min={3} max={12} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} />
        </label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setRegular(true)} aria-pressed={regular}>
            Regular
          </button>
          <button
            type="button"
            onClick={() => {
              setRegular(false);
              setSeed((s) => s + 1);
            }}
            aria-pressed={!regular}
          >
            Irregular (shuffle)
          </button>
          <button type="button" onClick={() => setFan((f) => !f)} aria-pressed={fan}>
            {fan ? "Hide triangles" : "Show triangles"}
          </button>
        </div>
      </div>
      <div className="explorer-readout" style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520 }}>
        <div>
          <Tex tex={`n = ${n}\\ \\text{sides} \\;\\Rightarrow\\; n - 2 = ${n - 2}\\ \\text{triangles}`} />
        </div>
        <div>
          <Tex tex={`\\text{sum of interior angles} = (${n} - 2)(180^\\circ) = ${sum.toLocaleString("en-US").replace(/,/g, "{,}")}^\\circ`} />
          {!regular && (
            <span>
              {" "}
              (measured from the drawing: {Math.round(measuredSum)}°, same for every {n}-sided polygon)
            </span>
          )}
        </div>
        {regular ? (
          <div>
            <Tex tex={`\\text{each interior angle} = \\frac{${sum.toLocaleString("en-US").replace(/,/g, "{,}")}^\\circ}{${n}} = ${eachExact}^\\circ${g === n ? "" : `\\approx ${eachDec.toFixed(2)}^\\circ`}`} />
          </div>
        ) : (
          <div>The angles now differ, but their sum does not. Only a regular polygon splits the sum into equal angles.</div>
        )}
      </div>
    </div>
  );
}

export const registry = {
  "3-2-polygons/polygon-explorer": PolygonExplorer,
};
