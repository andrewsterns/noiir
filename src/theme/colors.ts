/**
 * Design System Colors
 * Converted from colors.css for TypeScript usage
 */

export const colors = {
  // Primary Colors
primary: {
    1: '#f4f6fb',
    2: '#e7ebfa',
    3: '#c7d3f5',
    4: '#9aaef0',
    5: '#6a84e8',
    6: '#495fd5',
    7: '#3545b0',
    8: '#27368c',
    9: '#1d2967',
    10: '#161f4c',
    11: '#0f1634',
    12: '#0a0b1e',
  },

  secondary: {
    1: '#f6f7f8',
    2: '#eceef0',
    3: '#dadde1',
    4: '#b4b8bf',
    5: '#8a9099',
    6: '#666c74',
    7: '#4c5158',
    8: '#36393f',
    9: '#25272b',
    10: '#1b1c1f',
    11: '#101113',
    12: '#070708',
  },

  accent: {
    1: '#faf6ff',
    2: '#f0e8ff',
    3: '#dfccff',
    4: '#c2a5ff',
    5: '#9f77f5',
    6: '#8458e8',
    7: '#6b3fca',
    8: '#532fa4',
    9: '#3d227d',
    10: '#2c175b',
    11: '#1d0f3c',
    12: '#0f061f',
  },

  neutral: {
    1: '#f5f5f6',
    2: '#e8e8ea',
    3: '#cfcfd3',
    4: '#a8a8ad',
    5: '#7d7d83',
    6: '#57575d',
    7: '#3d3d42',
    8: '#28282c',
    9: '#1a1a1e',
    10: '#121215',
    11: '#0a0a0c',
    12: '#000000',
  },

  // Semantic Colors
  success: {
    1: '#f0fdf4',
    2: '#dcfce7',
    3: '#bbf7d0',
    4: '#86efac',
    5: '#4ade80',
    6: '#22c55e',
    7: '#16a34a',
    8: '#15803d',
    9: '#166534',
    10: '#14532d',
    11: '#052e16',
    12: '#021c08',
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

  error: {
    1: '#fef2f2',
    2: '#fee2e2',
    3: '#fecaca',
    4: '#fca5a5',
    5: '#f87171',
    6: '#ef4444',
    7: '#dc2626',
    8: '#b91c1c',
    9: '#991b1b',
    10: '#7f1d1d',
    11: '#450a0a',
    12: '#1a0404',
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
    const shade = parseInt(shadeNum) as ColorShade;
    
    if (colorName in colors) {
      const colorScale = colors[colorName as ColorKey];
      if (shade in colorScale) {
        return colorScale[shade];
      }
    }
  }
  
  // Fallback to primary6 if parsing fails
  return colors.primary[6];
};

/**
 * Type definitions for colors
 */
export type ColorScale = typeof colors.primary;
export type ColorKey = keyof typeof colors;
export type ColorShade = keyof ColorScale;

/**
 * Re-export for convenience
 */
export default colors;