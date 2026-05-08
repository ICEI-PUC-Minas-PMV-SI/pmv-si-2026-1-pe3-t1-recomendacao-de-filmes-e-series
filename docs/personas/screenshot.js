const puppeteer = require('puppeteer');

const files = [
  { html: 'persona-1.html', out: 'img/screenshots/persona-1.png', width: 1000, height: 1200 },
  { html: 'persona-2.html', out: 'img/screenshots/persona-2.png', width: 1000, height: 1200 },
  { html: 'persona-3.html', out: 'img/screenshots/persona-3.png', width: 1000, height: 1200 },
];

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  for (const f of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: f.width, height: f.height, deviceScaleFactor: 2 });
    await page.goto(`file:///work/${f.html}`, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: `/work/${f.out}`, fullPage: true });
    console.log(`ok: ${f.out}`);
    await page.close();
  }
  await browser.close();
})();
