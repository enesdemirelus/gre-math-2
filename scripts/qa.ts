// Usage: npx tsx scripts/qa.ts <baseUrl>  — programmatic QA over every route at 1280 and 390 px.
import { chromium } from "@playwright/test";
import { readdirSync } from "node:fs";
import { OUTLINE } from "../content/outline";
const d = readdirSync("/opt/pw-browsers").find((x) => x.startsWith("chromium-"))!;
const base = process.argv[2] ?? "http://localhost:3100";
const routes = ["/", "/conventions", "/glossary", "/formulas", "/practice", "/progress", ...OUTLINE.map((o) => "/" + o.id)];
(async () => {
  const b = await chromium.launch({ executablePath: `/opt/pw-browsers/${d}/chrome-linux/chrome`, args: ["--no-sandbox"] });
  let problems = 0;
  for (const w of [1280, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    for (const r of routes) {
      const p = await ctx.newPage();
      const errs: string[] = [];
      p.on("pageerror", (e) => errs.push("pageerror: " + e.message));
      p.on("console", (m) => { if (m.type() === "error" && !/favicon|404/.test(m.text())) errs.push("console: " + m.text().slice(0, 200)); });
      await p.goto(base + r, { waitUntil: "networkidle" });
      const info = await p.evaluate((vw) => {
        const katexErr = document.querySelectorAll(".katex-error").length;
        const overflow = document.documentElement.scrollWidth > vw + 1;
        const svgs = [...document.querySelectorAll(".diagram svg")];
        const zero = svgs.filter((s) => { const r = s.getBoundingClientRect(); return r.width < 5 || r.height < 5; }).length;
        // raw unrendered math: text nodes with $...$ outside katex
        let raw = 0;
        const walker = document.createTreeWalker(document.querySelector("main") ?? document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const t = walker.currentNode.textContent ?? "";
          const el = walker.currentNode.parentElement;
          if (el && el.closest(".katex, script, style, input, textarea")) continue;
          if (/\$[^$\s][^$]*\$/.test(t) || /\\(frac|sqrt|cdot|le|ge)\b/.test(t)) raw++;
        }
        return { katexErr, overflow, svgs: svgs.length, zero, raw };
      }, w);
      const bad = errs.length || info.katexErr || info.overflow || info.zero || info.raw;
      if (bad) { problems++; console.log(`${w} ${r}`, JSON.stringify(info), errs.slice(0, 3).join(" | ")); }
      await p.close();
    }
    await ctx.close();
  }
  console.log(`QA done: ${problems} route/width combos with problems out of ${routes.length * 2}`);
  await b.close();
})();
