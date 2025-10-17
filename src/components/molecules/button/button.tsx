import React from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FrameStateProps } from '../../atoms/frame/states/states';

/**
 * Available button states with their visual characteristics
 */
export type ButtonState = 
  | 'default'      // Default state
  | 'hover'        // Hover state
  | 'active'       // Active/pressed state
  | 'disabled';    // Disabled state

export interface ButtonProps extends Omit<FrameProps, 'state' | 'states'> {
  children?: React.ReactNode;
  state?: ButtonState;
}

export const buttonStates: { [key: string]: FrameStateProps } = {
  default: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 'full', height: 40, padding: { left: 16, right: 16 } },
    appearance: { radius: 6 },
    fill: { type: 'solid' as const, color: 'primary6' },
    typography: { color: 'primary2', fontWeight: 500 },
    animation: [
      {
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'active',
        animation: 'dissolve',
        duration: 150,
      },
      {
        trigger: 'onHover',
        action: 'changeTo',
        destination: 'hover',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  },
  hover: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 'full', height: 40, padding: { left: 16, right: 16 } },
    appearance: { radius: 6 },
    fill: { type: 'solid' as const, color: 'primary9' },
    typography: { color: 'primary2', fontWeight: 600 },
    animation: [
      {
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'active',
        animation: 'dissolve',
        duration: 150,
      },
      {
        trigger: 'mouseLeave',
        action: 'changeTo',
        destination: 'default',
        animation: 'dissolve',
        duration: 200,
      }   ]
  },
  active: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 'full', height: 40, padding: { left: 16, right: 16 } },
    appearance: { radius: 6 },
    fill: { type: 'solid' as const, color: 'primary8' },
    typography: { color: 'primary1', fontWeight: 700 },
    animation: [
      {
        trigger: 'mouseEnter',
        action: 'changeTo',
        destination: 'hover',
        animation: 'dissolve',
        duration: 150,
      },
      {
        trigger: 'mouseLeave',
        action: 'changeTo',
        destination: 'default',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  },
  disabled: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 'full', height: 40, padding: { left: 16, right: 16 } },
    appearance: { radius: 6, opacity: 0.5 },
    fill: { type: 'solid' as const, color: 'neutral4' },
    typography: { color: 'neutral6', fontWeight: 500 }
  }
};

/**
 * Button component - pure Frame wrapper with button-specific states
 * Animates between default, hover, and active states on interactions
 */
export const Button = (props: ButtonProps) => {
  const {
    state = 'default',
    children,
    ...frameProps
  } = props;

  return (
    <Frame
      {...frameProps}
      state={state}
      states={buttonStates}
    >
      {children}
    </Frame>
  );
};

Button.displayName = 'Button';
