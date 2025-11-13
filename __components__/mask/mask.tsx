import React, { ReactNode } from 'react';
import { PositionProps } from '@noiir/frame-core/position/position.props';
import { AutoLayoutProps } from '@noiir/frame-core/layout/layout.props';
import { convertFramePropsToStyles } from '@noiir/frame-core/utils/utils';

export interface MaskProps {
  children: ReactNode;
  position?: PositionProps;
  autoLayout?: AutoLayoutProps;
  maskPath?: string; // SVG path for custom mask shape
  id?: string; // Optional ID for clipPath
}

/**
 * <Mask> component provides clipping/masking functionality for its children.
 * Can use simple rectangular clipping or custom SVG path shapes.
 */
export const Mask: React.FC<MaskProps> = ({
  children,
  position,
  autoLayout,
  maskPath,
  id
}) => {
  const maskId = id || `mask-${Math.random().toString(36).substr(2, 9)}`;

  // Determine if auto layout is used
  const hasAutoLayout = !!autoLayout && (autoLayout.flow === 'horizontal' || autoLayout.flow === 'vertical' || autoLayout.flow === 'grid');

  // Convert props to CSS styles
  const styles = convertFramePropsToStyles({
    position,
    autoLayout,
  }, hasAutoLayout);

  // Apply masking styles
  const maskStyles: React.CSSProperties = {
    ...styles,
    overflow: 'hidden',
    position: 'relative', // Ensure positioning context
  };

  // If maskPath provided, use clip-path
  if (maskPath) {
    maskStyles.clipPath = `url(#${maskId})`;
  }

  return (
    <>
      {maskPath && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <clipPath id={maskId}>
              <path d={maskPath} />
            </clipPath>
          </defs>
        </svg>
      )}
      <div style={maskStyles}>
        {children}
      </div>
    </>
  );
};