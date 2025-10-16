import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Frame } from '../../Frame';
export default {
    title: 'Frame/Animation/Actions',
    component: Frame,
    parameters: {
        docs: {
            description: {
                component: 'Animation action demonstrations. See how different actions affect frame behavior and state.',
            },
        },
    },
};
// Common variants for action demonstrations
const actionVariants = {
    default: {
        fill: { type: 'solid', color: 'neutral2' },
        stroke: { type: 'solid', color: 'neutral4', width: 1 },
        typography: { fontSize: 14, fontWeight: 500, color: 'neutral9' }
    },
    active: {
        fill: { type: 'solid', color: 'primary2' },
        stroke: { type: 'solid', color: 'primary6', width: 2 },
        typography: { fontSize: 14, fontWeight: 600, color: 'primary8' }
    },
    success: {
        fill: { type: 'solid', color: 'success2' },
        stroke: { type: 'solid', color: 'success6', width: 2 },
        typography: { fontSize: 14, fontWeight: 600, color: 'success8' }
    },
    warning: {
        fill: { type: 'solid', color: 'warning2' },
        stroke: { type: 'solid', color: 'warning6', width: 2 },
        typography: { fontSize: 14, fontWeight: 600, color: 'warning9' }
    },
    danger: {
        fill: { type: 'solid', color: 'error2' },
        stroke: { type: 'solid', color: 'error6', width: 2 },
        typography: { fontSize: 14, fontWeight: 600, color: 'error7' }
    },
};
export const ChangeToAction = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "Change To Action - Switch to Specific Variant" }), _jsx("p", { children: "Click to change to the 'active' variant" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 160, height: 40 }, appearance: { radius: 6 }, animate: {
                variants: actionVariants,
                trigger: 'onClick',
                action: 'changeTo',
                destination: 'active',
                animation: 'dissolve',
                duration: 300,
            }, children: "Change to Active" })] }));
export const CycleVariantsAction = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "Cycle Variants Action - Cycle Through All States" }), _jsx("p", { children: "Click to cycle through: default \u2192 active \u2192 success \u2192 warning \u2192 danger \u2192 default..." }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 180, height: 40 }, appearance: { radius: 6 }, animate: {
                variants: actionVariants,
                trigger: 'onClick',
                action: 'cycleVariants',
                animation: 'dissolve',
                duration: 300,
            }, children: "Cycle States" })] }));
export const CustomFunctionAction = () => {
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
            variant = 'warning';
        else if (newCount >= 1)
            variant = 'active';
        return { variant };
    };
    return (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "Custom Function Action - Complex Logic" }), _jsx("p", { children: "Click counter with custom logic. Changes appearance based on count!" }), _jsxs("p", { children: ["Current count: ", _jsx("strong", { children: clickCount })] }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 160, height: 40 }, appearance: { radius: 6 }, animate: {
                    variants: actionVariants,
                    trigger: 'onClick',
                    action: counterAction,
                    animation: 'dissolve',
                    duration: 200,
                }, children: "Click to Count!" })] }));
};
export const OpenLinkAction = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "Open Link Action - Open External URLs" }), _jsx("p", { children: "Click to open Google in a new tab" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 160, height: 40 }, appearance: { radius: 6 }, animate: {
                variants: actionVariants,
                trigger: 'onClick',
                action: 'openLink',
                destination: 'https://www.google.com',
                animation: 'dissolve',
                duration: 200,
            }, children: "Open Google" })] }));
export const ConditionalAction = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    // Conditional action that only works when enabled
    const conditionalAction = (context) => {
        if (isEnabled) {
            return { variant: 'success' };
        }
        return { variant: 'danger' };
    };
    return (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "Conditional Action - Logic-Based Actions" }), _jsx("p", { children: "Custom function with conditional logic" }), _jsx("div", { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }, children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: isEnabled, onChange: (e) => setIsEnabled(e.target.checked) }), "Enabled"] }) }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 160, height: 40 }, appearance: { radius: 6 }, animate: {
                    variants: actionVariants,
                    trigger: 'onClick',
                    action: conditionalAction,
                    animation: 'dissolve',
                    duration: 300,
                }, children: "Test Condition" }), _jsx("p", { style: { fontSize: 14, color: '#6b7280' }, children: isEnabled ? 'Will show success state' : 'Will show danger state' })] }));
};
export const MultipleActionsDemo = () => {
    const [actionLog, setActionLog] = useState([]);
    // Custom action that logs and changes state
    const loggingAction = (context) => {
        const timestamp = new Date().toLocaleTimeString();
        const newLog = `${timestamp}: Action triggered`;
        setActionLog(prev => [newLog, ...prev.slice(0, 4)]); // Keep last 5 entries
        return { variant: 'active' };
    };
    return (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }, children: [_jsx("h3", { children: "Multiple Actions Demo - Combined Behaviors" }), _jsx("p", { children: "Custom action that logs events and changes appearance" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 180, height: 40 }, appearance: { radius: 6 }, animate: {
                    variants: actionVariants,
                    trigger: 'onClick',
                    action: loggingAction,
                    animation: 'dissolve',
                    duration: 300,
                }, children: "Log & Change" }), _jsxs("div", { style: { marginTop: 16 }, children: [_jsx("h4", { children: "Action Log:" }), _jsx("div", { style: {
                            backgroundColor: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: 6,
                            padding: 12,
                            fontFamily: 'monospace',
                            fontSize: 12,
                            maxHeight: 120,
                            overflowY: 'auto'
                        }, children: actionLog.length === 0 ? (_jsx("div", { style: { color: '#9ca3af' }, children: "No actions logged yet" })) : (actionLog.map((log, index) => (_jsx("div", { style: { marginBottom: 4 }, children: log }, index)))) })] })] }));
};
export const ActionComparison = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }, children: [_jsx("h3", { children: "Action Types Comparison" }), _jsx("p", { children: "See different action types side by side" }), _jsxs("div", { style: { display: 'flex', gap: 16, flexWrap: 'wrap' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "changeTo Action" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, animate: {
                                variants: actionVariants,
                                trigger: 'onClick',
                                action: 'changeTo',
                                destination: 'active',
                                animation: 'dissolve',
                                duration: 300,
                            }, children: "To Active" })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "cycleVariants Action" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, animate: {
                                variants: actionVariants,
                                trigger: 'onClick',
                                action: 'cycleVariants',
                                animation: 'dissolve',
                                duration: 300,
                            }, children: "Cycle" })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Custom Function" }), _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, animate: {
                                variants: actionVariants,
                                trigger: 'onClick',
                                action: () => ({ variant: 'success' }),
                                animation: 'dissolve',
                                duration: 300,
                            }, children: "Custom" })] })] })] }));
