import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Label } from '../../atoms/label/label';
import { LABEL_SIZES, LABEL_VARIANTS } from '../../atoms/label/label.variants';
import { LIST_SIZES, LIST_VARIANTS } from './list.variants';

/**
 * List Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use LIST_VARIANTS with Frame's animate prop
 * instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'active' }, click: { variant: 'active' } }}
 *
 * This component also uses Label components internally for list items.
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see LabelProps in src/components/atoms/label/label.tsx for Label props
 * @see LIST_VARIANTS in list.variants.ts for available animation states
 */

export type ListItem = string | { label: string; value?: any; disabled?: boolean };

export interface ListProps extends Omit<FrameProps, 'size'> {
  items: ListItem[];
  selectedIndex?: number;
  selectedIndices?: number[];
  multiSelect?: boolean;
  onItemClick?: (index: number, item: ListItem) => void;
  itemVariant?: 'primary'| 'primaryHover' | 'primaryActive' | 'primaryActiveHover' | 'disabled';
  selectedVariant?: 'primary' | 'primaryActive';
  disabledVariant?: 'disabled';
  children?: React.ReactNode;
  renderItem?: (item: ListItem, index: number) => React.ReactNode;
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(({
  items,
  selectedIndex,
  selectedIndices = [],
  multiSelect = false,
  onItemClick,
  itemVariant = 'primary',
  selectedVariant = 'primary',
  disabledVariant = 'disabled',
  children,
  renderItem,
  as,
  ...frameProps
}, ref) => {
  const handleItemClick = (index: number, item: ListItem) => {
    if (isItemDisabled(item)) return;
    if (onItemClick) {
      onItemClick(index, item);
    }
  };

  const getItemVariant = (index: number, item: ListItem): 'primary'| 'primaryHover' | 'primaryActive' | 'primaryActiveHover' | 'disabled' => {
    if (typeof item === 'object' && item.disabled) {
      return disabledVariant;
    }

    if (multiSelect) {
      return selectedIndices.includes(index) ? selectedVariant : itemVariant;
    } else {
      return selectedIndex === index ? selectedVariant : itemVariant;
    }
  };

  const getItemLabel = (item: ListItem): string => {
    return typeof item === 'string' ? item : item.label;
  };

  const isItemDisabled = (item: ListItem): boolean => {
    return typeof item === 'object' && item.disabled === true;
  };


  return (
    <Frame
      id='list'
      ref={ref}
      as={as || "div"}
      autoLayout={{ flow: 'vertical' }}
      size="fill"
      sizes={LIST_SIZES}
      variant='default'
      variants={LIST_VARIANTS}

      {...frameProps}
    >
      {items.map((item, index) => {
        const itemVariantValue = getItemVariant(index, item);
        const disabled = isItemDisabled(item);

        if (renderItem) {
          return renderItem(item, index);
        }

        // Default rendering using Label
        return (
          <Label
            id={`list-item-${index}`}
            key={index}
            size="fill"
            variant={itemVariantValue}
            disabled={disabled}
            onClick={() => handleItemClick(index, item)}
          >
            {getItemLabel(item)}
          </Label>
        );
      })}
    </Frame>
  );
});

List.displayName = 'List';

export default List;
