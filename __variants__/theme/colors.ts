/**
 * Color Resolution Utility
 * 
 * Users should define their own color variants in their project.
 * This function accepts an optional color palette and resolves color names to hex values.
 * 
 * @example
 * // In your project: my-app/variants/colors.ts
 * export const myColors = {
 *   brand1: '#ff0000',
 *   brand2: '#00ff00',
 *   darkText: '#1a1a1a'
 * };
 * 
 * // Then use directly:
 * <Frame fill={{ type: 'solid', color: '#ff0000' }} />
 * // Or with color name (if you pass myColors to resolveColor)
 * <Frame fill={{ type: 'solid', color: 'brand1' }} />
 */

// Optional: Example color palette (users should define their own)
// This is provided for backward compatibility and as a reference.
// See __examples__/user-defined-variants/my-colors.ts for a complete example.
export const exampleColors = {
  // Basic colors - use as reference or define your own
  primary: '#2196f3',
  secondary: '#9c27b0',
  error: '#f44336',
  success: '#4caf50',
  warning: '#ffeb3b',
  black: '#000',
  white: '#fff',
};

// Legacy export for backward compatibility
// Deprecated: Define your own colors in your project instead
export const colors = exampleColors;

/**
 * Resolve color name to hex value
 * @param key - Color name or hex/rgb/rgba value
 * @param colorPalette - Optional user-defined color palette
 * @returns Resolved color value (hex, rgb, rgba, or original value)
 */
export function resolveColor(key: string, colorPalette?: Record<string, string>): string {
  // If it starts with #, rgb, rgba, hsl, etc. - return as is
  if (key.startsWith('#') || key.startsWith('rgb') || key.startsWith('hsl') || key.startsWith('var(')) {
    return key;
  }
  
  // Check user-provided color palette first
  if (colorPalette && key in colorPalette) {
    return colorPalette[key];
  }
  
  // Check example colors (for backward compatibility)
  if (key in exampleColors) {
    return exampleColors[key as keyof typeof exampleColors];
  }
  
  // Return as-is (might be CSS color name like 'red', 'blue', 'transparent', etc.)
  return key;
}

export { colorUtils } from './colorUtils';
