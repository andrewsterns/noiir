import React from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FrameStateProps } from '../../atoms/frame/states/states';

/**
 * Available list states with their visual characteristics
 */
export type ListState =
  | 'default';    // Default list

export interface ListProps extends Omit<FrameProps, 'state' | 'states'> {
  state?: ListState;
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


export const listStates: { [key: string]: FrameStateProps } = {
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
 * List item states for individual list items
 */
export const listItemStates: { [key: string]: FrameStateProps } = {
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
  state = 'default',
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
      state={state}
      states={listStates}
    >
      {items.map((item) => {
        const isSelected = selectedItemId === item.id;
        const itemState = item.disabled
          ? 'itemDisabled'
          : isSelected
            ? 'itemSelected'
            : 'itemDefault';

        return (
          <Frame
            key={item.id}
            state={itemState}
            states={listItemStates}
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