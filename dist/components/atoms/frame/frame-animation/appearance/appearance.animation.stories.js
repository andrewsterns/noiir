import { jsx as _jsx } from "react/jsx-runtime";
import { Frame } from '../../Frame';
const meta = {
    title: 'Frame/Animation/Appearance',
    component: Frame,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Appearance animation controls for Frame components - opacity, radius, visibility, and blend mode transitions.'
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
        children: 'Animated Frame',
        size: { width: 200, height: 120 },
        fill: { type: 'solid', color: 'primary6' }
    },
    tags: ['autodocs']
};
export default meta;
// Opacity Animation Example
export const OpacityAnimation = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates opacity animation using animate={{ hover: { appearance: { opacity } } }}. Hover to fade to 50%, click to restore full opacity.'
            }
        }
    },
    render: (args) => (_jsx(Frame, { ...args, animate: {
            hover: {
                appearance: { opacity: 0.5 },
                duration: '0.5s',
                timing: 'ease'
            },
            click: {
                appearance: { opacity: 1 },
                duration: '0.2s',
                timing: 'ease-out'
            }
        } }))
};
// Radius Animation Example
export const RadiusAnimation = {
    args: {
        appearance: {
            radius: 4
        },
        fill: { type: 'solid', color: '#ff6b35' },
        children: 'Hover to see radius animation'
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows border-radius animation on hover. The frame corners animate from sharp to rounded.'
            }
        }
    },
    render: (args) => (_jsx(Frame, { ...args, animate: {
            hover: {
                appearance: { radius: 20 },
                duration: '0.3s',
                timing: 'ease'
            }
        } }))
};
// Button Example with Appearance Animations
export const ButtonExample = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive button example using appearance animations - hover effects with opacity and radius changes.'
            }
        }
    },
    render: () => (_jsx(Frame, { size: { width: 160, height: 60 }, appearance: { radius: 8, opacity: 1 }, fill: { type: 'solid', color: 'success6' }, typography: {
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
                appearance: { radius: 12, opacity: 0.9 },
                fill: { type: 'solid', color: 'success8' },
                duration: '0.2s',
                timing: 'ease-out'
            },
            click: {
                appearance: { radius: 6 },
                duration: '0.1s',
                timing: 'ease-out'
            }
        }, children: "Hover Button" }))
};
// Combined Appearance Animations
export const CombinedAppearance = {
    args: {
        appearance: {
            opacity: 0.7,
            radius: 8
        },
        fill: { type: 'solid', color: '#35b7ff' },
        children: 'Hover for combined animations'
    },
    parameters: {
        docs: {
            description: {
                story: 'Combines multiple appearance animations - opacity and radius change simultaneously on hover.'
            }
        }
    },
    render: (args) => (_jsx(Frame, { ...args, animate: {
            hover: {
                appearance: {
                    opacity: 1,
                    radius: 24
                },
                duration: '0.3s',
                timing: 'ease'
            }
        } }))
};
