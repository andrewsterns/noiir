import type { Rule } from 'eslint'
import type { ArrayExpression, ImportDeclaration, JSXAttribute, JSXOpeningElement, Node, ObjectExpression } from './ast.ts'

export const UNKNOWN = Symbol('unknown')

/** 'Frame', 'div', 'Foo.Bar', 'svg:path'. */
export function elementName(el: JSXOpeningElement): string {
  const n = el.name
  if (n.type === 'JSXIdentifier') return n.name ?? ''
  if (n.type === 'JSXMemberExpression') return `${n.object?.name ?? '?'}.${n.property?.name ?? '?'}`
  if (n.type === 'JSXNamespacedName') return `${n.namespace?.name}:${n.name}`
  return ''
}

const attrName = (a: JSXAttribute): string => (typeof a.name.name === 'string' ? a.name.name : a.name.name.name)

export function attr(el: JSXOpeningElement, name: string): JSXAttribute | undefined {
  return el.attributes.find((a): a is JSXAttribute => a.type === 'JSXAttribute' && attrName(a) === name)
}

export const hasAttr = (el: JSXOpeningElement, ...names: string[]): boolean => names.some((n) => attr(el, n) !== undefined)

export const hasSpread = (el: JSXOpeningElement): boolean => el.attributes.some((a) => a.type === 'JSXSpreadAttribute')

export { attrName }

/** The value of a literal expression, or UNKNOWN. Handles objects/arrays of literals and negative numbers. */
export function literal(node: Node | null | undefined): unknown {
  if (!node) return UNKNOWN
  switch (node.type) {
    case 'Literal':
      return (node as Node & { value: unknown }).value
    case 'UnaryExpression': {
      const u = node as Node & { operator: string; argument: Node }
      const v = literal(u.argument)
      return u.operator === '-' && typeof v === 'number' ? -v : UNKNOWN
    }
    case 'TemplateLiteral': {
      const t = node as Node & { expressions: Node[]; quasis: { value: { cooked: string } }[] }
      return t.expressions.length ? UNKNOWN : t.quasis[0]?.value.cooked
    }
    case 'ObjectExpression': {
      const out: Record<string, unknown> = {}
      for (const p of (node as ObjectExpression).properties) {
        if (p.type !== 'Property' || !p.key) return UNKNOWN
        const k = p.key.name ?? String(p.key.value)
        out[k] = literal(p.value)
      }
      return out
    }
    case 'ArrayExpression':
      return (node as ArrayExpression).elements.map((e) => literal(e))
    case 'TSAsExpression':
    case 'TSSatisfiesExpression':
      return literal((node as Node & { expression: Node }).expression)
    default:
      return UNKNOWN
  }
}

/** The static value of an attribute: `x="a"` → 'a', `x={4}` → 4, bare `x` → true. */
export function attrValue(a: JSXAttribute | undefined): unknown {
  if (!a) return undefined
  if (a.value === null) return true
  if (a.value.type === 'Literal') return a.value.value
  return literal(a.value.expression)
}

/** Does an expression (object / array of objects) contain a property with this key, whatever its value? */
export function hasKey(node: Node | undefined, key: string): boolean {
  if (!node) return false
  if (node.type === 'JSXExpressionContainer') return hasKey((node as Node & { expression: Node }).expression, key)
  if (node.type === 'ObjectExpression')
    return (node as ObjectExpression).properties.some((p) => p.key && (p.key.name ?? p.key.value) === key)
  if (node.type === 'ArrayExpression') return (node as ArrayExpression).elements.some((e) => hasKey(e ?? undefined, key))
  return false
}

/** True when the element has visible children (text or elements), which usually give it a name. */
export function hasChildren(el: JSXOpeningElement): boolean {
  if (el.selfClosing) return false
  return el.parent.children.some((c) => {
    if (c.type === 'JSXText') return (c.value ?? '').trim() !== ''
    if (c.type === 'JSXExpressionContainer') return c.expression?.type !== 'JSXEmptyExpression'
    return true
  })
}

const NOIIR_SOURCE = /(^noiir$|\/frame\/|\/library\/|\.view(\.tsx?)?$)/

/**
 * Tracks which JSX names in this file are noiir components: anything imported from noiir (or its
 * frame / library / *.view files) and anything created with defineFrame().
 */
export function componentTracker(): { isNoiir: (name: string) => boolean; visitors: Rule.RuleListener } {
  const names = new Set(['Frame'])
  return {
    isNoiir: (name) => names.has(name),
    visitors: {
      ImportDeclaration(node) {
        const n = node as unknown as ImportDeclaration
        if (!NOIIR_SOURCE.test(n.source.value)) return
        for (const s of n.specifiers) if (/^[A-Z]/.test(s.local.name)) names.add(s.local.name)
      },
      VariableDeclarator(node) {
        const d = node as unknown as { id: { name?: string }; init?: { type: string; callee?: { name?: string } } }
        if (d.id.name && d.init?.type === 'CallExpression' && d.init.callee?.name === 'defineFrame') names.add(d.id.name)
      },
    },
  }
}

/** Merge several listener objects (same node type → both run). */
export function merge(...parts: Rule.RuleListener[]): Rule.RuleListener {
  const out: Record<string, ((node: never) => void)[]> = {}
  for (const p of parts) for (const [k, fn] of Object.entries(p)) if (fn) (out[k] ??= []).push(fn as (node: never) => void)
  return Object.fromEntries(Object.entries(out).map(([k, fns]) => [k, (node: never) => fns.forEach((f) => f(node))])) as Rule.RuleListener
}

export const INTERACTIVE_ATTRS = ['onClick', 'href', 'onPress'] as const
export const NAME_ATTRS = ['label', 'aria-label', 'labelledBy', 'aria-labelledby', 'title'] as const

export const normalizePath = (f: string): string => f.replace(/\\/g, '/')
