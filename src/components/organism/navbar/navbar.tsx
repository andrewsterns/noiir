import React, { useState } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { NAVBAR_VARIANTS } from './navbar.variants';
import { Menu, MenuItem } from '../../molecules/menu/menu';

/**
 * Navbar Component
 *
 * A navigation bar component built using Frame that provides a complete navigation solution.
 * Includes logo, menu, and action buttons with responsive behavior.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see NAVBAR_VARIANTS in navbar.variants.tsx for available variants
 */

export interface NavbarProps extends FrameProps {
  logo?: React.ReactNode;
  menuItems?: MenuItem[];
  actions?: React.ReactNode[];
  variant?: string;
  sticky?: boolean;
  transparent?: boolean;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(({
  logo,
  menuItems = [],
  actions = [],
  variant = 'default',
  variants = NAVBAR_VARIANTS,
  sticky = false,
  transparent = false,
  ...navbarProps
}, ref) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Frame
      ref={ref}
      variant={transparent ? 'transparent' : variant}
      variants={variants}
      position={sticky ? { y: 0 } : undefined}
      {...navbarProps}
    >
      <Frame variant="container" variants={variants}>
        {/* Logo */}
        {logo && (
          <Frame variant="logo" variants={variants}>
            {logo}
          </Frame>
        )}

        {/* Desktop Menu */}
        <Frame variant="desktop-menu" variants={variants}>
          <Menu
            orientation="horizontal"
            items={menuItems}
            variant="navbar-menu"
            variants={variants}
          />
        </Frame>

        {/* Actions */}
        {actions.length > 0 && (
          <Frame variant="actions" variants={variants}>
            {actions.map((action, index) => (
              <Frame key={index} variant="action-item" variants={variants}>
                {action}
              </Frame>
            ))}
          </Frame>
        )}

        {/* Mobile Menu Toggle */}
        <Frame variant="mobile-toggle" variants={variants}>
          <Frame
            as="button"
            variant="hamburger"
            variants={variants}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Frame variant="hamburger-line" variants={variants} />
            <Frame variant="hamburger-line" variants={variants} />
            <Frame variant="hamburger-line" variants={variants} />
          </Frame>
        </Frame>
      </Frame>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <Frame variant="mobile-menu" variants={variants}>
          <Menu
            orientation="vertical"
            items={menuItems}
            variant="mobile-menu-items"
            variants={variants}
          />
          {actions.length > 0 && (
            <Frame variant="mobile-actions" variants={variants}>
              {actions.map((action, index) => (
                <Frame key={index} variant="mobile-action-item" variants={variants}>
                  {action}
                </Frame>
              ))}
            </Frame>
          )}
        </Frame>
      )}
    </Frame>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;