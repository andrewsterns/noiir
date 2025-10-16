# Frame Animation Refactor Instructions

## Overview
This document outlines the steps to refactor the frame animation system to support Figma-style interactions, variants, and a modular codebase structure.

---

## Steps

### 1. Implement Variants System
- Create a `variants/` folder under `frame/`.
- Define variant types, logic, and helpers in `variants.ts`.
- Each Frame can switch between visual states (variants) via interactions.
- Example: `variant="default"` switches to `variant="hovered"` on interaction.

### 2. Restructure Frame Animation Folder to Match Figma Model
- Organize `frame-animation/` into modular folders/files for each Figma interaction concept:
  - `trigger/` (trigger.ts, trigger.stories.tsx) — handles all trigger types and logic
  - `action/` (action.ts, action.stories.tsx) — handles all action types and logic
  - `destination/` (destination.ts, destination.stories.tsx) — handles destination logic (id, selector, etc.)
  - `animation/` (animation.ts, animation.stories.tsx) — handles animation types and logic
  - `direction/` (direction.ts, direction.stories.tsx) — handles direction logic (left, right, up, down, etc.)
  - `curve/` (curve.ts, curve.stories.tsx) — handles animation curve/easing logic
  - `duration/` (duration.ts, duration.stories.tsx) — handles duration logic
- Each folder contains logic/types and a Storybook file for examples.

### 3. Consolidate Core Interface
- Refactor types and the animation coordinator so all logic flows through a unified core interface.
- The core should import and use logic from triggers, actions, animations, destinations, and states.
- Update types to reflect the new modular structure.

### 4. Connect Animation Logic to Core
- Wire up each modular file’s logic to the core, so interactions trigger the correct actions and animations.
- Ensure the core interface is the single entry point for animation logic in Frame and variants.

---

## Additional Considerations
- **State Management:** Decide on React state, context, or a custom store for managing variants and cross-frame interactions.
- **Cross-Frame Communication:** Ensure the system can target and update other Frames by id.
- **Backward Compatibility:** Plan for migration or compatibility with existing stories/components.
- **Testing:** Add unit tests and Storybook stories for each interaction type and variant scenario.
- **Documentation:** Document the new interface and usage patterns for future contributors.

---

## Next Steps
1. Implement the variants system.
2. Restructure the frame-animation folder.
3. Refactor the core interface and coordinator.
4. Connect all animation logic to the core.

Follow these steps to create a scalable, Figma-inspired animation system for your Frame components.