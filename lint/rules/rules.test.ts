import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import tseslint from 'typescript-eslint'
import { rules } from '../index.ts'
import { onGrid } from './tokens.ts'

RuleTester.describe = describe
RuleTester.it = it
RuleTester.itOnly = it.only

const tester = new RuleTester({
  languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
})
const imp = "import { Frame, Button } from 'noiir'\n"
const rule = (name: string) => rules[name]!

tester.run('no-raw-elements', rule('no-raw-elements'), {
  valid: [{ code: imp + '<Frame as="section" />' }, { code: '<video />', filename: 'src/frame/frame.view.tsx' }],
  invalid: [{ code: '<div className="card" />', errors: [{ messageId: 'raw' }] }, { code: '<span>hi</span>', errors: 1 }],
})

tester.run('no-style-escape', rule('no-style-escape'), {
  valid: [{ code: imp + '<Frame fill="surface" />' }, { code: "import { Other } from 'lib'\n<Other style={{}} />" }],
  invalid: [
    { code: imp + '<Frame style={{ color: "red" }} className="x" />', errors: [{ messageId: 'style' }, { messageId: 'className' }] },
    { code: "import { defineFrame } from 'noiir'\nconst Chip = defineFrame({});\n<Chip style={{}} />", errors: [{ messageId: 'style' }] },
  ],
})

tester.run('no-unsafe', rule('no-unsafe'), {
  valid: [{ code: imp + '<Frame />' }],
  invalid: [{ code: imp + '<Frame unsafe={{ zoom: 2 }} />', errors: [{ messageId: 'unsafe' }] }],
})

tester.run('mvvm-roles', rule('mvvm-roles'), {
  valid: [
    { code: "import type { X } from './x'\nexport const KINDS = ['a', 'b'] as const\nexport interface P { f: () => void }", filename: 'src/a/card.interface.ts' },
    { code: "import { useCardViewModel } from './card.viewmodel.ts'\nexport function Card(p) { const vm = useCardViewModel(p); return null }", filename: 'src/a/card.view.tsx' },
    { code: "import { useState } from 'react'\nexport function useCardViewModel() { return useState(0) }", filename: 'src/a/card.viewmodel.ts' },
  ],
  invalid: [
    { code: 'export const f = () => 1', filename: 'src/a/card.interface.ts', errors: [{ messageId: 'interfaceLogic' }] },
    { code: 'export const keys = Object.keys({})', filename: 'src/a/card.interface.ts', errors: [{ messageId: 'interfaceLogic' }] },
    { code: "import { x } from './util.ts'", filename: 'src/a/card.interface.ts', errors: [{ messageId: 'interfaceImport' }] },
    { code: "import { Card } from './card.view.tsx'", filename: 'src/a/card.viewmodel.ts', errors: [{ messageId: 'viewmodelImportsView' }] },
    {
      code: "import { useState } from 'react'\nexport function Card() { const [a] = useState(0); return null }",
      filename: 'src/a/card.view.tsx',
      errors: [{ messageId: 'viewHook' }],
    },
    {
      code: "import { useOther } from './other.viewmodel.ts'\nexport function Card() { useOther(); return null }",
      filename: 'src/a/card.view.tsx',
      errors: [{ messageId: 'viewHook' }],
    },
  ],
})

tester.run('interactive-has-name', rule('interactive-has-name'), {
  valid: [
    { code: imp + '<Button>Save</Button>' },
    { code: imp + '<Button glyph="close" label="Close" />' },
    { code: imp + '<Frame onClick={f}>Open</Frame>' },
    { code: imp + '<Frame {...props} />' },
  ],
  invalid: [
    { code: imp + '<Button glyph="close" />', errors: [{ messageId: 'unnamed' }] },
    { code: imp + '<Frame onClick={f} />', errors: [{ messageId: 'unnamed' }] },
  ],
})

tester.run('image-has-label', rule('image-has-label'), {
  valid: [
    { code: imp + '<Frame fill={{ image: src }} label="Hero" />' },
    { code: imp + '<Frame fill={{ image: src }} aria-hidden="true" />' },
    { code: imp + '<Frame fill={[{ image: src }, "bg"]}>caption</Frame>' },
    { code: imp + '<Frame as="img" src={s} alt="" />' },
  ],
  invalid: [
    { code: imp + '<Frame fill={{ image: src }} />', errors: [{ messageId: 'fill' }] },
    { code: imp + '<Frame fill={[{ pattern: "grid" }, { image: src }]} aspect="4/3" />', errors: [{ messageId: 'fill' }] },
    { code: imp + '<Frame as="img" src={s} />', errors: [{ messageId: 'img' }] },
  ],
})

tester.run('no-positive-tabindex', rule('no-positive-tabindex'), {
  valid: [{ code: imp + '<Frame tabIndex={0} />' }, { code: imp + '<Frame tabIndex={-1} />' }],
  invalid: [{ code: imp + '<Frame tabIndex={3} />', errors: [{ messageId: 'positive' }] }],
})

tester.run('interactive-feedback', rule('interactive-feedback'), {
  valid: [{ code: imp + '<Frame onClick={f} hover={{ glow: true }}>x</Frame>' }, { code: imp + '<Button onClick={f}>x</Button>' }],
  invalid: [{ code: imp + '<Frame onClick={f}>x</Frame>', errors: [{ messageId: 'flat' }] }],
})

tester.run('touch-target', rule('touch-target'), {
  valid: [{ code: imp + '<Frame onClick={f} h={44}>x</Frame>' }, { code: imp + '<Frame h={8} />' }],
  invalid: [{ code: imp + '<Frame onClick={f} h={16}>x</Frame>', errors: [{ messageId: 'small' }] }],
})

tester.run('on-scale', rule('on-scale'), {
  valid: [{ code: imp + '<Frame gap={8} padding={{ x: 16, y: 6 }} margin={-1} />' }],
  invalid: [
    { code: imp + '<Frame gap={7} />', errors: [{ messageId: 'off', data: { prop: 'gap', value: '7', down: '4', up: '8' } }] },
    { code: imp + '<Frame padding={{ x: 18 }} />', errors: [{ messageId: 'off' }] },
  ],
})

tester.run('contrast', rule('contrast'), {
  valid: [{ code: imp + '<Frame fill="phosphor" color="on-phosphor" />' }, { code: imp + '<Frame fill="surface" color="dim" />' }],
  invalid: [{ code: imp + '<Frame fill="phosphor" color="dim" />', errors: [{ messageId: 'low' }] }],
})

describe('onGrid', () => {
  it('allows 4px multiples, small even steps and hairlines', () => {
    for (const v of [0, 1, 2, 4, 6, 8, 10, 12, 16, 24, -4]) if (!onGrid(v)) throw new Error(`${v} should pass`)
    for (const v of [3, 5, 7, 14, 18]) if (onGrid(v)) throw new Error(`${v} should fail`)
  })
})
