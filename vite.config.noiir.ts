// vite.config.noiir.ts
import { Plugin } from 'vite';

export function noiirPlugin(): Plugin {
  return {
    name: 'noiir-plugin',
    transform(code, id) {
      if (id.endsWith('.noiir')) {
        // Convert .noiir files to JavaScript modules that export the file content as a string
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: null,
        };
      }
    },
  };
}