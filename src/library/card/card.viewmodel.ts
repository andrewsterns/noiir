import { useId } from 'react'
import type { CardProps, CardViewModel } from './card.interface.ts'

export function useCardViewModel({ title, subtitle, media, actions, ...props }: CardProps): CardViewModel {
  const titleId = useId()
  const interactive = props.onClick !== undefined || props.href !== undefined
  return {
    titleId,
    title,
    subtitle,
    media,
    actions,
    frame: {
      as: props.href !== undefined ? 'a' : 'article',
      ...(title !== undefined && { labelledBy: titleId }),
      flow: 'column',
      gap: 12,
      padding: 16,
      border: 1,
      radius: 'lg',
      fill: 'surface',
      textAlign: 'start',
      ...(interactive && {
        hover: { border: 'phosphor', glow: 'box', y: -2 },
        press: { scale: 0.99 },
      }),
      ...props,
    },
  }
}
