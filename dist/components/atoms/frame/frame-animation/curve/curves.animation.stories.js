import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from '../../Frame';
export default {
    title: 'Frame/Animation/Curves',
    component: Frame,
    parameters: {
        docs: {
            description: {
                component: 'Animation easing curves demonstration. See how different easing functions affect motion.',
            },
        },
    },
};
// Variants that move the frame horizontally to demonstrate easing curves
const positionVariants = {
    start: {
        position: { x: 0, y: 0 },
        fill: { type: 'solid', color: 'neutral2' },
        stroke: { type: 'solid', color: 'neutral4', width: 1 },
        typography: { fontSize: 14, fontWeight: 500, color: 'neutral9' }
    },
    end: {
        position: { x: 200, y: 0 },
        fill: { type: 'solid', color: 'primary6' },
        stroke: { type: 'solid', color: 'primary7', width: 1 },
        typography: { fontSize: 14, fontWeight: 500, color: 'white' }
    },
};
// Custom action that toggles between start and end positions
const togglePosition = (context) => {
    return { variant: context.currentVariant === 'start' ? 'end' : 'start' };
};
export const AllCurves = () => (_jsxs("div", { style: { padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }, children: [_jsx("h3", { children: "All Animation Easing Curves - Position Animation" }), _jsx("p", { children: "Click each button to see how different easing curves affect the movement back and forth" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 20, height: 400 }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Linear - Constant speed" }), _jsx("div", { style: { position: 'relative', height: 40 }, children: _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, variant: 'start', animate: {
                                    variants: positionVariants,
                                    trigger: 'onClick',
                                    action: togglePosition,
                                    animation: 'move',
                                    curve: 'linear',
                                    duration: 1000,
                                }, children: "Linear" }) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Ease - Smooth acceleration and deceleration" }), _jsx("div", { style: { position: 'relative', height: 40 }, children: _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, variant: 'start', animate: {
                                    variants: positionVariants,
                                    trigger: 'onClick',
                                    action: togglePosition,
                                    animation: 'move',
                                    curve: 'ease',
                                    duration: 1000,
                                }, children: "Ease" }) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Ease In - Starts slow, accelerates" }), _jsx("div", { style: { position: 'relative', height: 40 }, children: _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, variant: 'start', animate: {
                                    variants: positionVariants,
                                    trigger: 'onClick',
                                    action: togglePosition,
                                    animation: 'move',
                                    curve: 'ease-in',
                                    duration: 1000,
                                }, children: "Ease In" }) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Ease Out - Fast start, gradual end" }), _jsx("div", { style: { position: 'relative', height: 40 }, children: _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, variant: 'start', animate: {
                                    variants: positionVariants,
                                    trigger: 'onClick',
                                    action: togglePosition,
                                    animation: 'move',
                                    curve: 'ease-out',
                                    duration: 1000,
                                }, children: "Ease Out" }) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Ease In Out - Gradual start and end" }), _jsx("div", { style: { position: 'relative', height: 40 }, children: _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, variant: 'start', animate: {
                                    variants: positionVariants,
                                    trigger: 'onClick',
                                    action: togglePosition,
                                    animation: 'move',
                                    curve: 'ease-in-out',
                                    duration: 1000,
                                }, children: "Ease In Out" }) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Bounce - Bounces at the end" }), _jsx("div", { style: { position: 'relative', height: 40 }, children: _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, variant: 'start', animate: {
                                    variants: positionVariants,
                                    trigger: 'onClick',
                                    action: togglePosition,
                                    animation: 'move',
                                    curve: 'bounce',
                                    duration: 1500,
                                }, children: "Bounce" }) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Elastic - Elastic/spring-like motion" }), _jsx("div", { style: { position: 'relative', height: 40 }, children: _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, variant: 'start', animate: {
                                    variants: positionVariants,
                                    trigger: 'onClick',
                                    action: togglePosition,
                                    animation: 'move',
                                    curve: 'elastic',
                                    duration: 1500,
                                }, children: "Elastic" }) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Spring - Spring-like bounce" }), _jsx("div", { style: { position: 'relative', height: 40 }, children: _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, variant: 'start', animate: {
                                    variants: positionVariants,
                                    trigger: 'onClick',
                                    action: togglePosition,
                                    animation: 'move',
                                    curve: 'spring',
                                    duration: 1200,
                                }, children: "Spring" }) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 8 }, children: [_jsx("label", { children: "Custom - Custom cubic-bezier curve" }), _jsx("div", { style: { position: 'relative', height: 40 }, children: _jsx(Frame, { autoLayout: { flow: 'horizontal', alignment: 'center', width: 120, height: 36 }, appearance: { radius: 4 }, variant: 'start', animate: {
                                    variants: positionVariants,
                                    trigger: 'onClick',
                                    action: togglePosition,
                                    animation: 'move',
                                    curve: 'custom',
                                    duration: 1000,
                                }, children: "Custom" }) })] })] })] }));
