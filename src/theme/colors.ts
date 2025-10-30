/**
 * Design System Colors
 * Converted from colors.css for TypeScript usage
 */

export const colors = {
  // Primary Colors
  "white": {
    "1": "#FFFFFF",  // Pure white
    "2": "#F8F8F8",  // Almost white
    "3": "#F2F2F2",  // Very light gray
    "4": "#ECECEC",  // Light neutral gray
    "5": "#E6E6E6",  // Slightly darker
    "6": "#E0E0E0",  // Transition into gray range
    "7": "#DADADA"   // Deepest white tone, bordering gray
  },
  "gray": {
    "1": "#CFCFCF",  // Soft mid-light gray
    "2": "#BFBFBF",  // Balanced neutral gray
    "3": "#AFAFAF",  // Middle gray
    "4": "#9F9F9F",  // Slightly darker mid-gray
    "5": "#8F8F8F",  // Deep gray
    "6": "#7F7F7F",  // Classic mid-dark gray
    "7": "#6F6F6F"   // Dark neutral gray, approaching black
  },
  "black": {
    "1": "#5C5C5C",  // Deep charcoal
    "2": "#4A4A4A",  // Dark gray
    "3": "#383838",  // Almost black
    "4": "#2A2A2A",  // Very dark charcoal
    "5": "#1C1C1C",  // Near black
    "6": "#0E0E0E",  // Almost full black
    "7": "#000000"   // Pure black
  },

  "tomato": {
    "1": "#f8f5f4ff",  // Tomato red
    "2": "#f0dbd4ff",  // Coral
    "3": "#f3c1b2ff",  // Light tomato
    "4": "#eea68aff",  // Light salmon
    "5": "#ee8d60ff",  // Light pink
    "6": "#f06d3dff",  // Orange red
    "7": "#f0642dff"   // Pure red
  },
  "blue": {
    "1": "#E0F2FF",  // Very light blue
    "2": "#B3E0FF",  // Light blue
    "3": "#80CCFF",  // Soft blue
    "4": "#4DB8FF",  // Bright blue
    "5": "#1AA3FF",  // Vivid blue
    "6": "#008AE6",  // Strong blue
    "7": "#0066B3"   // Deep blue
  }
  ,
  "green": {
    "1": "#E6F9ED",  // Very light green
    "2": "#B8F2D0",  // Light green
    "3": "#7FE7B5",  // Soft green
    "4": "#4DDC99",  // Bright green
    "5": "#1AC47A",  // Vivid green
    "6": "#009E5A",  // Strong green
    "7": "#007A43"   // Deep green
  },
  "yellow": {
    "1": "#FFF9E0",  // Very light yellow
    "2": "#FFF3B3",  // Light yellow
    "3": "#FFE980",  // Soft yellow
    "4": "#FFDD4D",  // Bright yellow
    "5": "#FFD11A",  // Vivid yellow
    "6": "#E6B800",  // Strong yellow
    "7": "#B38F00"   // Deep yellow
  },
  "purple": {
    "1": "#F3E6FF",  // Very light purple
    "2": "#E0B3FF",  // Light purple
    "3": "#CC80FF",  // Soft purple
    "4": "#B84DFF",  // Bright purple
    "5": "#A31AFF",  // Vivid purple
    "6": "#8A00E6",  // Strong purple
    "7": "#6600B3"   // Deep purple
  },
  "orange": {
    "1": "#FFF3E0",  // Very light orange
    "2": "#FFD9B3",  // Light orange
    "3": "#FFC080",  // Soft orange
    "4": "#FFA64D",  // Bright orange
    "5": "#FF8C1A",  // Vivid orange
    "6": "#E67300",  // Strong orange
    "7": "#B35900"   // Deep orange
  }
};

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
  return colors.black[7];
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