const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CUSTOM_CHROMIUM = '/opt/pw-browsers/chromium';

(async () => {
  const launchOpts = fs.existsSync(CUSTOM_CHROMIUM) ? { executablePath: CUSTOM_CHROMIUM } : {};
  const browser = await chromium.launch(launchOpts);
  const page = await browser.newPage();
  const filePath = 'file://' + path.resolve(__dirname, '..', 'folleto-a5.html');
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  await page.pdf({
    path: path.resolve(__dirname, '..', 'output', 'folleto-a5.pdf'),
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  await browser.close();
  console.log('folleto-a5.pdf generado en /output');
})();
