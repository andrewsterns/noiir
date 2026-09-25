import { LAYERS } from '../engine/engine.interface.ts'
import { kebab } from '../engine/units.ts'
import { LOOPS, MOTIONS } from '../skills/motion/motion.interface.ts'
import type { MotionDef } from '../skills/motion/motion.interface.ts'
import { defaultTheme, themeVars } from './createTheme.ts'

const decls = (o: Record<string, string>) => Object.entries(o).map(([k, v]) => `${k}:${v}`).join(';')

function keyframes(name: string, def: MotionDef): string {
  const n = def.frames.length
  const steps = def.frames.map((f, i) => {
    const offset = f.offset ?? (i === 0 ? 0 : i === n - 1 ? 1 : i / (n - 1))
    const body = Object.entries(f)
      .filter(([k, v]) => k !== 'offset' && k !== 'easing' && k !== 'composite' && v != null)
      .map(([k, v]) => `${kebab(k)}:${String(v)}`)
      .join(';')
    return `${Math.round(Number(offset) * 1000) / 10}%{${body}}`
  })
  return `@keyframes ${name}{${steps.join('')}}`
}

/**
 * The one global stylesheet: layer order, the default theme on :root, the reset every Frame gets
 * (class `n`), accessible defaults (focus ring, disabled, hidden) and the motion keyframes.
 */
export function globalCss(): string {
  const reset = [
    `:root{${decls(themeVars(defaultTheme))}}`,
    '.n{box-sizing:border-box;margin:0;padding:0;border:0 solid;min-width:0;font:inherit;color:inherit;background:none;text-align:inherit;letter-spacing:inherit;text-transform:inherit;text-decoration:none;list-style:none;appearance:none;-webkit-tap-highlight-color:transparent}',
    '.n::before,.n::after{box-sizing:border-box}',
    'button.n{text-align:center}',
    'button.n,a.n,[role=button].n,[role=tab].n,[role=option].n,[role=menuitem].n,[role=checkbox].n,[role=switch].n,[role=radio].n{cursor:pointer}',
    '.n:focus-visible{outline:1px solid var(--n-c-phosphor);outline-offset:2px}',
    '.n:is(:disabled,[aria-disabled="true"]){opacity:.45;cursor:not-allowed}',
    '.n[data-loading]{cursor:progress}',
    '.n[hidden]{display:none!important}',
    'table.n{border-collapse:collapse;border-spacing:0}',
    '[data-screen]{color-scheme:dark;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}',
    '.n-sr{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important;border:0!important}',
    '.n-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-1;pointer-events:none;border-radius:inherit}',
    '.n::selection,.n ::selection{background:var(--n-c-phosphor);color:var(--n-c-on-phosphor)}',
    'input.n::placeholder,textarea.n::placeholder{color:var(--n-c-dim);opacity:1}',
  ]
  const frames = [
    ...Object.entries(MOTIONS).map(([k, d]) => keyframes(`n-${k}`, d)),
    ...Object.entries(LOOPS).map(([k, d]) => keyframes(`n-loop-${k}`, d)),
  ]
  return [`@layer ${LAYERS.map((l) => `noiir.${l}`).join(',')};`, `@layer noiir.reset{${reset.join('')}}`, ...frames].join('\n')
}
