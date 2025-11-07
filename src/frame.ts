/**
 * Frame Entry Point
 * 
 * Import this for Frame component and all frame properties:
 * import { Frame, PositionProps, AutoLayoutProps, etc. } from 'noiir/frame'
 */

// Export Frame component
export { Frame } from './components/frame/Frame';
export type { FrameProps } from './components/frame/Frame';

// Export all frame property types
export type {
  PositionProps,
  ConstraintProps
} from '../packages/frame-core/src/position/position.props';

export type {
  AutoLayoutProps
} from '../packages/frame-core/src/layout/layout.props';

export type {
  AppearanceProps
} from '../packages/frame-core/src/appearance/appearance.props';

export type {
  TypographyProps
} from '../packages/frame-core/src/typography/typography.props';

export type {
  FillProps
} from '../packages/frame-core/src/appearance/fill.props';

export type {
  StrokeProps
} from '../packages/frame-core/src/appearance/stroke.props';

export type {
  EffectProps
} from '../packages/frame-core/src/effects/effects.props';

// Export conversion utilities
export {
  convertPositionProps,
  convertConstraintProps,
  convertPositionAndConstraints
} from '../packages/frame-core/src/position/position.props';

export {
  convertAutoLayoutProps
} from '../packages/frame-core/src/layout/layout.props';

export {
  convertAppearanceProps
} from '../packages/frame-core/src/appearance/appearance.props';

export {
  convertTypographyProps
} from '../packages/frame-core/src/typography/typography.props';

export {
  convertFillProps,
  createGradientString,
  createImageFillStyles,
  convertMultipleFills
} from '../packages/frame-core/src/appearance/fill.props';

export {
  convertStrokeProps
} from '../packages/frame-core/src/appearance/stroke.props';

export {
  convertEffectProps
} from '../packages/frame-core/src/effects/effects.props';

// Export frame utilities
export {
  applyChildStates,
  injectVariant,
  composeEventHandlers,
  convertFramePropsToStyles,
  calculateHugDimensions
} from '../packages/frame-core/src/utils/utils';

export type {
  FramePropsBase,
  ChildStateMap,
  EventHandlers
} from '../packages/frame-core/src/utils/utils';
