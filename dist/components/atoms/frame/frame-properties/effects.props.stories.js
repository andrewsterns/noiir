import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from '../Frame';
const meta = {
    title: 'Frame/Properties/Effects',
    component: Frame,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Effects properties add visual enhancements to frames including shadows, blur effects, noise, and texture overlays.'
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
export const Effects = {
    args: {
        children: 'Effects Demo',
        size: { width: 280, height: 200 },
        fill: { type: 'solid', color: 'neutral1' },
        appearance: { radius: 16 },
        // Drop shadow defaults
        dropShadowEnabled: true,
        dropShadowX: 0,
        dropShadowY: 4,
        dropShadowBlur: 12,
        dropShadowSpread: 0,
        dropShadowColor: 'rgba(0, 0, 0, 0.15)',
        // Inner shadow defaults
        innerShadowEnabled: false,
        innerShadowX: 0,
        innerShadowY: 2,
        innerShadowBlur: 4,
        innerShadowSpread: 0,
        innerShadowColor: 'rgba(0, 0, 0, 0.1)',
        // Layer blur defaults
        layerBlurEnabled: false,
        layerBlurRadius: 4,
        // Background blur defaults
        backgroundBlurEnabled: false,
        backgroundBlurRadius: 8,
        // Noise defaults
        noiseEnabled: false,
        noiseIntensity: 0.1,
        noiseSeed: 1,
        // Texture defaults
        textureEnabled: false,
        textureUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=200&h=200&fit=crop',
        textureOpacity: 0.3,
        textureBlendMode: 'overlay'
    },
    argTypes: {
        children: {
            control: { type: 'text' },
            description: 'Frame content'
        },
        // Drop shadow controls
        dropShadowEnabled: {
            control: { type: 'boolean' },
            description: 'Enable drop shadow effect',
            table: { category: 'Drop Shadow' }
        },
        dropShadowX: {
            control: { type: 'range', min: -20, max: 20, step: 1 },
            description: 'Horizontal shadow offset in pixels',
            table: { category: 'Drop Shadow' },
            if: { arg: 'dropShadowEnabled', eq: true }
        },
        dropShadowY: {
            control: { type: 'range', min: -20, max: 20, step: 1 },
            description: 'Vertical shadow offset in pixels',
            table: { category: 'Drop Shadow' },
            if: { arg: 'dropShadowEnabled', eq: true }
        },
        dropShadowBlur: {
            control: { type: 'range', min: 0, max: 50, step: 1 },
            description: 'Shadow blur radius in pixels',
            table: { category: 'Drop Shadow' },
            if: { arg: 'dropShadowEnabled', eq: true }
        },
        dropShadowSpread: {
            control: { type: 'range', min: -10, max: 10, step: 1 },
            description: 'Shadow spread radius in pixels',
            table: { category: 'Drop Shadow' },
            if: { arg: 'dropShadowEnabled', eq: true }
        },
        dropShadowColor: {
            control: { type: 'color' },
            description: 'Shadow color (use rgba for transparency)',
            table: { category: 'Drop Shadow' },
            if: { arg: 'dropShadowEnabled', eq: true }
        },
        // Inner shadow controls
        innerShadowEnabled: {
            control: { type: 'boolean' },
            description: 'Enable inner shadow effect',
            table: { category: 'Inner Shadow' }
        },
        innerShadowX: {
            control: { type: 'range', min: -20, max: 20, step: 1 },
            description: 'Horizontal inner shadow offset in pixels',
            table: { category: 'Inner Shadow' },
            if: { arg: 'innerShadowEnabled', eq: true }
        },
        innerShadowY: {
            control: { type: 'range', min: -20, max: 20, step: 1 },
            description: 'Vertical inner shadow offset in pixels',
            table: { category: 'Inner Shadow' },
            if: { arg: 'innerShadowEnabled', eq: true }
        },
        innerShadowBlur: {
            control: { type: 'range', min: 0, max: 30, step: 1 },
            description: 'Inner shadow blur radius in pixels',
            table: { category: 'Inner Shadow' },
            if: { arg: 'innerShadowEnabled', eq: true }
        },
        innerShadowSpread: {
            control: { type: 'range', min: -10, max: 10, step: 1 },
            description: 'Inner shadow spread radius in pixels',
            table: { category: 'Inner Shadow' },
            if: { arg: 'innerShadowEnabled', eq: true }
        },
        innerShadowColor: {
            control: { type: 'color' },
            description: 'Inner shadow color (use rgba for transparency)',
            table: { category: 'Inner Shadow' },
            if: { arg: 'innerShadowEnabled', eq: true }
        },
        // Layer blur controls
        layerBlurEnabled: {
            control: { type: 'boolean' },
            description: 'Enable layer blur effect (blurs entire frame)',
            table: { category: 'Blur Effects' }
        },
        layerBlurRadius: {
            control: { type: 'range', min: 0, max: 20, step: 0.5 },
            description: 'Layer blur radius in pixels',
            table: { category: 'Blur Effects' },
            if: { arg: 'layerBlurEnabled', eq: true }
        },
        // Background blur controls
        backgroundBlurEnabled: {
            control: { type: 'boolean' },
            description: 'Enable background blur effect (glassmorphism)',
            table: { category: 'Blur Effects' }
        },
        backgroundBlurRadius: {
            control: { type: 'range', min: 0, max: 30, step: 1 },
            description: 'Background blur radius in pixels',
            table: { category: 'Blur Effects' },
            if: { arg: 'backgroundBlurEnabled', eq: true }
        },
        // Noise controls
        noiseEnabled: {
            control: { type: 'boolean' },
            description: 'Enable noise/grain effect',
            table: { category: 'Texture Effects' }
        },
        noiseIntensity: {
            control: { type: 'range', min: 0, max: 1, step: 0.05 },
            description: 'Noise intensity (0 = none, 1 = maximum)',
            table: { category: 'Texture Effects' },
            if: { arg: 'noiseEnabled', eq: true }
        },
        noiseSeed: {
            control: { type: 'range', min: 1, max: 100, step: 1 },
            description: 'Noise pattern seed (changes pattern)',
            table: { category: 'Texture Effects' },
            if: { arg: 'noiseEnabled', eq: true }
        },
        // Texture controls
        textureEnabled: {
            control: { type: 'boolean' },
            description: 'Enable texture overlay effect',
            table: { category: 'Texture Effects' }
        },
        textureUrl: {
            control: { type: 'text' },
            description: 'Texture image URL',
            table: { category: 'Texture Effects' },
            if: { arg: 'textureEnabled', eq: true }
        },
        textureOpacity: {
            control: { type: 'range', min: 0, max: 1, step: 0.05 },
            description: 'Texture opacity (0 = invisible, 1 = opaque)',
            table: { category: 'Texture Effects' },
            if: { arg: 'textureEnabled', eq: true }
        },
        textureBlendMode: {
            control: { type: 'select' },
            options: ['normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard-light'],
            description: 'How texture blends with background',
            table: { category: 'Texture Effects' },
            if: { arg: 'textureEnabled', eq: true }
        },
        // Hide other controls to focus on effects
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
        const activeEffects = [];
        if (args.dropShadowEnabled)
            activeEffects.push('Drop Shadow');
        if (args.innerShadowEnabled)
            activeEffects.push('Inner Shadow');
        if (args.layerBlurEnabled)
            activeEffects.push('Layer Blur');
        if (args.backgroundBlurEnabled)
            activeEffects.push('Background Blur');
        if (args.noiseEnabled)
            activeEffects.push('Noise');
        if (args.textureEnabled)
            activeEffects.push('Texture');
        return (_jsxs("div", { style: {
                backgroundColor: args.backgroundBlurEnabled ?
                    'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop) center/cover' :
                    '#F9FAFB',
                padding: '40px',
                borderRadius: '8px',
                position: 'relative'
            }, children: [args.backgroundBlurEnabled && (_jsx("div", { style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '8px'
                    } })), _jsxs(Frame, { size: args.size, fill: args.fill, appearance: args.appearance, autoLayout: {
                        flow: 'vertical',
                        alignment: 'center',
                        gap: 16,
                        padding: 24
                    }, style: {
                        // Apply effects as CSS since Frame doesn't have effects prop yet
                        ...(args.dropShadowEnabled && {
                            boxShadow: `${args.dropShadowX}px ${args.dropShadowY}px ${args.dropShadowBlur}px ${args.dropShadowSpread}px ${args.dropShadowColor}`
                        }),
                        ...(args.innerShadowEnabled && {
                            boxShadow: `inset ${args.innerShadowX}px ${args.innerShadowY}px ${args.innerShadowBlur}px ${args.innerShadowSpread}px ${args.innerShadowColor}`
                        }),
                        ...(args.layerBlurEnabled && {
                            filter: `blur(${args.layerBlurRadius}px)`
                        }),
                        ...(args.backgroundBlurEnabled && {
                            backdropFilter: `blur(${args.backgroundBlurRadius}px)`,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }),
                        ...(args.textureEnabled && {
                            backgroundImage: `url(${args.textureUrl})`,
                            backgroundBlendMode: args.textureBlendMode,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        })
                    }, children: [_jsx("div", { style: {
                                color: '#374151',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }, children: args.children }), _jsxs("div", { style: {
                                color: '#6B7280',
                                fontSize: '14px',
                                textAlign: 'center',
                                lineHeight: '1.4'
                            }, children: ["Active Effects: ", activeEffects.length > 0 ? activeEffects.join(', ') : 'None'] })] })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive effects controls - experiment with drop shadows, inner shadows, blur effects (layer & background), noise/grain, and texture overlays. Combine multiple effects to create sophisticated visual designs.'
            }
        },
        controls: {
            exclude: ['position', 'autoLayout', 'size', 'fill', 'stroke', 'appearance', 'effects', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave']
        }
    }
};
