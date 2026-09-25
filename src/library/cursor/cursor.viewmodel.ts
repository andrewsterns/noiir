import type { CursorProps, CursorViewModel } from './cursor.interface.ts'

export const useCursorViewModel = (props: CursorProps): CursorViewModel => ({
  frame: { as: 'span', 'aria-hidden': 'true', loop: 'blink', color: 'phosphor', glow: 'text', select: 'none', ...props, children: '█' },
})
