export const convertAutoLayoutProps = (props) => {
    if (!props)
        return {};
    const styles = {};
    // Handle flow (layout direction) - like Figma's auto layout direction
    switch (props.flow) {
        case 'horizontal':
            styles.display = 'flex';
            styles.flexDirection = 'row';
            break;
        case 'vertical':
            styles.display = 'flex';
            styles.flexDirection = 'column';
            break;
        case 'grid':
            styles.display = 'grid';
            break;
        case 'freeform':
        default:
            styles.position = 'relative';
            break;
    }
    // Alignment based on flow type and alignment value
    // Note: Freeform layout doesn't use alignment - children are positioned absolutely
    if (props.alignment && props.flow !== 'freeform') {
        // Handle both compound values (e.g., 'top-center') and single values (e.g., 'center')
        const alignmentParts = props.alignment.split('-');
        const vertical = alignmentParts[0];
        const horizontal = alignmentParts.length > 1 ? alignmentParts[1] : vertical; // If single value, use same for both axes
        if (props.flow === 'horizontal') {
            // For horizontal flow (flex-direction: row)
            // Map vertical part to align-items (cross axis)
            switch (vertical) {
                case 'top':
                    styles.alignItems = 'flex-start';
                    break;
                case 'center':
                    styles.alignItems = 'center';
                    break;
                case 'bottom':
                    styles.alignItems = 'flex-end';
                    break;
            }
            // Map horizontal part to justify-content (main axis)
            switch (horizontal) {
                case 'left':
                    styles.justifyContent = 'flex-start';
                    break;
                case 'center':
                    styles.justifyContent = 'center';
                    break;
                case 'right':
                    styles.justifyContent = 'flex-end';
                    break;
            }
        }
        else if (props.flow === 'vertical') {
            // For vertical flow (flex-direction: column)
            // Map vertical part to justify-content (main axis)
            switch (vertical) {
                case 'top':
                    styles.justifyContent = 'flex-start';
                    break;
                case 'center':
                    styles.justifyContent = 'center';
                    break;
                case 'bottom':
                    styles.justifyContent = 'flex-end';
                    break;
            }
            // Map horizontal part to align-items (cross axis)
            switch (horizontal) {
                case 'left':
                    styles.alignItems = 'flex-start';
                    break;
                case 'center':
                    styles.alignItems = 'center';
                    break;
                case 'right':
                    styles.alignItems = 'flex-end';
                    break;
            }
        }
        else if (props.flow === 'grid') {
            // For grid layout, use place-items
            let placeItems = '';
            // Map vertical part
            switch (vertical) {
                case 'top':
                    placeItems += 'start';
                    break;
                case 'center':
                    placeItems += 'center';
                    break;
                case 'bottom':
                    placeItems += 'end';
                    break;
            }
            placeItems += ' ';
            // Map horizontal part
            switch (horizontal) {
                case 'left':
                    placeItems += 'start';
                    break;
                case 'center':
                    placeItems += 'center';
                    break;
                case 'right':
                    placeItems += 'end';
                    break;
            }
            styles.placeItems = placeItems.trim();
        }
    }
    // Dimensions - Figma's resizing behavior
    if (props.width !== undefined) {
        switch (props.width) {
            case 'hug':
                styles.width = 'fit-content';
                break;
            case 'fill-container':
                styles.width = '100%';
                break;
            default:
                if (typeof props.width === 'number') {
                    styles.width = `${props.width}px`;
                }
                else {
                    styles.width = props.width;
                }
                break;
        }
    }
    if (props.height !== undefined) {
        switch (props.height) {
            case 'hug':
                styles.height = 'fit-content';
                break;
            case 'fill-container':
                styles.height = '100%';
                break;
            default:
                if (typeof props.height === 'number') {
                    styles.height = `${props.height}px`;
                }
                else {
                    styles.height = props.height;
                }
                break;
        }
    }
    // Gap between items (like Figma's spacing between items)
    if (props.gap !== undefined && (props.flow === 'horizontal' || props.flow === 'vertical')) {
        styles.gap = `${props.gap}px`;
    }
    // Item spacing (alternative to gap)
    if (props.itemSpacing !== undefined && (props.flow === 'horizontal' || props.flow === 'vertical')) {
        styles.gap = `${props.itemSpacing}px`;
    }
    // Padding - like Figma's padding controls
    if (props.padding !== undefined) {
        if (typeof props.padding === 'number') {
            styles.padding = `${props.padding}px`;
        }
        else {
            const { top, right, bottom, left } = props.padding;
            styles.padding = `${top || 0}px ${right || 0}px ${bottom || 0}px ${left || 0}px`;
        }
    }
    // Individual padding controls (override general padding)
    if (props.paddingTop !== undefined) {
        styles.paddingTop = typeof props.paddingTop === 'number' ? `${props.paddingTop}px` : props.paddingTop;
    }
    if (props.paddingRight !== undefined) {
        styles.paddingRight = typeof props.paddingRight === 'number' ? `${props.paddingRight}px` : props.paddingRight;
    }
    if (props.paddingBottom !== undefined) {
        styles.paddingBottom = typeof props.paddingBottom === 'number' ? `${props.paddingBottom}px` : props.paddingBottom;
    }
    if (props.paddingLeft !== undefined) {
        styles.paddingLeft = typeof props.paddingLeft === 'number' ? `${props.paddingLeft}px` : props.paddingLeft;
    }
    // Horizontal and vertical padding shortcuts
    if (props.paddingHorizontal !== undefined) {
        const hPadding = typeof props.paddingHorizontal === 'number' ? `${props.paddingHorizontal}px` : props.paddingHorizontal;
        styles.paddingLeft = hPadding;
        styles.paddingRight = hPadding;
    }
    if (props.paddingVertical !== undefined) {
        const vPadding = typeof props.paddingVertical === 'number' ? `${props.paddingVertical}px` : props.paddingVertical;
        styles.paddingTop = vPadding;
        styles.paddingBottom = vPadding;
    }
    // Wrapping behavior (flex-wrap)
    if (props.wrap && (props.flow === 'horizontal' || props.flow === 'vertical')) {
        styles.flexWrap = props.wrap;
    }
    // Clipping content (overflow)
    if (props.clipContent) {
        styles.overflow = 'hidden';
    }
    return styles;
};
