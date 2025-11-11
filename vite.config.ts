import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { noiirPlugin } from './vite.config.noiir';
import path from 'path';

export default defineConfig({
  plugins: [react(), noiirPlugin()],
  resolve: {
    alias: {
      '@noiir/frame-core': path.resolve(__dirname, './__frame-core__'),
      '@components': path.resolve(__dirname, './__components__'),
      '@variants': path.resolve(__dirname, './__variants__'),
      '@stories': path.resolve(__dirname, './__stories__'),
      '@theme': path.resolve(__dirname, './__variants__/theme'),
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'FigmaComponents',
      fileName: (format) => `figma-components.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});