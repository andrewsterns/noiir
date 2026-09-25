// One block per style skill: props in, CSS declarations out.
import { describe, expect, it } from 'vitest'
import type { Decls, Layer, ResolveContext } from '../engine/engine.interface.ts'
import { resolveLayout } from './layout/layout.resolve.ts'
import { resolveSize } from './size/size.resolve.ts'
import { resolveSpace } from './space/space.resolve.ts'
import { resolvePlace } from './place/place.resolve.ts'
import { resolvePaint } from './paint/paint.resolve.ts'
import { resolveEdge } from './edge/edge.resolve.ts'
import { resolveType } from './type/type.resolve.ts'
import { resolveEffect } from './effect/effect.resolve.ts'
import { resolveInteract, matchKey } from './interact/interact.resolve.ts'
import { resolveMotion } from './motion/motion.resolve.ts'
import { stateAttrs } from './state/state.resolve.ts'
import { accessAttrs, inferTag } from './access/access.resolve.ts'
import { resolveContainer } from './respond/respond.resolve.ts'

const ctx = (layer: Layer = 'base', base?: Record<string, unknown>): ResolveContext => ({
  layer,
  base,
  vars: {},
  varPrefix: layer === 'base' ? '--n-' : `--n-${layer}-`,
  needsPosition: false,
  video: null,
})
const run = (fn: (d: Decls) => void) => {
  const d: Decls = {}
  fn(d)
  return d
}

describe('layout', () => {
  it('maps flows, gaps and grids', () => {
    expect(run((d) => resolveLayout({ flow: 'column', gap: { x: 8, y: 4 }, align: 'center', justify: 'between' }, d))).toEqual({
      display: 'flex',
      'flex-direction': 'column',
      'row-gap': '4px',
      'column-gap': '8px',
      'align-items': 'center',
      'justify-content': 'space-between',
    })
    expect(run((d) => resolveLayout({ flow: 'grid', cols: 3, span: 'all' }, d))).toMatchObject({
      'grid-template-columns': 'repeat(3, minmax(0, 1fr))',
      'grid-column': '1 / -1',
    })
  })
  it('stacks children in one cell', () => {
    expect(run((d) => resolveLayout({ flow: 'stack' }, d))['>* grid-area']).toBe('1 / 1')
  })
  it('scroll contains overscroll', () => {
    expect(run((d) => resolveLayout({ scroll: 'y' }, d))).toMatchObject({ 'overflow-y': 'auto', 'overscroll-behavior': 'contain' })
  })
})

describe('size', () => {
  it('maps fill, hug, screen and aspect', () => {
    expect(run((d) => resolveSize({ w: 'fill', h: 'screen', maxW: 'hug', aspect: '4/3' }, d))).toEqual({
      width: '100%',
      height: '100dvh',
      'max-width': 'fit-content',
      'aspect-ratio': '4 / 3',
    })
  })
})

describe('space', () => {
  it('uses shorthand for one value and longhands for axes/sides', () => {
    expect(run((d) => resolveSpace({ padding: 16 }, d))).toEqual({ padding: '16px' })
    expect(run((d) => resolveSpace({ margin: { x: 8, top: 0 } }, d))).toEqual({ 'margin-top': '0', 'margin-right': '8px', 'margin-left': '8px' })
  })
})

describe('place', () => {
  it('maps position, inset and z', () => {
    expect(run((d) => resolvePlace({ position: 'absolute', inset: true, z: 10 }, d))).toEqual({ position: 'absolute', inset: '0', 'z-index': '10' })
  })
})

describe('paint', () => {
  it('uses background-color for a bottom solid and layers the rest', () => {
    const d = run((d) => resolvePaint({ fill: [{ pattern: 'scanlines' }, 'surface'] }, d, ctx()))
    expect(d['background-color']).toBe('var(--n-c-surface)')
    expect(d['background-image']).toContain('repeating-linear-gradient(to bottom, var(--n-c-faint) 0 1px')
  })
  it('draws the wireframe cross as two corner-to-corner diagonals', () => {
    const d = run((d) => resolvePaint({ fill: { pattern: 'cross' } }, d, ctx()))
    expect(d['background-image']).toMatch(/to top right.*to bottom right/)
    expect(d['background-repeat']).toBe('no-repeat, no-repeat')
  })
  it('mixes solid opacity with color-mix', () => {
    expect(run((d) => resolvePaint({ fill: { color: 'phosphor', opacity: 0.2 } }, d, ctx()))['background-color']).toBe(
      'color-mix(in srgb, var(--n-c-phosphor) 20%, transparent)',
    )
  })
  it('hands video fills to the view', () => {
    const c = ctx()
    resolvePaint({ fill: { video: '/bg.mp4' } }, {}, c)
    expect(c.video).toEqual({ src: '/bg.mp4' })
  })
})

