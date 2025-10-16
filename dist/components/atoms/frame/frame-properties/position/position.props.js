export const convertPositionProps = (props, hasAutoLayout = false) => {
    if (!props)
        return {};
    const styles = {};
    // Absolute positioning (x, y coordinates) - works regardless of autolayout
    if (props.x !== undefined || props.y !== undefined) {
        styles.position = 'absolute';
        if (props.x !== undefined) {
            styles.left = `${props.x}px`;
        }
        if (props.y !== undefined) {
            styles.top = `${props.y}px`;
        }
    }
    // Rotation transform - works regardless of autolayout
    if (props.rotation !== undefined) {
        const rotateTransform = `rotate(${props.rotation}deg)`;
        styles.transform = styles.transform ? `${styles.transform} ${rotateTransform}` : rotateTransform;
    }
    // Text alignment - only applies when NOT in autolayout (like Figma)
    // In autolayout, alignment is handled by the container, not individual items
    if (props.alignment && !hasAutoLayout) {
        switch (props.alignment) {
            case 'left':
                styles.textAlign = 'left';
                break;
            case 'center':
                styles.textAlign = 'center';
                break;
            case 'right':
                styles.textAlign = 'right';
                break;
            case 'justify':
                styles.textAlign = 'justify';
                break;
        }
    }
    return styles;
};
export const convertConstraintProps = (props, parentWidth, parentHeight) => {
    if (!props)
        return {};
    const styles = {};
    // Horizontal constraints - like Figma's constraint system
    if (props.horizontal) {
        switch (props.horizontal) {
            case 'left':
                styles.position = 'absolute';
                styles.left = 0;
                break;
            case 'right':
                styles.position = 'absolute';
                styles.right = 0;
                break;
            case 'center':
                styles.position = 'absolute';
                styles.left = '50%';
                styles.transform = (styles.transform || '') + ' translateX(-50%)';
                break;
            case 'left-right':
                // Pin to both left and right (stretches horizontally)
                styles.position = 'absolute';
                styles.left = 0;
                styles.right = 0;
                break;
            case 'scale':
                // Scale with parent (maintains proportional width)
                if (parentWidth) {
                    styles.width = '100%';
                }
                break;
        }
    }
    // Vertical constraints - like Figma's constraint system
    if (props.vertical) {
        switch (props.vertical) {
            case 'top':
                if (!styles.position)
                    styles.position = 'absolute';
                styles.top = 0;
                break;
            case 'bottom':
                if (!styles.position)
                    styles.position = 'absolute';
                styles.bottom = 0;
                break;
            case 'center':
                if (!styles.position)
                    styles.position = 'absolute';
                styles.top = '50%';
                styles.transform = (styles.transform || '') + ' translateY(-50%)';
                break;
            case 'top-bottom':
                // Pin to both top and bottom (stretches vertically)
                if (!styles.position)
                    styles.position = 'absolute';
                styles.top = 0;
                styles.bottom = 0;
                break;
            case 'scale':
                // Scale with parent (maintains proportional height)
                if (parentHeight) {
                    styles.height = '100%';
                }
                break;
        }
    }
    return styles;
};
// Utility to combine position and constraint props
export const convertPositionAndConstraints = (positionProps, constraintProps, hasAutoLayout = false, parentWidth, parentHeight) => {
    const positionStyles = convertPositionProps(positionProps || {}, hasAutoLayout);
    const constraintStyles = convertConstraintProps(constraintProps || {}, parentWidth, parentHeight);
    // Merge styles, with constraint styles taking precedence for positioning
    const mergedStyles = { ...positionStyles, ...constraintStyles };
    // Combine transforms if both exist
    const positionTransform = positionStyles.transform;
    const constraintTransform = constraintStyles.transform;
    if (positionTransform && constraintTransform) {
        mergedStyles.transform = `${positionTransform} ${constraintTransform}`;
    }
    return mergedStyles;
};
