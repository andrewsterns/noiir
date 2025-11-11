import type { Meta, StoryObj } from '@storybook/react';
import Text, { H1, H2, H3, H4, H5, H6, Body, Body1, Body2, Label, Caption, Overline, Display, Code } from '../../../__components__/atoms/text/text';
import { textVariants } from '../../../__variants__/atoms/text/text.variants';
import { Frame } from '../../../__components__/frame/Frame';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Text component - A specialized Frame component for typography with preset variants for headings, body text, labels, and more.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(textVariants),
      description: 'Typography preset variant',
      table: { category: 'Variant' }
    },
    as: {
      control: { type: 'select' },
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'code', 'pre'],
      description: 'HTML element to render',
      table: { category: 'Element' }
    },
    children: {
      control: { type: 'text' },
      description: 'Text content',
      table: { category: 'Content' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    variant: 'body',
    children: 'Default text using body variant'
  }
};

export const AllVariants: Story = {
  name: 'All Typography Variants',
  render: () => (
    <Frame
      autoLayout={{
        flow: 'vertical',
        gap: 24,
        padding: 32
      }}
      fill={{ type: 'solid', color: 'white1' }}
      appearance={{ radius: 12 }}
    >
      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <Text variant="overline" fill={{ type: 'solid', color: 'gray7' }}>
          Headings
        </Text>
        <Text variant="h1">Heading 1 - Display Large</Text>
        <Text variant="h2">Heading 2 - Display Medium</Text>
        <Text variant="h3">Heading 3 - Display Small</Text>
        <Text variant="h4">Heading 4 - Title Large</Text>
        <Text variant="h5">Heading 5 - Title Medium</Text>
        <Text variant="h6">Heading 6 - Title Small</Text>
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <Text variant="overline" fill={{ type: 'solid', color: 'gray7' }}>
          Body Text
        </Text>
        <Text variant="body">
          Body - Regular weight text for general content. This is the default text style.
        </Text>
        <Text variant="body1">
          Body1 - Bold weight text for emphasis within body content.
        </Text>
        <Text variant="body2">
          Body2 - Alternative body text with different weight and spacing.
        </Text>
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <Text variant="overline" fill={{ type: 'solid', color: 'gray7' }}>
          UI Text
        </Text>
        <Text variant="label">Label - Uppercase UI Labels</Text>
        <Text variant="caption">Caption - Small descriptive text</Text>
        <Text variant="overline">Overline - Small uppercase headers</Text>
      </Frame>

      <Frame autoLayout={{ flow: 'vertical', gap: 16 }}>
        <Text variant="overline" fill={{ type: 'solid', color: 'gray7' }}>
          Special Variants
        </Text>
        <Text variant="display">Display - Hero Headlines</Text>
        <Text variant="code" as="code">
          code - Monospace text for code snippets
        </Text>
      </Frame>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available typography variants. Each variant has preset font family, weight, size, line height, and letter spacing.'
      }
    }
  }
};

export const CustomColors: Story = {
  name: 'Text with Custom Colors',
  render: () => (
    <Frame
      autoLayout={{ flow: 'vertical', gap: 16, padding: 32 }}
      fill={{ type: 'solid', color: 'neutral2' }}
      appearance={{ radius: 12 }}
    >
      <Text variant="h3" fill={{ type: 'solid', color: 'primary7' }}>
        Primary Color Heading
      </Text>
      <Text variant="body" fill={{ type: 'solid', color: 'white1' }}>
        White text on dark background for contrast
      </Text>
      <Text variant="h4" fill={{ type: 'solid', color: 'success6' }}>
        Success Color Heading
      </Text>
      <Text variant="body1" fill={{ type: 'solid', color: 'warning7' }}>
        Warning colored bold text
      </Text>
      <Text variant="caption" fill={{ type: 'solid', color: 'gray5' }}>
        Muted caption text
      </Text>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text component with custom fill colors using the theme color system.'
      }
    }
  }
};

