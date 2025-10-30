import React, { useState, useRef, useCallback } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { SLIDER_VARIANTS, SLIDER_SIZES } from './slider.variants';
import { FrameVariantConfig } from '../../frame/frame-properties/variants/variants.props';

export interface SliderProps extends Omit<FrameProps, 'onChange' | 'value'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  disabled?: boolean;
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
  variants = SLIDER_VARIANTS,
  size = 'medium',
  sizes = SLIDER_SIZES,
  ...sliderProps
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [trackWidth, setTrackWidth] = useState(200); // Default width
  const trackRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Determine variant suffixes based on the variant type
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

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (disabled) return;

    setIsDragging(true);
    const newValue = getValueFromPosition(event.clientX);
    handleValueChange(newValue);
  }, [disabled, getValueFromPosition, handleValueChange]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging) return;
    const newValue = getValueFromPosition(event.clientX);
    handleValueChange(newValue);
  }, [isDragging, getValueFromPosition, handleValueChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
          autoLayout={{ width: 'fill-container', height: 'fill-container' }}
          appearance={{ radius: 3 }}
          position={{ x: 0, y: 0 }}
        />

        {/* Track fill - positioned over track background */}
        <Frame
          variant={getVariantSuffix("trackFill")}
          autoLayout={{ width: `${Math.max(0, Math.min(100, percentage))}%`, height: 'fill-container' }}
          appearance={{ radius: 3 }}
          position={{ x: 0, y: 0 }}
        />

        {/* Thumb - positioned based on percentage */}
        <Frame
          variant={isDragging ? getVariantSuffix("thumbActive") : getVariantSuffix("thumb")}
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
