import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Toggle Button Example - Green to Yellow
 */
import { useState } from 'react';
import { Frame } from './Frame';
export const ToggleButtonExample = () => {
    const [isYellow, setIsYellow] = useState(false);
    return (_jsxs("div", { style: { padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsx("h3", { children: "Toggle Button: Green \u2194 Yellow" }), _jsx(Frame, { size: { width: 180, height: 70 }, appearance: { radius: 12 }, fill: {
                    type: 'solid',
                    color: isYellow ? '#eab308' : '#10b981' // Yellow or Success Green
                }, typography: {
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center'
                }, autoLayout: {
                    flow: 'vertical',
                    alignment: 'center',
                    padding: 20
                }, animate: {
                    hover: {
                        fill: {
                            type: 'solid',
                            color: isYellow ? '#ca8a04' : '#059669' // Hover: darker yellow or darker green
                        },
                        size: { width: 186, height: 73 } // Slight scale on hover
                    },
                    duration: '0.2s',
                    timing: 'ease-out'
                }, onClick: () => setIsYellow(!isYellow), children: isYellow ? '🟡 Yellow!' : '🟢 Green!' }), _jsxs("div", { style: { fontSize: '14px', color: '#666', maxWidth: '300px' }, children: [_jsx("strong", { children: "Behavior:" }), _jsxs("ul", { style: { margin: '8px 0', paddingLeft: '20px' }, children: [_jsxs("li", { children: [_jsx("strong", { children: "Base:" }), " Green (#10b981) \u2194 Yellow (#eab308)"] }), _jsxs("li", { children: [_jsx("strong", { children: "Hover:" }), " Darker green (#059669) \u2194 Darker yellow (#ca8a04)"] }), _jsxs("li", { children: [_jsx("strong", { children: "Click:" }), " Toggles between states persistently"] })] })] })] }));
};
