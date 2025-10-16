// Direction types and logic for frame animation
// Get transform values for directional animations
export function getDirectionTransform(direction, animationType = 'slide') {
    switch (direction) {
        case 'none':
            return 'translate(0, 0)';
        case 'left':
            return animationType === 'push' ? 'translateX(-100%)' : 'translateX(100%)';
        case 'right':
            return animationType === 'push' ? 'translateX(100%)' : 'translateX(-100%)';
        case 'up':
            return animationType === 'push' ? 'translateY(-100%)' : 'translateY(100%)';
        case 'down':
            return animationType === 'push' ? 'translateY(100%)' : 'translateY(-100%)';
        case 'in':
            return 'scale(0)';
        case 'out':
            return 'scale(1)';
        case 'center':
            return 'translate(0, 0) scale(1)';
        case 'top-left':
            return 'translate(-100%, -100%)';
        case 'top-right':
            return 'translate(100%, -100%)';
        case 'bottom-left':
            return 'translate(-100%, 100%)';
        case 'bottom-right':
            return 'translate(100%, 100%)';
        default:
            return 'translate(0, 0)';
    }
}
// Check if direction is valid for animation type
export function isValidDirectionForAnimation(direction, animationType) {
    switch (animationType) {
        case 'slide':
        case 'push':
            return ['left', 'right', 'up', 'down', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(direction);
        case 'scale':
            return ['in', 'out', 'center'].includes(direction);
        case 'rotate':
            return direction === 'none' || ['left', 'right'].includes(direction);
        case 'dissolve':
        case 'smart':
            return true; // directions don't matter for these
        default:
            return direction === 'none';
    }
}
// Get opposite direction for reverse animations
export function getOppositeDirection(direction) {
    switch (direction) {
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        case 'up':
            return 'down';
        case 'down':
            return 'up';
        case 'in':
            return 'out';
        case 'out':
            return 'in';
        case 'top-left':
            return 'bottom-right';
        case 'top-right':
            return 'bottom-left';
        case 'bottom-left':
            return 'top-right';
        case 'bottom-right':
            return 'top-left';
        default:
            return direction;
    }
}
// Get all available directions
export function getAvailableDirections() {
    return ['none', 'left', 'right', 'up', 'down', 'in', 'out', 'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
}
