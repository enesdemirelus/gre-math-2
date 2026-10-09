"use client";
// Interactive explorer for section 2.1 Algebraic Expressions:
// area models for identities 3, 4 and 5 with live numbers.

import { useState } from "react";
import { Tex } from "@/components/Tex";
import { AreaModel } from "../diagrams/2-1-algebraic-expressions";

type Mode = "sum" | "diff" | "dos";

const MODES: { id: Mode; tex: string }[] = [
  { id: "sum", tex: "(a+b)^2" },
  { id: "diff", tex: "(a-b)^2" },
  { id: "dos", tex: "a^2-b^2" },
];

export function IdentityExplorer({ initialMode = "sum" }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [a, setA] = useState(7);
  const [b, setB] = useState(3);

  // identities 4 and 5 are drawn with b < a so that a - b is a positive length
  const bMax = mode === "sum" ? 9 : a - 1;
  const bb = Math.min(b, bMax);

  const changeA = (v: number) => {
    setA(v);
    if (mode !== "sum" && b > v - 1) setB(v - 1);
  };
  const changeMode = (m: Mode) => {
    setMode(m);
    if (m !== "sum" && b > a - 1) setB(a - 1);
  };

  const A2 = a * a;
  const B2 = bb * bb;
  const AB = a * bb;

  let lines: string[];
  if (mode === "sum") {
    lines = [
      `(a+b)^2 = (${a}+${bb})^2 = ${a + bb}^2 = ${(a + bb) ** 2}`,
      `a^2 + 2ab + b^2 = ${A2} + 2(${AB}) + ${B2} = ${(a + bb) ** 2}`,
      `\\text{trap: } a^2 + b^2 = ${A2 + B2} \\text{, short by } 2ab = ${2 * AB}`,
    ];
  } else if (mode === "diff") {
    lines = [
      `(a-b)^2 = (${a}-${bb})^2 = ${a - bb}^2 = ${(a - bb) ** 2}`,
      `a^2 - 2ab + b^2 = ${A2} - 2(${AB}) + ${B2} = ${(a - bb) ** 2}`,
      `\\text{trap: } a^2 - b^2 = ${A2 - B2} \\ne ${(a - bb) ** 2}`,
    ];
  } else {
    lines = [
      `a^2 - b^2 = ${A2} - ${B2} = ${A2 - B2}`,
      `(a+b)(a-b) = (${a + bb})(${a - bb}) = ${(a + bb) * (a - bb)}`,
    ];
  }

  const note =
    mode === "sum"
      ? "The two shaded rectangles are the 2ab that a² + b² leaves out."
      : mode === "diff"
        ? "Cut a b-wide strip off the right and off the bottom: that removes 2ab, but the b² corner was removed twice, so add it back once."
        : "Remove the b² corner, cut the L-shape in two, and the lower piece turns to sit beside the upper one: an (a + b)-by-(a − b) rectangle.";

  return (
    <div style={{ display: "grid", gap: "0.6rem", justifyItems: "center" }}>
      <div role="group" aria-label="Identity" style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => changeMode(m.id)}
            aria-pressed={mode === m.id}
            style={{
              padding: "0.25rem 0.7rem",
              borderRadius: 6,
              border: "1px solid var(--border)",
              background: mode === m.id ? "var(--accent-soft)" : "var(--bg)",
              color: "var(--fg)",
              cursor: "pointer",
            }}
          >
            <Tex tex={m.tex} />
          </button>
        ))}
      </div>
      <div style={{ width: "100%", maxWidth: 360, display: "flex", justifyContent: "center" }}>
        <div className="diagram" style={{ margin: 0, width: "100%", maxWidth: mode === "dos" ? 360 : 270 }}>
          <AreaModel mode={mode} a={a} b={bb} numbers />
        </div>
      </div>
      <div style={{ display: "grid", gap: "0.5rem", width: "100%", maxWidth: 360 }}>
        <label>
          <Tex tex={`a = ${a}`} />
          <input type="range" style={{ width: "100%" }} min={2} max={9} step={1} value={a} onChange={(e) => changeA(Number(e.target.value))} />
        </label>
        <label>
          <Tex tex={`b = ${bb}`} />
          <input type="range" style={{ width: "100%" }} min={1} max={bMax} step={1} value={bb} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ display: "grid", gap: "0.35rem", width: "100%", maxWidth: 520, overflowX: "auto" }}>
        {lines.map((t) => (
          <div key={t}>
            <Tex tex={t} />
          </div>
        ))}
        <div style={{ fontSize: "0.92rem", color: "var(--muted)" }}>{note}</div>
      </div>
    </div>
  );
}

export const registry = {
  "2-1-algebraic-expressions/identity-explorer": IdentityExplorer,
};
