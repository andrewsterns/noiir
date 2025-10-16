import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from './Frame';
export const FlowAnimationTest = () => {
    return (_jsxs("div", { style: { padding: '40px' }, children: [_jsx("h3", { children: "Click to toggle between horizontal and vertical flow" }), _jsxs(Frame, { size: { width: 400, height: 150 }, appearance: { radius: 16 }, fill: { type: 'solid', color: '#3b82f6' }, autoLayout: {
                    flow: 'horizontal', // Base: horizontal layout
                    alignment: 'center',
                    padding: 24,
                    gap: 16
                }, animate: {
                    toggle: {
                        autoLayout: { flow: 'vertical' }, // Toggle: change to vertical (persistent)
                        size: { height: 250 }, // Adjust height for vertical
                        duration: '0.4s',
                        timing: 'ease-out'
                    }
                }, children: [_jsx("div", { style: {
                            background: 'white',
                            padding: '16px 20px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1f2937'
                        }, children: "First Item" }), _jsx("div", { style: {
                            background: 'white',
                            padding: '16px 20px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1f2937'
                        }, children: "Second Item" }), _jsx("div", { style: {
                            background: 'white',
                            padding: '16px 20px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1f2937'
                        }, children: "Third Item" })] }), _jsxs("p", { style: { marginTop: '20px', fontSize: '14px', color: '#666' }, children: ["This demonstrates persistent toggle animation:", _jsxs("code", { style: { background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px' }, children: ["animate=", `{ toggle: { autoLayout: { flow: 'vertical' } } }`] }), _jsx("br", {}), "Click once to switch to vertical, click again to switch back to horizontal!"] })] }));
};
