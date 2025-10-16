import React from 'react';

/**
 * Merges multiple style objects into a single style object
 * Later styles override earlier ones
 */
export const mergeStyles = (
  ...styles: (React.CSSProperties | undefined)[]
): React.CSSProperties => {
  return styles.reduce<React.CSSProperties>((merged, style) => {
    if (style) {
      return { ...merged, ...style };
    }
    return merged;
  }, {});
};