export const GradientText: Story = {
  name: 'Gradient Text',
  render: () => (
    <Frame
      autoLayout={{ flow: 'vertical', gap: 24, padding: 32 }}
      fill={{ type: 'solid', color: 'neutral2' }}
      appearance={{ radius: 12 }}
    >
      <Text
        variant="display"
        fill={{
          type: 'linear-gradient',
          angle: 90,
          stops: [
            { color: 'primary6', position: 0 },
            { color: 'accent6', position: 1 }
          ]
        }}
      >
        Gradient Display Text
      </Text>
      <Text
        variant="h1"
        fill={{
          type: 'linear-gradient',
          angle: 45,
          stops: [
            { color: '#FF6B6B', position: 0 },
            { color: '#4ECDC4', position: 0.5 },
            { color: '#45B7D1', position: 1 }
          ]
        }}
      >
        Multi-Color Gradient
      </Text>
      <Text
        variant="h2"
        fill={{
          type: 'radial-gradient',
          stops: [
            { color: 'warning6', position: 0 },
            { color: 'error6', position: 1 }
          ]
        }}
      >
        Radial Gradient Text
      </Text>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text with gradient fills - linear, radial, and multi-stop gradients.'
      }
    }
  }
};

export const TextWithEffects: Story = {
  name: 'Text with Effects',
  render: () => (
    <Frame
      autoLayout={{ flow: 'vertical', gap: 32, padding: 40 }}
      fill={{ type: 'solid', color: 'neutral1' }}
      appearance={{ radius: 12 }}
    >
      <Text
        variant="h1"
        fill={{ type: 'solid', color: 'primary7' }}
        effects={{
          dropShadow: [
            { x: 0, y: 4, blur: 8, color: 'rgba(59, 130, 246, 0.3)' }
          ]
        }}
      >
        Text with Shadow
      </Text>
      <Text
        variant="display"
        fill={{
          type: 'linear-gradient',
          angle: 135,
          stops: [
            { color: '#FFD700', position: 0 },
            { color: '#FF8C00', position: 1 }
          ]
        }}
        effects={{
          dropShadow: [
            { x: 0, y: 6, blur: 12, color: 'rgba(255, 140, 0, 0.4)' }
          ]
        }}
      >
        Gold Glow Effect
      </Text>
      <Text
        variant="h2"
        fill={{ type: 'solid', color: 'white1' }}
        effects={{
          dropShadow: [
            { x: 2, y: 2, blur: 4, color: 'rgba(0, 0, 0, 0.3)' },
            { x: 4, y: 4, blur: 8, color: 'rgba(0, 0, 0, 0.2)' }
          ]
        }}
      >
        Layered Shadow Text
      </Text>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text with drop shadow effects for depth and emphasis.'
      }
    }
  }
};

export const ResponsiveText: Story = {
  name: 'Combining Text Props',
  render: () => (
    <Frame
      autoLayout={{ flow: 'vertical', gap: 20, padding: 32 }}
      fill={{ type: 'solid', color: 'white2' }}
      appearance={{ radius: 12 }}
    >
      <Text
        variant="h3"
        fill={{ type: 'solid', color: 'neutral8' }}
        typography={{ textAlign: 'center' }}
      >
        Centered Heading
      </Text>
      <Text
        variant="body"
        fill={{ type: 'solid', color: 'gray7' }}
        typography={{ textAlign: 'justify', lineHeight: 1.8 }}
      >
        This text uses the body variant but overrides the line height and text alignment.
        You can combine variant presets with custom typography properties to fine-tune the appearance.
      </Text>
      <Text
        variant="label"
        fill={{ type: 'solid', color: 'primary6' }}
        typography={{ textTransform: 'none', letterSpacing: 1 }}
      >
        Custom styled label
      </Text>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combining variant presets with custom typography overrides for flexible text styling.'
      }
    }
  }
};


// Stories for all specialized text components
export const Heading1: Story = {
  name: 'H1',
  render: () => <H1>Heading 1 - Display Large (H1)</H1>,
  parameters: {
    docs: { description: { story: 'Specialized H1 component for large headings.' } }
  }
};

export const Heading2: Story = {
  name: 'H2',
  render: () => <H2>Heading 2 - Display Medium (H2)</H2>,
  parameters: {
    docs: { description: { story: 'Specialized H2 component for medium headings.' } }
  }
};

