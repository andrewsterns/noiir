import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './button';
/**
 * Examples demonstrating Button with ALL Frame capabilities
 */
// Basic button with solid fill
export const BasicExample = () => (_jsx(Button, { fill: { type: 'solid', color: 'primary6' }, appearance: { radius: 8 }, autoLayout: { width: 150, height: 40 }, typography: {
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center',
        color: 'white'
    }, onClick: () => alert('Basic button clicked!'), children: "Click me" }));
// Button with gradient and complex styling
export const GradientExample = () => (_jsx(Button, { fill: {
        type: 'linear-gradient',
        angle: 45,
        stops: [
            { color: 'primary4', position: 0 },
            { color: 'primary8', position: 1 }
        ]
    }, stroke: { color: 'white', weight: 2 }, appearance: { radius: 12, opacity: 1 }, autoLayout: { width: 200, height: 60 }, typography: {
        fontSize: 18,
        fontWeight: 700,
        textAlign: 'center',
        color: 'white'
    }, onClick: () => alert('Gradient button clicked!'), children: "\uD83C\uDF08 Gradient Button" }));
// Button with positioning (using Frame's position props)
export const PositionedExample = () => (_jsxs("div", { style: { position: 'relative', width: 400, height: 200, backgroundColor: '#f0f0f0' }, children: [_jsx(Button, { fill: { type: 'solid', color: 'success6' }, appearance: { radius: 8 }, autoLayout: { width: 120, height: 40 }, typography: {
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'center',
                color: 'white'
            }, position: { x: 50, y: 50 }, onClick: () => alert('Positioned button clicked!'), children: "Positioned" }), _jsx(Button, { fill: { type: 'solid', color: 'error6' }, appearance: { radius: 8 }, autoLayout: { width: 120, height: 40 }, typography: {
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'center',
                color: 'white'
            }, position: { x: 200, y: 100 }, onClick: () => alert('Another positioned button clicked!'), children: "Also Positioned" })] }));
// Button with auto layout (using Frame's autoLayout props)
export const AutoLayoutExample = () => (_jsxs(Button, { fill: { type: 'solid', color: 'warning6' }, appearance: { radius: 16 }, autoLayout: {
        flow: 'horizontal',
        alignment: 'center',
        gap: 8,
        padding: { top: 16, right: 24, bottom: 16, left: 24 }
    }, typography: {
        fontSize: 16,
        fontWeight: 600,
        textAlign: 'center',
        color: 'white'
    }, onClick: () => alert('Auto layout button clicked!'), children: [_jsx("span", { children: "\uD83D\uDD25" }), _jsx("span", { children: "Auto Layout Button" }), _jsx("span", { children: "\uD83D\uDE80" })] }));
// Outline button (no fill, just stroke)
export const OutlineExample = () => (_jsx(Button, { stroke: { color: 'primary6', weight: 2 }, appearance: { radius: 8 }, autoLayout: { width: 150, height: 40 }, typography: {
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center',
        color: 'primary6'
    }, onClick: () => alert('Outline button clicked!'), children: "Outline Button" }));
// Disabled button
export const DisabledExample = () => (_jsx(Button, { fill: { type: 'solid', color: 'neutral5' }, appearance: { radius: 8 }, autoLayout: { width: 150, height: 40 }, typography: {
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center',
        color: 'white'
    }, disabled: true, onClick: () => alert('This should not fire!'), children: "Disabled" }));
// Button with complex radial gradient
export const RadialGradientExample = () => (_jsx(Button, { fill: {
        type: 'radial-gradient',
        stops: [
            { color: '#ffffff', position: 0 },
            { color: 'success6', position: 1 }
        ]
    }, appearance: { radius: 50 }, autoLayout: { width: 100, height: 100 }, typography: {
        fontSize: 14,
        fontWeight: 600,
        textAlign: 'center',
        color: 'white'
    }, onClick: () => alert('Radial gradient button clicked!'), children: "Radial" }));
// Button gallery component
export const ButtonGallery = () => (_jsxs("div", { style: { padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }, children: [_jsx("h2", { children: "Button Component - ALL Frame Powers!" }), _jsxs("div", { style: { display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx(BasicExample, {}), _jsx(OutlineExample, {}), _jsx(DisabledExample, {})] }), _jsxs("div", { style: { display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx(GradientExample, {}), _jsx(RadialGradientExample, {})] }), _jsxs("div", { children: [_jsx("h3", { children: "Auto Layout Button:" }), _jsx(AutoLayoutExample, {})] }), _jsxs("div", { children: [_jsx("h3", { children: "Positioned Buttons:" }), _jsx(PositionedExample, {})] })] }));
export default ButtonGallery;
