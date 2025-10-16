import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { colors } from './colors';
import { fonts } from './fonts';
import { typographyPresets, applyThemePreset } from './typography';
// Dummy component for the story
const ThemeShowcase = () => null;
const meta = {
    title: 'Theme/Design System',
    component: ThemeShowcase,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Complete overview of the design system colors, fonts, and typography presets.'
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Colors Story
export const Colors = {
    render: () => (_jsxs("div", { style: { fontFamily: 'system-ui, sans-serif' }, children: [_jsx("h1", { style: { marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }, children: "Design System Colors" }), Object.entries(colors).map(([colorName, colorScale]) => (_jsxs("div", { style: { marginBottom: '3rem' }, children: [_jsx("h2", { style: {
                            marginBottom: '1rem',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            textTransform: 'capitalize'
                        }, children: colorName }), _jsx("div", { style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                            gap: '1rem',
                            marginBottom: '2rem'
                        }, children: Object.entries(colorScale).map(([shade, colorValue]) => {
                            const isLightColor = parseInt(shade) <= 3;
                            const textColor = isLightColor ? '#374151' : '#ffffff';
                            return (_jsxs("div", { style: {
                                    backgroundColor: colorValue,
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    minHeight: '80px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    border: isLightColor ? '1px solid #e5e7eb' : 'none',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                }, children: [_jsxs("div", { style: {
                                            color: textColor,
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            marginBottom: '0.25rem'
                                        }, children: [colorName, shade] }), _jsx("div", { style: {
                                            color: textColor,
                                            fontSize: '0.75rem',
                                            opacity: 0.8,
                                            fontFamily: 'monospace'
                                        }, children: colorValue })] }, shade));
                        }) })] }, colorName))), _jsxs("div", { style: { marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '8px' }, children: [_jsx("h3", { style: { marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }, children: "Usage Examples" }), _jsxs("div", { style: { fontSize: '0.9rem', color: '#6b7280' }, children: [_jsxs("p", { children: [_jsxs("code", { children: ["fill=", `{{ type: 'solid', color: 'primary6' }}`] }), " - Uses the primary blue"] }), _jsxs("p", { children: [_jsxs("code", { children: ["fill=", `{{ type: 'solid', color: 'success3' }}`] }), " - Uses light green"] }), _jsxs("p", { children: [_jsxs("code", { children: ["fill=", `{{ type: 'solid', color: '#3B82F6' }}`] }), " - Uses hex color directly"] })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'All available colors in the design system with their 1-12 naming convention. Light colors (1-3) work well for backgrounds, medium colors (4-8) for interactive elements, and dark colors (9-12) for text and emphasis.'
            }
        }
    }
};
// Fonts Story
export const Fonts = {
    render: () => (_jsxs("div", { style: { fontFamily: 'system-ui, sans-serif' }, children: [_jsx("h1", { style: { marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }, children: "Design System Fonts" }), Object.entries(fonts).map(([fontName, fontConfig]) => {
                const config = fontConfig;
                return (_jsxs("div", { style: { marginBottom: '3rem' }, children: [_jsx("h2", { style: {
                                marginBottom: '1rem',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                textTransform: 'capitalize'
                            }, children: fontName.replace(/([A-Z])/g, ' $1').trim() }), _jsxs("div", { style: {
                                padding: '2rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                backgroundColor: '#ffffff'
                            }, children: [_jsx("div", { style: {
                                        fontFamily: config.family,
                                        fontSize: '2rem',
                                        fontWeight: 'normal',
                                        marginBottom: '1rem',
                                        lineHeight: 1.3
                                    }, children: "The quick brown fox jumps over the lazy dog" }), _jsx("div", { style: {
                                        fontFamily: config.family,
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        marginBottom: '1rem',
                                        color: '#374151'
                                    }, children: "Bold: The quick brown fox jumps over the lazy dog" }), _jsx("div", { style: {
                                        fontFamily: config.family,
                                        fontSize: '1rem',
                                        fontWeight: 'normal',
                                        marginBottom: '1.5rem',
                                        color: '#6b7280'
                                    }, children: "Regular: The quick brown fox jumps over the lazy dog" }), _jsxs("div", { style: {
                                        fontSize: '0.875rem',
                                        color: '#9ca3af',
                                        fontFamily: 'monospace',
                                        backgroundColor: '#f9fafb',
                                        padding: '0.75rem',
                                        borderRadius: '4px'
                                    }, children: [_jsx("strong", { children: "Font Family:" }), " ", config.family, _jsx("br", {}), _jsx("strong", { children: "Available Weights:" }), " ", config.weights.join(', '), _jsx("br", {}), _jsx("strong", { children: "Styles:" }), " ", config.styles.join(', '), _jsx("br", {}), _jsx("strong", { children: "Display:" }), " ", config.display] })] })] }, fontName));
            })] })),
    parameters: {
        docs: {
            description: {
                story: 'All available fonts in the design system. Atkinson Hyperlegible is used for headings, Inter for body text, Poppins for display text, and JetBrains Mono for code.'
            }
        }
    }
};
// Typography Presets Story
export const TypographyPresets = {
    render: () => (_jsxs("div", { style: { fontFamily: 'system-ui, sans-serif' }, children: [_jsx("h1", { style: { marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }, children: "Typography Presets" }), _jsxs("div", { style: { marginBottom: '3rem' }, children: [_jsx("h2", { style: { marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }, children: "Headings" }), ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => (_jsxs("div", { style: { marginBottom: '2rem' }, children: [_jsxs("div", { style: {
                                    ...applyThemePreset(heading),
                                    marginBottom: '0.5rem'
                                }, children: [heading.toUpperCase(), ": The quick brown fox jumps over the lazy dog"] }), _jsxs("div", { style: {
                                    fontSize: '0.75rem',
                                    color: '#9ca3af',
                                    fontFamily: 'monospace',
                                    backgroundColor: '#f9fafb',
                                    padding: '0.5rem',
                                    borderRadius: '4px'
                                }, children: ["Font: ", typographyPresets[heading].fontFamily, " | Size: ", typographyPresets[heading].fontSize, "px | Weight: ", typographyPresets[heading].fontWeight, " | Line Height: ", typographyPresets[heading].lineHeight] })] }, heading)))] }), _jsxs("div", { style: { marginBottom: '3rem' }, children: [_jsx("h2", { style: { marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }, children: "Body Text & UI Elements" }), ['body1', 'body2', 'label', 'caption', 'button', 'overline'].map((preset) => (_jsxs("div", { style: { marginBottom: '2rem' }, children: [_jsxs("div", { style: {
                                    ...applyThemePreset(preset),
                                    marginBottom: '0.5rem'
                                }, children: [preset.toUpperCase(), ": The quick brown fox jumps over the lazy dog"] }), _jsxs("div", { style: {
                                    fontSize: '0.75rem',
                                    color: '#9ca3af',
                                    fontFamily: 'monospace',
                                    backgroundColor: '#f9fafb',
                                    padding: '0.5rem',
                                    borderRadius: '4px'
                                }, children: ["Font: ", typographyPresets[preset].fontFamily, " | Size: ", typographyPresets[preset].fontSize, "px | Weight: ", typographyPresets[preset].fontWeight, " | Line Height: ", typographyPresets[preset].lineHeight] })] }, preset)))] }), _jsxs("div", { style: { marginBottom: '3rem' }, children: [_jsx("h2", { style: { marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }, children: "Special Presets" }), ['display', 'code'].map((preset) => (_jsxs("div", { style: { marginBottom: '2rem' }, children: [_jsxs("div", { style: {
                                    ...applyThemePreset(preset),
                                    marginBottom: '0.5rem'
                                }, children: [preset.toUpperCase(), ": The quick brown fox jumps over the lazy dog"] }), _jsxs("div", { style: {
                                    fontSize: '0.75rem',
                                    color: '#9ca3af',
                                    fontFamily: 'monospace',
                                    backgroundColor: '#f9fafb',
                                    padding: '0.5rem',
                                    borderRadius: '4px'
                                }, children: ["Font: ", typographyPresets[preset].fontFamily, " | Size: ", typographyPresets[preset].fontSize, "px | Weight: ", typographyPresets[preset].fontWeight, " | Line Height: ", typographyPresets[preset].lineHeight] })] }, preset)))] }), _jsxs("div", { style: { marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '8px' }, children: [_jsx("h3", { style: { marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }, children: "Usage Examples" }), _jsxs("div", { style: { fontSize: '0.9rem', color: '#6b7280' }, children: [_jsxs("p", { children: [_jsx("code", { children: "applyThemePreset('h1')" }), " - Apply H1 heading styles"] }), _jsxs("p", { children: [_jsxs("code", { children: ["applyThemePreset('body1', ", `{ color: 'primary6' }`, ")"] }), " - Body text with custom color"] }), _jsxs("p", { children: [_jsx("code", { children: "convertTypographyProps(typographyPresets.button)" }), " - Get CSS styles for button text"] })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'All typography presets with their font families, sizes, weights, and line heights. Use these presets for consistent typography across your application.'
            }
        }
    }
};
