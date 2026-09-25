// npm run compare: what the author had to write for the same product card, Frame vs TSX + CSS.
import { readFileSync } from 'node:fs'
import { measure } from '../playground/compare/measure.ts'

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const frame = measure([read('playground/compare/ProductCard.frame.tsx')])
const css = measure([read('playground/compare/ProductCard.css.tsx'), read('playground/compare/ProductCard.css')])

const rows: [string, number, number][] = [
  ['files', frame.files, css.files],
  ['lines', frame.lines, css.lines],
  ['characters', frame.chars, css.chars],
  ['≈ tokens to write', frame.tokens, css.tokens],
  ['class names invented', frame.classNames, css.classNames],
  ['techniques to recall', frame.tricks.length, css.tricks.length],
]
console.log(`\n${'metric'.padEnd(24)}${'<Frame />'.padStart(10)}${'TSX + CSS'.padStart(11)}${'ratio'.padStart(8)}`)
for (const [m, a, b] of rows) console.log(`${m.padEnd(24)}${String(a).padStart(10)}${String(b).padStart(11)}${(a ? `${(b / a).toFixed(1)}×` : '—').padStart(8)}`)
console.log(`\nTechniques the CSS version needed: ${css.tricks.join(', ')}`)
console.log('Tokens ≈ characters / 3.6 (a typical ratio for code), not an exact tokenizer count.\n')
