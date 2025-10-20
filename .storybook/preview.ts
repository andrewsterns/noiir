import type { Preview } from '@storybook/react';

// Import Geist and Geist Mono fonts from Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&family=Geist+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Add global styles for Geist font and SpaceX dark theme
const style = document.createElement('style');
style.textContent = `
  body, html {
    font-family: 'Geist', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: #0A0A0A !important;
    color: #FFFFFF;
  }
  
  code, pre, .font-mono {
    font-family: 'Geist Mono', 'JetBrains Mono', SF Mono, Monaco, Cascadia Code, Roboto Mono, Consolas, Courier New, monospace;
  }

  /* Storybook canvas background */
  #storybook-root {
    background-color: #0A0A0A !important;
  }

  /* Storybook docs background */
  .sbdocs-wrapper {
    background-color: #0A0A0A !important;
  }

  /* Storybook preview area */
  .sb-show-main {
    background-color: #0A0A0A !important;
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