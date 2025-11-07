import * as React from 'react';

//ALL EFFECTS RELATED PROPS AND HOOKS SHOULD GO IN THIS FILE

export interface EffectPropsBase {
  dropShadow?: {
    x: number;
    y: number;
    blur: number;
    spread?: number;
    color: string;
  }[];
  innerShadow?: {
    x: number;
    y: number;
    blur: number;
    spread?: number;
    color: string;
  }[];
  layerBlur?: {
    radius: number;
  };
  backgroundBlur?: {
    radius: number;
  };
  noise?: {
    intensity: number;
    seed?: number;
  };
  texture?: {
    url: string;
    opacity?: number;
    blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light';
  };
}

// Support single effect or array of effects (for layering multiple effect sets)
export type EffectProps = EffectPropsBase | EffectPropsBase[];

/**
 * Convert effect props to CSS styles
 * Supports single effect set or array of effect sets
 */
export const convertEffectProps = (props: EffectProps): React.CSSProperties => {
  if (!props) return {};
  
  // Handle array of effects (multiple effect sets)
  if (Array.isArray(props)) {
    return convertMultipleEffects(props);
  }
  
  // Handle single effect set
  return convertSingleEffect(props);
};

/**
 * Convert single effect set to CSS styles
 */
const convertSingleEffect = (props: EffectPropsBase): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  
  // Handle drop shadows
  if (props.dropShadow && props.dropShadow.length > 0) {
    const shadowStrings = props.dropShadow.map((shadow: { x: number; y: number; blur: number; spread?: number; color: string }) => 
      `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`
    );
    styles.boxShadow = shadowStrings.join(', ');
  }
  
  // Handle inner shadows
  if (props.innerShadow && props.innerShadow.length > 0) {
    const shadowStrings = props.innerShadow.map((shadow: { x: number; y: number; blur: number; spread?: number; color: string }) => 
      `inset ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`
    );
    if (styles.boxShadow) {
      styles.boxShadow += ', ' + shadowStrings.join(', ');
    } else {
      styles.boxShadow = shadowStrings.join(', ');
    }
  }
  
  // Handle layer blur
  if (props.layerBlur) {
    styles.filter = `blur(${props.layerBlur.radius}px)`;
  }
  
  // Handle background blur
  if (props.backgroundBlur) {
    styles.backdropFilter = `blur(${props.backgroundBlur.radius}px)`;
  }
  
  return styles;
};

/**
 * Convert multiple effect sets to CSS styles
 * Combines all shadows from multiple effect sets
 */
const convertMultipleEffects = (effects: EffectPropsBase[]): React.CSSProperties => {
  if (effects.length === 0) return {};
  
  const styles: React.CSSProperties = {};
  const allDropShadows: string[] = [];
  const allInnerShadows: string[] = [];
  let layerBlur: number | undefined;
  let backgroundBlur: number | undefined;
  
  // Combine all effects
  effects.forEach(effect => {
    if (effect.dropShadow && effect.dropShadow.length > 0) {
      const shadowStrings = effect.dropShadow.map((shadow: { x: number; y: number; blur: number; spread?: number; color: string }) => 
        `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`
      );
      allDropShadows.push(...shadowStrings);
    }
    
    if (effect.innerShadow && effect.innerShadow.length > 0) {
      const shadowStrings = effect.innerShadow.map((shadow: { x: number; y: number; blur: number; spread?: number; color: string }) => 
        `inset ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread || 0}px ${shadow.color}`
      );
      allInnerShadows.push(...shadowStrings);
    }
    
    // Use the first layer blur found
    if (effect.layerBlur && !layerBlur) {
      layerBlur = effect.layerBlur.radius;
    }
    
    // Use the first background blur found
    if (effect.backgroundBlur && !backgroundBlur) {
      backgroundBlur = effect.backgroundBlur.radius;
    }
  });
  
  // Combine all shadows
  const allShadows = [...allDropShadows, ...allInnerShadows];
  if (allShadows.length > 0) {
    styles.boxShadow = allShadows.join(', ');
  }
  
  // Apply blurs
  if (layerBlur) {
    styles.filter = `blur(${layerBlur}px)`;
  }
  
  if (backgroundBlur) {
    styles.backdropFilter = `blur(${backgroundBlur}px)`;
  }
  
  return styles;
};
