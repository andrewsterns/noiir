// Theme font definitions for variants
export const fonts = {
  display: 'Inter, Arial, sans-serif',
  heading: 'Inter, Arial, sans-serif',
  body: 'Inter, Arial, sans-serif',
  mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  geist: {
    family: 'Geist, Inter, Arial, sans-serif',
    weights: [200, 300, 400, 500, 600, 700],
  },
  geistMono: {
    family: 'Geist Mono, Menlo, Monaco, Consolas, monospace',
    weights: [400, 500, 600],
  },
  poppins: {
    family: 'Poppins, Arial, sans-serif',
    weights: [400, 500, 600],
  },
  inter: {
    family: 'Inter, Arial, sans-serif',
    weights: [400, 500, 600],
  },
};

function resolveFont(key: string) {
  const font = (fonts as any)[key];
  if (typeof font === 'string') return font;
  if (font && typeof font === 'object' && 'family' in font) return font.family;
  return fonts.body;
}

export { resolveFont };
