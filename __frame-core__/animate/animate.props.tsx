// src/components/frame/frame-properties/animate/animate.tsx
import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';

export type TransitionTrigger = 'click' | 'hover' | 'mouseEnter' | 'mouseLeave' | 'mouseDown' | 'mouseUp' | 'grab' | 'key' | 'hotKey' | 'delay' | 'close' | 'listen' | 'focus' | 'blur' | 'afterDelay' | (() => void);

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

export type Animate = AnimateDSL[];

// New DSL types for cleaner animate prop
export interface AnimateAction {
  action?: AnimationAction; // Explicit action (optional; can be inferred from other properties)
  toVariant?: string; // 'id.variant' shorthand or full object
  fromVariant?: string; // 'id.variant' shorthand for condition
  targetId?: string; // Explicit target (optional; parsed from shorthand)
  duration?: string | number;
  curve?: string;
  delay?: string | number; // For afterDelay
  toggleVariant?: string[]; // Array of 'id.variant' for cycling
  scrollTo?: string; // Target ID to scroll to
  scrollBehavior?: 'auto' | 'smooth';
  key?: string; // For hotKey/onKey
  url?: string; // For openLink
  overlayId?: string; // For overlays
}

export type AnimateDSL = {
  onHover?: string | AnimateAction;
  onClick?: string | AnimateAction;
  mouseEnter?: string | AnimateAction;
  mouseLeave?: string | AnimateAction;
  mouseDown?: string | AnimateAction;
  mouseUp?: string | AnimateAction;
  onFocus?: string | AnimateAction;
  onBlur?: string | AnimateAction;
  afterDelay?: string | AnimateAction;
  onScroll?: string | AnimateAction;
  hotKey?: string | AnimateAction;
  onKey?: string | AnimateAction;
  listen?: { listenId: string; listenVariant: string } & AnimateAction;
  whileHovering?: string | AnimateAction;
  whilePressing?: string | AnimateAction;
  // Add more triggers as needed
};

// Legacy type alias for backwards compatibility
export type AnimateRule = FrameAnimation;
export type EventType = TransitionTrigger;

interface AnimateContextType {
  registerFrame: (id: string, parent: string | null, initialVariant: string) => void;
  unregisterFrame: (id: string) => void;
  getVariant: (id: string) => string;
  getVisualVariant: (id: string) => string;
  registerAnimations: (frameId: string, animations: Animate) => void;
  unregisterAnimations: (frameId: string, animations: Animate) => void;
  emitEvent: (sourceId: string, trigger: TransitionTrigger, eventData?: any) => void;
  getAnimationsForFrame: (frameId: string) => Animate;
  getAnimationProps: (frameId: string) => { duration?: string; delay?: string; curve?: string } | null;
}

const AnimateContext = createContext<AnimateContextType | null>(null);

export const useAnimateContext = () => {
  const context = useContext(AnimateContext);
  if (!context) {
    throw new Error('useAnimateContext must be used within an AnimateProvider');
  }
  return context;
};

const ParentContext = createContext<string | null>(null);

export const useParent = () => useContext(ParentContext);
export { ParentContext };

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
// Now handles shorthand 'group.frame.variant' or 'frame.variant' -> { targetId: 'frame', variantName: 'variant' }
export const resolveVariant = (variant: string | object | undefined, defaultTargetId?: string): { targetId?: string; variantName: string | object } => {
  if (!variant) return { variantName: '' };
  if (typeof variant === 'string') {
    const parts = variant.split('.');
    if (parts.length >= 2) {
      // For hierarchical paths like 'grandparent.parent.child.variant'
      // The last part is always the variant name
      // Everything before the last dot is the target path
      const variantName = parts[parts.length - 1];
      const targetPath = parts.slice(0, -1).join('.');
      return { targetId: targetPath, variantName };
    }
    // No '.', use as variant name (with optional default targetId)
    return { targetId: defaultTargetId, variantName: variant };
  }
  // Object: return as-is
  return { targetId: defaultTargetId, variantName: variant };
};

