import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../__stories__/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@noiir/frame-core': path.resolve(__dirname, '../__frame-core__'),
          '@components': path.resolve(__dirname, '../__components__'),
          '@variants': path.resolve(__dirname, '../__variants__'),
          '@stories': path.resolve(__dirname, '../__stories__'),
          '@theme': path.resolve(__dirname, '../__variants__/theme'),
        },
      },
    });
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  managerHead: (head) => `
    ${head}
    <style>
      body {
        background-color: #ffffff !important;
        color: #000000 !important;
      }
      .sidebar-item, .sidebar-header, .sidebar-tree {
        color: #000000 !important;
      }
    </style>
  `,
};
export default config;