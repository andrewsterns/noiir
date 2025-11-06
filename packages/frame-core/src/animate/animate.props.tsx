// src/components/frame/frame-properties/animate/animate.tsx
import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';

export type TransitionTrigger = 'click' | 'hover' | 'mouseEnter' | 'mouseLeave' | 'mouseDown' | 'mouseUp' | 'grab' | 'key' | 'hotKey' | 'delay' | 'close' | 'listen' | (() => void);

export type AnimationAction = 
  | 'none'
  | 'changeTo'      // Change to a specific variant
  | 'back'          // Navigate back in history
  | 'scrollTo'      // Scroll to a specific element
  | 'openLink'      // Open a URL
  | 'openOverlay'   // Open an overlay/modal
  | 'swapOverlay'   // Swap one overlay for another
  | 'closeOverlay'  // Close an overlay/modal
  | ((data?: any) => void); // Custom function action

export interface FrameAnimation {
  trigger: TransitionTrigger;
  action?: AnimationAction; // Action to perform (default: 'none')
  sourceId?: string; // Optional: only trigger if event comes from this Frame ID
  targetId?: string; // Optional: ID of the Frame to target (defaults to source if not provided)
  toggleVariants?: string[]; // Array of variants to toggle through
  toggle?: boolean; // If true, cycle through toggleVariants
  toVariant?: string | object; // Direct variant to set (string name or variant object)
  fromVariant?: string | object; // Only apply if current variant matches this (string name or variant object)
  delay?: string | number | (() => string | number); // Delay before animation starts (number in ms, string like '1s', or function)
  duration?: string | number | (() => string | number); // Duration of animation (number in ms, string like '1s', or function)
  curve?: string | ((...args: any[]) => string); // Easing curve (string or function)
  key?: string; // For 'key' and 'hotKey' events
  hotKey?: string; // Alternative to key for hotKey events
  listenId?: string; // For 'listen' trigger: the ID of the Frame to listen to
  listenVariant?: string; // For 'listen' trigger: the variant to listen for
  
  // Action-specific properties
  url?: string; // For 'openLink' action
  overlayId?: string; // For 'openOverlay', 'swapOverlay', 'closeOverlay' actions
  scrollTargetId?: string; // For 'scrollTo' action
  scrollBehavior?: 'auto' | 'smooth'; // For 'scrollTo' action (default: 'smooth')
}

export type Animate = FrameAnimation[];

// Legacy type alias for backwards compatibility
export type AnimateRule = FrameAnimation;
export type EventType = TransitionTrigger;

interface AnimateContextType {
  registerFrame: (id: string, initialVariant: string) => void;
  unregisterFrame: (id: string) => void;
  getVariant: (id: string) => string;
  getVisualVariant: (id: string) => string;
  registerAnimations: (animations: Animate) => void;
  unregisterAnimations: (animations: Animate) => void;
  emitEvent: (sourceId: string, trigger: TransitionTrigger, eventData?: any) => void;
  getAnimationsForFrame: (frameId: string) => Animate;
}

const AnimateContext = createContext<AnimateContextType | null>(null);

export const useAnimateContext = () => {
  const context = useContext(AnimateContext);
  if (!context) {
    throw new Error('useAnimateContext must be used within an AnimateProvider');
  }
  return context;
};

// Helper function to parse delay/duration strings
export const parseTime = (time: string | number | (() => string | number)): number => {
  // Resolve function first
  if (typeof time === 'function') {
    time = time();
  }
  
  if (typeof time === 'number') return time;
  
  const match = time.toString().match(/^(\d+(?:\.\d+)?)(s|ms)?$/);
  if (!match) return 0;
  
  const value = parseFloat(match[1]);
  const unit = match[2];
  
  if (unit === 's') return value * 1000;
  if (unit === 'ms') return value;
  return value; // Assume milliseconds if no unit
};

// Helper function to resolve curve (can be string or function)
export const resolveCurve = (curve?: string | ((...args: any[]) => string)): string => {
  if (!curve) return 'ease';
  if (typeof curve === 'function') return curve();
  return curve;
};

// Helper function to resolve variant (can be string or object)
// For now, if it's an object, we'll need to handle it differently
// This is a placeholder - you may want to expand this based on your needs
export const resolveVariant = (variant: string | object | undefined): string => {
  if (!variant) return '';
  if (typeof variant === 'string') return variant;
  // If it's an object, you might want to serialize it or handle it specially
  // For now, we'll just return a string representation
  return JSON.stringify(variant);
};

