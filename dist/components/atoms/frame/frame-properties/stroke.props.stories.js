import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from '../Frame';
const meta = {
    title: 'Frame/Properties/Stroke',
    component: Frame,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Stroke properties control the border appearance of frames including solid colors, gradients, images, weight, and positioning.'
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
export const Stroke = {
    args: {
        children: 'Stroke Demo',
        size: { width: 280, height: 200 },
        appearance: { radius: 16 },
        fill: { type: 'solid', color: 'neutral2' },
        // Stroke controls
        strokeType: 'solid',
        strokeWeight: 2,
        strokePosition: 'inside',
        strokeColor: '#E5E7EB',
        strokeDashed: false,
        // Stroke gradient defaults
        strokeGradientType: 'linear',
        strokeGradientAngle: 0,
        strokeGradientStop1Color: '#3B82F6',
        strokeGradientStop1Position: 0,
        strokeGradientStop2Color: '#EF4444',
        strokeGradientStop2Position: 1,
        // Stroke image defaults
        strokeImageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=100&h=100&fit=crop',
        strokeImageScaleMode: 'tile'
    },
    argTypes: {
        children: {
            control: { type: 'text' },
            description: 'Frame content'
        },
        // Stroke controls
        strokeType: {
            control: { type: 'select' },
            options: ['none', 'solid', 'gradient', 'image'],
            description: 'Type of stroke to apply',
            table: { category: 'Stroke Type' }
        },
        strokeWeight: {
            control: { type: 'range', min: 0, max: 20, step: 1 },
            description: 'Stroke width in pixels',
            table: { category: 'Stroke' },
            if: { arg: 'strokeType', neq: 'none' }
        },
        strokePosition: {
            control: { type: 'select' },
            options: ['inside', 'center', 'outside'],
            description: 'Stroke position relative to frame edge',
            table: { category: 'Stroke' },
            if: { arg: 'strokeType', neq: 'none' }
        },
        strokeColor: {
            control: { type: 'color' },
            description: 'Solid stroke color',
            table: { category: 'Stroke' },
            if: { arg: 'strokeType', eq: 'solid' }
        },
        strokeDashed: {
            control: { type: 'boolean' },
            description: 'Use dashed stroke pattern',
            table: { category: 'Stroke' },
            if: { arg: 'strokeType', eq: 'solid' }
        },
        // Stroke gradient controls
        strokeGradientType: {
            control: { type: 'select' },
            options: ['linear', 'radial', 'angular'],
            description: 'Type of stroke gradient',
            table: { category: 'Stroke Gradient' },
            if: { arg: 'strokeType', eq: 'gradient' }
        },
        strokeGradientAngle: {
            control: { type: 'range', min: 0, max: 360, step: 5 },
            description: 'Stroke gradient angle in degrees',
            table: { category: 'Stroke Gradient' },
            if: { arg: 'strokeType', eq: 'gradient' }
        },
        strokeGradientStop1Color: {
            control: { type: 'color' },
            description: 'First stroke gradient stop color',
            table: { category: 'Stroke Gradient' },
            if: { arg: 'strokeType', eq: 'gradient' }
        },
        strokeGradientStop1Position: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'First stroke gradient stop position (0-1)',
            table: { category: 'Stroke Gradient' },
            if: { arg: 'strokeType', eq: 'gradient' }
        },
        strokeGradientStop2Color: {
            control: { type: 'color' },
            description: 'Second stroke gradient stop color',
            table: { category: 'Stroke Gradient' },
            if: { arg: 'strokeType', eq: 'gradient' }
        },
        strokeGradientStop2Position: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Second stroke gradient stop position (0-1)',
            table: { category: 'Stroke Gradient' },
            if: { arg: 'strokeType', eq: 'gradient' }
        },
        // Stroke image controls
        strokeImageUrl: {
            control: { type: 'text' },
            description: 'Image URL for stroke pattern',
            table: { category: 'Stroke Image' },
            if: { arg: 'strokeType', eq: 'image' }
        },
        strokeImageScaleMode: {
            control: { type: 'select' },
            options: ['fill', 'fit', 'crop', 'tile'],
            description: 'How the stroke image should scale',
            table: { category: 'Stroke Image' },
            if: { arg: 'strokeType', eq: 'image' }
        },
        // Hide other controls to focus on stroke
        position: { control: false },
        autoLayout: { control: false },
        size: { control: false },
        fill: { control: false },
        stroke: { control: false },
        appearance: { control: false },
        onClick: { control: false },
        onMouseEnter: { control: false },
        onMouseLeave: { control: false }
    },
    render: (args) => {
        // Build stroke object based on type
        let strokeProps = undefined;
        if (args.strokeType !== 'none') {
            strokeProps = {
                weight: args.strokeWeight,
                position: args.strokePosition,
                dashPattern: args.strokeDashed ? [5, 5] : undefined
            };
            switch (args.strokeType) {
                case 'solid':
                    strokeProps.color = args.strokeColor;
                    break;
                case 'gradient':
                    // Note: Stroke gradients are complex in CSS and may not work perfectly
                    strokeProps.color = args.strokeGradientStop1Color; // Fallback to first color
                    strokeProps.gradient = {
                        type: args.strokeGradientType,
                        angle: args.strokeGradientAngle,
                        stops: [
                            { color: args.strokeGradientStop1Color, position: args.strokeGradientStop1Position },
                            { color: args.strokeGradientStop2Color, position: args.strokeGradientStop2Position }
                        ]
                    };
                    break;
                case 'image':
                    // Note: Image strokes are complex in CSS and may not work perfectly
                    strokeProps.color = '#000000'; // Fallback
                    strokeProps.image = {
                        url: args.strokeImageUrl,
                        scaleMode: args.strokeImageScaleMode
                    };
                    break;
            }
        }
        return (_jsx("div", { style: { backgroundColor: '#F9FAFB', padding: '40px', borderRadius: '8px' }, children: _jsxs(Frame, { size: args.size, fill: args.fill, stroke: strokeProps, appearance: args.appearance, autoLayout: {
                    flow: 'vertical',
                    alignment: 'center',
                    gap: 16,
                    padding: 24
                }, children: [_jsx("div", { style: {
                            color: '#374151',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }, children: args.children }), _jsxs("div", { style: {
                            color: '#6B7280',
                            fontSize: '14px',
                            textAlign: 'center'
                        }, children: ["Stroke: ", args.strokeType.charAt(0).toUpperCase() + args.strokeType.slice(1), args.strokeType === 'gradient' && ` (${args.strokeGradientType})`, args.strokeType === 'image' && ` (${args.strokeImageScaleMode})`, args.strokeType !== 'none' && (_jsxs(_Fragment, { children: [_jsx("br", {}), args.strokeWeight, "px ", args.strokePosition, args.strokeDashed && ' (dashed)'] }))] })] }) }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive stroke controls - experiment with different stroke types including none, solid colors, gradients, and images with options for weight, position, and dash patterns.'
            }
        },
        controls: {
            exclude: ['position', 'autoLayout', 'size', 'fill', 'stroke', 'appearance', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
        }
    }
};
