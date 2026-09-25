import type { Rule } from 'eslint'
import { asNode } from '../ast.ts'
import type { JSXOpeningElement } from '../ast.ts'
import { attr, componentTracker, elementName, merge } from '../util.ts'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: { description: 'Ban style and className on noiir components: every style is a typed skill prop.' },
    schema: [],
    messages: {
      style: '`style` on <{{name}}>: use skill props instead (fill, padding, border, font …). For a true escape hatch, `unsafe` exists and is visible in review.',
      className: '`className` on <{{name}}>: noiir owns class names. Use skill props, or defineFrame() for a reusable look.',
    },
  },
  create(context) {
    const t = componentTracker()
    return merge(t.visitors, {
      JSXOpeningElement(node: unknown) {
        const el = node as JSXOpeningElement
        const name = elementName(el)
        if (!t.isNoiir(name)) return
        for (const prop of ['style', 'className'] as const) {
          const a = attr(el, prop)
          if (a) context.report({ node: asNode(a), messageId: prop, data: { name } })
        }
      },
    } as Rule.RuleListener)
  },
}
export default rule
