import React from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FrameVariantProps } from '../../atoms/frame/variants/variants';

/**
 * Available list variants with their visual characteristics
 */
export type ListVariant =
  | 'variantDefault'    // Standard list with padding
  | 'variantCompact'    // Minimal spacing
  | 'variantSpaced';    // Extra spacing between items

/**
 * Individual list item structure
 */
export interface ListItem {
  id: string;
  label: string;
  value?: any;
  disabled?: boolean;
}

/**
 * List-specific props that define list behavior
 */
export interface ListSpecificProps {
  /** The visual variant of the list */
  variant?: ListVariant;
  /** Array of items to display */
  items?: ListItem[];
  /** Currently selected item ID */
  selectedItemId?: string;
  /** Callback when an item is clicked */
  onItemClick?: (item: ListItem) => void;
  /** Callback when selection changes */
  onSelectionChange?: (item: ListItem | null) => void;
}

/**
 * List props = List-specific props + Frame customization props
 * Excludes variant/variants from FrameProps since List controls those internally
 */
export interface ListProps extends ListSpecificProps, Omit<FrameProps, 'variant' | 'variants'> {}

/**
 * List variants with self-contained styling
 */
export const listVariants: { [key: string]: FrameVariantProps } = {
  variantDefault: {
    autoLayout: {
      flow: 'vertical' as const,
      gap: 4,
      padding: { top: 8, right: 8, bottom: 8, left: 8 }
    },
    appearance: { radius: 6 },
    fill: { type: 'solid' as const, color: 'neutral1' },
    stroke: { type: 'solid' as const, color: 'neutral3', weight: 1 },
  },
  variantCompact: {
    autoLayout: {
      flow: 'vertical' as const,
      gap: 2,
      padding: { top: 4, right: 4, bottom: 4, left: 4 }
    },
    appearance: { radius: 4 },
    fill: { type: 'solid' as const, color: 'neutral1' },
    stroke: { type: 'solid' as const, color: 'neutral3', weight: 1 },
  },
  variantSpaced: {
    autoLayout: {
      flow: 'vertical' as const,
      gap: 12,
      padding: { top: 16, right: 16, bottom: 16, left: 16 }
    },
    appearance: { radius: 8 },
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
  variant = 'variantDefault',
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