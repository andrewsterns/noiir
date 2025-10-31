import React, { useState, useRef, useEffect } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Button } from '../../atoms/button/button';
import { List, ListItem } from '../list/list';
import { DROPDOWN_BUTTON_VARIANTS, DROPDOWN_VARIANT, DROPDOWN_SIZES } from './dropdown.variants';
import { LIST_SIZES, LIST_VARIANTS } from '../list/list.variants';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '../../atoms/button/button.variants';

/**
 * Dropdown Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use DROPDOWN_BUTTON_VARIANTS and LIST_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'primaryHover' }, click: { variant: 'primaryActive' } }}
 *
 * This component also uses Button and List components internally, so their props are also available
 * through buttonProps and listProps.
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see ButtonProps in src/components/atoms/button/button.tsx for Button props
 * @see ListProps in src/components/molecules/list/list.tsx for List props
 * @see DROPDOWN_BUTTON_VARIANTS in dropdown.variants.tsx for available animation states
 */

export interface DropdownProps extends Omit<FrameProps, 'onClick' | 'variant' | 'size' | 'onChange'> {
  items: ListItem[];
  selectedIndex?: number;
  selectedIndices?: number[];
  multiSelect?: boolean;
  placeholder?: string;
  onChange?: (selectedIndex: number, item: ListItem) => void;
  onMultiChange?: (selectedIndices: number[], items: ListItem[]) => void;
  disabled?: boolean;
  variant?: string | keyof typeof DROPDOWN_VARIANT;
  buttonSize?: '1' | '2' | '3' |'fill';
  buttonProps?: Partial<React.ComponentProps<typeof Button>>;
  listProps?: Partial<React.ComponentProps<typeof List>>;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({
  items,
  selectedIndex,
  selectedIndices = [],
  multiSelect = false,
  placeholder = "Select an option...",
  onChange,
  onMultiChange,
  disabled = false,
  variant = 'default',
  buttonSize = '2',
  buttonProps,
  listProps,
  ...frameProps
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<number | undefined>(selectedIndex);
  const [internalSelectedIndices, setInternalSelectedIndices] = useState<number[]>(selectedIndices);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use controlled props if provided, otherwise use internal state
  const currentSelectedIndex = selectedIndex !== undefined ? selectedIndex : internalSelectedIndex;
  const currentSelectedIndices = selectedIndices !== undefined ? selectedIndices : internalSelectedIndices;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleButtonClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (index: number, item: ListItem) => {
    if (multiSelect) {
      const newSelectedIndices = currentSelectedIndices.includes(index)
        ? currentSelectedIndices.filter(i => i !== index)
        : [...currentSelectedIndices, index];

      if (selectedIndices === undefined) {
        setInternalSelectedIndices(newSelectedIndices);
      }

      if (onMultiChange) {
        onMultiChange(newSelectedIndices, items.filter((_, i) => newSelectedIndices.includes(i)));
      }
    } else {
      if (selectedIndex === undefined) {
        setInternalSelectedIndex(index);
      }
      setIsOpen(false);
      if (onChange) {
        onChange(index, item);
      }
    }
  };

  const getSelectedLabel = (): string => {
    if (multiSelect) {
      if (currentSelectedIndices.length === 0) {
        return placeholder;
      } else if (currentSelectedIndices.length === 1) {
        const item = items[currentSelectedIndices[0]];
        return typeof item === 'string' ? item : item.label;
      } else {
        return `${currentSelectedIndices.length} selected`;
      }
    } else {
      if (currentSelectedIndex !== undefined && items[currentSelectedIndex]) {
        const item = items[currentSelectedIndex];
        return typeof item === 'string' ? item : item.label;
      }
      return placeholder;
    }
  };

  return (
    <Frame
      ref={dropdownRef}
      variants={DROPDOWN_VARIANT}
      variant="default"
      size="2"
      sizes={DROPDOWN_SIZES}
      {...frameProps}
    >
      <Button
        variant={isOpen ? 'primaryActive' : 'primary' as any}
        variants={DROPDOWN_BUTTON_VARIANTS}
        size={buttonSize}
        sizes={BUTTON_SIZES}
        onClick={disabled ? undefined : handleButtonClick}
        autoLayout={{alignment: 'left', gap: 'fill', paddingRight: 18}}

        
        {...buttonProps}
      >
        {getSelectedLabel()}
      </Button>
      <List
        items={items}
        selectedIndex={multiSelect ? undefined : currentSelectedIndex}
        selectedIndices={multiSelect ? currentSelectedIndices : undefined}
        multiSelect={multiSelect}
        onItemClick={handleItemClick}
        variant={isOpen ? 'active' : 'hidden'}
        variants={LIST_VARIANTS}
        sizes={LIST_SIZES}
        animate={{ duration: '0.3s', curve: 'ease-in-out' }}
        {...listProps}
      />

    </Frame>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
