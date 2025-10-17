import React, { useState } from 'react';
import { getStateProps, semanticStates } from '../states/states';
import { resolveColor } from '../../../../theme/colors';

// Dummy Frame component for demonstration
const Frame: React.FC<any> = ({ state, states }) => {
  const props = getStateProps(states, state);
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
        props.effects.dropShadow.map((shadow: any) => 
          `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${resolveColor(shadow.color)}`
        ).join(', ') : 'none',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      minWidth: 120,
      cursor: 'pointer'
    }}>
      {state.charAt(0).toUpperCase() + state.slice(1)}
    </div>
  );
};

export default {
  title: 'Frame/Variants',
  component: Frame,
};

export const StyleStates = () => {
  const [selectedState, setSelectedState] = useState('solid');

  return (
    <div style={{ padding: 20 }}>
      <h3>Semantic Style States</h3>
      <p>Choose a state to see how it looks:</p>
      
      <div style={{ marginBottom: 20 }}>
        {Object.keys(semanticStates).map(state => (
          <button 
            key={state}
            onClick={() => setSelectedState(state)}
            style={{
              margin: '0 8px 8px 0',
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: selectedState === state ? '#007acc' : 'white',
              color: selectedState === state ? 'white' : '#333',
              cursor: 'pointer'
            }}
          >
            {state.charAt(0).toUpperCase() + state.slice(1)}
          </button>
        ))}
      </div>

      <Frame 
        state={selectedState} 
        states={semanticStates}
      />
    </div>
  );
};

export const AllStatesGrid = () => (
  <div style={{ padding: 20 }}>
    <h3>All Style States</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
      {Object.entries(semanticStates).map(([stateName, stateProps]) => (
        <div key={stateName} style={{ textAlign: 'center' }}>
          <h4 style={{ marginBottom: 8, textTransform: 'capitalize' }}>{stateName}</h4>
          <Frame state={stateName} states={semanticStates} />
        </div>
      ))}
    </div>
  </div>
);
