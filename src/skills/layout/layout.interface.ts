/** A length. Numbers are px; strings pass through (`'50%'`, `'2rem'`, `'auto'`). */
export type Length = number | (string & {})

export type Flow = 'row' | 'column' | 'grid' | 'stack' | 'block' | 'inline'
export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export interface LayoutStyle {
  /**
   * How children are placed.
   * row / column → flexbox · grid → CSS grid (pair with cols/rows) ·
   * stack → children overlap in one cell · block → normal flow · inline → inline text.
   */
  flow?: Flow
  /** Space between children. `{ x, y }` sets column and row gaps separately. */
  gap?: Length | { x?: Length; y?: Length }
  /** Cross-axis alignment of children (align-items). */
  align?: Align
  /** Main-axis distribution of children (justify-content). */
  justify?: Justify
  /** This frame's own cross-axis alignment inside a flex/grid parent. */
  alignSelf?: Align
  /** This frame's own inline alignment inside a grid or stack parent. */
  justifySelf?: 'start' | 'center' | 'end' | 'stretch'
  /** Sit inside a line of text: flex → inline-flex, grid → inline-grid, block → inline-block. */
  inline?: boolean
  /** Let children wrap onto new lines (row/column flows). */
  wrap?: boolean
  /** Grid columns. `3` → three equal columns; a string is a literal template (`'240px 1fr'`). */
  cols?: number | (string & {})
  /** Grid rows. Same shorthand as cols. */
  rows?: number | (string & {})
  /** Span inside a parent grid. A number spans columns; `'all'` spans the full row. */
  span?: number | 'all' | { cols?: number | 'all'; rows?: number }
  /** Grow to fill free space in a row/column parent. `true` = 1. */
  grow?: boolean | number
  /** Allow shrinking below basis. `false` pins the size. */
  shrink?: boolean | number
  /** Starting main size in a row/column parent. */
  basis?: Length
  /** Visual order inside a flex/grid parent. */
  order?: number
  /** Clip children to the frame (overflow: hidden). */
  clip?: boolean
  /** Make the frame scrollable on an axis. */
  scroll?: 'x' | 'y' | 'both'
  /** Remove from layout (display: none). Useful inside `at` for responsive hiding. */
  hide?: boolean
}

export const LAYOUT_KEYS = [
  'flow', 'gap', 'align', 'justify', 'alignSelf', 'justifySelf', 'inline', 'wrap', 'cols', 'rows', 'span',
  'grow', 'shrink', 'basis', 'order', 'clip', 'scroll', 'hide',
] as const satisfies readonly (keyof LayoutStyle)[]
