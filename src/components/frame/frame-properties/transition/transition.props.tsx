// src/components/frame/frame-properties/transition/transition.tsx
import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';

export type EventType = 'click' | 'hover' | 'mouseEnter' | 'mouseLeave' | 'mouseDown' | 'mouseUp' | 'grab' | 'key' | 'hotKey' | 'delay' | 'close' | 'listen' | (() => void);

export interface TransitionRule {
  event: EventType;
  sourceId?: string; // Optional: only trigger if event comes from this Frame ID
  targetId?: string; // Optional: ID of the Frame to target (defaults to source if not provided)
  toggleVariants?: string[]; // Array of variants to toggle through
  toggle?: boolean; // If true, cycle through toggleVariants
  toVariant?: string; // Direct variant to set
  fromVariant?: string; // Only apply if current variant matches this
  delay?: number | string; // Delay before transition starts (number in ms, or string like '1s', '100ms')
  duration?: number | string; // Duration of the transition (number in ms, or string like '1s', '100ms')
  curve?: string; // Easing curve ('ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', etc.)
  key?: string; // For 'key' and 'hotKey' events
  hotKey?: string; // Alternative to key for hotKey events
  listenId?: string; // For 'listen' event: the ID of the Frame to listen to
  listenVariant?: string; // For 'listen' event: the variant to listen for
}

export type Transitions = TransitionRule[];

interface TransitionContextType {
  registerFrame: (id: string, initialVariant: string) => void;
  unregisterFrame: (id: string) => void;
  getVariant: (id: string) => string;
  getVisualVariant: (id: string) => string;
  registerTransitions: (transitions: Transitions) => void;
  unregisterTransitions: (transitions: Transitions) => void;
  emitEvent: (sourceId: string, event: EventType, eventData?: any) => void;
  getTransitionsForFrame: (frameId: string) => Transitions;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransitionContext = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionContext must be used within a TransitionProvider');
  }
  return context;
};

