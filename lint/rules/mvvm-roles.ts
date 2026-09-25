import type { Rule } from 'eslint'
import { asNode } from '../ast.ts'
import type { CallExpression, ImportDeclaration, Node } from '../ast.ts'
import { normalizePath } from '../util.ts'

/**
 * The four-file convention:
 *   x.interface.ts  types and literal data only
 *   x.viewmodel.ts  logic; never imports a view
 *   x.view.tsx      Frames only; the only hooks it calls come from ./x.viewmodel.ts
 *   x.md            docs
 */
const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: { description: 'Keep interface / viewmodel / view files to their roles.' },
    schema: [],
    messages: {
      interfaceLogic: '{{file}} is an interface file: types and literal data only. Move this {{what}} to the viewmodel.',
      interfaceImport: '{{file}} is an interface file: import types with `import type`, or values only from other *.interface.ts files.',
      viewmodelImportsView: 'A viewmodel must not depend on a view ({{source}}). Move shared logic into a viewmodel.',
      viewHook: '{{hook}}() in a view. Views call only their own viewmodel hook ({{vm}}); move state and effects there.',
    },
  },
  create(context) {
    const file = normalizePath(context.filename).split('/').pop() ?? ''

    if (file.endsWith('.interface.ts')) {
      const logic = (what: string) => (node: unknown) =>
        context.report({ node: node as Rule.Node, messageId: 'interfaceLogic', data: { file, what } })
      return {
        FunctionDeclaration: logic('function'),
        FunctionExpression: logic('function'),
        ArrowFunctionExpression: logic('function'),
        ClassDeclaration: logic('class'),
        CallExpression: logic('call'),
        NewExpression: logic('constructor call'),
        ImportDeclaration(node: unknown) {
          const n = node as ImportDeclaration
          if (n.importKind === 'type' || n.source.value.endsWith('.interface.ts')) return
          if (n.specifiers.length && n.specifiers.every((s) => s.importKind === 'type')) return
          context.report({ node: asNode(n), messageId: 'interfaceImport', data: { file } })
        },
      } as Rule.RuleListener
    }

    if (/\.viewmodel\.tsx?$/.test(file)) {
      return {
        ImportDeclaration(node: unknown) {
          const n = node as ImportDeclaration
          if (/\.view(\.tsx?)?$/.test(n.source.value)) context.report({ node: asNode(n), messageId: 'viewmodelImportsView', data: { source: n.source.value } })
        },
      } as Rule.RuleListener
    }

    if (file.endsWith('.view.tsx')) {
      const stem = file.slice(0, -'.view.tsx'.length)
      const vm = `${stem}.viewmodel.ts`
      const sources = new Map<string, string>()
      return {
        ImportDeclaration(node: unknown) {
          const n = node as ImportDeclaration
          for (const s of n.specifiers) sources.set(s.local.name, n.source.value)
        },
        CallExpression(node: unknown) {
          const c = node as CallExpression
          const name = c.callee.type === 'Identifier' ? c.callee.name : c.callee.type === 'MemberExpression' ? c.callee.property?.name : undefined
          if (!name || !(name === 'use' || /^use[A-Z]/.test(name))) return
          const source = c.callee.type === 'Identifier' ? sources.get(name) : undefined
          if (source && source.replace(/\.tsx?$/, '').endsWith(`/${stem}.viewmodel`)) return
          context.report({ node: asNode(c as Node), messageId: 'viewHook', data: { hook: name, vm } })
        },
      } as Rule.RuleListener
    }
    return {}
  },
}
export default rule
