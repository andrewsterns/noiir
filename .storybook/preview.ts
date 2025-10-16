import type { Preview } from '@storybook/react';

// Import Inter font from Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Add global styles for Inter font
const style = document.createElement('style');
style.textContent = `
  body, html {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
`;
document.head.appendChild(style);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;