// Helper function to parse delay/duration strings
export const parseTime = (time: string | number): number => {
  if (typeof time === 'number') return time;
  
  const match = time.toString().match(/^(\d+(?:\.\d+)?)(s|ms)?$/);
  if (!match) return 0;
  
  const value = parseFloat(match[1]);
  const unit = match[2];
  
  if (unit === 's') return value * 1000;
  if (unit === 'ms') return value;
  return value; // Assume milliseconds if no unit
};

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // frames: stores the logical variant (base state)
  // visualFrames: stores the visual variant (can be hover, etc.)
  const [frames, setFrames] = useState<Record<string, string>>({});
  const [visualFrames, setVisualFrames] = useState<Record<string, string>>({});
  const [allTransitions, setAllTransitions] = useState<Transitions>([]);
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

  const registerTransitions = useCallback((transitions: Transitions) => {
    setAllTransitions(prev => [...prev, ...transitions]);
  }, []);

  const unregisterTransitions = useCallback((transitions: Transitions) => {
    setAllTransitions(prev => prev.filter(t => !transitions.some(rt => rt === t)));
  }, []);

  const applyTransitionRef = useRef<(rule: TransitionRule, sourceId?: string) => boolean | undefined>();

  const emitEvent = useCallback((sourceId: string, event: EventType, eventData?: any) => {
    // Handle grab event as mouseDown (initiates drag)
    // The corresponding mouseUp will end the drag state
    if (event === 'grab') {
      event = 'mouseDown';
    }

    // Handle mouseEnter and mouseLeave as distinct events
    if (event === 'mouseEnter' || event === 'mouseLeave') {
      const relevant = allTransitions.filter(rule =>
        rule.event === event && (!rule.sourceId || rule.sourceId === sourceId)
      );

      if (relevant.length === 0) return;

      // Group rules by targetId (or sourceId if no targetId)
      const byTarget: Record<string, TransitionRule[]> = {};
      relevant.forEach(rule => {
        const tId = rule.targetId || sourceId || '__global';
        byTarget[tId] = byTarget[tId] || [];
        byTarget[tId].push(rule);
      });

      Object.keys(byTarget).forEach(tId => {
        const rules = byTarget[tId];
        // Only apply the FIRST matching transition
        for (const r of rules) {
          if (typeof r.event === 'function') continue;
          if (applyTransitionRef.current) {
            const applied = applyTransitionRef.current(r, sourceId);
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
    if (event === 'listen') {
      relevant = allTransitions.filter(rule =>
        rule.event === 'listen' && rule.listenId === eventData.listenId && rule.listenVariant === eventData.listenVariant
      );
    } else {
      relevant = allTransitions.filter(rule =>
        rule.event === event && (!rule.sourceId || rule.sourceId === sourceId)
      );
    }

    if (relevant.length === 0) return;

    const byTarget: Record<string, TransitionRule[]> = {};
    relevant.forEach(rule => {
      const tId = rule.targetId || sourceId || '__global';
      byTarget[tId] = byTarget[tId] || [];
      byTarget[tId].push(rule);
    });

    Object.keys(byTarget).forEach(tId => {
      const rules = byTarget[tId];
      const filtered = rules.filter(rule => {
        if ((event === 'key' || event === 'hotKey') && rule.key && eventData?.key !== rule.key) return false;
        if ((event === 'key' || event === 'hotKey') && rule.hotKey && eventData?.key !== rule.hotKey) return false;
        return true;
      });
      if (filtered.length === 0) return;
      const explicit = filtered.filter(r => !r.toggle);
      const toggles = filtered.filter(r => r.toggle);
      let explicitApplied = false;
      for (const r of explicit) {
        if (typeof r.event === 'function') continue;
        if (applyTransitionRef.current) {
          const applied = applyTransitionRef.current(r, sourceId);
          if (applied) explicitApplied = true;
        }
      }
      if (!explicitApplied) {
        for (const r of toggles) {
          if (typeof r.event === 'function') continue;
          if (applyTransitionRef.current) {
            applyTransitionRef.current(r, sourceId);
          }
        }
      }
    });
  }, [allTransitions]);

  const applyTransition = useCallback((rule: TransitionRule, sourceId?: string) => {
    const targetId = rule.targetId || sourceId;
    if (!targetId) return false;

    const isHover = rule.event === 'mouseEnter' || rule.event === 'mouseLeave';

    console.log('[Transition] applyTransition called:', {
      event: rule.event,
      targetId,
      fromVariant: rule.fromVariant,
      toVariant: rule.toVariant,
      delay: rule.delay,
      duration: rule.duration,
      curve: rule.curve
    });

    if (isHover) {
      // For hover: check if rule matches BEFORE updating state
      const currentVisual = visualFrames[targetId] || frames[targetId];

      console.log('[Transition] Hover event - currentVisual:', currentVisual, 'expected fromVariant:', rule.fromVariant);

      if (rule.fromVariant && currentVisual !== rule.fromVariant) {
        console.log('[Transition] Skipping - fromVariant mismatch');
        return false;
      }

      const newVariant = rule.toVariant;
      if (!newVariant) return false;
      
      // Parse delay and apply if needed
      const delayMs = rule.delay ? parseTime(rule.delay) : 0;
      console.log('[Transition] Applying with delay:', delayMs, 'ms');

      if (delayMs > 0) {
        setTimeout(() => {
          console.log('[Transition] Delay complete, updating to variant:', newVariant);
          setVisualFrames(prev => ({ ...prev, [targetId]: newVariant }));
        }, delayMs);
      } else {
        setVisualFrames(prev => ({ ...prev, [targetId]: newVariant }));
      }
      return true;
    } else {
      // For click/grab/mouseDown/mouseUp: update logical frames and clear visual frames
      let applied = false;
      
      setFrames(prev => {
        const currentLogical = prev[targetId];

        if (rule.fromVariant && currentLogical !== rule.fromVariant) {
          return prev;
        }

        let newVariant: string;
        if (rule.toVariant) {
          newVariant = rule.toVariant;
        } else if (rule.toggle && rule.toggleVariants) {
          const index = rule.toggleVariants.indexOf(currentLogical);
          newVariant = index !== -1 
            ? rule.toggleVariants[(index + 1) % rule.toggleVariants.length]
            : rule.toggleVariants[0];
        } else {
          return prev;
        }

        applied = true;

        // Schedule listen event after state update
        if (newVariant !== currentLogical) {
          setTimeout(() => emitEvent(targetId, 'listen', { listenId: targetId, listenVariant: newVariant }), 0);
        }

        return { ...prev, [targetId]: newVariant };
      });

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

  applyTransitionRef.current = applyTransition;

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Emit hotKey events for any registered hotKey transitions
      allTransitions.forEach(rule => {
        if (rule.event === 'hotKey' && (rule.key === e.key || rule.hotKey === e.key)) {
          applyTransition(rule, rule.sourceId || 'global');
        }
      });
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [allTransitions, applyTransition]);

  const getTransitionsForFrame = useCallback((frameId: string) => {
    return allTransitions.filter(t => t.targetId === frameId);
  }, [allTransitions]);

  const contextValue: TransitionContextType = useMemo(() => ({
    registerFrame,
    unregisterFrame,
    getVariant,
    registerTransitions,
    unregisterTransitions,
    emitEvent,
    getTransitionsForFrame,
    // Expose getVisualVariant for consumers if needed
    getVisualVariant,
  }), [registerFrame, unregisterFrame, getVariant, registerTransitions, unregisterTransitions, emitEvent, getTransitionsForFrame, getVisualVariant]);

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  );
};
