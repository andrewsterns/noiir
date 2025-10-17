// State types and logic for Frame components

import type { FrameProps } from '../Frame';
import type { AnimationConfig } from '../frame-animation/core';

export type FrameStateName = string;

// FrameStateProps allows all Frame visual/structural properties (appearance, layout, effects, position, etc.)
// Includes animation for state-specific animations
export interface FrameStateProps extends Omit<FrameProps, 'id' | 'state' | 'states' | 'children' | 'className' | 'style' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'> {
  // Animation properties for this state
  animation?: AnimationConfig | AnimationConfig[];
  
  // Child states - defines states for child components by ID
  childStates?: { [childId: string]: string };
  
  // This includes:
  // - position (x/y, z-index, constraints)
  // - autoLayout (flow, alignment, spacing)
  // - size (width, height)
  // - appearance (radius, border, opacity)
  // - typography (font, size, weight, color)
  // - fill (background color/gradient)
  // - stroke (border stroke properties)
  // - effects (shadows, blurs)
}

export interface FrameStates {
  [state: string]: FrameStateProps;
}

// Helper to get props for a state
// Returns merged props for a state, falling back to 'default' if needed
export function getStateProps(states: FrameStates, state: FrameStateName, baseProps: FrameStateProps = {}): FrameStateProps {
  const stateProps = states[state] || states['default'] || {};
  return { ...baseProps, ...stateProps };
}

// AnimationProps extension for states
export interface AnimationStatesProps {
  states?: FrameStates;
  initialState?: FrameStateName;
}

// Predefined semantic style states that can be used across components
export const semanticStates: FrameStates = {
  solid: {
    fill: { type: 'solid', color: 'primary6' },
    stroke: { type: 'solid', color: 'primary6', weight: 0 },
    typography: { color: 'primary1', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 8 }
  },
  surface: {
    fill: { type: 'solid', color: 'success' },
    stroke: { type: 'solid', color: 'primary4', weight: 1, opacity: 0.5 },
    typography: { color: 'primary2', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 8 }
  },
  outline: {
    fill: { type: 'none' },
    stroke: { type: 'solid', color: 'primary6', weight: 2 },
    typography: { color: 'primary6', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 8 }
  },
  ghost: {
    fill: { type: 'none' },
    stroke: { type: 'solid', color: 'transparent', weight: 0 },
    typography: { color: 'primary6', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 8 }
  },
  transparent: {
    fill: { type: 'none' },
    stroke: { type: 'solid', color: 'transparent', weight: 0 },
    typography: { color: 'neutral9', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 0 }
  },
  glass: {
    fill: { type: 'solid', color: 'white' },
    stroke: { type: 'solid', color: 'neutral3', weight: 1 },
    typography: { color: 'neutral9', fontSize: 16, fontWeight: 500 },
    appearance: { radius: 12, opacity: 0.8 },
    effects: {
      dropShadow: [{ x: 0, y: 4, blur: 12, color: 'neutral12' }]
    }
  }
};

// Helper to create component-specific states based on semantic states
export function createComponentStates(baseStates: FrameStates, overrides: Record<string, Partial<FrameStateProps>> = {}): FrameStates {
  const result: FrameStates = {};

  for (const [stateName, baseProps] of Object.entries(baseStates)) {
    result[stateName] = { ...baseProps, ...(overrides[stateName] || {}) };
  }

  return result;
}