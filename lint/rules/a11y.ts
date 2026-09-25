import type { Rule } from 'eslint'
import { asNode } from '../ast.ts'
import type { JSXOpeningElement } from '../ast.ts'
import { INTERACTIVE_ATTRS, NAME_ATTRS, attr, attrValue, componentTracker, elementName, hasAttr, hasChildren, hasKey, hasSpread, merge } from '../util.ts'

const onElement = (check: (el: JSXOpeningElement, name: string, isNoiir: (n: string) => boolean, context: Rule.RuleContext) => void): Rule.RuleModule['create'] =>
  (context) => {
    const t = componentTracker()
    return merge(t.visitors, {
      JSXOpeningElement(node: unknown) {
        const el = node as JSXOpeningElement
        check(el, elementName(el), t.isNoiir, context)
      },
    } as Rule.RuleListener)
  }

/** Interactive frames and buttons need an accessible name. */
export const interactiveHasName: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: { description: 'Clickable frames and buttons need visible text or a `label`.' },
    schema: [],
    messages: { unnamed: '<{{name}}> is interactive but has no name. Give it text children or `label="…"` (screen readers announce it).' },
  },
  create: onElement((el, name, isNoiir, context) => {
    if (!isNoiir(name) || hasSpread(el)) return
    const interactive = name === 'Button' || hasAttr(el, ...INTERACTIVE_ATTRS)
    if (!interactive) return
    if (hasAttr(el, ...NAME_ATTRS) || hasChildren(el)) return
    context.report({ node: asNode(el), messageId: 'unnamed', data: { name } })
  }),
}

/** Image fills and <Frame as="img"> need a text alternative (or to be marked decorative). */
export const imageHasLabel: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: { description: 'Images need a label, or aria-hidden when decorative.' },
    schema: [],
    messages: {
      fill: 'An image fill with no content needs `label="…"` (it becomes role="img"), or aria-hidden="true" if it is decoration.',
      img: '<Frame as="img"> needs `alt` ("" for decoration).',
    },
  },
  create: onElement((el, name, isNoiir, context) => {
    if (!isNoiir(name) || hasSpread(el)) return
    if (attrValue(attr(el, 'as')) === 'img') {
      if (!hasAttr(el, 'alt')) context.report({ node: asNode(el), messageId: 'img' })
      return
    }
    const fill = attr(el, 'fill')
    if (!fill?.value || !hasKey(fill.value, 'image') || hasChildren(el)) return
    if (hasAttr(el, ...NAME_ATTRS, 'aria-hidden', 'role')) return
    context.report({ node: asNode(el), messageId: 'fill' })
  }),
}

export const noPositiveTabindex: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: { description: 'Positive tabIndex breaks the natural focus order.' },
    schema: [],
    messages: { positive: 'tabIndex={{value}} jumps the focus order. Use 0 (or `focusable`) and order the markup instead.' },
  },
  create: onElement((el, _name, _isNoiir, context) => {
    const v = attrValue(attr(el, 'tabIndex'))
    if (typeof v === 'number' && v > 0) context.report({ node: asNode(el), messageId: 'positive', data: { value: String(v) } })
  }),
}

/** Clickable raw Frames should show hover and press feedback. Library components already do. */
export const interactiveFeedback: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Interactive frames should respond to hover and press.' },
    schema: [],
    messages: { flat: 'This <Frame> is clickable but has no `hover` / `press` style, so it gives no feedback. Add hover and press styles (for example hover: { glow: true }, press: { scale: 0.98 }), or use <Button>.' },
  },
  create: onElement((el, name, _isNoiir, context) => {
    if (name !== 'Frame' || hasSpread(el)) return
    if (!hasAttr(el, 'onClick', 'href')) return
    if (hasAttr(el, 'hover', 'press', 'variants', 'variant')) return
    context.report({ node: asNode(el), messageId: 'flat' })
  }),
}

/** Tap targets: WCAG 2.5.8 asks for at least 24px; 44px is comfortable. */
export const touchTarget: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Interactive frames should be at least 24px tall (44px recommended).' },
    schema: [],
    messages: { small: '{{prop}}={{value}} makes this tap target smaller than 24px (WCAG 2.5.8). 44px is comfortable on touch.' },
  },
  create: onElement((el, name, isNoiir, context) => {
    if (!isNoiir(name)) return
    if (!(name === 'Button' || hasAttr(el, ...INTERACTIVE_ATTRS))) return
    for (const prop of ['h', 'minH']) {
      const v = attrValue(attr(el, prop))
      if (typeof v === 'number' && v < 24) context.report({ node: asNode(el), messageId: 'small', data: { prop, value: String(v) } })
    }
  }),
}
