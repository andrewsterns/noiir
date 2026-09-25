import { PLACEHOLDER_DEFAULTS } from './placeholder.interface.ts'
import type { PlaceholderProps, PlaceholderViewModel } from './placeholder.interface.ts'

export function usePlaceholderViewModel({ kind = 'image', ratio, caption, ...props }: PlaceholderProps): PlaceholderViewModel {
  const d = PLACEHOLDER_DEFAULTS[kind]
  const r = ratio !== undefined ? String(ratio) : d.ratio
  const text = caption ?? (d.chip ? [kind.toUpperCase(), r?.replace('/', ':')].filter(Boolean).join(' ') : '')
  return {
    caption: text,
    frame: {
      role: 'img',
      label: props.label ?? `${kind} placeholder`,
      flow: 'stack',
      align: 'center',
      justify: 'center',
      w: 'fill',
      ...(r && { aspect: r }),
      ...(kind === 'block' && { minH: 96 }),
      ...(kind === 'icon' && { w: 24 }),
      border: 1,
      radius: 'md',
      ...(kind === 'avatar' && { w: 48, radius: 'full', clip: true }),
      fill: [{ pattern: d.pattern, color: 'line' }, 'surface'],
      ...props,
    },
  }
}