// Parser to convert DSL to FrameAnimation[]
export const parseAnimateDSL = (dsl: AnimateDSL): FrameAnimation[] => {
  console.log('[parseAnimateDSL] Called with dsl:', dsl);
  const rules: FrameAnimation[] = [];

  // Helper function to extract targetId and resolve variants from action
  const processAction = (action: string | AnimateAction) => {
    console.log('[processAction] Processing action:', action);
    const resolvedAction = typeof action === 'string' ? { toVariant: action } : action;
    
    // Resolve all variant references
    const toResolved = resolveVariant(resolvedAction.toVariant);
    const fromResolved = resolveVariant(resolvedAction.fromVariant);
    
    // Resolve toggleVariant array
    const toggleVariantsResolved = resolvedAction.toggleVariant?.map(v => {
      const { variantName } = resolveVariant(v);
      return variantName as string;
    }) || [];
    
    // Extract targetId from any shorthand reference (prioritize toVariant, then fromVariant, then first toggleVariant)
    const targetId = toResolved.targetId || fromResolved.targetId || 
                    (resolvedAction.toggleVariant ? resolveVariant(resolvedAction.toggleVariant[0]).targetId : undefined) ||
                    resolvedAction.targetId;
    
    console.log('[processAction] Resolved targetId:', targetId, 'toVariant:', toResolved.variantName);
    
    // Infer action if not explicitly set
    let inferredAction = resolvedAction.action;
    if (!inferredAction) {
      if (resolvedAction.url) {
        inferredAction = 'openLink';
      } else if (resolvedAction.scrollTo) {
        inferredAction = 'scrollTo';
      } else if (resolvedAction.overlayId) {
        // Could be openOverlay, swapOverlay, or closeOverlay - default to openOverlay
        inferredAction = 'openOverlay';
      } else {
        inferredAction = 'changeTo';
      }
    }
    
    return {
      targetId,
      toVariant: toResolved.variantName,
      fromVariant: fromResolved.variantName,
      toggleVariants: toggleVariantsResolved,
      toggle: !!resolvedAction.toggleVariant,
      duration: resolvedAction.duration,
      curve: resolvedAction.curve,
      delay: resolvedAction.delay,
      key: resolvedAction.key,
      scrollTo: resolvedAction.scrollTo,
      scrollBehavior: resolvedAction.scrollBehavior,
      url: resolvedAction.url,
      overlayId: resolvedAction.overlayId,
      action: inferredAction,
    };
  };

  if (dsl.onHover) {
    const processed = processAction(dsl.onHover);
    
    // Create mouseEnter rule
    rules.push({
      trigger: 'mouseEnter',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      fromVariant: processed.fromVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
    
    // Create mouseLeave rule to revert (if fromVariant is specified)
    if (processed.fromVariant) {
      rules.push({
        trigger: 'mouseLeave',
        targetId: processed.targetId,
        toVariant: processed.fromVariant,
        fromVariant: processed.toVariant,
        toggleVariants: processed.toggleVariants,
        toggle: processed.toggle,
        duration: processed.duration,
        curve: processed.curve,
        action: processed.action,
        url: processed.url,
        overlayId: processed.overlayId,
        scrollTargetId: processed.scrollTo,
        scrollBehavior: processed.scrollBehavior,
      });
    }
  }

  if (dsl.onClick) {
    const processed = processAction(dsl.onClick);
    rules.push({
      trigger: 'click',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      fromVariant: processed.fromVariant,
      duration: processed.duration,
      curve: processed.curve,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.afterDelay) {
    const processed = processAction(dsl.afterDelay);
    rules.push({
      trigger: 'afterDelay',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      delay: processed.delay || '0s',
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.onFocus) {
    const processed = processAction(dsl.onFocus);
    rules.push({
      trigger: 'focus',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.onBlur) {
    const processed = processAction(dsl.onBlur);
    rules.push({
      trigger: 'blur',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.hotKey) {
    const processed = processAction(dsl.hotKey);
    rules.push({
      trigger: 'hotKey',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      key: processed.key,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.onKey) {
    const processed = processAction(dsl.onKey);
    rules.push({
      trigger: 'key',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      key: processed.key,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.mouseEnter) {
    const processed = processAction(dsl.mouseEnter);
    rules.push({
      trigger: 'mouseEnter',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.mouseLeave) {
    const processed = processAction(dsl.mouseLeave);
    rules.push({
      trigger: 'mouseLeave',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.mouseDown) {
    const processed = processAction(dsl.mouseDown);
    rules.push({
      trigger: 'mouseDown',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      fromVariant: processed.fromVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.mouseUp) {
    const processed = processAction(dsl.mouseUp);
    rules.push({
      trigger: 'mouseUp',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      fromVariant: processed.fromVariant,
      toggleVariants: processed.toggleVariants,
      toggle: processed.toggle,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  if (dsl.listen) {
    const action = dsl.listen;
    const processed = processAction(action);
    rules.push({
      trigger: 'listen',
      targetId: processed.targetId,
      toVariant: processed.toVariant,
      listenId: action.listenId,
      listenVariant: action.listenVariant,
      duration: processed.duration,
      curve: processed.curve,
      action: processed.action,
      url: processed.url,
      overlayId: processed.overlayId,
      scrollTargetId: processed.scrollTo,
      scrollBehavior: processed.scrollBehavior,
    });
  }

  // Add whileHovering, etc., similarly

  return rules;
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
  // frames: stores the logical variant (base state) with parent
  const [frames, setFrames] = useState<Record<string, { variant: string; parent: string | null }>>({});
  const [visualFrames, setVisualFrames] = useState<Record<string, string>>({});
  const [allAnimations, setAllAnimations] = useState<FrameAnimation[]>([]);
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const registerFrame = useCallback((id: string, parent: string | null, initialVariant: string) => {
    console.log('[AnimateProvider] registerFrame called:', { id, parent, initialVariant });
    setFrames(prev => {
      const newFrames = { ...prev, [id]: { variant: initialVariant, parent } };
      console.log('[AnimateProvider] Updated frames after registration:', newFrames);
      return newFrames;
    });
  }, []);

  const unregisterFrame = useCallback((id: string) => {
    setFrames(prev => {
      const newFrames = { ...prev };
      delete newFrames[id];
      return newFrames;
    });
  }, []);

  // getVariant: returns the logical variant (base state)
  const getVariant = useCallback((id: string) => frames[id]?.variant || '', [frames]);
  // getVisualVariant: returns the visual variant (hover, etc.)
  const getVisualVariant = useCallback((id: string) => visualFrames[id] || frames[id]?.variant || '', [visualFrames, frames]);

  const registerAnimations = useCallback((frameId: string, animate: Animate) => {
    console.log('[AnimateProvider] registerAnimations called with:', frameId, animate);
    // Parse DSL to FrameAnimation[]
    const parsedAnimations = animate.flatMap(dsl => {
      const rules = parseAnimateDSL(dsl);
      // Set sourceId on all rules
      return rules.map(rule => ({ ...rule, sourceId: frameId }));
    });
    console.log('[AnimateProvider] Parsed animations:', parsedAnimations);
    // Expand 'hover' events into 'mouseEnter' and 'mouseLeave'
    const expandedAnimate = parsedAnimations.flatMap((t: FrameAnimation) => {
      if (t.trigger === 'hover') {
        // Create two rules: one for mouseEnter, one for mouseLeave
        return [
          { ...t, trigger: 'mouseEnter' as TransitionTrigger },
          { ...t, trigger: 'mouseLeave' as TransitionTrigger }
        ];
      }
      return [t];
    });
    console.log('[AnimateProvider] Expanded animations:', expandedAnimate);
    
    setAllAnimations(prev => {
      const newAnimations = [...prev, ...expandedAnimate];
      console.log('[AnimateProvider] setAllAnimations: added', expandedAnimate.length, 'animations, total now:', newAnimations.length);
      return newAnimations;
    });
  }, []);

  const unregisterAnimations = useCallback((frameId: string, animate: Animate) => {
    // Parse DSL to FrameAnimation[] with sourceId
    const parsedAnimations = animate.flatMap(dsl => {
      const rules = parseAnimateDSL(dsl);
      return rules.map(rule => ({ ...rule, sourceId: frameId }));
    });
    // Split 'hover' events the same way for matching
    const expandedAnimate = parsedAnimations.flatMap((t: FrameAnimation) => {
      if (t.trigger === 'hover') {
        return [
          { ...t, trigger: 'mouseEnter' as TransitionTrigger },
          { ...t, trigger: 'mouseLeave' as TransitionTrigger }
        ];
      }
      return [t];
    });
    
    setAllAnimations(prev => prev.filter(t => !expandedAnimate.some(rt => rt.sourceId === t.sourceId && rt.trigger === t.trigger && rt.targetId === t.targetId)));
  }, []);

  const applyAnimationRef = useRef<(rule: FrameAnimation, sourceId?: string) => boolean | undefined>();

  const emitEvent = useCallback((sourceId: string, triggerType: TransitionTrigger, eventData?: any) => {
    console.log('[emitEvent] Called with sourceId:', sourceId, 'triggerType:', triggerType, 'eventData:', eventData);
    console.log('[emitEvent] Current allAnimations:', allAnimations);
    console.log('[emitEvent] useCallback recreated');
    // Handle grab event as mouseDown (initiates drag)
    // The corresponding mouseUp will end the drag state
    let effectiveTrigger = triggerType;
    if (triggerType === 'grab') {
      effectiveTrigger = 'mouseDown';
    }

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

  const resolveTargetId = useCallback((targetSpec: string, sourceId: string): string | null => {
    console.log('[resolveTargetId] Called with targetSpec:', targetSpec, 'sourceId:', sourceId);
    console.log('[resolveTargetId] Current frames:', frames);
    
    // Helper function to find a frame by path anywhere in the tree
    const findFrameByPathInTree = (path: string[]): string | null => {
      if (path.length === 0) return null;
      const [targetId, ...remaining] = path;
      
      console.log('[findFrameByPathInTree] Looking for frame with id:', targetId, 'in entire tree');
      
      // Find the target frame anywhere in the tree
      const targetFrame = Object.entries(frames).find(([id, data]) => id === targetId);
      if (!targetFrame) {
        console.log('[findFrameByPathInTree] Frame', targetId, 'not found in tree');
        return null;
      }
      
      console.log('[findFrameByPathInTree] Found target frame:', targetFrame[0], 'with data:', targetFrame[1]);
      
      if (remaining.length === 0) {
        console.log('[findFrameByPathInTree] This is the final frame in path');
        return targetFrame[0];
      } else {
        // Continue with remaining path from this frame
        console.log('[findFrameByPathInTree] Continuing with remaining path:', remaining, 'from parent:', targetFrame[0]);
        const result = findFrameByPath(remaining, targetFrame[0]);
        console.log('[findFrameByPathInTree] Recursive result:', result);
        return result;
      }
    };

    const findFrameByPath = (path: string[], currentParent: string | null): string | null => {
      console.log('[findFrameByPath] Looking for path:', path, 'starting from parent:', currentParent);
      if (path.length === 0) return null;
      const [nextId, ...remaining] = path;
      
      console.log('[findFrameByPath] Searching for frame with id:', nextId, 'and parent:', currentParent);
      for (const [id, data] of Object.entries(frames)) {
        console.log('[findFrameByPath] Checking frame:', id, 'with data:', data);
        if (id === nextId && data.parent === currentParent) {
          console.log('[findFrameByPath] Found matching frame:', id);
          if (remaining.length === 0) {
            console.log('[findFrameByPath] This is the final frame in path');
            return id;
          } else {
            console.log('[findFrameByPath] Continuing with remaining path:', remaining, 'from parent:', id);
            return findFrameByPath(remaining, id);
          }
        }
      }
      console.log('[findFrameByPath] No frame found with id:', nextId, 'and parent:', currentParent);
      return null;
    };

    if (targetSpec.includes('.')) {
      const path = targetSpec.split('.');
      console.log('[resolveTargetId] Processing hierarchical path:', path);
      
      // Use tree-wide search for hierarchical paths
      const result = findFrameByPathInTree(path);
      console.log('[resolveTargetId] Tree-wide search result:', result);
      return result;
    } else {
      console.log('[resolveTargetId] Processing simple targetSpec:', targetSpec);
      // Find any frame with id === targetSpec
      const targetFrame = Object.entries(frames).find(([id]) => id === targetSpec);
      console.log('[resolveTargetId] Found simple target frame:', targetFrame ? targetFrame[0] : null);
      return targetFrame ? targetFrame[0] : null;
    }
  }, [frames]);  const applyAnimation = useCallback((rule: FrameAnimation, sourceId?: string) => {
    console.log('[applyAnimation] Called with rule:', rule, 'sourceId:', sourceId);
    let targetId = rule.targetId;
    if (targetId && sourceId) {
      const resolved = resolveTargetId(targetId, sourceId);
      console.log('[applyAnimation] resolveTargetId returned:', resolved, 'for targetId:', targetId, 'sourceId:', sourceId);
      if (resolved) {
        targetId = resolved;
      } else {
        console.log('[applyAnimation] resolveTargetId returned null, returning false');
        return false;
      }
    }
    if (!targetId) {
      targetId = sourceId;
    }
    if (!targetId) {
      console.log('[applyAnimation] No targetId after setting to sourceId, returning false');
      return false;
    }

    console.log('[applyAnimation] Final targetId:', targetId, 'exists in frames:', !!frames[targetId]);

    const isHover = rule.trigger === 'mouseEnter' || rule.trigger === 'mouseLeave';

    if (isHover) {
      // For hover: check if rule matches BEFORE updating state
      const currentVisual = visualFrames[targetId] || frames[targetId]?.variant;
      const { variantName: fromVariantResolved } = resolveVariant(rule.fromVariant);

      if (rule.fromVariant && currentVisual !== fromVariantResolved) {
        return false;
      }

      const { variantName: newVariant } = resolveVariant(rule.toVariant);
      if (!newVariant) return false;
      
      // Execute action if specified
      executeAction(rule.action, rule);
      
      // Update visual frames
      setVisualFrames(prev => ({ ...prev, [targetId]: newVariant as string }));
      return true;
    } else {
      // For click/grab/mouseDown/mouseUp: update logical frames and clear visual frames
      let applied = false;
      let newVariant: string | undefined;
      
      // Check if we should execute action BEFORE setFrames to avoid closure issues
      const shouldExecuteAction = !!(rule.action && rule.action !== 'none');
      
      setFrames(prev => {
        const currentLogical = prev[targetId]?.variant;
        const { variantName: fromVariantResolved } = resolveVariant(rule.fromVariant);

        console.log('[applyAnimation] setFrames callback - currentLogical:', currentLogical, 'fromVariantResolved:', fromVariantResolved, 'rule.fromVariant:', rule.fromVariant);

        if (rule.fromVariant && currentLogical !== fromVariantResolved) {
          console.log('[applyAnimation] fromVariant check failed, not applying animation');
          return prev;
        }

        if (rule.toVariant) {
          const { variantName } = resolveVariant(rule.toVariant);
          newVariant = variantName as string;
          console.log('[applyAnimation] Resolved toVariant:', rule.toVariant, 'to newVariant:', newVariant);
        } else if (rule.toggle && rule.toggleVariants) {
          const index = rule.toggleVariants.indexOf(currentLogical);
          newVariant = index !== -1 
            ? rule.toggleVariants[(index + 1) % rule.toggleVariants.length]
            : rule.toggleVariants[0];
        }        // Only update variant if we have a newVariant
        if (newVariant && newVariant !== currentLogical) {
          applied = true;
          console.log('[applyAnimation] Applying animation - changing variant from', currentLogical, 'to', newVariant);

          // Schedule listen event after state update
          setTimeout(() => emitEvent(targetId, 'listen', { listenId: targetId, listenVariant: newVariant }), 0);

          return { ...prev, [targetId]: { ...prev[targetId], variant: newVariant } };
        }

        console.log('[applyAnimation] Not applying animation - newVariant:', newVariant, 'currentLogical:', currentLogical);
        return prev;
      });

      // Execute action AFTER state updates (outside of setState callback)
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

      console.log('[applyAnimation] Returning applied:', applied);
      return applied;
    }
  }, [frames, visualFrames, emitEvent, resolveTargetId]);

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

  const getAnimationProps = useCallback((frameId: string) => {
    // Find animations that target this frame
    const relevantAnimations = allAnimations.filter(rule => {
      if (!rule.targetId) {
        return rule.sourceId === frameId;
      } else if (rule.sourceId) {
        const resolved = resolveTargetId(rule.targetId, rule.sourceId);
        return resolved === frameId;
      }
      return false;
    });
    
    console.log('[getAnimationProps] Frame:', frameId, 'Relevant animations:', relevantAnimations);
    
    // Look for the first animation with timing properties
    for (const animation of relevantAnimations) {
      if (animation.duration || animation.delay || animation.curve) {
        const result = {
          duration: animation.duration ? parseTime(animation.duration).toString() + 'ms' : undefined,
          delay: animation.delay ? parseTime(animation.delay).toString() + 'ms' : undefined,
          curve: animation.curve ? resolveCurve(animation.curve) : undefined
        };
        console.log('[getAnimationProps] Found timing props for', frameId, ':', result);
        return result;
      }
    }
    
    console.log('[getAnimationProps] No timing props found for', frameId);
    return null;
  }, [allAnimations, resolveTargetId]);

  const getAnimationsForFrame = useCallback((frameId: string) => {
    return allAnimations.filter(t => (t.targetId || t.sourceId) === frameId);
  }, [allAnimations]);

  const contextValue: AnimateContextType = useMemo(() => ({
    registerFrame,
    unregisterFrame,
    getVariant,
    registerAnimations,
    unregisterAnimations,
    emitEvent,
    getAnimationsForFrame,
    getAnimationProps,
    // Expose getVisualVariant for consumers if needed
    getVisualVariant,
  }), [registerFrame, unregisterFrame, getVariant, registerAnimations, unregisterAnimations, emitEvent, getAnimationsForFrame, getAnimationProps, getVisualVariant]);

  return (
    <AnimateContext.Provider value={contextValue}>
      <ParentContext.Provider value={null}>
        {children}
      </ParentContext.Provider>
    </AnimateContext.Provider>
  );
};