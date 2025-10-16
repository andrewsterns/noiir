import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from '../Frame';
import { DEFAULT_TRANSITIONS } from './core';
const meta = {
    title: 'Frame/Animation/Combined',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Combined animation examples showing multiple animation types working together. For specific animation controls, see individual animation category stories.',
            },
        },
    },
    argTypes: {
        // Layout Controls
        width: {
            control: { type: 'range', min: 80, max: 400, step: 10 },
            description: 'Frame width',
            table: { category: 'Layout' }
        },
        height: {
            control: { type: 'range', min: 40, max: 300, step: 10 },
            description: 'Frame height',
            table: { category: 'Layout' }
        },
        layoutFlow: {
            control: 'select',
            options: ['vertical', 'horizontal', 'freeform'],
            description: 'Layout direction',
            table: { category: 'Layout' }
        },
        layoutAlignment: {
            control: 'select',
            options: ['top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'],
            description: 'Content alignment',
            table: { category: 'Layout' }
        },
        padding: {
            control: { type: 'range', min: 0, max: 40, step: 4 },
            description: 'Internal padding',
            table: { category: 'Layout' }
        },
        // Appearance Controls
        radius: {
            control: { type: 'range', min: 0, max: 30, step: 2 },
            description: 'Corner radius',
            table: { category: 'Appearance' }
        },
        opacity: {
            control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
            description: 'Frame opacity',
            table: { category: 'Appearance' }
        },
        backgroundColor: {
            control: 'color',
            description: 'Background color',
            table: { category: 'Appearance' }
        },
        borderColor: {
            control: 'color',
            description: 'Border color (optional)',
            table: { category: 'Appearance' }
        },
        borderWeight: {
            control: { type: 'range', min: 0, max: 8, step: 1 },
            description: 'Border thickness',
            table: { category: 'Appearance' }
        },
        // Typography Controls
        textColor: {
            control: 'color',
            description: 'Text color',
            table: { category: 'Typography' }
        },
        fontSize: {
            control: { type: 'range', min: 10, max: 28, step: 2 },
            description: 'Font size',
            table: { category: 'Typography' }
        },
        fontWeight: {
            control: 'select',
            options: [300, 400, 500, 600, 700],
            mapping: { Light: 300, Normal: 400, Medium: 500, Semibold: 600, Bold: 700 },
            description: 'Font weight',
            table: { category: 'Typography' }
        },
        textAlign: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Text alignment',
            table: { category: 'Typography' }
        },
        // Animation Controls
        animationPreset: {
            control: 'select',
            options: ['custom', 'subtle', 'bouncy', 'smooth', 'sharp'],
            description: 'Animation style preset',
            table: { category: 'Animation' }
        },
        hoverScale: {
            control: { type: 'range', min: 0.9, max: 1.2, step: 0.02 },
            description: 'Hover scale factor',
            table: { category: 'Animation' }
        },
        hoverColorShift: {
            control: 'boolean',
            description: 'Change color on hover',
            table: { category: 'Animation' }
        },
        clickScale: {
            control: { type: 'range', min: 0.8, max: 1.0, step: 0.02 },
            description: 'Click scale factor',
            table: { category: 'Animation' }
        },
        enableHover: {
            control: 'boolean',
            description: 'Enable hover effects',
            table: { category: 'Animation' }
        },
        enableClick: {
            control: 'boolean',
            description: 'Enable click effects',
            table: { category: 'Animation' }
        },
        disabled: {
            control: 'boolean',
            description: 'Disable all interactions',
            table: { category: 'Animation' }
        },
        // Content
        children: {
            control: 'text',
            description: 'Frame content',
            table: { category: 'Content' }
        }
    },
    tags: ['autodocs'],
};
export default meta;
// Helper function to get transition based on preset
const getTransitionForPreset = (preset) => {
    switch (preset) {
        case 'subtle': return DEFAULT_TRANSITIONS.slow;
        case 'bouncy': return DEFAULT_TRANSITIONS.bounce;
        case 'smooth': return DEFAULT_TRANSITIONS.spring;
        case 'sharp': return DEFAULT_TRANSITIONS.fast;
        default: return DEFAULT_TRANSITIONS.normal;
    }
};
// Helper function to darken color for hover
const darkenColor = (color) => {
    // Simple color darkening - in a real app you'd use a proper color library
    if (color.startsWith('#')) {
        const hex = color.slice(1);
        const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - 30);
        const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - 30);
        const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - 30);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    return color;
};
// Custom render function to convert flat controls to component props
const renderWithControls = (args) => {
    const { width = 200, height = 100, layoutFlow = 'vertical', layoutAlignment = 'center', padding = 20, radius = 8, opacity = 1, backgroundColor = '#3b82f6', borderColor, borderWeight = 0, textColor = 'white', fontSize = 16, fontWeight = 500, textAlign = 'center', animationPreset = 'custom', hoverScale = 1.05, hoverColorShift = true, clickScale = 0.95, enableHover = true, enableClick = true, disabled = false, children = 'Interactive Frame' } = args;
    // Debug logging
    console.log('Story Args:', { enableClick, clickScale, hoverScale, disabled });
    // Build component props from controls
    const componentProps = {
        size: { width, height },
        appearance: { radius, opacity },
        fill: { type: 'solid', color: backgroundColor },
        ...(borderColor && borderWeight > 0 && {
            stroke: { color: borderColor, weight: borderWeight }
        }),
        typography: {
            color: textColor,
            fontSize,
            fontWeight,
            textAlign: textAlign
        },
        autoLayout: {
            flow: layoutFlow,
            alignment: layoutAlignment,
            padding
        },
        animate: {
            ...(enableHover && {
                hover: {
                    size: { width: width * hoverScale, height: height * hoverScale },
                    ...(hoverColorShift && {
                        fill: { type: 'solid', color: darkenColor(backgroundColor) }
                    }),
                    appearance: { opacity: opacity * 0.9 }
                }
            }),
            ...(enableClick && {
                click: {
                    size: { width: width * clickScale, height: height * clickScale }
                }
            }),
            duration: getTransitionForPreset(animationPreset).split(' ')[1] || '0.2s',
            timing: getTransitionForPreset(animationPreset).split(' ')[2] || 'ease-out'
        },
        children
    };
    return (_jsxs("div", { style: { position: 'relative' }, children: [_jsx(Frame, { ...componentProps }), _jsxs("div", { style: {
                    position: 'absolute',
                    bottom: -30,
                    left: 0,
                    fontSize: 10,
                    color: '#666',
                    pointerEvents: 'none'
                }, children: ["Hover: ", hoverScale, "x | Click: ", clickScale, "x | Enabled: ", enableClick ? 'YES' : 'NO'] })] }));
};
export const Interactive = {
    render: renderWithControls,
    args: {
        width: 200,
        height: 100,
        layoutFlow: 'vertical',
        layoutAlignment: 'center',
        padding: 20,
        radius: 12, // Consistent radius
        opacity: 1,
        backgroundColor: '#3b82f6',
        textColor: 'white',
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center',
        animationPreset: 'smooth',
        hoverScale: 1.05,
        hoverColorShift: true,
        clickScale: 0.93, // More noticeable click effect
        enableHover: true,
        enableClick: true,
        disabled: false,
        children: 'Interactive Frame'
    },
};
export const Button = {
    render: () => (_jsx(Frame, { size: { width: 160, height: 60 }, appearance: { radius: 12, opacity: 1 }, fill: { type: 'solid', color: 'success7' }, typography: {
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            textAlign: 'center'
        }, autoLayout: {
            flow: 'vertical',
            alignment: 'center',
            padding: 16
        }, animate: {
            hover: {
                fill: { type: 'solid', color: '#059669' }, // darker green on hover
                size: { width: 166, height: 62 },
                duration: '0.2s',
                timing: 'ease-out'
            },
            toggle: {
                fill: { type: 'solid', color: '#eab308' }, // yellow when toggled
                duration: '0.2s',
                timing: 'ease-out'
            }
        }, children: "Click Me" })),
    parameters: {
        docs: {
            description: {
                story: 'Button that toggles from green (#10b981) to yellow (#eab308) on click. Green hovers to darker green (#059669). Uses built-in toggle animation system.'
            }
        }
    }
};
export const Card = {
    render: renderWithControls,
    args: {
        width: 280,
        height: 160,
        layoutFlow: 'vertical',
        layoutAlignment: 'center',
        padding: 24,
        radius: 12, // Consistent radius (reduced from 16)
        opacity: 1,
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWeight: 1,
        textColor: '#374151',
        fontSize: 16,
        fontWeight: 400,
        textAlign: 'center',
        animationPreset: 'bouncy',
        hoverScale: 1.02,
        hoverColorShift: false,
        clickScale: 0.96, // More noticeable click effect
        enableHover: true,
        enableClick: true,
        disabled: false,
        children: 'Hover Card'
    },
};
export const Disabled = {
    render: renderWithControls,
    args: {
        width: 180,
        height: 80,
        layoutFlow: 'vertical',
        layoutAlignment: 'center',
        padding: 20,
        radius: 12, // Consistent radius
        opacity: 0.6,
        backgroundColor: '#9ca3af',
        textColor: '#6b7280',
        fontSize: 14,
        fontWeight: 400,
        textAlign: 'center',
        animationPreset: 'subtle',
        hoverScale: 1.0,
        hoverColorShift: false,
        clickScale: 1.0,
        enableHover: false,
        enableClick: false,
        disabled: true,
        children: 'Disabled State'
    },
};
export const FlowAnimation = {
    render: () => (_jsxs(Frame, { size: { width: 300, height: 200 }, appearance: { radius: 12 }, fill: { type: 'solid', color: '#3b82f6' }, autoLayout: { flow: 'horizontal', alignment: 'center', padding: 20, gap: 10 }, animate: {
            layoutAnimation: {
                toggle: {
                    flow: {
                        to: 'vertical'
                    },
                    spacing: {
                        gap: {
                            to: 16
                        },
                        padding: {
                            to: 24
                        }
                    }
                }
            },
            toggle: {
                size: { height: 300 }, // Still use regular animation for size changes
                duration: '0.5s',
                timing: 'ease-out'
            }
        }, children: [_jsx(Frame, { appearance: { radius: 6 }, fill: { type: 'solid', color: 'primary4' }, typography: {
                    color: '#374151',
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: 'center'
                }, autoLayout: {
                    flow: 'vertical',
                    alignment: 'center',
                    padding: 12
                }, children: "Item 1" }), _jsx(Frame, { appearance: { radius: 6 }, fill: { type: 'solid', color: 'primary3' }, typography: {
                    color: '#374151',
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: 'center'
                }, autoLayout: {
                    flow: 'vertical',
                    alignment: 'center',
                    padding: 12
                }, children: "Item 2" }), _jsx(Frame, { appearance: { radius: 6 }, fill: { type: 'solid', color: 'primary1' }, typography: {
                    color: '#374151',
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: 'center'
                }, autoLayout: {
                    flow: 'vertical',
                    alignment: 'center',
                    padding: 12
                }, children: "Item 3" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Click to toggle between horizontal and vertical layout flow with animated layout transitions. Uses the new layoutAnimation system for smooth flow and spacing changes.'
            }
        }
    }
};
export const LayoutHoverAnimation = {
    render: () => (_jsxs(Frame, { size: { width: 280, height: 120 }, appearance: { radius: 8 }, fill: { type: 'solid', color: '#f8fafc' }, stroke: { weight: 2, color: '#e2e8f0' }, autoLayout: { flow: 'horizontal', alignment: 'center', padding: 16, gap: 12 }, animate: {
            layoutAnimation: {
                hover: {
                    flow: {
                        to: 'vertical'
                    },
                    alignment: {
                        to: 'top-left'
                    },
                    spacing: {
                        gap: {
                            to: 20
                        }
                    }
                }
            }
        }, children: [_jsx(Frame, { size: { width: 32, height: 32 }, appearance: { radius: 16 }, fill: { type: 'solid', color: '#ef4444' } }), _jsx(Frame, { size: { width: 32, height: 32 }, appearance: { radius: 16 }, fill: { type: 'solid', color: '#10b981' } }), _jsx(Frame, { size: { width: 32, height: 32 }, appearance: { radius: 16 }, fill: { type: 'solid', color: '#3b82f6' } })] })),
    parameters: {
        docs: {
            description: {
                story: 'Hover to see layout animation from horizontal center to vertical top-left alignment with increased gap spacing.'
            }
        }
    }
};
