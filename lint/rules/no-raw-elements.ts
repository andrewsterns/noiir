import type { Rule } from 'eslint'
import { asNode } from '../ast.ts'
import type { JSXOpeningElement } from '../ast.ts'
import { elementName, normalizePath } from '../util.ts'

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: { description: 'Use <Frame as="…"> instead of raw DOM elements, so every box gets the reset, tokens and state styles.' },
    schema: [{ type: 'object', properties: { allow: { type: 'array', items: { type: 'string' } } }, additionalProperties: false }],
    messages: {
      raw: 'Raw <{{tag}}>: use <Frame as="{{tag}}"> (or a library component). Frames carry the reset, theme tokens, state styles and ARIA inference.',
    },
  },
  create(context) {
    const allow: string[] = (context.options[0] as { allow?: string[] } | undefined)?.allow ?? ['frame.view.tsx']
    const file = normalizePath(context.filename)
    if (allow.some((suffix) => file.endsWith(suffix))) return {}
    return {
      JSXOpeningElement(node: unknown) {
        const el = node as JSXOpeningElement
        const tag = elementName(el)
        if (/^[a-z]/.test(tag)) context.report({ node: asNode(el), messageId: 'raw', data: { tag } })
      },
    } as Rule.RuleListener
  },
}
export default rule
