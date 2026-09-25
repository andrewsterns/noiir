import tseslint from 'typescript-eslint'
import noiir from './lint/index.ts'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'playground/dist/**',
      '.claude/**',
      'skill/**',
      // The hand-written counter-example in the Frame-vs-CSS comparison. `npm run audit` targets it on purpose.
      'playground/compare/ProductCard.css.tsx',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    ...noiir.configs.recommended,
  },
  {
    // Tests exercise bare frames on purpose.
    files: ['**/*.test.{ts,tsx}'],
    rules: { 'noiir/interactive-feedback': 'off', 'noiir/interactive-has-name': 'off' },
  },
]
