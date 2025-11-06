import React, { useState, useRef, useCallback } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { SLIDER_VARIANTS, SLIDER_SIZES } from '../../../../__variants__/atoms/slider/slider.variants';
import { FrameVariantConfig } from '../../../../packages/frame-core/src/variants/variants.props';
import { Animate } from '../../../../packages/frame-core/src/animate/animate.props';

/**
 * Slider Component
 *
 * A slider component that uses the transition system for smooth hover and drag states.
 * State flow: thumb → thumbHover → thumbGrabbing → thumbGrabbingHover
 * 
 * - Hover states are visual overlays (temporary)
 * - Grabbing state is the logical state (persistent until mouse release)
 * - Uses 'grab' event (maps to mouseDown) to initiate drag
 * 
 * @see SLIDER_VARIANTS for all state definitions
 */

export interface SliderProps extends Omit<FrameProps, 'onChange' | 'value'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  disabled?: boolean;
  variant?: string;
  variants?: Record<string, any>;
  size?: any;
  sizes?: Record<string, any>;
  transitions?: Animate;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 50,
  onChange,
  showValue = false,
  disabled = false,
  variant = 'solid',
  variants: customVariants,
  size = 'medium',
  sizes: customSizes,
  transitions,
  ...sliderProps
}, ref) => {
  const variants = customVariants || SLIDER_VARIANTS;
  const sizes = customSizes || SLIDER_SIZES;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [trackWidth, setTrackWidth] = useState(200);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Determine variant suffix based on the variant type
  const getVariantSuffix = (baseVariant: string) => {
    switch (variant) {
      case 'soft':
        return `${baseVariant}Soft`;
      case 'ghost':
        return `${baseVariant}Ghost`;
      case 'outline':
        return `${baseVariant}Outline`;
      default:
        return baseVariant;
    }
  };

  // Build transition rules for hover and grab/drag states
  const defaultTransitions: Animate = [
    // Hover on base thumb state
    { 
      trigger: 'mouseEnter', 
      targetId: 'thumbId',
      fromVariant: getVariantSuffix('thumb'), 
      toVariant: getVariantSuffix('thumbHover'), 
      duration: '0.15s', 
      curve: 'ease' 
    },
    { 
      trigger: 'mouseLeave', 
      targetId: 'thumbId',
      fromVariant: getVariantSuffix('thumbHover'), 
      toVariant: getVariantSuffix('thumb'), 
      duration: '0.15s', 
      curve: 'ease' 
    },
    // Grab: Initiate drag from base or hover state
    { 
      trigger: 'grab', 
      targetId: 'thumbId',
      fromVariant: getVariantSuffix('thumb'), 
      toVariant: getVariantSuffix('thumbGrabbing'), 
      duration: '0.1s', 
      curve: 'ease' 
    },
    { 
      trigger: 'grab', 
      targetId: 'thumbId',
      fromVariant: getVariantSuffix('thumbHover'), 
      toVariant: getVariantSuffix('thumbGrabbing'), 
      duration: '0.1s', 
      curve: 'ease' 
    },
    // Release: Return to base state
    { 
      trigger: 'mouseUp', 
      targetId: 'thumbId',
      fromVariant: getVariantSuffix('thumbGrabbing'), 
      toVariant: getVariantSuffix('thumb'), 
      duration: '0.15s', 
      curve: 'ease' 
    },
    { 
      trigger: 'mouseUp', 
      targetId: 'thumbId',
      fromVariant: getVariantSuffix('thumbGrabbingHover'), 
      toVariant: getVariantSuffix('thumb'), 
      duration: '0.15s', 
      curve: 'ease' 
    },
    // Hover while grabbing
    { 
      trigger: 'mouseEnter', 
      targetId: 'thumbId',
      fromVariant: getVariantSuffix('thumbGrabbing'), 
      toVariant: getVariantSuffix('thumbGrabbingHover'), 
      duration: '0.15s', 
      curve: 'ease' 
    },
    { 
      trigger: 'mouseLeave', 
      targetId: 'thumbId',
      fromVariant: getVariantSuffix('thumbGrabbingHover'), 
      toVariant: getVariantSuffix('thumbGrabbing'), 
      duration: '0.15s', 
      curve: 'ease' 
    },
  ];

  const handleValueChange = useCallback((newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;

    if (controlledValue === undefined) {
      setInternalValue(steppedValue);
    }
    onChange?.(steppedValue);
  }, [min, max, step, controlledValue, onChange]);

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return value;

    const rect = trackRef.current.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    return min + (max - min) * percentage;
  }, [min, max, value]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    isDraggingRef.current = true;
    const newValue = getValueFromPosition(e.clientX);
    handleValueChange(newValue);
  }, [disabled, getValueFromPosition, handleValueChange]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  React.useEffect(() => {
    const handleDocumentMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newValue = getValueFromPosition(e.clientX);
      handleValueChange(newValue);
    };

    const handleDocumentMouseUp = () => {
      if (!isDraggingRef.current) return;
      handleMouseUp();
      // Emit mouseUp to transition system for thumb state
      const thumbElement = document.getElementById('thumbId');
      if (thumbElement) {
        thumbElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      }
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, [getValueFromPosition, handleValueChange, handleMouseUp]);

  // Update track width when component mounts
  React.useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.clientWidth);
      }
    };

    updateTrackWidth();
    
    // Add resize observer for dynamic width changes
    const resizeObserver = new ResizeObserver(updateTrackWidth);
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    return () => {
      if (trackRef.current) {
        resizeObserver.unobserve(trackRef.current);
      }
    };
  }, []);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <Frame
      ref={ref}
      variant={variant}
      variants={variants}
      size={size}
      sizes={sizes}
      autoLayout={{ flow: 'vertical', gap: 8 }}
      {...sliderProps}
    >
      {showValue && (
        <Frame
          autoLayout={{ flow: 'horizontal', alignment: 'center' }}
          typography={{ type: 'caption', color: 'gray7' }}
        >
          {value}
        </Frame>
      )}

      <Frame
        ref={trackRef}
        autoLayout={{ flow: 'freeform', width: 'fill-container', height: 6 }}
        appearance={{ radius: 3 }}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        onMouseDown={handleMouseDown}
      >
        {/* Track background */}
        <Frame
          variant={getVariantSuffix("track")}
          variants={variants}
          autoLayout={{ width: 'fill-container', height: 'fill-container' }}
          appearance={{ radius: 3 }}
          position={{ x: 0, y: 0 }}
        />

        {/* Track fill - positioned over track background */}
        <Frame
          variant={getVariantSuffix("trackFill")}
          variants={variants}
          autoLayout={{ width: `${Math.max(0, Math.min(100, percentage))}%`, height: 'fill-container' }}
          appearance={{ radius: 3 }}
          position={{ x: 0, y: 0 }}
        />

        {/* Thumb - uses transition system for hover/drag states */}
        <Frame
          id="thumbId"
          variant={getVariantSuffix("thumb")}
          variants={variants}
          animate={transitions ?? defaultTransitions}
          autoLayout={{ width: 20, height: 20 }}
          appearance={{ radius: 10 }}
          cursor={disabled ? 'not-allowed' : 'grab'}
          position={{ x: Math.max(10, Math.min(trackWidth - 10, (percentage / 100) * trackWidth)), y: -7 }}
        />
      </Frame>
    </Frame>
  );
});

Slider.displayName = 'Slider';

export default Slider;


