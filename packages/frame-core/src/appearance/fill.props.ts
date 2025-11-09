import React from 'react';
import { colors, colorUtils, resolveColor, type ColorKey, type ColorShade } from '../../../../src/theme/colors';

/**
 * Simplified Fill Props with flattened gradient API
 * Examples:
 * - <Frame fill={{type: 'solid', color: 'primary3'}} />
 * - <Frame fill={{type: 'linear-gradient', angle: 45, stops: [{color: 'primary3', position: 0}, {color: 'primary8', position: 1}]}} />
 * - <Frame fill={{type: 'image', image: {src: 'https://example.com/image.jpg', scaleMode: 'fill'}}} />
 * - <Frame fill={[{type: 'linear-gradient', ...}, {type: 'linear-gradient', ...}]} /> // Multiple fills
 */
export interface FillPropsBase {
  type?: 'none' | 'solid' | 'linear-gradient' | 'radial-gradient' | 'conic-gradient' | 'image';
  color?: string; // For solid fills or image/element color (hex like '#333333' or theme color like 'primary3')
  opacity?: number; // Overall fill opacity (0-1)
  
  // Gradient properties (when type is a gradient)
  stops?: Array<{ color: string; position: number }>;
  angle?: number; // For linear and conic gradients
  
  // Image properties (when type is 'image')
  image?: {
    src?: string | React.ReactElement; // String URL, imported asset, or React element (SVG component)
    element?: React.ReactElement; // Alternative way to pass React element (deprecated, use src)
    alt?: string;
    size?: number;
    scaleMode?: 'fill' | 'fit' | 'crop' | 'tile';
  };
}

// Support single fill or array of fills (like Figma's multiple fills)
export type FillProps = FillPropsBase | FillPropsBase[];



/**
 * Convert fill props to CSS styles
 * Supports single fill or array of fills (for multiple fills like Figma)
 */
export const convertFillProps = (
  props: FillProps,
  isTextElement: boolean = false
): React.CSSProperties => {
  if (!props) return {};
  
  console.log('🎨 convertFillProps called:', { props, isArray: Array.isArray(props), isTextElement });
  
  // Handle array of fills (multiple fills)
  if (Array.isArray(props)) {
    return convertMultipleFills(props, isTextElement);
  }
  
  // Handle single fill
  return convertSingleFill(props, isTextElement);
};

/**
 * Convert single fill to CSS styles
 */
const convertSingleFill = (
  props: FillPropsBase,
  isTextElement: boolean = false
): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  
  // Determine the fill type
  const fillType = props.type || (props.color ? 'solid' : props.stops ? 'linear-gradient' : props.image ? 'image' : 'solid');
  
  switch (fillType) {
    case 'none':
      // No fill - explicitly set transparent background
      if (!isTextElement) {
        styles.backgroundColor = 'transparent';
      }
      // For text elements, don't set any color (use inherited/default)
      break;
      
    case 'solid':
      // Solid color fill
      if (props.color && typeof props.color === 'string') {
        const resolvedColor = resolveColor(props.color);
        const finalColor = props.opacity !== undefined && props.opacity < 1 
          ? colorUtils.hexToRgba(resolvedColor, props.opacity)
          : resolvedColor;
        if (isTextElement) {
          styles.color = finalColor;
        } else {
          styles.backgroundColor = finalColor;
        }
      }
      break;
      
    case 'linear-gradient':
    case 'radial-gradient':
    case 'conic-gradient':
      // Gradient fill with flattened API
      if (props.stops && props.stops.length > 0) {
        const gradientString = createGradientString(fillType, props.stops, props.angle, props.opacity);
        if (gradientString) {
          if (isTextElement) {
            // For text elements, use background-clip: text
            styles.background = gradientString;
            styles.WebkitBackgroundClip = 'text';
            styles.backgroundClip = 'text';
            styles.WebkitTextFillColor = 'transparent';
            styles.color = 'transparent';
          } else {
            styles.background = gradientString;
          }
        }
      }
      break;
      
    case 'image':
      // Image fill
      if (props.image) {
        const imageStyles = createImageFillStyles(props.image);
        if (isTextElement) {
          // For text elements, use background-clip: text
          Object.assign(styles, imageStyles);
          styles.WebkitBackgroundClip = 'text';
          styles.backgroundClip = 'text';
          styles.WebkitTextFillColor = 'transparent';
          styles.color = 'transparent';
        } else {
          Object.assign(styles, imageStyles);
        }
        // Apply opacity to the image fill (affects the entire element for images)
        if (props.opacity !== undefined && props.opacity < 1) {
          styles.opacity = props.opacity;
        }
      }
      break;
  }
  
  return styles;
};

/**
 * Convert multiple fills to CSS styles
 * Multiple fills are stacked using CSS background layers (comma-separated)
 */
