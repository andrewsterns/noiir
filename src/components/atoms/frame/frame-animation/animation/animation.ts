// Animation styles and transitions for frame animation

export type AnimationType = 'instant' | 'dissolve' | 'smart' | 'push' | 'slide' | 'move' | 'bounce' | 'rotate' | 'scale';

export interface CSSAnimationConfig {
  type: AnimationType;
  direction?: string;
  curve?: string;
  duration?: number;
}

// Generate CSS transition styles for animations
export function getAnimationStyles(
  animation: AnimationType,
  direction?: string,
  curve?: string,
  duration?: number
): React.CSSProperties {
  const baseDuration = duration || 300; // default 300ms
  const easing = getEasingFunction(curve || 'ease');

  switch (animation) {
    case 'instant':
      return {
        transition: 'none',
      };

    case 'dissolve':
      return {
        transition: `opacity ${baseDuration}ms ${easing}`,
      };

    case 'smart':
      return {
        transition: `all ${baseDuration}ms ${easing}`,
      };

    case 'push':
    case 'slide':
      const transformValue = getTransformForDirection(direction || 'left', animation);
      return {
        transition: `transform ${baseDuration}ms ${easing}`,
        transform: transformValue,
      };

    case 'move':
      return {
        transition: `transform ${baseDuration}ms ${easing}, left ${baseDuration}ms ${easing}, top ${baseDuration}ms ${easing}`,
      };

    case 'bounce':
      return {
        transition: `transform ${baseDuration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
      };

    case 'rotate':
      return {
        transition: `transform ${baseDuration}ms ${easing}`,
      };

    case 'scale':
      return {
        transition: `transform ${baseDuration}ms ${easing}`,
      };

    default:
      return {
        transition: `all ${baseDuration}ms ${easing}`,
      };
  }
}

// Get easing function from curve name
function getEasingFunction(curve: string): string {
  switch (curve.toLowerCase()) {
    case 'linear':
      return 'linear';
    case 'ease':
      return 'ease';
    case 'ease-in':
      return 'ease-in';
    case 'ease-out':
      return 'ease-out';
    case 'ease-in-out':
      return 'ease-in-out';
    case 'bounce':
      return 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    case 'elastic':
      return 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    case 'spring':
      return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
    default:
      return 'ease';
  }
}

// Get transform value for directional animations
function getTransformForDirection(direction: string, animation: AnimationType): string {
  const distance = '100%';

  switch (direction.toLowerCase()) {
    case 'left':
      return animation === 'push' ? `translateX(-${distance})` : `translateX(${distance})`;
    case 'right':
      return animation === 'push' ? `translateX(${distance})` : `translateX(-${distance})`;
    case 'up':
      return animation === 'push' ? `translateY(-${distance})` : `translateY(${distance})`;
    case 'down':
      return animation === 'push' ? `translateY(${distance})` : `translateY(-${distance})`;
    default:
      return 'translateX(0)';
  }
}

// Apply animation to element
export function applyAnimation(
  element: HTMLElement,
  config: CSSAnimationConfig,
  isEntering: boolean = true
): void {
  const styles = getAnimationStyles(
    config.type,
    config.direction,
    config.curve,
    config.duration
  );

  Object.assign(element.style, styles);

  // Handle entrance/exit animations
  if (!isEntering && config.type === 'dissolve') {
    element.style.opacity = '0';
  }
}