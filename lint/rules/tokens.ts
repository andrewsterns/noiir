import type { Rule } from 'eslint'
import { asNode } from '../ast.ts'
import type { JSXAttribute, JSXOpeningElement } from '../ast.ts'
import { COLOR_TOKENS, PALETTES, TINTS, contrast as ratio } from '../../src/tokens/palettes.ts'
import type { ColorToken } from '../../src/tokens/palettes.ts'
import { attr, attrName, attrValue, componentTracker, elementName, merge } from '../util.ts'

const SPACING = new Set(['gap', 'padding', 'margin'])

/** On the 4px grid, with 2px half-steps for small values and 1px hairlines. */
export const onGrid = (v: number): boolean => {
  const a = Math.abs(v)
  return a === 0 || a === 1 || (a <= 12 && a % 2 === 0) || a % 4 === 0
}

function numbersIn(v: unknown): number[] {
  if (typeof v === 'number') return [v]
  if (v && typeof v === 'object') return Object.values(v).flatMap(numbersIn)
  return []
}

export const onScale: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Spacing (gap, padding, margin) sits on the 4px grid.' },
    schema: [],
    messages: { off: '{{prop}} uses {{value}}px, off the 4px grid. Use {{down}} or {{up}}.' },
  },
  create(context) {
    const t = componentTracker()
    return merge(t.visitors, {
      JSXAttribute(node: unknown) {
        const a = node as JSXAttribute
        const prop = attrName(a)
        if (!SPACING.has(prop)) return
        const el = a.parent as JSXOpeningElement | undefined
        if (!el || !t.isNoiir(elementName(el))) return
        for (const v of numbersIn(attrValue(a))) {
          if (onGrid(v)) continue
          const down = Math.floor(Math.abs(v) / 4) * 4
          context.report({ node: asNode(a), messageId: 'off', data: { prop, value: String(v), down: String(down), up: String(down + 4) } })
        }
      },
    } as Rule.RuleListener)
  },
}

const TOKENS = new Set<string>(COLOR_TOKENS)

export const contrast: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: { description: 'Text color on a fill must reach WCAG 4.5:1 in every tint.' },
    schema: [],
    messages: { low: 'color="{{fg}}" on fill="{{bg}}" is {{ratio}}:1 in the {{tint}} tint (needs 4.5:1 for text). Try color="{{suggest}}".' },
  },
  create(context) {
    const t = componentTracker()
    return merge(t.visitors, {
      JSXOpeningElement(node: unknown) {
        const el = node as JSXOpeningElement
        if (!t.isNoiir(elementName(el))) return
        const fg = attrValue(attr(el, 'color'))
        const bg = attrValue(attr(el, 'fill'))
        if (typeof fg !== 'string' || typeof bg !== 'string' || !TOKENS.has(fg) || !TOKENS.has(bg)) return
        for (const tint of TINTS) {
          const p = PALETTES[tint]
          const r = ratio(p[fg as ColorToken], p[bg as ColorToken])
          if (r >= 4.5) continue
          const suggest = (['on-phosphor', 'phosphor', 'bg'] as const).find((c) => ratio(p[c], p[bg as ColorToken]) >= 4.5) ?? 'phosphor'
          context.report({ node: asNode(el), messageId: 'low', data: { fg, bg, tint, ratio: r.toFixed(2), suggest } })
          return
        }
      },
    } as Rule.RuleListener)
  },
}
