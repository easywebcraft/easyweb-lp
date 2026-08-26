/**
 * tools/ogp-source.html を 1200x630 のPNGに書き出し、ルートの ogp.png を更新します。
 *
 *   node tools/render-ogp.js
 *
 * 価格を変えたときは ogp-source.html の金額を直してから実行してください。
 *
 * 書き出したPNGはフルカラー（可逆）です。ファイルを小さくしたい場合は
 * TinyPNG などの可逆圧縮にかけてください。256色に減色すると
 * 背景のグラデーションに縞が出るため避けてください。
 */
const path = require("path");
const { chromium } = require("playwright");

const SRC = path.join(__dirname, "ogp-source.html");
const OUT = path.join(__dirname, "..", "ogp.png");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });

  await page.goto("file://" + SRC, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();

  console.log("wrote " + OUT);
})();
