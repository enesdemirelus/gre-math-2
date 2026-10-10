import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { chromium } from "@playwright/test";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { registry } from "/home/user/gre-math-2/content/diagrams/3-3-triangles";

const cases: [string, Record<string, unknown>][] = JSON.parse(process.argv[2]);
const css = `
:root{--fg:#1c1f24;--accent:#1f6feb;--dg-fill:#dfe7f2}
.dg-line { stroke: var(--fg); stroke-width: 1.6; fill: none; }
.dg-thin { stroke-width: 1; }
.dg-dashed { stroke-dasharray: 5 4; }
.dg-fill { fill: var(--dg-fill); stroke: none; }
.dg-accent { stroke: var(--accent); stroke-width: 2.4; fill: none; }
.dg-accent-fill { fill: var(--accent); fill-opacity: .18; }
.dg-point { fill: var(--fg); }
.dg-label { font-family: Georgia, serif; font-style: italic; font-size: 15px; fill: var(--fg); }
.dg-text { font-family: Georgia, serif; font-size: 14px; fill: var(--fg); }
svg{border:1px solid #ddd;margin:4px} div{display:inline-block;font:10px sans-serif}`;
let html = `<html><head><style>${css}</style></head><body>`;
for (const [k, p] of cases) {
  const C = (registry as any)[k];
  html += `<div><div>${k} ${JSON.stringify(p)}</div><br>${renderToStaticMarkup(createElement(C, p))}</div>`;
}
html += "</body></html>";
function findChromium() {
  const root = "/opt/pw-browsers";
  for (const d of readdirSync(root).filter((x) => x.startsWith("chromium-"))) {
    const p = join(root, d, "chrome-linux", "chrome");
    if (existsSync(p)) return p;
  }
}
(async () => {
  const b = await chromium.launch({ executablePath: findChromium(), args: ["--no-sandbox"] });
  const pg = await b.newPage({ viewport: { width: 1150, height: 600 } });
  await pg.setContent(html);
  await pg.screenshot({ path: process.argv[3], fullPage: true });
  await b.close();
})();
