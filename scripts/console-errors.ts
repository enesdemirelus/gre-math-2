import { chromium } from "@playwright/test";
import { readdirSync } from "node:fs";
const d = readdirSync("/opt/pw-browsers").find((x) => x.startsWith("chromium-"))!;
(async () => {
  const b = await chromium.launch({ executablePath: `/opt/pw-browsers/${d}/chrome-linux/chrome`, args: ["--no-sandbox"] });
  const p = await b.newPage();
  p.on("console", (m) => { if (m.type() === "error" || m.type()==="warning") console.log(m.type(), m.text().slice(0, 1500)); });
  p.on("pageerror", (e) => console.log("PAGEERROR", e.message, e.stack?.slice(0, 1500)));
  await p.goto(process.argv[2], { waitUntil: "networkidle" });
  await b.close();
})();
