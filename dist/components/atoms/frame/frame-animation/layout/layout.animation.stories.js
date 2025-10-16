import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Frame } from '../../Frame';
const meta = {
    title: 'Frame/Animation/Layout',
    component: Frame,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Layout animation controls for Frame components - flow changes, alignment shifts, and size transitions.'
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
        children: 'Layout Animation',
        size: { width: 200, height: 120 },
        fill: { type: 'solid', color: 'primary6' },
        appearance: { radius: 8 }
    },
    tags: ['autodocs']
};
export default meta;
// Size Animation Example
export const SizeAnimation = {
    args: {
        children: 'Hover to resize'
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates size animation on hover. The frame expands to larger dimensions.'
            }
        }
    },
    render: (args) => (_jsx("div", { style: { padding: '50px' }, children: _jsx(Frame, { ...args, animate: {
                hover: {
                    size: {
                        width: 280,
                        height: 160
                    },
                    duration: '0.5s',
                    timing: 'ease'
                }
            } }) }))
};
// Auto Layout Flow Example (Simulated)
export const AutoLayoutFlow = {
    parameters: {
        docs: {
            description: {
                story: 'Shows how auto-layout children would animate when flow direction changes from horizontal to vertical.'
            }
        }
    },
    render: (args) => {
        const [isVertical, setIsVertical] = React.useState(false);
        return (_jsxs("div", { style: { padding: '50px' }, children: [_jsxs(Frame, { size: { width: 300, height: 200 }, fill: { type: 'solid', color: 'neutral2' }, appearance: { radius: 12 }, autoLayout: {
                        flow: isVertical ? 'vertical' : 'horizontal',
                        alignment: 'center',
                        gap: 12,
                        padding: 20
                    }, onClick: () => setIsVertical(!isVertical), style: {
                        cursor: 'pointer',
                        transition: 'all 0.4s ease'
                    }, children: [_jsx(Frame, { size: { width: 80, height: 40 }, fill: { type: 'solid', color: 'primary6' }, appearance: { radius: 6 }, style: { transition: 'all 0.4s ease' }, children: _jsx("div", { style: { padding: '8px', color: 'white', fontSize: '12px', textAlign: 'center' }, children: "Box 1" }) }), _jsx(Frame, { size: { width: 80, height: 40 }, fill: { type: 'solid', color: 'success6' }, appearance: { radius: 6 }, style: { transition: 'all 0.4s ease' }, children: _jsx("div", { style: { padding: '8px', color: 'white', fontSize: '12px', textAlign: 'center' }, children: "Box 2" }) }), _jsx(Frame, { size: { width: 80, height: 40 }, fill: { type: 'solid', color: 'warning6' }, appearance: { radius: 6 }, style: { transition: 'all 0.4s ease' }, children: _jsx("div", { style: { padding: '8px', color: 'white', fontSize: '12px', textAlign: 'center' }, children: "Box 3" }) })] }), _jsx("p", { style: { marginTop: '20px', textAlign: 'center', color: '#666' }, children: "Click to toggle between horizontal and vertical flow" })] }));
    }
};
// Responsive Size Animation
export const ResponsiveSize = {
    args: {
        children: 'Click to expand'
    },
    parameters: {
        docs: {
            description: {
                story: 'Responsive size animation that adapts to different screen sizes or container constraints.'
            }
        }
    },
    render: (args) => {
        const [isExpanded, setIsExpanded] = React.useState(false);
        return (_jsx("div", { style: { padding: '50px' }, children: _jsx(Frame, { ...args, size: {
                    width: isExpanded ? 400 : 200,
                    height: isExpanded ? 250 : 120
                }, fill: { type: 'linear-gradient', angle: 45, stops: [
                        { color: 'primary3', position: 0 },
                        { color: 'primary8', position: 1 }
                    ] }, appearance: { radius: isExpanded ? 16 : 8 }, onClick: () => setIsExpanded(!isExpanded), style: {
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                }, children: _jsx("div", { style: {
                        padding: '20px',
                        color: 'white',
                        textAlign: 'center',
                        fontSize: isExpanded ? '18px' : '14px',
                        transition: 'font-size 0.3s ease'
                    }, children: isExpanded ? 'Expanded Layout' : 'Click to Expand' }) }) }));
    }
};
