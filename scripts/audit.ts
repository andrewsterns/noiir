// npm run audit [-- <paths…>]   noiir UX lint on any path (even ones the repo's lint config ignores)
import { ESLint } from 'eslint'
import tseslint from 'typescript-eslint'
import noiir from '../lint/index.ts'

const targets = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    { ignores: ['**/node_modules/**', '**/dist/**'] },
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
      ...noiir.configs.recommended,
    },
  ],
})

const results = await eslint.lintFiles(targets.length ? targets : ['src', 'playground'])
const formatter = await eslint.loadFormatter('stylish')
const out = await formatter.format(results)
const errors = results.reduce((n, r) => n + r.errorCount, 0)
const warnings = results.reduce((n, r) => n + r.warningCount, 0)

console.log(out || '\nnoiir lint: no findings.')
console.log(`noiir audit: ${errors} errors, ${warnings} warnings across ${results.length} files.

Lint can't see these. Check them by reading the code (and in the running UI):
  [ ] every data view has loading, empty and error states; disabled controls say why
  [ ] Tab order follows the visual order; Escape closes overlays; focus returns to the trigger
  [ ] one <main>, a labelled <nav>, headings in outline order, visible field labels
  [ ] primary touch targets ≥ 44px; the layout works at 360px with no horizontal scroll
  [ ] motion is short and explanatory; nothing essential waits on an animation
  [ ] buttons are verbs, errors say how to fix, empty states say what to do next
`)
process.exitCode = errors ? 1 : 0
