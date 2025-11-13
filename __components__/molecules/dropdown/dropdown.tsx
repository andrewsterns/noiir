import React, { useId } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Button } from '../../atoms/button/button';
import { List, ListItem } from '../list/list';
import { DROPDOWN_BUTTON_VARIANTS, DROPDOWN_VARIANT, DROPDOWN_SIZES, DROPDOWN_LIST_VARIANTS } from '@variants/molecules/dropdown/dropdown.variants';
import { BUTTON_SIZES } from '@variants/atoms/button/button.variants';
import { Animate } from '@noiir/frame-core/animate/animate.props';
import { LIST_SIZES } from '../list/list.variants';

/**
 * Dropdown Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use DROPDOWN_BUTTON_VARIANTS and DROPDOWN_LIST_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'primaryHover' }, click: { variant: 'primaryActive' } }}
 *
 * This component also uses Button and Label components internally.
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see ButtonProps in src/components/atoms/button/button.tsx for Button props
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
  variant?: string;
  variants?: Record<string, any>;
  listVariant?: string;
  listVariants?: Record<string, any>;
  buttonVariant?: string;
  buttonVariants?: Record<string, any>;
  size?: any;
  sizes?: Record<string, any>;
  buttonSize?: any;
  buttonSizes?: Record<string, any>;
  listSize?: any;
  listSizes?: Record<string, any>;
  buttonProps?: Partial<React.ComponentProps<typeof Button>>;
  animate?: Animate;
  id?: string;
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
  variants: customVariants,
  listVariant = 'hidden',
  listVariants: customListVariants,
  buttonVariant = 'primary',
  buttonVariants: customButtonVariants,
  size = '2',
  sizes: customSizes,
  buttonSize = '2',
  buttonSizes: customButtonSizes,
  listSize = '2',
  listSizes: customListSizes,
  buttonProps,
  animate,
  id,
  ...frameProps
}, ref) => {
  const variants = customVariants || DROPDOWN_VARIANT;
  const sizes = customSizes || DROPDOWN_SIZES;
  const buttonVariants = customButtonVariants || DROPDOWN_BUTTON_VARIANTS;
  const buttonSizes = customButtonSizes || BUTTON_SIZES;
  const listVariants = customListVariants || DROPDOWN_LIST_VARIANTS;
  const listSizes = customListSizes || LIST_SIZES;

  const getSelectedLabel = () => {
    if (multiSelect) {
      if (selectedIndices.length === 0) return placeholder;
      return selectedIndices.map(i => typeof items[i] === 'string' ? items[i] : items[i].label).join(', ');
    } else {
      const index = selectedIndex ?? -1;
      if (index >= 0 && items[index]) {
        return typeof items[index] === 'string' ? items[index] : items[index].label;
      }
      return placeholder;
    }
  };

  // Generate unique ID for the dropdown if not provided
  const dropdownId = id || `dropdown-${useId()}`;

  // Frame will auto-generate unique IDs for button and list if base id not provided
  const buttonId = `${dropdownId}-button`;
  const listId = `${dropdownId}-list`;

  const buttonTransitions: Animate = [
    { onHover: { toVariant: 'primaryHover', duration: '0.2s' } },
    { onClick: { toggleVariant: ['primary', 'primaryActive'], duration: '0.1s', curve: 'ease' } },
    { onClick: { toggleVariant: [`${listId}.hidden`, `${listId}.visible`], duration: '0.3s' } },
  ];

  const listTransitions: Animate = [
    { onClick: { toVariant: 'hidden', duration: '0.3s' } },
  ];



  return (
    <Frame
      variants={variants}
      variant={variant}
      size={size}
      sizes={sizes}
      animate={[]}
      {...frameProps}
    >
      <Button
        id={buttonId}
        variant={buttonVariant}
        variants={buttonVariants}
        size={buttonSize}
        sizes={buttonSizes}
        autoLayout={{ alignment: 'left', gap: 'fill', paddingRight: 18 }}
        animate={disabled ? [] : buttonTransitions}
        disabled={disabled}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        {...buttonProps}
      >
        {getSelectedLabel()}
      </Button>
      <List
        id={listId}
        size={listSize}
        sizes={listSizes}
        items={items}
        variant={listVariant}
        variants={listVariants}
        animate={listTransitions}
        onItemClick={(index, item) => {
          console.log('[Dropdown] Item clicked:', index, item);
          if (multiSelect) {
            onMultiChange?.(selectedIndices, items);
          } else {
            onChange?.(index, item);
          }
          // List will close automatically when clicked via animation
        }}
      />
    </Frame>
  );
});


