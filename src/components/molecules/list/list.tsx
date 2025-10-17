import React from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FrameVariantProps } from '../../atoms/frame/variants/variants';

/**
 * Available list variants with their visual characteristics
 */
export type ListVariant =
  | 'default';    // Default list

export interface ListProps extends Omit<FrameProps, 'variant' | 'variants'> {
  variant?: ListVariant;
  items?: ListItem[];
  selectedItemId?: string;
  onItemClick?: (item: ListItem) => void;
  onSelectionChange?: (item: ListItem | null) => void;
}



export interface ListItem {
  id: string;
  label: React.ReactNode;
  value?: any;
  disabled?: boolean;
}


export const listVariants: { [key: string]: FrameVariantProps } = {
  default: {
    autoLayout: {
      flow: 'vertical' as const,
      gap: 4,
      padding: { top: 8, right: 8, bottom: 8, left: 8 }
    },
    appearance: { radius: 6 },
    fill: { type: 'solid' as const, color: 'neutral1' },
    stroke: { type: 'solid' as const, color: 'neutral3', weight: 1 },
  }
};

/**
 * List item variants for individual list items
 */
export const listItemVariants: { [key: string]: FrameVariantProps } = {
  itemDefault: {
    autoLayout: {
      flow: 'horizontal' as const,
      alignment: 'center' as const,
      padding: { top: 8, right: 12, bottom: 8, left: 12 }
    },
    appearance: { radius: 4 },
    fill: { type: 'solid' as const, color: 'transparent' },
    typography: {
      fontSize: 14,
      fontWeight: 400,
      color: 'neutral8',
      lineHeight: 1.4
    },
    cursor: 'pointer',
    animation: [
      {
        trigger: 'onHover',
        action: 'changeTo',
        destination: 'itemHover',
        animation: 'dissolve',
        duration: 150,
      }
    ]
  },
  itemHover: {
    autoLayout: {
      flow: 'horizontal' as const,
      alignment: 'center' as const,
      padding: { top: 8, right: 12, bottom: 8, left: 12 }
    },
    appearance: { radius: 4 },
    fill: { type: 'solid' as const, color: 'primary2' },
    typography: {
      fontSize: 14,
      fontWeight: 500,
      color: 'primary8',
      lineHeight: 1.4
    },
    cursor: 'pointer',
    animation: [
      {
        trigger: 'onMouseLeave',
        action: 'changeTo',
        destination: 'itemDefault',
        animation: 'dissolve',
        duration: 150,
      }
    ]
  },
  itemSelected: {
    autoLayout: {
      flow: 'horizontal' as const,
      alignment: 'center' as const,
      padding: { top: 8, right: 12, bottom: 8, left: 12 }
    },
    appearance: { radius: 4 },
    fill: { type: 'solid' as const, color: 'primary9' },
    typography: {
      fontSize: 14,
      fontWeight: 500,
      color: 'primary2',
      lineHeight: 1.4
    },
    cursor: 'pointer',
    animation: [
      {
        trigger: 'onHover',
        action: 'changeTo',
        destination: 'itemSelectedHover',
        animation: 'dissolve',
        duration: 150,
      }
    ]
  },
  itemSelectedHover: {
    autoLayout: {
      flow: 'horizontal' as const,
      alignment: 'center' as const,
      padding: { top: 8, right: 12, bottom: 8, left: 12 }
    },
    appearance: { radius: 4 },
    fill: { type: 'solid' as const, color: 'primary10' },
    typography: {
      fontSize: 14,
      fontWeight: 600,
      color: 'primary2',
      lineHeight: 1.4
    },
    cursor: 'pointer',
    animation: [
      {
        trigger: 'onMouseLeave',
        action: 'changeTo',
        destination: 'itemSelected',
        animation: 'dissolve',
        duration: 150,
      }
    ]
  },
  itemDisabled: {
    autoLayout: {
      flow: 'horizontal' as const,
      alignment: 'center' as const,
      padding: { top: 8, right: 12, bottom: 8, left: 12 }
    },
    appearance: { radius: 4 },
    fill: { type: 'solid' as const, color: 'transparent' },
    typography: {
      fontSize: 14,
      fontWeight: 400,
      color: 'neutral5',
      lineHeight: 1.4
    },
    cursor: 'not-allowed'
  }
};

/**
 * List component - displays a selectable list of items
 * Built on Frame with self-contained styling and interaction logic
 */
export const List: React.FC<ListProps> = ({
  variant = 'default',
  items = [],
  selectedItemId,
  onItemClick,
  onSelectionChange,
  ...frameProps
}) => {
  const handleItemClick = (item: ListItem) => {
    if (item.disabled) return;

    // Call the item click handler
    onItemClick?.(item);

    // Update selection if different
    if (selectedItemId !== item.id) {
      onSelectionChange?.(item);
    } else {
      // Clicking selected item deselects it
      onSelectionChange?.(null);
    }
  };

  return (
    <Frame
      {...frameProps}
      variant={variant}
      variants={listVariants}
    >
      {items.map((item) => {
        const isSelected = selectedItemId === item.id;
        const itemVariant = item.disabled
          ? 'itemDisabled'
          : isSelected
            ? 'itemSelected'
            : 'itemDefault';

        return (
          <Frame
            key={item.id}
            variant={itemVariant}
            variants={listItemVariants}
            onClick={() => handleItemClick(item)}
          >
            {item.label}
          </Frame>
        );
      })}
    </Frame>
  );
};

List.displayName = 'List';