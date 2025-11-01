import React, { useState, useRef } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { TOOLTIP_VARIANTS } from './tooltip.variants';

/**
 * Tooltip Component
 *
 * A tooltip component built using Frame that displays content on hover/focus.
 * Supports different positions and animations.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see TOOLTIP_VARIANTS in tooltip.variants.tsx for available variants
 */

export interface TooltipProps extends Omit<FrameProps, 'position'> {
  content: React.ReactNode;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'focus' | 'click';
  delay?: number;
  variant?: string;
  children: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({
  content,
  tooltipPosition = 'top',
  trigger = 'hover',
  delay = 300,
  variant = 'default',
  variants = TOOLTIP_VARIANTS,
  children,
  ...tooltipProps
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') showTooltip();
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') hideTooltip();
  };

  const handleFocus = () => {
    if (trigger === 'focus') showTooltip();
  };

  const handleBlur = () => {
    if (trigger === 'focus') hideTooltip();
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const tooltipVariant = `${variant}-${tooltipPosition}`;

  return (
    <Frame
      ref={ref}
      {...tooltipProps}
    >
      <Frame
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        tabIndex={trigger === 'focus' ? 0 : undefined}
      >
        {children}
      </Frame>

      {isVisible && (
        <Frame
          variant={tooltipVariant}
          variants={variants}
          position={{
            x: tooltipPosition === 'left' ? -8 : tooltipPosition === 'right' ? 8 : 0,
            y: tooltipPosition === 'top' ? -8 : tooltipPosition === 'bottom' ? 8 : 0,
          }}
        >
          {content}
        </Frame>
      )}
    </Frame>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;