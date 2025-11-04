import React, { useState } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { NAVBAR_VARIANTS } from './navbar.variants';
import Button from '../../atoms/button/button';
import { Dropdown } from '../../molecules/dropdown/dropdown';

/**
 * Navbar Component
 *
 * A navigation bar component built using Frame with transition-based interactions.
 * Similar to Radix UI patterns with dropdown menus and responsive behavior.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see NAVBAR_VARIANTS in navbar.variants.tsx for available variants
 */

export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  items?: NavItem[]; // Submenu items for dropdown
}

export interface NavbarProps extends Omit<FrameProps, 'position'> {
  logo?: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode[];
  variant?: string;
  position?: 'fixed' | 'relative';
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(({
  logo,
  items = [],
  actions = [],
  variant = 'default',
  variants = NAVBAR_VARIANTS,
  position = 'relative',
  ...navbarProps
}, ref) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdownChange = (itemIndex: number, selectedIndex: number, selectedItem: any) => {
    // Handle dropdown selection
    if (selectedItem.onClick) {
      selectedItem.onClick();
    }
  };

  return (
    <Frame
      ref={ref}
      variant={variant}
      variants={variants}
      position={position ? { type: position } : undefined}
      zIndex={position === 'fixed' ? 100 : undefined}
      transitions={[]}
      {...navbarProps}
    >
      {/* Desktop Layout */}
      <Frame 
      variant="container" 
      variants={variants}>
        {/* Logo */}
        {logo && (
          <Frame variant="logo" 
          variants={variants}>
            {logo}
          </Frame>
        )}

        {/* Desktop Nav Items */}
        <Frame variant="nav-items" variants={variants}>
          {items.map((item, index) => (
            <Frame 
            key={index} 
            variant="nav-item-wrapper" 
            variants={variants}>
              {item.items && item.items.length > 0 ? (
                // Dropdown item using Dropdown component
                <Dropdown
                  items={item.items}
                  placeholder={item.label}
                  onChange={(selectedIndex, selectedItem) => handleDropdownChange(index, selectedIndex, selectedItem)}
                  size='2'
                  buttonSize="2"
                  listSize='1'
                  id={`nav-dropdown-${index}`}
                />
              ) : (
                // Regular item
                <Button
                  id={`nav-item-${index}`}
                  variant="navItem"
                  variants={variants}
                  onClick={item.onClick}
                  transitions={[
                    { event: 'mouseEnter', toVariant: 'navItemHover', sourceId: `nav-item-${index}` },
                    { event: 'mouseLeave', toVariant: 'navItem', sourceId: `nav-item-${index}` },
                  ]}
                >
                  {item.label}
                </Button>
              )}
            </Frame>
          ))}
        </Frame>

        {/* Actions */}
        {actions.length > 0 && (
          <Frame variant="actions" variants={variants}>
            {actions.map((action, index) => (
              <Frame key={index}>{action}</Frame>
            ))}
          </Frame>
        )}

        {/* Mobile Menu Toggle */}
        <Button
          id="mobile-toggle"
          variant="mobileToggle"
          variants={variants}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          transitions={[
            { event: 'click', toVariant: mobileMenuOpen ? 'mobileToggle' : 'mobileToggleOpen' },
          ]}
        >
          <Frame variant="hamburger" variants={variants}>
            <Frame variant="hamburger-line" variants={variants} />
            <Frame variant="hamburger-line" variants={variants} />
            <Frame variant="hamburger-line" variants={variants} />
          </Frame>
        </Button>
      </Frame>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <Frame variant="mobile-menu" variants={variants}>
          {items.map((item, index) => (
            <Frame key={index} variant="mobile-item-wrapper" variants={variants}>
              {item.items && item.items.length > 0 ? (
                // Mobile dropdown using Dropdown component
                <Dropdown
                  items={item.items}
                  placeholder={item.label}
                  onChange={(selectedIndex, selectedItem) => {
                    handleDropdownChange(index, selectedIndex, selectedItem);
                    setMobileMenuOpen(false);
                  }}
                  buttonSize="fill"
                  id={`mobile-dropdown-${index}`}
                />
              ) : (
                // Regular mobile item
                <Button
                  id={`mobile-item-${index}`}
                  variant="mobileItem"
                  variants={variants}
                  onClick={() => {
                    item.onClick?.();
                    setMobileMenuOpen(false);
                  }}
                  transitions={[
                    { event: 'mouseEnter', toVariant: 'mobileItemHover', sourceId: `mobile-item-${index}` },
                    { event: 'mouseLeave', toVariant: 'mobileItem', sourceId: `mobile-item-${index}` },
                  ]}
                >
                  {item.label}
                </Button>
              )}
            </Frame>
          ))}
          {actions.length > 0 && (
            <Frame variant="mobile-actions" variants={variants}>
              {actions}
            </Frame>
          )}
        </Frame>
      )}
    </Frame>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;