/**
 * Merges multiple style objects into a single style object
 * Later styles override earlier ones
 */
export const mergeStyles = (...styles) => {
    return styles.reduce((merged, style) => {
        if (style) {
            return { ...merged, ...style };
        }
        return merged;
    }, {});
};
