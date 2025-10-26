import React, { useState, useRef, useEffect } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Button } from '../../atoms/button/button';
import { List, ListItem } from '../list/list';
import { DROPDOWN_BUTTON_VARIANTS, DROPDOWN_VARIANT, DROPDOWN_SIZES } from './dropdown.variants';
import { LIST_VARIANTS } from '../list/list.variants';
import { BUTTON_VARIANTS } from '../../atoms/button/button.variants';
import Label from '../../atoms/label/label';
import { LABEL_VARIANTS } from '../../atoms/label/label.variants';

export interface DropdownProps extends Omit<FrameProps, 'onClick'> {
  items: ListItem[];
  selectedIndex?: number;
  selectedIndices?: number[];
  multiSelect?: boolean;
  placeholder?: string;
  onChange?: (selectedIndex: number, item: ListItem) => void;
  onMultiChange?: (selectedIndices: number[], items: ListItem[]) => void;
  disabled?: boolean;
  variant?: keyof typeof DROPDOWN_BUTTON_VARIANTS;
  size?: 'sm' | 'md' | 'lg';
  buttonSize?: 'sm' | 'md' | 'lg';
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
  size = 'md',
  buttonSize = 'md',
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
      size={size}
      sizes={DROPDOWN_SIZES}
      {...frameProps}
    >
      <Button
        variant={isOpen ? 'primary-open' : 'primary' as any}
        variants={DROPDOWN_BUTTON_VARIANTS}
        size={buttonSize}
        onClick={disabled ? undefined : handleButtonClick}
        autoLayout={{alignment: 'left', width: 'fill', gap: 'fill', paddingRight: 18}}

        
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
        animate={{ duration: '0.3s', curve: 'ease-in-out' }}
        {...listProps}
      />

    </Frame>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
