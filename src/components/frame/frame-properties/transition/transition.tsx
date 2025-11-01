// src/components/frame/frame-properties/transition/transition.tsx
import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';

export type EventType = 'click' | 'hover' | 'mouseEnter' | 'mouseLeave' | 'mouseDown' | 'mouseUp' | 'key' | 'hotKey' | 'delay' | (() => void);

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
}

export type Transitions = TransitionRule[];

interface TransitionContextType {
  registerFrame: (id: string, initialVariant: string) => void;
  unregisterFrame: (id: string) => void;
  getVariant: (id: string) => string;
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
  const [frames, setFrames] = useState<Record<string, string>>({});
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

  const getVariant = useCallback((id: string) => frames[id] || '', [frames]);

  const registerTransitions = useCallback((transitions: Transitions) => {
    setAllTransitions(prev => [...prev, ...transitions]);
  }, []);

  const unregisterTransitions = useCallback((transitions: Transitions) => {
    setAllTransitions(prev => prev.filter(t => !transitions.some(rt => rt === t)));
  }, []);

  const applyTransition = useCallback((rule: TransitionRule, sourceId?: string) => {
    const targetId = rule.targetId || sourceId;
    if (!targetId) return; // No target specified and no source available

    const currentVariant = frames[targetId];

    if (rule.fromVariant && currentVariant !== rule.fromVariant) {
      return;
    }

    let newVariant: string;
    if (rule.toVariant) {
      newVariant = rule.toVariant;
    } else if (rule.toggle && rule.toggleVariants) {
      const index = rule.toggleVariants.indexOf(currentVariant);
      if (index !== -1) {
        newVariant = rule.toggleVariants[(index + 1) % rule.toggleVariants.length];
      } else {
        newVariant = rule.toggleVariants[0];
      }
    } else {
      return;
    }

    console.log(`🎯 Applying transition to ${targetId}:`, {
      from: currentVariant,
      to: newVariant,
      duration: rule.duration,
      delay: rule.delay,
      curve: rule.curve,
      rule
    });

    setFrames(prev => ({ ...prev, [targetId]: newVariant }));

    // Handle delay for 'delay' event type
    if (rule.event === 'delay' && rule.delay) {
      const delayMs = parseTime(rule.delay);
      const timeoutId = setTimeout(() => {
        // Delay event completed
      }, delayMs);
      timeoutsRef.current[targetId] = timeoutId;
    }
  }, [frames]);

  const emitEvent = useCallback((sourceId: string, event: EventType, eventData?: any) => {
    console.log(`🚀 Emitting event: ${sourceId} -> ${event}`, {
      sourceId,
      event,
      eventData,
      allTransitionsCount: allTransitions.length,
      relevantTransitions: allTransitions.filter(rule =>
        rule.event === event && (!rule.sourceId || rule.sourceId === sourceId)
      )
    });

    allTransitions.forEach(rule => {
      if (rule.event === event && (!rule.sourceId || rule.sourceId === sourceId)) {
        if ((event === 'key' || event === 'hotKey') && rule.key && eventData?.key !== rule.key) return;
        if ((event === 'key' || event === 'hotKey') && rule.hotKey && eventData?.key !== rule.hotKey) return;
        if (typeof event === 'function') return;
        applyTransition(rule, sourceId);
      }
    });
  }, [allTransitions, applyTransition]);

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
  }), [registerFrame, unregisterFrame, getVariant, registerTransitions, unregisterTransitions, emitEvent, getTransitionsForFrame]);

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  );
};
