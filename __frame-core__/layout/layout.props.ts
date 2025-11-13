import React from 'react';
import { CSSUnit, DimensionValue, GridConfig, normalizeCSSUnit, normalizeSpacing, spacingToCSS, gridConfigToCSS } from '../utils/css-units';

//ALL LAYOUT RELATED PROPS AND HOOKS SHOULD GO IN THIS FILE
// EXCEPTION Curved layout is handled in files within this folder

export interface AutoLayoutProps {
  // Flow and alignment
  flow?: 'freeform' | 'horizontal' | 'vertical' | 'horizontalReverse' | 'verticalReverse' | 'grid' | 'curved';
  alignment?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'top' | 'center' | 'bottom' | 'left' | 'right';
  path?: { d: string };
  
  // Grid configuration (when flow is 'grid')
  grid?: GridConfig | string; // e.g., "3x4" or { columns: 3, rows: 4 }
  
  // Dimensions - now support all CSS units
  width?: DimensionValue;
  height?: DimensionValue;
  minWidth?: CSSUnit;
  maxWidth?: CSSUnit;
  minHeight?: CSSUnit;
  maxHeight?: CSSUnit;
  overflow?: string;

  
  // Spacing - now support all CSS units
  gap?: CSSUnit | 'full' | 'none' | 'hug' | 'fill';

  // Margin - now support all CSS units
  margin?: CSSUnit | { top?: CSSUnit; right?: CSSUnit; bottom?: CSSUnit; left?: CSSUnit };
  
  // Padding - now support all CSS units
  padding?: CSSUnit | { top?: CSSUnit; right?: CSSUnit; bottom?: CSSUnit; left?: CSSUnit };
  paddingHorizontal?: CSSUnit;
  paddingVertical?: CSSUnit;
  paddingLeft?: CSSUnit;
  paddingRight?: CSSUnit;
  paddingTop?: CSSUnit;
  paddingBottom?: CSSUnit;
  
  // Wrapping and clipping
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  clipContent?: boolean;
}

