export type AnimationType = 'instant' | 'dissolve' | 'smart' | 'push' | 'slide' | 'move' | 'bounce' | 'rotate' | 'scale';
export interface AnimationConfig {
    type: AnimationType;
    direction?: string;
    curve?: string;
    duration?: number;
}
export declare function getAnimationStyles(animation: AnimationType, direction?: string, curve?: string, duration?: number): React.CSSProperties;
export declare function applyAnimation(element: HTMLElement, config: AnimationConfig, isEntering?: boolean): void;
