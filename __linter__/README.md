# Noiir Linter & Debugger

This folder contains the linter and debugging tools for the Noiir design system. The goal is to enforce strict usage of Frame props, variants, and design tokens, and to maintain the language intent of Noiir components and syntax.

## Purpose
- Catch and report usage of disallowed props (e.g., `style`, `border`, `className`)
- Enforce use of Frame props and variants for all styling and layout
- Validate prop types and variant shapes for consistency
- Provide IDE integration for real-time feedback and recommendations
- Offer quick-fix actions and documentation links for best practices
- Support both `.noiir` and `.tsx` files

## Structure
```
__linter__/
├── noiir-lint.ts         # Main linter logic and API
├── cli.ts                # Command-line interface
├── reporter.ts           # Console and IDE reporting
├── config.json           # Default rule configuration
├── rules/
│   ├── rule-types.ts     # TypeScript interfaces for rules
│   ├── disallowed-props.ts # Rule for catching legacy CSS props
│   └── frame-props-only.ts # Rule for Frame component validation
└── README.md             # This documentation
```

## Usage

### Command Line
```bash
# Lint all .tsx and .ts files in src/
npm run lint:noiir src/

# Lint specific files
npm run lint:noiir src/components/Button.tsx src/components/Input.tsx

# Lint with custom config
npm run lint:noiir src/ --config ./my-config.json

# Lint .noiir files (when parser is available)
npm run lint:noiir src/ --ext .noiir
```

### Programmatic API
```typescript
import { NoiirLinter } from '@noiir/core/__linter__/noiir-lint';

const linter = new NoiirLinter('./custom-config.json');
const results = linter.lintFiles(['src/components/Button.tsx']);
linter.report(results);
```

## Rules

### `disallowed-props` (Error)
Catches legacy CSS properties that should be replaced with Frame props:

**Disallowed props:**
- `style`, `className`, `border*`, `background*`
- `color`, `font*`, `margin*`, `padding*`
- `width`, `height`, `display`, `position`
- `boxShadow`, `textAlign`, etc.

**Suggestions provided:**
- `border` → `stroke={{ type: "solid", color: "...", weight: 1 }}`
- `backgroundColor` → `fill={{ type: "solid", color: "..." }}`
- `fontSize` → `typography={{ fontSize: 16 }}`
- `margin` → `autoLayout={{ paddingHorizontal: 16 }}`

### `frame-props-only` (Warning)
Validates that Frame components use proper variants from the design system.

## Configuration

The `config.json` file controls:
- **Rule severity**: `"error"` or `"warning"`
- **Allowed props**: Props that are OK to use (e.g., `key`, `ref`, `children`)
- **Frame components**: Which components should follow Frame rules
- **Valid variants**: Registry of approved variant names

## IDE Integration

### VSCode Extension (Future)
The linter is designed to integrate with IDEs via:
- **Real-time diagnostics** in the problems panel
- **Quick-fix actions** for common replacements
- **Hover documentation** for Frame props
- **Autocomplete** for variants and props

### ESLint Plugin (Future)
Can be wrapped as an ESLint plugin for broader IDE support.

## Development

### Adding New Rules
1. Create `rules/new-rule.ts` implementing the `Rule` interface
2. Add to `noiir-lint.ts` rules array
3. Update `config.json` with rule configuration
4. Add tests and documentation

### Testing the Linter
```bash
# Test on sample files
npm run lint:noiir __stories__/**/*.stories.tsx

# Check for false positives
npm run lint:noiir src/**/*.tsx
```

## Example Output
```
🔍 Linting 15 files...
🚨 Noiir Linter Results:
   3 errors, 2 warnings

📁 src/components/Button.tsx:
  ❌ 12:5 - Disallowed prop 'style' found. Use Frame props instead. (disallowed-props)
    💡 Suggestions:
       • Use Frame props like fill, stroke, appearance, etc.

  ⚠️ 15:10 - Unknown variant 'custom-variant'. Use variants from the design system. (frame-props-only)
    💡 Suggestions:
       • Check available variants in __variants__ folder

❌ 3 error(s) found. Please fix before committing.
```

## Future Enhancements
- **.noiir file support** with custom parser
- **Auto-fix capabilities** for common issues
- **VSCode extension** for real-time feedback
- **Pre-commit hooks** for CI/CD integration
- **Performance optimizations** for large codebases

---

*Keep your Noiir code clean, consistent, and true to the design system!*