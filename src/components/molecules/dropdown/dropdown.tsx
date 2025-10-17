import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FrameVariantProps } from '../../atoms/frame/variants/variants';
import { Button, ButtonProps, ButtonVariant } from '../button/button';
import { List, ListItem, ListProps, ListVariant } from '../list/list';

/**
 * Available dropdown variants with their visual characteristics
 */
export type DropdownVariant =
  | 'default'    // Default closed state
  | 'open'       // Open state
  | 'closed'     // Explicitly closed state
  | 'disabled';  // Disabled state

export interface Props {
  variant?: DropdownVariant;
  items?: ListItem[];
}


export const dropdownVariants: { [key: string]: FrameVariantProps } = {
  default: {
    autoLayout: {
      flow: 'vertical' as const,
      width: 'hug-contents',
      height: 'hug-contents'
    },
    childVariants: {
      'button': 'default',
      'list': 'default'
    }
  },
  open: {
    autoLayout: {
      flow: 'vertical' as const,
      width: 'hug-contents',
      height: 'hug-contents'
    },
    childVariants: {
      'button': 'active',
      'list': 'default'
    }
  },
  closed: {
    autoLayout: {
      flow: 'vertical' as const,
      width: 'hug-contents',
      height: 'hug-contents'
    },
    childVariants: {
      'button': 'default',
      'list': 'default'
    }
  },
  disabled: {
    autoLayout: {
      flow: 'vertical' as const,
      width: 'hug-contents',
      height: 'hug-contents'
    },
    childVariants: {
      'button': 'disabled',
      'list': 'default'
    }
  }
};

export const Dropdown = (props: Props) => {
  const {
  variant = 'default',
  items = [],
  ...frameProps
} = props;


  return (
    
      <Frame
        variant={variant}
        variants={dropdownVariants}
        style={{ overflow: 'visible' }}
        {...frameProps}
        animation={[
          {
            trigger: 'onClick',
            action: 'changeTo',
            destination: variant === 'open' ? 'closed' : 'open',
            animation: 'dissolve',
            duration: 200,
          },

        
        ]}
      autoLayout={{flow: 'horizontal', width: 'full', height: 'full'}}
      >
        {/* Trigger Button */}
        <Button
          id="button">Dropdown
        </Button>

        {/* Menu List - only render when open */}
        {variant === 'open' && (
          <List
            id="list"
            items={items}
          />
        )}
      </Frame>

  );
};

// Export the main component
export default Dropdown;
