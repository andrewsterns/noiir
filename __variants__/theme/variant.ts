// Theme variants for components
// Usage: Pass one of these variant names to a component to control its style

// Default styles for each variant
// Frame property-based variant tokens using semantic color states
export const VARIANT_STYLES = {
  solid: {
    fill: { type: 'solid', color: 'white2', opacity: 1 },
    stroke: { type: 'none' },
    autoLayout: { flow: 'vertical', gap: 8 },
    typography: { color: 'gray9', wrap: 'nowrap' },
  },
  solidHover: {
    fill: { type: 'solid', color: 'primary6', opacity: 1 },
    stroke: { type: 'none' },
    autoLayout: { flow: 'vertical', gap: 8 },
    typography: { color: 'white2', wrap: 'nowrap' },
  },
  solidActive: {
    fill: { type: 'solid', color: 'primary7', opacity: 1 },
    stroke: { type: 'none' },
    autoLayout: { flow: 'vertical', gap: 8 },
    typography: { color: 'white2', wrap: 'nowrap' },
  },
  solidActiveHover: {
    fill: { type: 'solid', color: 'primary9', opacity: 1 },
    stroke: { type: 'none' },
    autoLayout: { flow: 'vertical', gap: 8 },
    typography: { color: 'primary3', wrap: 'nowrap' },
  },
  surface: {
    fill: { type: 'solid', color: 'white2' },
    stroke: { type: 'solid', color: 'gray4', weight: 1 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.04)' }] },
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  surfaceHover: {
    fill: { type: 'solid', color: 'gray2' },
    stroke: { type: 'solid', color: 'gray5', weight: 1 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.06)' }] },
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  surfaceActive: {
    fill: { type: 'solid', color: 'gray4' },
    stroke: { type: 'solid', color: 'gray6', weight: 1 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.08)' }] },
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  surfaceActiveHover: {
    fill: { type: 'solid', color: 'black7', opacity: 1 },
    stroke: { type: 'solid', color: 'gray7', weight: 1 },
    effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.10)' }] },
    autoLayout: { flow: 'vertical', gap: 8 },
    typography: { color: 'white4', wrap: 'nowrap' },
  },
  ghost: {
    fill: { type: 'none', color: 'transparent' },
    stroke: { type: 'none' },
    effects: {},
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  ghostHover: {
    fill: { type: 'none', color: 'primary2', opacity: 0.12 },
    stroke: { type: 'none' },
    effects: {},
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  ghostActive: {
    fill: { type: 'none', color: 'primary3', opacity: 0.18 },
    stroke: { type: 'none' },
    effects: {},
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  ghostActiveHover: {
    fill: { type: 'solid', color: 'black7', opacity: 1 },
    stroke: { type: 'none' },
    effects: {},
    autoLayout: { flow: 'vertical', gap: 8 },
    typography: { color: 'white4', wrap: 'nowrap' },
  },
  outline: {
    fill: { type: 'none', color: 'transparent' },
    stroke: { type: 'solid', color: 'primary6', weight: 1 },
    effects: {},
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  outlineHover: {
    fill: { type: 'none', color: 'primary2', opacity: 0.12 },
    stroke: { type: 'solid', color: 'primary7', weight: 1 },
    effects: {},
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  outlineActive: {
    fill: { type: 'none', color: 'primary3', opacity: 0.18 },
    stroke: { type: 'solid', color: 'primary8', weight: 1 },
    effects: {},
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  outlineActiveHover: {
    fill: { type: 'solid', color: 'black7', opacity: 1 },
    stroke: { type: 'solid', color: 'primary9', weight: 1 },
    effects: {},
    autoLayout: { flow: 'vertical', gap: 8 },
    typography: { color: 'white4', wrap: 'nowrap' },
  },
  soft: {
    fill: { type: 'solid', color: 'primary1', opacity: 0.25 },
    stroke: { type: 'solid', color: 'primary2', weight: 1, opacity: 0.4 },
    effects: { dropShadow: [
      { x: 0, y: 2, blur: 12, color: 'rgba(0,0,0,0.08)' },
      { x: 0, y: 6, blur: 24, color: 'rgba(0,0,0,0.04)' }
    ] },
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  softHover: {
    fill: { type: 'solid', color: 'primary2', opacity: 0.35 },
    stroke: { type: 'solid', color: 'primary3', weight: 1, opacity: 0.5 },
    effects: { dropShadow: [
      { x: 0, y: 2, blur: 14, color: 'rgba(0,0,0,0.10)' },
      { x: 0, y: 6, blur: 26, color: 'rgba(0,0,0,0.06)' }
    ] },
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  softActive: {
    fill: { type: 'solid', color: 'primary3', opacity: 0.45 },
    stroke: { type: 'solid', color: 'primary4', weight: 1, opacity: 0.6 },
    effects: { dropShadow: [
      { x: 0, y: 2, blur: 16, color: 'rgba(0,0,0,0.12)' },
      { x: 0, y: 6, blur: 28, color: 'rgba(0,0,0,0.08)' }
    ] },
    autoLayout: { flow: 'vertical', gap: 8 },
  },
  softActiveHover: {
    fill: { type: 'solid', color: 'primary5', opacity: 0.55 },
    stroke: { type: 'solid', color: 'primary6', weight: 1, opacity: 0.7 },
    effects: { dropShadow: [
      { x: 0, y: 2, blur: 18, color: 'rgba(0,0,0,0.14)' },
      { x: 0, y: 6, blur: 30, color: 'rgba(0,0,0,0.10)' }
    ] },
    autoLayout: { flow: 'vertical', gap: 8 },
    typography: { color: 'white4', wrap: 'nowrap' },
  },
};