const convertMultipleFills = (
  fills: FillPropsBase[],
  isTextElement: boolean = false
): React.CSSProperties => {
  if (fills.length === 0) return {};
  
  console.log('📦 convertMultipleFills:', { fillsCount: fills.length, fills });
  
  // For multiple fills, we need to combine them into a single background property
  const gradients: string[] = [];
  const styles: React.CSSProperties = {};
  
  // Process fills in reverse order (first fill is on top in Figma)
  // CSS backgrounds are rendered in reverse order (first is on top)
  fills.forEach((fill, index) => {
    const fillType = fill.type || (fill.color ? 'solid' : fill.stops ? 'linear-gradient' : fill.image ? 'image' : 'solid');
    
    console.log(`  Fill ${index}:`, { fillType, hasImage: !!fill.image, imageSrc: fill.image?.src, color: fill.color });
    
    switch (fillType) {
      case 'solid':
        if (fill.color) {
          const resolvedColor = resolveColor(fill.color);
          const finalColor = fill.opacity !== undefined && fill.opacity < 1 
            ? colorUtils.hexToRgba(resolvedColor, fill.opacity)
            : resolvedColor;
          gradients.push(`linear-gradient(${finalColor}, ${finalColor})`);
          console.log(`    Added solid as gradient: ${finalColor}`);
        }
        break;
        
      case 'linear-gradient':
      case 'radial-gradient':
      case 'conic-gradient':
        if (fill.stops && fill.stops.length > 0) {
          const gradientString = createGradientString(fillType, fill.stops, fill.angle, fill.opacity);
          if (gradientString) {
            gradients.push(gradientString);
            console.log(`    Added gradient: ${gradientString.substring(0, 50)}...`);
          }
        }
        break;
        
      case 'image':
        if (fill.image?.src && typeof fill.image.src === 'string') {
          gradients.push(`url(${fill.image.src})`);
          console.log(`    Added image URL: ${fill.image.src.substring(0, 50)}...`);
          
          // Set background size/position/repeat for the image
          // These apply to ALL background layers, so we need to be careful
          if (!styles.backgroundSize) {
            const scaleMode = fill.image.scaleMode || 'fill';
            switch (scaleMode) {
              case 'fill':
                styles.backgroundSize = 'cover';
                styles.backgroundPosition = 'center';
                styles.backgroundRepeat = 'no-repeat';
                break;
              case 'fit':
                styles.backgroundSize = 'contain';
                styles.backgroundPosition = 'center';
                styles.backgroundRepeat = 'no-repeat';
                break;
              case 'crop':
                styles.backgroundSize = 'auto';
                styles.backgroundPosition = 'center';
                styles.backgroundRepeat = 'no-repeat';
                break;
              case 'tile':
                styles.backgroundSize = 'auto';
                styles.backgroundRepeat = 'repeat';
                break;
              default:
                styles.backgroundSize = 'cover';
                styles.backgroundPosition = 'center';
                styles.backgroundRepeat = 'no-repeat';
            }
          }
        }
        break;
    }
  });
  
  console.log('  Total gradients/backgrounds:', gradients.length, gradients);
  
  if (gradients.length > 0) {
    styles.background = gradients.join(', ');
    
    if (isTextElement) {
      styles.WebkitBackgroundClip = 'text';
      styles.backgroundClip = 'text';
      styles.WebkitTextFillColor = 'transparent';
      styles.color = 'transparent';
    }
  }
  
  return styles;
};



/**
 * Create gradient strings with flattened API
 */
const createGradientString = (
  type: 'linear-gradient' | 'radial-gradient' | 'conic-gradient',
  stops: Array<{ color: string; position: number }>,
  angle?: number,
  opacity?: number
): string => {
  if (!stops.length) return '';
  
  // Sort stops by position
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  
  // Create color stops string
  const colorStops = sortedStops
    .map(stop => {
      const resolvedColor = resolveColor(stop.color);
      const finalColor = opacity !== undefined && opacity < 1 
        ? colorUtils.hexToRgba(resolvedColor, opacity)
        : resolvedColor;
      return `${finalColor} ${Math.round(stop.position * 100)}%`;
    })
    .join(', ');
  
  switch (type) {
    case 'linear-gradient':
      const linearAngle = angle || 0;
      return `linear-gradient(${linearAngle}deg, ${colorStops})`;
      
    case 'radial-gradient':
      return `radial-gradient(circle, ${colorStops})`;
      
    case 'conic-gradient':
      const conicAngle = angle || 0;
      return `conic-gradient(from ${conicAngle}deg, ${colorStops})`;
      
    default:
      return `linear-gradient(0deg, ${colorStops})`;
  }
};

/**
 * Create image fill styles
 */
const createImageFillStyles = (image: FillPropsBase['image']): React.CSSProperties => {
  if (!image) return {};
  
  // Handle React elements (like SVG components) - can't use as CSS background
  if (image.element || (image.src && typeof image.src !== 'string')) {
    // For React elements, we'll need to render them differently
    // Return empty styles - the Frame component should handle this case
    return {};
  }
  
  // Handle URL string for images (including imported assets that resolve to strings)
  if (!image.src) return {};
  
  const styles: React.CSSProperties = {
    backgroundImage: `url(${image.src})`
  };
  
  // Scale mode
  switch (image.scaleMode) {
    case 'fill':
      // Fill entire container (may crop)
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
      styles.backgroundRepeat = 'no-repeat';
      break;
      
    case 'fit':
      // Fit entire image (may show empty space)
      styles.backgroundSize = 'contain';
      styles.backgroundPosition = 'center';
      styles.backgroundRepeat = 'no-repeat';
      break;
      
    case 'crop':
      // Show image at original size (may crop)
      styles.backgroundSize = 'auto';
      styles.backgroundPosition = 'center';
      styles.backgroundRepeat = 'no-repeat';
      break;
      
    case 'tile':
      // Repeat/tile the image
      styles.backgroundSize = 'auto';
      styles.backgroundRepeat = 'repeat';
      break;
      
    default:
      // Default to fill behavior
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
      styles.backgroundRepeat = 'no-repeat';
      break;
  }
  
  return styles;
};

// Export utility functions for external use
export { createGradientString };
export { createImageFillStyles };

// Export convertMultipleFills for external use
export { convertMultipleFills };

// For backward compatibility, export the same function with different name
export const convertFillPropsUnified = convertFillProps;
export const convertSimpleFillProps = convertFillProps;