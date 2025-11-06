# Release Notes - v1.1.0

## 🎉 Major Features

### Comprehensive CSS Unit Support
All dimension and spacing properties now support standard CSS units including:
- px, em, rem (font-relative)
- vh, vw, vmin, vmax (viewport-relative)
- % (percentage)
- ch, ex (character-relative)
- CSS functions: `clamp()`, `min()`, `max()`, `calc()`, `var()`

### Grid Layout with Shorthand Syntax
Simple and intuitive grid configuration:
```tsx
// Shorthand
<Frame autoLayout={{ flow: 'grid', grid: "3x4" }} />

// Full config
<Frame autoLayout={{ 
  flow: 'grid', 
  grid: { columns: 3, rows: 4, columnGap: "2rem", rowGap: "1rem" } 
}} />
```

## 📝 What's Changed

### Type Updates
- `AutoLayoutProps` now uses `DimensionValue` and `CSSUnit` types
- Added `grid` property to `AutoLayoutProps`
- All spacing properties support CSS units

### New Exports
- `CSSUnit` - Type for CSS unit values
- `DimensionValue` - Type for dimension properties
- `GridConfig` - Type for grid configuration
- `normalizeCSSUnit()` - Utility for converting values to CSS units
- `normalizeSpacing()` - Utility for spacing objects
- `parseGridShorthand()` - Utility for parsing "3x4" syntax
- `gridConfigToCSS()` - Utility for grid CSS generation

### Updated Functions
- `convertAutoLayoutProps()` - Now uses CSS unit utilities
- `convertAppearanceProps()` - Now uses CSS unit utilities

## 🔄 Migration

**No breaking changes!** All existing code continues to work:

```tsx
// v1.0.x (still works)
<Frame autoLayout={{ width: 300, padding: 20 }} />

// v1.1.0 (new capabilities)
<Frame autoLayout={{ width: "50%", padding: "2rem" }} />
<Frame autoLayout={{ width: "clamp(200px, 50%, 600px)" }} />
<Frame autoLayout={{ flow: 'grid', grid: "3x4" }} />
```

## 📚 Documentation
- New guide: `docs/CSS_UNITS.md`
- New story file: `__stories__/css-units.stories.tsx`
- Example file: `test-css-units.tsx`

## 🐛 Bug Fixes
- Fixed padding calculation for freeform layouts
- Improved margin handling with CSS units

## 🚀 Performance
- Minimal overhead: CSS unit conversion uses simple string operations
- No runtime dependencies added

## 💡 Examples

### Responsive Layout
```tsx
<Frame
  autoLayout={{
    width: "min(90vw, 1200px)",
    height: "clamp(300px, 50vh, 600px)",
    padding: "clamp(1rem, 5vw, 3rem)",
  }}
/>
```

### Grid Dashboard
```tsx
<Frame
  autoLayout={{
    flow: 'grid',
    grid: "4x3",
    gap: "1rem",
    padding: "2rem",
  }}
>
  {/* 12 dashboard widgets */}
</Frame>
```

### Mixed Units
```tsx
<Frame
  autoLayout={{
    padding: {
      top: "1rem",
      right: "2em",
      bottom: "10%",
      left: "20px"
    }
  }}
/>
```

## 🔗 Links
- [Full Documentation](./docs/CSS_UNITS.md)
- [Storybook Examples](__stories__/css-units.stories.tsx)

## 👏 Credits
Built with ❤️ by the Noiir team

---

**Install:** `npm install @noiir/core@1.1.0`
