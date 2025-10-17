
import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { FrameProps } from '../Frame';
import { createAnimationEventHandlers } from './trigger/trigger';
import { handleAction } from './action/action';
import { getStateProps } from '../states/states';

// ===== ANIMATION TYPES =====

export type FrameStateName = string;

export type FrameStates = Record<FrameStateName, FrameStateProps>;

export interface FrameStateProps extends Omit<FrameProps, "children" | "states" | "initialState"> {}

// Custom action function type
export type AnimationAction =
  | string  // Predefined actions like 'changeTo', 'cycleStates'
  | ((context: AnimationContext) => AnimationResult | void);  // Custom functions

// Context passed to custom actions
export interface AnimationContext {
  currentState: string;
  states: FrameStates;
  currentProps: FrameProps;
  event?: React.MouseEvent<HTMLDivElement>;
  customData?: any;  // For passing additional data
}

// Result of a custom action
export interface AnimationResult {
  state?: string;  // New state to switch to
  props?: Partial<FrameProps>;  // Direct prop changes
  data?: any;  // Data to store/update
}

// Flexible destination type
export type AnimationDestination =
  | string  // State name or predefined destination
  | Partial<FrameStateProps>  // Inline properties
  | ((context: AnimationContext) => string | AnimationResult);  // Custom destination function

// Single animation configuration
export interface AnimationConfig {
  trigger: string;
  action?: AnimationAction;
  destination?: AnimationDestination;
  animation?: string;
  direction?: string;
  curve?: string;
  duration?: number;
  cursor?: 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing';
}

export interface AnimateProps {
  // Single animation or array of animations
  animation?: AnimationConfig | AnimationConfig[];

  states?: FrameStates;

  // Custom data that can be passed to actions
  customData?: any;
}

export interface FrameAnimationResult {
  currentProps: FrameProps;
  animationStyles?: React.CSSProperties; // Optional for future use
  eventHandlers: import('./trigger/trigger').AnimationEventHandlers;
}

// Core animation hook abstraction
export function useFrameAnimation(
	frameProps: FrameProps & { onStateChange?: (state: FrameStateName) => void; initialState?: string }
): FrameAnimationResult {
	const { state = 'default', initialState = 'default', states, animation: explicitAnimation, onStateChange } = frameProps;

	// State for custom data that actions can modify
	const [actionData, setActionData] = useState<any>();

	// State for animation-applied props (from inline property changes)
	const [animationProps, setAnimationProps] = useState<Partial<FrameProps>>({});

	// Add ref to track current state for dynamic access in handlers
	const currentStateRef = useRef(state);
	useEffect(() => {
		currentStateRef.current = state;
	}, [state]);

	// Clear animation props when state changes to prevent persistence across states
	useEffect(() => {
		setAnimationProps({});
	}, [state]);

	// Helper to switch state - use callback if provided
	const changeState = useCallback((state: FrameStateName) => {
		if (onStateChange) {
			onStateChange(state);
		}
	}, [onStateChange]);

	// Helper to update action data
	const updateActionData = useCallback((data: any) => {
		setActionData(data);
	}, []);

	// Helper to update animation props
	const updateAnimationProps = useCallback((props: Partial<FrameProps>) => {
		setAnimationProps(props);
	}, []);

	// Separate prop and state animations
	// Only use prop animations if we're on the initial state
	const propAnims = (state === initialState) && explicitAnimation ? (Array.isArray(explicitAnimation) ? explicitAnimation : [explicitAnimation]) : [];
	
	// Always use current state's animations
	const stateAnims = states?.[state]?.animation ? (Array.isArray(states[state].animation) ? states[state].animation : [states[state].animation]) : [];

	const allAnimations = [...propAnims, ...stateAnims];
	
	console.log('[Animation] Processing animations:', allAnimations);

	// Wire up triggers to eventHandlers and connect actions
	const eventHandlers = createAnimationEventHandlers(allAnimations, {
		currentState: state,
		currentStateRef,
		states: states || {},
		currentProps: frameProps,
		customData: actionData,
		changeState,
		updateAnimationProps,
		updateActionData,
		handleAction,
		initialState: initialState
	});

	console.log('[Animation] Created event handlers:', Object.keys(eventHandlers));
	console.log('[Animation] Animations processed:', allAnimations.length);

	// Get props for current state
	const stateProps = states ? getStateProps(states, state) : {};
	const mergedProps = { ...frameProps, ...stateProps, ...animationProps };

	// Determine automatic cursor based on all triggers in animations
	const getAutomaticCursor = (triggers: string[]): 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing' => {
		const pointerTriggers = [
			'onClick', 'onDrag', 'onHover', 'whileHovering', 'whilePressing',
			'mouseEnter', 'mouseLeave', 'mouseDown', 'mouseUp'
		];
		return triggers.some(trigger => pointerTriggers.includes(trigger || '')) ? 'pointer' : 'default';
	};

	// Determine final cursor: animation cursor > manual cursor > automatic cursor
	const allTriggers = allAnimations.map(anim => anim.trigger).filter(Boolean) as string[];
	const animationCursor = animationProps.cursor;
	const manualCursor = frameProps.cursor;
	const automaticCursor = getAutomaticCursor(allTriggers);
	const finalCursor = animationCursor || manualCursor || automaticCursor;

	return {
		currentProps: { ...mergedProps, cursor: finalCursor },
		animationStyles: {}, // Event-triggered animations don't need global styles
		eventHandlers
	};
}
