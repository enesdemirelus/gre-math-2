// Usage: npx tsx scripts/screenshots.ts [--base http://localhost:3000] [--out screenshots/shell] [--routes /,/conventions] [--widths 1280,390]
// Requires a running server (npm run build && npm start). Set CHROMIUM_PATH to override the browser binary.
import { chromium } from "@playwright/test";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

function arg(name: string, def: string): string {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

function findChromium(): string | undefined {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH ?? "/opt/pw-browsers";
  if (!existsSync(root)) return undefined;
  for (const d of readdirSync(root).filter((x) => x.startsWith("chromium-"))) {
    const p = join(root, d, "chrome-linux", "chrome");
    if (existsSync(p)) return p;
  }
  return undefined;
}

async function main() {
  const base = arg("base", "http://localhost:3000");
  const out = arg("out", "screenshots/shell");
  const routes = arg("routes", "/,/conventions,/3-5-circles,/dev/demo,/glossary,/formulas,/practice,/progress").split(",");
  const widths = arg("widths", "1280,390").split(",").map(Number);
  mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: findChromium(), args: ["--no-sandbox"] });
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w > 800 ? 900 : 844 }, hasTouch: w < 800 });
    for (const r of routes) {
      const page = await ctx.newPage();
      await page.goto(base + r, { waitUntil: "networkidle" });
      const name = (r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "-")) + `-${w}.png`;
      await page.screenshot({ path: join(out, name), fullPage: true });
      console.log("saved", join(out, name));
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
