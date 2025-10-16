import React from 'react';
import { Frame, FrameProps } from '../../atoms/frame/Frame';

/**
 * Button-specific props that extend Frame functionality
 */
export interface ButtonSpecificProps {
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Hover handlers */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Focus handlers */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Button content */
  children?: React.ReactNode;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Role override (defaults to 'button') */
  role?: string;
}

/**
 * Button props = All Frame props + Button-specific props
 * This gives us EVERY Frame capability: fill, stroke, position, layout, typography, etc.
 */
export interface ButtonProps extends FrameProps, ButtonSpecificProps {}

/**
 * Button component - Frame with click interactions
 * Inherits ALL Frame properties: fill, stroke, position, layout, typography, etc.
 * 
 * @example
 * ```tsx
 * <Button 
 *   fill={{ type: 'solid', color: 'primary6' }}
 *   appearance={{ radius: 8 }}
 *   size={{ width: 200, height: 60 }}
 *   onClick={() => console.log('clicked!')}
 * >
 *   Click me
 * </Button>
 * 
 * // With gradient and all Frame powers
 * <Button
 *   fill={{
 *     type: 'linear-gradient',
 *     angle: 45,
 *     stops: [
 *       { color: 'primary4', position: 0 },
 *       { color: 'primary8', position: 1 }
 *     ]
 *   }}
 *   stroke={{ color: 'white', weight: 2 }}
 *   appearance={{ radius: 12 }}
 *   typography={{ fontSize: 18, fontWeight: 600, textAlign: 'center' }}
 *   onClick={handleClick}
 * >
 *   Gradient Button
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  disabled = false,
  cursor = 'pointer',
  tabIndex = 0,
  'aria-label': ariaLabel,
  role = 'button',
  children,
  style,
  ...frameProps // This spreads ALL Frame props automatically!
}) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    onClick?.(event);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    onMouseLeave?.(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (disabled) return;
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (disabled) return;
    onBlur?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    // Handle Enter and Space as clicks for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event as any);
    }
  };

  return (
    <div
      tabIndex={disabled ? -1 : tabIndex}
      aria-label={ariaLabel}
      role={role}
      aria-disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={{
        cursor: disabled ? 'not-allowed' : cursor,
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
        outline: 'none', // We'll handle focus with Frame's appearance
        transition: 'opacity 0.2s ease-in-out, transform 0.1s ease-in-out',
        display: 'inline-block', // Prevent full-width by default
      }}
    >
      <Frame
        {...frameProps} // Spreads ALL Frame props: fill, stroke, position, layout, etc.
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
        }}
      >
        {children}
      </Frame>
    </div>
  );
};

Button.displayName = 'Button';
