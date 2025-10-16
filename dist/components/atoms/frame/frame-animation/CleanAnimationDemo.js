import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Frame Animation System - Usage Examples
 *
 * This file demonstrates how to use the clean, abstracted Frame animation interfaces
 * for creating powerful, type-safe animations.
 */
import { useRef, useEffect } from 'react';
import { animate, createFrameAnimationEngine, SimpleFrameAnimationSystem, framePropertiesToCSS } from './index';
/**
 * Example 1: Using the Animation Builder Pattern
 */
export const AnimationBuilderExample = () => {
    const elementRef = useRef(null);
    const animationSystem = useRef();
    useEffect(() => {
        if (!elementRef.current)
            return;
        // Create animation using the builder pattern
        const animations = animate()
            .hover({
            '@0s': {
                position: { scale: 1 },
                appearance: { opacity: 1 }
            },
            '@0.3s': {
                position: { scale: 1.1 },
                appearance: { opacity: 0.9 }
            }
        })
            .click({
            '@0s': {
                position: { rotation: 0 },
                fill: { color: '#4ecdc4' }
            },
            '@0.5s': {
                position: { rotation: 180 },
                fill: { color: '#ff6b6b' }
            }
        })
            .crossFrame('other-frame', 'hover', {
            '@0s': {
                appearance: { opacity: 1 }
            },
            '@1s': {
                appearance: { opacity: 0.5 }
            }
        })
            .build();
        // Setup the animation system
        animationSystem.current = new SimpleFrameAnimationSystem('example-frame-1');
        animationSystem.current.setup(elementRef.current, animations);
        return () => {
            var _a;
            (_a = animationSystem.current) === null || _a === void 0 ? void 0 : _a.cleanup();
        };
    }, []);
    return (_jsx("div", { ref: elementRef, style: {
            width: 100,
            height: 100,
            backgroundColor: '#4ecdc4',
            borderRadius: 8,
            margin: 20,
            cursor: 'pointer'
        } }));
};
/**
 * Example 2: Direct Animation Configuration
 */
