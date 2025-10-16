import React, { useState, useRef, useEffect, useCallback } from 'react';
import Frame, { FrameProps } from '../../atoms/frame/Frame';

/**
 * Dropdown menu item props
 */
export interface DropdownMenuItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Whether this item is selected/active */
  selected?: boolean;
  /** Custom props for the item Frame */
  frameProps?: Partial<FrameProps>;
}

/**
 * Dropdown menu item component
 */
export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  onClick,
  disabled = false,
  selected = false,
  frameProps = {}
}) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    onClick?.(event);
  };

  return (
    <Frame
      as="button"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      fill={{
        type: selected ? 'solid' : 'solid',
        color: selected ? 'primary3' : 'transparent'
      }}
      appearance={{ radius: 4 }}
      autoLayout={{
        flow: 'horizontal',
        alignment: 'top',
        width: 'fill-parent',
        height: 40,
        padding: { left: 12, right: 12, top: 8, bottom: 8 }
      }}
      typography={{
        fontSize: 14,
        fontWeight: selected ? 600 : 400,
        color: disabled ? 'neutral6' : selected ? 'primary9' : 'neutral9'
      }}
      onClick={handleClick}
      style={{
        border: 'none',
        outline: 'none',
        textAlign: 'left',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s ease-in-out'
      }}
      {...frameProps}
    >
      {children}
    </Frame>
  );
};

/**
 * Dropdown menu props
 */
export interface DropdownMenuProps {
  /** Menu items */
  children: React.ReactNode;
  /** Whether the menu is open */
  isOpen: boolean;
  /** Position relative to trigger */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** Custom props for the menu Frame */
  frameProps?: Partial<FrameProps>;
}

/**
 * Dropdown menu component
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  isOpen,
  position = 'bottom-left',
  frameProps = {}
}) => {
  // Calculate position styles based on position prop
  const getPositionStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1000,
      minWidth: '200px'
    };

    switch (position) {
      case 'bottom-left':
        return { ...baseStyles, top: '100%', left: 0, marginTop: '4px' };
      case 'bottom-right':
        return { ...baseStyles, top: '100%', right: 0, marginTop: '4px' };
      case 'top-left':
        return { ...baseStyles, bottom: '100%', left: 0, marginBottom: '4px' };
      case 'top-right':
        return { ...baseStyles, bottom: '100%', right: 0, marginBottom: '4px' };
      default:
        return baseStyles;
    }
  };

  return (
    <Frame
      variant={isOpen ? 'open' : 'closed'}
      variants={{
        closed: {
          appearance: { opacity: 0 }
        },
        open: {
          appearance: { opacity: 1 }
        }
      }}
      position={{ x: 0, y: 0 }}
      autoLayout={{
        flow: 'vertical',
        alignment: 'top',
        width: 'hug-contents',
        padding: { top: 8, bottom: 8 }
      }}
      fill={{ type: 'solid', color: 'neutral1' }}
      stroke={{ type: 'solid', color: 'neutral4', weight: 1 }}
      appearance={{ radius: 8 }}
      effects={{
        dropShadow: [{
          x: 0,
          y: 4,
          blur: 8,
          spread: 0,
          color: 'rgba(0, 0, 0, 0.1)'
        }]
      }}
      animation={[
        {
          trigger: 'variantChange',
          animation: 'dissolve',
          curve: 'ease-out',
          duration: 200
        }
      ]}
      style={{
        ...getPositionStyles(),
        transformOrigin: position.startsWith('top') ? 'bottom center' : 'top center'
      }}
      {...frameProps}
    >
      {children}
    </Frame>
  );
};

/**
 * Dropdown trigger props
 */
export interface DropdownTriggerProps {
  /** Trigger content */
  children: React.ReactNode;
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Click handler to toggle dropdown */
  onToggle: () => void;
  /** Custom props for the trigger Frame */
  frameProps?: Partial<FrameProps>;
}

/**
 * Dropdown trigger component
 */
export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  isOpen,
  onToggle,
  frameProps = {}
}) => {
  return (
    <Frame
      variant={isOpen ? 'open' : 'closed'}
      variants={{
        closed: {
          fill: { type: 'solid', color: 'neutral2' }
        },
        open: {
          fill: { type: 'solid', color: 'primary3' }
        }
      }}
      cursor="pointer"
      onClick={onToggle}
      animation={[
        {
          trigger: 'variantChange',
          animation: 'ease',
          duration: 150
        }
      ]}
      appearance={{ radius: 6 }}
      autoLayout={{
        flow: 'horizontal',
        alignment: 'center',
        padding: { left: 12, right: 12, top: 8, bottom: 8 },
        gap: 8
      }}
      stroke={{
        type: 'solid',
        color: isOpen ? 'primary6' : 'neutral4',
        weight: 1
      }}
      style={{
        transition: 'all 0.15s ease-in-out',
        userSelect: 'none'
      }}
      {...frameProps}
    >
      {children}
      <Frame
        variant={isOpen ? 'open' : 'closed'}
        variants={{
          closed: {
            position: { rotation: 0 }
          },
          open: {
            position: { rotation: 180 }
          }
        }}
        as="span"
        typography={{
          fontSize: 12,
          color: isOpen ? 'primary8' : 'neutral7'
        }}
        animation={[
          {
            trigger: 'variantChange',
            animation: 'rotate',
            duration: 200
          }
        ]}
        style={{
          transition: 'transform 0.2s ease-in-out'
        }}
      >
        ▼
      </Frame>
    </Frame>
  );
};

/**
 * Main dropdown props
 */
export interface DropdownProps {
  /** Trigger content */
  trigger: React.ReactNode;
  /** Menu content (DropdownMenuItem components) */
  children: React.ReactNode;
  /** Whether the dropdown is open by default */
  defaultOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Menu position */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** Custom props for trigger Frame */
  triggerProps?: Partial<FrameProps>;
  /** Custom props for menu Frame */
  menuProps?: Partial<FrameProps>;
  /** Close on item click */
  closeOnItemClick?: boolean;
}

/**
 * Dropdown component - Reusable dropdown menu using two Frame components
 * Features cross-frame animations and interactions
 */
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  position = 'bottom-left',
  triggerProps = {},
  menuProps = {},
  closeOnItemClick = true
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use controlled or uncontrolled state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = useCallback((newIsOpen: boolean) => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }
    onOpenChange?.(newIsOpen);
  }, [controlledIsOpen, onOpenChange]);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, setIsOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, setIsOpen]);

  // Handle menu item clicks
  const handleMenuItemClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (closeOnItemClick) {
      setIsOpen(false);
    }
  }, [closeOnItemClick, setIsOpen]);

  // Clone children to add click handlers
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === DropdownMenuItem) {
      return React.cloneElement(child, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          handleMenuItemClick(event);
          child.props.onClick?.(event);
        }
      });
    }
    return child;
  });

  return (
    <div
      ref={dropdownRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <DropdownTrigger
        isOpen={isOpen}
        onToggle={toggleDropdown}
        frameProps={triggerProps}
      >
        {trigger}
      </DropdownTrigger>

      <DropdownMenu
        isOpen={isOpen}
        position={position}
        frameProps={menuProps}
      >
        {enhancedChildren}
      </DropdownMenu>
    </div>
  );
};

// Export all components
export default Dropdown;
