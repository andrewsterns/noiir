import React, { useState, useRef, useEffect } from 'react';
import { Frame, FrameProps } from '../../frame/Frame';
import { Button } from '../../atoms/button/button';
import { Card } from '../card/card';
import { BUTTON_VARIANTS } from '../../../../__variants__/atoms/button/button.variants';
import { CARD_VARIANTS } from '../card/card';

/**
 * Dialog Component
 *
 * This component extends Frame and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * This component also uses Button and Card components internally, so their props are also available.
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see ButtonProps in src/components/atoms/button/button.tsx for Button props
 * @see CardProps in src/components/molecules/card/card.tsx for Card props
 */

interface DialogProps extends FrameProps {
  open?: boolean;
  children: React.ReactNode;
  buttonVariants?: Record<string, any>;
  cardVariants?: Record<string, any>;
  variants?: Record<string, any>;
}

const DIALOG_BUTTON_VARIANTS = {
  ...BUTTON_VARIANTS,
};

const DIALOG_CARD_VARIANTS = {
  ...CARD_VARIANTS,
  primary: {
    fill: { type: 'solid' as const, color: 'white1' },
    stroke: { type: 'solid' as const, color: 'gray3', weight: 1 },
    appearance: { radius: 12 },
    effects: { dropShadow: [{ x: 0, y: 4, blur: 12, color: 'rgba(0, 0, 0, 0.1)' }] },
  },
  primaryHover: {
    fill: { type: 'solid' as const, color: 'gray1' },
    stroke: { type: 'solid' as const, color: 'gray4', weight: 1 },
    appearance: { radius: 12 },
    effects: { dropShadow: [{ x: 0, y: 8, blur: 24, color: 'rgba(0, 0, 0, 0.15)' }] }
  },
  hidden: {
    display: 'none',
  }
};

export const Dialog = ({ open = false, children, buttonVariants: customButtonVariants, cardVariants: customCardVariants, ...props }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const buttonVariants = customButtonVariants || DIALOG_BUTTON_VARIANTS;
  const cardVariants = customCardVariants || DIALOG_CARD_VARIANTS;

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  const handleFrameClick = (event: React.MouseEvent<HTMLElement>) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const cardVariant = isOpen ? 'primary' : 'hidden';

  useEffect(() => {
    if (isOpen && cardRef.current) {
      // Delay focus to ensure the element is visible
      setTimeout(() => {
        cardRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  return (
    <Frame autoLayout={{ flow: 'vertical', gap: 16, paddingHorizontal: 20, paddingVertical: 20 }} onClick={handleFrameClick} {...props}>
      <Button
        variant="primary"
        variants={buttonVariants}
        onClick={handleButtonClick}
      >
        Open Dialog
      </Button>
      <Card
        ref={cardRef}
        variant={cardVariant}
        variants={cardVariants}
        tabIndex={0}
        onBlur={() => setIsOpen(false)}
      >
        <Button
          variant="primary"
          variants={buttonVariants}
          onClick={handleCloseClick}
        >
          Close
        </Button>
        {children}
      </Card>
    </Frame>
  );
};

