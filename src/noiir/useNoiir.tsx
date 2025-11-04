// src/noiir/useNoiir.tsx
import { useState, useEffect } from 'react';
import { parseNoiir } from './parseNoiir';

export function useNoiir(noiirPath: string, props?: any) {
  const [component, setComponent] = useState<React.ReactElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNoiir = async () => {
      try {
        setLoading(true);
        // Import the .noiir file as a string (handled by Vite plugin)
        const noiirModule = await import(noiirPath);
        const noiirText = noiirModule.default;

        const parsedComponent = parseNoiir(noiirText, props);
        setComponent(parsedComponent);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Noiir component');
        setComponent(null);
      } finally {
        setLoading(false);
      }
    };

    loadNoiir();
  }, [noiirPath, props]);

  return { component, loading, error };
}