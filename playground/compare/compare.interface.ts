import type { Measure } from './measure.ts'
import type { Product } from './product.ts'

export interface CompareViewModel {
  products: Product[]
  frame: Measure
  css: Measure
  rows: { label: string; frame: string; css: string }[]
  buy: (name: string) => void
}
