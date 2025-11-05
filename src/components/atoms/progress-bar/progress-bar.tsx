import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { PROGRESS_BAR_SIZES, PROGRESS_BAR_VARIANTS } from '../../../../__variants__/atoms/progress-bar/progress-bar.variants';

/**
 * Progress Bar Component
 *
 * A progress bar component built using Frame with support for determinate and indeterminate states.
 * Uses Frame's layout and appearance properties for consistent styling.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see PROGRESS_BAR_VARIANTS in progress-bar.variants.tsx for available variants
 */

export interface ProgressBarProps extends Omit<FrameProps, 'value'> {
  progressValue?: number;
  max?: number;
  indeterminate?: boolean;
  variant?: string;
  variants?: Record<string, any>;
  size?: any;
  sizes?: Record<string, any>;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(({
  progressValue = 0,
  max = 100,
  indeterminate = false,
  variant = 'default',
  variants: customVariants,
  size = '2',
  sizes: customSizes,
  ...progressBarProps
}, ref) => {
  const variants = customVariants || PROGRESS_BAR_VARIANTS;
  const sizes = customSizes || PROGRESS_BAR_SIZES;
  const percentage = Math.min(Math.max((progressValue / max) * 100, 0), 100);

  return (
    <Frame
      ref={ref}
      variant={variant}
      variants={variants}
      size={size}
      sizes={sizes}
      {...progressBarProps}
    >
      <Frame
        variant={indeterminate ? 'indeterminate' : 'progress'}
        variants={variants}
        size={size}
        sizes={sizes}
        autoLayout={{
          width: indeterminate ? 'fill-container' : `${percentage}%`,
          height: 'fill-container'
        }}
        {...progressBarProps}
      />
    </Frame>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;

