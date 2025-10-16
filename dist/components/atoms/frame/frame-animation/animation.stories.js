import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Frame } from '../Frame';
export default {
    title: 'Frame/Animation',
    component: Frame,
    parameters: {
        docs: {
            description: {
                component: 'Frame animation system with Figma-like interactions. Click, hover, and see smooth transitions between variants.',
            },
        },
    },
};
// Common variants for all stories
const buttonVariants = {
    default: {
        autoLayout: { flow: 'horizontal', alignment: 'center', padding: 8, width: 120, height: 40 },
        fill: { type: 'solid', color: 'neutral2' },
        stroke: { type: 'solid', color: 'neutral4', width: 1 },
        appearance: { radius: 6 },
        typography: { fontSize: 14, fontWeight: 500, color: 'neutral9' }
    },
    hover: {
        autoLayout: { flow: 'horizontal', alignment: 'center', padding: 8, width: 120, height: 40 },
        fill: { type: 'solid', color: 'neutral3' },
        stroke: { type: 'solid', color: 'neutral5', width: 1 },
        appearance: { radius: 6 },
        typography: { fontSize: 14, fontWeight: 500, color: 'neutral10' }
    },
    active: {
        autoLayout: { flow: 'horizontal', alignment: 'center', padding: 8, width: 120, height: 40 },
        fill: { type: 'solid', color: 'primary6' },
        stroke: { type: 'solid', color: 'primary7', width: 1 },
        appearance: { radius: 6 },
        typography: { fontSize: 14, fontWeight: 500, color: 'white' }
    },
    success: {
        autoLayout: { flow: 'horizontal', alignment: 'center', padding: 8, width: 120, height: 40 },
        fill: { type: 'solid', color: 'success6' },
        stroke: { type: 'solid', color: 'success7', width: 1 },
        appearance: { radius: 6 },
        typography: { fontSize: 14, fontWeight: 500, color: 'white' }
    },
    danger: {
        autoLayout: { flow: 'horizontal', alignment: 'center', padding: 8, width: 120, height: 40 },
        fill: { type: 'solid', color: 'error6' },
        stroke: { type: 'solid', color: 'error7', width: 1 },
        appearance: { radius: 6 },
        typography: { fontSize: 14, fontWeight: 500, color: 'white' }
    },
};
// Variants for hover animation (only override on hover)
const hoverVariants = {
    default: {}, // Empty - use Frame's own properties
    hover: {
        fill: { type: 'solid', color: 'neutral3' },
        stroke: { type: 'solid', color: 'neutral5', weight: 1 },
        typography: { fontSize: 14, fontWeight: 500, color: 'neutral10' }
    }
};
const cardVariants = {
    default: {
        fill: { type: 'solid', color: 'white' },
        stroke: { type: 'solid', color: 'neutral3', width: 1 },
        effects: { dropShadow: [{ x: 0, y: 2, blur: 4, color: 'neutral12' }] }
    },
    hover: {
        fill: { type: 'solid', color: 'white' },
        stroke: { type: 'solid', color: 'neutral4', width: 1 },
        effects: { dropShadow: [{ x: 0, y: 4, blur: 8, color: '#0000004d' }] }
    },
    active: {
        fill: { type: 'solid', color: '#eff6ff' },
        stroke: { type: 'solid', color: '#3b82f6', width: 2 },
        effects: { dropShadow: [{ x: 0, y: 6, blur: 12, color: '#3b82f640' }] }
    },
};
export const BasicClickAnimation = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "Click to Change Color" }), _jsx(Frame, { variant: "default", autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 40 }, appearance: { radius: 6 }, animate: {
                variants: buttonVariants,
                trigger: 'onClick',
                action: 'changeTo',
                destination: 'active',
                animation: 'dissolve',
                duration: 200,
            }, children: "Click Me" })] }));
export const HoverAnimation = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "Hover to Change (with revert)" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 40 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 6 }, typography: { fontSize: 14, fontWeight: 500, color: '#374151' }, animate: {
                variants: hoverVariants,
                trigger: 'onHover',
                action: 'changeTo',
                destination: 'hover',
                animation: 'dissolve',
                duration: 150,
            }, children: "Hover Me" })] }));
