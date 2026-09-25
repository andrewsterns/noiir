export type Impl = 'frame' | 'css'

/** ms. `js` is React rendering plus Frame's own work; `layout` is the browser's style recalc and layout. */
export interface Timing {
  total: number
  js: number
  layout: number
}

export interface ImplResult {
  impl: Impl
  /** First mount in a fresh page (after a neutral React warm-up). */
  cold: Timing
  /** Median warm mount. */
  mount: Timing
  /** Median re-render with every price changed. */
  update: Timing
  /** DOM elements per run. */
  nodes: number
  /** Style rules the implementation needed. */
  rules: number
}

export interface BenchResult {
  n: number
  iterations: number
  /** Which implementation mounted first (its cold mount is the fair one). */
  first: Impl
  userAgent: string
  results: Record<Impl, ImplResult>
}

export interface BenchRow {
  metric: string
  frame: string
  css: string
  diff: string
}

export interface BenchViewModel {
  stageId: string
  n: string
  setN: (n: string) => void
  running: boolean
  progress: number | null
  result: BenchResult | null
  rows: BenchRow[]
  dev: boolean
  run: () => void
}

export const BENCH_SIZES = ['100', '500', '1000', '2000'] as const
