import { describe, expect, it } from 'vitest'
import { FILL_TEXT_PAIRS, PALETTES, TEXT_ON, TEXT_TOKENS, TINTS, contrast } from './palettes.ts'
import { createTheme, themeVars } from './createTheme.ts'
import { globalCss } from './global.ts'

describe.each(TINTS)('%s palette', (tint) => {
  const p = PALETTES[tint]
  it.each(TEXT_ON.flatMap((bg) => TEXT_TOKENS.map((fg) => [fg, bg] as const)))('%s text on %s meets 4.5:1', (fg, bg) => {
    expect(contrast(p[fg], p[bg])).toBeGreaterThanOrEqual(4.5)
  })
  it.each(FILL_TEXT_PAIRS)('on-phosphor text on a %s fill meets 4.5:1', (fill, fg) => {
    expect(contrast(p[fg], p[fill])).toBeGreaterThanOrEqual(4.5)
  })
  it.each(TEXT_ON)('box lines on %s meet 3:1 (non-text contrast)', (bg) => {
    expect(contrast(p.line, p[bg])).toBeGreaterThanOrEqual(3)
  })
})

describe('createTheme', () => {
  it('builds a tint and lets tokens be overridden', () => {
    const t = createTheme({ tint: 'amber', color: { danger: '#ff0000' }, motion: { fast: 90 } })
    expect(t.color.phosphor).toBe('#ceb06c')
    expect(t.color.danger).toBe('#ff0000')
    const v = themeVars(t)
    expect(v['--n-m-fast']).toBe('90ms')
    expect(v['--n-glow-text']).toContain('#ceb06c')
    expect(v['--n-r-md']).toBe('8px')
    expect(v['--n-t-title-family']).toBe('var(--n-font-heading)')
    expect(v['--n-t-body-tracking']).toBe('-0.07em')
  })

  it('ships keyframes for every motion token', () => {
    const css = globalCss()
    for (const name of ['fade', 'fade-up', 'boot', 'type-on', 'shake', 'loop-blink', 'loop-flicker', 'loop-spin']) {
      expect(css).toContain(`@keyframes n-${name}{`)
    }
    expect(css).toMatch(/@keyframes n-boot\{0%\{opacity:0;transform:scale\(\.6, \.004\);filter:brightness\(4\)\}45%/)
  })
})