export const CardHoverEffect = () => (_jsxs("div", { style: { padding: 20 }, children: [_jsx("h3", { children: "Card Hover Effect" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 300, height: 150 }, fill: { type: 'solid', color: '#ffffff' }, stroke: { color: '#e5e7eb', weight: 1 }, appearance: { radius: 8 }, effects: { dropShadow: [{ x: 0, y: 2, blur: 8, color: 'rgba(0,0,0,0.1)' }] }, position: { x: 0, y: 0 }, animate: {
                variants: cardVariants,
                trigger: 'onHover',
                action: 'changeTo',
                destination: 'hover',
                animation: 'smart',
                duration: 300,
            }, children: _jsxs(Frame, { autoLayout: { flow: 'vertical', alignment: 'center', gap: 8, width: '100%', height: 'auto' }, children: [_jsx(Frame, { typography: { fontSize: 18, fontWeight: 600, color: '#374151' }, children: "Interactive Card" }), _jsx(Frame, { typography: { fontSize: 14, color: '#6b7280' }, children: "Hover for effect" })] }) })] }));
export const ButtonStateCycle = () => {
    // Custom action that cycles through states without external state management
    const cycleAction = (context) => {
        const variantNames = Object.keys(context.variants);
        const currentIndex = variantNames.indexOf(context.currentVariant);
        const nextIndex = (currentIndex + 1) % variantNames.length;
        return { variant: variantNames[nextIndex] };
    };
    return (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "State Cycle Button (Custom Action)" }), _jsx("p", { children: "Click to cycle through states automatically using a custom action function" }), _jsx(Frame, { variant: "default", autoLayout: { flow: 'horizontal', alignment: 'center', width: 140, height: 40 }, appearance: { radius: 6 }, animate: {
                    variants: buttonVariants,
                    trigger: 'onClick',
                    action: cycleAction, // ← Custom function that cycles variants
                    animation: 'dissolve',
                    duration: 250,
                }, children: "Cycle States" })] }));
};
export const DifferentAnimationTypes = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }, children: [_jsx("h3", { children: "Different Animation Types" }), _jsxs("div", { style: { display: 'flex', gap: 16, flexWrap: 'wrap' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Dissolve" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 100, height: 36 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 4 }, typography: { fontSize: 14, fontWeight: 500, color: '#374151' }, variant: "default", animate: {
                                variants: buttonVariants,
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'active',
                                animation: 'dissolve',
                                duration: 300,
                            }, children: "Dissolve" })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Smart" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 100, height: 36 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 4 }, typography: { fontSize: 14, fontWeight: 500, color: '#374151' }, variant: "default", animate: {
                                variants: buttonVariants,
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'success',
                                animation: 'smart',
                                duration: 400,
                            }, children: "Smart" })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Instant" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 100, height: 36 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 4 }, typography: { fontSize: 14, fontWeight: 500, color: '#374151' }, variant: "default", animate: {
                                variants: buttonVariants,
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'danger',
                                animation: 'instant',
                            }, children: "Instant" })] })] })] }));
