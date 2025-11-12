// --- Animate + custom event logic demo ---
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../__components__/atoms/button/button';
import { Frame } from '../../../__components__/frame/Frame';
import Text from '../../../__components__/atoms/text/text';

import {
  BUTTON_SOLID_VARIANTS,
  BUTTON_SOFT_VARIANTS,
  BUTTON_SURFACE_VARIANTS,
  BUTTON_GHOST_VARIANTS,
  BUTTON_OUTLINE_VARIANTS
} from '../../../__variants__/atoms/button/button.variants';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button component built using Frame with support for variants, sizes, icons, and hover states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'disabled'],
    },
    size: {
      control: { type: 'select' },
      options: ['1', '2', '3'],
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Animate: Story = {
  args: {
    children: 'Animate Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Test button animations: hover to see primaryHover, mouseLeave to revert to primary.',
      },
    },
  },
};





export const Sizes: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'horizontal', gap: 20, alignment: 'center' }}>
      <Button size="1" variant="primary" >Small</Button>
      <Button size="2" variant="primary">Medium</Button>
      <Button size="3" variant="primary">Large</Button>
    </Frame>  
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with different sizes (1, 2, 3) showing varying padding applied in addition to the primary variant styling.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <Frame autoLayout={{ flow: 'vertical', gap: 32 }}>
      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <h3>Solid Variants</h3>
        <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
          <Button variants={BUTTON_SOLID_VARIANTS} variant="solid">Solid</Button>
          <Button variants={BUTTON_SOLID_VARIANTS} variant="solidHover">Solid Hover</Button>
          <Button variants={BUTTON_SOLID_VARIANTS} variant="solidActive">Solid Active</Button>
        </Frame>
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <h3>Soft Variants</h3>
        <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
          <Button variants={BUTTON_SOFT_VARIANTS} variant="soft">Soft</Button>
          <Button variants={BUTTON_SOFT_VARIANTS} variant="softHover">Soft Hover</Button>
          <Button variants={BUTTON_SOFT_VARIANTS} variant="softActive">Soft Active</Button>
        </Frame>
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <h3>Surface Variants</h3>
        <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
          <Button variants={BUTTON_SURFACE_VARIANTS} variant="surface">Surface</Button>
          <Button variants={BUTTON_SURFACE_VARIANTS} variant="surfaceHover">Surface Hover</Button>
          <Button variants={BUTTON_SURFACE_VARIANTS} variant="surfaceActive">Surface Active</Button>
        </Frame>
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <h3>Ghost Variants</h3>
        <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
          <Button variants={BUTTON_GHOST_VARIANTS} variant="ghost">Ghost</Button>
          <Button variants={BUTTON_GHOST_VARIANTS} variant="ghostHover">Ghost Hover</Button>
          <Button variants={BUTTON_GHOST_VARIANTS} variant="ghostActive">Ghost Active</Button>
        </Frame>
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <h3>Outline Variants</h3>
        <Frame autoLayout={{ flow: 'horizontal', gap: 16, alignment: 'center' }}>
          <Button variants={BUTTON_OUTLINE_VARIANTS} variant="outline">Outline</Button>
          <Button variants={BUTTON_OUTLINE_VARIANTS} variant="outlineHover">Outline Hover</Button>
          <Button variants={BUTTON_OUTLINE_VARIANTS} variant="outlineActive">Outline Active</Button>
        </Frame>
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all button variant types: solid, soft, surface, ghost, and outline, each with their base, hover, and active states.',
      },
    },
  },
};