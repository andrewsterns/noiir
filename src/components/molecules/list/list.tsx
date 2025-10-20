import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Label } from '../../atoms/label/label';
import { LabelVariant } from '../../atoms/label/label.variants';

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
  itemVariant = 'normal',
  selectedVariant = 'active',
  disabledVariant = 'disabled',
  as,
  ...frameProps
}, ref) => {
  const handleItemClick = (index: number, item: ListItem) => {
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
      autoLayout={{ flow: 'vertical', gap: 2, paddingVertical: 4 }}
    fill={{ type: 'solid', color: 'transparent' }}
      {...frameProps}
    >
      {items.map((item, index) => (
        <Label
          key={index}
          variant={getItemVariant(index, item)}
          disabled={isItemDisabled(item)}
          onClick={() => handleItemClick(index, item)}
          autoLayout={{paddingHorizontal:12, paddingVertical:2}}
        >
          {getItemLabel(item)}
        </Label>
      ))}
    </Frame>
  );
});

List.displayName = 'List';

export default List;
