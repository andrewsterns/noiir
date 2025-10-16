import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame } from '../components/atoms/frame/Frame';
/**
 * Examples demonstrating both the old and new fill APIs
 */
export const FrameFillExamples = () => {
    return (_jsxs("div", { style: { padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }, children: [_jsx("h2", { children: "Frame Fill API Examples" }), _jsxs("div", { children: [_jsx("h3", { children: "New Simplified API (Recommended)" }), _jsxs("div", { style: { display: 'flex', gap: '1rem', flexWrap: 'wrap' }, children: [_jsx(Frame, { fill: { type: 'solid', color: 'primary6' }, size: { width: 120, height: 80 }, children: _jsx("div", { style: { padding: '1rem', color: 'white', textAlign: 'center', fontSize: '0.8rem' }, children: "primary6" }) }), _jsx(Frame, { fill: { type: 'solid', color: 'success6' }, size: { width: 120, height: 80 }, children: _jsx("div", { style: { padding: '1rem', color: 'white', textAlign: 'center', fontSize: '0.8rem' }, children: "success6" }) }), _jsx(Frame, { fill: { type: 'solid', color: 'warning6' }, size: { width: 120, height: 80 }, children: _jsx("div", { style: { padding: '1rem', color: 'white', textAlign: 'center', fontSize: '0.8rem' }, children: "warning6" }) }), _jsx(Frame, { fill: { type: 'solid', color: 'error6' }, size: { width: 120, height: 80 }, children: _jsx("div", { style: { padding: '1rem', color: 'white', textAlign: 'center', fontSize: '0.8rem' }, children: "error6" }) }), _jsx(Frame, { fill: { type: 'none' }, size: { width: 120, height: 80 }, stroke: { color: 'neutral4', weight: 2 }, children: _jsx("div", { style: { padding: '1rem', color: 'black', textAlign: 'center', fontSize: '0.8rem' }, children: "No Fill" }) })] })] }), _jsxs("div", { children: [_jsx("h3", { children: "Old API (Still Supported)" }), _jsxs("div", { style: { display: 'flex', gap: '1rem', flexWrap: 'wrap' }, children: [_jsx(Frame, { fill: { type: 'solid', color: '#3B82F6' }, size: { width: 120, height: 80 }, children: _jsx("div", { style: { padding: '1rem', color: 'white', textAlign: 'center', fontSize: '0.8rem' }, children: "Blue Hex" }) }), _jsx(Frame, { fill: { type: 'solid', color: '#10B981' }, size: { width: 120, height: 80 }, children: _jsx("div", { style: { padding: '1rem', color: 'white', textAlign: 'center', fontSize: '0.8rem' }, children: "Green Hex" }) }), _jsx(Frame, { fill: { type: 'solid', color: '#F59E0B' }, size: { width: 120, height: 80 }, children: _jsx("div", { style: { padding: '1rem', color: 'white', textAlign: 'center', fontSize: '0.8rem' }, children: "Yellow Hex" }) })] })] }), _jsxs("div", { children: [_jsx("h3", { children: "Code Examples" }), _jsx("pre", { style: { background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }, children: `// ✨ Simplified Fill API
// Theme colors with 1-12 shading
<Frame fill={{ type: 'solid', color: 'primary6' }}>
  Content
</Frame>

<Frame fill={{ type: 'solid', color: 'success3' }}>
  Light success
</Frame>

<Frame fill={{ type: 'solid', color: 'error12' }}>
  Dark error
</Frame>

// Hex colors work too
<Frame fill={{ type: 'solid', color: '#3B82F6' }}>
  Custom hex
</Frame>

// No fill
<Frame fill={{ type: 'none' }}>
  Transparent background
</Frame>

// Clean and simple! No need to specify theme boolean 🎉` })] })] }));
};
export default FrameFillExamples;
