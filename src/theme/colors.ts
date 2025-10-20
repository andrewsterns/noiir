/**
 * Design System Colors
 * Converted from colors.css for TypeScript usage
 */

export const colors = {
  // Primary Colors
"gray": {
  "1": "#0A0A0A",  // Very dark gray (almost black)
  "2": "#1A1A1A",  // Dark gray
  "3": "#2A2A2A",  // Medium dark gray
  "4": "#3A3A3A",  // Slightly lighter dark gray
  "5": "#4A4A4A",  // Mid gray
  "6": "#5A5A5A",  // Medium gray
  "7": "#6A6A6A",  // Light medium gray
  "8": "#7A7A7A",  // Light gray
  "9": "#8A8A8A",  // Lighter gray
  "10": "#9A9A9A", // Even lighter
  "11": "#AAAAAA", // Light gray
  "12": "#FFFFFF"  // Pure white for contrast
},

"black": {
  "1": "#050505",  // Ultra black
  "2": "#0A0A0A",  // Very dark
  "3": "#0F0F0F",  // Dark
  "4": "#141414",  // Medium dark
  "5": "#1A1A1A",  // Dark gray
  "6": "#1F1F1F",  // Slightly lighter
  "7": "#242424",  // Medium
  "8": "#292929",  // Light medium
  "9": "#2E2E2E",  // Lighter
  "10": "#333333", // Even lighter
  "11": "#383838", // Light
  "12": "#FFFFFF"  // White
},

"purple": {
  "1": "#F7F5FC",
  "2": "#EDEAF9",
  "3": "#E2DFF5",
  "4": "#D6D2F0",
  "5": "#C9C3EC",
  "6": "#C0B3E2",
  "7": "#AB95CC",
  "8": "#9676B6",
  "9": "#7A5DB3",
  "10": "#62448F",
  "11": "#4A356A",
  "12": "#36264A"
},

"blue": {
  "1": "#0A0F1A",  // Very dark blue
  "2": "#0F1629",  // Dark blue
  "3": "#141D38",  // Medium dark blue
  "4": "#192447",  // Darker blue
  "5": "#1E2B56",  // Medium blue
  "6": "#233265",  // Lighter blue
  "7": "#283974",  // Light blue
  "8": "#2D4083",  // Lighter blue
  "9": "#334792",  // Bright blue accent
  "10": "#4A5FA1", // Lighter accent
  "11": "#6177B0", // Even lighter
  "12": "#FFFFFF"  // White
},


"oat": {
  "1": "#FDFBF8",
  "2": "#F9F5F1",
  "3": "#F4F0ED",
  "4": "#EEE8E2",
  "5": "#E8E1DB",
  "6": "#E1D9D2",
  "7": "#D8CFC6",
  "8": "#CFC5BA",
  "9": "#C6BBB0",
  "10": "#BCB1A6",
  "11": "#B3A799",
  "12": "#A99D8F"
},


  // Semantic Colors
"grass": {
  "1": "#EDF7F0",
  "2": "#DFF0E1",
  "3": "#D0E9D2",
  "4": "#C2E1C3",
  "5": "#B3DACF",
  "6": "#BDD3C1",
  "7": "#A0BFA8",
  "8": "#86AA8F",
  "9": "#6C9575",
  "10": "#55785F",
  "11": "#405C49",
  "12": "#2C3F34"
},

  warning: {
    1: '#fffbeb',
    2: '#fef3c7',
    3: '#fde68a',
    4: '#fcd34d',
    5: '#fbbf24',
    6: '#f59e0b',
    7: '#d97706',
    8: '#b45309',
    9: '#92400e',
    10: '#78350f',
    11: '#451a03',
    12: '#1c0a01',
  },

 "tomato": {
  "1": "#FFF1ED",
  "2": "#FFE3DB",
  "3": "#FFD5C9",
  "4": "#FFC7B7",
  "5": "#FFB99F",
  "6": "#EE8F67",
  "7": "#D4775A",
  "8": "#B8604C",
  "9": "#9B493F",
  "10": "#7C362F",
  "11": "#5F261F",
  "12": "#42180F"
}


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
  return colors.blue[9];
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