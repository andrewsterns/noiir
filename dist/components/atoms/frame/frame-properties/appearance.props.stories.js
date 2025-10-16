import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from '../Frame';
const meta = {
    title: 'Frame/Properties/Appearance',
    component: Frame,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Appearance properties control the visual styling of frames including opacity, visibility, border radius, and blend modes.'
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
export const Appearance = {
    args: {
        children: 'Parent Frame',
        fill: { type: 'solid', color: 'neutral2' },
        stroke: { color: 'neutral4', weight: 1 },
        size: { width: 300, height: 200 },
        // Parent appearance defaults
        parentOpacity: 1,
        parentVisible: true,
        parentRadius: 12,
        parentRadiusTopLeft: 0,
        parentRadiusTopRight: 0,
        parentRadiusBottomRight: 0,
        parentRadiusBottomLeft: 0,
        parentBlendMode: 'normal',
        // Child appearance defaults
        childOpacity: 0.9,
        childVisible: true,
        childRadius: 8,
        childRadiusTopLeft: 0,
        childRadiusTopRight: 0,
        childRadiusBottomRight: 0,
        childRadiusBottomLeft: 0,
        childBlendMode: 'normal'
    },
    argTypes: {
        // Focus only on appearance-related controls
        children: {
            control: { type: 'text' },
            description: 'Parent frame content'
        },
        // Parent appearance controls
        parentOpacity: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Parent frame opacity (0 = transparent, 1 = opaque)',
            table: { category: 'Parent Appearance' }
        },
        parentVisible: {
            control: { type: 'boolean' },
            description: 'Parent frame visibility toggle',
            table: { category: 'Parent Appearance' }
        },
        parentRadius: {
            control: { type: 'range', min: 0, max: 50, step: 2 },
            description: 'Parent frame corner radius in pixels (uniform)',
            table: { category: 'Parent Appearance' }
        },
        parentRadiusTopLeft: {
            control: { type: 'range', min: 0, max: 50, step: 1 },
            description: 'Parent frame top-left corner radius',
            table: { category: 'Parent Appearance' }
        },
        parentRadiusTopRight: {
            control: { type: 'range', min: 0, max: 50, step: 1 },
            description: 'Parent frame top-right corner radius',
            table: { category: 'Parent Appearance' }
        },
        parentRadiusBottomRight: {
            control: { type: 'range', min: 0, max: 50, step: 1 },
            description: 'Parent frame bottom-right corner radius',
            table: { category: 'Parent Appearance' }
        },
        parentRadiusBottomLeft: {
            control: { type: 'range', min: 0, max: 50, step: 1 },
            description: 'Parent frame bottom-left corner radius',
            table: { category: 'Parent Appearance' }
        },
        parentBlendMode: {
            control: { type: 'select' },
            options: [undefined, 'normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard-light'],
            description: 'Parent frame blend mode for layering effects',
            table: { category: 'Parent Appearance' }
        },
        // Child appearance controls
        childOpacity: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Child frame opacity (0 = transparent, 1 = opaque)',
            table: { category: 'Child Appearance' }
        },
        childVisible: {
            control: { type: 'boolean' },
            description: 'Child frame visibility toggle',
            table: { category: 'Child Appearance' }
        },
        childRadius: {
            control: { type: 'range', min: 0, max: 30, step: 1 },
            description: 'Child frame corner radius in pixels (uniform)',
            table: { category: 'Child Appearance' }
        },
        childRadiusTopLeft: {
            control: { type: 'range', min: 0, max: 30, step: 1 },
            description: 'Child frame top-left corner radius',
            table: { category: 'Child Appearance' }
        },
        childRadiusTopRight: {
            control: { type: 'range', min: 0, max: 30, step: 1 },
            description: 'Child frame top-right corner radius',
            table: { category: 'Child Appearance' }
        },
        childRadiusBottomRight: {
            control: { type: 'range', min: 0, max: 30, step: 1 },
            description: 'Child frame bottom-right corner radius',
            table: { category: 'Child Appearance' }
        },
        childRadiusBottomLeft: {
            control: { type: 'range', min: 0, max: 30, step: 1 },
            description: 'Child frame bottom-left corner radius',
            table: { category: 'Child Appearance' }
        },
        childBlendMode: {
            control: { type: 'select' },
            options: [undefined, 'normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard-light'],
            description: 'Child frame blend mode for layering effects',
            table: { category: 'Child Appearance' }
        },
        // Hide other controls to focus on appearance
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
    render: (args) => (_jsx("div", { style: { backgroundColor: '#F9FAFB', padding: '40px', borderRadius: '8px' }, children: _jsxs(Frame, { size: args.size, fill: args.fill, stroke: args.stroke, appearance: {
                opacity: args.parentOpacity,
                visible: args.parentVisible,
                radius: args.parentRadius,
                radiusTopLeft: args.parentRadiusTopLeft || undefined,
                radiusTopRight: args.parentRadiusTopRight || undefined,
                radiusBottomRight: args.parentRadiusBottomRight || undefined,
                radiusBottomLeft: args.parentRadiusBottomLeft || undefined,
                blendMode: args.parentBlendMode
            }, autoLayout: {
                flow: 'vertical',
                alignment: 'center',
                gap: 16,
                padding: 24
            }, children: [_jsx("div", { style: { color: '#374151', fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }, children: args.children }), _jsx(Frame, { fill: { type: 'solid', color: 'primary6' }, size: { width: 120, height: 60 }, appearance: {
                        opacity: args.childOpacity,
                        visible: args.childVisible,
                        radius: args.childRadius,
                        radiusTopLeft: args.childRadiusTopLeft || undefined,
                        radiusTopRight: args.childRadiusTopRight || undefined,
                        radiusBottomRight: args.childRadiusBottomRight || undefined,
                        radiusBottomLeft: args.childRadiusBottomLeft || undefined,
                        blendMode: args.childBlendMode
                    }, children: _jsx("div", { style: { color: 'white', padding: '16px', fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }, children: "Child Frame" }) }), _jsx(Frame, { fill: { type: 'solid', color: 'error6' }, size: { width: 100, height: 50 }, appearance: {
                        opacity: args.childOpacity * 0.8,
                        visible: args.childVisible,
                        radius: args.childRadius,
                        radiusTopLeft: args.childRadiusTopLeft || undefined,
                        radiusTopRight: args.childRadiusTopRight || undefined,
                        radiusBottomRight: args.childRadiusBottomRight || undefined,
                        radiusBottomLeft: args.childRadiusBottomLeft || undefined,
                        blendMode: args.childBlendMode
                    }, children: _jsx("div", { style: { color: 'white', padding: '12px', fontSize: '10px', textAlign: 'center', fontWeight: 'bold' }, children: "Child 2" }) })] }) })),
    parameters: {
        docs: {
            description: {
                story: 'Interactive appearance controls - adjust opacity, visibility, border radius, and blend modes for both parent and child frames to see layering and visual effects.'
            }
        },
        controls: {
            exclude: ['position', 'autoLayout', 'size', 'fill', 'stroke', 'appearance', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
        }
    }
};
