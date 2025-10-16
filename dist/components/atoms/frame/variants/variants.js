// Variant types and logic for Frame components
// Helper to get props for a variant
// Returns merged props for a variant, falling back to 'default' if needed
export function getVariantProps(variants, variant, baseProps = {}) {
    const variantProps = variants[variant] || variants['default'] || {};
    return { ...baseProps, ...variantProps };
}
// Predefined semantic style variants that can be used across components
export const semanticVariants = {
    solid: {
        fill: { type: 'solid', color: 'primary6' },
        stroke: { type: 'solid', color: 'primary6', weight: 0 },
        typography: { color: 'primary1', fontSize: 16, fontWeight: 500 },
        appearance: { radius: 8 }
    },
    surface: {
        fill: { type: 'solid', color: 'success' },
        stroke: { type: 'solid', color: 'primary4', weight: 1, opacity: 0.5 },
        typography: { color: 'success9', fontSize: 16, fontWeight: 500 },
        appearance: { radius: 8 }
    },
    outline: {
        fill: { type: 'none' },
        stroke: { type: 'solid', color: 'primary6', weight: 2 },
        typography: { color: 'primary6', fontSize: 16, fontWeight: 500 },
        appearance: { radius: 8 }
    },
    ghost: {
        fill: { type: 'none' },
        stroke: { type: 'solid', color: 'transparent', weight: 0 },
        typography: { color: 'primary6', fontSize: 16, fontWeight: 500 },
        appearance: { radius: 8 }
    },
    transparent: {
        fill: { type: 'none' },
        stroke: { type: 'solid', color: 'transparent', weight: 0 },
        typography: { color: 'neutral9', fontSize: 16, fontWeight: 500 },
        appearance: { radius: 0 }
    },
    glass: {
        fill: { type: 'solid', color: 'white' },
        stroke: { type: 'solid', color: 'neutral3', weight: 1 },
        typography: { color: 'neutral9', fontSize: 16, fontWeight: 500 },
        appearance: { radius: 12, opacity: 0.8 },
        effects: {
            dropShadow: [{ x: 0, y: 4, blur: 12, color: 'neutral12' }]
        }
    }
};
// Helper to create component-specific variants based on semantic variants
export function createComponentVariants(baseVariants, overrides = {}) {
    const result = {};
    for (const [variantName, baseProps] of Object.entries(baseVariants)) {
        result[variantName] = { ...baseProps, ...(overrides[variantName] || {}) };
    }
    return result;
}
