import type { Rule } from 'eslint'
import { asNode } from '../ast.ts'
import type { JSXOpeningElement } from '../ast.ts'
import { attr, componentTracker, elementName, merge } from '../util.ts'

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Flag the `unsafe` raw-CSS escape hatch so it is seen in review.' },
    schema: [],
    messages: { unsafe: '`unsafe` bypasses theme tokens, states and reduced motion. Prefer a skill prop; if none fits, say why in a comment.' },
  },
  create(context) {
    const t = componentTracker()
    return merge(t.visitors, {
      JSXOpeningElement(node: unknown) {
        const el = node as JSXOpeningElement
        if (!t.isNoiir(elementName(el))) return
        const a = attr(el, 'unsafe')
        if (a) context.report({ node: asNode(a), messageId: 'unsafe' })
      },
    } as Rule.RuleListener)
  },
}
export default rule
