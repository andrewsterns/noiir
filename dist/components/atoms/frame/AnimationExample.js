import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from './Frame';
export const AnimationExample = () => {
    return (_jsxs("div", { style: { display: 'flex', gap: '20px', padding: '20px' }, children: [_jsx(Frame, { size: { width: 120, height: 80 }, fill: { type: 'solid', color: '#3b82f6' }, appearance: { radius: 8 }, typography: { color: 'white', fontSize: 14, textAlign: 'center' }, autoLayout: { flow: 'vertical', alignment: 'center', padding: 16 }, animate: {
                    hover: {
                        size: { width: 130, height: 85 },
                        fill: { type: 'solid', color: '#2563eb' },
                        duration: '0.2s',
                        timing: 'ease-out'
                    }
                }, children: "Hover Me" }), _jsx(Frame, { size: { width: 120, height: 80 }, fill: { type: 'solid', color: '#ef4444' }, appearance: { radius: 8 }, typography: { color: 'white', fontSize: 14, textAlign: 'center' }, autoLayout: { flow: 'vertical', alignment: 'center', padding: 16 }, animate: {
                    hover: {
                        appearance: { opacity: 0.9 },
                        duration: '0.15s',
                        timing: 'ease-in-out'
                    },
                    click: {
                        size: { width: 110, height: 75 },
                        duration: '0.1s',
                        timing: 'ease-in-out'
                    }
                }, children: "Click Me" }), _jsx(Frame, { size: { width: 120, height: 80 }, fill: { type: 'solid', color: '#10b981' }, appearance: { radius: 8 }, typography: { color: 'white', fontSize: 14, textAlign: 'center' }, autoLayout: { flow: 'vertical', alignment: 'center', padding: 16 }, animate: {
                    hover: {
                        size: { width: 140, height: 90 },
                        fill: { type: 'solid', color: '#059669' },
                        appearance: { radius: 12 },
                        duration: '0.3s',
                        timing: 'ease-out'
                    },
                    click: {
                        size: { width: 100, height: 70 },
                        appearance: { opacity: 0.8 },
                        duration: '0.15s',
                        timing: 'ease-out'
                    }
                }, children: "Complex" })] }));
};
