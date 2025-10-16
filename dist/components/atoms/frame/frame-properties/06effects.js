/**
 * Convert effect props to CSS styles
 */
export const convertEffectProps = (props) => {
    const styles = {};
    // Handle drop shadows
    if (props.dropShadow && props.dropShadow.length > 0) {
        const shadowStrings = props.dropShadow.map(shadow => `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`);
        styles.boxShadow = shadowStrings.join(', ');
    }
    // Handle inner shadows
    if (props.innerShadow && props.innerShadow.length > 0) {
        const shadowStrings = props.innerShadow.map(shadow => `inset ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`);
        if (styles.boxShadow) {
            styles.boxShadow += ', ' + shadowStrings.join(', ');
        }
        else {
            styles.boxShadow = shadowStrings.join(', ');
        }
    }
    // Handle layer blur
    if (props.layerBlur) {
        styles.filter = `blur(${props.layerBlur.radius}px)`;
    }
    // Handle background blur
    if (props.backgroundBlur) {
        styles.backdropFilter = `blur(${props.backgroundBlur.radius}px)`;
    }
    return styles;
};
