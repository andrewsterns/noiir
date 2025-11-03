// src/components/frame/frame-properties/transition/transition.tsx
import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';

export type EventType = 'click' | 'hover' | 'mouseEnter' | 'mouseLeave' | 'mouseDown' | 'mouseUp' | 'key' | 'hotKey' | 'delay' | 'close' | 'listen' | (() => void);

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

  const applyTransitionRef = useRef<(rule: TransitionRule, sourceId?: string) => boolean | undefined>();

  const emitEvent = useCallback((sourceId: string, event: EventType, eventData?: any) => {
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

    console.log(`🚀 Emitting event: ${sourceId} -> ${event}`, {
      sourceId,
      event,
      eventData,
      allTransitionsCount: allTransitions.length,
      relevantTransitions: relevant
    });

    if (relevant.length === 0) return;

    // Group rules by targetId (or sourceId if no targetId)
    const byTarget: Record<string, TransitionRule[]> = {};
    relevant.forEach(rule => {
      const tId = rule.targetId || sourceId || '__global';
      byTarget[tId] = byTarget[tId] || [];
      byTarget[tId].push(rule);
    });

    // For each target, apply non-toggle (explicit) rules first, then toggles only if no explicit rule applied
    Object.keys(byTarget).forEach(tId => {
      const rules = byTarget[tId];
      // filter key/hotKey mismatches
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
        // skip function events
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
    if (!targetId) return; // No target specified and no source available

    const currentVariant = frames[targetId];

    if (rule.fromVariant && currentVariant !== rule.fromVariant) {
      return false;
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
    // Handle delay for 'delay' event type
    if (rule.event === 'delay' && rule.delay != null) {
      const delayMs = parseTime(rule.delay as string | number);
      const timeoutId = setTimeout(() => {
        // Delay event completed
      }, delayMs);
      // targetId is guaranteed to exist due to earlier check
      timeoutsRef.current[targetId as string] = timeoutId;
    }

    const oldVariant = frames[targetId];
    setFrames(prev => ({ ...prev, [targetId]: newVariant }));

    // Emit 'listen' event if variant changed
    if (newVariant !== oldVariant) {
      emitEvent(targetId, 'listen', { listenId: targetId, listenVariant: newVariant });
    }

    return true;
  }, [frames, emitEvent]);

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
  }), [registerFrame, unregisterFrame, getVariant, registerTransitions, unregisterTransitions, emitEvent, getTransitionsForFrame]);

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  );
};
