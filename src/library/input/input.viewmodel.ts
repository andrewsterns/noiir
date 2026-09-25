import { useId } from 'react'
import type * as React from 'react'
import { FIELD_BOX, FIELD_INPUT } from '../recipes.ts'
import type { FrameProps } from '../../frame/frame.interface.ts'
import type { FieldProps, FieldViewModel, InputProps } from './input.interface.ts'

/** Shared by Input, Textarea and Select: ids, labelling, error wiring and click-to-focus on the box. */
export function useFieldViewModel(
  { label, hideLabel = false, hint, error, value, defaultValue, onValueChange, name, required = false, disabled, readOnly, placeholder, autoComplete, ...wrapper }: FieldProps,
  field: FrameProps,
  prompt = false,
): FieldViewModel {
  const base = useId()
  const ids = { field: `${base}f`, hint: `${base}h`, error: `${base}e` }
  const errorText = typeof error === 'string' ? error : null
  const invalid = !!error
  const describedBy = [hint && ids.hint, errorText && ids.error].filter(Boolean).join(' ') || undefined

  // Clicking the box (the prompt, the padding) focuses the field without stealing focus first.
  const focusField = (e: React.PointerEvent<HTMLElement>) => {
    const el = document.getElementById(ids.field)
    if (!el || e.target === el) return
    e.preventDefault()
    el.focus()
  }

  return {
    ids,
    label,
    hideLabel,
    required,
    hint,
    errorText,
    prompt,
    wrapper: { flow: 'column', gap: 6, w: 'fill', ...wrapper },
    box: { ...FIELD_BOX, error: invalid, cursor: 'text', ...(disabled && { opacity: 0.45 }), onPress: focusField },
    field: {
      ...FIELD_INPUT,
      id: ids.field,
      name,
      value,
      defaultValue,
      placeholder,
      autoComplete,
      required,
      readOnly,
      disabled,
      error: invalid,
      describedBy,
      ...(disabled && { opacity: 1 }),
      ...(onValueChange && {
        onChange: (e: React.FormEvent<HTMLElement>) => onValueChange((e.currentTarget as HTMLInputElement).value),
      }),
      ...field,
    },
  }
}

export function useInputViewModel({ type = 'text', prompt = true, ...props }: InputProps): FieldViewModel {
  return useFieldViewModel(props, { as: 'input', type }, prompt)
}
