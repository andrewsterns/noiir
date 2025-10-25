import { useState, useCallback, useEffect } from 'react';

export interface AnimationConfig {
  destination: string;
  duration?: string;
  curve?: string;
}

export interface AnimateProps {
  hover?: string | AnimationConfig | 'none';
  click?: string | AnimationConfig | 'none';
  clickHold?: string | AnimationConfig | 'none';
  event?: string | 'none';
  duration?: string;
  curve?: string;
  [key: string]: any;
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

  // Update currentAnimate when animate prop changes
  useEffect(() => {
    setCurrentAnimate(animate);
    // Reset permanent click variant when animate changes, as the selection state may have changed externally
    setPermanentClickVariant(undefined);
  }, [animate]);

  // Compute current variant
  let currentVariant: string | undefined;
  if (currentAnimate) {
    if (isActive && currentAnimate.clickHold && currentAnimate.clickHold !== 'none') {
      currentVariant = typeof currentAnimate.clickHold === 'string' ? currentAnimate.clickHold : currentAnimate.clickHold.destination;
    } else if (isHovered && currentAnimate.hover && currentAnimate.hover !== 'none') {
      currentVariant = typeof currentAnimate.hover === 'string' ? currentAnimate.hover : currentAnimate.hover.destination;
    } else if (permanentClickVariant) {
      currentVariant = permanentClickVariant;
    } else if (currentAnimate.event && currentAnimate.event !== 'none') {
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
    // Toggle permanent click variant if animate.click is defined and not 'none'
    if (currentAnimate?.click && currentAnimate.click !== 'none') {
      const clickConfig = typeof currentAnimate.click === 'string' ? { destination: currentAnimate.click } : currentAnimate.click;
      const newVariant = permanentClickVariant === clickConfig.destination ? undefined : clickConfig.destination;
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