// Helper function to execute actions
export const executeAction = (action: AnimationAction | undefined, animation: FrameAnimation): void => {
  console.log('[executeAction] Called with:', { action, animation });
  
  if (!action || action === 'none') {
    console.log('[executeAction] No action to execute (none or undefined)');
    return;
  }
  
  // If action is a function, execute it
  if (typeof action === 'function') {
    console.log('[executeAction] Executing custom function');
    action(animation);
    return;
  }
  
  console.log('[executeAction] Executing built-in action:', action);
  
  // Handle built-in actions
  switch (action) {
    case 'changeTo':
      // Handled by the existing variant change logic
      console.log('[executeAction] changeTo - handled by variant logic');
      break;
      
    case 'back':
      // Navigate back in browser history
      console.log('[executeAction] Navigating back in history');
      window.history.back();
      break;
      
    case 'scrollTo':
      // Scroll to a specific element
      console.log('[executeAction] scrollTo:', animation.scrollTargetId);
      if (animation.scrollTargetId) {
        const element = document.getElementById(animation.scrollTargetId);
        console.log('[executeAction] Found element:', element);
        if (element) {
          element.scrollIntoView({ 
            behavior: animation.scrollBehavior || 'smooth',
            block: 'start'
          });
        } else {
          console.warn('[executeAction] Element not found:', animation.scrollTargetId);
        }
      } else {
        console.warn('[executeAction] No scrollTargetId provided');
      }
      break;
      
    case 'openLink':
      // Open a URL
      console.log('[executeAction] openLink:', animation.url);
      if (animation.url) {
        window.open(animation.url, '_blank');
      } else {
        console.warn('[executeAction] No URL provided');
      }
      break;
      
    case 'openOverlay':
      // Open an overlay/modal (to be implemented by consumer)
      console.log('[executeAction] openOverlay:', animation.overlayId);
      if (animation.overlayId) {
        // Emit a custom event that can be listened to by overlay system
        window.dispatchEvent(new CustomEvent('noiir:openOverlay', { 
          detail: { overlayId: animation.overlayId } 
        }));
      }
      break;
      
    case 'swapOverlay':
      // Swap overlays (to be implemented by consumer)
      console.log('[executeAction] swapOverlay:', animation.overlayId);
      if (animation.overlayId) {
        window.dispatchEvent(new CustomEvent('noiir:swapOverlay', { 
          detail: { overlayId: animation.overlayId } 
        }));
      }
      break;
      
    case 'closeOverlay':
      // Close overlay (to be implemented by consumer)
      console.log('[executeAction] closeOverlay:', animation.overlayId);
      if (animation.overlayId) {
        window.dispatchEvent(new CustomEvent('noiir:closeOverlay', { 
          detail: { overlayId: animation.overlayId } 
        }));
      }
      break;
      
    default:
      console.warn(`[executeAction] Unknown action: ${action}`);
  }
};

