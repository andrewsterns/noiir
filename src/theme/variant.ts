// Theme variants for components
// Usage: Pass one of these variant names to a component to control its style

export type Variant = 'solid' | 'surface' | 'ghost' | 'outline' | 'glass';

export const VARIANTS: Variant[] = ['solid', 'surface', 'ghost', 'outline', 'glass'];

// Optionally, you can define default styles or tokens for each variant here
// export const VARIANT_STYLES: Record<Variant, React.CSSProperties> = { ... }
