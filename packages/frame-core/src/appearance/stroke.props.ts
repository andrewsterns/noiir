import * as React from 'react';
import { resolveColor, colorUtils } from '../../../../src/theme/colors';

//ALL STROKE RELATED PROPS AND HOOKS SHOULD GO IN THIS FILE

export interface IndividualStroke {
  type?: 'none' | 'solid' | 'gradient';
  color?: string;
  weight?: number;
  opacity?: number;
  dashPattern?: number[];
}

export interface StrokePropsBase {
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
  
  // Individual strokes (like Figma)
  top?: IndividualStroke;
  bottom?: IndividualStroke;
  left?: IndividualStroke;
  right?: IndividualStroke;
}

// Support single stroke or array of strokes (like Figma's multiple strokes)
export type StrokeProps = StrokePropsBase | StrokePropsBase[];

/**
 * Convert individual stroke to CSS border string
 */
const convertIndividualStroke = (stroke: IndividualStroke): string => {
  if (!stroke || stroke.type === 'none') return 'none';
  
  const weight = stroke.weight || 1;
  let color = stroke.color ? resolveColor(stroke.color) : '#000000';
  
  // Apply opacity if specified
  if (stroke.opacity !== undefined && stroke.opacity < 1 && color !== 'transparent') {
    color = colorUtils.hexToRgba(color, stroke.opacity);
  }
  
  const style = stroke.dashPattern && stroke.dashPattern.length > 0 ? 'dashed' : 'solid';
  
  return `${weight}px ${style} ${color}`;
};

/**
 * Convert stroke props to CSS styles
 * Supports single stroke or array of strokes (for multiple strokes like Figma)
 */
export const convertStrokeProps = (props: StrokeProps): React.CSSProperties => {
  if (!props) return {};
  
  // Handle array of strokes (multiple strokes)
  if (Array.isArray(props)) {
    return convertMultipleStrokes(props);
  }
  
  // Handle single stroke
  return convertSingleStroke(props);
};

/**
 * Convert single stroke to CSS styles
 */
const convertSingleStroke = (props: StrokePropsBase): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  
  // Check if individual strokes are defined
  const hasIndividualStrokes = props.top || props.bottom || props.left || props.right;
  
  if (hasIndividualStrokes) {
    // Use individual border properties
    if (props.top) {
      styles.borderTop = convertIndividualStroke(props.top);
    }
    if (props.bottom) {
      styles.borderBottom = convertIndividualStroke(props.bottom);
    }
    if (props.left) {
      styles.borderLeft = convertIndividualStroke(props.left);
    }
    if (props.right) {
      styles.borderRight = convertIndividualStroke(props.right);
    }
    
    return styles;
  }
  
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
 * Convert multiple strokes to CSS styles
 * Note: CSS has limited support for multiple borders. We use box-shadow to simulate additional borders.
 */
const convertMultipleStrokes = (strokes: StrokePropsBase[]): React.CSSProperties => {
  if (strokes.length === 0) return {};
  
  // First stroke uses regular border, additional strokes use box-shadow
  const styles = convertSingleStroke(strokes[0]);
  
  // Add additional strokes as box-shadows
  if (strokes.length > 1) {
    const shadows: string[] = [];
    let offset = strokes[0].weight || 1;
    
    for (let i = 1; i < strokes.length; i++) {
      const stroke = strokes[i];
      const weight = stroke.weight || 1;
      let color = stroke.color ? resolveColor(stroke.color) : '#000000';
      
      if (stroke.opacity !== undefined && stroke.opacity < 1) {
        color = colorUtils.hexToRgba(color, stroke.opacity);
      }
      
      // Box-shadow simulates additional borders
      shadows.push(`0 0 0 ${offset + weight}px ${color}`);
      offset += weight;
    }
    
    if (shadows.length > 0) {
      styles.boxShadow = shadows.join(', ');
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