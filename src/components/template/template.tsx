import React, { useState } from 'react';
import { Frame } from '../frame/Frame';
import { Button } from '../atoms/button/button';
import { Label } from '../atoms/label/label';
import { SearchDropdown } from '../molecules/search-dropdown/search-dropdown';

export interface TemplateProps {
  title?: string;
  onSearch?: (query: string) => void;
  onAction?: (action: string) => void;
  onFilter?: (filter: string) => void;
}

export const Template = React.forwardRef<HTMLDivElement, TemplateProps>(({
  title = "Dashboard Template",
  onSearch,
  onAction,
  onFilter,
  ...frameProps
}, ref) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>();

  const categories = [
    'All Items',
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Automotive'
  ];

  const filters = [
    'Most Popular',
    'Newest First',
    'Price: Low to High',
    'Price: High to Low',
    'Rating: High to Low',
    'Best Sellers'
  ];

  const handleCategoryChange = (index: number, item: string | { label: string; value?: any; searchableText?: string }) => {
    const category = typeof item === 'string' ? item : item.label;
    setSelectedCategory(category);
    if (onFilter) {
      onFilter(`category:${category}`);
    }
  };

  const handleFilterChange = (index: number, item: string | { label: string; value?: any; searchableText?: string }) => {
    const filter = typeof item === 'string' ? item : item.label;
    setSelectedFilter(filter);
    if (onFilter) {
      onFilter(`sort:${filter}`);
    }
  };

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <Frame
      ref={ref}
      autoLayout={{ flow: 'vertical', gap: 24, padding: 24 }}
      fill={{ type: 'solid', color: 'gray1' }}
      style={{ minHeight: '100vh' }}
      {...frameProps}
    >
      {/* Header Section */}
      <Frame
        autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}
      >
        <Frame
          autoLayout={{ alignment: 'center' }}
        >
          <Label
            variant="primary"
            typography={{
              fontSize: 32,
              fontWeight: 600,
              color: 'gray8',
              textAlign: 'center'
            }}
          >
            {title}
          </Label>
        </Frame>

        {/* Search and Filters Row */}
        <Frame
          autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}
          style={{ flexWrap: 'wrap' }}
        >
          {/* Search Dropdown */}
          <Frame style={{ flex: 1, minWidth: '200px' }}>
            <SearchDropdown
              items={categories}
              placeholder="Search categories..."
              searchPlaceholder="Type to search categories..."
              onChange={handleCategoryChange}
              size="md"
              buttonSize="md"
            />
          </Frame>

          {/* Filter Dropdown */}
          <SearchDropdown
            items={filters}
            placeholder="Sort by..."
            searchPlaceholder="Type to search filters..."
            onChange={handleFilterChange}
            size="md"
            buttonSize="md"
          />

          {/* Action Buttons */}
          <Frame
            autoLayout={{ flow: 'horizontal', gap: 8 }}
          >
            <Button
              variant="primary"
              size="md"
              onClick={() => onAction && onAction('refresh')}
            >
              Refresh
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onAction && onAction('export')}
            >
              Export
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onAction && onAction('settings')}
              iconEnd="⚙️"
            >
              Settings
            </Button>
          </Frame>
        </Frame>
      </Frame>

      {/* Content Area */}
      <Frame
        autoLayout={{ flow: 'vertical', gap: 16 }}
        style={{ flex: 1 }}
      >
        {/* Status Bar */}
        <Frame
          autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center', paddingVertical: 12, paddingHorizontal: 16 }}
          fill={{ type: 'solid', color: 'gray2' }}
          stroke={{ type: 'solid', color: 'gray4', weight: 1 }}
          appearance={{ radius: 8 }}
        >
          <Label
            variant="primary"
            typography={{
              fontSize: 14,
              color: 'gray7'
            }}
          >
            {selectedCategory ? `Category: ${selectedCategory}` : 'All Categories'}
          </Label>
          <Label
            variant="primary"
            typography={{
              fontSize: 14,
              color: 'gray7'
            }}
          >
            {selectedFilter ? `Sort: ${selectedFilter}` : 'Default Sort'}
          </Label>
          <Frame style={{ flex: 1 }} />
          <Label
            variant="primary"
            typography={{
              fontSize: 14,
              color: 'gray6'
            }}
          >
            1,234 items found
          </Label>
        </Frame>

        {/* Main Content Grid */}
        <Frame
          autoLayout={{ flow: 'grid', gap: 16 }}
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
          }}
        >
          {/* Sample Content Cards */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Frame
              key={item}
              autoLayout={{ flow: 'vertical', gap: 12, padding: 16 }}
              fill={{ type: 'solid', color: 'black1' }}
              stroke={{ type: 'solid', color: 'gray4', weight: 1 }}
              appearance={{ radius: 12 }}
              effects={{ dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)' }] }}
            >
              <Frame
                autoLayout={{ alignment: 'center', paddingVertical: 8 }}
                fill={{ type: 'solid', color: 'blue6', opacity: 0.1 }}
                appearance={{ radius: 8 }}
              >
                <Label
                  variant="primary"
                  typography={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'blue7'
                  }}
                >
                  Item {item}
                </Label>
              </Frame>

              <Label
                variant="primary"
                typography={{
                  fontSize: 14,
                  color: 'gray7',
                  lineHeight: 1.5
                }}
              >
                This is a sample item description that demonstrates how content would look in our template system.
              </Label>

              <Frame
                autoLayout={{ flow: 'horizontal', gap: 8, alignment: 'center' }}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAction && onAction(`view-${item}`)}
                >
                  View
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onAction && onAction(`edit-${item}`)}
                >
                  Edit
                </Button>
                <Frame style={{ flex: 1 }} />
                <Label
                  variant="primary"
                  typography={{
                    fontSize: 12,
                    color: 'gray6'
                  }}
                >
                  $29.99
                </Label>
              </Frame>
            </Frame>
          ))}
        </Frame>
      </Frame>

      {/* Footer */}
      <Frame
        autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center', paddingVertical: 16 }}
        fill={{ type: 'solid', color: 'gray2' }}
        stroke={{ type: 'solid', color: 'gray4', weight: 1 }}
        appearance={{ radius: 8 }}
      >
        <Label
          variant="primary"
          typography={{
            fontSize: 14,
            color: 'gray6'
          }}
        >
          © 2025 Noiir Design System
        </Label>
        <Frame style={{ flex: 1 }} />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAction && onAction('help')}
        >
          Help
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAction && onAction('feedback')}
        >
          Feedback
        </Button>
      </Frame>
    </Frame>
  );
});

Template.displayName = 'Template';

export default Template;