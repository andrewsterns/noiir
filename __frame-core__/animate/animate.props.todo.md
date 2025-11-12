# Animate Props DSL Implementation TODO

## Overview
Update `animate.props.tsx` to support the new object-based DSL format for `animate` prop, allowing declarative interactions like `{ onHover: 'id.variant' }`. The old FrameAnimation[] format has been completely removed.

## TODO List

1. **Add New Type Definitions**
   - Define `AnimateAction` interface for action objects (toVariant, fromVariant, duration, etc.).
   - Define `AnimateDSL` type as a record of trigger keys to string | AnimateAction.
   - Update `Animate` type to `AnimateDSL[]` (old FrameAnimation[] format removed).
   - Add `resolveVariant` helper to parse `'id.variant'` shorthand into { targetId, variantName }.

2. **Implement parseAnimateDSL Function**
   - Create a function that takes AnimateDSL[] and returns FrameAnimation[].
   - Handle each trigger key (onHover, onClick, etc.) and convert to FrameAnimation objects.
   - Support shorthand strings and full AnimateAction objects.
   - Include logic for parsing targetId and variant from shorthand.

3. **Update AnimateProvider.registerAnimations**
   - Modify to detect if animate is AnimateDSL[] (check if objects have DSL keys like 'onHover').
   - If DSL, call parseAnimateDSL to convert to FrameAnimation[] (no backwards compatibility needed).

4. **Enhance resolveVariant Helper**
   - Update to handle shorthand parsing for toVariant, fromVariant, etc.
   - Return { targetId?, variantName: string | object }.

5. **Update applyAnimation Logic**
   - Use the enhanced resolveVariant for targetId and variant resolution.
   - Ensure cross-Frame interactions work with shorthand.

6. **Add Support for New Triggers/Actions**
   - Implement parsing for afterDelay, whileHovering, toggleVariant, scrollTo, etc.
   - Add any missing action handlers in executeAction.

7. **Backwards Compatibility Checks**
   - Ensure existing DSL format works correctly (old FrameAnimation[] format removed).
   - Test mixed usage if needed.

8. **Testing and Validation**
   - Add unit tests for parseAnimateDSL.
   - Test in Frame.tsx with DSL examples.
   - Validate cross-Frame and shorthand parsing.

9. **Documentation Updates**
   - Ensure animate.props.md is up-to-date (already done).
   - Add inline comments in code for new features.

10. **Integration with Frame.tsx**
    - Confirm Frame.tsx passes animate prop correctly to AnimateProvider.
    - No changes needed in Frame.tsx if AnimateProvider handles both formats.