export const convertAutoLayoutProps = (props: AutoLayoutProps, children?: React.ReactNode): React.CSSProperties => {
  if (!props) return {};
  const styles: React.CSSProperties = {};

  // Padding - like Figma's padding controls (always apply for freeform)
  let padLeft = '0px', padRight = '0px', padTop = '0px', padBottom = '0px';
  
  if (props.padding !== undefined) {
    const paddingResult = normalizeSpacing(props.padding);
    if (paddingResult) {
      if (typeof paddingResult === 'string') {
        padLeft = padRight = padTop = padBottom = paddingResult;
      } else {
        padTop = paddingResult.top;
        padRight = paddingResult.right;
        padBottom = paddingResult.bottom;
        padLeft = paddingResult.left;
      }
    }
  }
  
  // Override with specific padding props
  if (props.paddingLeft !== undefined) padLeft = normalizeCSSUnit(props.paddingLeft);
  if (props.paddingRight !== undefined) padRight = normalizeCSSUnit(props.paddingRight);
  if (props.paddingTop !== undefined) padTop = normalizeCSSUnit(props.paddingTop);
  if (props.paddingBottom !== undefined) padBottom = normalizeCSSUnit(props.paddingBottom);
  if (props.paddingHorizontal !== undefined) {
    const hPad = normalizeCSSUnit(props.paddingHorizontal);
    padLeft = padRight = hPad;
  }
  if (props.paddingVertical !== undefined) {
    const vPad = normalizeCSSUnit(props.paddingVertical);
    padTop = padBottom = vPad;
  }
  // Special: For freeform flow, if width or height is 'hug', calculate bounding box of children
  // Also for any flow with positioned children, include them in size calculation
  const hasPositionedChildren = children && React.Children.toArray(children).some((child) => 
    React.isValidElement(child) && child.props?.position && (child.props.position.x !== undefined || child.props.position.y !== undefined)
  );
  
  if ((props.flow === 'freeform' || hasPositionedChildren) && (props.width === 'hug' || props.height === 'hug') && children) {
    let maxRight = 0;
    let maxBottom = 0;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const el = child as React.ReactElement<any>;
        const x = el.props.position?.x || 0;
        const y = el.props.position?.y || 0;
        let w = 0;
        let h = 0;
        if (el.props.autoLayout?.width && typeof el.props.autoLayout.width === 'number') w = el.props.autoLayout.width;
        else if (el.props.style?.width) w = parseInt(el.props.style.width, 10) || 0;
        if (el.props.autoLayout?.height && typeof el.props.autoLayout.height === 'number') h = el.props.autoLayout.height;
        else if (el.props.style?.height) h = parseInt(el.props.style.height, 10) || 0;
        maxRight = Math.max(maxRight, x + w);
        maxBottom = Math.max(maxBottom, y + h);
      }
    });
    if (props.width === 'hug') {
      const padLeftNum = parseFloat(padLeft) || 0;
      const padRightNum = parseFloat(padRight) || 0;
      styles.width = `calc(${maxRight}px + ${padLeft} + ${padRight})`;
    }
    if (props.height === 'hug') {
      const padTopNum = parseFloat(padTop) || 0;
      const padBottomNum = parseFloat(padBottom) || 0;
      styles.height = `calc(${maxBottom}px + ${padTop} + ${padBottom})`;
    }
    // Always apply padding for freeform or when there are positioned children
    if (props.flow === 'freeform' || hasPositionedChildren) {
      styles.paddingTop = padTop;
      styles.paddingRight = padRight;
      styles.paddingBottom = padBottom;
      styles.paddingLeft = padLeft;
    }
  }
  // Margin - like Figma's margin controls
  if (props.margin !== undefined) {
    const marginResult = normalizeSpacing(props.margin);
    if (typeof marginResult === 'string') {
      styles.margin = marginResult;
    } else if (marginResult) {
      styles.margin = spacingToCSS(marginResult);
    }
  }
  
  // Handle flow (layout direction) - like Figma's auto layout direction
  switch (props.flow) {
    case 'horizontal':
      styles.display = 'flex';
      styles.flexDirection = 'row';
      if (hasPositionedChildren) styles.position = 'relative';
      break;
    case 'horizontalReverse':
      styles.display = 'flex';
      styles.flexDirection = 'row-reverse';
      if (hasPositionedChildren) styles.position = 'relative';
      break;
    case 'vertical':
      styles.display = 'flex';
      styles.flexDirection = 'column';
      if (hasPositionedChildren) styles.position = 'relative';
      break;
    case 'verticalReverse':
      styles.display = 'flex';
      styles.flexDirection = 'column-reverse';
      if (hasPositionedChildren) styles.position = 'relative';
      break;
    case 'grid':
      styles.display = 'grid';
      if (hasPositionedChildren) styles.position = 'relative';
      // Apply grid configuration if provided
      if (props.grid) {
        const gridStyles = gridConfigToCSS(props.grid);
        Object.assign(styles, gridStyles);
      }
      break;
    case 'curved':
      // Curved layout handled in Frame, not here
      styles.position = 'relative';
      break;
    case 'freeform':
    default:
      // Don't set position: relative for frames that might be absolutely positioned
      // Only containers with specific flow types need relative positioning
      // width/height for hug handled above
      if (hasPositionedChildren) styles.position = 'relative';
      break;
  }
  
  // Alignment based on flow type and alignment value
  // Note: Freeform layout doesn't use alignment - children are positioned absolutely
  if (props.alignment && props.flow !== 'freeform') {
    // Handle both compound values (e.g., 'topCenter') and single values (e.g., 'center')
    // Split camelCase: topCenter -> ['top', 'Center'], center -> ['center']
    const camelCaseSplit = props.alignment.match(/^[a-z]+|[A-Z][a-z]*/g) || [props.alignment];
    const vertical = camelCaseSplit[0].toLowerCase();
    const horizontal = camelCaseSplit.length > 1 ? camelCaseSplit[1].toLowerCase() : vertical; // If single value, use same for both axes

    if (props.flow === 'horizontal' || props.flow === 'horizontalReverse') {
      // For horizontal flow (flex-direction: row or row-reverse)
      // Map vertical part to align-items (cross axis)
      switch (vertical) {
        case 'top':
          styles.alignItems = 'flex-start';
          break;
        case 'center':
          styles.alignItems = 'center';
          break;
        case 'bottom':
          styles.alignItems = 'flex-end';
          break;
      }

      // Map horizontal part to justify-content (main axis)
      switch (horizontal) {
        case 'left':
          styles.justifyContent = 'flex-start';
          break;
        case 'center':
          styles.justifyContent = 'center';
          break;
        case 'right':
          styles.justifyContent = 'flex-end';
          break;
      }
    } else if (props.flow === 'vertical' || props.flow === 'verticalReverse') {
      // For vertical flow (flex-direction: column or column-reverse)
      // Map vertical part to justify-content (main axis)
      switch (vertical) {
        case 'top':
          styles.justifyContent = 'flex-start';
          break;
        case 'center':
          styles.justifyContent = 'center';
          break;
        case 'bottom':
          styles.justifyContent = 'flex-end';
          break;
      }

      // Map horizontal part to align-items (cross axis)
      switch (horizontal) {
        case 'left':
          styles.alignItems = 'flex-start';
          break;
        case 'center':
          styles.alignItems = 'center';
          break;
        case 'right':
          styles.alignItems = 'flex-end';
          break;
      }
    } else if (props.flow === 'grid') {
      // For grid layout, use place-items
      let placeItems = '';

      // Map vertical part
      switch (vertical) {
        case 'top':
          placeItems += 'start';
          break;
        case 'center':
          placeItems += 'center';
          break;
        case 'bottom':
          placeItems += 'end';
          break;
      }

      placeItems += ' ';

      // Map horizontal part
      switch (horizontal) {
        case 'left':
          placeItems += 'start';
          break;
        case 'center':
          placeItems += 'center';
          break;
        case 'right':
          placeItems += 'end';
          break;
      }

      styles.placeItems = placeItems.trim();
    }
  }
  

  
  // Dimensions - Figma's resizing behavior
  if (props.width !== undefined) {
    switch (props.width) {
      case 'hug':
        styles.width = 'fit-content';
        break;
      case 'fill-container':
      case 'fill':
        styles.width = '100%';
        break;
      case 'auto':
        styles.width = 'auto';
        break;
      case 'full':
        styles.width = '100%';
        break;
      case 'none':
        styles.width = 'none';
        break;
      default:
        styles.width = normalizeCSSUnit(props.width);
        break;
    }
  }

  if (props.height !== undefined) {
    switch (props.height) {
      case 'hug':
        styles.height = 'fit-content';
        break;
      case 'fill-container':
      case 'fill':
        styles.height = '100%';
        break;
      case 'auto':
        styles.height = 'auto';
        break;
      case 'full':
        styles.height = '100%';
        break;
      case 'none':
        styles.height = 'none';
        break;
      default:
        styles.height = normalizeCSSUnit(props.height);
        break;
    }
  }

  if (props.maxHeight !== undefined) {
    styles.maxHeight = normalizeCSSUnit(props.maxHeight);
  }

  if (props.minWidth !== undefined) {
    styles.minWidth = normalizeCSSUnit(props.minWidth);
  }

  if (props.maxWidth !== undefined) {
    styles.maxWidth = normalizeCSSUnit(props.maxWidth);
  }

  if (props.minHeight !== undefined) {
    styles.minHeight = normalizeCSSUnit(props.minHeight);
  }
  
  if (props.overflow !== undefined) {
    styles.overflow = props.overflow;
  }
  
  
  // Gap between items (like Figma's spacing between items)
  // Only apply gap for non-freeform flows
  if (
    props.gap !== undefined &&
    (props.flow === 'horizontal' || props.flow === 'vertical' || props.flow === 'horizontalReverse' || props.flow === 'verticalReverse' || props.flow === 'grid' || props.flow === 'curved')
  ) {
    switch (props.gap) {
      case 'none':
        styles.gap = '0';
        break;
      case 'hug':
        styles.gap = '0'; // Hug means minimal spacing
        break;
      case 'fill':
        // For fill, we want to distribute space between items
        // This is tricky with CSS gap alone, but we can use justify-content
        if (props.flow === 'horizontal' || props.flow === 'horizontalReverse') {
          styles.justifyContent = 'space-between';
          styles.gap = '0'; // Let space-between handle the distribution
        } else if (props.flow === 'vertical' || props.flow === 'verticalReverse') {
          styles.justifyContent = 'space-between';
          styles.gap = '0';
        }
        break;
      case 'full':
        // Full might mean maximum gap, but we'll treat it as a large value
        styles.gap = '100%';
        break;
      default:
        if (typeof props.gap === 'number') {
          styles.gap = `${props.gap}px`;
        } else if (typeof props.gap === 'string') {
          styles.gap = normalizeCSSUnit(props.gap);
        }
        break;
    }
  }
  
  
  // Note: Padding is already handled at the top of the function for freeform/positioned children
  // Only apply padding styles here if NOT already set
  if (!styles.paddingTop && !styles.paddingLeft && !styles.paddingRight && !styles.paddingBottom) {
    if (props.padding !== undefined) {
      const paddingResult = normalizeSpacing(props.padding);
      if (typeof paddingResult === 'string') {
        styles.padding = paddingResult;
      } else if (paddingResult) {
        styles.padding = spacingToCSS(paddingResult);
      }
    }
    
    // Horizontal and vertical padding shortcuts (applied before individual controls)
    if (props.paddingHorizontal !== undefined) {
      const hPadding = normalizeCSSUnit(props.paddingHorizontal);
      styles.paddingLeft = hPadding;
      styles.paddingRight = hPadding;
    }
    if (props.paddingVertical !== undefined) {
      const vPadding = normalizeCSSUnit(props.paddingVertical);
      styles.paddingTop = vPadding;
      styles.paddingBottom = vPadding;
    }
    
    // Individual padding controls (override shortcuts and general padding)
    if (props.paddingTop !== undefined) {
      styles.paddingTop = normalizeCSSUnit(props.paddingTop);
    }
    if (props.paddingRight !== undefined) {
      styles.paddingRight = normalizeCSSUnit(props.paddingRight);
    }
    if (props.paddingBottom !== undefined) {
      styles.paddingBottom = normalizeCSSUnit(props.paddingBottom);
    }
    if (props.paddingLeft !== undefined) {
      styles.paddingLeft = normalizeCSSUnit(props.paddingLeft);
    }
  }
  
  // Wrapping behavior (flex-wrap)
  if (props.wrap && (props.flow === 'horizontal' || props.flow === 'vertical' || props.flow === 'horizontalReverse' || props.flow === 'verticalReverse')) {
    styles.flexWrap = props.wrap;
  }
  
  // Clipping content (overflow)
  if (props.clipContent) {
    styles.overflow = 'hidden';
  }
  
  return styles;
};