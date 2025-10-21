import React, { useState, useRef, useEffect } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { DROPDOWN_VARIANTS, DropdownVariant } from './dropdown.variants';
import { Button } from '../../atoms/button/button';
import { List, ListItem } from '../list/list';
export interface DropdownProps extends Omit<FrameProps, 'onClick'> {
  items: ListItem[];
  selectedIndex?: number;
  placeholder?: string;
  onChange?: (selectedIndex: number, item: ListItem) => void;
  disabled?: boolean;
  buttonProps?: Partial<React.ComponentProps<typeof Button>>;
  listProps?: Partial<React.ComponentProps<typeof List>>;
  variant?: DropdownVariant;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({
  items,
  selectedIndex,
  placeholder = "Select an option...",
  onChange,
  disabled = false,
  buttonProps,
  listProps,
  variant = 'default',
  ...frameProps
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<number | undefined>(selectedIndex);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use controlled selectedIndex if provided, otherwise use internal state
  const currentSelectedIndex = selectedIndex !== undefined ? selectedIndex : internalSelectedIndex;

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
    if (selectedIndex === undefined) {
      setInternalSelectedIndex(index);
    }
    setIsOpen(false);
    if (onChange) {
      onChange(index, item);
    }
  };

  const getSelectedLabel = (): string => {
    if (currentSelectedIndex !== undefined && items[currentSelectedIndex]) {
      const item = items[currentSelectedIndex];
      return typeof item === 'string' ? item : item.label;
    }
    return placeholder;
  };

  const getButtonText = (): string => {
    const label = getSelectedLabel();
    return label + (isOpen ? ' ▲' : ' ▼');
  };


  // Get variant config
  const variantConfig = DROPDOWN_VARIANTS[variant] || {};
  // Dynamic appearance for the button based on open state
  const buttonAppearance = isOpen
    ? { ...(variantConfig.button?.appearance || {}), radiusBottomLeft: 0, radiusBottomRight: 0 }
    : (variantConfig.button?.appearance || { radius: 12 });

  return (
    <Frame
      ref={dropdownRef}
      autoLayout={{ flow: 'vertical' }}
      {...frameProps}
    >

      <Button
  variant={variantConfig.button?.variant as any}
        fill={variantConfig.button?.fill}
        stroke={variantConfig.button?.stroke}
        appearance={buttonAppearance}
        typography={variantConfig.button?.typography}
        effects={variantConfig.button?.effects}
        onClick={handleButtonClick}
        disabled={disabled}
        {...buttonProps}
      >
        {getButtonText()}
      </Button>

      {isOpen && (
        <Frame
          autoLayout={{ flow: 'vertical' }}
          fill={variantConfig.list?.fill || { type: 'solid', color: 'gray1' }}
          stroke={variantConfig.list?.stroke || { type: 'solid', color: 'gray4', weight: 1 }}
          appearance={variantConfig.list?.appearance || { radiusTopLeft: 0, radiusTopRight: 0, radiusBottomLeft: 12, radiusBottomRight: 12 }}
          effects={variantConfig.list?.effects || { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)' }] }}
        >
          <List
            items={items}
            selectedIndex={currentSelectedIndex}
            onItemClick={handleItemClick}
            fill={variantConfig.list?.fill || { type: 'solid', color: 'black8' }}
            appearance={variantConfig.list?.appearance || { radiusTopLeft: 0, radiusTopRight: 0, radiusBottomLeft: 12, radiusBottomRight: 12 }}
            typography={variantConfig.list?.typography}
            {...listProps}
          />
        </Frame>
      )}
    </Frame>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
