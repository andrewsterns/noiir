// src/noiir/NoiirComponent.tsx
import React from 'react';
import { parseNoiir } from './parseNoiir';

interface NoiirComponentProps {
  noiirText: string;
  props?: any;
}

/**
 * Generic wrapper for rendering .noiir files as React components
 */
export const NoiirComponent: React.FC<NoiirComponentProps> = ({ noiirText, props = {} }) => {
  return parseNoiir(noiirText, props);
};

/**
 * Higher-order component that creates a React component from a .noiir file
 */
export function createNoiirComponent(noiirText: string) {
  return (props: any) => parseNoiir(noiirText, props);
}