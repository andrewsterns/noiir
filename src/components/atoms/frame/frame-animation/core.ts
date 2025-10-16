
import React, { useState, useCallback } from 'react';
import type { AnimateProps, FrameAnimationResult, AnimationContext, AnimationResult } from './types';
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
	frameProps: FrameProps,
	animate?: AnimateProps
): FrameAnimationResult {
	const {
		trigger,
		action,
		destination,
		animation,
		direction,
		curve,
		duration,
		animations,
		variants,
		customData,
		cursor: manualCursor,
		...legacy
	} = animate || {};

	// State for current variant - use Frame's variant prop as initial
	const [currentVariant, setCurrentVariant] = useState<FrameVariantName>(frameProps.variant || 'default');

	// State for custom data that actions can modify
	const [actionData, setActionData] = useState<any>(customData);

	// Helper to switch variant
	const changeVariant = useCallback((variant: FrameVariantName) => {
		setCurrentVariant(variant);
	}, []);

	// Helper to update action data
	const updateActionData = useCallback((data: any) => {
		setActionData(data);
	}, []);

	// Handle animations (both single and multiple)
	const allAnimations = animations || (trigger ? [{
		trigger,
		action,
		destination,
		animation,
		direction,
		curve,
		duration
	}] : []);

	// Determine automatic cursor based on all triggers in animations
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
				// Special handling for hover - create separate handlers for enter and leave
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
				eventHandlers.onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
					handleTrigger(animTrigger as any, event);
					if (animAction) {
						const context: AnimationContext = {
							currentVariant,
							variants: variants || {},
							currentProps: frameProps,
							event,
							customData: actionData
						};
						// For hover leave, change back to default variant
						const result = handleAction(animAction, 'default', context);
						if (result && result.variant) {
							console.log(`[Animation] ${animTrigger} (leave) action: changing to variant "${result.variant}"`);
							changeVariant(result.variant);
						}
						if (result && result.props) {
							console.log(`[Animation] ${animTrigger} (leave) action: updating props`, result.props);
						}
						if (result && result.data !== undefined) {
							console.log(`[Animation] ${animTrigger} (leave) action: updating data`, result.data);
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
	if (animation && animation !== 'instant') {
		const durationMs = getDuration(duration || 300);
		const easing = getCurve((curve || 'ease') as import('./curve/curve').AnimationCurve);
		const animationStylesFromConfig = getAnimationStyles(
			animation as any,
			direction,
			curve,
			durationMs
		);
		Object.assign(animationStyles, animationStylesFromConfig);
	}

	return {
		currentProps: { ...mergedProps, cursor: finalCursor },
		animationStyles,
		eventHandlers
	};
}
