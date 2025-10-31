import { useState, useCallback, useEffect } from 'react';

//ALL ANIMATION RELATED PROPS AND HOOKS SHOULD GO IN THIS FILE

export interface AnimationAction {
  id?: string;
  type?: 'hover' | 'click' | 'clickHold' | 'hotKey' | 'event';
  variant?: string;
  duration?: string;
  curve?: string;
  afterDelay?: string;
  delay?: string;
  key?: string; // For hotKey type animations
}

export interface AnimateProps {
  hover?: AnimationAction | AnimationAction[] | 'none';
  click?: AnimationAction | AnimationAction[] | 'none';
  clickHold?: AnimationAction | AnimationAction[] | 'none';
  event?: string | 'none';
  duration?: string;
  curve?: string;
  afterDelay?: string;
  delay?: string;
  [key: string]: any;
}

// Allow AnimateProps to also be an array of AnimationAction for the new structure
export type AnimatePropsType = AnimateProps | AnimationAction[];

export interface UseAnimateVariantOptions {
  animate?: AnimatePropsType;
  onHover?: string;
  onClickVariant?: string;
  variants?: Record<string, any>;
  variant?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void; // Add keyboard event handler
}

/**
 * React hook to manage variant switching based on animate, onHover, and onClickVariant props.
 * Returns: [currentVariant, eventHandlers]
 */
export function useAnimateVariant(options: UseAnimateVariantOptions = {}) {
  // console.log('useAnimateVariant called with options:', options);
  const { animate, onHover, onClickVariant, variants, variant, onKeyDown } = options;
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [permanentClickVariant, setPermanentClickVariant] = useState<string | undefined>(undefined);
  const [currentAnimate, setCurrentAnimate] = useState<AnimatePropsType | undefined>(animate);
  const [delayedVariant, setDelayedVariant] = useState<string | undefined>(undefined);
  const [currentVariant, setCurrentVariant] = useState<string | undefined>(variant);

  // Helper function to get the first action from an array or single action
  const getAction = (actionOrArray: AnimationAction | AnimationAction[] | 'none' | undefined): AnimationAction | undefined => {
    if (actionOrArray === 'none' || !actionOrArray) return undefined;
    if (Array.isArray(actionOrArray)) return actionOrArray[0];
    return actionOrArray;
  };

  // Helper function to find actions by type from animation array
  const findActionsByType = (animations: AnimationAction[] | undefined, type: string): AnimationAction[] => {
    if (!animations) return [];
    return animations.filter(action => action.type === type);
  };

  // Helper function to determine if animate is an array (new structure) or object (old structure)
  const isAnimateArray = (animate: AnimatePropsType | undefined): animate is AnimationAction[] => {
    return Array.isArray(animate);
  };

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
      if (isAnimateArray(currentAnimate)) {
        // New structure: animate is an array of actions
        let applicableActions: AnimationAction[] = [];

        if (isActive) {
          applicableActions = findActionsByType(currentAnimate, 'clickHold');
          if (applicableActions.length === 0) {
            applicableActions = findActionsByType(currentAnimate, 'click');
          }
        } else if (isHovered) {
          applicableActions = findActionsByType(currentAnimate, 'hover');
        }

        if (applicableActions.length > 0) {
          newVariant = applicableActions[0].variant;
        } else if (permanentClickVariant) {
          newVariant = permanentClickVariant;
        }
      } else {
        // Old structure: animate is an object with properties
        // Check animate array first (highest priority)
        if (currentAnimate.animate) {
          let applicableActions: AnimationAction[] = [];

          if (isActive) {
            applicableActions = findActionsByType(currentAnimate.animate, 'clickHold');
            if (applicableActions.length === 0) {
              applicableActions = findActionsByType(currentAnimate.animate, 'click');
            }
          } else if (isHovered) {
            applicableActions = findActionsByType(currentAnimate.animate, 'hover');
          }

          if (applicableActions.length > 0) {
            newVariant = applicableActions[0].variant;
          } else if (permanentClickVariant) {
            newVariant = permanentClickVariant;
          } else if (currentAnimate.event && currentAnimate.event !== 'none') {
            newVariant = currentAnimate.event;
          }
        } else {
          // Fallback to individual properties for backward compatibility
          if (isActive && currentAnimate.clickHold && currentAnimate.clickHold !== 'none') {
            const action = getAction(currentAnimate.clickHold);
            if (action?.variant) {
              newVariant = action.variant;
            }
          } else if (isHovered && currentAnimate.hover && currentAnimate.hover !== 'none') {
            const action = getAction(currentAnimate.hover);
            if (action?.variant) {
              newVariant = action.variant;
            }
          } else if (permanentClickVariant) {
            newVariant = permanentClickVariant;
          } else if (currentAnimate.event && currentAnimate.event !== 'none') {
            newVariant = currentAnimate.event;
          }
        }
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
      let hasAfterDelay: string | undefined;
      let delayStr: string | undefined;

      if (isAnimateArray(currentAnimate)) {
        // For array structure, check if any action has afterDelay
        const afterDelayAction = currentAnimate.find(action => action.afterDelay);
        hasAfterDelay = afterDelayAction?.afterDelay;
        delayStr = afterDelayAction?.delay;
      } else {
        // For object structure
        hasAfterDelay = variants?.[currentVariant]?.animate?.afterDelay || currentAnimate?.afterDelay;
        delayStr = variants?.[currentVariant]?.animate?.delay || currentAnimate?.delay;
      }

      if (hasAfterDelay && delayStr) {
        const afterDelay = hasAfterDelay;
        const delayStrValue = delayStr;
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
  }, [currentVariant, currentAnimate, variants, isAnimateArray]);
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
    if (currentAnimate && !isAnimateArray(currentAnimate) && currentAnimate.click && currentAnimate.click !== 'none') {
      const clickConfig = getAction(currentAnimate.click);
      if (clickConfig?.variant) {
        const newVariant = permanentClickVariant === clickConfig.variant ? undefined : clickConfig.variant;
        setPermanentClickVariant(newVariant);
        if (newVariant && variants?.[newVariant]?.animate) {
          setCurrentAnimate(variants[newVariant].animate);
        } else {
          setCurrentAnimate(animate);
        }
      }
    }
  }, [currentAnimate, permanentClickVariant, variants, animate, getAction, isAnimateArray]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (currentAnimate) {
      let hotkeyActions: AnimationAction[] = [];

      if (isAnimateArray(currentAnimate)) {
        // New structure: currentAnimate is an array
        hotkeyActions = findActionsByType(currentAnimate, 'hotKey');
      } else if (currentAnimate.animate) {
        // Old structure: currentAnimate.animate is an array
        hotkeyActions = findActionsByType(currentAnimate.animate, 'hotKey');
      }

      const matchingAction = hotkeyActions.find(action => action.key === event.key);
      if (matchingAction?.variant) {
        setPermanentClickVariant(matchingAction.variant);
        if (variants?.[matchingAction.variant]?.animate) {
          setCurrentAnimate(variants[matchingAction.variant].animate);
        }
      }
    }
    // Call the original onKeyDown if provided
    onKeyDown?.(event);
  }, [currentAnimate, variants, onKeyDown, findActionsByType, isAnimateArray]);

  return {
    currentVariant,
    eventHandlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onKeyDown: handleKeyDown,
    },
    isHovered,
    isActive,
    permanentClickVariant,
  };
}
