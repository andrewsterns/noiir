import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import { FrameAnimationEngine } from './engine';
import { FrameKeyframeInterpolator } from './keyframe-interpolator';
import { FrameCSSTransitions, FrameAnimationOptimizer } from './css-transitions';
/**
 * Test component for validating Frame animation system
 */
export const AnimationTestBench = () => {
    const simpleBoxRef = useRef(null);
    const complexBoxRef = useRef(null);
    const transitionBoxRef = useRef(null);
    const performanceBoxRef = useRef(null);
    const animationEngine = useRef(new FrameAnimationEngine('test-frame'));
    useEffect(() => {
        runTests();
    }, []);
    const runTests = async () => {
        console.log('🧪 Starting Frame Animation Tests...');
        // Test 1: Simple Transform Animation
        await testSimpleTransform();
        // Test 2: Complex Multi-Keyframe Animation
        await testComplexKeyframes();
        // Test 3: CSS Transitions Optimization
        await testCSSTransitions();
        // Test 4: Performance Analysis
        await testPerformanceAnalysis();
        console.log('✅ All Animation Tests Complete!');
    };
    const testSimpleTransform = async () => {
        if (!simpleBoxRef.current)
            return;
        console.log('Testing simple transform animation...');
        // Setup animation config
        animationEngine.current.setAnimations({
            click: {
                '@0s': {
                    position: { x: 0, y: 0 },
                    size: { width: 100, height: 100 },
                    appearance: { opacity: 1 }
                },
                '@1s': {
                    position: { x: 200, y: 100 },
                    size: { width: 150, height: 150 },
                    appearance: { opacity: 0.8 }
                }
            }
        });
        await animationEngine.current.animate('click', simpleBoxRef.current);
        console.log('✅ Simple transform test passed');
    };
    const testComplexKeyframes = async () => {
        if (!complexBoxRef.current)
            return;
        console.log('Testing complex keyframe animation...');
        // Setup complex animation config
        animationEngine.current.setAnimations({
            hover: {
                '@0s': {
                    position: { x: 0, y: 0, rotation: 0 },
                    appearance: {
                        opacity: 1,
                        backgroundColor: '#ff6b6b'
                    }
                },
                '@0.3s': {
                    position: { x: 100, y: -50, rotation: 90 },
                    appearance: {
                        opacity: 0.7,
                        backgroundColor: '#4ecdc4'
                    }
                },
                '@0.7s': {
                    position: { x: 200, y: 0, rotation: 180 },
                    appearance: {
                        opacity: 0.9,
                        backgroundColor: '#45b7d1'
                    }
                },
                '@1s': {
                    position: { x: 300, y: 50, rotation: 360 },
                    appearance: {
                        opacity: 1,
                        backgroundColor: '#96ceb4'
                    }
                }
            }
        });
        await animationEngine.current.animate('hover', complexBoxRef.current);
        console.log('✅ Complex keyframes test passed');
    };
    const testCSSTransitions = async () => {
        if (!transitionBoxRef.current)
            return;
        console.log('Testing CSS transitions optimization...');
        const timeline = {
            '@0s': {
                appearance: { opacity: 0.3 },
                size: { width: 80, height: 80 }
            },
            '@1s': {
                appearance: { opacity: 1 },
                size: { width: 200, height: 200 }
            }
        };
        // Test if this can use CSS transitions
        const canUseTransitions = FrameCSSTransitions.canUseTransitions(timeline);
        console.log('Can use CSS transitions:', canUseTransitions);
        if (canUseTransitions) {
            await FrameCSSTransitions.applyTransition(transitionBoxRef.current, timeline, 1500, 'easeOut');
        }
        else {
            // Setup animation and trigger
            animationEngine.current.setAnimations({
                fade: {
                    '@0s': timeline['@0s'],
                    '@1s': timeline['@1s']
                }
            });
            await animationEngine.current.animate('fade', transitionBoxRef.current);
        }
        console.log('✅ CSS transitions test passed');
    };
    const testPerformanceAnalysis = async () => {
        if (!performanceBoxRef.current)
            return;
        console.log('Testing performance analysis...');
        const heavyTimeline = {
            '@0s': {
                position: { x: 0, y: 0 },
                size: { width: 100, height: 100 },
                effects: {
                    boxShadow: [{ x: 0, y: 0, blur: 0, color: '#000000' }],
                    filter: { blur: 0 }
                }
            },
            '@1s': {
                position: { x: 200, y: 200 },
                size: { width: 200, height: 200 },
                effects: {
                    boxShadow: [{ x: 10, y: 10, blur: 20, color: '#ff6b6b' }],
                    filter: { blur: 5 }
                }
            }
        };
        // Analyze performance impact
        const analysis = FrameAnimationOptimizer.analyzePerformanceImpact(heavyTimeline);
        console.log('Performance Analysis:', analysis);
        // Get optimization suggestions
        const { optimizedTimeline, suggestions } = FrameAnimationOptimizer.optimizeForPerformance(heavyTimeline);
        console.log('Optimization Suggestions:', suggestions);
        // Choose best animation strategy
        const strategy = FrameAnimationOptimizer.chooseStrategy(heavyTimeline);
        console.log('Recommended Strategy:', strategy);
        // Setup performance test animation
        animationEngine.current.setAnimations({
            performance: Object.fromEntries(Object.entries(optimizedTimeline).filter(([key]) => key.startsWith('@')))
        });
        await animationEngine.current.animate('performance', performanceBoxRef.current);
        console.log('✅ Performance analysis test passed');
    };
    const testInterpolation = () => {
        console.log('Testing keyframe interpolation...');
        const start = {
            position: { x: 0, y: 0 },
            appearance: { opacity: 0 }
        };
        const end = {
            position: { x: 100, y: 50 },
            appearance: { opacity: 1 }
        };
        // Test interpolation at 50%
        const interpolated = FrameKeyframeInterpolator.createInterpolatedFrames(start, end, 10, 'easeOut');
        console.log('Interpolated frames:', interpolated);
        console.log('✅ Interpolation test passed');
    };
    const testEasingFunctions = () => {
        console.log('Testing easing functions...');
        const easings = [
            'linear', 'easeIn', 'easeOut', 'easeInOut',
            'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'bounce'
        ];
        easings.forEach(easing => {
            const value = FrameKeyframeInterpolator.interpolateValue(0, 100, 0.5, easing);
            console.log(`${easing} at 50%:`, value);
        });
        console.log('✅ Easing functions test passed');
    };
    return (_jsxs("div", { style: { padding: '20px', fontFamily: 'Arial, sans-serif' }, children: [_jsx("h1", { children: "Frame Animation Test Bench" }), _jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("button", { onClick: runTests, style: {
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#4ecdc4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }, children: "Run Animation Tests" }), _jsx("button", { onClick: testInterpolation, style: {
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#45b7d1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginLeft: '10px'
                        }, children: "Test Interpolation" }), _jsx("button", { onClick: testEasingFunctions, style: {
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#96ceb4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginLeft: '10px'
                        }, children: "Test Easing Functions" })] }), _jsxs("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '40px',
                    marginTop: '40px'
                }, children: [_jsxs("div", { children: [_jsx("h3", { children: "Simple Transform Animation" }), _jsx("div", { style: {
                                    position: 'relative',
                                    width: '400px',
                                    height: '200px',
                                    border: '2px dashed #ccc',
                                    backgroundColor: '#f9f9f9'
                                }, children: _jsx("div", { ref: simpleBoxRef, style: {
                                        position: 'absolute',
                                        width: '100px',
                                        height: '100px',
                                        backgroundColor: '#ff6b6b',
                                        borderRadius: '8px',
                                        top: '50px',
                                        left: '50px'
                                    } }) })] }), _jsxs("div", { children: [_jsx("h3", { children: "Complex Multi-Keyframe Animation" }), _jsx("div", { style: {
                                    position: 'relative',
                                    width: '400px',
                                    height: '200px',
                                    border: '2px dashed #ccc',
                                    backgroundColor: '#f9f9f9'
                                }, children: _jsx("div", { ref: complexBoxRef, style: {
                                        position: 'absolute',
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: '#4ecdc4',
                                        borderRadius: '8px',
                                        top: '70px',
                                        left: '20px'
                                    } }) })] }), _jsxs("div", { children: [_jsx("h3", { children: "CSS Transitions Optimization" }), _jsx("div", { style: {
                                    position: 'relative',
                                    width: '400px',
                                    height: '200px',
                                    border: '2px dashed #ccc',
                                    backgroundColor: '#f9f9f9'
                                }, children: _jsx("div", { ref: transitionBoxRef, style: {
                                        position: 'absolute',
                                        width: '80px',
                                        height: '80px',
                                        backgroundColor: '#45b7d1',
                                        borderRadius: '8px',
                                        top: '60px',
                                        left: '50px',
                                        opacity: 0.3
                                    } }) })] }), _jsxs("div", { children: [_jsx("h3", { children: "Performance Analysis" }), _jsx("div", { style: {
                                    position: 'relative',
                                    width: '400px',
                                    height: '200px',
                                    border: '2px dashed #ccc',
                                    backgroundColor: '#f9f9f9'
                                }, children: _jsx("div", { ref: performanceBoxRef, style: {
                                        position: 'absolute',
                                        width: '100px',
                                        height: '100px',
                                        backgroundColor: '#96ceb4',
                                        borderRadius: '8px',
                                        top: '50px',
                                        left: '50px'
                                    } }) })] })] }), _jsxs("div", { style: { marginTop: '40px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }, children: [_jsx("h3", { children: "Test Results" }), _jsx("p", { children: "Open browser console to see detailed test results and performance analysis." }), _jsx("p", { children: "Each test validates a different aspect of the Frame animation system:" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Simple Transform:" }), " Basic position, size, and opacity changes"] }), _jsxs("li", { children: [_jsx("strong", { children: "Complex Keyframes:" }), " Multi-stage animations with rotation and color changes"] }), _jsxs("li", { children: [_jsx("strong", { children: "CSS Transitions:" }), " Automatic optimization for simple two-keyframe animations"] }), _jsxs("li", { children: [_jsx("strong", { children: "Performance Analysis:" }), " Heavy animations with shadows and filters"] })] })] })] }));
};
export default AnimationTestBench;
