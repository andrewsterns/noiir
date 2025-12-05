/**
 * Font Variants - Example Design Tokens
 * 
 * These are example fonts provided as placeholders for stories and demos.
 * In your own project, create your own font palette with your typography choices.
 * 
 * Copy this file to your project and customize with your own fonts.
 * Make sure to import your fonts via CSS @font-face or <link> tags first.
 */

export const fontVariants = {
  // Display - for large headings
  display: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  
  // Heading - for section headings
  heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  
  // Body - for body text
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  
  // Mono - for code
  mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
  
  // System fallback
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

// Font definitions with metadata
export const fontDefinitions = {
  inter: {
    family: 'Inter, sans-serif',
    weights: [300, 400, 500, 600, 700, 800],
    styles: ['normal', 'italic'] as const,
  },
  system: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    weights: [400, 500, 600, 700],
    styles: ['normal', 'italic'] as const,
  },
  mono: {
    family: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    weights: [400, 500, 600],
    styles: ['normal'] as const,
  }
};

export type FontVariantName = keyof typeof fontVariants;

export default fontVariants;
