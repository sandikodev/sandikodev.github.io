#!/usr/bin/env node

/**
 * Responsive Screenshot Tool using Playwright & Chrome DevTools Protocol (CDP)
 *
 * Captures full-page and viewport screenshots across a responsive device matrix:
 * - Mobile: iPhone SE (375x667), iPhone 14 (390x844)
 * - Tablet: iPad Mini (768x1024), iPad Air (820x1180)
 * - Desktop: Laptop (1280x800), Desktop (1440x900), FHD (1920x1080)
 *
 * Supports:
 * - Connection via Chrome DevTools Protocol (--cdp, default: http://127.0.0.1:9222)
 * - Fallback to local Playwright Chromium launcher
 * - Configurable base URL, routes, and output directory
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// ── Viewport Matrix ─────────────────────────────────────────────────────────
const VIEWPORT_MATRIX = [
  {
    category: "Mobile",
    device: "iPhone SE",
    height: 667,
    id: "375x667_iphone-se",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    width: 375,
  },
  {
    category: "Mobile",
    device: "iPhone 14",
    height: 844,
    id: "390x844_iphone-14",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    width: 390,
  },
  {
    category: "Tablet",
    device: "iPad Mini",
    height: 1024,
    id: "768x1024_ipad-mini",
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    width: 768,
  },
  {
    category: "Tablet",
    device: "iPad Air",
    height: 1180,
    id: "820x1180_ipad-air",
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    width: 820,
  },
  {
    category: "Desktop",
    device: "Laptop",
    height: 800,
    id: "1280x800_laptop",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    width: 1280,
  },
  {
    category: "Desktop",
    device: "Desktop",
    height: 900,
    id: "1440x900_desktop",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    width: 1440,
  },
  {
    category: "Desktop",
    device: "FHD Monitor",
    height: 1080,
    id: "1920x1080_fhd",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    width: 1920,
  },
];

// ── Default Routes ──────────────────────────────────────────────────────────
const DEFAULT_ROUTES = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog" },
  { name: "workspace", path: "/workspace" },
];

// ── CLI Arg Parser ──────────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    baseUrl: process.env.BASE_URL || "http://127.0.0.1:4321",
    cdpEndpoint: "http://127.0.0.1:9222",
    fullPage: true,
    help: false,
    outputDir: path.join(ROOT_DIR, "artifacts", "screenshots"),
    routes: DEFAULT_ROUTES,
    useCdp: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--cdp") {
      options.useCdp = true;
      const next = args[i + 1];
      if (next && !next.startsWith("-")) {
        options.cdpEndpoint = next;
        i++;
      }
    } else if (arg.startsWith("--cdp=")) {
      options.useCdp = true;
      options.cdpEndpoint = arg.split("=")[1];
    } else if (arg === "--base-url" || arg === "-u") {
      options.baseUrl = args[++i];
    } else if (arg.startsWith("--base-url=")) {
      options.baseUrl = arg.split("=")[1];
    } else if (arg === "--output-dir" || arg === "-o") {
      options.outputDir = path.resolve(args[++i]);
    } else if (arg.startsWith("--output-dir=")) {
      options.outputDir = path.resolve(arg.split("=")[1]);
    } else if (arg === "--routes" || arg === "-r") {
      const raw = args[++i];
      options.routes = raw.split(",").map((p) => {
        const clean = p.trim();
        const name =
          clean === "/"
            ? "home"
            : clean.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
        return { name, path: clean };
      });
    } else if (arg === "--no-full-page") {
      options.fullPage = false;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Responsive Screenshot Capture Tool (Playwright / Chrome CDP)
============================================================

Usage:
  node scripts/capture-responsive.js [options]

Options:
  --cdp [url]           Connect via Chrome DevTools Protocol (default: http://127.0.0.1:9222).
                        Falls back to local Playwright Chromium if unavailable.
  --base-url <url>      Base server URL to capture (default: http://127.0.0.1:4321).
  --routes <paths>      Comma-separated list of paths (default: /,/blog,/workspace).
  --output-dir <path>   Output directory (default: artifacts/screenshots).
  --no-full-page        Capture viewport only instead of full scroll height.
  -h, --help            Show this help message.

Examples:
  node scripts/capture-responsive.js
  node scripts/capture-responsive.js --cdp
  node scripts/capture-responsive.js --base-url http://localhost:3000 --routes /,/workspace
`);
}

// ── Check if server is running ──────────────────────────────────────────────
async function isServerReachable(url) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(3000),
    });
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}

// ── Browser Connection Helper ───────────────────────────────────────────────
async function obtainBrowser(options) {
  let browser = null;
  let connectionType = "Local Chromium";

  // Check candidate executable paths if local launch needed
  const candidatePaths = [
    process.env.CHROME_BIN,
    "/home/dev/.cache/ms-playwright/chromium-1254/chrome-linux64/chrome",
    "/home/dev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);

  let detectedExecutablePath = null;
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      detectedExecutablePath = p;
      break;
    }
  }

  if (options.useCdp) {
    console.log(`Connecting to Chrome via CDP at ${options.cdpEndpoint}...`);
    try {
      browser = await chromium.connectOverCDP(options.cdpEndpoint, {
        timeout: 4000,
      });
      connectionType = `CDP (${options.cdpEndpoint})`;
      console.log(`  ✓ Connected to Chrome CDP`);
    } catch (err) {
      console.warn(`  ⚠ CDP connection failed: ${err.message}`);
      console.log(`  → Falling back to local Playwright Chromium launcher...`);
    }
  }

  if (!browser) {
    try {
      const launchOptions = {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
      };
      if (detectedExecutablePath) {
        launchOptions.executablePath = detectedExecutablePath;
      }
      browser = await chromium.launch(launchOptions);
      connectionType = detectedExecutablePath
        ? `Local Chromium (${detectedExecutablePath})`
        : "Local Playwright Chromium";
    } catch (err) {
      console.error("\n❌ Could not launch local Chromium browser.");
      console.error(`Reason: ${err.message}\n`);
      console.info("💡 Recommended solutions:");
      console.info("  1. Connect to Chrome CDP (Host or Remote Tunnel):");
      console.info(
        "     Start Chrome with: google-chrome --remote-debugging-port=9222",
      );
      console.info(
        "     Then run: node scripts/capture-responsive.js --cdp http://127.0.0.1:9222\n",
      );
      console.info("  2. If running headless in Linux container:");
      console.info("     npx playwright install-deps");
      console.info("     npx playwright install chromium\n");
      throw err;
    }
  }

  return { browser, connectionType };
}

// ── Format Helper ───────────────────────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

// ── Main Execution ──────────────────────────────────────────────────────────
async function main() {
  const options = parseArgs();

  if (options.help) {
    printHelp();
    return;
  }

  console.log("\n=======================================================");
  console.log(" 📸 Responsive Screenshot Capture Pipeline");
  console.log("=======================================================");
  console.log(`Target Base URL:  ${options.baseUrl}`);
  console.log(`Output Directory: ${options.outputDir}`);
  console.log(
    `Routes to test:   ${options.routes.map((r) => r.path).join(", ")}`,
  );
  console.log(`Viewport count:   ${VIEWPORT_MATRIX.length} devices`);
  console.log("=======================================================\n");

  // Ensure output directory exists
  fs.mkdirSync(options.outputDir, { recursive: true });

  // Check server availability
  const serverUp = await isServerReachable(options.baseUrl);
  if (!serverUp) {
    console.warn(
      `\n[WARNING] Target server at ${options.baseUrl} is not reachable!`,
    );
    console.warn("Please start the web server in another terminal:");
    console.warn("  pnpm dev   OR   pnpm preview\n");
    console.warn("Attempting to proceed in case routes become reachable...\n");
  }

  const startTime = Date.now();
  const { browser, connectionType } = await obtainBrowser(options);
  console.log(`Browser Mode:     ${connectionType}\n`);

  const results = [];

  for (const route of options.routes) {
    const fullUrl = new URL(route.path, options.baseUrl).toString();
    console.log(`🌐 Route [${route.name}] → ${fullUrl}`);

    for (const vp of VIEWPORT_MATRIX) {
      const fileName = `${route.name}_${vp.id}.png`;
      const filePath = path.join(options.outputDir, fileName);
      process.stdout.write(
        `   • [${vp.category.padEnd(7)}] ${vp.device.padEnd(14)} (${vp.width}x${vp.height}): `,
      );

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: vp.userAgent,
        deviceScaleFactor: 2,
        isMobile: vp.category !== "Desktop",
        hasTouch: vp.category !== "Desktop",
      });

      const page = await context.newPage();

      try {
        await page
          .goto(fullUrl, {
            waitUntil: "networkidle",
            timeout: 20000,
          })
          .catch(async () => {
            // Fallback if networkidle times out due to persistent sockets
            return page.goto(fullUrl, {
              waitUntil: "domcontentloaded",
              timeout: 10000,
            });
          });

        // Let web fonts, animations, and transitions settle
        await page.waitForTimeout(600);

        // Ensure theme is loaded
        await page.evaluate(() => {
          document.documentElement.classList.add("critical-css-loaded");
        });

        await page.screenshot({
          path: filePath,
          fullPage: options.fullPage,
        });

        const stat = fs.statSync(filePath);
        console.log(`✓ SAVED (${formatBytes(stat.size)})`);
        results.push({
          route: route.path,
          device: vp.device,
          viewport: `${vp.width}x${vp.height}`,
          category: vp.category,
          status: "SUCCESS",
          size: stat.size,
          file: fileName,
        });
      } catch (err) {
        console.log(`✗ FAILED (${err.message.split("\n")[0]})`);
        results.push({
          route: route.path,
          device: vp.device,
          viewport: `${vp.width}x${vp.height}`,
          category: vp.category,
          status: "FAILED",
          error: err.message.split("\n")[0],
          file: fileName,
        });
      } finally {
        await page.close();
        await context.close();
      }
    }
    console.log("");
  }

  await browser.close();
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1);

  // ── Print Results Table ─────────────────────────────────────────────────────
  console.log(
    "==========================================================================================",
  );
  console.log(" 📊 Responsive Capture Summary");
  console.log(
    "==========================================================================================",
  );
  console.log(
    "Route".padEnd(14) +
      "Category".padEnd(10) +
      "Device".padEnd(16) +
      "Viewport".padEnd(12) +
      "Status".padEnd(10) +
      "Size / Details",
  );
  console.log(
    "------------------------------------------------------------------------------------------",
  );

  for (const r of results) {
    const statusCol = r.status === "SUCCESS" ? "✓ OK" : "✗ FAIL";
    const detail =
      r.status === "SUCCESS" ? formatBytes(r.size) : r.error || "Error";
    console.log(
      r.route.padEnd(14) +
        r.category.padEnd(10) +
        r.device.padEnd(16) +
        r.viewport.padEnd(12) +
        statusCol.padEnd(10) +
        detail,
    );
  }

  const successCount = results.filter((r) => r.status === "SUCCESS").length;
  console.log(
    "==========================================================================================",
  );
  console.log(
    `Total: ${results.length} captures | Succeeded: ${successCount} | Failed: ${results.length - successCount} | Elapsed: ${totalDuration}s`,
  );
  console.log(`Output Directory: file://${options.outputDir}`);
  console.log(
    "==========================================================================================\n",
  );
}

main().catch((err) => {
  console.error("Execution failed:", err);
  process.exit(1);
});