export const AnimateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // frames: stores the logical variant (base state)
  // visualFrames: stores the visual variant (can be hover, etc.)
  const [frames, setFrames] = useState<Record<string, string>>({});
  const [visualFrames, setVisualFrames] = useState<Record<string, string>>({});
  const [allAnimations, setAllAnimations] = useState<Animate>([]);
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const registerFrame = useCallback((id: string, initialVariant: string) => {
    setFrames(prev => ({ ...prev, [id]: initialVariant }));
  }, []);

  const unregisterFrame = useCallback((id: string) => {
    setFrames(prev => {
      const newFrames = { ...prev };
      delete newFrames[id];
      return newFrames;
    });
  }, []);

  // getVariant: returns the logical variant (base state)
  const getVariant = useCallback((id: string) => frames[id] || '', [frames]);
  // getVisualVariant: returns the visual variant (hover, etc.)
  const getVisualVariant = useCallback((id: string) => visualFrames[id] || frames[id] || '', [visualFrames, frames]);

  const registerAnimations = useCallback((animate: Animate) => {
    // Split 'hover' events into 'mouseEnter' and 'mouseLeave'
    const expandedAnimate = animate.flatMap((t: FrameAnimation) => {
      if (t.trigger === 'hover') {
        // Create two rules: one for mouseEnter, one for mouseLeave
        return [
          { ...t, trigger: 'mouseEnter' as TransitionTrigger },
          { ...t, trigger: 'mouseLeave' as TransitionTrigger }
        ];
      }
      return [t];
    });
    
    setAllAnimations(prev => [...prev, ...expandedAnimate]);
  }, []);

  const unregisterAnimations = useCallback((animate: Animate) => {
    // Split 'hover' events the same way for matching
    const expandedAnimate = animate.flatMap((t: FrameAnimation) => {
      if (t.trigger === 'hover') {
        return [
          { ...t, trigger: 'mouseEnter' as TransitionTrigger },
          { ...t, trigger: 'mouseLeave' as TransitionTrigger }
        ];
      }
      return [t];
    });
    
    setAllAnimations(prev => prev.filter(t => !expandedAnimate.some(rt => rt === t)));
  }, []);

  const applyAnimationRef = useRef<(rule: FrameAnimation, sourceId?: string) => boolean | undefined>();

  const emitEvent = useCallback((sourceId: string, triggerType: TransitionTrigger, eventData?: any) => {
    console.log('[emitEvent] Called with:', { sourceId, triggerType, eventData });
    
    // Handle grab event as mouseDown (initiates drag)
    // The corresponding mouseUp will end the drag state
    let effectiveTrigger = triggerType;
    if (triggerType === 'grab') {
      effectiveTrigger = 'mouseDown';
    }

    console.log('[emitEvent] Effective trigger:', effectiveTrigger);
    console.log('[emitEvent] All animations count:', allAnimations.length);

    // Handle mouseEnter and mouseLeave as distinct events
    if (effectiveTrigger === 'mouseEnter' || effectiveTrigger === 'mouseLeave') {
      const relevant = allAnimations.filter(rule =>
        rule.trigger === effectiveTrigger && (!rule.sourceId || rule.sourceId === sourceId)
      );

      if (relevant.length === 0) return;

      // Group rules by targetId (or sourceId if no targetId)
      const byTarget: Record<string, FrameAnimation[]> = {};
      relevant.forEach(rule => {
        const tId = rule.targetId || sourceId || '__global';
        byTarget[tId] = byTarget[tId] || [];
        byTarget[tId].push(rule);
      });

      Object.keys(byTarget).forEach(tId => {
        const rules = byTarget[tId];
        // Only apply the FIRST matching transition
        for (const r of rules) {
          if (typeof r.trigger === 'function') continue;
          if (applyAnimationRef.current) {
            const applied = applyAnimationRef.current(r, sourceId);
            if (applied) {
              // Stop after first successful transition
              break;
            }
          }
        }
      });
      return;
    }

    // Default event handling for all other events
    let relevant;
    if (effectiveTrigger === 'listen') {
      relevant = allAnimations.filter(rule =>
        rule.trigger === 'listen' && rule.listenId === eventData.listenId && rule.listenVariant === eventData.listenVariant
      );
    } else {
      relevant = allAnimations.filter(rule =>
        rule.trigger === effectiveTrigger && (!rule.sourceId || rule.sourceId === sourceId)
      );
    }

    if (relevant.length === 0) return;

    const byTarget: Record<string, FrameAnimation[]> = {};
    relevant.forEach(rule => {
      const tId = rule.targetId || sourceId || '__global';
      byTarget[tId] = byTarget[tId] || [];
      byTarget[tId].push(rule);
    });

    Object.keys(byTarget).forEach(tId => {
      const rules = byTarget[tId];
      const filtered = rules.filter(rule => {
        if ((effectiveTrigger === 'key' || effectiveTrigger === 'hotKey') && rule.key && eventData?.key !== rule.key) return false;
        if ((effectiveTrigger === 'key' || effectiveTrigger === 'hotKey') && rule.hotKey && eventData?.key !== rule.hotKey) return false;
        return true;
      });
      if (filtered.length === 0) return;
      const explicit = filtered.filter(r => !r.toggle);
      const toggles = filtered.filter(r => r.toggle);
      let explicitApplied = false;
      for (const r of explicit) {
        if (typeof r.trigger === 'function') continue;
        if (applyAnimationRef.current) {
          const applied = applyAnimationRef.current(r, sourceId);
          if (applied) explicitApplied = true;
        }
      }
      if (!explicitApplied) {
        for (const r of toggles) {
          if (typeof r.trigger === 'function') continue;
          if (applyAnimationRef.current) {
            applyAnimationRef.current(r, sourceId);
          }
        }
      }
    });
  }, [allAnimations]);

  const applyAnimation = useCallback((rule: FrameAnimation, sourceId?: string) => {
    console.log('[applyAnimation] Called with:', { rule, sourceId });
    
    const targetId = rule.targetId || sourceId;
    if (!targetId) {
      console.log('[applyAnimation] No targetId, returning false');
      return false;
    }

    const isHover = rule.trigger === 'mouseEnter' || rule.trigger === 'mouseLeave';
    console.log('[applyAnimation] isHover:', isHover, 'trigger:', rule.trigger);

    if (isHover) {
      // For hover: check if rule matches BEFORE updating state
      const currentVisual = visualFrames[targetId] || frames[targetId];
      const fromVariantResolved = resolveVariant(rule.fromVariant);

      if (rule.fromVariant && currentVisual !== fromVariantResolved) {
        return false;
      }

      const newVariant = resolveVariant(rule.toVariant);
      if (!newVariant) return false;
      
      // Execute action if specified
      console.log('[applyAnimation] Hover - executing action:', rule.action);
      executeAction(rule.action, rule);
      
      // Update visual frames
      setVisualFrames(prev => ({ ...prev, [targetId]: newVariant }));
      return true;
    } else {
      // For click/grab/mouseDown/mouseUp: update logical frames and clear visual frames
      let applied = false;
      let newVariant: string | undefined;
      
      // Check if we should execute action BEFORE setFrames to avoid closure issues
      const shouldExecuteAction = !!(rule.action && rule.action !== 'none');
      console.log('[applyAnimation] Pre-check shouldExecuteAction:', shouldExecuteAction, 'action:', rule.action);
      
      setFrames(prev => {
        const currentLogical = prev[targetId];
        const fromVariantResolved = resolveVariant(rule.fromVariant);

        console.log('[applyAnimation] setFrames - currentLogical:', currentLogical, 'fromVariant:', rule.fromVariant, 'fromVariantResolved:', fromVariantResolved);

        if (rule.fromVariant && currentLogical !== fromVariantResolved) {
          console.log('[applyAnimation] fromVariant mismatch, returning early');
          return prev;
        }

        if (rule.toVariant) {
          newVariant = resolveVariant(rule.toVariant);
          console.log('[applyAnimation] Has toVariant:', newVariant);
        } else if (rule.toggle && rule.toggleVariants) {
          const index = rule.toggleVariants.indexOf(currentLogical);
          newVariant = index !== -1 
            ? rule.toggleVariants[(index + 1) % rule.toggleVariants.length]
            : rule.toggleVariants[0];
          console.log('[applyAnimation] Has toggle, newVariant:', newVariant);
        }

        // Only update variant if we have a newVariant
        if (newVariant && newVariant !== currentLogical) {
          applied = true;
          console.log('[applyAnimation] Variant changed, updating state');

          // Schedule listen event after state update
          setTimeout(() => emitEvent(targetId, 'listen', { listenId: targetId, listenVariant: newVariant }), 0);

          return { ...prev, [targetId]: newVariant };
        }

        console.log('[applyAnimation] No variant change, returning prev');
        return prev;
      });

      // Execute action AFTER state updates (outside of setState callback)
      console.log('[applyAnimation] Non-hover - shouldExecuteAction:', shouldExecuteAction, 'action:', rule.action);
      if (shouldExecuteAction) {
        executeAction(rule.action, rule);
      }

      // Clear visual state
      setVisualFrames(prev => {
        if (prev[targetId]) {
          const copy = { ...prev };
          delete copy[targetId];
          return copy;
        }
        return prev;
      });

      return applied;
    }
  }, [frames, visualFrames, emitEvent]);

  applyAnimationRef.current = applyAnimation;

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Emit hotKey events for any registered hotKey Animate
      allAnimations.forEach(rule => {
        if (rule.trigger === 'hotKey' && (rule.key === e.key || rule.hotKey === e.key)) {
          applyAnimation(rule, rule.sourceId || 'global');
        }
      });
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [allAnimations, applyAnimation]);

  const getAnimationsForFrame = useCallback((frameId: string) => {
    return allAnimations.filter(t => t.targetId === frameId);
  }, [allAnimations]);

  const contextValue: AnimateContextType = useMemo(() => ({
    registerFrame,
    unregisterFrame,
    getVariant,
    registerAnimations,
    unregisterAnimations,
    emitEvent,
    getAnimationsForFrame,
    // Expose getVisualVariant for consumers if needed
    getVisualVariant,
  }), [registerFrame, unregisterFrame, getVariant, registerAnimations, unregisterAnimations, emitEvent, getAnimationsForFrame, getVisualVariant]);

  return (
    <AnimateContext.Provider value={contextValue}>
      {children}
    </AnimateContext.Provider>
  );
};
