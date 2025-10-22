import { useState, useCallback } from 'react';

export interface AnimateProps {
  hover?: string;
  click?: string;
  clickHold?: string;
  event?: string;
  [key: string]: string | undefined;
}

export interface UseAnimateVariantOptions {
  animate?: AnimateProps;
  onHover?: string;
  onClickVariant?: string;
  variants?: Record<string, any>;
}

/**
 * React hook to manage variant switching based on animate, onHover, and onClickVariant props.
 * Returns: [currentVariant, eventHandlers]
 */
export function useAnimateVariant(options: UseAnimateVariantOptions = {}) {
  const { animate, onHover, onClickVariant, variants } = options;
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [permanentClickVariant, setPermanentClickVariant] = useState<string | undefined>(undefined);
  const [currentAnimate, setCurrentAnimate] = useState<AnimateProps | undefined>(animate);

  // Compute current variant
  let currentVariant: string | undefined;
  if (currentAnimate) {
    if (isActive && currentAnimate.clickHold) {
      currentVariant = currentAnimate.clickHold;
    } else if (isHovered && currentAnimate.hover) {
      currentVariant = currentAnimate.hover;
    } else if (permanentClickVariant) {
      currentVariant = permanentClickVariant;
    } else if (currentAnimate.event) {
      currentVariant = currentAnimate.event;
    }
  } else if (isActive && onClickVariant) {
    currentVariant = onClickVariant;
  } else if (isHovered && onHover) {
    currentVariant = onHover;
  }
  // Event handlers to update state
  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
  }, []);
  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(false);
    setIsActive(false);
  }, []);
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsActive(true);
  }, []);
  const handleMouseUp = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsActive(false);
    // Toggle permanent click variant if animate.click is defined
    if (currentAnimate?.click) {
      const newVariant = permanentClickVariant === currentAnimate.click ? undefined : currentAnimate.click;
      setPermanentClickVariant(newVariant);
      if (newVariant && variants?.[newVariant]?.animate) {
        setCurrentAnimate(variants[newVariant].animate);
      } else {
        setCurrentAnimate(animate);
      }
    }
  }, [currentAnimate?.click, permanentClickVariant, variants, animate]);

  return {
    currentVariant,
    eventHandlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    },
    isHovered,
    isActive,
    permanentClickVariant,
  };
}
