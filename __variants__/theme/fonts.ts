/**
 * Font Resolution Utility
 * 
 * Users should define their own font variants in their project.
 * This function accepts an optional font palette and resolves font names to family strings.
 * 
 * @example
 * // In your project: my-app/variants/fonts.ts
 * export const myFonts = {
 *   heading: 'Poppins, Arial, sans-serif',
 *   body: 'Inter, Arial, sans-serif',
 *   mono: 'Fira Code, monospace',
 *   custom: {
 *     family: 'MyCustomFont, sans-serif',
 *     weights: [400, 600, 700]
 *   }
 * };
 * 
 * // Then use directly:
 * <Text typography={{ fontFamily: 'Poppins, sans-serif' }}>Text</Text>
 * // Or with font name (if you pass myFonts to resolveFont)
 * <Text typography={{ fontFamily: 'heading' }}>Text</Text>
 */

// Optional: Example font palette (users should define their own)
// This is provided for backward compatibility and as a reference.
// See __examples__/user-defined-variants/my-fonts.ts for a complete example.
export const exampleFonts = {
  // System font stack
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  // Common web fonts (users should import these via @font-face or link tag)
  sans: 'Inter, Arial, sans-serif',
  mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
};

// Legacy export for backward compatibility
// Deprecated: Define your own fonts in your project instead
export const fonts = exampleFonts;

export type FontDefinition = string | {
  family: string;
  weights?: number[];
};

/**
 * Resolve font name to font family string
 * @param key - Font name or font family string
 * @param fontPalette - Optional user-defined font palette
 * @returns Resolved font family string
 */
export function resolveFont(key: string, fontPalette?: Record<string, FontDefinition>): string {
  // If it contains comma or looks like a font stack, return as-is
  if (key.includes(',') || key.includes('"') || key.includes("'")) {
    return key;
  }
  
  // Check user-provided font palette first
  if (fontPalette && key in fontPalette) {
    const font = fontPalette[key];
    if (typeof font === 'string') return font;
    if (font && typeof font === 'object' && 'family' in font) return font.family;
  }
  
  // Check example fonts (for backward compatibility)
  if (key in exampleFonts) {
    const font = exampleFonts[key as keyof typeof exampleFonts];
    if (typeof font === 'string') return font;
  }
  
  // Return as-is (might be a generic like 'sans-serif', 'serif', 'monospace')
  return key;
}

export { resolveFont as default };
