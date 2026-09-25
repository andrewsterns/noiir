import type { ESLint, Linter, Rule } from 'eslint'
import noRawElements from './rules/no-raw-elements.ts'
import noStyleEscape from './rules/no-style-escape.ts'
import noUnsafe from './rules/no-unsafe.ts'
import mvvmRoles from './rules/mvvm-roles.ts'
import { imageHasLabel, interactiveFeedback, interactiveHasName, noPositiveTabindex, touchTarget } from './rules/a11y.ts'
import { contrast, onScale } from './rules/tokens.ts'

export const rules: Record<string, Rule.RuleModule> = {
  'no-raw-elements': noRawElements,
  'no-style-escape': noStyleEscape,
  'no-unsafe': noUnsafe,
  'mvvm-roles': mvvmRoles,
  'interactive-has-name': interactiveHasName,
  'image-has-label': imageHasLabel,
  'no-positive-tabindex': noPositiveTabindex,
  'interactive-feedback': interactiveFeedback,
  'touch-target': touchTarget,
  'on-scale': onScale,
  contrast,
}

const recommendedRules: Linter.RulesRecord = {
  'noiir/no-raw-elements': 'error',
  'noiir/no-style-escape': 'error',
  'noiir/no-unsafe': 'warn',
  'noiir/mvvm-roles': 'error',
  'noiir/interactive-has-name': 'error',
  'noiir/image-has-label': 'error',
  'noiir/no-positive-tabindex': 'error',
  'noiir/contrast': 'error',
  'noiir/interactive-feedback': 'warn',
  'noiir/touch-target': 'warn',
  'noiir/on-scale': 'warn',
}

const plugin: ESLint.Plugin & { configs: Record<string, Linter.Config> } = {
  meta: { name: 'eslint-plugin-noiir', version: '0.1.0' },
  rules,
  configs: {},
}

/** Flat config: `export default [noiir.configs.recommended]` (pair it with a TSX parser). */
plugin.configs.recommended = { plugins: { noiir: plugin }, rules: recommendedRules }

export default plugin
