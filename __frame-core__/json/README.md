# __frame-core__/json

This folder is reserved for JSON configuration, data, or schema files related to frame-core modules.

## Purpose

This directory can contain:
- Frame property schemas for validation
- Default configuration files for frame properties
- Sample data for frame property testing
- Schema definitions for animation, layout, and appearance properties
- Configuration data for frame-core utilities

## Current Status

Currently empty and reserved for future use. As the frame-core system grows, this folder may contain:
- Property validation schemas
- Default value configurations
- Animation preset definitions
- Layout configuration data
- Effect and appearance presets

## Usage Guidelines

When adding JSON files here:
1. Use descriptive filenames that indicate their purpose
2. Include schema definitions where applicable
3. Document the structure and usage in comments
4. Consider TypeScript interfaces for type safety
5. Keep files organized by property category (animate, layout, etc.)

## Example Structure (Future)

```
json/
├── schemas/
│   ├── animate.schema.json
│   ├── layout.schema.json
│   └── appearance.schema.json
├── presets/
│   ├── animations.json
│   ├── layouts.json
│   └── effects.json
└── defaults/
    ├── frame-defaults.json
    └── property-defaults.json
```
