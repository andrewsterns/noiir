import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Button } from '../../atoms/button/button';
import { List, ListItem } from '../list/list';
import { DROPDOWN_BUTTON_VARIANTS, DROPDOWN_VARIANT, DROPDOWN_SIZES, DROPDOWN_LIST_VARIANTS } from './dropdown.variants';
import { BUTTON_SIZES } from '../../atoms/button/button.variants';
import { Transitions, useTransitionContext } from '../../frame/frame-properties/transition/transition';

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
  variant?: string | keyof typeof DROPDOWN_VARIANT;
  listVariant?: string;
  buttonSize?: '1' | '2' | '3' |'fill';
  buttonProps?: Partial<React.ComponentProps<typeof Button>>;
  transitions?: Transitions;
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
  listVariant = 'hidden',
  buttonSize = '2',
  
  buttonProps,
  transitions,
  ...frameProps
}, ref) => {

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

  const openCloseTransitions: Transitions = [
    { event: 'mouseEnter', toVariant: 'primaryHover', fromVariant: 'primary', duration: '0.2s' },
    { event: 'mouseLeave', toVariant: 'primary', fromVariant: 'primaryHover', duration: '0.2s' },
    { event: 'click', targetId: 'dropdown-list', toggle: true, toggleVariants: ['visible', 'hidden'], duration: '0.3s' },
    { event: 'listen', listenId: 'dropdown-list', listenVariant: 'visible', targetId: 'dropdown-button', toVariant: 'primaryActive' },
    { event: 'listen', listenId: 'dropdown-list', listenVariant: 'hidden', targetId: 'dropdown-button', toVariant: 'primary' },
  ];

  const ItemClickHandler = ({ children }: { children: React.ReactElement }) => {
    const transitionContext = useTransitionContext();

    const handleItemClick = (index: number, item: ListItem) => {
      onChange?.(index, item);
      // The list toggle will trigger the 'listen' event to reset the button
    };

    return React.cloneElement(children, { onItemClick: handleItemClick });
  };

  return (
    <Frame
      variants={DROPDOWN_VARIANT}
      variant="default"
      size="2"
      sizes={DROPDOWN_SIZES}
      transitions={[]}
      {...frameProps}
    >
      <Button
        id='dropdown-button'
        variant='primary'
        variants={DROPDOWN_BUTTON_VARIANTS}
        size={buttonSize}
        sizes={BUTTON_SIZES}
        autoLayout={{alignment: 'left', gap: 23, paddingRight: 18}}
        transitions={openCloseTransitions}
        {...buttonProps}
      >
        {getSelectedLabel()}
      </Button>
      <ItemClickHandler>
        <List
          id='dropdown-list'
          items={items}
          variant={listVariant}
          variants={DROPDOWN_LIST_VARIANTS}
        />
      </ItemClickHandler>
    </Frame>
  );
});
