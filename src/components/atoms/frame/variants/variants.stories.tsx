import React, { useState } from 'react';
import { getVariantProps, semanticVariants } from './variants';
import { resolveColor } from '../../../../theme/colors';

// Dummy Frame component for demonstration
const Frame: React.FC<any> = ({ variant, variants }) => {
  const props = getVariantProps(variants, variant);
  return (
    <div style={{
      background: props.fill?.type === 'solid' && props.fill?.color ? resolveColor(props.fill.color) : 
                  props.fill?.type === 'none' ? 'transparent' : '#eee',
      color: props.typography?.color ? resolveColor(props.typography.color) : '#222',
      fontSize: props.typography?.fontSize || 16,
      fontWeight: props.typography?.fontWeight || 400,
      padding: 16,
      borderRadius: props.appearance?.radius || 0,
      border: props.stroke?.weight ? `${props.stroke.weight}px solid ${props.stroke.color ? resolveColor(props.stroke.color) : '#000'}` : 'none',
      opacity: props.appearance?.opacity || 1,
      boxShadow: props.effects?.dropShadow ? 
        props.effects.dropShadow.map(shadow => 
          `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${resolveColor(shadow.color)}`
        ).join(', ') : 'none',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      minWidth: 120,
      cursor: 'pointer'
    }}>
      {variant.charAt(0).toUpperCase() + variant.slice(1)}
    </div>
  );
};

export default {
  title: 'Frame/Variants',
  component: Frame,
};

export const StyleVariants = () => {
  const [selectedVariant, setSelectedVariant] = useState('solid');

  return (
    <div style={{ padding: 20 }}>
      <h3>Semantic Style Variants</h3>
      <p>Choose a variant to see how it looks:</p>
      
      <div style={{ marginBottom: 20 }}>
        {Object.keys(semanticVariants).map(variant => (
          <button 
            key={variant}
            onClick={() => setSelectedVariant(variant)}
            style={{
              margin: '0 8px 8px 0',
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: selectedVariant === variant ? '#007acc' : 'white',
              color: selectedVariant === variant ? 'white' : '#333',
              cursor: 'pointer'
            }}
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </button>
        ))}
      </div>

      <Frame 
        variant={selectedVariant} 
        variants={semanticVariants}
      />
    </div>
  );
};

export const AllVariantsGrid = () => (
  <div style={{ padding: 20 }}>
    <h3>All Style Variants</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
      {Object.entries(semanticVariants).map(([variantName, variantProps]) => (
        <div key={variantName} style={{ textAlign: 'center' }}>
          <h4 style={{ marginBottom: 8, textTransform: 'capitalize' }}>{variantName}</h4>
          <Frame variant={variantName} variants={semanticVariants} />
        </div>
      ))}
    </div>
  </div>
);
