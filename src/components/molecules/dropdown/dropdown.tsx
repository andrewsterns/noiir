import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FrameStateProps } from '../../atoms/frame/states/states';
import { Button, ButtonProps, ButtonState } from '../button/button';
import { List, ListItem, ListProps, ListState } from '../list/list';

/**
 * Available dropdown states with their visual characteristics
 */
export type DropdownState =
  | 'default'    // Default closed state
  | 'open'       // Open state
  | 'closed'     // Explicitly closed state
  | 'disabled';  // Disabled state

export interface Props {
  state?: DropdownState;
  items?: ListItem[];
}


export const dropdownStates: { [key: string]: FrameStateProps } = {
  default: {
    autoLayout: {
      flow: 'vertical' as const,
      width: 'hug-contents',
      height: 'hug-contents'
    },
    childStates: {
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
    childStates: {
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
    childStates: {
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
    childStates: {
      'button': 'disabled',
      'list': 'default'
    }
  }
};

export const Dropdown = (props: Props) => {
  const {
  state = 'default',
  items = [],
  ...frameProps
} = props;


  return (
    
      <Frame
        state={state}
        states={dropdownStates}
        style={{ overflow: 'visible' }}
        {...frameProps}
        animation={[
          {
            trigger: 'onClick',
            action: 'changeTo',
            destination: state === 'open' ? 'closed' : 'open',
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
        {state === 'open' && (
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
