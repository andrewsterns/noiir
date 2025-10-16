import React from 'react';
import { FrameProps } from '../../atoms/frame/Frame';
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
export interface ButtonProps extends FrameProps, ButtonSpecificProps {
}
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
export declare const Button: React.FC<ButtonProps>;
