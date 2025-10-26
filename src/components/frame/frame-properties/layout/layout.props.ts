import React from 'react';

export interface AutoLayoutProps {
  // Flow and alignment
  flow?: 'freeform' | 'horizontal' | 'vertical' | 'grid' | 'curved';
  alignment?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top' | 'center' | 'bottom' | 'left' | 'right';
  path?: { d: string };
  // Dimensions
  width?: string | number | 'hug' | 'fill-container';
  height?: string | number | 'hug' | 'fill-container';
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  overflow?: string;

  
  // Spacing
  gap?: number | 'full' | 'none' | 'hug' | 'fill';

  // Margin (new)
  margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
  marginHorizontal?: number | string;
  marginVertical?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  
  // Padding
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  
  // Wrapping and clipping
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  clipContent?: boolean;
}

export const convertAutoLayoutProps = (props: AutoLayoutProps, children?: React.ReactNode): React.CSSProperties => {
  if (!props) return {};
  const styles: React.CSSProperties = {};
  // Special: For freeform flow, if width or height is 'hug', calculate bounding box of children
  // Padding - like Figma's padding controls (always apply for freeform)
  let padLeft = 0, padRight = 0, padTop = 0, padBottom = 0;
  if (props.padding !== undefined) {
    if (typeof props.padding === 'number') {
      padLeft = padRight = padTop = padBottom = props.padding;
    } else {
      padTop = props.padding.top || 0;
      padRight = props.padding.right || 0;
      padBottom = props.padding.bottom || 0;
      padLeft = props.padding.left || 0;
    }
  }
  if (props.paddingLeft !== undefined) padLeft = typeof props.paddingLeft === 'number' ? props.paddingLeft : parseInt(props.paddingLeft, 10) || 0;
  if (props.paddingRight !== undefined) padRight = typeof props.paddingRight === 'number' ? props.paddingRight : parseInt(props.paddingRight, 10) || 0;
  if (props.paddingTop !== undefined) padTop = typeof props.paddingTop === 'number' ? props.paddingTop : parseInt(props.paddingTop, 10) || 0;
  if (props.paddingBottom !== undefined) padBottom = typeof props.paddingBottom === 'number' ? props.paddingBottom : parseInt(props.paddingBottom, 10) || 0;
  if (props.paddingHorizontal !== undefined) {
    const hPad = typeof props.paddingHorizontal === 'number' ? props.paddingHorizontal : parseInt(props.paddingHorizontal, 10) || 0;
    padLeft = padRight = hPad;
  }
  if (props.paddingVertical !== undefined) {
    const vPad = typeof props.paddingVertical === 'number' ? props.paddingVertical : parseInt(props.paddingVertical, 10) || 0;
    padTop = padBottom = vPad;
  }
  if (props.flow === 'freeform' && (props.width === 'hug' || props.height === 'hug') && children) {
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
    if (props.width === 'hug') styles.width = maxRight + padLeft + padRight;
    if (props.height === 'hug') styles.height = maxBottom + padTop + padBottom;
    // Always apply padding for freeform
    styles.paddingTop = `${padTop}px`;
    styles.paddingRight = `${padRight}px`;
    styles.paddingBottom = `${padBottom}px`;
    styles.paddingLeft = `${padLeft}px`;
  }
  // Margin - like Figma's margin controls
  if (props.margin !== undefined) {
    if (typeof props.margin === 'number') {
      styles.margin = `${props.margin}px`;
    } else {
      const { top, right, bottom, left } = props.margin;
      styles.margin = `${top || 0}px ${right || 0}px ${bottom || 0}px ${left || 0}px`;
    }
  }
  
  // Horizontal and vertical margin shortcuts (applied before individual controls)
  if (props.marginHorizontal !== undefined) {
    const hMargin = typeof props.marginHorizontal === 'number' ? `${props.marginHorizontal}px` : props.marginHorizontal;
    styles.marginLeft = hMargin;
    styles.marginRight = hMargin;
  }
  if (props.marginVertical !== undefined) {
    const vMargin = typeof props.marginVertical === 'number' ? `${props.marginVertical}px` : props.marginVertical;
    styles.marginTop = vMargin;
    styles.marginBottom = vMargin;
  }
  
  // Individual margin controls (override shortcuts and general margin)
  if (props.marginTop !== undefined) {
    styles.marginTop = typeof props.marginTop === 'number' ? `${props.marginTop}px` : props.marginTop;
  }
  if (props.marginRight !== undefined) {
    styles.marginRight = typeof props.marginRight === 'number' ? `${props.marginRight}px` : props.marginRight;
  }
  if (props.marginBottom !== undefined) {
    styles.marginBottom = typeof props.marginBottom === 'number' ? `${props.marginBottom}px` : props.marginBottom;
  }
  if (props.marginLeft !== undefined) {
    styles.marginLeft = typeof props.marginLeft === 'number' ? `${props.marginLeft}px` : props.marginLeft;
  }
  
  // Handle flow (layout direction) - like Figma's auto layout direction
  switch (props.flow) {
    case 'horizontal':
      styles.display = 'flex';
      styles.flexDirection = 'row';
      break;
    case 'vertical':
      styles.display = 'flex';
      styles.flexDirection = 'column';
      break;
    case 'grid':
      styles.display = 'grid';
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
      break;
  }
  
  // Alignment based on flow type and alignment value
  // Note: Freeform layout doesn't use alignment - children are positioned absolutely
  if (props.alignment && props.flow !== 'freeform') {
    // Handle both compound values (e.g., 'top-center') and single values (e.g., 'center')
    const alignmentParts = props.alignment.split('-');
    const vertical = alignmentParts[0];
    const horizontal = alignmentParts.length > 1 ? alignmentParts[1] : vertical; // If single value, use same for both axes
    
    if (props.flow === 'horizontal') {
      // For horizontal flow (flex-direction: row)
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
    } else if (props.flow === 'vertical') {
      // For vertical flow (flex-direction: column)
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
        styles.width = '100%';
        break;
      default:
        if (typeof props.width === 'number') {
          styles.width = `${props.width}px`;
        } else {
          styles.width = props.width;
        }
        break;
    }
  }
  
  if (props.height !== undefined) {
    switch (props.height) {
      case 'hug':
        styles.height = 'fit-content';
        break;
      case 'fill-container':
        styles.height = '100%';
        break;
      default:
        if (typeof props.height === 'number') {
          styles.height = `${props.height}px`;
        } else {
          styles.height = props.height;
        }
        break;
    }
  }
  
  if (props.maxHeight !== undefined) {
    if (typeof props.maxHeight === 'number') {
      styles.maxHeight = `${props.maxHeight}px`;
    } else {
      styles.maxHeight = props.maxHeight;
    }
  }
  
  if (props.minWidth !== undefined) {
    if (typeof props.minWidth === 'number') {
      styles.minWidth = `${props.minWidth}px`;
    } else {
      styles.minWidth = props.minWidth;
    }
  }
  
  if (props.maxWidth !== undefined) {
    if (typeof props.maxWidth === 'number') {
      styles.maxWidth = `${props.maxWidth}px`;
    } else {
      styles.maxWidth = props.maxWidth;
    }
  }
  
  if (props.minHeight !== undefined) {
    if (typeof props.minHeight === 'number') {
      styles.minHeight = `${props.minHeight}px`;
    } else {
      styles.minHeight = props.minHeight;
    }
  }
  
  if (props.overflow !== undefined) {
    styles.overflow = props.overflow;
  }
  
  
  // Gap between items (like Figma's spacing between items)
  // Only apply gap for non-freeform flows
  if (
    props.gap !== undefined &&
    (props.flow === 'horizontal' || props.flow === 'vertical' || props.flow === 'grid' || props.flow === 'curved')
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
        if (props.flow === 'horizontal') {
          styles.justifyContent = 'space-between';
          styles.gap = '0'; // Let space-between handle the distribution
        } else if (props.flow === 'vertical') {
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
        }
        break;
    }
  }
  
  
  // Padding - like Figma's padding controls
  if (props.padding !== undefined) {
    if (typeof props.padding === 'number') {
      styles.padding = `${props.padding}px`;
    } else {
      const { top, right, bottom, left } = props.padding;
      styles.padding = `${top || 0}px ${right || 0}px ${bottom || 0}px ${left || 0}px`;
    }
  }
  
  // Horizontal and vertical padding shortcuts (applied before individual controls)
  if (props.paddingHorizontal !== undefined) {
    const hPadding = typeof props.paddingHorizontal === 'number' ? `${props.paddingHorizontal}px` : props.paddingHorizontal;
    styles.paddingLeft = hPadding;
    styles.paddingRight = hPadding;
  }
  if (props.paddingVertical !== undefined) {
    const vPadding = typeof props.paddingVertical === 'number' ? `${props.paddingVertical}px` : props.paddingVertical;
    styles.paddingTop = vPadding;
    styles.paddingBottom = vPadding;
  }
  
  // Individual padding controls (override shortcuts and general padding)
  if (props.paddingTop !== undefined) {
    styles.paddingTop = typeof props.paddingTop === 'number' ? `${props.paddingTop}px` : props.paddingTop;
  }
  if (props.paddingRight !== undefined) {
    styles.paddingRight = typeof props.paddingRight === 'number' ? `${props.paddingRight}px` : props.paddingRight;
  }
  if (props.paddingBottom !== undefined) {
    styles.paddingBottom = typeof props.paddingBottom === 'number' ? `${props.paddingBottom}px` : props.paddingBottom;
  }
  if (props.paddingLeft !== undefined) {
    styles.paddingLeft = typeof props.paddingLeft === 'number' ? `${props.paddingLeft}px` : props.paddingLeft;
  }
  
  // Wrapping behavior (flex-wrap)
  if (props.wrap && (props.flow === 'horizontal' || props.flow === 'vertical')) {
    styles.flexWrap = props.wrap;
  }
  
  // Clipping content (overflow)
  if (props.clipContent) {
    styles.overflow = 'hidden';
  }
  
  return styles;
};