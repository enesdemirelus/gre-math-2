import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import { registry as d1 } from "./content/diagrams/2-1-algebraic-expressions";
import { registry as d4 } from "./content/diagrams/2-4-quadratic-equations";
import { registry as i1 } from "./content/interactives/2-1-algebraic-expressions";
import { registry as i4 } from "./content/interactives/2-4-quadratic-equations";
const css = readFileSync("app/globals.css", "utf8");
const items: [string, any, any][] = [
  ["area-sum", d1["2-1-algebraic-expressions/area-model"], { mode: "sum" }],
  ["area-diff", d1["2-1-algebraic-expressions/area-model"], { mode: "diff" }],
  ["area-dos", d1["2-1-algebraic-expressions/area-model"], { mode: "dos" }],
  ["grid", d1["2-1-algebraic-expressions/product-grid"], {}],
  ["parabola-all", d4["2-4-quadratic-equations/parabola"], { highlight: "all" }],
  ["parabola-vertex", d4["2-4-quadratic-equations/parabola"], { highlight: "vertex" }],
  ["parabola-axis", d4["2-4-quadratic-equations/parabola"], { highlight: "axis" }],
  ["three", d4["2-4-quadratic-equations/three-cases"], {}],
  ["ix1", i1["2-1-algebraic-expressions/identity-explorer"], {}],
  ["ix4", i4["2-4-quadratic-equations/quadratic-explorer"], {}],
];
let html = `<html><head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"><style>${css} body{padding:10px} .cell{display:inline-block;vertical-align:top;margin:8px;border:1px solid #ccc;width:380px}</style></head><body>`;
for (const [n, C, p] of items) html += `<div class="cell"><div>${n}</div>${renderToStaticMarkup(<C {...p} />)}</div>`;
html += "</body></html>";
const out = process.argv[2];
writeFileSync(out + "/r.html", html);
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/" + require("fs").readdirSync("/opt/pw-browsers").find((x: string) => x.startsWith("chromium-")) + "/chrome-linux/chrome", args: ["--no-sandbox"] });
  const pg = await b.newPage({ viewport: { width: 1250, height: 900 } });
  await pg.goto("file://" + out + "/r.html");
  await pg.screenshot({ path: out + "/r.png", fullPage: true });
  await b.close();
})();
