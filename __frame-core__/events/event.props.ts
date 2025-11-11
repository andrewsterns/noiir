import React from 'react';

// ALL EVENT RELATED PROPS AND HANDLERS SHOULD GO IN THIS FILE

export interface EventProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  onInput?: (event: React.FormEvent<HTMLElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  contentEditable?: boolean;
  suppressContentEditableWarning?: boolean;
}
