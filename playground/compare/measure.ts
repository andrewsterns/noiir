// Size metrics for the Frame-vs-CSS comparison. Pure: used by the Compare page and `npm run compare`.

export interface Measure {
  files: number
  lines: number
  chars: number
  /** Approximate LLM tokens (chars / 3.6, typical for code). Labelled "≈" wherever it is shown. */
  tokens: number
  /** Class names the author had to invent. */
  classNames: number
  /** CSS/DOM techniques the author had to know and get right. */
  tricks: string[]
}

const TRICKS: [string, RegExp][] = [
  ['mask-composite ring', /mask:[^;]*exclude|mask-composite/],
  ['background-clip: text', /background-clip:\s*text/],
  ['-webkit-line-clamp', /line-clamp/],
  ['IntersectionObserver', /IntersectionObserver/],
  ['prefers-reduced-motion', /prefers-reduced-motion/],
  ['@media (hover: hover)', /\(hover:\s*hover\)/],
  [':focus-visible', /:focus-visible/],
  ['@keyframes', /@keyframes/],
  ['element.animate()', /\.animate\(/],
]

export function measure(sources: readonly string[]): Measure {
  const all = sources.join('\n')
  const trimmed = sources.map((s) => s.trim())
  const chars = trimmed.reduce((n, s) => n + s.length, 0)
  // Class names: selectors in CSS sources, plus the names used in className strings.
  const css = sources.filter((s) => !/\bimport\b|=>/.test(s)).join('\n')
  const classNames = new Set([
    ...[...css.matchAll(/\.([a-z][\w-]*)(?=[^{};]*\{)/g)].map((m) => m[1]),
    ...[...all.matchAll(/className=["{`]([^"}`]*)/g)].flatMap((m) => m[1]!.split(/\s+|\$\{[^}]*\}/).filter((c) => /^[a-z][\w-]*$/.test(c))),
  ])
  return {
    files: sources.length,
    lines: trimmed.reduce((n, s) => n + s.split('\n').filter((l) => l.trim()).length, 0),
    chars,
    tokens: Math.round(chars / 3.6),
    classNames: classNames.size,
    tricks: TRICKS.filter(([, re]) => re.test(all)).map(([name]) => name),
  }
}
