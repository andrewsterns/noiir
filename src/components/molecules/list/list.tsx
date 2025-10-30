import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Label } from '../../atoms/label/label';
import { LABEL_VARIANTS } from '../../atoms/label/label.variants';
import { LIST_SIZES } from './list.variants';

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
      ref={ref}
      as={as || "div"}
      autoLayout={{ flow: 'vertical' }}
      size="fill"
      sizes={LIST_SIZES}
      {...frameProps}
    >
      {items.map((item, index) => {
        const itemVariantValue = getItemVariant(index, item);
        const disabled = isItemDisabled(item);

        return (
          <Label
            key={index}
            variant='primary'
            variants={LABEL_VARIANTS}
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
