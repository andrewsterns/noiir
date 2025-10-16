import type { FrameVariantName, AnimationDestination } from '../types';
export declare function resolveDestination(destination: AnimationDestination, action: string): FrameVariantName | null;
export declare function isValidDestination(destination: AnimationDestination, action: string, availableVariants?: FrameVariantName[]): boolean;
