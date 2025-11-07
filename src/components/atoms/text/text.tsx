import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { textVariants } from '@variants/index';

/**
 * Text component - A specialized Frame component for typography
 * Provides a clean API for text styling with preset variants
 */
export interface TextProps extends Omit<FrameProps, 'as'> {
  /** HTML element to render (defaults to 'span' for inline text) */
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'code' | 'pre';
  /** Text content */
  children?: React.ReactNode;
}

/**
 * Text Component
 * 
 * A minimal, reusable text component built on Frame.
 * Use variants to apply typography presets from text.variants.tsx
 * 
 * @example
 * <Text variant="h1">Heading</Text>
 * <Text variant="body">Body text</Text>
 * <Text variant="label">Label text</Text>
 */

export const Text = React.forwardRef<HTMLElement, TextProps>(
  function Text({ as = 'span', children, ...props }, ref) {
    return (
      <Frame
        as={as}
        ref={ref}
        {...props}
        variant={props.variant || 'Frame'}
        variants={textVariants}
      >
        {children}
      </Frame>
    );
  }
);

Text.displayName = 'Text';

// Specialized text components for each variant
type SpecializedProps = Omit<TextProps, 'variant'>;

export const H1 = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="h1" {...props} />
));
H1.displayName = 'H1';

export const H2 = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="h2" {...props} />
));
H2.displayName = 'H2';

export const H3 = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="h3" {...props} />
));
H3.displayName = 'H3';

export const H4 = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="h4" {...props} />
));
H4.displayName = 'H4';

export const H5 = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="h5" {...props} />
));
H5.displayName = 'H5';

export const H6 = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="h6" {...props} />
));
H6.displayName = 'H6';

export const Body = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="body" {...props} />
));
Body.displayName = 'Body';

export const Body1 = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="body1" {...props} />
));
Body1.displayName = 'Body1';

export const Body2 = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="body2" {...props} />
));
Body2.displayName = 'Body2';

export const Label = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="label" {...props} />
));
Label.displayName = 'Label';

export const Caption = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="caption" {...props} />
));
Caption.displayName = 'Caption';

export const Overline = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="overline" {...props} />
));
Overline.displayName = 'Overline';

export const Display = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="display" {...props} />
));
Display.displayName = 'Display';

export const Code = React.forwardRef<HTMLElement, SpecializedProps>((props, ref) => (
  <Text ref={ref} variant="code" {...props} />
));
Code.displayName = 'Code';

export default Text;
