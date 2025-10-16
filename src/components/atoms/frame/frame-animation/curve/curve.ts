// Curve/easing types and logic for frame animation

export type AnimationCurve =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'bounce'
  | 'elastic'
  | 'spring'
  | 'custom';

// Predefined easing curves with CSS cubic-bezier values
const EASING_CURVES: Record<AnimationCurve, string> = {
  linear: 'linear',
  ease: 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  custom: 'ease', // fallback
};

// Get CSS easing function for a curve
export function getCurve(curve: AnimationCurve, custom?: string): string {
  if (curve === 'custom' && custom) {
    return custom;
  }
  return EASING_CURVES[curve] || EASING_CURVES.ease;
}

// Validate if a curve name is supported
export function isValidCurve(curve: string): curve is AnimationCurve {
  return curve in EASING_CURVES;
}

// Get all available curve names
export function getAvailableCurves(): AnimationCurve[] {
  return Object.keys(EASING_CURVES) as AnimationCurve[];
}

// Get curve description for UI
export function getCurveDescription(curve: AnimationCurve): string {
  switch (curve) {
    case 'linear':
      return 'Constant speed throughout';
    case 'ease':
      return 'Gradual start and end';
    case 'ease-in':
      return 'Gradual start, fast end';
    case 'ease-out':
      return 'Fast start, gradual end';
    case 'ease-in-out':
      return 'Gradual start and end';
    case 'bounce':
      return 'Bouncy effect at the end';
    case 'elastic':
      return 'Elastic/spring-like motion';
    case 'spring':
      return 'Spring-like bounce';
    case 'custom':
      return 'Custom cubic-bezier curve';
    default:
      return 'Unknown curve';
  }
}
