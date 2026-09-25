import { FONT_TAG } from './text.interface.ts'
import type { LinkProps, TextProps, TextViewModel } from './text.interface.ts'

export function useTextViewModel(props: TextProps): TextViewModel {
  const font = props.font ?? 'body'
  const as = props.as ?? (typeof font === 'string' ? FONT_TAG[font] : 'p')
  return { frame: { ...props, font, as } }
}

export function useLinkViewModel({ external, ...props }: LinkProps): TextViewModel {
  return {
    frame: {
      color: 'phosphor',
      decoration: 'underline',
      hover: { glow: 'text', color: 'accent' },
      ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
      ...props,
      as: 'a',
    },
  }
}
