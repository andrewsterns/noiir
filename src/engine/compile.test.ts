import { beforeEach, describe, expect, it } from 'vitest'
import { compile, clearCompileCache } from './compile.ts'
import { insertedRules, resetSheet, cssText } from './sheet.ts'

const rules = () => insertedRules().join('\n')

beforeEach(() => {
  resetSheet()
  clearCompileCache()
})

describe('compile', () => {
  it('turns each declaration into one atomic class in the base layer', () => {
    const { className } = compile({ base: { flow: 'row', gap: 8 } })
    expect(className.split(' ')).toHaveLength(4) // n + display + flex-direction + gap
    expect(rules()).toContain('@layer noiir.base{')
    expect(rules()).toMatch(/\{display:flex\}/)
    expect(rules()).toMatch(/\{gap:8px\}/)
  })

  it('shares classes between frames and inserts each rule once', () => {
    const a = compile({ base: { padding: 16, fill: 'surface' } })
    const count = insertedRules().length
    clearCompileCache()
    const b = compile({ base: { fill: 'surface', padding: 16 } })
    expect(new Set(b.className.split(' '))).toEqual(new Set(a.className.split(' ')))
    expect(insertedRules()).toHaveLength(count)
  })

  it('resolves color tokens to theme variables, including inside gradients', () => {
    compile({ base: { fill: { linear: '90deg, phosphor, accent 80%, #fff' }, color: 'dim' } })
    expect(rules()).toContain('linear-gradient(90deg, var(--n-c-phosphor), var(--n-c-accent) 80%, #fff)')
    expect(rules()).toContain('color:var(--n-c-dim)')
  })

  it('compiles hover to a real :hover rule behind (hover: hover), skipping disabled', () => {
    compile({ base: { fill: 'surface' }, hover: { fill: 'raised' } })
    expect(rules()).toMatch(/@layer noiir\.hover\{@media \(hover: hover\)\{\.n\w+:hover:not\(:disabled,\[aria-disabled="true"\]\)\{background-image:none\}/)
    expect(rules()).toContain('background-color:var(--n-c-raised)')
  })

  it('puts breakpoints in their own ordered layers', () => {
    compile({ base: { w: 'fill' }, at: { md: { w: 280 }, lg: { w: 360 } } })
    expect(rules()).toContain('@layer noiir.md{@media (min-width: 768px){')
    expect(rules()).toContain('@layer noiir.lg{@media (min-width: 1024px){')
    expect(cssText().indexOf('noiir.md')).toBeLessThan(cssText().indexOf('noiir.lg'))
  })

  it('routes image URLs through inline vars so different images share one class', () => {
    const a = compile({ base: { fill: { image: '/a.png' } } })
    const b = compile({ base: { fill: { image: '/b.png' } } })
    expect(a.className).toBe(b.className)
    expect(a.vars).toEqual({ '--n-fill-img0': 'url("/a.png")' })
    expect(rules()).not.toContain('/a.png')
  })

  it('composes a hover y with the base x through the translate var', () => {
    const { vars } = compile({ base: { x: 10 }, hover: { y: -4 } })
    expect(vars).toEqual({ '--n-x': '10px' })
    expect(rules()).toContain('translate:var(--n-x, 0px) -4px')
  })

  it('wraps motion in prefers-reduced-motion: no-preference', () => {
    compile({ base: {}, motion: { enter: 'fade-up' } })
    expect(rules()).toContain('@media (prefers-reduced-motion: no-preference){')
    expect(rules()).toMatch(/animation:n-fade-up 240ms/)
  })

  it('pauses reveal animations until [data-inview]', () => {
    compile({ base: {}, motion: { reveal: 'fade' } })
    expect(rules()).toContain('animation-play-state:paused')
    expect(rules()).toMatch(/\[data-inview\]\{animation-play-state:running\}/)
  })

  it('adds a default transition when a frame has state styles', () => {
    compile({ base: {}, hover: { glow: true }, motion: { hasStates: true } })
    expect(rules()).toContain('transition-duration:var(--n-m-fast)')
  })

  it('draws gradient borders as a masked ::before ring and positions the host', () => {
    compile({ base: { border: { paint: { linear: '135deg, phosphor, transparent' } } } })
    expect(rules()).toMatch(/::before\{mask:linear-gradient\(#000 0 0\) content-box exclude/)
    expect(rules()).toContain('{position:relative}')
  })

  it('keeps an explicit position when a ring or overlay needs one', () => {
    compile({ base: { position: 'absolute', scanlines: true } })
    expect(rules()).toContain('{position:absolute}')
    expect(rules()).not.toContain('{position:relative}')
  })

  it('compiles semantic states to data-attribute selectors in cascade order', () => {
    compile({ base: {}, states: { selected: { fill: 'phosphor' }, disabled: { opacity: 0.3 } } })
    expect(rules()).toMatch(/@layer noiir\.selected\{\.n\w+\[data-selected\]/)
    expect(rules()).toMatch(/@layer noiir\.disabled\{\.n\w+:is\(:disabled,\[aria-disabled="true"\]\)\{opacity:0.3\}/)
  })

  it('declares the layer order once in the global sheet', () => {
    expect(cssText().startsWith('@layer noiir.reset,noiir.base,noiir.sm')).toBe(true)
  })
})
