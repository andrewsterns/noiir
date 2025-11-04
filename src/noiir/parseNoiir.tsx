// src/noiir/parseNoiir.tsx
import React from 'react';

export type NoiirComponent = {
  logic?: (props?: any) => any;
  render: React.ReactNode;
};

// Simple JSX-like parser for Noiir syntax
function parseJSXLike(text: string): React.ReactElement {
  // Extract component name
  const componentMatch = text.match(/export\s+(?:group|const)\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*{/);
  const componentName = componentMatch ? componentMatch[1] : 'NoiirComponent';

  // Extract function block
  const functionMatch = text.match(/function:\s*{([\s\S]*?)}/);
  const functionCode = functionMatch ? functionMatch[1].trim() : '';

  // Extract render block
  const renderMatch = text.match(/render:\s*\(([\s\S]*?)\)\s*}/);
  const renderContent = renderMatch ? renderMatch[1] : '<div>Parsed component</div>';

  // Create a simple React element showing the parsed structure
  return React.createElement('div',
    {
      style: {
        padding: '16px',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa'
      }
    },
    React.createElement('h4', { style: { margin: '0 0 8px 0', color: '#2d3748' } },
      `${componentName} (Runtime Parsed)`
    ),
    functionCode && React.createElement('div', {
      style: {
        fontSize: '12px',
        color: '#38a169',
        fontFamily: 'monospace',
        backgroundColor: '#f0fff4',
        padding: '8px',
        borderRadius: '4px',
        marginBottom: '8px',
        border: '1px solid #9ae6b4'
      }
    },
      `Logic: ${functionCode}`
    ),
    React.createElement('div', {
      style: {
        fontSize: '12px',
        color: '#3182ce',
        fontFamily: 'monospace',
        backgroundColor: '#ebf8ff',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #90cdf4'
      }
    },
      `Render: ${renderContent.trim().substring(0, 100)}...`
    )
  );
}

export function parseNoiir(noiirText: string, props?: any): React.ReactElement {
  try {
    // Basic syntax transformations for the new .noiir format
    let processedText = noiirText;

    // Transform designer-friendly syntax to JavaScript/React
    processedText = processedText
      // export group / variant -> export const
      .replace(/\bexport\s+group\b/g, "export const")
      .replace(/\bexport\s+variant\b/g, "export const")
      // interface Foo: { -> interface Foo {
      .replace(/\binterface\s+([A-Za-z0-9_]+)\s*:\s*\{/g, "interface $1 {")
      // <frame -> <Frame and closing tags
      .replace(/<frame\b/g, "<Frame")
      .replace(/<\/frame>/g, "</Frame>")
      // fix small TypeScript shorthand tokens if used
      .replace(/\bextendVariant\b/g, "ExtendVariant")
      .replace(/: extendVariant =/g, ": ExtendVariant =")
      // ensure variants={{X}} spacing
      .replace(/variants=\{\{([A-Za-z0-9_,$\s]+)\}\}/g, "variants={{ $1 }}");

    // Parse the JSX-like structure with the new syntax
    return parseJSXLike(processedText);

  } catch (error) {
    // Fallback for parsing errors
    return React.createElement('div',
      { style: { padding: '20px', border: '1px solid #fed7d7', backgroundColor: '#fef5e7' } },
      React.createElement('h3', { style: { color: '#c53030' } }, 'Noiir Parse Error'),
      React.createElement('p', { style: { color: '#744210' } },
        `Failed to parse Noiir component: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    );
  }
}