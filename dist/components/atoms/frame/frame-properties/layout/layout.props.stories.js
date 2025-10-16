import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from '../../Frame';
const meta = {
    title: 'Frame/Properties/Layout',
    component: Frame,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Layout properties control how frames position and arrange their children using auto layout.'
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
export const Layout = {
    args: {
        children: 'Layout Container',
        fill: { type: 'solid', color: 'neutral2' },
        stroke: { type: 'none' },
        appearance: { radius: 8 },
        flow: 'horizontal',
        alignment: 'center',
        gap: 12,
        padding: 16,
        wrap: 'nowrap',
        clipContent: false,
        width: 'hug',
        height: 'hug',
        // Child frame defaults
        childWidth: 60,
        childHeight: 40,
        childAlignment: 'center'
    },
    argTypes: {
        // Focus only on layout-related controls
        children: {
            control: { type: 'text' },
            description: 'Child content'
        },
        flow: {
            control: { type: 'select' },
            options: [undefined, 'freeform', 'horizontal', 'vertical', 'grid'],
            description: 'Layout flow type',
            table: { category: 'Layout' }
        },
        alignment: {
            control: { type: 'select' },
            options: [undefined, 'top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right', 'top', 'center', 'bottom', 'left', 'right'],
            description: 'Overall alignment within the container (disabled for freeform)',
            table: { category: 'Layout' },
            if: { arg: 'flow', neq: 'freeform' }
        },
        gap: {
            control: { type: 'number', min: 0, max: 50, step: 2 },
            description: 'Space between items in pixels',
            table: { category: 'Layout' }
        },
        padding: {
            control: { type: 'number', min: 0, max: 50, step: 2 },
            description: 'Internal padding in pixels',
            table: { category: 'Layout' }
        },
        wrap: {
            control: { type: 'select' },
            options: [undefined, 'nowrap', 'wrap', 'wrap-reverse'],
            description: 'Flex wrap behavior',
            table: { category: 'Layout' }
        },
        clipContent: {
            control: { type: 'boolean' },
            description: 'Clip content that overflows (overflow: hidden)',
            table: { category: 'Layout' }
        },
        width: {
            control: { type: 'select' },
            options: [undefined, 'hug', 'fill-container', 200, 300, 400],
            description: 'Container width behavior',
            table: { category: 'Layout' }
        },
        height: {
            control: { type: 'select' },
            options: [undefined, 'hug', 'fill-container', 100, 150, 200],
            description: 'Container height behavior',
            table: { category: 'Layout' }
        },
        // Child frame controls
        childWidth: {
            control: { type: 'select' },
            options: [undefined, 'hug', 'fill-container', 30, 40, 50, 60, 80, 100, 120, 150],
            description: 'Width behavior of child frames',
            table: { category: 'Children' }
        },
        childHeight: {
            control: { type: 'select' },
            options: [undefined, 'hug', 'fill-container', 20, 30, 40, 50, 60, 80, 100],
            description: 'Height behavior of child frames',
            table: { category: 'Children' }
        },
        childAlignment: {
            control: { type: 'select' },
            options: [undefined, 'top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right', 'top', 'center', 'bottom', 'left', 'right'],
            description: 'Alignment of content within child frames',
            table: { category: 'Children' }
        },
        // Hide other controls to focus on layout
        position: { control: false },
        fill: { control: false },
        appearance: { control: false },
        stroke: { control: false },
        onClick: { control: false },
        onMouseEnter: { control: false },
        onMouseLeave: { control: false }
    },
    render: (args) => (_jsxs(Frame, { autoLayout: args.flow ? {
            flow: args.flow,
            alignment: args.alignment,
            gap: args.gap,
            padding: args.padding,
            wrap: args.wrap,
            clipContent: args.clipContent,
            width: args.width,
            height: args.height
        } : undefined, fill: args.fill, stroke: args.stroke, appearance: args.appearance, children: [_jsx(Frame, { fill: { type: 'solid', color: 'primary6' }, stroke: { type: 'none' }, autoLayout: {
                    width: args.childWidth,
                    height: args.childHeight,
                    alignment: args.childAlignment
                }, appearance: { radius: 4 }, children: _jsx(Frame, { typography: { color: 'white', fontSize: 10, textAlign: 'center' }, stroke: { type: 'none' }, autoLayout: { padding: 8 }, children: "Item 1" }) }), _jsx(Frame, { fill: { type: 'solid', color: 'error6' }, stroke: { type: 'none' }, autoLayout: {
                    width: args.childWidth,
                    height: args.childHeight,
                    alignment: args.childAlignment
                }, appearance: { radius: 4 }, children: _jsx(Frame, { stroke: { type: 'none' }, typography: { color: 'white', fontSize: 10, textAlign: 'center' }, autoLayout: { padding: 8 }, children: "Item 2" }) }), _jsx(Frame, { stroke: { type: 'none' }, fill: { type: 'solid', color: 'success6' }, autoLayout: {
                    width: args.childWidth,
                    height: args.childHeight,
                    alignment: args.childAlignment
                }, appearance: { radius: 4 }, children: _jsx(Frame, { stroke: { type: 'none' }, typography: { color: 'white', fontSize: 10, textAlign: 'center' }, autoLayout: { padding: 8 }, children: "Item 3" }) }), _jsx(Frame, { stroke: { type: 'none' }, fill: { type: 'solid', color: 'accent6' }, autoLayout: {
                    width: args.childWidth,
                    height: args.childHeight,
                    alignment: args.childAlignment
                }, appearance: { radius: 4 }, children: _jsx(Frame, { stroke: { type: 'none' }, typography: { color: 'white', fontSize: 10, textAlign: 'center' }, autoLayout: { padding: 8 }, children: "Item 4" }) }), _jsx(Frame, { stroke: { type: 'none' }, fill: { type: 'solid', color: 'warning6' }, autoLayout: {
                    width: args.childWidth,
                    height: args.childHeight,
                    alignment: args.childAlignment
                }, appearance: { radius: 4 }, children: _jsx(Frame, { stroke: { type: 'none' }, typography: { color: 'white', fontSize: 10, textAlign: 'center' }, autoLayout: { padding: 8 }, children: "Item 5" }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Interactive layout controls - adjust auto layout flow, gap, padding, and alignment options to see how they affect child positioning.'
            }
        },
        controls: {
            exclude: ['autoLayout', 'position', 'size', 'fill', 'appearance', 'stroke', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
        }
    }
};
