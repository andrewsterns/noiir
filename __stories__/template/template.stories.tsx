import type { Meta, StoryObj } from '@storybook/react';
import { Template } from '../../__components__/template/template';

const meta: Meta<typeof Template> = {
  title: 'Templates/Dashboard',
  component: Template,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive dashboard template that demonstrates the full Noiir design system with search functionality, filters, buttons, and responsive layout.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Template>;

export const Default: Story = {
  args: {
    title: 'Noiir Dashboard',
    onSearch: (query) => console.log('Search:', query),
    onAction: (action) => console.log('Action:', action),
    onFilter: (filter) => console.log('Filter:', filter),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default dashboard template with search dropdown, filters, action buttons, and sample content cards.',
      },
    },
  },
};

export const ProductCatalog: Story = {
  args: {
    title: 'Product Catalog',
    onSearch: (query) => console.log('Search products:', query),
    onAction: (action) => console.log('Product action:', action),
    onFilter: (filter) => console.log('Product filter:', filter),
  },
  parameters: {
    docs: {
      description: {
        story: 'Product catalog template demonstrating e-commerce style layout with search and filtering.',
      },
    },
  },
};

export const AdminPanel: Story = {
  args: {
    title: 'Admin Control Panel',
    onSearch: (query) => console.log('Search users:', query),
    onAction: (action) => console.log('Admin action:', action),
    onFilter: (filter) => console.log('Admin filter:', filter),
  },
  parameters: {
    docs: {
      description: {
        story: 'Admin panel template for management interfaces with comprehensive controls.',
      },
    },
  },
};

export const DataDashboard: Story = {
  args: {
    title: 'Analytics Dashboard',
    onSearch: (query) => console.log('Search data:', query),
    onAction: (action) => console.log('Analytics action:', action),
    onFilter: (filter) => console.log('Analytics filter:', filter),
  },
  parameters: {
    docs: {
      description: {
        story: 'Data analytics dashboard template with search and filtering capabilities.',
      },
    },
  },
};