
import React, { useState, useCallback } from 'react';
import type { AnimationConfig, FrameAnimationResult, AnimationContext, AnimationResult } from './types';
import type { FrameProps } from '../Frame';
import { handleTrigger, TriggerProps, AnimationInteraction } from './trigger/trigger';
import { handleAction } from './action/action';
import { getVariantProps, FrameVariants, FrameVariantName } from '../variants/variants';
import { getAnimationStyles } from './animation/animation';
import { getCurve } from './curve/curve';
import { getDirectionTransform } from './direction/direction';
import { getDuration } from './duration/duration';

// Core animation hook abstraction
export function useFrameAnimation(
	frameProps: FrameProps
): FrameAnimationResult {
	const { variant: initialVariant, variants, animation: explicitAnimation } = frameProps;

	// State for current variant - use Frame's variant prop as initial
	const [currentVariant, setCurrentVariant] = useState<FrameVariantName>(initialVariant || 'default');

	// State for custom data that actions can modify
	const [actionData, setActionData] = useState<any>();

	// Helper to switch variant
	const changeVariant = useCallback((variant: FrameVariantName) => {
		setCurrentVariant(variant);
	}, []);

	// Helper to update action data
	const updateActionData = useCallback((data: any) => {
		setActionData(data);
	}, []);

	// Get animate config from current variant, fall back to explicit animate
	const currentVariantAnimate = variants?.[currentVariant]?.animation as (AnimationConfig | AnimationConfig[]) | undefined;
	const animateToUse = currentVariantAnimate || explicitAnimation;
	
	// Normalize to array of animations
	const allAnimations = Array.isArray(animateToUse) 
		? animateToUse 
		: animateToUse ? [animateToUse] : [];	// Determine automatic cursor based on all triggers in animations
	const getAutomaticCursor = (triggers: string[]): 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing' => {
		const pointerTriggers = [
			'onClick', 'onDrag', 'onHover', 'whileHovering', 'whilePressing',
			'mouseEnter', 'mouseLeave', 'mouseDown', 'mouseUp'
		];
		return triggers.some(trigger => pointerTriggers.includes(trigger || '')) ? 'pointer' : 'default';
	};

	// Get final cursor (manual override takes precedence)
	const allTriggers = allAnimations.map(anim => anim.trigger).filter(Boolean) as string[];
	const automaticCursor = getAutomaticCursor(allTriggers);
	const manualCursor = frameProps.cursor;
	const finalCursor = manualCursor || automaticCursor;

	// Wire up triggers to eventHandlers and connect actions
	const eventHandlers: FrameAnimationResult['eventHandlers'] = {};
	const animationStyles: React.CSSProperties = {};

	// Process each animation
	allAnimations.forEach((anim) => {
		const {
			trigger: animTrigger,
			action: animAction,
			destination: animDestination,
			animation: animAnimation,
			direction: animDirection,
			curve: animCurve,
			duration: animDuration
		} = anim;

		// Create event handler for this trigger
		const createEventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
			// Handle trigger
			handleTrigger(animTrigger as any, event);

			// Handle action if provided
			if (animAction) {
				const context: AnimationContext = {
					currentVariant,
					variants: variants || {},
					currentProps: frameProps,
					event,
					customData: actionData
				};

				const result = handleAction(animAction, animDestination, context);

				// Apply the result
				if (result) {
					if (result.variant) {
						console.log(`[Animation] ${animTrigger} action: changing to variant "${result.variant}"`);
						changeVariant(result.variant);
					}
					if (result.props) {
						console.log(`[Animation] ${animTrigger} action: updating props`, result.props);
						// Note: Direct prop changes would need to be handled by parent component
					}
					if (result.data !== undefined) {
						console.log(`[Animation] ${animTrigger} action: updating data`, result.data);
						updateActionData(result.data);
					}
				}
			}
		};

		// Assign to appropriate event handler
		switch (animTrigger) {
			case 'onClick':
				eventHandlers.onClick = createEventHandler;
				break;
			case 'onHover':
				// Special handling for hover - create handler for enter only
				// Mouse leave is handled by separate onMouseLeave animations
				eventHandlers.onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
					handleTrigger(animTrigger as any, event);
					if (animAction) {
						const context: AnimationContext = {
							currentVariant,
							variants: variants || {},
							currentProps: frameProps,
							event,
							customData: actionData
						};
						const result = handleAction(animAction, animDestination, context);
						if (result && result.variant) {
							console.log(`[Animation] ${animTrigger} (enter) action: changing to variant "${result.variant}"`);
							changeVariant(result.variant);
						}
						if (result && result.props) {
							console.log(`[Animation] ${animTrigger} (enter) action: updating props`, result.props);
						}
						if (result && result.data !== undefined) {
							console.log(`[Animation] ${animTrigger} (enter) action: updating data`, result.data);
							updateActionData(result.data);
						}
					}
				};
				break;
			case 'onMouseEnter':
				eventHandlers.onMouseEnter = createEventHandler;
				break;
			case 'onMouseLeave':
				eventHandlers.onMouseLeave = createEventHandler;
				break;
		}
	});

	// Get props for current variant
	const variantProps = variants ? getVariantProps(variants, currentVariant) : {};
	const mergedProps = { ...frameProps, ...variantProps };

	// Generate animation styles based on animation properties
	// TODO: In new API, animations are event-triggered, so global styles might not be needed
	// For now, return empty styles

	return {
		currentProps: { ...mergedProps, cursor: finalCursor },
		animationStyles,
		eventHandlers
	};
}
