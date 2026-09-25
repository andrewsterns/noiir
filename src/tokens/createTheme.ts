import { COLOR_TOKENS, PALETTES } from './palettes.ts'
import { FONT_TOKENS, RADIUS_TOKENS, SHADOW_TOKENS } from './tokens.interface.ts'
import type { FontToken, TextSpec, Theme, ThemeInput } from './tokens.interface.ts'

const HEADING = "'Charis SIL', Charter, 'Bitstream Charter', 'Sitka Text', Cambria, Georgia, serif"
const BODY = "'Space Mono', ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, Consolas, monospace"

// Headings and body text use −7% tracking (−0.07em). Small uppercase labels, captions and code stay
// near zero so they keep reading cleanly at 11–13px.
const TEXT: Record<FontToken, TextSpec> = {
  display: { family: 'heading', size: 40, leading: 1.05, weight: 700, tracking: -0.07, case: 'none' },
  title: { family: 'heading', size: 24, leading: 1.2, weight: 700, tracking: -0.07, case: 'none' },
  heading: { family: 'heading', size: 17, leading: 1.25, weight: 700, tracking: -0.07, case: 'none' },
  body: { family: 'body', size: 14, leading: 1.6, weight: 400, tracking: -0.07, case: 'none' },
  label: { family: 'body', size: 11, leading: 1.2, weight: 700, tracking: 0.04, case: 'uppercase' },
  caption: { family: 'body', size: 12, leading: 1.45, weight: 400, tracking: -0.02, case: 'none' },
  code: { family: 'mono', size: 13, leading: 1.5, weight: 400, tracking: 0, case: 'none' },
}

/**
 * Build a theme. Everything is optional: `createTheme({ tint: 'amber' })` gives the amber CRT.
 * Apply it with `<Screen theme={…}>` or any `<Frame theme={…}>`.
 */
export function createTheme(input: ThemeInput = {}): Theme {
  const tint = input.tint ?? 'green'
  const text = { ...TEXT }
  for (const t of FONT_TOKENS) text[t] = { ...TEXT[t], ...input.text?.[t] }
  return {
    tint,
    color: { ...PALETTES[tint], ...input.color },
    font: { heading: HEADING, body: BODY, mono: BODY, ...input.font },
    radius: { sm: 4, md: 8, lg: 12, xl: 16, ...input.radius },
    text,
    shadow: {
      sm: '0 1px 0 0 rgb(0 0 0 / .6)',
      md: '0 4px 14px rgb(0 0 0 / .55)',
      lg: '0 14px 40px rgb(0 0 0 / .65)',
      ...input.shadow,
    },
    motion: { fast: 120, base: 200, slow: 400, ease: 'cubic-bezier(.2,.8,.2,1)', ...input.motion },
  }
}

export const defaultTheme: Theme = createTheme()

const glow = (hex: string, blur: number, pct: number) => `0 0 ${blur}px color-mix(in srgb, ${hex} ${pct}%, transparent)`

/** The CSS custom properties a theme defines. Every token resolves to one of these. */
export function themeVars(theme: Theme): Record<string, string> {
  const v: Record<string, string> = {}
  for (const c of COLOR_TOKENS) v[`--n-c-${c}`] = theme.color[c]
  for (const f of ['heading', 'body', 'mono'] as const) v[`--n-font-${f}`] = theme.font[f]
  for (const r of RADIUS_TOKENS) v[`--n-r-${r}`] = `${theme.radius[r]}px`
  for (const t of FONT_TOKENS) {
    const s = theme.text[t]
    v[`--n-t-${t}-family`] = `var(--n-font-${s.family})`
    v[`--n-t-${t}-size`] = `${s.size}px`
    v[`--n-t-${t}-leading`] = String(s.leading)
    v[`--n-t-${t}-weight`] = String(s.weight)
    v[`--n-t-${t}-tracking`] = `${s.tracking}em`
    v[`--n-t-${t}-case`] = s.case
  }
  for (const s of SHADOW_TOKENS) v[`--n-shadow-${s}`] = theme.shadow[s]
  v['--n-m-fast'] = `${theme.motion.fast}ms`
  v['--n-m-base'] = `${theme.motion.base}ms`
  v['--n-m-slow'] = `${theme.motion.slow}ms`
  v['--n-ease'] = theme.motion.ease
  const p = theme.color.phosphor
  // Soft phosphor bloom: low alpha, wide blur.
  v['--n-glow-box'] = `${glow(p, 14, 18)}, inset ${glow(p, 8, 6)}`
  v['--n-glow-box-strong'] = `${glow(p, 20, 32)}, inset ${glow(p, 10, 12)}`
  v['--n-glow-text'] = glow(p, 6, 28)
  v['--n-glow-text-strong'] = `${glow(p, 4, 50)}, ${glow(p, 12, 30)}`
  return v
}
