import { createElement } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Frame, ruleCount } from 'noiir'
import { ProductCard as FrameCard } from '../compare/ProductCard.frame.tsx'
import { ProductCard as CssCard } from '../compare/ProductCard.css.tsx'
import { products } from '../compare/product.ts'
import type { BenchResult, Impl, ImplResult, Timing } from './bench.interface.ts'

const noop = () => {}

function cards(impl: Impl, n: number, bump: number) {
  const Card = impl === 'frame' ? FrameCard : CssCard
  return createElement(Frame, { flow: 'row', wrap: true, gap: 16 }, ...products(n, bump).map((p) => createElement(Card, { key: p.id, p, onBuy: noop })))
}

/** Time a synchronous render, split into the React/JS part and the style + layout it causes. */
function timed(fn: () => void): Timing {
  const t0 = performance.now()
  fn()
  const t1 = performance.now()
  void document.body.offsetHeight
  const t2 = performance.now()
  return { total: t2 - t0, js: t1 - t0, layout: t2 - t1 }
}

const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)] ?? 0
const medianTiming = (ts: Timing[]): Timing => ({
  total: median(ts.map((t) => t.total)),
  js: median(ts.map((t) => t.js)),
  layout: median(ts.map((t) => t.layout)),
})
const idle = () => new Promise((r) => setTimeout(r, 30))

function cssRuleCount(): number {
  // Style rules also expose `cssRules` (CSS nesting), so count them before descending.
  const count = (rules: CSSRuleList): number =>
    [...rules].reduce(
      (n, r) => n + (r instanceof CSSStyleRule ? 1 : 0) + ('cssRules' in r && r.cssRules ? count(r.cssRules as CSSRuleList) : 0),
      0,
    )
  for (const sheet of document.styleSheets) {
    try {
      // ProductCard.css is the playground's only CSS file, so its sheet holds just the card's rules.
      if ([...sheet.cssRules].some((r) => r.cssText.includes('.product-card'))) return count(sheet.cssRules)
    } catch {
      /* cross-origin sheet */
    }
  }
  return 0
}

function once(stage: HTMLElement, impl: Impl, n: number): { mount: Timing; update: Timing; nodes: number } {
  const root = createRoot(stage)
  const mount = timed(() => flushSync(() => root.render(cards(impl, n, 0))))
  const update = timed(() => flushSync(() => root.render(cards(impl, n, 1))))
  const nodes = stage.querySelectorAll('*').length
  flushSync(() => root.unmount())
  return { mount, update, nodes }
}

/**
 * Mount and update `n` product cards with each implementation, alternating the order every
 * iteration. The first (cold) mount is reported separately: for Frame it includes compiling
 * and inserting the atomic rules.
 */
export async function runBench(
  stage: HTMLElement,
  n: number,
  { iterations = 7, first = 'frame', onProgress }: { iterations?: number; first?: Impl; onProgress?: (done: number, total: number) => void } = {},
): Promise<BenchResult> {
  // Warm React itself up on a neutral tree first, so neither implementation's cold mount pays for it.
  const warm = createRoot(stage)
  flushSync(() => warm.render(createElement('ol', null, ...Array.from({ length: n * 5 }, (_, i) => createElement('li', { key: i }, i)))))
  flushSync(() => warm.unmount())
  await idle()

  const rulesBefore = ruleCount()
  const cold: Record<Impl, Timing> = { frame: { total: 0, js: 0, layout: 0 }, css: { total: 0, js: 0, layout: 0 } }
  // Whichever goes first also warms image decoding and font caches for the other; `npm run bench`
  // loads the page twice with each order and keeps each implementation's first-place cold mount.
  for (const impl of first === 'frame' ? (['frame', 'css'] as const) : (['css', 'frame'] as const)) {
    cold[impl] = once(stage, impl, n).mount
    await idle()
  }
  const frameRules = ruleCount() - rulesBefore

  const runs: Record<Impl, { mount: Timing[]; update: Timing[]; nodes: number }> = {
    frame: { mount: [], update: [], nodes: 0 },
    css: { mount: [], update: [], nodes: 0 },
  }
  for (let i = 0; i < iterations; i++) {
    for (const impl of i % 2 ? (['css', 'frame'] as const) : (['frame', 'css'] as const)) {
      const r = once(stage, impl, n)
      runs[impl].mount.push(r.mount)
      runs[impl].update.push(r.update)
      runs[impl].nodes = r.nodes
      await idle()
    }
    onProgress?.(i + 1, iterations)
  }

  const result = (impl: Impl, rules: number): ImplResult => ({
    impl,
    cold: cold[impl],
    mount: medianTiming(runs[impl].mount),
    update: medianTiming(runs[impl].update),
    nodes: runs[impl].nodes,
    rules,
  })
  return {
    n,
    iterations,
    first,
    userAgent: navigator.userAgent,
    results: { frame: result('frame', frameRules), css: result('css', cssRuleCount()) },
  }
}
