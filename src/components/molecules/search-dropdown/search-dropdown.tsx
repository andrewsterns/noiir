import React, { useState, useMemo } from 'react';
import { Frame } from '../../frame/Frame';
import { InputField } from '../../atoms/input-field/input';
import { List } from '../../molecules/list/list';
import { SEARCH_VARIANTS } from './search-dropdown.varaint';
import { SearchIcon } from '../../../theme/icons/search';
import { INPUT_SIZES } from '../../atoms/input-field/input.variants';

export type SearchItem = string | { label: string; value?: any; searchableText?: string };

export interface SearchDropdownProps {
  items: SearchItem[];
  selectedIndex?: number;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange?: (selectedIndex: number, item: SearchItem) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'fill';
  buttonSize?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'minimal' | 'glass';
}

export const SearchDropdown = React.forwardRef<HTMLDivElement, SearchDropdownProps>(({
  items,
  selectedIndex,
  placeholder = "Search and select...",
  searchPlaceholder = "Type to search...",
  onChange,
  disabled = false,
  size = 'md',
  buttonSize = 'md',
  variant = 'default',
  ...frameProps
}, ref) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<number | undefined>(selectedIndex);
  const [isSearching, setIsSearching] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    if (inputRef.current) {
      console.log('SearchDropdown: focusing input');
      inputRef.current.focus();
    }
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
    // Blur the input to return to primary variant
    if (inputRef.current) {
      inputRef.current.blur();
    }
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
      sizes={INPUT_SIZES}
      ref={ref}
      onClick={handleFrameClick}
      onMouseLeave={handleMouseLeave}
      animate={undefined}
      tabIndex={-1}
      {...frameProps}
    >
      <InputField
        ref={inputRef}
        size={size}
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={searchPlaceholder}
        variant={isActive ? 'primaryActive' : 'primary'}
        variants={SEARCH_VARIANTS}
      />
      {isSearching && searchQuery.trim() && (
        <List
          size='md'
          sizes={INPUT_SIZES}
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