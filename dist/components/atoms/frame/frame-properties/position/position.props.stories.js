import { jsx as _jsx } from "react/jsx-runtime";
import { Frame } from '../../Frame';
const meta = {
    title: 'Frame/Properties/Position',
    component: Frame,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Position properties allow you to control the placement and rotation of frames within their container.'
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Position Example with Controls
export const Position = {
    args: {
        children: 'Positioned Frame',
        fill: { type: 'solid', color: 'primary6' },
        appearance: { radius: 8 },
        positionX: 50,
        positionY: 50,
        positionRotation: 0
    },
    argTypes: {
        // Focus only on position-related controls
        children: {
            control: { type: 'text' },
            description: 'Child content'
        },
        positionX: {
            control: { type: 'number', min: 0, max: 300, step: 5 },
            description: 'X coordinate for absolute positioning',
            table: { category: 'Position' }
        },
        positionY: {
            control: { type: 'number', min: 0, max: 200, step: 5 },
            description: 'Y coordinate for absolute positioning',
            table: { category: 'Position' }
        },
        positionRotation: {
            control: { type: 'range', min: -180, max: 180, step: 5 },
            description: 'Rotation in degrees',
            table: { category: 'Position' }
        },
        // Hide other controls to focus on position
        fill: { control: false },
        appearance: { control: false },
        autoLayout: { control: false },
        stroke: { control: false },
        onClick: { control: false },
        onMouseEnter: { control: false },
        onMouseLeave: { control: false }
    },
    render: (args) => (_jsx(Frame, { position: { x: 0, y: 0 }, autoLayout: { width: 400, height: 300 }, fill: { type: 'solid', color: '#F9FAFB' }, stroke: { color: '#D1D5DB', weight: 2, dashPattern: [5, 5] }, children: _jsx(Frame, { position: {
                x: args.positionX,
                y: args.positionY,
                rotation: args.positionRotation
            }, autoLayout: { width: 120, height: 80 }, fill: args.fill, appearance: args.appearance, children: _jsx(Frame, { typography: { color: 'white', fontSize: 12, textAlign: 'center' }, autoLayout: { padding: 8 }, children: args.children }) }) })),
    parameters: {
        docs: {
            description: {
                story: 'Interactive position controls - adjust X, Y coordinates and rotation. The dashed border shows the container bounds.'
            }
        },
        controls: {
            exclude: ['position', 'size', 'fill', 'appearance', 'autoLayout', 'stroke', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
        }
    }
};
