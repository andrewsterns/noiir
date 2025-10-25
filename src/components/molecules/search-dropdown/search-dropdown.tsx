import React, { useState, useMemo } from 'react';
import { Frame } from '../../frame/Frame';
import { Button } from '../../atoms/button/button';
import { Label } from '../../atoms/label/label';

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
      <Frame
        variant={disabled ? 'disabled' : 'secondary'}
        size={buttonSize}
        onClick={handleButtonClick}
        fill={{type: 'linear-gradient', stops: [{color: '#ffffff', position: 0}, {color: 'gray2', position: 1}], angle: 6}}
      >
        {getSelectedLabel()} <span style={{ float: 'right', marginLeft: 8 }}>{isOpen ? '▲' : '▼'}</span>
      </Frame>

      {isOpen && (
        <Frame
          autoLayout={{ flow: 'vertical' }}
          fill={{ type: 'solid', color: 'gray1' }}
          stroke={{ type: 'solid', color: 'gray4', weight: 1 }}
          appearance={{ radius: 12 }}
          effects={{ dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)' }] }}
          style={{
            maxHeight: size === 'sm' ? 160 : size === 'md' ? 200 : 280,
            width: '100%',
            overflow: 'hidden'
          }}
        >
          {/* Search input */}
          <Frame
            autoLayout={{ paddingHorizontal: 12, paddingVertical: 8 }}
            fill={{ type: 'solid', color: 'gray2' }}
            stroke={{ type: 'solid', color: 'gray5', weight: 1 }}
            appearance={{ radiusTopLeft: 12, radiusTopRight: 12 }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '14px',
                color: 'var(--color-gray7)'
              }}
            />
          </Frame>

          {/* Results list */}
          <Frame
            autoLayout={{ flow: 'vertical', paddingVertical: 4, paddingHorizontal: 0, gap: 0 }}
            style={{
              maxHeight: size === 'sm' ? 120 : size === 'md' ? 160 : 240,
              overflow: 'auto'
            }}
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
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e: React.MouseEvent) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-gray3)';
                    }}
                    onMouseLeave={(e: React.MouseEvent) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = isSelected ? 'var(--color-blue6-10)' : 'transparent';
                    }}
                  >
                    <Label
                      variant={isSelected ? 'primary-active' : 'primary'}
                      typography={{
                        fontSize: 14,
                        color: isSelected ? 'blue7' : 'gray7'
                      }}
                    >
                      {getItemLabel(item)}
                    </Label>
                  </Frame>
                );
              })
            ) : (
              <Frame
                autoLayout={{ paddingHorizontal: 12, paddingVertical: 16, alignment: 'center' }}
              >
                <Label
                  variant="primary"
                  typography={{
                    fontSize: 14,
                    color: 'gray6',
                    textAlign: 'center'
                  }}
                >
                  No results found
                </Label>
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