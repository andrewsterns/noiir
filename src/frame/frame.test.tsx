import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { Frame } from './frame.view.tsx'
import { defineFrame } from './define.tsx'
import { emit } from '../actions/bus.ts'
import { insertedRules } from '../engine/sheet.ts'

type FakeIO = { instances: { trigger: (v: boolean) => void }[] }
const IO = () => (globalThis as unknown as { FakeIntersectionObserver: FakeIO }).FakeIntersectionObserver

describe('Frame', () => {
  it('renders a div with atomic classes and children', () => {
    render(<Frame flow="row" gap={8}>hello</Frame>)
    const el = screen.getByText('hello')
    expect(el.tagName).toBe('DIV')
    expect(el.className.split(' ')[0]).toBe('n')
    expect(el.className.split(' ').length).toBeGreaterThan(1)
  })

  it('becomes a type=button when clickable, and runs its actions in order', () => {
    const calls: string[] = []
    const onEmit = vi.fn()
    render(
      <>
        <Frame onTrigger={{ ping: () => onEmit() }} />
        <Frame onClick={[() => calls.push('a'), { emit: 'ping' }, () => calls.push('b')]}>go</Frame>
      </>,
    )
    const btn = screen.getByRole('button', { name: 'go' })
    expect(btn).toHaveProperty('type', 'button')
    fireEvent.click(btn)
    expect(calls).toEqual(['a', 'b'])
    expect(onEmit).toHaveBeenCalledOnce()
  })

  it('becomes a link with href', () => {
    render(<Frame href="/docs">docs</Frame>)
    expect(screen.getByRole('link', { name: 'docs' }).getAttribute('href')).toBe('/docs')
  })

  it('gives a labelled image fill role=img', () => {
    render(<Frame fill={{ image: '/hero.png' }} label="Hero shot" aspect="16/9" />)
    const img = screen.getByRole('img', { name: 'Hero shot' })
    expect(img.getAttribute('style')).toContain('--n-fill-img0: url("/hero.png")')
  })

  it('makes custom clickable elements keyboard-operable and blocks them when disabled', () => {
    const onClick = vi.fn()
    const { rerender } = render(<Frame as="li" onClick={onClick}>row</Frame>)
    const li = screen.getByText('row')
    expect(li.tabIndex).toBe(0)
    fireEvent.keyDown(li, { key: 'Enter' })
    expect(onClick).toHaveBeenCalledOnce()
    rerender(<Frame as="li" onClick={onClick} disabled>row</Frame>)
    expect(li.getAttribute('aria-disabled')).toBe('true')
    fireEvent.click(li)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('maps key combos and prevents their default', () => {
    const onEsc = vi.fn()
    render(<Frame focusable onKey={{ Escape: onEsc }}>panel</Frame>)
    const ev = fireEvent.keyDown(screen.getByText('panel'), { key: 'Escape' })
    expect(onEsc).toHaveBeenCalledOnce()
    expect(ev).toBe(false) // default prevented
  })

  it('reacts to global hotkeys but not while typing without a modifier', () => {
    const onK = vi.fn()
    render(
      <>
        <Frame onHotkey={{ k: onK, 'ctrl+k': onK }} />
        <Frame as="input" aria-label="field" />
      </>,
    )
    fireEvent.keyDown(screen.getByLabelText('field'), { key: 'k' })
    expect(onK).not.toHaveBeenCalled()
    fireEvent.keyDown(screen.getByLabelText('field'), { key: 'k', ctrlKey: true })
    expect(onK).toHaveBeenCalledOnce()
  })

  it('fires onTrigger listeners with the payload', () => {
    const got = vi.fn()
    render(<Frame onTrigger={{ 'cart:added': got }} />)
    act(() => emit('cart:added', { id: 7 }))
    expect(got).toHaveBeenCalledWith({ id: 7 })
  })

  it('reveals when scrolled into view', () => {
    render(<Frame reveal="fade-up">card</Frame>)
    const el = screen.getByText('card')
    expect(el.hasAttribute('data-inview')).toBe(false)
    act(() => IO().instances.at(-1)!.trigger(true))
    expect(el.hasAttribute('data-inview')).toBe(true)
  })

  it('runs the exit motion before unmounting when show turns false', async () => {
    const { rerender } = render(<Frame show exit="fade">toast</Frame>)
    expect(screen.getByText('toast')).toBeTruthy()
    rerender(<Frame show={false} exit="fade">toast</Frame>)
    expect(screen.getByText('toast')).toBeTruthy() // still animating out
    await act(async () => {})
    expect(screen.queryByText('toast')).toBeNull()
    rerender(<Frame show exit="fade">toast</Frame>)
    expect(screen.getByText('toast')).toBeTruthy()
  })

  it('hides visually but keeps content for screen readers', () => {
    render(<Frame hidden="visually">skip to content</Frame>)
    expect(screen.getByText('skip to content').className.split(' ')).toContain('n-sr')
  })

  it('sets role-appropriate state attributes', () => {
    render(<Frame role="tab" selected onClick={() => {}}>Overview</Frame>)
    const tab = screen.getByRole('tab')
    expect(tab.getAttribute('aria-selected')).toBe('true')
    expect(tab.hasAttribute('data-selected')).toBe(true)
  })

  it('scopes a theme tint through inline variables', () => {
    render(<Frame theme="amber">amber</Frame>)
    expect(screen.getByText('amber').getAttribute('style')).toContain('--n-c-phosphor: #ceb06c')
  })

  it('chains a native pass-through handler with its own', () => {
    const native = vi.fn()
    const own = vi.fn()
    render(<Frame onPointerDown={native} onPress={own}>p</Frame>)
    fireEvent.pointerDown(screen.getByText('p'))
    expect(native).toHaveBeenCalledOnce()
    expect(own).toHaveBeenCalledOnce()
  })
})

describe('defineFrame', () => {
  const Chip = defineFrame({
    base: { flow: 'row', padding: 4, hover: { glow: true } },
    variants: { tone: { plain: { fill: 'surface' }, hot: { fill: 'phosphor', color: 'on-phosphor' } } },
    defaults: { tone: 'plain' },
    name: 'Chip',
  })

  it('layers base, variant, then call-site props', () => {
    render(
      <>
        <Chip>a</Chip>
        <Chip tone="hot" padding={8} hover={{ y: -2 }}>b</Chip>
      </>,
    )
    const a = screen.getByText('a').className
    const b = screen.getByText('b').className
    expect(a).not.toBe(b)
    const all = insertedRules().join('\n')
    expect(all).toContain('background-color:var(--n-c-phosphor)')
    expect(all).toContain('padding:8px')
    // hover merges: glow from base and y from the call site both apply
    expect(all).toMatch(/:hover:not[^{]*\{translate:var\(--n-x, 0px\) -2px\}/)
    expect(all).toMatch(/:hover:not[^{]*\{box-shadow:var\(--n-glow-box\)\}/)
  })
})
