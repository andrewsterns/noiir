import type { BenchResult, BenchRow } from './bench.interface.ts'

const ms = (v: number) => `${v.toFixed(1)} ms`
const pct = (a: number, b: number) => (b === 0 ? '—' : `${a >= b ? '+' : ''}${(((a - b) / b) * 100).toFixed(0)}%`)

/** The results table, shared by the Bench page and `npm run bench`. */
export function benchRows(r: BenchResult): BenchRow[] {
  const f = r.results.frame
  const c = r.results.css
  const t = (metric: string, a: number, b: number): BenchRow => ({ metric, frame: ms(a), css: ms(b), diff: pct(a, b) })
  return [
    t('cold mount', f.cold.total, c.cold.total),
    t('  of which JS', f.cold.js, c.cold.js),
    t('warm mount', f.mount.total, c.mount.total),
    t('  of which JS', f.mount.js, c.mount.js),
    t('  of which style+layout', f.mount.layout, c.mount.layout),
    t('update all', f.update.total, c.update.total),
    t('  of which JS', f.update.js, c.update.js),
    t('  of which style+layout', f.update.layout, c.update.layout),
    { metric: 'DOM elements', frame: String(f.nodes), css: String(c.nodes), diff: pct(f.nodes, c.nodes) },
    { metric: 'style rules', frame: String(f.rules), css: String(c.rules), diff: pct(f.rules, c.rules) },
  ]
}
