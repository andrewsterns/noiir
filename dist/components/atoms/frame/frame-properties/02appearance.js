export const convertAppearanceProps = (props) => {
    if (!props)
        return {};
    const styles = {};
    if (props.opacity !== undefined) {
        styles.opacity = Math.max(0, Math.min(1, props.opacity));
    }
    if (props.blendMode && props.blendMode !== 'normal') {
        styles.mixBlendMode = props.blendMode;
    }
    if (props.visible === false) {
        styles.visibility = 'hidden';
    }
    if (props.radius !== undefined) {
        const radiusValue = typeof props.radius === 'number' ? `${props.radius}px` : props.radius;
        styles.borderRadius = radiusValue;
    }
    return styles;
};
export const convertCornerRadius = (radius) => {
    if (!radius)
        return {};
    const styles = {};
    if (typeof radius === 'number' || typeof radius === 'string') {
        const radiusValue = typeof radius === 'number' ? `${radius}px` : radius;
        styles.borderRadius = radiusValue;
    }
    else {
        const { topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0 } = radius;
        const corners = [
            typeof topLeft === 'number' ? `${topLeft}px` : topLeft,
            typeof topRight === 'number' ? `${topRight}px` : topRight,
            typeof bottomRight === 'number' ? `${bottomRight}px` : bottomRight,
            typeof bottomLeft === 'number' ? `${bottomLeft}px` : bottomLeft
        ];
        styles.borderRadius = corners.join(' ');
    }
    return styles;
};
export const createAppearanceVariations = (baseProps, variations) => {
    return {
        base: convertAppearanceProps(baseProps),
        hover: convertAppearanceProps({ ...baseProps, ...variations.hover }),
        active: convertAppearanceProps({ ...baseProps, ...variations.active }),
        focus: convertAppearanceProps({ ...baseProps, ...variations.focus }),
        disabled: convertAppearanceProps({ ...baseProps, ...variations.disabled })
    };
};
