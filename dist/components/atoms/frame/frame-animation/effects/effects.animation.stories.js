import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from '../../Frame';
const meta = {
    title: 'Frame/Animation/Effects',
    component: Frame,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Effects animation controls for Frame components - drop shadows, inner shadows, and blur transitions.'
            }
        }
    },
    argTypes: {
        children: {
            control: { type: 'text' },
            description: 'Child content'
        }
    },
    args: {
        children: 'Animated Effects',
        size: { width: 200, height: 120 },
        fill: { type: 'solid', color: 'primary6' },
        appearance: { radius: 8 }
    },
    tags: ['autodocs']
};
export default meta;
// Drop Shadow Animation Example
export const DropShadowAnimation = {
    args: {
        children: 'Hover to see drop shadow'
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates drop shadow animation on hover using the effects prop. The shadow appears and intensifies when hovering.'
            }
        }
    },
    render: (args) => (_jsx("div", { style: { padding: '40px' }, children: _jsx(Frame, { ...args, animate: {
                hover: {
                    effects: {
                        dropShadow: [{
                                x: 8,
                                y: 8,
                                blur: 16,
                                spread: 0,
                                color: 'rgba(0,0,0,0.2)'
                            }]
                    },
                    duration: '0.3s',
                    timing: 'ease'
                },
                click: {
                    effects: {
                        innerShadow: [{
                                x: 2,
                                y: 2,
                                blur: 6,
                                spread: 0,
                                color: 'rgba(0,0,0,0.15)'
                            }]
                    },
                    duration: '0.1s',
                    timing: 'ease-out'
                }
            }, style: { cursor: 'pointer' } }) }))
};
// Blur Animation Example
export const BlurAnimation = {
    args: {
        children: 'Click to blur/unblur'
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows blur effect animation on hover using the effects prop. The frame becomes blurred when hovered.'
            }
        }
    },
    render: (args) => (_jsx(Frame, { ...args, animate: {
            hover: {
                effects: {
                    layerBlur: {
                        radius: 6
                    }
                },
                duration: '0.5s',
                timing: 'ease'
            }
        }, style: { cursor: 'pointer' } }))
};
// Card Example with Shadow Effects
export const CardExample = {
    parameters: {
        docs: {
            description: {
                story: 'Card component with subtle shadow effects that intensify on hover using the effects prop - perfect for UI cards.'
            }
        }
    },
    render: () => (_jsx("div", { style: { padding: '50px', backgroundColor: '#f8fafc' }, children: _jsxs(Frame, { size: { width: 280, height: 160 }, fill: { type: 'solid', color: 'white' }, appearance: { radius: 12 }, autoLayout: {
                flow: 'vertical',
                alignment: 'center',
                padding: 24
            }, effects: {
                dropShadow: [{
                        x: 0,
                        y: 2,
                        blur: 8,
                        spread: 0,
                        color: 'rgba(0,0,0,0.04)'
                    }]
            }, animate: {
                hover: {
                    effects: {
                        dropShadow: [{
                                x: 0,
                                y: 8,
                                blur: 32,
                                spread: 0,
                                color: 'rgba(0,0,0,0.12)'
                            }]
                    },
                    position: {
                        y: -2
                    },
                    duration: '0.3s',
                    timing: 'ease'
                }
            }, style: { cursor: 'pointer' }, children: [_jsx("div", { style: {
                        color: '#374151',
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '8px'
                    }, children: "Hover Card" }), _jsx("div", { style: {
                        color: '#6b7280',
                        fontSize: '14px',
                        textAlign: 'center'
                    }, children: "Subtle shadow animation on hover" })] }) }))
};
// Multiple Effects Animation
export const MultipleEffects = {
    args: {
        children: 'Multiple shadow effects'
    },
    parameters: {
        docs: {
            description: {
                story: 'Combines multiple effect animations using the effects prop - shadow and glow effect on hover with layered shadows on click.'
            }
        }
    },
    render: (args) => (_jsx("div", { style: { padding: '50px', backgroundColor: '#f8fafc' }, children: _jsx(Frame, { ...args, animate: {
                hover: {
                    effects: {
                        dropShadow: [
                            {
                                x: 6,
                                y: 6,
                                blur: 20,
                                spread: 0,
                                color: 'rgba(59, 130, 246, 0.4)'
                            },
                            {
                                x: 0,
                                y: 0,
                                blur: 12,
                                spread: 2,
                                color: 'rgba(59, 130, 246, 0.1)'
                            }
                        ]
                    },
                    duration: '0.4s',
                    timing: 'ease'
                },
                click: {
                    effects: {
                        dropShadow: [{
                                x: 4,
                                y: 4,
                                blur: 14,
                                spread: 0,
                                color: 'rgba(59, 130, 246, 0.4)'
                            }]
                    },
                    duration: '0.2s',
                    timing: 'ease-out'
                }
            }, style: { cursor: 'pointer' } }) }))
};
