import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { noiirPlugin } from './vite.config.noiir';

export default defineConfig({
  plugins: [react(), noiirPlugin()],
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