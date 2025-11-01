import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { PROGRESS_BAR_VARIANTS } from './progress-bar.variants';

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
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(({
  progressValue = 0,
  max = 100,
  indeterminate = false,
  variant = 'default',
  variants = PROGRESS_BAR_VARIANTS,
  size = 'default',
  ...progressBarProps
}, ref) => {
  const percentage = Math.min(Math.max((progressValue / max) * 100, 0), 100);

  return (
    <Frame
      ref={ref}
      variant={variant}
      variants={variants}
      size={size}
      {...progressBarProps}
    >
      <Frame
        variant={indeterminate ? 'indeterminate' : 'progress'}
        variants={variants}
        size={size}
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