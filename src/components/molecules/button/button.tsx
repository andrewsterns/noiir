import React from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';
import { FrameVariantProps } from '../../atoms/frame/variants/variants';

/**
 * Available button variants with their visual characteristics
 */
export type ButtonVariant = 
  | 'variantDefault'      // Primary blue, normal weight
  | 'variantActive'       // Success green, normal weight  
  | 'variantHover'        // Primary blue, bold weight
  | 'variantActiveHover'; // Success green, bold weight

/**
 * Button-specific props that define button behavior
 */
export interface ButtonSpecificProps {
  /** The visual variant of the button */
  variant?: ButtonVariant;
  /** Button content */
  children?: React.ReactNode;
}

/**
 * Button props = Button-specific props + Frame customization props
 * Excludes variant/variants from FrameProps since Button controls those internally
 */
export interface ButtonProps extends Omit<FrameProps, 'variant' | 'variants'>, ButtonSpecificProps {}
export const buttonVariants: { [key: string]: FrameVariantProps } = {
  variantDefault: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 'full', height: 40, padding: { left: 5, right: 5 } },
    appearance: { radius: 6 },
    fill: { type: 'solid' as const, color: 'primary6' },
    typography: { color: 'primary2', fontWeight: 500 },
    animation: [
      {
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'variantActive',
        animation: 'dissolve',
        duration: 300,
      },
      {
        trigger: 'onHover',
        action: 'changeTo',
        destination: 'variantHover',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  },
  variantActive: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 'full', height: 40, padding: { left: 5, right: 5 } },
    appearance: { radius: 6 },
    fill: { type: 'solid' as const, color: 'success6' },
    typography: { color: 'success2', fontWeight: 500 },
    animation: [
      {
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'variantDefault',
        animation: 'dissolve',
        duration: 300,
      },
      {
        trigger: 'onHover',
        action: 'changeTo',
        destination: 'variantActiveHover',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  },
  variantHover: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 'full', height: 40, padding: { left: 6, right: 6 } },
    appearance: { radius: 6 },
    fill: { type: 'solid' as const, color: 'primary7' },
    typography: { color: 'primary2', fontWeight: 600 },
    animation: [
      {
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'variantActive',
        animation: 'dissolve',
        duration: 300,
      },
      {
        trigger: 'onMouseLeave',
        action: 'changeTo',
        destination: 'variantDefault',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  },
  variantActiveHover: {
    autoLayout: { flow: 'horizontal' as const, alignment: 'center' as const, width: 'full', height: 40, padding: { left: 6, right: 6 } },
    appearance: { radius: 6 },
    fill: { type: 'solid' as const, color: 'success6' },
    typography: { color: 'success2', fontWeight: 600 },
    animation: [
      {
        trigger: 'onClick',
        action: 'changeTo',
        destination: 'variantDefault',
        animation: 'dissolve',
        duration: 300,
      },
      {
        trigger: 'onMouseLeave',
        action: 'changeTo',
        destination: 'variantActive',
        animation: 'dissolve',
        duration: 200,
      }
    ]
  }
};

/**
 * Button component - pure Frame wrapper with button-specific variants
 * All interactions (click, hover, focus) are handled by Frame's animate system
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'variantDefault',
  children,
  ...frameProps
}) => {
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
