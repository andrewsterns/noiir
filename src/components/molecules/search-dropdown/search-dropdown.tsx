import React, { useState, useMemo } from 'react';
import { Frame } from '../../frame/Frame';
import { InputField } from '../../atoms/input-field/input';

export type SearchItem = string | { label: string; value?: any; searchableText?: string };

export interface SearchDropdownProps {
  items: SearchItem[];
  selectedIndex?: number;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange?: (selectedIndex: number, item: SearchItem) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
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
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<number | undefined>(selectedIndex);

  // Use controlled selectedIndex if provided, otherwise use internal state
  const currentSelectedIndex = selectedIndex !== undefined ? selectedIndex : internalSelectedIndex;

  const handleButtonClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchQuery(''); // Clear search when opening
      }
    }
  };

  const handleItemClick = (index: number, item: SearchItem) => {
    if (selectedIndex === undefined) {
      setInternalSelectedIndex(index);
    }
    setIsOpen(false);
    setSearchQuery('');
    if (onChange) {
      onChange(index, item);
    }
  };

  const getSelectedLabel = (): string => {
    if (currentSelectedIndex !== undefined && items[currentSelectedIndex]) {
      const item = items[currentSelectedIndex];
      return typeof item === 'string' ? item : item.label;
    }
    return placeholder;
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

  const getItemLabel = (item: SearchItem): string => {
    return typeof item === 'string' ? item : item.label;
  };

  return (
    <Frame
      ref={ref}
      autoLayout={{ flow: 'vertical' }}
      {...frameProps}
    >
 <InputField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={searchPlaceholder}
              variant="primaryFocus"
            />

      {isOpen && (
        <Frame
          autoLayout={{ flow: 'vertical' }}
          fill={{ type: 'solid', color: 'gray1' }}
          stroke={{ type: 'solid', color: 'gray4', weight: 1 }}
          appearance={{ radius: 12 }}
          effects={{ dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)' }] }}
        >

           


          {/* Results list */}
          <Frame
            autoLayout={{ flow: 'vertical', paddingVertical: 4, paddingHorizontal: 0, gap: 0 }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const originalIndex = items.indexOf(item);
                const isSelected = currentSelectedIndex === originalIndex;

                return (
                  <Frame
                    key={originalIndex}
                    autoLayout={{ paddingHorizontal: 12, paddingVertical: 8 }}
                    fill={isSelected ? { type: 'solid', color: 'blue6', opacity: 0.1 } : undefined}
                    onClick={() => handleItemClick(originalIndex, item)}
                    onMouseEnter={(e: React.MouseEvent) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-gray3)';
                    }}
                    onMouseLeave={(e: React.MouseEvent) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = isSelected ? 'var(--color-blue6-10)' : 'transparent';
                    }}
                    typography={{
                      fontSize: 14,
                      color: isSelected ? 'blue7' : 'gray7'
                    }}
                  >
                    {getItemLabel(item)}
                  </Frame>
                );
              })
            ) : (
              <Frame
                autoLayout={{ paddingHorizontal: 12, paddingVertical: 16, alignment: 'center' }}
                typography={{
                  fontSize: 14,
                  color: 'gray6',
                  textAlign: 'center'
                }}
              >
                No results found
              </Frame>
            )}
          </Frame>
        </Frame>
      )}
    </Frame>
  );
});

SearchDropdown.displayName = 'SearchDropdown';

export default SearchDropdown;