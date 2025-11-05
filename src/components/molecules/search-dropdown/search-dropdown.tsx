import React, { useState, useMemo } from 'react';
import { Frame } from '../../frame/Frame';
import { Input, INPUT_VARIANTS } from '../../atoms/input/input';
import { List } from '../../molecules/list/list';
import { SearchIcon } from '../../../theme/icons/search';

/**
 * SearchDropdown Component
 *
 * This component uses Frame internally and should leverage Frame's built-in props as much as possible.
 * Prefer using Frame props (appearance, typography, fill, stroke, effects, cursor, etc.)
 * instead of creating custom props for styling/behavior.
 *
 * For animations and state transitions, use INPUT_VARIANTS and LIST_VARIANTS from the
 * Input and List components with Frame's animate prop instead of handling hover/click states in component logic.
 *
 * Example: animate={{ hover: { variant: 'primaryHover' }, click: { variant: 'primaryActive' } }}
 *
 * This component also uses Input and List components internally.
 *
 * Only add new props if they provide unique functionality not covered by Frame's extensive prop system.
 *
 * @see FrameProps in src/components/frame/Frame.tsx for available props
 * @see InputProps in src/components/atoms/input/input.tsx for Input props
 * @see ListProps in src/components/molecules/list/list.tsx for List props
 * @see INPUT_VARIANTS in input.tsx for available input animation states
 * @see LIST_VARIANTS in list.variants.ts for available list animation states
 */

export type SearchItem = string | { label: string; value?: any; searchableText?: string };

export interface SearchDropdownProps {
  items: SearchItem[];
  selectedIndex?: number;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange?: (selectedIndex: number, item: SearchItem) => void;
  disabled?: boolean;
  buttonSize?: any;
  buttonSizes?: Record<string, any>;
  variant?: string;
  variants?: Record<string, any>;
  inputVariants?: Record<string, any>;
  listVariants?: Record<string, any>;
}

export const SearchDropdown = React.forwardRef<HTMLDivElement, SearchDropdownProps>(({
  items,
  selectedIndex,
  placeholder = "Search and select...",
  searchPlaceholder = "Type to search...",
  onChange,
  disabled = false,
  buttonSize = 'md',
  buttonSizes: customButtonSizes,
  variant = 'default',
  variants: customVariants,
  inputVariants: customInputVariants,
  listVariants: customListVariants,
  ...frameProps
}, ref) => {
  // Merge custom variants with defaults - these would come from default variant files
  const variants = customVariants || {};
  const inputVariants = customInputVariants || INPUT_VARIANTS;
  const listVariants = customListVariants || {};
  const buttonSizes = customButtonSizes || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<number | undefined>(selectedIndex);
  const [isSearching, setIsSearching] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Use controlled selectedIndex if provided, otherwise use internal state
  const currentSelectedIndex = selectedIndex !== undefined ? selectedIndex : internalSelectedIndex;

  const handleInputChange = (value: string) => {
    console.log('SearchDropdown: handleInputChange', value);
    setSearchQuery(value);
    setIsSearching(true);
  };

  const handleInputBlur = () => {
    console.log('SearchDropdown: handleInputBlur called');
    setIsSearching(false);
    setIsActive(false);
  };

  const handleFrameClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('SearchDropdown: handleFrameClick called', event.target, event.currentTarget);
    event.stopPropagation();
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    console.log('SearchDropdown: mouse left frame');
  };

  const handleItemClick = (index: number, item: SearchItem) => {
    if (selectedIndex === undefined) {
      setInternalSelectedIndex(index);
    }
    const displayText = getSearchableText(item);
    setSearchQuery(displayText);
    setIsSearching(false);
    if (onChange) {
      onChange(index, item);
    }
  };

  const getSearchableText = (item: SearchItem): string => {
    if (typeof item === 'string') return item;
    return item.searchableText || item.label;
  };

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(item => {
      const searchableText = getSearchableText(item).toLowerCase();
      return searchableText.includes(query);
    });
  }, [items, searchQuery]);

  return (
    <Frame
      autoLayout={{ flow: 'vertical' }}
      ref={ref}
      onClick={handleFrameClick}
      onMouseLeave={handleMouseLeave}
      tabIndex={-1}
      {...frameProps}
    >
      <Input
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={searchPlaceholder}
        variant={isActive ? 'primaryActive' : 'primary'}
        variants={INPUT_VARIANTS}
      />
      {isSearching && searchQuery.trim() && (
        <List
          items={filteredItems}
          selectedIndex={currentSelectedIndex}
          onItemClick={handleItemClick}
          position={{ x: 0, y: 42 }}
        />
      )}
    </Frame>
  );
});


SearchDropdown.displayName = 'SearchDropdown';

export default SearchDropdown;