export const DirectAnimationExample = () => {
    const elementRef = useRef(null);
    useEffect(() => {
        if (!elementRef.current)
            return;
        const engine = createFrameAnimationEngine('example-frame-2');
        const animations = {
            hover: {
                '@0s': {
                    position: { x: 0, y: 0, scale: 1 },
                    appearance: { backgroundColor: '#45b7d1' }
                },
                '@0.8s': {
                    position: { x: 50, y: -20, scale: 1.2 },
                    appearance: { backgroundColor: '#96ceb4' }
                }
            },
            click: {
                '@0s': {
                    effects: {
                        boxShadow: [{ x: 0, y: 0, blur: 0, color: '#000000' }]
                    }
                },
                '@0.4s': {
                    effects: {
                        boxShadow: [{ x: 10, y: 10, blur: 20, color: '#ff6b6b' }]
                    }
                }
            }
        };
        engine.setAnimations(animations);
        // Manual event listeners
        const handleHover = () => engine.animate('hover', elementRef.current);
        const handleClick = () => engine.animate('click', elementRef.current);
        elementRef.current.addEventListener('mouseenter', handleHover);
        elementRef.current.addEventListener('click', handleClick);
        return () => {
            var _a, _b;
            (_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('mouseenter', handleHover);
            (_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', handleClick);
            engine.cleanup();
        };
    }, []);
    return (_jsx("div", { ref: elementRef, style: {
            width: 120,
            height: 120,
            backgroundColor: '#45b7d1',
            borderRadius: 12,
            margin: 20,
            cursor: 'pointer'
        } }));
};
/**
 * Example 3: Property Conversion Utility
 */
export const PropertyConversionExample = () => {
    const elementRef = useRef(null);
    useEffect(() => {
        if (!elementRef.current)
            return;
        // Define Frame properties
        const frameProperties = {
            position: { x: 100, y: 50, rotation: 45 },
            size: { width: 150, height: 100 },
            appearance: {
                opacity: 0.8,
                backgroundColor: '#ff6b6b',
                borderRadius: [8, 16, 8, 16]
            },
            effects: {
                boxShadow: [
                    { x: 5, y: 5, blur: 15, color: '#000000' }
                ],
                filter: {
                    blur: 2,
                    brightness: 1.1
                }
            }
        };
        // Convert to CSS and apply
        const cssStyles = framePropertiesToCSS(frameProperties);
        Object.assign(elementRef.current.style, cssStyles);
    }, []);
    return (_jsx("div", { ref: elementRef, style: {
            position: 'relative',
            transition: 'all 0.3s ease'
        }, children: "Property Conversion Example" }));
};
/**
 * Example 4: Complex Multi-Frame Animation
 */
export const MultiFrameExample = () => {
    const frame1Ref = useRef(null);
    const frame2Ref = useRef(null);
    const system1 = useRef();
    const system2 = useRef();
    useEffect(() => {
        if (!frame1Ref.current || !frame2Ref.current)
            return;
        // Frame 1 animations
        const frame1Animations = animate()
            .hover({
            '@0s': { position: { scale: 1 }, fill: { color: '#4ecdc4' } },
            '@0.5s': { position: { scale: 1.3 }, fill: { color: '#45b7d1' } }
        })
            .build();
        // Frame 2 animations (responds to Frame 1)
        const frame2Animations = animate()
            .crossFrame('multi-frame-1', 'hover', {
            '@0s': { position: { x: 0, rotation: 0 } },
            '@0.7s': { position: { x: 100, rotation: 90 } }
        })
            .build();
        // Setup both systems
        system1.current = new SimpleFrameAnimationSystem('multi-frame-1');
        system2.current = new SimpleFrameAnimationSystem('multi-frame-2');
        system1.current.setup(frame1Ref.current, frame1Animations);
        system2.current.setup(frame2Ref.current, frame2Animations);
        return () => {
            var _a, _b;
            (_a = system1.current) === null || _a === void 0 ? void 0 : _a.cleanup();
            (_b = system2.current) === null || _b === void 0 ? void 0 : _b.cleanup();
        };
    }, []);
    return (_jsxs("div", { style: { display: 'flex', gap: 20, margin: 20 }, children: [_jsx("div", { ref: frame1Ref, style: {
                    width: 100,
                    height: 100,
                    backgroundColor: '#4ecdc4',
                    borderRadius: 8,
                    cursor: 'pointer'
                } }), _jsx("div", { ref: frame2Ref, style: {
                    width: 80,
                    height: 80,
                    backgroundColor: '#ff6b6b',
                    borderRadius: 8
                } })] }));
};
/**
 * Main demo component
 */
export const CleanAnimationDemo = () => {
    return (_jsxs("div", { style: { padding: 20, fontFamily: 'Arial, sans-serif' }, children: [_jsx("h1", { children: "Frame Animation System - Clean Interface Examples" }), _jsxs("div", { style: { marginBottom: 40 }, children: [_jsx("h2", { children: "Animation Builder Pattern" }), _jsx("p", { children: "Hover and click the box below:" }), _jsx(AnimationBuilderExample, {})] }), _jsxs("div", { style: { marginBottom: 40 }, children: [_jsx("h2", { children: "Direct Animation Configuration" }), _jsx("p", { children: "Hover and click for different effects:" }), _jsx(DirectAnimationExample, {})] }), _jsxs("div", { style: { marginBottom: 40 }, children: [_jsx("h2", { children: "Property Conversion Utility" }), _jsx("p", { children: "Frame properties converted to CSS:" }), _jsx(PropertyConversionExample, {})] }), _jsxs("div", { style: { marginBottom: 40 }, children: [_jsx("h2", { children: "Multi-Frame Communication" }), _jsx("p", { children: "Hover the left box to animate the right box:" }), _jsx(MultiFrameExample, {})] })] }));
};
export default CleanAnimationDemo;
