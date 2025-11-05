import { ExtendVariant } from './packages/frame-core/src/variants/variants.props';
import { VARIANT_STYLES } from './src/theme/variant';

/**
 * Test Button Variants Library
 *
 * Variants for testing transitions and interactions.
 */

export const TEST_BUTTON_V: ExtendVariant = {
  state1: {
    ...VARIANT_STYLES.solid as any,
    autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
    appearance: { radius: 8 },
    typography: { color: 'tomato5' },
    stroke: { type: 'solid', color: 'tomato4', weight: 1 },
  },
  state2: {
    ...VARIANT_STYLES.soft as any,
    autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
    appearance: { radius: 8 },
    typography: { color: 'blue6' },
    stroke: { type: 'solid', color: 'blue4', weight: 2 },
  },
  state3: {
    ...VARIANT_STYLES.outline as any,
    autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
    appearance: { radius: 8 },
    typography: { color: 'green6' },
    stroke: { type: 'solid', color: 'green4', weight: 3 },
  },
  state4: {
    ...VARIANT_STYLES.surface as any,
    autoLayout: { flow: 'horizontal', alignment: 'center', gap: 8, wrap: 'nowrap', width: 'fill-container' },
    appearance: { radius: 8 },
    typography: { color: 'green4' },
    stroke: { type: 'solid', color: 'red4', weight: 4 },
  },
} satisfies ExtendVariant;

export const TEST_FRAME_V: ExtendVariant = {
  state1: {
    fill: { type: 'solid', color: 'tomato5' },
    appearance: { radius: 4 },
    autoLayout: { padding: 16 },
    stroke: { type: 'solid', color: 'tomato7', weight: 1 },
  },
  state2: {
    fill: { type: 'solid', color: 'blue4' },
    appearance: { radius: 4 },
    autoLayout: { padding: 16 },
    stroke: { type: 'solid', color: 'blue4', weight: 2 },
  },
  state3: {
    fill: { type: 'solid', color: 'green4' },
    appearance: { radius: 4 },
    autoLayout: { padding: 16 },
    stroke: { type: 'solid', color: 'green4', weight: 3 },
  },
  positionState1: {
    fill: { type: 'solid', color: 'purple4' },
    appearance: { radius: 8 },
    autoLayout: { flow: 'vertical', alignment: 'bottomCenter', padding: 50, width: 40, height: 'fill-container' },
    stroke: { type: 'solid', color: 'purple6', weight: 2 },

  },
  positionState2: {
    fill: { type: 'solid', color: 'orange4' },
    appearance: { radius: 12 },
     autoLayout: { flow: 'vertical', alignment: 'topCenter', padding: 50, width: 40, height: 'fill-container' },
    stroke: { type: 'solid', color: 'orange6', weight: 3 },
  },
} satisfies ExtendVariant;
