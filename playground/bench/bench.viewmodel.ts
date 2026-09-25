import { useEffect, useState } from 'react'
import { runBench } from './bench.run.ts'
import { benchRows } from './bench.rows.ts'
import type { BenchResult, BenchViewModel } from './bench.interface.ts'

declare global {
  interface Window {
    __bench?: BenchResult
  }
}

const STAGE_ID = 'bench-stage'

export function useBenchViewModel(): BenchViewModel {
  const [n, setN] = useState(() => new URLSearchParams(window.location.hash.split('?')[1]).get('n') ?? '1000')
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const [result, setResult] = useState<BenchResult | null>(null)

  const run = async () => {
    const stage = document.getElementById(STAGE_ID)
    if (!stage || running) return
    setRunning(true)
    setProgress(0)
    await new Promise((r) => setTimeout(r, 50))
    const first = new URLSearchParams(window.location.hash.split('?')[1]).get('first') === 'css' ? 'css' : 'frame'
    const r = await runBench(stage, Number(n), { first, onProgress: (done, total) => setProgress(done / total) })
    setResult(r)
    window.__bench = r
    setRunning(false)
    setProgress(null)
  }

  // `#/bench?auto` runs on load (used by `npm run bench`).
  useEffect(() => {
    if (window.location.hash.includes('auto')) void run()
  }, [])

  return {
    stageId: STAGE_ID,
    n,
    setN,
    running,
    progress,
    result,
    dev: import.meta.env.DEV,
    run: () => void run(),
    rows: result ? benchRows(result) : [],
  }
}
