import { jsx as _jsx } from "react/jsx-runtime";
import { Frame } from '../../Frame';
const meta = {
    title: 'Frame/Animation/Position',
    component: Frame,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Position animation controls for Frame components - coordinate changes, rotation, and transform origin.'
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
        children: 'Animated Position',
        size: { width: 200, height: 120 },
        fill: { type: 'solid', color: 'primary6' },
        appearance: { radius: 8 }
    },
    tags: ['autodocs']
};
export default meta;
// Position Movement Animation
export const PositionMovement = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates position movement animation using animate={{ hover: { position: { x, y } } }}. Hover to move right 30px and up 20px, click to reset.'
            }
        }
    },
    render: (args) => (_jsx("div", { style: { padding: '100px', position: 'relative' }, children: _jsx(Frame, { ...args, animate: {
                hover: {
                    position: {
                        x: 30,
                        y: -20
                    },
                    duration: '0.4s',
                    timing: 'ease'
                },
                click: {
                    position: {
                        x: 0,
                        y: 0
                    },
                    duration: '0.2s',
                    timing: 'ease-out'
                }
            } }) }))
};
// Rotation Animation
export const RotationAnimation = {
    parameters: {
        docs: {
            description: {
                story: 'Shows rotation animation using animate={{ hover: { position: { rotation } } }}. Hover to rotate 25 degrees, click to reset.'
            }
        }
    },
    render: (args) => (_jsx("div", { style: { padding: '100px' }, children: _jsx(Frame, { ...args, animate: {
                hover: {
                    position: {
                        rotation: 25
                    },
                    duration: '0.5s',
                    timing: 'ease'
                },
                click: {
                    position: {
                        rotation: 0
                    },
                    duration: '0.3s',
                    timing: 'ease-out'
                }
            }, style: {
                transformOrigin: 'center'
            } }) }))
};
// Combined Position and Rotation
export const CombinedTransforms = {
    parameters: {
        docs: {
            description: {
                story: 'Combines position movement and rotation using animate={{ hover: { position: { x, y, rotation } } }}. Hover for combined transform, click to reset.'
            }
        }
    },
    render: (args) => (_jsx("div", { style: { padding: '100px' }, children: _jsx(Frame, { ...args, animate: {
                hover: {
                    position: {
                        x: 25,
                        y: -15,
                        rotation: 12
                    },
                    duration: '0.4s',
                    timing: 'ease'
                },
                click: {
                    position: {
                        x: 0,
                        y: 0,
                        rotation: 0
                    },
                    duration: '0.2s',
                    timing: 'ease-out'
                }
            }, style: {
                transformOrigin: 'center'
            } }) }))
};
