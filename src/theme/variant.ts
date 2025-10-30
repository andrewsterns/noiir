// Theme variants for components
// Usage: Pass one of these variant names to a component to control its style

// Default styles for each variant
// Frame property-based variant tokens
export const VARIANT_STYLES = {
	solid: {
		fill: { type: 'solid', color: 'white3', opacity: 1 },
		stroke: { type: 'none' },
		autoLayout: { flow: 'vertical', gap: 8 },
        typography: {
            color: 'gray7',
            wrap: 'nowrap',
        },
	},
	surface: {
		fill: { type: 'solid', color: 'white2' },
		stroke: { type: 'solid', color: 'gray3', weight: 1 },
		effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.04)' }] },
		autoLayout: { flow: 'vertical', gap: 8 },
	},
	ghost: {
		fill: { type: 'none', color: 'transparent' },
		stroke: { type: 'none' },
		effects: {},
		autoLayout: { flow: 'vertical', gap: 8 },
	},
	outline: {
		fill: { type: 'none', color: 'transparent' },
		stroke: { type: 'solid', color: 'black4', weight: 1 },
		effects: {},
		autoLayout: { flow: 'vertical', gap: 8 },
	},
	soft: {
		fill: { type: 'solid', color: 'white1', opacity: 0.25 },
		stroke: { type: 'solid', color: 'white2', weight: 1, opacity: 0.4 },
		effects: { dropShadow: [
			{ x: 0, y: 2, blur: 12, color: 'rgba(0,0,0,0.08)' },
			{ x: 0, y: 6, blur: 24, color: 'rgba(0,0,0,0.04)' }
		] },
		autoLayout: { flow: 'vertical', gap: 8 },
	},
	// Hover variants
	solidHover: {
		fill: { type: 'solid', color: 'white1', opacity: 1 },
		stroke: { type: 'none' },
		autoLayout: { flow: 'vertical', gap: 8 },
        typography: {
            color: 'gray4',
            wrap: 'nowrap',
        },
	},
	surfaceHover: {
		fill: { type: 'solid', color: 'white1' },
		stroke: { type: 'solid', color: 'gray3', weight: 1 },
		effects: { dropShadow: [{ x: 0, y: 4, blur: 12, color: 'rgba(0,0,0,0.06)' }] },
		autoLayout: { flow: 'vertical', gap: 8 },
	},
	ghostHover: {
		fill: { type: 'none', color: 'transparent' },
		stroke: { type: 'none' },
		effects: { dropShadow: [{ x: 0, y: 2, blur: 6, color: 'rgba(0,0,0,0.05)' }] },
		autoLayout: { flow: 'vertical', gap: 8 },
	},
	outlineHover: {
		fill: { type: 'none', color: 'transparent' },
		stroke: { type: 'solid', color: 'black7', weight: 1.5 },
		effects: {},
		autoLayout: { flow: 'vertical', gap: 8 },
	},
	softHover: {
		fill: { type: 'solid', color: 'white1', opacity: 0.35 },
		stroke: { type: 'solid', color: 'white2', weight: 1, opacity: 0.5 },
		effects: { dropShadow: [
			{ x: 0, y: 3, blur: 16, color: 'rgba(0,0,0,0.10)' },
			{ x: 0, y: 8, blur: 32, color: 'rgba(0,0,0,0.05)' }
		] },
		autoLayout: { flow: 'vertical', gap: 8 },
	},
	// Active variants
	solidActive: {
		fill: { type: 'solid', color: 'black5', opacity: 1 },
		stroke: { type: 'none' },
		effects: { dropShadow: [{ x: 0, y: 1, blur: 4, color: 'rgba(0,0,0,0.20)' }] },
		autoLayout: { flow: 'vertical', gap: 8 },
        typography: {
            color: 'gray2',
            wrap: 'nowrap',
        },
	},
	surfaceActive: {
	fill: { type: 'solid', color: 'black7', opacity: 0.15 },
		stroke: { type: 'solid', color: 'black7', weight: 1.5 },
		effects: {},
		autoLayout: { flow: 'vertical', gap: 8 },
              typography: {
            color: 'black2',
            wrap: 'nowrap',
        },
	},
	ghostActive: {
		fill: { type: 'none', color: 'transparent' },
		stroke: { type: 'none' },
		effects: { dropShadow: [{ x: 0, y: 1, blur: 3, color: 'rgba(0,0,0,0.08)' }] },
		autoLayout: { flow: 'vertical', gap: 8 },
              typography: {
            color: 'black7',
            wrap: 'nowrap',
        },
	},
	outlineActive: {
	fill: { type: 'none', color: 'transparent' },
		stroke: { type: 'solid', color: 'black7', weight: 2 },
		effects: {},
		autoLayout: { flow: 'vertical', gap: 8 },
	},
	softActive: {
		fill: { type: 'solid', color: 'white1', opacity: 0.15 },
		stroke: { type: 'solid', color: 'white2', weight: 1, opacity: 0.3 },
		effects: { dropShadow: [
			{ x: 0, y: 1, blur: 6, color: 'rgba(0,0,0,0.12)' },
			{ x: 0, y: 3, blur: 12, color: 'rgba(0,0,0,0.06)' }
		] },
		autoLayout: { flow: 'vertical', gap: 8 },
	},
};
