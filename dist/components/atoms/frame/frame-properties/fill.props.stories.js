import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from '../Frame';
const meta = {
    title: 'Frame/Properties/Fill',
    component: Frame,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Fill properties control the background appearance of frames including solid colors, gradients, and images.'
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
export const Fill = {
    args: {
        children: 'Fill Demo',
        size: { width: 280, height: 200 },
        appearance: { radius: 16 },
        // Fill controls
        fillType: 'solid',
        // Solid defaults
        solidColorType: 'theme',
        solidColorHex: '#3B82F6',
        solidColorTheme: 'primary',
        solidColorShade: 6,
        solidColorOpacity: 1,
        // Gradient defaults
        gradientType: 'linear',
        gradientAngle: 45,
        gradientStop1ColorType: 'theme',
        gradientStop1ColorHex: '#3B82F6',
        gradientStop1ColorTheme: 'primary',
        gradientStop1ColorShade: 6,
        gradientStop1Position: 0,
        gradientStop2ColorType: 'theme',
        gradientStop2ColorHex: '#8B5CF6',
        gradientStop2ColorTheme: 'accent',
        gradientStop2ColorShade: 6,
        gradientStop2Position: 0.5,
        gradientStop3ColorType: 'theme',
        gradientStop3ColorHex: '#EF4444',
        gradientStop3ColorTheme: 'error',
        gradientStop3ColorShade: 6,
        gradientStop3Position: 1,
        // Image defaults
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        imageScaleMode: 'fill'
    },
    argTypes: {
        children: {
            control: { type: 'text' },
            description: 'Frame content'
        },
        fillType: {
            control: { type: 'select' },
            options: ['none', 'solid', 'linear-gradient', 'radial-gradient', 'conic-gradient', 'image'],
            description: 'Type of fill to apply',
            table: { category: 'Fill Type' }
        },
        // Solid fill controls
        solidColorType: {
            control: { type: 'select' },
            options: ['hex', 'theme'],
            description: 'Color input type (hex code or theme color)',
            table: { category: 'Solid Fill' },
            if: { arg: 'fillType', eq: 'solid' }
        },
        solidColorHex: {
            control: { type: 'color' },
            description: 'Hex color code',
            table: { category: 'Solid Fill' },
            if: { arg: 'solidColorType', eq: 'hex' }
        },
        solidColorTheme: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
            description: 'Theme color name',
            table: { category: 'Solid Fill' },
            if: { arg: 'solidColorType', eq: 'theme' }
        },
        solidColorShade: {
            control: { type: 'select' },
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            description: 'Theme color shade',
            table: { category: 'Solid Fill' },
            if: { arg: 'solidColorType', eq: 'theme' }
        },
        solidColorOpacity: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Color opacity (0-1)',
            table: { category: 'Solid Fill' },
            if: { arg: 'fillType', eq: 'solid' }
        },
        // Gradient controls
        gradientAngle: {
            control: { type: 'range', min: 0, max: 360, step: 5 },
            description: 'Gradient angle in degrees',
            table: { category: 'Gradient Fill' }
        },
        // Gradient stop 1 controls
        gradientStop1ColorType: {
            control: { type: 'select' },
            options: ['hex', 'theme'],
            description: 'First stop color type',
            table: { category: 'Gradient Stop 1' }
        },
        gradientStop1ColorHex: {
            control: { type: 'color' },
            description: 'First gradient stop hex color',
            table: { category: 'Gradient Stop 1' },
            if: { arg: 'gradientStop1ColorType', eq: 'hex' }
        },
        gradientStop1ColorTheme: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
            description: 'First gradient stop theme color',
            table: { category: 'Gradient Stop 1' },
            if: { arg: 'gradientStop1ColorType', eq: 'theme' }
        },
        gradientStop1ColorShade: {
            control: { type: 'select' },
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            description: 'First gradient stop color shade',
            table: { category: 'Gradient Stop 1' },
            if: { arg: 'gradientStop1ColorType', eq: 'theme' }
        },
        gradientStop1Position: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'First gradient stop position (0-1)',
            table: { category: 'Gradient Stop 1' }
        },
        // Gradient stop 2 controls
        gradientStop2ColorType: {
            control: { type: 'select' },
            options: ['hex', 'theme'],
            description: 'Second stop color type',
            table: { category: 'Gradient Stop 2' }
        },
        gradientStop2ColorHex: {
            control: { type: 'color' },
            description: 'Second gradient stop hex color',
            table: { category: 'Gradient Stop 2' },
            if: { arg: 'gradientStop2ColorType', eq: 'hex' }
        },
        gradientStop2ColorTheme: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
            description: 'Second gradient stop theme color',
            table: { category: 'Gradient Stop 2' },
            if: { arg: 'gradientStop2ColorType', eq: 'theme' }
        },
        gradientStop2ColorShade: {
            control: { type: 'select' },
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            description: 'Second gradient stop color shade',
            table: { category: 'Gradient Stop 2' },
            if: { arg: 'gradientStop2ColorType', eq: 'theme' }
        },
        gradientStop2Position: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Second gradient stop position (0-1)',
            table: { category: 'Gradient Stop 2' }
        },
        // Gradient stop 3 controls
        gradientStop3ColorType: {
            control: { type: 'select' },
            options: ['hex', 'theme'],
            description: 'Third stop color type',
            table: { category: 'Gradient Stop 3' }
        },
        gradientStop3ColorHex: {
            control: { type: 'color' },
            description: 'Third gradient stop hex color',
            table: { category: 'Gradient Stop 3' },
            if: { arg: 'gradientStop3ColorType', eq: 'hex' }
        },
        gradientStop3ColorTheme: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral'],
            description: 'Third gradient stop theme color',
            table: { category: 'Gradient Stop 3' },
            if: { arg: 'gradientStop3ColorType', eq: 'theme' }
        },
        gradientStop3ColorShade: {
            control: { type: 'select' },
            options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            description: 'Third gradient stop color shade',
            table: { category: 'Gradient Stop 3' },
            if: { arg: 'gradientStop3ColorType', eq: 'theme' }
        },
        gradientStop3Position: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Third gradient stop position (0-1)',
            table: { category: 'Gradient Stop 3' }
        },
        // Image controls
        imageUrl: {
            control: { type: 'text' },
            description: 'Image URL for background fill',
            table: { category: 'Image Fill' },
            if: { arg: 'fillType', eq: 'image' }
        },
        imageScaleMode: {
            control: { type: 'select' },
            options: ['fill', 'fit', 'crop', 'tile'],
            description: 'How the image should scale within the frame',
            table: { category: 'Image Fill' },
            if: { arg: 'fillType', eq: 'image' }
        },
        // Hide other controls to focus on fills
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
        // Helper function to resolve color based on type
        const resolveColor = (colorType, hexColor, themeColor, shade, opacity = 1) => {
            if (colorType === 'hex') {
                return opacity < 1 ? hexColor + Math.round(opacity * 255).toString(16).padStart(2, '0') : hexColor;
            }
            else {
                // Use the new 1-12 naming system: 'primary6', 'success3', etc.
                return `${themeColor}${shade}`;
            }
        };
        // Build fill object based on type
        let fillProps = undefined;
        switch (args.fillType) {
            case 'none':
                fillProps = undefined;
                break;
            case 'solid':
                fillProps = {
                    type: 'solid',
                    color: resolveColor(args.solidColorType, args.solidColorHex, args.solidColorTheme, args.solidColorShade, args.solidColorOpacity)
                };
                break;
            case 'linear-gradient':
            case 'radial-gradient':
            case 'conic-gradient':
                fillProps = {
                    type: args.fillType,
                    angle: args.gradientAngle,
                    stops: [
                        {
                            color: resolveColor(args.gradientStop1ColorType, args.gradientStop1ColorHex, args.gradientStop1ColorTheme, args.gradientStop1ColorShade),
                            position: args.gradientStop1Position
                        },
                        {
                            color: resolveColor(args.gradientStop2ColorType, args.gradientStop2ColorHex, args.gradientStop2ColorTheme, args.gradientStop2ColorShade),
                            position: args.gradientStop2Position
                        },
                        {
                            color: resolveColor(args.gradientStop3ColorType, args.gradientStop3ColorHex, args.gradientStop3ColorTheme, args.gradientStop3ColorShade),
                            position: args.gradientStop3Position
                        }
                    ]
                };
                break;
            case 'image':
                fillProps = {
                    type: 'image',
                    image: {
                        url: args.imageUrl,
                        scaleMode: args.imageScaleMode
                    }
                };
                break;
        }
        const isLightFill = args.fillType === 'solid' && ((args.solidColorType === 'hex' && (args.solidColorHex === '#FFFFFF' || args.solidColorHex === '#ffffff' || args.solidColorHex.toLowerCase().includes('white'))) ||
            (args.solidColorType === 'theme' && (args.solidColorTheme === 'secondary' && args.solidColorShade <= 100)));
        const hasNoFill = args.fillType === 'none';
        return (_jsx("div", { style: { backgroundColor: '#F9FAFB', padding: '40px', borderRadius: '8px' }, children: _jsxs(Frame, { size: args.size, fill: fillProps, appearance: args.appearance, autoLayout: {
                    flow: 'vertical',
                    alignment: 'center',
                    gap: 16,
                    padding: 24
                }, children: [_jsx("div", { style: {
                            color: hasNoFill || isLightFill ? '#374151' : 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            textShadow: !hasNoFill && !isLightFill ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'
                        }, children: args.children }), _jsxs("div", { style: {
                            color: hasNoFill || isLightFill ? '#6B7280' : 'rgba(255,255,255,0.8)',
                            fontSize: '14px',
                            textAlign: 'center',
                            textShadow: !hasNoFill && !isLightFill ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'
                        }, children: ["Fill: ", args.fillType.charAt(0).toUpperCase() + args.fillType.slice(1), (args.fillType === 'linear-gradient' || args.fillType === 'radial-gradient' || args.fillType === 'conic-gradient') && ` (${args.gradientAngle}°)`, args.fillType === 'image' && ` (${args.imageScaleMode})`] })] }) }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive fill controls - experiment with different fill types including none, solid colors, gradients (linear, radial, conic), and images with comprehensive styling options.'
            }
        },
        controls: {
            exclude: ['position', 'autoLayout', 'size', 'fill', 'stroke', 'appearance', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
        }
    }
};