describe('edge', () => {
  it('defaults a numeric border to the line color', () => {
    expect(run((d) => resolveEdge({ border: 1, radius: 'full' }, d, ctx()))).toEqual({
      'border-width': '1px',
      'border-color': 'var(--n-c-line)',
      'border-radius': '9999px',
    })
  })
  it('only recolors in state layers', () => {
    expect(run((d) => resolveEdge({ border: 'phosphor' }, d, ctx('hover')))).toEqual({ 'border-color': 'var(--n-c-phosphor)' })
  })
  it('draws single sides', () => {
    expect(run((d) => resolveEdge({ border: { sides: ['bottom'] } }, d, ctx()))['border-width']).toBe('0 0 1px 0')
  })
  it('resolves radius tokens', () => {
    expect(run((d) => resolveEdge({ radius: 'md' }, d, ctx()))['border-radius']).toBe('var(--n-r-md)')
    expect(run((d) => resolveEdge({ radius: { tl: 'lg', br: 4 } }, d, ctx()))).toEqual({ 'border-top-left-radius': 'var(--n-r-lg)', 'border-bottom-right-radius': '4px' })
  })
  it('cuts chamfered corners', () => {
    expect(run((d) => resolveEdge({ shape: 'chamfer' }, d, ctx()))['clip-path']).toMatch(/^polygon\(8px 0/)
  })
})

describe('type', () => {
  it('maps a font token to theme variables', () => {
    expect(run((d) => resolveType({ font: 'label' }, d, ctx()))).toMatchObject({
      'font-size': 'var(--n-t-label-size)',
      'text-transform': 'var(--n-t-label-case)',
    })
  })
  it('paints gradient text by clipping the background to the letters', () => {
    expect(run((d) => resolveType({ color: { linear: '90deg, phosphor, accent' } }, d, ctx()))).toMatchObject({
      'background-clip': 'text',
      color: 'transparent',
    })
  })
  it('clamps and truncates', () => {
    expect(run((d) => resolveType({ clamp: 2 }, d, ctx()))).toMatchObject({ display: '-webkit-box', '-webkit-line-clamp': '2' })
    expect(run((d) => resolveType({ truncate: true }, d, ctx()))).toMatchObject({ 'text-overflow': 'ellipsis', 'white-space': 'nowrap' })
  })
})

describe('effect', () => {
  it('combines shadow and glow into one box-shadow', () => {
    expect(run((d) => resolveEffect({ shadow: 'md', glow: true }, d, ctx()))).toMatchObject({
      'box-shadow': 'var(--n-shadow-md), var(--n-glow-box)',
      'text-shadow': 'var(--n-glow-text)',
    })
  })
  it("leaves inherited text glow alone for glow: 'box'", () => {
    expect(run((d) => resolveEffect({ glow: 'box' }, d, ctx()))).not.toHaveProperty('text-shadow')
    expect(run((d) => resolveEffect({ glow: false }, d, ctx()))['text-shadow']).toBe('none')
  })
  it('keeps the base shadow when hover only adds glow', () => {
    expect(run((d) => resolveEffect({ glow: 'box' }, d, ctx('hover', { shadow: 'sm' })))['box-shadow']).toBe('var(--n-shadow-sm), var(--n-glow-box)')
  })
  it('draws scanlines in ::after', () => {
    const c = ctx()
    expect(run((d) => resolveEffect({ scanlines: true }, d, c))['::after background-image']).toContain('repeating-linear-gradient')
    expect(c.needsPosition).toBe(true)
  })
})

describe('interact', () => {
  it('maps cursor and selection', () => {
    expect(run((d) => resolveInteract({ cursor: 'grab', select: 'none' }, d))).toMatchObject({ cursor: 'grab', 'user-select': 'none' })
  })
  it('matches key combos', () => {
    const e = (key: string, mods: Partial<Record<'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey', boolean>> = {}) => ({
      key, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, ...mods,
    })
    expect(matchKey('Escape', e('Escape'))).toBe(true)
    expect(matchKey('esc', e('Escape'))).toBe(true)
    expect(matchKey('Space', e(' '))).toBe(true)
    expect(matchKey('shift+Tab', e('Tab'))).toBe(false)
    expect(matchKey('shift+Tab', e('Tab', { shiftKey: true }))).toBe(true)
    expect(matchKey('ctrl+k', e('k', { ctrlKey: true }))).toBe(true)
    expect(matchKey('?', e('?', { shiftKey: true }))).toBe(true)
  })
})

describe('motion', () => {
  it('lists enter and loop animations together', () => {
    const d = run((d) => resolveMotion({ enter: 'boot', loop: 'flicker' }, d))
    expect(d['@motion animation']).toBe('n-boot 480ms ease-out 0ms backwards, n-loop-flicker 4000ms linear infinite')
  })
  it('does nothing without motion or states', () => {
    expect(run((d) => resolveMotion({}, d))).toEqual({})
  })
})

describe('state', () => {
  it('sets data flags and role-appropriate aria', () => {
    expect(stateAttrs({ selected: true }, 'button', 'tab')).toMatchObject({ 'data-selected': '', 'aria-selected': 'true' })
    expect(stateAttrs({ selected: false }, 'button', undefined)).toMatchObject({ 'aria-pressed': 'false' })
    expect(stateAttrs({ disabled: true }, 'div', undefined)).toMatchObject({ 'aria-disabled': 'true' })
    expect(stateAttrs({ disabled: true }, 'button', undefined)).toMatchObject({ disabled: true })
    expect(stateAttrs({ error: true }, 'div', undefined)).not.toHaveProperty('aria-invalid')
    expect(stateAttrs({ error: true }, 'input', undefined)).toMatchObject({ 'aria-invalid': 'true' })
  })
})

describe('respond', () => {
  it('makes size containers', () => {
    expect(run((d) => resolveContainer('card', d))).toEqual({ 'container-type': 'inline-size', 'container-name': 'card' })
  })
})

describe('access', () => {
  it('infers the element', () => {
    expect(inferTag({})).toBe('div')
    expect(inferTag({ onClick: () => {} })).toBe('button')
    expect(inferTag({ href: '/x', onClick: () => {} })).toBe('a')
    expect(inferTag({ as: 'li', onClick: () => {} })).toBe('li')
  })
  it('gives labelled image fills role=img and buttons type=button', () => {
    expect(accessAttrs({ tag: 'div', label: 'Hero', fill: { image: '/a.png' }, hasChildren: false })).toMatchObject({ role: 'img', 'aria-label': 'Hero' })
    expect(accessAttrs({ tag: 'button', hasChildren: true })).toMatchObject({ type: 'button' })
  })
})
