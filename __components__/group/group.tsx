import React, { ReactNode, useEffect, useRef } from 'react';
import { useAnimateContext, AnimateProvider, ParentContext, useParent } from '@noiir/frame-core';

export interface GroupProps {
  id?: string;
  animate?: any; // Replace 'any' with a more specific type if available
  children: ReactNode;
}

/**
 * <Group> is a pure container for organizational and animation purposes.
 * It does not apply any styling, layout, or effects.
 */
const GroupInner: React.FC<GroupProps> = ({ id, animate, children }) => {
  const groupRef = useRef<HTMLDivElement>(null);

  let animateContext: ReturnType<typeof useAnimateContext> | null = null;
  try {
    animateContext = useAnimateContext();
  } catch (e) {
    // No animate context
  }

  const parent = useParent();

  const registerFrameRef = useRef(animateContext?.registerFrame);
  const unregisterFrameRef = useRef(animateContext?.unregisterFrame);
  const registerAnimationsRef = useRef(animateContext?.registerAnimations);
  const unregisterAnimationsRef = useRef(animateContext?.unregisterAnimations);

  useEffect(() => {
    registerFrameRef.current = animateContext?.registerFrame;
    unregisterFrameRef.current = animateContext?.unregisterFrame;
    registerAnimationsRef.current = animateContext?.registerAnimations;
    unregisterAnimationsRef.current = animateContext?.unregisterAnimations;
  }, [animateContext]);

  // Register group as a frame for hierarchical targeting
  useEffect(() => {
    if (registerFrameRef.current && unregisterFrameRef.current && id) {
      console.log('[Group] Registering group frame:', id, 'with parent:', parent);
      registerFrameRef.current(id, parent, '');
      return () => {
        console.log('[Group] Unregistering group frame:', id);
        unregisterFrameRef.current!(id);
      };
    }
  }, [id, parent]);

  useEffect(() => {
    if (registerAnimationsRef.current && unregisterAnimationsRef.current && animate && id) {
      console.log('[GroupInner] Registering animations for', id, animate);
      registerAnimationsRef.current(id, animate);
      return () => {
        console.log('[GroupInner] Unregistering animations for', id);
        if (unregisterAnimationsRef.current) {
          unregisterAnimationsRef.current(id, animate);
        }
      };
    }
  }, [animate, id]);

  const handleClick = () => {
    if (id && animateContext) {
      console.log('[GroupInner] Emitting click for', id);
      animateContext.emitEvent(id, 'click');
    } else {
      console.log('[GroupInner] No animateContext or id for click', id, !!animateContext);
    }
  };

  console.log('[Group] Providing ParentContext with value:', id || null);
  
  return (
    <div ref={groupRef} onClick={handleClick} style={{ display: 'block', position: 'relative' }}>
      <ParentContext.Provider value={id || null}>
        {children}
      </ParentContext.Provider>
    </div>
  );
};

export const Group: React.FC<GroupProps> = (props) => {
  let hasContext = false;
  try {
    useAnimateContext();
    hasContext = true;
  } catch (e) {
    // No animate context
  }
  const isAnimateRoot = !!props.animate && !hasContext;
  if (isAnimateRoot) {
    return <AnimateProvider><GroupInner {...props} /></AnimateProvider>;
  } else {
    return <GroupInner {...props} />;
  }
};