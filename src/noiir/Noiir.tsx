// src/noiir/Noiir.tsx
import React from 'react';
import { useNoiir } from './useNoiir';

interface NoiirProps {
  src: string; // Path to .noiir file
  props?: any; // Props to pass to the component
  fallback?: React.ReactNode; // Loading/error fallback
}

export const Noiir: React.FC<NoiirProps> = ({ src, props, fallback }) => {
  const { component, loading, error } = useNoiir(src, props);

  if (loading) {
    return fallback || <div>Loading Noiir component...</div>;
  }

  if (error) {
    return fallback || <div>Error loading Noiir component: {error}</div>;
  }

  return component;
};