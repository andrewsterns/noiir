import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './tag';
import { Frame } from '../../frame/Frame';
import { useState } from 'react';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tag component with different color variants and optional add/remove actions.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info']
    },
    action: {
      control: { type: 'select' },
      options: [undefined, 'add', 'remove']
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default Tag'
  }
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Tag'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Tag'
  }
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Tag'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Tag'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Tag'
  }
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info Tag'
  }
};

export const WithAddAction: Story = {
  args: {
    variant: 'primary',
    action: 'add',
    children: 'Add Tag',
    onAction: () => console.log('Add action clicked')
  }
};

export const WithRemoveAction: Story = {
  args: {
    variant: 'danger',
    action: 'remove',
    children: 'Remove Tag',
    onAction: () => console.log('Remove action clicked')
  }
};

export const InteractiveTags: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: 1, text: 'React', variant: 'primary' as const },
      { id: 2, text: 'TypeScript', variant: 'info' as const },
      { id: 3, text: 'JavaScript', variant: 'warning' as const }
    ]);

    const addTag = () => {
      const newTag = {
        id: Date.now(),
        text: `Tag ${tags.length + 1}`,
        variant: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'][Math.floor(Math.random() * 7)] as any
      };
      setTags([...tags, newTag]);
    };

    const removeTag = (id: number) => {
      setTags(tags.filter(tag => tag.id !== id));
    };

    return (
      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <Frame autoLayout={{ flow: 'horizontal', gap: 8, wrap: 'wrap' }}>
          {tags.map(tag => (
            <Tag
              key={tag.id}
              variant={tag.variant}
              action="remove"
              onAction={() => removeTag(tag.id)}
            >
              {tag.text}
            </Tag>
          ))}
        </Frame>

        <Tag
          variant="success"
          action="add"
          onAction={addTag}
        >
          Add New Tag
        </Tag>
      </Frame>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing tags with add/remove functionality.'
      }
    }
  }
};

export const AllVariants: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 12 }}>
      <Frame autoLayout={{ flow: 'horizontal', gap: 8, wrap: 'wrap' }}>
        <Tag variant="default">Default</Tag>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="secondary">Secondary</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="danger">Danger</Tag>
        <Tag variant="info">Info</Tag>
      </Frame>

      <Frame autoLayout={{ flow: 'horizontal', gap: 8, wrap: 'wrap' }}>
        <Tag variant="default" action="add">Default +</Tag>
        <Tag variant="primary" action="add">Primary +</Tag>
        <Tag variant="secondary" action="remove">Secondary −</Tag>
        <Tag variant="success" action="remove">Success −</Tag>
        <Tag variant="warning" action="add">Warning +</Tag>
        <Tag variant="danger" action="remove">Danger −</Tag>
        <Tag variant="info" action="add">Info +</Tag>
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All tag variants displayed together, with and without actions.'
      }
    }
  }
};