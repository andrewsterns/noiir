import React from 'react';

/**
 * Boolean Operation Props
 * Controls how frames combine with each other (like Figma's boolean operations)
 * 
 * Examples:
 * - <Frame booleanOperation={{type: 'union', target: 'shape2'}} />
 * - <Frame booleanOperation={{type: 'subtract', target: 'circle1'}} />
 * - <Frame booleanOperation={{type: 'intersect', target: 'mask-shape'}} />
 */
export interface BooleanOperationProps {
  // Type of boolean operation
  type: 'union' | 'subtract' | 'intersect' | 'exclude';
  
  // Target frame ID to perform operation with
  target: string;
  
  // Optional: rendering mode ('css' or 'svg')
  // CSS uses clip-path, SVG uses clipPath/mask elements
  mode?: 'css' | 'svg';
}

/**
 * Convert boolean operation props to CSS styles
 * Note: CSS clip-path has limitations for complex boolean operations.
 * For full support, consider using SVG rendering mode.
 */
export const convertBooleanOperationProps = (
  operation: BooleanOperationProps | undefined,
  targetElement?: HTMLElement | null
): React.CSSProperties => {
  if (!operation) return {};
  
  const styles: React.CSSProperties = {};
  const mode = operation.mode || 'css';
  
  if (mode === 'css') {
    // CSS-based boolean operations using clip-path
    // This is limited and works best with simple shapes
    
    switch (operation.type) {
      case 'union':
        // Union requires SVG or complex clip-path calculation
        // For now, just show both elements (limited support)
        console.warn('Boolean operation "union" is best implemented with SVG mode');
        break;
        
      case 'subtract':
        // Subtract can be done with clip-path if we know the target shape
        // This requires dynamic clip-path generation based on target element
        console.warn('Boolean operation "subtract" requires dynamic clip-path generation');
        break;
        
      case 'intersect':
        // Intersection can use CSS clip-path
        console.warn('Boolean operation "intersect" requires dynamic clip-path generation');
        break;
        
      case 'exclude':
        // Exclude (XOR) requires SVG
        console.warn('Boolean operation "exclude" is best implemented with SVG mode');
        break;
    }
    
    // Note: Full implementation would require:
    // 1. Getting the geometry of both frames
    // 2. Computing the boolean operation
    // 3. Generating appropriate clip-path or SVG mask
  } else {
    // SVG mode - requires special rendering in Frame component
    // The Frame component will need to wrap content in SVG and use clipPath/mask elements
    console.log(`Boolean operation "${operation.type}" with target "${operation.target}" using SVG mode`);
  }
  
  return styles;
};

/**
 * Check if boolean operation requires SVG rendering
 */
export const requiresSVGMode = (operation: BooleanOperationProps | undefined): boolean => {
  if (!operation) return false;
  
  // All boolean operations work better with SVG
  // Union and Exclude specifically require SVG
  return operation.type === 'union' || 
         operation.type === 'exclude' || 
         operation.mode === 'svg';
};

/**
 * Get SVG clip-path/mask ID for boolean operation
 */
export const getBooleanOperationId = (frameId: string, operation: BooleanOperationProps): string => {
  return `bool-${operation.type}-${frameId}-${operation.target}`;
};

/**
 * Generate SVG clipPath element for boolean operation
 * This is a placeholder - actual implementation would need the geometries of both shapes
 */
export const generateBooleanOperationSVG = (
  operation: BooleanOperationProps,
  sourceGeometry: any, // Placeholder for actual geometry
  targetGeometry: any  // Placeholder for actual geometry
): string => {
  // This would generate the appropriate SVG clipPath or mask element
  // based on the operation type and the geometries
  
  const id = getBooleanOperationId('source', operation);
  
  switch (operation.type) {
    case 'union':
      return `<clipPath id="${id}"><!-- Union path --></clipPath>`;
      
    case 'subtract':
      return `<clipPath id="${id}"><!-- Subtract path --></clipPath>`;
      
    case 'intersect':
      return `<clipPath id="${id}"><!-- Intersect path --></clipPath>`;
      
    case 'exclude':
      return `<mask id="${id}"><!-- Exclude mask --></mask>`;
      
    default:
      return '';
  }
};
