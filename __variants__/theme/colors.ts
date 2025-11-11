// Theme color definitions for variants
export const colors = {
  // Primary scale
  primary1: '#e3f2fd',
  primary2: '#bbdefb',
  primary3: '#90caf9',
  primary4: '#64b5f6',
  primary5: '#42a5f5',
  primary6: '#2196f3',
  primary7: '#1e88e5',
  primary8: '#1976d2',
  primary9: '#1565c0',
  primary10: '#0d47a1',

  // Error/Red scale
  error1: '#ffebee',
  error2: '#ffcdd2',
  error3: '#ef9a9a',
  error4: '#e57373',
  error5: '#ef5350',
  error6: '#f44336',
  error7: '#e53935',
  error8: '#d32f2f',
  error9: '#c62828',
  error10: '#b71c1c',

  // Success/Green scale
  success1: '#e8f5e9',
  success2: '#c8e6c9',
  success3: '#a5d6a7',
  success4: '#81c784',
  success5: '#66bb6a',
  success6: '#4caf50',
  success7: '#43a047',
  success8: '#388e3c',
  success9: '#2e7d32',
  success10: '#1b5e20',

  // Warning/Yellow scale
  warning1: '#fffde7',
  warning2: '#fff9c4',
  warning3: '#fff59d',
  warning4: '#fff176',
  warning5: '#ffee58',
  warning6: '#ffeb3b',
  warning7: '#fdd835',
  warning8: '#fbc02d',
  warning9: '#f9a825',
  warning10: '#f57f17',

  // Blue scale
  blue1: '#e3f2fd',
  blue2: '#bbdefb',
  blue3: '#90caf9',
  blue4: '#64b5f6',
  blue5: '#42a5f5',
  blue6: '#2196f3',
  blue7: '#1e88e5',
  blue8: '#1976d2',
  blue9: '#1565c0',
  blue10: '#0d47a1',

  // Gray scale
  gray1: '#fafafa',
  gray2: '#f5f5f5',
  gray3: '#eeeeee',
  gray4: '#e0e0e0',
  gray5: '#bdbdbd',
  gray6: '#9e9e9e',
  gray7: '#757575',
  gray8: '#616161',
  gray9: '#424242',
  gray10: '#212121',

  // Accent scale
  accent1: '#f3e5f5',
  accent2: '#e1bee7',
  accent3: '#ce93d8',
  accent4: '#ba68c8',
  accent5: '#ab47bc',
  accent6: '#9c27b0',
  accent7: '#8e24aa',
  accent8: '#7b1fa2',
  accent9: '#6a1b9a',
  accent10: '#4a148c',

  // Black/White
  black: '#000',
  white: '#fff',
};

// Utility to resolve color by key
export function resolveColor(key: string): string {
  if (key in colors) {
    return colors[key as keyof typeof colors];
  }
  // If it's already a hex color or other string, return as is
  return key;
}

export { colorUtils } from './colorUtils';
