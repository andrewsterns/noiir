import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from './Frame';
export const DeepMergeExample = () => {
    return (_jsxs("div", { style: { display: 'flex', gap: '20px', padding: '20px', flexDirection: 'column' }, children: [_jsx("h3", { children: "Property Preservation in Animations" }), _jsxs("div", { style: { display: 'flex', gap: '20px' }, children: [_jsx(Frame, { size: { width: 120, height: 80 }, fill: { type: 'solid', color: '#3b82f6' }, appearance: { radius: 16, opacity: 1 }, typography: { color: 'white', fontSize: 12, textAlign: 'center' }, autoLayout: { flow: 'vertical', alignment: 'center', padding: 12 }, animate: {
                            hover: {
                                appearance: { opacity: 0.7 }, // Only opacity changes, radius preserved!
                                duration: '0.2s'
                            }
                        }, children: "Opacity Only" }), _jsx(Frame, { size: { width: 120, height: 80 }, fill: { type: 'solid', color: '#ef4444' }, appearance: { radius: 12, opacity: 0.9 }, typography: { color: 'white', fontSize: 12, textAlign: 'center' }, autoLayout: { flow: 'vertical', alignment: 'center', padding: 12 }, animate: {
                            hover: {
                                size: { width: 140, height: 90 }, // Only size changes, radius & opacity preserved!
                                duration: '0.2s'
                            }
                        }, children: "Size Only" }), _jsx(Frame, { size: { width: 120, height: 80 }, fill: { type: 'solid', color: '#10b981' }, appearance: { radius: 20, opacity: 1 }, typography: { color: 'white', fontSize: 12, textAlign: 'center' }, autoLayout: { flow: 'vertical', alignment: 'center', padding: 12 }, animate: {
                            hover: {
                                size: { width: 130 }, // Only width changes, height preserved!
                                appearance: { opacity: 0.8 }, // Only opacity changes, radius preserved!
                                duration: '0.2s'
                            },
                            click: {
                                appearance: { radius: 8 }, // Only radius changes, opacity preserved!
                                duration: '0.1s'
                            }
                        }, children: "Mixed Props" })] }), _jsx("p", { style: { fontSize: '12px', color: '#666', maxWidth: '400px' }, children: "Notice how each Frame only changes the properties you specify in the animation, while automatically preserving all other properties like radius, opacity, colors, etc." })] }));
};
