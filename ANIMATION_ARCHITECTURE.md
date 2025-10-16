# Frame Animation System - Clean Architecture

## 📁 **New File Structure**

```
frame-animation/
├── types.ts                    # Core animation interfaces & types
├── core.ts                     # Main useFrameAnimation hook & utilities  
├── examples.stories.tsx        # Combined animation examples
├── index.ts                    # Public API exports
├── appearance/
│   ├── appearance.animation.ts
│   └── appearance.animation.stories.tsx
├── effects/
│   ├── effects.animation.ts
│   └── effects.animation.stories.tsx
├── layout/
│   ├── layout.animation.tsx
│   └── layout.animation.stories.tsx
└── position/
    ├── position.animation.ts
    └── position.animation.stories.tsx
```

## 🔄 **What Was Changed**

### **File Renames**
- `00types.ts` → `types.ts` 
- `01utils.ts` → `core.ts`
- `03stories.stories.tsx` → `examples.stories.tsx`

### **Removed Redundancy**
- ❌ Deleted deprecated `ANIMATION_PRESETS` (legacy hoverGrow, clickShrink, etc.)
- ✅ Kept specialized presets: `APPEARANCE_ANIMATION_PRESETS`, `EFFECTS_ANIMATION_PRESETS`, etc.
- ❌ Removed duplicate exports in `index.ts` 
- ✅ Cleaned up imports across all files

### **Updated Imports**
- `Frame.tsx` now imports from `./frame-animation/types` and `./frame-animation/core`
- All animation stories updated with new import paths
- No circular dependencies or broken references

## 🎯 **How It Relates to Frame.tsx**

```tsx
// Frame.tsx integrates animation through:
import type { AnimationProps } from './frame-animation/types';
import { useFrameAnimation } from './frame-animation/core';

// Usage in Frame component:
const { currentProps, animationStyles, eventHandlers } = useFrameAnimation(props, animate);

// Public API for developers:
<Frame 
  // Static Figma properties
  size={{ width: 200, height: 100 }}
  appearance={{ radius: 8 }}
  effects={{ dropShadow: [...] }}
  
  // Animation integration
  animate={{
    hover: { 
      appearance: { radius: 12 },
      effects: { dropShadow: [...] }
    },
    click: { size: { width: 180 } },
    duration: '0.3s'
  }}
/>
```

## 🏗️ **Architecture Benefits**

1. **Intuitive Naming**: No more confusing `00`, `01`, `03` prefixes
2. **No Redundancy**: Removed duplicate presets and exports
3. **Clean Dependencies**: All imports are explicit and necessary
4. **Modular Design**: Each animation type is self-contained
5. **Future-Proof**: Easy to add new animation categories

## 📖 **Storybook Organization**

Stories are now organized as:
```
📁 Frame
  📁 Animation
    📖 Appearance  # Opacity, radius, blend modes
    📖 Effects     # Shadows, blur, visual effects  
    📖 Layout      # Size, flow, responsive changes
    📖 Position    # Movement, rotation, transforms
    📖 Combined    # Multi-animation examples
```

## 🚀 **Usage Examples**

```tsx
// Specialized animation presets
import { 
  APPEARANCE_ANIMATION_PRESETS,
  EFFECTS_ANIMATION_PRESETS,
  LAYOUT_ANIMATION_PRESETS,
  POSITION_ANIMATION_PRESETS 
} from './frame-animation';

// Use preset animations
<Frame animate={APPEARANCE_ANIMATION_PRESETS.fadeInOut} />
<Frame animate={EFFECTS_ANIMATION_PRESETS.dropShadowHover} />
<Frame animate={LAYOUT_ANIMATION_PRESETS.growOnHover} />
<Frame animate={POSITION_ANIMATION_PRESETS.slideIn} />

// Custom animations
<Frame 
  animate={{
    hover: { appearance: { opacity: 0.8 } },
    click: { position: { y: 2 } }
  }}
/>
```

The animation system is now clean, intuitive, and ready for future expansion! ✨