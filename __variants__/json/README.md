# __variants__/json

This folder is reserved for JSON configuration, data, or schema files related to variants.

## Purpose

This directory can contain:
- Variant schema definitions for validation
- Theme configuration data
- Color palette definitions
- Typography scale configurations
- Icon metadata and configurations
- Component variant presets

## Current Status

Currently empty and reserved for future use. As the variant system grows, this folder may contain:
- Variant validation schemas
- Theme configuration files
- Color system definitions
- Typography configurations
- Icon registries and metadata

## Usage Guidelines

When adding JSON files here:
1. Use descriptive filenames that indicate their purpose
2. Include schema definitions where applicable
3. Document the structure and usage in comments
4. Consider TypeScript interfaces for type safety
5. Keep files organized by category (themes, colors, icons, etc.)

## Example Structure (Future)

```
json/
├── schemas/
│   ├── variant.schema.json
│   ├── theme.schema.json
│   └── color.schema.json
├── themes/
│   ├── light-theme.json
│   ├── dark-theme.json
│   └── brand-themes.json
├── palettes/
│   ├── primary-colors.json
│   ├── semantic-colors.json
│   └── accent-colors.json
└── configs/
    ├── typography.json
    └── spacing.json
```
