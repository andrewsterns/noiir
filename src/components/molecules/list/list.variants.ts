import { VariantDocument } from "../../frame/frame-properties/variants/variants.props";

export type ListVariant = 'default';

export interface ListVariantConfig {
  // List-specific styling can be added here if needed
}

export const LIST_VARIANTS = {
  default: {
    autoLayout: { flow: 'vertical' },
    fill: { type: 'none' },
    stroke: { type: 'none' },
    appearance: { radius: 0 },
  },
  secondary: {
    autoLayout: { flow: 'vertical', paddingVertical: 8, paddingHorizontal: 8, maxHeight: 200, overflow: 'auto', width: 'fill' },
    fill: { type: 'solid', color: 'white6', opacity: 0.9 },
    stroke: { type: 'none' },
    appearance: { radius: 30 },
  },
  active: {
    autoLayout: { flow: 'vertical', paddingVertical: 8, paddingHorizontal: 8, maxHeight: 200, overflow: 'auto', width: 'fill' },
    fill: { type: 'solid', color: 'white6', opacity: 0.9 },
    stroke: { type: 'none' },
    appearance: { radius: 8 },
  },
  hidden: {
    display: 'none',
  },
  disabled: {
    autoLayout: { flow: 'vertical', paddingVertical: 8, paddingHorizontal: 8, maxHeight: 200, overflow: 'auto', width: 'fill', margin: 20 },
    fill: { type: 'none', color: 'transparent' },
    stroke: { type: 'solid', color: 'gray8', weight: 1 },
    appearance: { radius: 8 },
    cursor: { type: 'not-allowed' }
  },
} satisfies VariantDocument;