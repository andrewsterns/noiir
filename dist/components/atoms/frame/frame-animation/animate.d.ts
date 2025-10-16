/**
 * Frame Animation System - Clean Interface Layer
 *
 * This file provides a clean, type-safe interface for Frame animations
 * with proper abstraction for all Frame properties and animation features.
 */
import { FrameAnimateProps, AnimationConfig, AnimationKeyframe, AnimationTrigger, EasingFunction, FrameProperties, IFrameAnimationEngine, IFramePropertyParser, IFrameKeyframeInterpolator, IFrameCSSTransitions, IFrameTriggerManager } from './types';
export type { FrameAnimateProps, AnimationConfig, AnimationKeyframe, AnimationTrigger, EasingFunction, FrameProperties, IFrameAnimationEngine, IFramePropertyParser, IFrameKeyframeInterpolator, IFrameCSSTransitions, IFrameTriggerManager };
export interface TimelineKeyframe extends AnimationKeyframe {
}
export interface AnimateProps extends FrameAnimateProps {
}
