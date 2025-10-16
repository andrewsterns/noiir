import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { getVariantProps, semanticVariants } from './variants';
import { resolveColor } from '../../../../theme/colors';
// Dummy Frame component for demonstration
const Frame = ({ variant, variants }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const props = getVariantProps(variants, variant);
    return (_jsx("div", { style: {
            background: ((_a = props.fill) === null || _a === void 0 ? void 0 : _a.type) === 'solid' && ((_b = props.fill) === null || _b === void 0 ? void 0 : _b.color) ? resolveColor(props.fill.color) :
                ((_c = props.fill) === null || _c === void 0 ? void 0 : _c.type) === 'none' ? 'transparent' : '#eee',
            color: ((_d = props.typography) === null || _d === void 0 ? void 0 : _d.color) ? resolveColor(props.typography.color) : '#222',
            fontSize: ((_e = props.typography) === null || _e === void 0 ? void 0 : _e.fontSize) || 16,
            fontWeight: ((_f = props.typography) === null || _f === void 0 ? void 0 : _f.fontWeight) || 400,
            padding: 16,
            borderRadius: ((_g = props.appearance) === null || _g === void 0 ? void 0 : _g.radius) || 0,
            border: ((_h = props.stroke) === null || _h === void 0 ? void 0 : _h.weight) ? `${props.stroke.weight}px solid ${props.stroke.color ? resolveColor(props.stroke.color) : '#000'}` : 'none',
            opacity: ((_j = props.appearance) === null || _j === void 0 ? void 0 : _j.opacity) || 1,
            boxShadow: ((_k = props.effects) === null || _k === void 0 ? void 0 : _k.dropShadow) ?
                props.effects.dropShadow.map(shadow => `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${resolveColor(shadow.color)}`).join(', ') : 'none',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            minWidth: 120,
            cursor: 'pointer'
        }, children: variant.charAt(0).toUpperCase() + variant.slice(1) }));
};
export default {
    title: 'Frame/Variants',
    component: Frame,
};
export const StyleVariants = () => {
    const [selectedVariant, setSelectedVariant] = useState('solid');
    return (_jsxs("div", { style: { padding: 20 }, children: [_jsx("h3", { children: "Semantic Style Variants" }), _jsx("p", { children: "Choose a variant to see how it looks:" }), _jsx("div", { style: { marginBottom: 20 }, children: Object.keys(semanticVariants).map(variant => (_jsx("button", { onClick: () => setSelectedVariant(variant), style: {
                        margin: '0 8px 8px 0',
                        padding: '8px 16px',
                        border: '1px solid #ccc',
                        borderRadius: 4,
                        background: selectedVariant === variant ? '#007acc' : 'white',
                        color: selectedVariant === variant ? 'white' : '#333',
                        cursor: 'pointer'
                    }, children: variant.charAt(0).toUpperCase() + variant.slice(1) }, variant))) }), _jsx(Frame, { variant: selectedVariant, variants: semanticVariants })] }));
};
export const AllVariantsGrid = () => (_jsxs("div", { style: { padding: 20 }, children: [_jsx("h3", { children: "All Style Variants" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }, children: Object.entries(semanticVariants).map(([variantName, variantProps]) => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h4", { style: { marginBottom: 8, textTransform: 'capitalize' }, children: variantName }), _jsx(Frame, { variant: variantName, variants: semanticVariants })] }, variantName))) })] }));
