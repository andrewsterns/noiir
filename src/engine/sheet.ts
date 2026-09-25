import { globalCss } from '../tokens/global.ts'

let el: HTMLStyleElement | null = null
const inserted = new Set<string>()
const rules: string[] = []

/** Create the single `<style data-noiir>` element with the global CSS. Safe to call repeatedly. */
export function ensureSheet(): void {
  if (el || typeof document === 'undefined') return
  el = document.querySelector<HTMLStyleElement>('style[data-noiir]')
  if (!el) {
    el = document.createElement('style')
    el.setAttribute('data-noiir', '')
    document.head.appendChild(el)
  }
  el.textContent = globalCss()
}

/** Insert one atomic rule, once per class name. */
export function insert(cls: string, rule: string): void {
  if (inserted.has(cls)) return
  inserted.add(cls)
  rules.push(rule)
  ensureSheet()
  const sheet = el?.sheet
  if (!sheet) return
  try {
    sheet.insertRule(rule, sheet.cssRules.length)
  } catch {
    // Syntax this browser (or jsdom) can't parse. The rule is still kept in `rules` for cssText().
  }
}

/** All CSS noiir has produced so far: the global sheet plus every atomic rule. Use it for SSR or snapshots. */
export const cssText = (): string => [globalCss(), ...rules].join('\n')

/** Number of atomic rules inserted (the benchmark reports this). */
export const ruleCount = (): number => rules.length

/** The atomic rules, in insertion order (tests). */
export const insertedRules = (): readonly string[] => rules

/** Forget everything (tests). */
export function resetSheet(): void {
  inserted.clear()
  rules.length = 0
  el?.remove()
  el = null
}
