import type { ColorToken, Tint } from './palettes.ts'

export type { ColorToken, Tint }

export const FONT_TOKENS = ['display', 'title', 'heading', 'body', 'label', 'caption', 'code'] as const
export type FontToken = (typeof FONT_TOKENS)[number]

export const RADIUS_TOKENS = ['sm', 'md', 'lg', 'xl'] as const
export type RadiusToken = (typeof RADIUS_TOKENS)[number]

/** Which family a text style uses: the serif heading face, the body face, or monospace. */
export type FontFamilyToken = 'heading' | 'body' | 'mono'

export const SHADOW_TOKENS = ['sm', 'md', 'lg'] as const
export type ShadowToken = (typeof SHADOW_TOKENS)[number]

/** Viewport and container breakpoints (min-width, px). Media queries can't read CSS variables, so these are fixed. */
export const BREAKPOINTS = { sm: 480, md: 768, lg: 1024, xl: 1280 } as const
export type Breakpoint = keyof typeof BREAKPOINTS

export interface TextSpec {
  family: FontFamilyToken
  size: number
  leading: number
  weight: number
  /** em */
  tracking: number
  case: 'none' | 'uppercase'
}

export interface Theme {
  tint: Tint
  color: Record<ColorToken, string>
  font: Record<FontFamilyToken, string>
  /** Corner radii in px. */
  radius: Record<RadiusToken, number>
  text: Record<FontToken, TextSpec>
  shadow: Record<ShadowToken, string>
  /** Durations in ms and the default easing. */
  motion: { fast: number; base: number; slow: number; ease: string }
}

export interface ThemeInput {
  tint?: Tint
  color?: Partial<Record<ColorToken, string>>
  font?: Partial<Theme['font']>
  text?: Partial<Record<FontToken, Partial<TextSpec>>>
  shadow?: Partial<Record<ShadowToken, string>>
  radius?: Partial<Record<RadiusToken, number>>
  motion?: Partial<Theme['motion']>
}
