import { FrameVariantConfig } from '@noiir/frame-core/variants/variants.props';
import { fonts } from '../../theme/fonts';

/**
 * Text Component Variants
 * 
 * Typography presets matching Figma-style text styles.
 * These variants can be applied to the Text component via the variant prop.
 * 
 * @example
 * <Text variant="h1">Heading</Text>
 * <Text variant="body">Body text</Text>
 */

export const textVariants: Record<string, FrameVariantConfig> = {
  // Default Frame typography
  Frame: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 300,
      lineHeight: 1.3,
      letterSpacing: 0.75,
    }
  },

  // Headings
  h1: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    }
  },
  h2: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 600,
      fontSize: 24,
      lineHeight: 1.3,
      letterSpacing: -0.25,
    }
  },
  h3: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 500,
      fontSize: 20,
      lineHeight: 1.4,
      letterSpacing: 0.45,
    }
  },
  h4: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 500,
      fontSize: 18,
      lineHeight: 1.4,
      letterSpacing: 0.45,
    }
  },
  h5: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0.45,
    }
  },
  h6: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: 0.45,
    }
  },

  // Body text
  body: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 200,
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: 0.45,
    }
  },
  body1: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: 0.45,
    }
  },
  body2: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: 0,
    }
  },

  // Labels and UI text
  label: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 500,
      fontSize: 12,
      lineHeight: 1.4,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    }
  },
  caption: {
    typography: {
      fontFamily: fonts.geist.family,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 1.4,
      letterSpacing: 0.25,
    }
  },
  overline: {
    typography: {
      fontFamily: fonts.inter.family,
      fontWeight: 500,
      fontSize: 10,
      lineHeight: 1.6,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    }
  },

  // Special presets with different fonts
  display: {
    typography: {
      fontFamily: fonts.poppins.family,
      fontWeight: 600,
      fontSize: 48,
      lineHeight: 1.1,
      letterSpacing: -1,
    }
  },
  code: {
    typography: {
      fontFamily: fonts.geistMono.family,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.4,
      letterSpacing: 0,
    }
  },
};

export default textVariants;
