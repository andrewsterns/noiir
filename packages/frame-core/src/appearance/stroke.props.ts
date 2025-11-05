import * as React from 'react';
import { resolveColor, colorUtils } from '@theme/colors';

//ALL STROKE RELATED PROPS AND HOOKS SHOULD GO IN THIS FILE

export interface StrokeProps {
  type?: 'none' | 'solid' | 'gradient';
  color?: string; // Either hex like '#333333' or theme color like 'primary3'
  position?: 'inside' | 'outside' | 'center';
  weight?: number;
  opacity?: number; // Overall stroke opacity (0-1)
  dashPattern?: number[];
  lineCap?: 'none' | 'round' | 'square';
  lineJoin?: 'miter' | 'round' | 'bevel';
  
  // Gradient properties (when type is 'gradient')
  stops?: Array<{ color: string; position: number; opacity?: number }>;
  gradientType?: 'linear' | 'radial' | 'angular';
  angle?: number; // For linear and angular gradients
}

/**
 * Convert stroke props to CSS styles
 */
export const convertStrokeProps = (props: StrokeProps): React.CSSProperties => {
  if (!props) return {};
  
  const styles: React.CSSProperties = {};
  
  // Default stroke type to 'solid' if not provided
  const strokeType = props.type ?? 'solid';

  // Stroke weight (border width)
  const strokeWeight = props.weight || 1;

  // Stroke color - for gradients, we'll use the first stop or a default
  let strokeColor = '#000000'; // default

  if (strokeType === 'solid') {
    // If color is 'transparent', use CSS transparent
    if (props.color === 'transparent') {
      strokeColor = 'transparent';
    } else {
      strokeColor = props.color ? resolveColor(props.color) : 'transparent';
    }
  } else if (strokeType === 'gradient' && props.stops && props.stops.length > 0) {
    // Gradient strokes are handled specially in the Frame component with a wrapper element
    // Return empty styles here since the Frame component handles the gradient border
    return {};
  } else if (strokeType === 'none') {
    return { border: 'none' };
  }

  // Apply opacity to stroke color if specified (for solid strokes)
  if (props.opacity !== undefined && props.opacity < 1 && strokeColor !== 'transparent') {
    strokeColor = colorUtils.hexToRgba(strokeColor, props.opacity);
  }

  // Stroke position
  switch (props.position) {
    case 'inside':
      // Inside stroke (default CSS behavior)
      styles.border = `${strokeWeight}px solid ${strokeColor}`;
      break;

    case 'outside':
      // Outside stroke using outline (closest CSS equivalent)
      styles.outline = `${strokeWeight}px solid ${strokeColor}`;
      styles.outlineOffset = '0px';
      break;

    case 'center':
    default:
      // Center stroke (default)
      styles.border = `${strokeWeight}px solid ${strokeColor}`;
      break;
  }

  // Dash pattern
  if (props.dashPattern && props.dashPattern.length > 0) {
    if (props.position === 'outside') {
      styles.outlineStyle = 'dashed';
    } else {
      styles.borderStyle = 'dashed';
    }
  } else {
    // Ensure solid style for non-dashed strokes
    if (props.position === 'outside') {
      styles.outlineStyle = 'solid';
    } else {
      styles.borderStyle = 'solid';
    }
  }

  return styles;
};

/**
 * Create stroke pattern string
 */
export const createStrokePattern = (pattern: number[]): string => {
  return pattern.join(' ');
};