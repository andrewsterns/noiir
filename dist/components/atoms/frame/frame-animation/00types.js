/**
 * Animation State Management
 *
 * Core interfaces and types for Frame animations
 */
// Utility function to convert transition config to CSS
export function createTransitionString(transition) {
    if (typeof transition === 'string') {
        return transition;
    }
    const { duration = '0.3s', timing = 'ease-out', delay = '0s', property = 'all' } = transition;
    return `${property} ${duration} ${timing} ${delay}`;
}
