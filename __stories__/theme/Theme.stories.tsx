import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import colors from '../../src/theme/colors';
import { fonts } from '../../src/theme/fonts';
// Typography stories are now in Atoms/Text

// Dummy component for the story
const ThemeShowcase = () => null;

const meta: Meta<typeof ThemeShowcase> = {
  title: 'Theme/Design System',
  component: ThemeShowcase,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Complete overview of the design system colors, fonts, and typography presets.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ThemeShowcase>;

// Colors Story
export const Colors: Story = {
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
        Design System Colors
      </h1>
      
      {Object.entries(colors).map(([colorName, colorScale]) => (
        <div key={colorName} style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            marginBottom: '1rem', 
            fontSize: '1.5rem', 
            fontWeight: '600',
            textTransform: 'capitalize'
          }}>
            {colorName}
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {Object.entries(colorScale as Record<string, string>).map(([shade, colorValue]) => {
              const isLightColor = parseInt(shade) <= 3;
              const textColor = isLightColor ? '#374151' : '#ffffff';
              
              return (
                <div
                  key={shade}
                  style={{
                    backgroundColor: colorValue as string,
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    minHeight: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: isLightColor ? '1px solid #e5e7eb' : 'none',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{ 
                    color: textColor, 
                    fontWeight: '600', 
                    fontSize: '0.9rem',
                    marginBottom: '0.25rem'
                  }}>
                    {colorName}{shade}
                  </div>
                  <div style={{ 
                    color: textColor, 
                    fontSize: '0.75rem', 
                    opacity: 0.8,
                    fontFamily: 'monospace'
                  }}>
                    {colorValue}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
          Usage Examples
        </h3>
        <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
          <p><code>fill={`{{ type: 'solid', color: 'primary6' }}`}</code> - Uses the primary blue</p>
          <p><code>fill={`{{ type: 'solid', color: 'success3' }}`}</code> - Uses light green</p>
          <p><code>fill={`{{ type: 'solid', color: '#3B82F6' }}`}</code> - Uses hex color directly</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available colors in the design system with their 1-12 naming convention. Light colors (1-3) work well for backgrounds, medium colors (4-8) for interactive elements, and dark colors (9-12) for text and emphasis.'
      }
    }
  }
};

// Fonts Story
export const Fonts: Story = {
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
        Design System Fonts
      </h1>
      
      {Object.entries(fonts).map(([fontName, fontConfig]) => {
        const config = fontConfig as { family: string; weights: number[]; styles: string[]; display: string };
        return (
        <div key={fontName} style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            marginBottom: '1rem', 
            fontSize: '1.5rem', 
            fontWeight: '600',
            textTransform: 'capitalize'
          }}>
            {fontName.replace(/([A-Z])/g, ' $1').trim()}
          </h2>
          
          <div style={{
            padding: '2rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{
              fontFamily: config.family,
              fontSize: '2rem',
              fontWeight: 'normal',
              marginBottom: '1rem',
              lineHeight: 1.3
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
            
            <div style={{
              fontFamily: config.family,
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#374151'
            }}>
              Bold: The quick brown fox jumps over the lazy dog
            </div>
            
            <div style={{
              fontFamily: config.family,
              fontSize: '1rem',
              fontWeight: 'normal',
              marginBottom: '1.5rem',
              color: '#6b7280'
            }}>
              Regular: The quick brown fox jumps over the lazy dog
            </div>
            
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#9ca3af',
              fontFamily: 'monospace',
              backgroundColor: '#f9fafb',
              padding: '0.75rem',
              borderRadius: '4px'
            }}>
              <strong>Font Family:</strong> {config.family}<br/>
              <strong>Available Weights:</strong> {config.weights.join(', ')}<br/>
              <strong>Styles:</strong> {config.styles.join(', ')}<br/>
              <strong>Display:</strong> {config.display}
            </div>
          </div>
        </div>
      );
      })}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available fonts in the design system. Atkinson Hyperlegible is used for headings, Inter for body text, Poppins for display text, and JetBrains Mono for code.'
      }
    }
  }
};


// Typography presets are now showcased in Atoms/Text stories using the Text, H1, H2, etc. components.