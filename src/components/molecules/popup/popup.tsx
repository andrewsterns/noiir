import React, { useEffect } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { POPUP_VARIANTS } from './popup.variants';

/**
 * Popup Component
 *
 * A popup/modal component built using Frame that displays content in an overlay.
 * Supports different sizes, positioning, and can be triggered by various events.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see POPUP_VARIANTS in popup.variants.tsx for available variants
 */

export interface PopupProps extends FrameProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  variant?: string;
}

export const Popup = React.forwardRef<HTMLDivElement, PopupProps>(({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  variant = 'default',
  variants = POPUP_VARIANTS,
  ...popupProps
}, ref) => {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Frame
      ref={ref}
      variant="overlay"
      variants={variants}
      onClick={handleOverlayClick}
      {...popupProps}
    >
      <Frame
        variant={`${variant}-${size}`}
        variants={variants}
        autoLayout={{ flow: 'vertical', gap: 0 }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <Frame variant="header" variants={variants}>
            {title && (
              <Frame variant="title" variants={variants}>
                {title}
              </Frame>
            )}
            {showCloseButton && (
              <Frame
                as="button"
                variant="close-button"
                variants={variants}
                onClick={onClose}
                aria-label="Close popup"
              >
                ×
              </Frame>
            )}
          </Frame>
        )}

        {/* Content */}
        <Frame variant="content" variants={variants}>
          {children}
        </Frame>
      </Frame>
    </Frame>
  );
});

Popup.displayName = 'Popup';

export default Popup;