import React from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FrameVariantProps } from '../../atoms/frame/variants/variants';

/**
 * Available button variants with their visual characteristics
 */
export type ButtonVariant = 
  | 'default'      // Default state
  | 'hover'        // Hover state
  | 'active'       // Active/pressed state
  | 'disabled';    // Disabled state

export interface ButtonProps extends Omit<FrameProps, 'variant' | 'variants'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
}

export const buttonVariants: { [key: string]: FrameVariantProps } = {
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
 * Button component - pure Frame wrapper with button-specific variants
 * Animates between default, hover, and active variants on interactions
 */
export const Button = (props: ButtonProps) => {
  const {
    variant = 'default',
    children,
    ...frameProps
  } = props;

  return (
    <Frame
      {...frameProps}
      variant={variant}
      variants={buttonVariants}
    >
      {children}
    </Frame>
  );
};

Button.displayName = 'Button';
