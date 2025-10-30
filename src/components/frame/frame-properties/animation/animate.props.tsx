import { useState, useCallback, useEffect } from 'react';

export interface AnimationAction {
  id?: string;
  variant?: string;
  duration?: string;
  curve?: string;
  afterDelay?: string;
  delay?: string;
}

export interface AnimateProps {
  hover?: AnimationAction | 'none';
  click?: AnimationAction | 'none';
  clickHold?: AnimationAction | 'none';
  event?: string | 'none';
  duration?: string;
  curve?: string;
  afterDelay?: string;
  delay?: string;
  [key: string]: any;
}

export interface UseAnimateVariantOptions {
  animate?: AnimateProps;
  onHover?: string;
  onClickVariant?: string;
  variants?: Record<string, any>;
  variant?: string;
}

/**
 * React hook to manage variant switching based on animate, onHover, and onClickVariant props.
 * Returns: [currentVariant, eventHandlers]
 */
export function useAnimateVariant(options: UseAnimateVariantOptions = {}) {
  // console.log('useAnimateVariant called with options:', options);
  const { animate, onHover, onClickVariant, variants, variant } = options;
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [permanentClickVariant, setPermanentClickVariant] = useState<string | undefined>(undefined);
  const [currentAnimate, setCurrentAnimate] = useState<AnimateProps | undefined>(animate);
  const [delayedVariant, setDelayedVariant] = useState<string | undefined>(undefined);
  const [currentVariant, setCurrentVariant] = useState<string | undefined>(variant);

  // Update currentAnimate when animate prop changes
  useEffect(() => {
    setCurrentAnimate(animate);
    // Reset permanent click variant when animate changes, as the selection state may have changed externally
    setPermanentClickVariant(undefined);
    setDelayedVariant(undefined);
  }, [animate]);

  // Update currentVariant when dependencies change
  useEffect(() => {
    let newVariant: string | undefined = delayedVariant || variant;
    if (currentAnimate) {
      if (isActive && currentAnimate.clickHold && currentAnimate.clickHold !== 'none') {
        const action = typeof currentAnimate.clickHold === 'string' ? { variant: currentAnimate.clickHold } : currentAnimate.clickHold;
        if (action.variant) {
          newVariant = action.variant;
        }
      } else if (isHovered && currentAnimate.hover && currentAnimate.hover !== 'none') {
        const action = typeof currentAnimate.hover === 'string' ? { variant: currentAnimate.hover } : currentAnimate.hover;
        if (action.variant) {
          newVariant = action.variant;
        }
      } else if (permanentClickVariant) {
        newVariant = permanentClickVariant;
      } else if (currentAnimate.event && currentAnimate.event !== 'none') {
        newVariant = currentAnimate.event;
      }
    } else if (isActive && onClickVariant) {
      newVariant = onClickVariant;
    } else if (isHovered && onHover) {
      newVariant = onHover;
    }
    setCurrentVariant(newVariant);
  }, [variant, delayedVariant, currentAnimate, isHovered, isActive, permanentClickVariant, onClickVariant, onHover]);

  // Handle afterDelay animation
  useEffect(() => {
    // console.log('afterDelay useEffect running, currentVariant:', currentVariant, 'currentAnimate:', currentAnimate, 'variants:', variants);
    if (currentVariant) {
      const hasAfterDelay = variants?.[currentVariant]?.animate?.afterDelay || currentAnimate?.afterDelay;
      const delayStr = variants?.[currentVariant]?.animate?.delay || currentAnimate?.delay;
      if (hasAfterDelay && delayStr) {
        const afterDelay = hasAfterDelay;
        const delayStrValue = (currentAnimate?.delay || variants?.[currentVariant]?.animate?.delay)!;
        let delayMs: number;
        if (!delayStrValue || delayStrValue.trim() === '') {
          delayMs = 0; // Default to 0 if blank
        } else if (delayStrValue.endsWith('ms')) {
          delayMs = parseFloat(delayStrValue.slice(0, -2)) || 0;
        } else if (delayStrValue.endsWith('s')) {
          delayMs = (parseFloat(delayStrValue.slice(0, -1)) || 0) * 1000;
        } else {
          // Assume seconds if no unit
          delayMs = (parseFloat(delayStrValue) || 0) * 1000;
        }
        if (delayMs > 0) {
          // console.log(`Setting afterDelay timeout for ${currentVariant} to ${afterDelay} in ${delayMs}ms`);
          const timeoutId = setTimeout(() => {
            // console.log(`Switching from ${currentVariant} to ${afterDelay} via afterDelay`);
            setDelayedVariant(afterDelay);
          }, delayMs);
          return () => clearTimeout(timeoutId);
        } else {
          // If delay is 0, switch immediately
          // console.log(`Switching immediately from ${currentVariant} to ${afterDelay} (delay 0)`);
          setDelayedVariant(afterDelay);
        }
      } else {
        setDelayedVariant(undefined);
      }
    } else {
      setDelayedVariant(undefined);
    }
  }, [currentVariant, currentAnimate, variants]);
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
    // Toggle permanent click variant if animate.click is defined and not 'none' and has variant
    if (currentAnimate?.click && currentAnimate.click !== 'none') {
      const clickConfig = typeof currentAnimate.click === 'string' ? { variant: currentAnimate.click } : currentAnimate.click;
      if (clickConfig.variant) {
        const newVariant = permanentClickVariant === clickConfig.variant ? undefined : clickConfig.variant;
        setPermanentClickVariant(newVariant);
        if (newVariant && variants?.[newVariant]?.animate) {
          setCurrentAnimate(variants[newVariant].animate);
        } else {
          setCurrentAnimate(animate);
        }
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
