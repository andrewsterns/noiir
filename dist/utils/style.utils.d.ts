import React from 'react';
/**
 * Merges multiple style objects into a single style object
 * Later styles override earlier ones
 */
export declare const mergeStyles: (...styles: (React.CSSProperties | undefined)[]) => React.CSSProperties;