export const Heading3: Story = {
  name: 'H3',
  render: () => <H3>Heading 3 - Display Small (H3)</H3>,
  parameters: {
    docs: { description: { story: 'Specialized H3 component for small headings.' } }
  }
};

export const Heading4: Story = {
  name: 'H4',
  render: () => <H4>Heading 4 - Title Large (H4)</H4>,
  parameters: {
    docs: { description: { story: 'Specialized H4 component for large titles.' } }
  }
};

export const Heading5: Story = {
  name: 'H5',
  render: () => <H5>Heading 5 - Title Medium (H5)</H5>,
  parameters: {
    docs: { description: { story: 'Specialized H5 component for medium titles.' } }
  }
};

export const Heading6: Story = {
  name: 'H6',
  render: () => <H6>Heading 6 - Title Small (H6)</H6>,
  parameters: {
    docs: { description: { story: 'Specialized H6 component for small titles.' } }
  }
};

export const BodyText: Story = {
  name: 'Body',
  render: () => <Body>Body - Regular weight text for general content.</Body>,
  parameters: {
    docs: { description: { story: 'Specialized Body component for regular body text.' } }
  }
};

export const Body1Text: Story = {
  name: 'Body1',
  render: () => <Body1>Body1 - Bold weight text for emphasis.</Body1>,
  parameters: {
    docs: { description: { story: 'Specialized Body1 component for bold body text.' } }
  }
};

export const Body2Text: Story = {
  name: 'Body2',
  render: () => <Body2>Body2 - Alternative body text style.</Body2>,
  parameters: {
    docs: { description: { story: 'Specialized Body2 component for alternative body text.' } }
  }
};

export const LabelText: Story = {
  name: 'Label',
  render: () => <Label>Label - Uppercase UI label text.</Label>,
  parameters: {
    docs: { description: { story: 'Specialized Label component for UI labels.' } }
  }
};

export const CaptionText: Story = {
  name: 'Caption',
  render: () => <Caption>Caption - Small descriptive text.</Caption>,
  parameters: {
    docs: { description: { story: 'Specialized Caption component for small descriptive text.' } }
  }
};

export const OverlineText: Story = {
  name: 'Overline',
  render: () => <Overline>Overline - Small uppercase header.</Overline>,
  parameters: {
    docs: { description: { story: 'Specialized Overline component for small uppercase headers.' } }
  }
};

export const DisplayText: Story = {
  name: 'Display',
  render: () => <Display>Display - Hero headline text.</Display>,
  parameters: {
    docs: { description: { story: 'Specialized Display component for hero headlines.' } }
  }
};

export const CodeText: Story = {
  name: 'Code',
  render: () => <Code>Code - Monospace code snippet.</Code>,
  parameters: {
    docs: { description: { story: 'Specialized Code component for monospace code snippets.' } }
  }
};


// New story: Showcase multiple font varieties using Text and variants
export const FontVarieties: Story = {
  name: 'Font Varieties (Text + Variants)',
  render: () => (
    <Frame
      autoLayout={{ flow: 'vertical', gap: 24, padding: 32 }}
      fill={{ type: 'solid', color: 'white1' }}
      appearance={{ radius: 12 }}
    >
      <Text variant="h1">H1 - Heading 1</Text>
      <Text variant="h2">H2 - Heading 2</Text>
      <Text variant="h3">H3 - Heading 3</Text>
      <Text variant="h4">H4 - Heading 4</Text>
      <Text variant="h5">H5 - Heading 5</Text>
      <Text variant="h6">H6 - Heading 6</Text>
      <Text variant="display">Display - Hero Headline</Text>
      <Text variant="body">Body - Regular text</Text>
      <Text variant="body1">Body1 - Bold body text</Text>
      <Text variant="body2">Body2 - Alternative body text</Text>
      <Text variant="label">Label - UI Label</Text>
      <Text variant="caption">Caption - Small descriptive text</Text>
      <Text variant="overline">Overline - Small uppercase header</Text>
      <Text variant="code" as="code">Code - Monospace</Text>
    </Frame>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all font varieties using the Text component and variant presets (h1, h2, display, body, label, etc.).'
      }
    }
  }
};
