/**
 * CSS Unit Utilities
 * 
 * Provides type-safe CSS unit handling for all dimension properties
 * Supports: px, em, rem, vh, vw, %, vmin, vmax, ch, ex
 */

// CSS unit type - can be a number (treated as px) or a string with unit
export type CSSUnit = number | `${number}px` | `${number}em` | `${number}rem` | `${number}vh` | `${number}vw` | `${number}%` | `${number}vmin` | `${number}vmax` | `${number}ch` | `${number}ex` | string;

// Dimension value - CSS unit or special keywords (also accepts any valid CSS string like calc(), clamp(), etc.)
export type DimensionValue = CSSUnit | 'auto' | 'hug' | 'fill' | 'fill-container' | 'none' | 'full';

/**
 * Normalize any value to a valid CSS unit string
 * - Numbers become px
 * - Strings with units are preserved
 * - Strings without units get px appended
 * - Special keywords ('auto', 'hug', etc.) are preserved
 */
export function normalizeCSSUnit(value: any): string {
  // Handle null/undefined
  if (value === null || value === undefined) return '0px';
  
  // Handle numbers - convert to px
  if (typeof value === 'number') {
    return `${value}px`;
  }
  
  // Handle strings
  if (typeof value === 'string') {
    // Trim whitespace
    const trimmed = value.trim();
    
    // Special keywords
    if (['auto', 'hug', 'fill', 'fill-container', 'none', 'full', 'inherit', 'initial', 'unset'].includes(trimmed)) {
      return trimmed;
    }
    
    // Check if it already has a CSS unit
    const hasUnit = /^-?\d+\.?\d*(px|em|rem|vh|vw|%|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/i.test(trimmed);
    if (hasUnit) {
      return trimmed;
    }
    
    // Pure number string - add px
    const numericMatch = /^-?\d+\.?\d*$/.test(trimmed);
    if (numericMatch) {
      return `${trimmed}px`;
    }
    
    // Calc, var(), or other CSS functions - preserve as-is
    if (trimmed.includes('(')) {
      return trimmed;
    }
    
    // Fallback - return as-is
    return trimmed;
  }
  
  // Fallback for other types
  return String(value);
}

/**
 * Normalize spacing values (can be single value or object with top/right/bottom/left)
 */
export function normalizeSpacing(
  value: CSSUnit | { top?: CSSUnit; right?: CSSUnit; bottom?: CSSUnit; left?: CSSUnit } | undefined
): string | { top: string; right: string; bottom: string; left: string } | undefined {
  if (value === undefined) return undefined;
  
  if (typeof value === 'object' && !Array.isArray(value)) {
    return {
      top: normalizeCSSUnit(value.top || 0),
      right: normalizeCSSUnit(value.right || 0),
      bottom: normalizeCSSUnit(value.bottom || 0),
      left: normalizeCSSUnit(value.left || 0),
    };
  }
  
  return normalizeCSSUnit(value);
}

/**
 * Convert spacing object to CSS shorthand
 */
export function spacingToCSS(spacing: { top: string; right: string; bottom: string; left: string }): string {
  return `${spacing.top} ${spacing.right} ${spacing.bottom} ${spacing.left}`;
}

/**
 * Grid configuration helper
 * Parses grid syntax like "3x4" or "2x3" into CSS grid-template
 */
export interface GridConfig {
  columns: number;
  rows: number;
  columnGap?: CSSUnit;
  rowGap?: CSSUnit;
  columnTemplate?: string; // e.g., "1fr 2fr 1fr"
  rowTemplate?: string;    // e.g., "auto 1fr auto"
}

/**
 * Parse grid shorthand like "3x4" into columns and rows
 */
export function parseGridShorthand(value: string): { columns: number; rows: number } | null {
  const match = value.match(/^(\d+)x(\d+)$/i);
  if (match) {
    return {
      columns: parseInt(match[1], 10),
      rows: parseInt(match[2], 10),
    };
  }
  return null;
}

/**
 * Convert GridConfig to CSS properties
 */
export function gridConfigToCSS(config: GridConfig | string): React.CSSProperties {
  const styles: React.CSSProperties = {};
  
  // If string shorthand like "3x4", parse it
  if (typeof config === 'string') {
    const parsed = parseGridShorthand(config);
    if (parsed) {
      styles.gridTemplateColumns = `repeat(${parsed.columns}, 1fr)`;
      styles.gridTemplateRows = `repeat(${parsed.rows}, 1fr)`;
      return styles;
    }
  }
  
  // Full config object
  if (typeof config === 'object') {
    // Use custom templates if provided, otherwise use repeat with fr units
    if (config.columnTemplate) {
      styles.gridTemplateColumns = config.columnTemplate;
    } else if (config.columns) {
      styles.gridTemplateColumns = `repeat(${config.columns}, 1fr)`;
    }
    
    if (config.rowTemplate) {
      styles.gridTemplateRows = config.rowTemplate;
    } else if (config.rows) {
      styles.gridTemplateRows = `repeat(${config.rows}, 1fr)`;
    }
    
    if (config.columnGap !== undefined) {
      styles.columnGap = normalizeCSSUnit(config.columnGap);
    }
    
    if (config.rowGap !== undefined) {
      styles.rowGap = normalizeCSSUnit(config.rowGap);
    }
  }
  
  return styles;
}
