import React from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { MENU_VARIANTS } from '../../../../__variants__/molecules/menu/menu.variants';

/**
 * Menu Component
 *
 * A menu component built using Frame that displays a list of menu items.
 * Supports different layouts and can be used for navigation or dropdowns.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see MENU_VARIANTS in menu.variants.tsx for available variants
 */

export interface MenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  children?: MenuItem[];
}

export interface MenuProps extends FrameProps {
  items: MenuItem[];
  variant?: string;
  variants?: Record<string, any>;
  orientation?: 'horizontal' | 'vertical';
  onItemClick?: (item: MenuItem) => void;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(({
  items,
  variant = 'default',
  variants: customVariants,
  orientation = 'vertical',
  onItemClick,
  ...menuProps
}, ref) => {
  const variants = customVariants || MENU_VARIANTS;
  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled) {
      item.onClick?.();
      onItemClick?.(item);
    }
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const itemVariant = item.disabled ? 'item-disabled' : 'item-default';

    const itemContent = (
      <Frame
        variant={itemVariant}
        variants={variants}
        onClick={() => handleItemClick(item)}
        cursor={item.disabled ? 'not-allowed' : 'pointer'}
        autoLayout={{ flow: 'horizontal', alignment: 'center', gap: 8 }}
      >
        {item.icon && (
          <Frame variant="icon" variants={variants}>
            {item.icon}
          </Frame>
        )}
        <Frame variant="label" variants={variants}>
          {item.label}
        </Frame>
      </Frame>
    );

    if (item.href) {
      return React.createElement('a', {
        key: item.id,
        href: item.href,
        style: { textDecoration: 'none' },
        onClick: (e: React.MouseEvent) => {
          if (!item.disabled) {
            item.onClick?.();
            onItemClick?.(item);
          }
        }
      }, itemContent);
    }

    return (
      <Frame key={item.id} variant="item-container" variants={variants}>
        {itemContent}
      </Frame>
    );
  };

  return (
    <Frame
      ref={ref}
      variant={variant}
      variants={variants}
      autoLayout={{
        flow: orientation === 'horizontal' ? 'horizontal' : 'vertical',
        gap: 0,
      }}
      {...menuProps}
    >
      {items.map(renderMenuItem)}
    </Frame>
  );
});

Menu.displayName = 'Menu';

export default Menu;