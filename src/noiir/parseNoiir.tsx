// src/noiir/parseNoiir.tsx
import React from 'react';

export type NoiirComponent = {
  logic?: (props?: any) => any;
  render: React.ReactNode;
};

// Simple JSX-like parser for Noiir syntax
function parseJSXLike(text: string): React.ReactElement {
  // This is a very basic parser - in production you'd use a proper AST parser
  // For now, we'll create a simple component structure

  // Extract component name and props from the text
  const componentMatch = text.match(/export\s+(?:group|const)\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*{/);
  const componentName = componentMatch ? componentMatch[1] : 'NoiirComponent';

  // Extract the render block
  const renderMatch = text.match(/return\s*\(([\s\S]*?)\);?\s*}/);
  const renderContent = renderMatch ? renderMatch[1] : '<div>Parsed component</div>';

  // Create a simple React element
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
    React.createElement('div', {
      style: {
        fontSize: '12px',
        color: '#718096',
        fontFamily: 'monospace',
        backgroundColor: '#ffffff',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #e2e8f0'
      }
    },
      renderContent.trim().substring(0, 100) + '...'
    )
  );
}

export function parseNoiir(noiirText: string, props?: any): React.ReactElement {
  try {
    // Basic syntax transformations
    let processedText = noiirText;

    // Transform designer-friendly syntax to JavaScript/React
    processedText = processedText
      // export group / variant -> export const
      .replace(/\bexport\s+group\b/g, "export const")
      .replace(/\bexport\s+variant\b/g, "export const")
      // interface Foo: { -> interface Foo {
      .replace(/\binterface\s+([A-Za-z0-9_]+)\s*:\s*\{/g, "interface $1 {")
      // function: -> const logic = () =>
      .replace(/\bfunction\s*:/g, "const logic = () =>")
      // <frame -> <Frame and closing tags
      .replace(/<frame\b/g, "<Frame")
      .replace(/<\/frame>/g, "</Frame>")
      // fix small TypeScript shorthand tokens if used
      .replace(/\bextendVariant\b/g, "ExtendVariant")
      .replace(/: extendVariant =/g, ": ExtendVariant =")
      // ensure variants={{X}} spacing
      .replace(/variants=\{\{([A-Za-z0-9_,$\s]+)\}\}/g, "variants={{ $1 }}");

    // Parse the JSX-like structure
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