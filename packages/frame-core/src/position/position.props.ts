import React from 'react';

export interface PositionProps {
  type?: 'fixed' | 'absolute' | 'relative';
  alignment?: 'left' | 'center' | 'right' | 'justify';
  rotation?: number;
  x?: number;
  y?: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

export interface ConstraintProps {
  horizontal?: 'left' | 'right' | 'center' | 'left-right' | 'scale';
  vertical?: 'top' | 'bottom' | 'center' | 'top-bottom' | 'scale';
}

export const convertPositionProps = (
  props: PositionProps, 
  hasAutoLayout: boolean = false
): React.CSSProperties => {
  if (!props) return {};
  
  const styles: React.CSSProperties = {};
  
  // Utility to normalize units
  const normalizeUnit = (value: any) => {
    if (typeof value === 'number') return `${value}px`;
    if (typeof value === 'string') {
      if (/^(\d+)$/.test(value)) return `${value}px`;
      if (/^(\d+(px|%|em|rem))$/.test(value)) return value;
      return value; // fallback for other valid CSS units
    }
    return value;
  };

  // Position type (fixed, absolute, relative)
  if (props.type) {
    styles.position = props.type;
  } else if (props.x !== undefined || props.y !== undefined) {
    styles.position = 'absolute';
  }

  // Top/left/right/bottom support
  if (props.top !== undefined) styles.top = normalizeUnit(props.top);
  if (props.left !== undefined) styles.left = normalizeUnit(props.left);
  if (props.right !== undefined) styles.right = normalizeUnit(props.right);
  if (props.bottom !== undefined) styles.bottom = normalizeUnit(props.bottom);

  // x/y fallback for absolute positioning
  if (props.x !== undefined) styles.left = normalizeUnit(props.x);
  if (props.y !== undefined) styles.top = normalizeUnit(props.y);
  
  // Rotation transform - works regardless of autolayout
  if (props.rotation !== undefined) {
    const rotateTransform = `rotate(${props.rotation}deg)`;
    styles.transform = styles.transform ? `${styles.transform} ${rotateTransform}` : rotateTransform;
  }
  
  // Text alignment - only applies when NOT in autolayout (like Figma)
  // In autolayout, alignment is handled by the container, not individual items
  if (props.alignment && !hasAutoLayout) {
    switch (props.alignment) {
      case 'left':
        styles.textAlign = 'left';
        break;
      case 'center':
        styles.textAlign = 'center';
        break;
      case 'right':
        styles.textAlign = 'right';
        break;
      case 'justify':
        styles.textAlign = 'justify';
        break;
    }
  }
  
  return styles;
};

export const convertConstraintProps = (
  props: ConstraintProps,
  parentWidth?: number,
  parentHeight?: number
): React.CSSProperties => {
  if (!props) return {};
  
  const styles: React.CSSProperties = {};
  
  // Horizontal constraints - like Figma's constraint system
  if (props.horizontal) {
    switch (props.horizontal) {
      case 'left':
        styles.position = 'absolute';
        styles.left = 0;
        break;
      case 'right':
        styles.position = 'absolute';
        styles.right = 0;
        break;
      case 'center':
        styles.position = 'absolute';
        styles.left = '50%';
        styles.transform = (styles.transform || '') + ' translateX(-50%)';
        break;
      case 'left-right':
        // Pin to both left and right (stretches horizontally)
        styles.position = 'absolute';
        styles.left = 0;
        styles.right = 0;
        break;
      case 'scale':
        // Scale with parent (maintains proportional width)
        if (parentWidth) {
          styles.width = '100%';
        }
        break;
    }
  }
  
  // Vertical constraints - like Figma's constraint system
  if (props.vertical) {
    switch (props.vertical) {
      case 'top':
        if (!styles.position) styles.position = 'absolute';
        styles.top = 0;
        break;
      case 'bottom':
        if (!styles.position) styles.position = 'absolute';
        styles.bottom = 0;
        break;
      case 'center':
        if (!styles.position) styles.position = 'absolute';
        styles.top = '50%';
        styles.transform = (styles.transform || '') + ' translateY(-50%)';
        break;
      case 'top-bottom':
        // Pin to both top and bottom (stretches vertically)
        if (!styles.position) styles.position = 'absolute';
        styles.top = 0;
        styles.bottom = 0;
        break;
      case 'scale':
        // Scale with parent (maintains proportional height)
        if (parentHeight) {
          styles.height = '100%';
        }
        break;
    }
  }
  
  return styles;
};

// Utility to combine position and constraint props
export const convertPositionAndConstraints = (
  positionProps?: PositionProps,
  constraintProps?: ConstraintProps,
  hasAutoLayout: boolean = false,
  parentWidth?: number,
  parentHeight?: number
): React.CSSProperties => {
  const positionStyles = convertPositionProps(positionProps || {}, hasAutoLayout);
  const constraintStyles = convertConstraintProps(constraintProps || {}, parentWidth, parentHeight);
  
  // Merge styles, with constraint styles taking precedence for positioning
  const mergedStyles = { ...positionStyles, ...constraintStyles };
  
  // Combine transforms if both exist
  const positionTransform = positionStyles.transform;
  const constraintTransform = constraintStyles.transform;
  
  if (positionTransform && constraintTransform) {
    mergedStyles.transform = `${positionTransform} ${constraintTransform}`;
  }
  
  return mergedStyles;
};
