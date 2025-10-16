// Destination logic for frame animation
// Resolve destination for different action types
export function resolveDestination(destination, action) {
    switch (action) {
        case 'changeTo':
            // For changeTo, destination can be a variant name or a function
            if (typeof destination === 'string') {
                return destination;
            }
            else if (typeof destination === 'function') {
                // For custom destination functions, they handle their own logic
                return null;
            }
            return null;
        case 'navigateTo':
            // For navigation, destination might be a URL or route
            // This would trigger navigation logic
            return null;
        case 'openLink':
            // For opening links, destination is URL
            // This would open the link
            return null;
        case 'scrollTo':
            // For scrolling, destination might be element selector
            // This would scroll to element
            return null;
        default:
            return null;
    }
}
// Check if destination is valid for the given action
export function isValidDestination(destination, action, availableVariants) {
    switch (action) {
        case 'changeTo':
            if (typeof destination === 'string') {
                return availableVariants ? availableVariants.includes(destination) : true;
            }
            else if (typeof destination === 'function') {
                return true; // Functions are always considered valid
            }
            return false;
        case 'navigateTo':
        case 'openLink':
            // For URLs, basic validation
            return typeof destination === 'string' && destination.length > 0;
        case 'scrollTo':
            // For selectors, basic validation
            return typeof destination === 'string' && destination.startsWith('#');
        default:
            return false;
    }
}
