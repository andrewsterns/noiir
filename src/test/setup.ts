import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom lacks these browser APIs. Minimal stand-ins: tests that care replace them.

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = []
  callback: IntersectionObserverCallback
  targets: Element[] = []
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb
    FakeIntersectionObserver.instances.push(this)
  }
  observe(el: Element) {
    this.targets.push(el)
  }
  unobserve() {}
  disconnect() {
    this.targets = []
  }
  takeRecords() {
    return []
  }
  /** Test helper: pretend every observed element entered (or left) the viewport. */
  trigger(isIntersecting: boolean) {
    this.callback(
      this.targets.map((target) => ({ target, isIntersecting }) as IntersectionObserverEntry),
      this as unknown as IntersectionObserver,
    )
  }
}
;(globalThis as Record<string, unknown>).IntersectionObserver = FakeIntersectionObserver
;(globalThis as Record<string, unknown>).FakeIntersectionObserver = FakeIntersectionObserver

if (!Element.prototype.animate) {
  Element.prototype.animate = vi.fn(function () {
    const anim = { onfinish: null as null | (() => void), cancel: vi.fn(), finished: Promise.resolve() }
    queueMicrotask(() => anim.onfinish?.())
    return anim as unknown as Animation
  })
}

if (!Element.prototype.setPointerCapture) Element.prototype.setPointerCapture = () => {}

afterEach(() => cleanup())
