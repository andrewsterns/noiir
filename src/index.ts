// Main exports for the Figma Components Framework

// Export all components
export * from './components';

// Export theme system
export * from './theme';

// Export Noiir runtime system
export * from './noiir';// Export all interface types from their respective files
export type {
  PositionProps,
  ConstraintProps
} from './components/frame/frame-properties/position/position.props';

export type {
  AutoLayoutProps
} from './components/frame/frame-properties/layout/layout.props';

export type {
  AppearanceProps
} from './components/frame/frame-properties/appearance/appearance.props';
export type {
  TypographyProps
} from './components/frame/frame-properties/typography/typography.props';

export type {
  FillProps
} from './components/frame/frame-properties/appearance/fill.props';
export type {
  StrokeProps
} from './components/frame/frame-properties/appearance/stroke.props';

// Export component prop types
export type { FrameProps } from './components/frame/Frame';

// Export conversion utilities for advanced usage
export {
  convertPositionProps,
  convertConstraintProps,
  convertPositionAndConstraints
} from './components/frame/frame-properties/position/position.props';

export {
  convertAutoLayoutProps
} from './components/frame/frame-properties/layout/layout.props';

export {
  convertAppearanceProps,
  convertCornerRadius,
  createAppearanceVariations
} from './components/frame/frame-properties/appearance/appearance.props';

export {
  convertTypographyProps,
  createTypographyScale,
  createTypographyPreset,
  createCommonPresets
} from './components/frame/frame-properties';

export {
  convertFillProps,
  createGradientString,
  createImageFillStyles,
  createMultipleFills
} from './components/frame/frame-properties/appearance/fill.props';

export {
  convertStrokeProps,
  createStrokePattern
} from './components/frame/frame-properties/appearance/stroke.props';