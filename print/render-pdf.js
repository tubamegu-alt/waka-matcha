const { spawn } = require('child_process');
const CDP = require('chrome-remote-interface');
const fs = require('fs');
const path = require('path');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333;
const USER_DATA_DIR = path.join(require('os').tmpdir(), 'waka-chrome-pdf-profile-' + Date.now());

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function waitForCDP(retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await CDP({ port: PORT });
      return client;
    } catch (e) {
      await sleep(300);
    }
  }
  throw new Error('CDP not available');
}

async function renderOne(htmlFile, pdfFile, pngFile) {
  const client = await CDP({ port: PORT });
  const { Page, Runtime, Emulation } = client;
  await Page.enable();
  await Runtime.enable();
  const fileUrl = 'file:///' + path.resolve(htmlFile).replace(/\\/g, '/');
  await Page.navigate({ url: fileUrl });
  await Page.loadEventFired();
  await Runtime.evaluate({
    expression: 'document.fonts.ready.then(() => true)',
    awaitPromise: true,
  });
  await sleep(500);

  const heightCheck = await Runtime.evaluate({
    expression: `JSON.stringify({ body: document.body.scrollHeight, panel1: document.querySelectorAll('.panel')[0].querySelector('.panel__inner').scrollHeight })`,
  });
  console.log(htmlFile, 'measured after fonts ready:', heightCheck.result.value);

  const result = await Page.printToPDF({
    landscape: false,
    printBackground: true,
    preferCSSPageSize: true,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paperWidth: 8.5,
    paperHeight: 11,
  });

  fs.writeFileSync(pdfFile, Buffer.from(result.data, 'base64'));
  console.log('Wrote', pdfFile, fs.statSync(pdfFile).size, 'bytes');

  // High-resolution 300 DPI PNG of the full sheet (8.5in x 11in -> 2550x3300px)
  const DPI = 300;
  const cssWidth = 816; // 8.5in at 96dpi
  const cssHeight = 1056; // 11in at 96dpi
  const scale = DPI / 96;
  await Emulation.setDeviceMetricsOverride({
    width: cssWidth,
    height: cssHeight,
    deviceScaleFactor: scale,
    mobile: false,
  });
  const shot = await Page.captureScreenshot({
    format: 'png',
    clip: { x: 0, y: 0, width: cssWidth, height: cssHeight, scale: 1 },
    captureBeyondViewport: true,
  });
  fs.writeFileSync(pngFile, Buffer.from(shot.data, 'base64'));
  console.log('Wrote', pngFile, fs.statSync(pngFile).size, 'bytes');

  await client.close();
}

async function main() {
  const chromeProc = spawn(CHROME, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    'about:blank',
  ]);

  try {
    await waitForCDP();
    await renderOne('flyer-a.html', 'WAKA-MATCHA-Flyer-A-Minimal.pdf', 'WAKA-MATCHA-Flyer-A-Minimal-300dpi.png');
    await renderOne('flyer-b.html', 'WAKA-MATCHA-Flyer-B-Framed.pdf', 'WAKA-MATCHA-Flyer-B-Framed-300dpi.png');
    await renderOne('flyer-c.html', 'WAKA-MATCHA-Flyer-C-FullPage.pdf', 'WAKA-MATCHA-Flyer-C-FullPage-300dpi.png');
  } finally {
    chromeProc.kill();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