export const InteractiveDemo = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const demoVariants = {
        idle: {
            fill: { type: 'solid', color: '#f3f4f6' },
            stroke: { type: 'solid', color: '#d1d5db', width: 1 },
            typography: { fontSize: 14, fontWeight: 400, color: '#6b7280' }
        },
        selected: {
            fill: { type: 'solid', color: '#dbeafe' },
            stroke: { type: 'solid', color: '#3b82f6', width: 2 },
            typography: { fontSize: 14, fontWeight: 600, color: '#1d4ed8' }
        },
    };
    const buttons = [
        { id: 'home', label: 'Home' },
        { id: 'profile', label: 'Profile' },
        { id: 'settings', label: 'Settings' },
        { id: 'help', label: 'Help' },
    ];
    return (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }, children: [_jsx("h3", { children: "Interactive Navigation Demo" }), _jsxs("p", { children: ["Selected: ", _jsx("strong", { children: selectedButton || 'None' })] }), _jsx("div", { style: { display: 'flex', gap: 12 }, children: buttons.map((button) => (_jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', padding: { left: 16, right: 16, top: 8, bottom: 8 }, width: 'auto', height: 36 }, appearance: { radius: 6 }, variant: selectedButton === button.id ? 'selected' : 'idle', animate: {
                        variants: demoVariants,
                        trigger: 'onClick',
                        action: 'changeTo',
                        destination: selectedButton === button.id ? 'idle' : 'selected',
                        animation: 'dissolve',
                        duration: 200,
                    }, onClick: () => setSelectedButton(selectedButton === button.id ? null : button.id), children: button.label }, button.id))) })] }));
};
export const ClickCounter = () => {
    const [clickCount, setClickCount] = useState(0);
    // Custom action that counts clicks and changes appearance based on count
    const counterAction = (context) => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        // Determine variant based on click count
        let variant = 'default';
        if (newCount >= 10)
            variant = 'success';
        else if (newCount >= 5)
            variant = 'active';
        else if (newCount >= 1)
            variant = 'hover';
        return { variant };
    };
    const counterVariants = {
        default: {
            fill: { type: 'solid', color: '#f3f4f6' },
            stroke: { type: 'solid', color: '#d1d5db', width: 1 },
            typography: { fontSize: 14, fontWeight: 500, color: '#374151' }
        },
        hover: {
            fill: { type: 'solid', color: '#e5e7eb' },
            stroke: { type: 'solid', color: '#9ca3af', width: 1 },
            typography: { fontSize: 14, fontWeight: 500, color: '#111827' }
        },
        active: {
            fill: { type: 'solid', color: '#dbeafe' },
            stroke: { type: 'solid', color: '#3b82f6', width: 2 },
            typography: { fontSize: 14, fontWeight: 600, color: '#1d4ed8' }
        },
        success: {
            fill: { type: 'solid', color: '#d1fae5' },
            stroke: { type: 'solid', color: '#10b981', width: 2 },
            typography: { fontSize: 14, fontWeight: 600, color: '#047857' }
        }
    };
    return (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "Click Counter with Custom Action" }), _jsx("p", { children: "Click the button to count clicks. It changes appearance based on count!" }), _jsxs("p", { children: ["Current count: ", _jsx("strong", { children: clickCount })] }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 160, height: 40 }, appearance: { radius: 6 }, animate: {
                    variants: counterVariants,
                    trigger: 'onClick',
                    action: counterAction, // ← Custom function that counts and determines variant
                    animation: 'dissolve',
                    duration: 200,
                }, children: "Click to Count!" })] }));
};
export const CursorDemo = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }, children: [_jsx("h3", { children: "Automatic Cursor Detection" }), _jsx("p", { children: "Frames with interactive triggers automatically get pointer cursors" }), _jsxs("div", { style: { display: 'flex', gap: 16, flexWrap: 'wrap' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Click Trigger (pointer cursor)" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 40 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 6 }, animate: {
                                variants: buttonVariants,
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'active',
                                animation: 'dissolve',
                                duration: 200,
                            }, children: "Click Me" })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Hover Trigger (pointer cursor)" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 40 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 6 }, animate: {
                                variants: hoverVariants,
                                trigger: 'onHover',
                                action: 'changeTo',
                                destination: 'hover',
                                animation: 'dissolve',
                                duration: 150,
                            }, children: "Hover Me" })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Manual Cursor Override (grab)" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 40 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 6 }, animate: {
                                variants: buttonVariants,
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'active',
                                animation: 'dissolve',
                                duration: 200,
                                cursor: 'grab', // Manual override
                            }, children: "Grab Me" })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "No Trigger (default cursor)" }), _jsx(Frame, { autoLayout: { width: 120, height: 40, flow: 'horizontal', alignment: 'center' }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 6 }, children: "Static" })] })] })] }));
export const PolymorphicFrame = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }, children: [_jsx("h3", { children: "Polymorphic Frame - Render as Different Elements" }), _jsx("p", { children: "Use the 'as' prop to render Frame as any HTML element" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16 }, children: [_jsx("label", { style: { minWidth: 120 }, children: "Default (div):" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 4 }, animate: {
                                variants: buttonVariants,
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'active',
                                animation: 'dissolve',
                                duration: 200,
                            }, children: "I'm a div" })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16 }, children: [_jsx("label", { style: { minWidth: 120 }, children: "As button:" }), _jsx(Frame, { as: "button", autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 4 }, animate: {
                                variants: buttonVariants,
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'active',
                                animation: 'dissolve',
                                duration: 200,
                            }, children: "I'm a button" })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16 }, children: [_jsx("label", { style: { minWidth: 120 }, children: "As span:" }), _jsx(Frame, { as: "span", autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, fill: { type: 'solid', color: '#f3f4f6' }, stroke: { color: '#d1d5db', weight: 1 }, appearance: { radius: 4 }, animate: {
                                variants: buttonVariants,
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'active',
                                animation: 'dissolve',
                                duration: 200,
                            }, children: "I'm a span" })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16 }, children: [_jsx("label", { style: { minWidth: 120 }, children: "As section:" }), _jsx(Frame, { as: "section", autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 50 }, fill: { type: 'solid', color: '#f0f9ff' }, stroke: { color: '#0ea5e9', weight: 1 }, appearance: { radius: 6 }, animate: {
                                variants: {
                                    default: { fill: { type: 'solid', color: '#f0f9ff' } },
                                    active: { fill: { type: 'solid', color: '#e0f2fe' } }
                                },
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'active',
                                animation: 'dissolve',
                                duration: 300,
                            }, children: "I'm a section element" })] })] })] }));
