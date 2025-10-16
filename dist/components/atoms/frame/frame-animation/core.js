import { useState, useCallback } from 'react';
import { handleTrigger } from './trigger/trigger';
import { handleAction } from './action/action';
import { getVariantProps } from '../variants/variants';
import { getAnimationStyles } from './animation/animation';
import { getCurve } from './curve/curve';
import { getDuration } from './duration/duration';
// Core animation hook abstraction
export function useFrameAnimation(frameProps, animate) {
    const { trigger, action, destination, animation, direction, curve, duration, animations, variants, customData, cursor: manualCursor, ...legacy } = animate || {};
    // State for current variant - use Frame's variant prop as initial
    const [currentVariant, setCurrentVariant] = useState(frameProps.variant || 'default');
    // State for custom data that actions can modify
    const [actionData, setActionData] = useState(customData);
    // Helper to switch variant
    const changeVariant = useCallback((variant) => {
        setCurrentVariant(variant);
    }, []);
    // Helper to update action data
    const updateActionData = useCallback((data) => {
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
    const getAutomaticCursor = (triggers) => {
        const pointerTriggers = [
            'onClick', 'onDrag', 'onHover', 'whileHovering', 'whilePressing',
            'mouseEnter', 'mouseLeave', 'mouseDown', 'mouseUp'
        ];
        return triggers.some(trigger => pointerTriggers.includes(trigger || '')) ? 'pointer' : 'default';
    };
    // Get final cursor (manual override takes precedence)
    const allTriggers = allAnimations.map(anim => anim.trigger).filter(Boolean);
    const automaticCursor = getAutomaticCursor(allTriggers);
    const finalCursor = manualCursor || automaticCursor;
    // Wire up triggers to eventHandlers and connect actions
    const eventHandlers = {};
    const animationStyles = {};
    // Process each animation
    allAnimations.forEach((anim) => {
        const { trigger: animTrigger, action: animAction, destination: animDestination, animation: animAnimation, direction: animDirection, curve: animCurve, duration: animDuration } = anim;
        // Create event handler for this trigger
        const createEventHandler = (event) => {
            // Handle trigger
            handleTrigger(animTrigger, event);
            // Handle action if provided
            if (animAction) {
                const context = {
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
                eventHandlers.onMouseEnter = (event) => {
                    handleTrigger(animTrigger, event);
                    if (animAction) {
                        const context = {
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
                eventHandlers.onMouseLeave = (event) => {
                    handleTrigger(animTrigger, event);
                    if (animAction) {
                        const context = {
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
        const easing = getCurve((curve || 'ease'));
        const animationStylesFromConfig = getAnimationStyles(animation, direction, curve, durationMs);
        Object.assign(animationStyles, animationStylesFromConfig);
    }
    return {
        currentProps: { ...mergedProps, cursor: finalCursor },
        animationStyles,
        eventHandlers
    };
}
