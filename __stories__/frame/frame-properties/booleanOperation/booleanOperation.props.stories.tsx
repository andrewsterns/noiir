import type { Meta, StoryObj } from '@storybook/react';
import { Frame, FrameProps } from '../../../../src/components/frame/Frame';

// ALL BOOLEAN OPERATION RELATED PROPS AND STORIES SHOULD GO IN THIS FILE

const meta: Meta<typeof Frame> = {
  title: 'Frame/Properties/Boolean Operations',
  component: Frame,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Boolean operations allow frames to combine with each other using union, subtract, intersect, and exclude operations, similar to Figma\'s boolean operations. Note: Full implementation requires SVG mode for complex shapes.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type BooleanOperationStory = StoryObj<typeof Frame>;

export const BooleanOperationConcept: BooleanOperationStory = {
  name: 'Boolean Operation Concepts',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: 20 }}>
      <div>
        <h3 style={{ marginBottom: 16 }}>Union</h3>
        <p style={{ marginBottom: 16, color: '#666' }}>
          Combines two shapes into one. The result includes all areas covered by either shape.
        </p>
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Visual representation of union */}
          <div style={{ position: 'relative', width: 200, height: 150 }}>
            <Frame
              autoLayout={{ width: 100, height: 100 }}
              fill={{ type: 'solid', color: 'primary6', opacity: 0.7 }}
              appearance={{ radius: 50 }}
              position={{ type: 'absolute', x: 0, y: 25 }}
            />
            <Frame
              autoLayout={{ width: 100, height: 100 }}
              fill={{ type: 'solid', color: 'accent6', opacity: 0.7 }}
              appearance={{ radius: 50 }}
              position={{ type: 'absolute', x: 70, y: 25 }}
            />
            <div style={{ position: 'absolute', bottom: 0, textAlign: 'center', width: '100%', fontSize: 12 }}>
              Before Union
            </div>
          </div>
          
          <div style={{ position: 'relative', width: 200, height: 150 }}>
            <Frame
              id="union-circle-1"
              autoLayout={{ width: 170, height: 100 }}
              fill={{ type: 'solid', color: 'primary6' }}
              appearance={{ radius: 50 }}
              position={{ type: 'absolute', x: 0, y: 25 }}
            />
            <div style={{ position: 'absolute', bottom: 0, textAlign: 'center', width: '100%', fontSize: 12 }}>
              After Union (simulated)
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16 }}>Subtract</h3>
        <p style={{ marginBottom: 16, color: '#666' }}>
          Removes the second shape from the first. The result is the first shape with the second shape cut out.
        </p>
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Visual representation of subtract */}
          <div style={{ position: 'relative', width: 200, height: 150 }}>
            <Frame
              autoLayout={{ width: 150, height: 100 }}
              fill={{ type: 'solid', color: 'primary6', opacity: 0.7 }}
              appearance={{ radius: 16 }}
              position={{ type: 'absolute', x: 0, y: 25 }}
            />
            <Frame
              autoLayout={{ width: 80, height: 80 }}
              fill={{ type: 'solid', color: 'error6', opacity: 0.7 }}
              appearance={{ radius: '50%' }}
              position={{ type: 'absolute', x: 70, y: 35 }}
            />
            <div style={{ position: 'absolute', bottom: 0, textAlign: 'center', width: '100%', fontSize: 12 }}>
              Before Subtract
            </div>
          </div>
          
          <div style={{ position: 'relative', width: 200, height: 150 }}>
            <div style={{ 
              position: 'absolute',
              width: 150, 
              height: 100,
              background: '#3B82F6',
              borderRadius: 16,
              top: 25
            }}>
              {/* Simulated cutout - would need actual boolean op implementation */}
            </div>
            <div style={{ position: 'absolute', bottom: 0, textAlign: 'center', width: '100%', fontSize: 12 }}>
              After Subtract (concept)
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16 }}>Intersect</h3>
        <p style={{ marginBottom: 16, color: '#666' }}>
          Keeps only the overlapping area of both shapes.
        </p>
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Visual representation of intersect */}
          <div style={{ position: 'relative', width: 200, height: 150 }}>
            <Frame
              autoLayout={{ width: 100, height: 100 }}
              fill={{ type: 'solid', color: 'success6', opacity: 0.7 }}
              appearance={{ radius: '50%' }}
              position={{ type: 'absolute', x: 20, y: 25 }}
            />
            <Frame
              autoLayout={{ width: 100, height: 100 }}
              fill={{ type: 'solid', color: 'warning6', opacity: 0.7 }}
              appearance={{ radius: '50%' }}
              position={{ type: 'absolute', x: 70, y: 25 }}
            />
            <div style={{ position: 'absolute', bottom: 0, textAlign: 'center', width: '100%', fontSize: 12 }}>
              Before Intersect
            </div>
          </div>
          
          <div style={{ position: 'relative', width: 200, height: 150 }}>
            <Frame
              autoLayout={{ width: 50, height: 100 }}
              fill={{ type: 'solid', color: 'success6' }}
              appearance={{ radius: '50%' }}
              position={{ type: 'absolute', x: 70, y: 25 }}
            />
            <div style={{ position: 'absolute', bottom: 0, textAlign: 'center', width: '100%', fontSize: 12 }}>
              After Intersect (simulated)
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16 }}>Exclude</h3>
        <p style={{ marginBottom: 16, color: '#666' }}>
          Keeps all areas except where shapes overlap (XOR operation).
        </p>
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Visual representation of exclude */}
          <div style={{ position: 'relative', width: 200, height: 150 }}>
            <Frame
              autoLayout={{ width: 100, height: 100 }}
              fill={{ type: 'solid', color: 'info6', opacity: 0.7 }}
              appearance={{ radius: '50%' }}
              position={{ type: 'absolute', x: 20, y: 25 }}
            />
            <Frame
              autoLayout={{ width: 100, height: 100 }}
              fill={{ type: 'solid', color: 'error6', opacity: 0.7 }}
              appearance={{ radius: '50%' }}
              position={{ type: 'absolute', x: 70, y: 25 }}
            />
            <div style={{ position: 'absolute', bottom: 0, textAlign: 'center', width: '100%', fontSize: 12 }}>
              Before Exclude
            </div>
          </div>
          
          <div style={{ position: 'relative', width: 200, height: 150 }}>
            <div style={{ display: 'flex', gap: 8, position: 'absolute', top: 25 }}>
              <Frame
                autoLayout={{ width: 70, height: 100 }}
                fill={{ type: 'solid', color: 'info6' }}
                appearance={{ radius: '50% 0 0 50%' }}
              />
              <Frame
                autoLayout={{ width: 70, height: 100 }}
                fill={{ type: 'solid', color: 'error6' }}
                appearance={{ radius: '0 50% 50% 0' }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: 0, textAlign: 'center', width: '100%', fontSize: 12 }}>
              After Exclude (simulated)
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual explanation of boolean operation concepts. Full implementation requires SVG mode for accurate geometric calculations.'
      }
    }
  }
};

