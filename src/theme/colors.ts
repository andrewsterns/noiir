/**
 * Design System Colors
 * Converted from colors.css for TypeScript usage
 */

export const colors = {
  // Primary Colors
"gray": {
  "1": "#f5f3f3ff",  // Very light gray
  "2": "#f3f3f5ff",  // Light gray
  "3": "#e4e5e9ff",  // Slightly darker light gray
  "4": "#cacdcfff",  // Light-medium gray
  "5": "#b0b3b6",    // Medium gray
  "6": "#96999c",    // Medium-dark gray
  "7": "#7c7f82",    // Darker gray
  "8": "#626568",    // Even darker gray
  "9": "#484b4e",    // Very dark gray
  "10": "#2e3134",   // Near black
  "11": "#18191a",   // Almost black
  "12": "#050505"    // Pure black for contrast
},


  "black": {
    "1": "#f2f2f2ff",  // Very light black
    "2": "#d9d9d9ff",  // Light black
    "3": "#bfbfbfff",  // Slightly darker light black
    "4": "#a6a6a6ff",  // Medium light black
    "5": "#8c8c8cff",  // Medium black
    "6": "#737373ff",  // Medium dark black
    "7": "#595959ff",  // Dark black
    "8": "#404040ff",  // Darker black
    "9": "#262626ff",  // Very dark black
    "10": "#0d0d0dff", // Near black
    "11": "#050505ff", // Almost black
    "12": "#000000ff"  // Pure black
},
} as const;

/**
 * Color utility functions
 */
export const colorUtils = {
  /**
   * Convert hex to rgba
   */
  hexToRgba: (hex: string, alpha: number = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
};

/**
 * Helper function to resolve color strings like 'primary3' or hex colors
 */
export const resolveColor = (colorInput: string): string => {
  // Type guard: ensure colorInput is a string
  if (typeof colorInput !== 'string') {
    console.warn('resolveColor received non-string input:', colorInput);
    return '#000000'; // fallback color
  }
  
  // If it's a hex color, return as-is
  if (colorInput.startsWith('#')) {
    return colorInput;
  }
  
  // Parse theme color format like 'primary3' or 'success12'
  const match = colorInput.match(/^([a-z]+)(\d{1,2})$/);
  if (match) {
    const [, colorName, shadeNum] = match;
    const shade = parseInt(shadeNum) as unknown as ColorShade;
    
    if (colorName in colors) {
      const colorScale = colors[colorName as ColorKey];
      if (shade in colorScale) {
        return colorScale[shade];
      }
    }
  }
  
  // Fallback to blue9 if parsing fails
  return colors.black[9];
};

/**
 * Type definitions for colors
 */
export type ColorScale = typeof colors.gray;
export type ColorKey = keyof typeof colors;
export type ColorShade = keyof ColorScale;

/**
 * Re-export for convenience
 */
export default colors;