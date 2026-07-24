import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const SCRATCH = process.argv[2];
const svg = fs.readFileSync("public/favicon.svg", "utf8");
const template = fs.readFileSync(path.join(SCRATCH, "og-template.html"), "utf8");

const logoHtml = svg.replace("<svg ", '<svg class="logo" ');
const html = template.replace("__LOGO__", logoHtml);
const htmlPath = path.join(SCRATCH, "og-final.html");
fs.writeFileSync(htmlPath, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const fileUrl = "file:///" + htmlPath.split(path.sep).join("/");
await page.goto(fileUrl);
await page.waitForTimeout(300);
await page.screenshot({ path: "public/og-image.png" });
await browser.close();
console.log("og-image.png generado");
