
import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { FrameProps } from '../Frame';
import { createAnimationEventHandlers } from './trigger/trigger';
import { handleAction } from './action/action';
import { getVariantProps } from '../variants/variants';

// ===== ANIMATION TYPES =====

export type FrameVariantName = string;

export type FrameVariants = Record<FrameVariantName, FrameVariantProps>;

export interface FrameVariantProps extends Omit<FrameProps, "children" | "variants" | "initialVariant"> {}

// Custom action function type
export type AnimationAction =
  | string  // Predefined actions like 'changeTo', 'cycleVariants'
  | ((context: AnimationContext) => AnimationResult | void);  // Custom functions

// Context passed to custom actions
export interface AnimationContext {
  currentVariant: string;
  variants: FrameVariants;
  currentProps: FrameProps;
  event?: React.MouseEvent<HTMLDivElement>;
  customData?: any;  // For passing additional data
}

// Result of a custom action
export interface AnimationResult {
  variant?: string;  // New variant to switch to
  props?: Partial<FrameProps>;  // Direct prop changes
  data?: any;  // Data to store/update
}

// Flexible destination type
export type AnimationDestination =
  | string  // Variant name or predefined destination
  | Partial<FrameVariantProps>  // Inline properties
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

  variants?: FrameVariants;

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
	frameProps: FrameProps & { onVariantChange?: (variant: FrameVariantName) => void; initialVariant?: string }
): FrameAnimationResult {
	const { variant = 'default', initialVariant = 'default', variants, animation: explicitAnimation, onVariantChange } = frameProps;

	// State for custom data that actions can modify
	const [actionData, setActionData] = useState<any>();

	// State for animation-applied props (from inline property changes)
	const [animationProps, setAnimationProps] = useState<Partial<FrameProps>>({});

	// Add ref to track current variant for dynamic access in handlers
	const currentVariantRef = useRef(variant);
	useEffect(() => {
		currentVariantRef.current = variant;
	}, [variant]);

	// Clear animation props when variant changes to prevent persistence across variants
	useEffect(() => {
		setAnimationProps({});
	}, [variant]);

	// Helper to switch variant - use callback if provided
	const changeVariant = useCallback((variant: FrameVariantName) => {
		if (onVariantChange) {
			onVariantChange(variant);
		}
	}, [onVariantChange]);

	// Helper to update action data
	const updateActionData = useCallback((data: any) => {
		setActionData(data);
	}, []);

	// Helper to update animation props
	const updateAnimationProps = useCallback((props: Partial<FrameProps>) => {
		setAnimationProps(props);
	}, []);

	// Separate prop and variant animations
	// Only use prop animations if we're on the initial variant
	const propAnims = (variant === initialVariant) && explicitAnimation ? (Array.isArray(explicitAnimation) ? explicitAnimation : [explicitAnimation]) : [];
	
	// Always use current variant's animations
	const variantAnims = variants?.[variant]?.animation ? (Array.isArray(variants[variant].animation) ? variants[variant].animation : [variants[variant].animation]) : [];
	
	const allAnimations = [...propAnims, ...variantAnims];
	
	console.log('[Animation] Processing animations:', allAnimations);

	// Wire up triggers to eventHandlers and connect actions
	const eventHandlers = createAnimationEventHandlers(allAnimations, {
		currentVariant: variant,
		currentVariantRef,
		variants: variants || {},
		currentProps: frameProps,
		customData: actionData,
		changeVariant,
		updateAnimationProps,
		updateActionData,
		handleAction,
		initialVariant: initialVariant
	});

	console.log('[Animation] Created event handlers:', Object.keys(eventHandlers));
	console.log('[Animation] Animations processed:', allAnimations.length);

	// Get props for current variant
	const variantProps = variants ? getVariantProps(variants, variant) : {};
	const mergedProps = { ...frameProps, ...variantProps, ...animationProps };

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
