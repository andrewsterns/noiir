// npm run bench [-- --n 1000 --channel chrome|msedge]
// Builds the playground for production, serves it, and runs the Frame-vs-CSS benchmark headless.
import { execFileSync, spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import type { BenchResult } from '../playground/bench/bench.interface.ts'
import { benchRows } from '../playground/bench/bench.rows.ts'

const arg = (name: string, fallback: string) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > 0 ? (process.argv[i + 1] ?? fallback) : fallback
}
const n = arg('n', '1000')
const port = 5318
const root = fileURLToPath(new URL('..', import.meta.url))
const vite = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))

execFileSync(process.execPath, [vite, 'build', 'playground', '--logLevel', 'warn'], { cwd: root, stdio: 'inherit' })
const server = spawn(process.execPath, [vite, 'preview', 'playground', '--port', String(port), '--strictPort'], { cwd: root, stdio: 'ignore' })

try {
  const url = `http://localhost:${port}/`
  for (let i = 0; ; i++) {
    try {
      if ((await fetch(url)).ok) break
    } catch {
      if (i > 100) throw new Error('preview server did not start')
      await new Promise((r) => setTimeout(r, 100))
    }
  }

  const channels = [arg('channel', 'chrome'), 'msedge', 'chrome']
  const launch = async () => {
    for (const channel of channels) {
      try {
        return await chromium.launch({ channel })
      } catch {
        /* try the next installed browser */
      }
    }
    throw new Error('No Chrome or Edge found. Install one, or run `npx playwright install chromium` and pass --channel chromium.')
  }

  // Each order runs in a fresh browser, so image-decode and font caches can't carry over. Each
  // implementation's cold mount comes from the run where it went first.
  const runOnce = async (first: 'frame' | 'css') => {
    const browser = await launch()
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
    await page.goto(`${url}#/bench?auto&n=${n}&first=${first}`)
    await page.waitForFunction(() => (window as unknown as { __bench?: unknown }).__bench, null, { timeout: 600_000 })
    const result = (await page.evaluate(() => (window as unknown as { __bench: unknown }).__bench)) as BenchResult
    await browser.close()
    return result
  }
  const r = await runOnce('frame')
  const b = await runOnce('css')
  r.results.css.cold = b.results.css.cold

  console.log(`
${r.n} product cards · ${r.iterations} iterations · production build
${r.userAgent}
`)
  console.log(`${'metric'.padEnd(26)}${'<Frame />'.padStart(12)}${'TSX + CSS'.padStart(12)}${'Frame Δ'.padStart(10)}`)
  for (const row of benchRows(r)) console.log(`${row.metric.padEnd(26)}${row.frame.padStart(12)}${row.css.padStart(12)}${row.diff.padStart(10)}`)
} finally {
  server.kill()
}
