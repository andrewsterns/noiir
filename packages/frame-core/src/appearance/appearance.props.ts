import React from 'react';
import { normalizeCSSUnit } from '../utils/css-units';

//ALL APPEARANCE RELATED PROPS AND HOOKS SHOULD GO IN THIS FILE

export interface AppearanceProps {
  opacity?: number;
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light';
  visible?: boolean;
  radius?: number | string;
  radiusTopLeft?: number | string;
  radiusTopRight?: number | string;
  radiusBottomRight?: number | string;
  radiusBottomLeft?: number | string;
}

export const convertAppearanceProps = (props: AppearanceProps): React.CSSProperties => {
  if (!props) return {};
  
  const styles: React.CSSProperties = {};
  
  if (props.opacity !== undefined) {
    styles.opacity = Math.max(0, Math.min(1, props.opacity));
  }
  
  if (props.blendMode && props.blendMode !== 'normal') {
    styles.mixBlendMode = props.blendMode;
  }
  
  if (props.visible === false) {
    styles.visibility = 'hidden';
  }

  // Handle border radius - individual corners take precedence over uniform radius
  const hasIndividualCorners = (props.radiusTopLeft && props.radiusTopLeft !== 0) || 
                              (props.radiusTopRight && props.radiusTopRight !== 0) || 
                              (props.radiusBottomRight && props.radiusBottomRight !== 0) || 
                              (props.radiusBottomLeft && props.radiusBottomLeft !== 0);

  if (hasIndividualCorners) {
    // Use individual corner values, defaulting to 0 if not specified
    const topLeft = props.radiusTopLeft !== undefined ? normalizeCSSUnit(props.radiusTopLeft) : '0px';
    const topRight = props.radiusTopRight !== undefined ? normalizeCSSUnit(props.radiusTopRight) : '0px';
    const bottomRight = props.radiusBottomRight !== undefined ? normalizeCSSUnit(props.radiusBottomRight) : '0px';
    const bottomLeft = props.radiusBottomLeft !== undefined ? normalizeCSSUnit(props.radiusBottomLeft) : '0px';
    styles.borderRadius = `${topLeft} ${topRight} ${bottomRight} ${bottomLeft}`;
  } else if (props.radius !== undefined) {
    // Use uniform radius
    styles.borderRadius = normalizeCSSUnit(props.radius);
  }
  
  return styles;
};

export const convertCornerRadius = (
  radius?: number | string | {
    topLeft?: number | string;
    topRight?: number | string;
    bottomRight?: number | string;
    bottomLeft?: number | string;
  }
): React.CSSProperties => {
  if (!radius) return {};
  
  const styles: React.CSSProperties = {};
  
  if (typeof radius === 'number' || typeof radius === 'string') {
    styles.borderRadius = normalizeCSSUnit(radius);
  } else {
    const { topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0 } = radius;
    const corners = [
      normalizeCSSUnit(topLeft),
      normalizeCSSUnit(topRight),
      normalizeCSSUnit(bottomRight),
      normalizeCSSUnit(bottomLeft)
    ];
    styles.borderRadius = corners.join(' ');
  }
  
  return styles;
};

export const createAppearanceVariations = (
  baseProps: AppearanceProps,
  variations: {
    hover?: Partial<AppearanceProps>;
    active?: Partial<AppearanceProps>;
    focus?: Partial<AppearanceProps>;
    disabled?: Partial<AppearanceProps>;
  }
) => {
  return {
    base: convertAppearanceProps(baseProps),
    hover: convertAppearanceProps({ ...baseProps, ...variations.hover }),
    active: convertAppearanceProps({ ...baseProps, ...variations.active }),
    focus: convertAppearanceProps({ ...baseProps, ...variations.focus }),
    disabled: convertAppearanceProps({ ...baseProps, ...variations.disabled })
  };
};
