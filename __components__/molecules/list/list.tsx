import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Label } from '../../atoms/label/label';
import { LABEL_SIZES, LABEL_VARIANTS } from '../../../__variants__/atoms/label/label.variants';
import { LIST_SIZES, LIST_VARIANTS } from './list.variants';
import { FrameVariantConfig } from '@noiir/frame-core/variants/variants.props';

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
  onClick?: () => void;
  itemVariant?: string;
  itemVariants?: Record<string, any>;
  selectedVariant?: string;
  disabledVariant?: string;
  children?: React.ReactNode;
  renderItem?: (item: ListItem, index: number) => React.ReactNode;
  size?: any;
  sizes?: Record<string, any>;
  variants?: Record<string, any>;
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(({
  items,
  selectedIndex,
  selectedIndices = [],
  multiSelect = false,
  onItemClick,
  onClick,
  itemVariant = 'primary',
  itemVariants: customItemVariants,
  selectedVariant = 'primary',
  disabledVariant = 'disabled',
  children,
  renderItem,
  size='fill',
  sizes: customSizes,
  variants: customVariants,
  as,
  ...frameProps
}, ref) => {
  const sizes = customSizes || LIST_SIZES;
  const variants = customVariants || LIST_VARIANTS;
  const itemVariants = customItemVariants || LABEL_VARIANTS;
  const handleItemClick = (index: number, item: ListItem) => {
    if (isItemDisabled(item)) return;
    if (onItemClick) {
      onItemClick(index, item);
    }
  };

  const getItemVariant = (index: number, item: ListItem): string => {
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
      ref={ref}
      as={as || "div"}
      autoLayout={{ flow: 'vertical' }}
      size={size}
      sizes={sizes}
      variant='default'
      variants={variants}
      onClick={onClick}
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
            id={frameProps.id ? `${frameProps.id}-item-${index}` : undefined}
            key={index}
            size="fill"
            sizes={LABEL_SIZES}
            variant={itemVariantValue}
            variants={itemVariants}
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


