import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Label } from '../../atoms/label/label';
import { LabelVariant, LABEL_VARIANTS } from '../../atoms/label/label.variants';

export type ListItem = string | { label: string; value?: any; disabled?: boolean };

export interface ListProps extends FrameProps {
  items: ListItem[];
  selectedIndex?: number;
  selectedIndices?: number[];
  multiSelect?: boolean;
  onItemClick?: (index: number, item: ListItem) => void;
  itemVariant?: LabelVariant;
  selectedVariant?: LabelVariant;
  disabledVariant?: LabelVariant;
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(({
  items,
  selectedIndex,
  selectedIndices = [],
  multiSelect = false,
  onItemClick,
  itemVariant = 'primary',
  selectedVariant = 'active',
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

  const getItemVariant = (index: number, item: ListItem): LabelVariant => {
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
      autoLayout={{ flow: 'vertical', paddingVertical: 4, paddingHorizontal: 0, gap: 4, width: 'fill', height: 'fill'  }}
      fill={{ type: 'none'}}
      {...frameProps}
    >
      {items.map((item, index) => {
        const variant = getItemVariant(index, item);
        const disabled = isItemDisabled(item);
        const variantConfig = LABEL_VARIANTS[variant] || {};
        const variantAutoLayout = variantConfig.autoLayout || {};

        return (
          <Label
            key={index}
            variant={variant}
            autoLayout={{ ...variantAutoLayout, width: 'fill', height: 'fill' }}
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
