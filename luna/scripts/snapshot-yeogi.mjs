import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const outDir = path.resolve(__dirname, '../../lunadocs/reference');
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, 'yeogi-home.png');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();
  await page.goto('https://www.yeogi.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  // Allow hero to load dynamics
  await page.waitForTimeout(1500);
  // Try to dismiss any modals/popups that could block screenshot
  try {
    await page.getByRole('button', { name: /닫기|close|×/i }).first().click({ timeout: 1500 });
  } catch {}
  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close();
  console.log(`Saved: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

