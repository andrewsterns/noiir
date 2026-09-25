// The few JSX / TS AST shapes the rules touch. Typed here so the plugin has no runtime dependencies.
import type { Rule } from 'eslint'

export interface Node {
  type: string
  parent?: Node
}
export interface Identifier extends Node {
  type: 'Identifier' | 'JSXIdentifier'
  name: string
}
export interface Literal extends Node {
  type: 'Literal'
  value: unknown
}
export interface ExpressionContainer extends Node {
  type: 'JSXExpressionContainer'
  expression: Node
}
export interface JSXAttribute extends Node {
  type: 'JSXAttribute'
  name: { type: string; name: string | { name: string }; namespace?: { name: string } }
  value: Literal | ExpressionContainer | null
}
export interface JSXOpeningElement extends Node {
  type: 'JSXOpeningElement'
  name: Node & { name?: string; object?: Node & { name?: string }; property?: { name: string }; namespace?: { name: string } }
  attributes: (JSXAttribute | (Node & { type: 'JSXSpreadAttribute' }))[]
  selfClosing: boolean
  parent: Node & { children: (Node & { value?: string; expression?: Node })[] }
}
export interface ObjectExpression extends Node {
  type: 'ObjectExpression'
  properties: (Node & { key?: Node & { name?: string; value?: unknown }; value?: Node })[]
}
export interface ArrayExpression extends Node {
  type: 'ArrayExpression'
  elements: (Node | null)[]
}
export interface ImportDeclaration extends Node {
  type: 'ImportDeclaration'
  source: { value: string }
  importKind?: 'type' | 'value'
  specifiers: (Node & { local: { name: string }; importKind?: 'type' | 'value' })[]
}
export interface CallExpression extends Node {
  type: 'CallExpression'
  callee: Node & { name?: string; property?: { name?: string } }
}

/** The ESTree node types ESLint's API expects; our JSX nodes are cast through this. */
export type AnyNode = Rule.Node

export const asNode = (n: Node): AnyNode => n as unknown as AnyNode
