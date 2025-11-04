/**
 * Design System Colors
 * Updated to 1-10 scale with semantic color states
 */

export const colors = {
  // Neutral Colors (1-10 scale)
  "white": {
    "1": "#FFFFFF",  // Pure white
    "2": "#FAFAFA",  // Almost white
    "3": "#F5F5F5",  // Very light gray
    "4": "#F0F0F0",  // Light neutral gray
    "5": "#EBEBEB",  // Slightly darker
    "6": "#E6E6E6",  // Mid-light
    "7": "#E0E0E0",  // Transition into gray range
    "8": "#DADADA",  // Light gray border
    "9": "#D4D4D4",  // Deeper light gray
    "10": "#CFCFCF"  // Deepest white tone
  },
  "gray": {
    "1": "#C9C9C9",  // Lightest gray
    "2": "#BFBFBF",  // Very light gray
    "3": "#B5B5B5",  // Light gray
    "4": "#ABABAB",  // Light-mid gray
    "5": "#9F9F9F",  // Middle gray
    "6": "#939393",  // Mid gray
    "7": "#878787",  // Mid-dark gray
    "8": "#7B7B7B",  // Dark gray
    "9": "#6F6F6F",  // Very dark gray
    "10": "#636363"  // Deepest gray
  },
  "black": {
    "1": "#575757",  // Lightest black (charcoal)
    "2": "#4D4D4D",  // Light charcoal
    "3": "#434343",  // Mid-light charcoal
    "4": "#393939",  // Mid charcoal
    "5": "#2F2F2F",  // Middle black
    "6": "#252525",  // Mid-dark
    "7": "#1B1B1B",  // Dark
    "8": "#121212",  // Very dark
    "9": "#090909",  // Almost black
    "10": "#000000"  // Pure black
  },

  // Brand Colors (1-10 scale)
  "blue": {
    "1": "#E6F4FF",  // Lightest blue
    "2": "#CCE9FF",  // Very light blue
    "3": "#B3DEFF",  // Light blue
    "4": "#99D3FF",  // Light-mid blue
    "5": "#66BDFF",  // Mid blue
    "6": "#4DB3FF",  // Bright blue
    "7": "#1AA3FF",  // Vivid blue
    "8": "#0090E6",  // Strong blue
    "9": "#0077CC",  // Deep blue
    "10": "#0066B3"  // Deepest blue
  },
  "green": {
    "1": "#E6F9ED",  // Lightest green
    "2": "#CCF3DB",  // Very light green
    "3": "#B3EDC9",  // Light green
    "4": "#99E7B7",  // Light-mid green
    "5": "#66DB93",  // Mid green
    "6": "#4DD581",  // Bright green
    "7": "#1AC46F",  // Vivid green
    "8": "#00AD5D",  // Strong green
    "9": "#00944B",  // Deep green
    "10": "#007A3D"  // Deepest green
  },
  "red": {
    "1": "#FFF0ED",  // Lightest red
    "2": "#FFE0DB",  // Very light red
    "3": "#FFC9C0",  // Light red
    "4": "#FFB3A6",  // Light-mid red
    "5": "#FF8C73",  // Mid red
    "6": "#FF7659",  // Bright red
    "7": "#FF5C3D",  // Vivid red
    "8": "#E64523",  // Strong red
    "9": "#CC3510",  // Deep red
    "10": "#B32A00"  // Deepest red
  },
  "yellow": {
    "1": "#FFFCF0",  // Lightest yellow
    "2": "#FFF8E0",  // Very light yellow
    "3": "#FFF3CC",  // Light yellow
    "4": "#FFEDB3",  // Light-mid yellow
    "5": "#FFE280",  // Mid yellow
    "6": "#FFDC66",  // Bright yellow
    "7": "#FFD11A",  // Vivid yellow
    "8": "#E6B800",  // Strong yellow
    "9": "#CC9F00",  // Deep yellow
    "10": "#B38900"  // Deepest yellow
  },
  "purple": {
    "1": "#F9F0FF",  // Lightest purple
    "2": "#F3E0FF",  // Very light purple
    "3": "#EDCCFF",  // Light purple
    "4": "#E6B3FF",  // Light-mid purple
    "5": "#D480FF",  // Mid purple
    "6": "#C966FF",  // Bright purple
    "7": "#B84DFF",  // Vivid purple
    "8": "#9C33E6",  // Strong purple
    "9": "#8019CC",  // Deep purple
    "10": "#6600B3"  // Deepest purple
  },
  "orange": {
    "1": "#FFF7F0",  // Lightest orange
    "2": "#FFEDE0",  // Very light orange
    "3": "#FFE3CC",  // Light orange
    "4": "#FFD9B3",  // Light-mid orange
    "5": "#FFC480",  // Mid orange
    "6": "#FFB566",  // Bright orange
    "7": "#FFA03D",  // Vivid orange
    "8": "#E68523",  // Strong orange
    "9": "#CC6F10",  // Deep orange
    "10": "#B35900"  // Deepest orange
  },

  // Semantic Color States (1-10 scale)
  "primary": {
     "1": "#575757",  // Lightest black (charcoal)
    "2": "#4D4D4D",  // Light charcoal
    "3": "#434343",  // Mid-light charcoal
    "4": "#393939",  // Mid charcoal
    "5": "#2F2F2F",  // Middle black
    "6": "#252525",  // Mid-dark
    "7": "#1B1B1B",  // Dark
    "8": "#121212",  // Very dark
    "9": "#090909",  // Almost black
    "10": "#000000"  // Pure black
  },
  "secondary": {
    "1": "#F9F0FF",  // Purple-based secondary
    "2": "#F3E0FF",
    "3": "#EDCCFF",
    "4": "#E6B3FF",
    "5": "#D480FF",
    "6": "#C966FF",
    "7": "#B84DFF",
    "8": "#9C33E6",
    "9": "#8019CC",
    "10": "#6600B3"
  },
  "accent": {
    "1": "#FFF7F0",  // Orange-based accent
    "2": "#FFEDE0",
    "3": "#FFE3CC",
    "4": "#FFD9B3",
    "5": "#FFC480",
    "6": "#FFB566",
    "7": "#FFA03D",
    "8": "#E68523",
    "9": "#CC6F10",
    "10": "#B35900"
  },
  "error": {
    "1": "#FFF0ED",  // Red-based error
    "2": "#FFE0DB",
    "3": "#FFC9C0",
    "4": "#FFB3A6",
    "5": "#FF8C73",
    "6": "#FF7659",
    "7": "#FF5C3D",
    "8": "#E64523",
    "9": "#CC3510",
    "10": "#B32A00"
  },
  "success": {
    "1": "#E6F9ED",  // Green-based success
    "2": "#CCF3DB",
    "3": "#B3EDC9",
    "4": "#99E7B7",
    "5": "#66DB93",
    "6": "#4DD581",
    "7": "#1AC46F",
    "8": "#00AD5D",
    "9": "#00944B",
    "10": "#007A3D"
  },
  "warning": {
    "1": "#FFFCF0",  // Yellow-based warning
    "2": "#FFF8E0",
    "3": "#FFF3CC",
    "4": "#FFEDB3",
    "5": "#FFE280",
    "6": "#FFDC66",
    "7": "#FFD11A",
    "8": "#E6B800",
    "9": "#CC9F00",
    "10": "#B38900"
  },
  "info": {
    "1": "#E6F4FF",  // Blue-based info (same as primary)
    "2": "#CCE9FF",
    "3": "#B3DEFF",
    "4": "#99D3FF",
    "5": "#66BDFF",
    "6": "#4DB3FF",
    "7": "#1AA3FF",
    "8": "#0090E6",
    "9": "#0077CC",
    "10": "#0066B3"
  },

  // Legacy tomato (keeping for backwards compatibility)
  "tomato": {
    "1": "#FFF0ED",
    "2": "#FFE0DB",
    "3": "#FFC9C0",
    "4": "#FFB3A6",
    "5": "#FF8C73",
    "6": "#FF7659",
    "7": "#FF5C3D",
    "8": "#E64523",
    "9": "#CC3510",
    "10": "#B32A00"
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
 * Helper function to resolve color strings like 'primary4' or hex colors
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
  
  // Parse theme color format like 'primary4' or 'error10'
  const match = colorInput.match(/^([a-z]+)(\d{1,2})$/);
  if (match) {
    const [, colorName, shadeNum] = match;
    const shade = shadeNum as ColorShade;
    
    if (colorName in colors) {
      const colorScale = colors[colorName as ColorKey];
      if (shade in colorScale) {
        return colorScale[shade];
      }
    }
  }
  
  // Fallback to black10 if parsing fails
  return colors.black[10];
};

/**
 * Type definitions for colors
 */
export type ColorScale = typeof colors.gray;
export type ColorKey = keyof typeof colors;
export type ColorShade = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

/**
 * Re-export for convenience
 */
export default colors;