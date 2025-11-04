# Noiir - Designer-Friendly React Syntax

## What is Noiir?

Noiir is a lightweight preprocessor that allows designers and developers to write React components using a more intuitive, designer-friendly syntax. Files with the `.noiir` extension are compiled into standard TypeScript/React `.tsx` files.

## Purpose

- **Lower barrier to entry**: Simplified syntax makes it easier for designers to write component code
- **Seamless integration**: Compiled files are standard TypeScript that work with your existing build process
- **Familiar patterns**: Uses designer-friendly keywords like `group`, `variant`, and `frame`

## Getting Started

### Compiling Noiir Files

Compile all `.noiir` files to `.tsx`:

```bash
npm run build:noiir
```

Watch for changes and auto-compile:

```bash
npm run watch:noiir
```

### VSCode Integration

A VSCode task is available for quick compilation:
- Press `Ctrl+Shift+P` → "Tasks: Run Task" → "compile-noiir"

Syntax highlighting is enabled via the Highlight extension with custom regex patterns.

## Syntax Transformations

### Designer Syntax → TypeScript

| Designer Syntax | Compiles To |
|----------------|-------------|
| `export group` | `export const` |
| `export variant` | `export const` |
| `interface Foo: {` | `interface Foo {` |
| `function:` | `const logic = () =>` |
| `<frame` | `<Frame` |
| `extendVariant` | `ExtendVariant` |

## Example: Navbar Component

### Source: `Navbar.noiir`

```tsx
import { Frame } from '../frame/Frame';
import Button from '../atoms/button/button';
import { ExtendVariant } from '../frame/frame-properties/variants/variants.props';

interface groupProps: {
  logo?: React.ReactNode;
}

export group Navbar = (props: groupProps) => {
  function: { console.log("toggle menu") }

  return (
    <frame variant="navbar" variants={{NAVBAR_VARIANTS}}>
      <frame variant="logo">{props.logo}</frame>
      <Button onClick={logic}>Toggle</Button>
    </frame>
  );
}

export variant NAVBAR_VARIANTS: extendVariant = {
  navItem: {
    fill: { type: 'none' as const },
    typography: { fontSize: 14, fontWeight: 500, color: 'gray8' },
  },
  navItemHover: {
    fill: { type: 'solid' as const, color: 'primary1', opacity: 0.5 },
    typography: { fontSize: 14, fontWeight: 500, color: 'primary7' },
  },
}
```

### Compiled: `Navbar.tsx`

```tsx
import { Frame } from '../frame/Frame';
import Button from '../atoms/button/button';
import { ExtendVariant } from '../frame/frame-properties/variants/variants.props';

interface groupProps {
  logo?: React.ReactNode;
}

export const Navbar = (props: groupProps) => {
  const logic = () => { console.log("toggle menu") }

  return (
    <Frame variant="navbar" variants={{ NAVBAR_VARIANTS }}>
      <Frame variant="logo">{props.logo}</Frame>
      <Button onClick={logic}>Toggle</Button>
    </Frame>
  );
}

export const NAVBAR_VARIANTS: ExtendVariant = {
  navItem: {
    fill: { type: 'none' as const },
    typography: { fontSize: 14, fontWeight: 500, color: 'gray8' },
  },
  navItemHover: {
    fill: { type: 'solid' as const, color: 'primary1', opacity: 0.5 },
    typography: { fontSize: 14, fontWeight: 500, color: 'primary7' },
  },
}
```

## Workflow

1. **Create** `.noiir` files with designer-friendly syntax
2. **Compile** using `npm run build:noiir` or `npm run watch:noiir`
3. **Import** the generated `.tsx` files in your components as usual
4. **Iterate** - edit `.noiir` files and recompile as needed

## Architecture

- **Compiler**: `scripts/compile-noiir.js` - Simple regex-based transformations
- **Source files**: `src/**/*.noiir` - Your designer-friendly source code
- **Generated files**: `src/**/*.tsx` - Standard TypeScript/React files
- **Version control**: Commit both `.noiir` sources and generated `.tsx` files

## Tips

- Generated `.tsx` files should be committed to git for easier code review and debugging
- Use `npm run watch:noiir` during active development
- The `.noiir` syntax is just sugar - all TypeScript features still work
- Syntax highlighting is configured in `.vscode/settings.json`

## Migrating Existing Files

To migrate an existing component:

1. Copy your `.tsx` file to `.noiir`
2. Replace `export const` with `export group` or `export variant`
3. Replace `interface Name {` with `interface Name: {`
4. Replace arrow functions with `function:` where desired
5. Replace `<Frame` with `<frame` (lowercase)
6. Run `npm run build:noiir` to generate the new `.tsx`
7. Verify TypeScript compilation with `npm run build`

---

*Noiir keeps the power of TypeScript while making component authoring more accessible to designers.*
