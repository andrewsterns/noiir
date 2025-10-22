import React, { useState, useRef, useEffect } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
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
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({
  items,
  selectedIndex,
  placeholder = "Select an option...",
  onChange,
  disabled = false,
  buttonProps,
  listProps,
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

  // Dynamic appearance for the button based on open state
  const buttonAppearance = isOpen 
    ? { radiusBottomLeft: 0, radiusBottomRight: 0, radiusTopLeft: 12, radiusTopRight: 12 }
    : { radius: 12 };

  return (
    <Frame
      ref={dropdownRef}
      autoLayout={{ flow: 'vertical' }}
      {...frameProps}
    >
      <Button
        variant='outline'
        onClick={disabled ? undefined : handleButtonClick}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        appearance={buttonAppearance}
        {...buttonProps}
      >
        {getButtonText()}
      </Button>

      {isOpen && (
        <Frame
          autoLayout={{ flow: 'vertical' }}
          fill={{ type: 'solid', color: 'gray1' }}
          stroke={{ type: 'solid', color: 'gray4', weight: 1 }}
          appearance={{ radiusTopLeft: 0, radiusTopRight: 0, radiusBottomLeft: 12, radiusBottomRight: 12 }}
          effects={{ dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)' }] }}
        >
          <List
            items={items}
            selectedIndex={currentSelectedIndex}
            onItemClick={handleItemClick}
            fill={{ type: 'solid', color: 'black8' }}
            appearance={{ radiusTopLeft: 0, radiusTopRight: 0, radiusBottomLeft: 12, radiusBottomRight: 12 }}
            
            {...listProps}
          />
        </Frame>
      )}
    </Frame>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
