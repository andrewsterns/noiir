import type { ButtonProps, ButtonViewModel } from './button.interface.ts'

export function useButtonViewModel({ kind = 'secondary', size = 'md', glyph, trailing, ...props }: ButtonProps): ButtonViewModel {
  return {
    frame: { as: props.href !== undefined ? 'a' : 'button', ...props, kind, size },
    leading: props.loading ? 'spinner' : (glyph ?? null),
    trailing: trailing ?? null,
  }
}
