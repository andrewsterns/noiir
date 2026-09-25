import { toast } from 'noiir'
import frameSrc from './ProductCard.frame.tsx?raw'
import cssTsxSrc from './ProductCard.css.tsx?raw'
import cssSrc from './ProductCard.css?raw'
import { measure } from './measure.ts'
import { products } from './product.ts'
import type { CompareViewModel } from './compare.interface.ts'

const frame = measure([frameSrc])
const css = measure([cssTsxSrc, cssSrc])

export function useCompareViewModel(): CompareViewModel {
  return {
    products: products(3),
    frame,
    css,
    rows: [
      { label: 'Files', frame: String(frame.files), css: String(css.files) },
      { label: 'Lines', frame: String(frame.lines), css: String(css.lines) },
      { label: 'Characters', frame: String(frame.chars), css: String(css.chars) },
      { label: '≈ Tokens to write', frame: String(frame.tokens), css: String(css.tokens) },
      { label: 'Class names invented', frame: String(frame.classNames), css: String(css.classNames) },
      { label: 'Techniques to recall', frame: String(frame.tricks.length), css: String(css.tricks.length) },
    ],
    buy: (name) => toast(`Added: ${name}`, { kind: 'ok' }),
  }
}
