import type { GridProps, LayoutViewModel, RowProps, SpacerProps, StackProps } from './layout.interface.ts'

export const useStackViewModel = (props: StackProps): LayoutViewModel => ({ frame: { flow: 'column', gap: 12, ...props } })

export const useRowViewModel = (props: RowProps): LayoutViewModel => ({ frame: { flow: 'row', gap: 8, align: 'center', ...props } })

export function useGridViewModel({ min, ...props }: GridProps): LayoutViewModel {
  const cols = props.cols ?? (min !== undefined ? `repeat(auto-fill, minmax(min(100%, ${min}px), 1fr))` : 2)
  return { frame: { flow: 'grid', gap: 16, ...props, cols } }
}

export function useSpacerViewModel({ space, ...props }: SpacerProps): LayoutViewModel {
  return {
    frame: {
      'aria-hidden': 'true',
      ...(space === undefined ? { grow: true } : { w: space, h: space, shrink: false }),
      ...props,
    },
  }
}
