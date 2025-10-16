export type AnimationCurve = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'elastic' | 'spring' | 'custom';
export declare function getCurve(curve: AnimationCurve, custom?: string): string;
export declare function isValidCurve(curve: string): curve is AnimationCurve;
export declare function getAvailableCurves(): AnimationCurve[];
export declare function getCurveDescription(curve: AnimationCurve): string;
