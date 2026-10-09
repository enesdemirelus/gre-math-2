// Usage: npx tsx scripts/overflow.ts <url> [width]  — lists elements wider than the viewport
import { chromium } from "@playwright/test";
import { readdirSync } from "node:fs";
const d = readdirSync("/opt/pw-browsers").find((x) => x.startsWith("chromium-"))!;
(async () => {
  const w = Number(process.argv[3] ?? 390);
  const b = await chromium.launch({ executablePath: `/opt/pw-browsers/${d}/chrome-linux/chrome`, args: ["--no-sandbox"] });
  const p = await b.newPage({ viewport: { width: w, height: 844 } });
  await p.goto(process.argv[2], { waitUntil: "networkidle" });
  const res = await p.evaluate((vw) => {
    const out: string[] = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 0) {
        let a = el.parentElement, clipped = false;
        while (a) { const o = getComputedStyle(a).overflowX; if (o !== "visible") { clipped = true; break; } a = a.parentElement; }
        if (!clipped) out.push(`${el.tagName}.${(el as HTMLElement).className?.toString().slice(0, 60)} right=${Math.round(r.right)} text=${(el.textContent ?? "").slice(0, 60)}`);
      }
    });
    out.unshift("scrollWidth=" + document.documentElement.scrollWidth); return out.slice(0, 30);
  }, w);
  console.log(res.join("\n") || "no overflow");
  await b.close();
})();
