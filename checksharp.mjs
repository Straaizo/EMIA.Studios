import { chromium } from "playwright";

const outDir = process.argv[2] || ".";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:5417/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

const clientsTop = await page.evaluate(
  () => document.getElementById("clientes").getBoundingClientRect().top + window.scrollY
);
for (let y = 0; y < clientsTop + 500; y += 250) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(60);
}
await page.evaluate((yy) => window.scrollTo(0, yy), clientsTop - 40);
await page.waitForTimeout(900);

// Verificar que rotateY/perspective no se estén aplicando en mobile
const styles = await page.evaluate(() => {
  const cards = [...document.querySelectorAll("[data-client-card]")];
  return cards.map((c) => c.style.transform);
});
console.log(JSON.stringify(styles, null, 2));

await page.screenshot({ path: `${outDir}/sharp-mobile.png` });
await browser.close();