export const BooleanOperationAPI: BooleanOperationStory = {
  name: 'Boolean Operation API Usage',
  render: () => (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16 }}>How to Use Boolean Operations</h3>
        <p style={{ marginBottom: 16, color: '#666' }}>
          Boolean operations combine two frames using their IDs. The frame with the <code>booleanOperation</code> prop
          will be combined with the frame specified in the <code>target</code> property.
        </p>
      </div>

      <div style={{ marginBottom: 32, padding: 16, background: '#f5f5f5', borderRadius: 8, fontFamily: 'monospace', fontSize: 14 }}>
        <pre style={{ margin: 0 }}>{`<Frame id="shape1" fill={{...}} />

<Frame 
  id="shape2"
  booleanOperation={{
    type: 'subtract',
    target: 'shape1'
  }}
  fill={{...}} 
/>`}</pre>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h4 style={{ marginBottom: 12 }}>Operation Types:</h4>
        <ul style={{ color: '#666', lineHeight: 1.8 }}>
          <li><strong>union</strong> - Combines both shapes into one</li>
          <li><strong>subtract</strong> - Removes the target shape from this shape</li>
          <li><strong>intersect</strong> - Keeps only the overlapping area</li>
          <li><strong>exclude</strong> - Keeps everything except the overlap (XOR)</li>
        </ul>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h4 style={{ marginBottom: 12 }}>Rendering Modes:</h4>
        <ul style={{ color: '#666', lineHeight: 1.8 }}>
          <li><strong>css</strong> (default) - Uses CSS clip-path (limited support, simple shapes only)</li>
          <li><strong>svg</strong> - Uses SVG clipPath/mask elements (full support, any shape)</li>
        </ul>
      </div>

      <div style={{ padding: 16, background: '#fff3cd', borderRadius: 8, border: '1px solid #ffc107' }}>
        <strong>Note:</strong> Boolean operations require complex geometric calculations. The current implementation
        provides the API structure. Full SVG-based boolean operations will be implemented in future versions.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'API documentation for boolean operations. Use `booleanOperation` prop to combine frames with union, subtract, intersect, or exclude operations.'
      }
    }
  }
};

export const SimpleBooleanExample: BooleanOperationStory = {
  name: 'Simple Boolean Example (Concept)',
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 20, flexWrap: 'wrap' }}>
      {/* Example showing the API (even though full implementation pending) */}
      <div style={{ position: 'relative', width: 250, height: 250 }}>
        <Frame
          id="base-shape"
          autoLayout={{ width: 200, height: 200 }}
          fill={{ type: 'solid', color: 'primary6' }}
          appearance={{ radius: 20 }}
          position={{ type: 'absolute', x: 0, y: 0 }}
        >
          <div style={{ padding: 20, color: '#fff', fontWeight: 600 }}>
            Base Shape<br/>(id: "base-shape")
          </div>
        </Frame>

        <Frame
          id="subtract-shape"
          autoLayout={{ width: 100, height: 100 }}
          fill={{ type: 'solid', color: 'error6', opacity: 0.8 }}
          appearance={{ radius: '50%' }}
          position={{ type: 'absolute', x: 120, y: 80 }}
          booleanOperation={{
            type: 'subtract',
            target: 'base-shape',
            mode: 'svg'
          }}
        >
          <div style={{ padding: 10, color: '#fff', fontSize: 12, textAlign: 'center' }}>
            Subtract<br/>Shape
          </div>
        </Frame>
      </div>

      <div style={{ padding: 20 }}>
        <h4 style={{ marginBottom: 12 }}>Code Example:</h4>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: 16, 
          borderRadius: 8, 
          fontSize: 12,
          fontFamily: 'monospace',
          overflow: 'auto'
        }}>{`<Frame
  id="base-shape"
  fill={{ type: 'solid', color: 'primary6' }}
  appearance={{ radius: 20 }}
/>

<Frame
  id="subtract-shape"
  booleanOperation={{
    type: 'subtract',
    target: 'base-shape',
    mode: 'svg'
  }}
  fill={{ type: 'solid', color: 'error6' }}
  appearance={{ radius: '50%' }}
/>`}</pre>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of boolean operation API usage. Full geometric calculation will be implemented in future versions using SVG mode.'
      }
    }
  }
};
