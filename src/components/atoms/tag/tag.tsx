import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { TAG_VARIANTS, TagVariant, TagAction } from './tag.variants';

export interface TagProps extends Omit<FrameProps, 'onClick'> {
  variant?: TagVariant;
  action?: TagAction;
  children: React.ReactNode;
  onAction?: () => void;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(({
  variant = 'default',
  action,
  children,
  onAction,
  ...frameProps
}, ref) => {
  const variantConfig = TAG_VARIANTS[variant];

  const actionSymbol = action === 'add' ? '+' : action === 'remove' ? '−' : null;

  const handleClick = (e: React.MouseEvent) => {
    if (action && onAction) {
      e.stopPropagation();
      onAction();
    }
  };

  return (
    <Frame
      ref={ref}
      autoLayout={{
        flow: 'horizontal',
        alignment: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        gap: 6
      }}
      fill={variantConfig.fill}
      stroke={variantConfig.stroke}
      appearance={variantConfig.appearance}
      typography={variantConfig.typography}
      effects={variantConfig.effects}
      cursor={action ? 'pointer' : 'default'}
      onClick={handleClick}
      {...frameProps}
    >
      {children}
      {actionSymbol && (
        <Frame
          typography={{
            ...variantConfig.typography,
            fontSize: 16,
            fontWeight: 600
          }}
        >
          {actionSymbol}
        </Frame>
      )}
    </Frame>
  );
});

Tag.displayName = 'Tag';

export default Tag;