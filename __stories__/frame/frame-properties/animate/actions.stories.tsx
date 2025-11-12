import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Frame } from '../../../../__components__/frame/Frame';
import { AnimateProvider, AnimateDSL } from '../../../../__frame-core__/animate/animate.props';

/**
 * Animation Actions Stories
 * 
 * Demonstrates the action system for Frame animations using the new DSL syntax.
 * Actions allow you to perform Figma-like interactions from any trigger:
 * - openLink: Open URLs in new tabs
 * - scrollTo: Scroll to elements or target Frames
 * - back: Navigate browser history
 * - openOverlay/swapOverlay/closeOverlay: Manage overlays
 * - Custom functions: Execute arbitrary code
 * 
 * All actions now support cross-Frame targeting with 'id.variant' shorthand!
 */

const meta: Meta = {
    title: 'Frame/Properties/Animate/Actions',
    component: Frame,
    decorators: [
        (Story) => (
            <AnimateProvider>
                <Story />
            </AnimateProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj;

/**
 * Open Link Action - DSL Syntax
 * Click to open a URL in a new tab using any trigger
 */
export const OpenLink: Story = {
    render: () => {
        const animations: AnimateDSL[] = [
            {
                onClick: { action: 'openLink', url: 'https://github.com' }
            },
            {
                onHover: { action: 'openLink', url: 'https://figma.com' }
            },
            {
                hotKey: { action: 'openLink', url: 'https://react.dev', key: 'r' }
            }
        ];

        return (
            <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
                <Frame
                    id="link-button"
                    cursor="pointer"
                    variant="primary"
                    variants={{
                        primary: {
                            fill: { type: 'solid', color: 'blue5' },
                            autoLayout: { paddingHorizontal: 24, paddingVertical: 12, alignment: 'center' },
                            appearance: { radius: 8 },
                            typography: { color: 'white1', fontSize: 16, fontWeight: 600 },

                        },
                        primaryHover: {
                            fill: { type: 'solid', color: 'blue6' },
                            autoLayout: { paddingHorizontal: 24, paddingVertical: 12, alignment: 'center' },
                            appearance: { radius: 8 },
                            typography: { color: 'white1', fontSize: 16, fontWeight: 600 },

                        },
                    }}
                    animate={animations as any}
                >
                    Click for GitHub (or hover for Figma, press 'R' for React)
                </Frame>
            </Frame>
        );
    },
};

/**
 * Scroll To Action - DSL Syntax
 * Click to scroll to different sections using any trigger
 */
export const ScrollTo: Story = {
    render: () => (
        <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
            <Frame autoLayout={{ flow: 'horizontal', gap: 12 }}>
                <Frame
                    id="scroll-btn-1"
                    cursor="pointer"
                    variant="default"
                    variants={{
                        default: {
                            fill: { type: 'solid', color: 'purple5' },
                            autoLayout: { paddingHorizontal: 16, paddingVertical: 8, alignment: 'center' },
                            appearance: { radius: 6 },
                            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
                        },
                    }}
                    animate={[
                        {
                            onClick: { action: 'scrollTo', scrollTo: 'section-0', scrollBehavior: 'smooth' }
                        },
                    ] as any}
                >
                    Scroll to Section 0
                </Frame>

                <Frame
                    id="scroll-btn-2"
                    cursor="pointer"
                    variant="default"
                    variants={{
                        default: {
                            fill: { type: 'solid', color: 'orange5' },
                            autoLayout: { paddingHorizontal: 16, paddingVertical: 8, alignment: 'center' },
                            appearance: { radius: 6 },
                            typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
                        },
                    }}
                    animate={[
                        {
                            onClick: { action: 'scrollTo', scrollTo: 'section-2', scrollBehavior: 'smooth' }
                        },
                    ] as any}
                >
                    Scroll to Section 2
                </Frame>
            </Frame>

            <Frame autoLayout={{ flow: 'vertical', gap: 32 }}>
                <Frame
                    id="section-0"
                    variant="section"
                    variants={{
                        section: {
                            fill: { type: 'solid', color: 'blue3' },
                            autoLayout: { width: 300, height: 500, alignment: 'center' },
                            appearance: { radius: 12 },
                            typography: { color: 'blue9', fontSize: 24, fontWeight: 700 },
                        },
                    }}
                >
                    Section 0
                </Frame>
                <Frame
                    id="section-1"
                    variant="section"
                    variants={{
                        section: {
                            fill: { type: 'solid', color: 'purple3' },
                            autoLayout: { width: 300, height: 500, alignment: 'center' },
                            appearance: { radius: 12 },
                            typography: { color: 'purple9', fontSize: 24, fontWeight: 700 },
                        },
                    }}
                >
                    Section 1
                </Frame>

                <Frame
                    id="section-2"
                    variant="section"
                    variants={{
                        section: {
                            fill: { type: 'solid', color: 'orange3' },
                            autoLayout: { width: 300, height: 200, alignment: 'center' },
                            appearance: { radius: 12 },
                            typography: { color: 'orange9', fontSize: 24, fontWeight: 700 },
                        },
                    }}
                >
                    Section 2
                </Frame>
            </Frame>
        </Frame>
    ),
};

/**
 * Custom Function Action - DSL Syntax
 * Execute a custom function when triggered from any event
 */
export const CustomFunction: Story = {
    render: () => {
        const [count, setCount] = React.useState(0);
        const [message, setMessage] = React.useState('Click to count!');

        return (
            <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
                <Frame
                    variant="display"
                    variants={{
                        display: {
                            fill: { type: 'solid', color: 'gray3' },
                            autoLayout: { width: 200, height: 80, alignment: 'center' },
                            appearance: { radius: 8 },
                            typography: { color: 'gray9', fontSize: 32, fontWeight: 700 },
                        },
                    }}
                >
                    {count}
                </Frame>

                <Frame
                    id="counter-btn"
                    variant="primary"
                    variants={{
                        primary: {
                            fill: { type: 'solid', color: 'green5' },
                            autoLayout: { paddingHorizontal: 24, paddingVertical: 12, alignment: 'center' },
                            appearance: { radius: 8 },
                            typography: { color: 'white1', fontSize: 16, fontWeight: 600 },
                        },
                        pressed: {
                            fill: { type: 'solid', color: 'green7' },
                            autoLayout: { paddingHorizontal: 24, paddingVertical: 12, alignment: 'center' },
                            appearance: { radius: 8 },
                            typography: { color: 'white1', fontSize: 16, fontWeight: 600 },
                        },
                    }}
                    animate={[
                        {
                            onClick: {
                                action: () => {
                                    setCount((c) => c + 1);
                                    setMessage('Clicked!');
                                    setTimeout(() => setMessage('Click to count!'), 1000);
                                },
                                toVariant: 'pressed',
                                duration: '0.1s'
                            }
                        },
                        {
                            mouseUp: { toVariant: 'primary', duration: '0.2s' }
                        },
                    ] as any}
                >
                    {message}
                </Frame>
            </Frame>
        );
    },
};

/**
 * Browser Back Action - DSL Syntax
 * Navigate back in browser history from any trigger
 */
export const BrowserBack: Story = {
    render: () => (
        <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
            <Frame
                variant="info"
                variants={{
                    info: {
                        fill: { type: 'solid', color: 'blue2' },
                        autoLayout: { paddingHorizontal: 16, paddingVertical: 12, alignment: 'center' },
                        appearance: { radius: 8 },
                        typography: { color: 'blue9', fontSize: 14, fontWeight: 500, textAlign: 'center' },
                    },
                }}
            >
                Note: This will navigate back in your browser history
            </Frame>

            <Frame
                id="back-button"
                variant="secondary"
                variants={{
                    secondary: {
                        fill: { type: 'solid', color: 'gray5' },
                        autoLayout: { paddingHorizontal: 24, paddingVertical: 12, alignment: 'center' },
                        appearance: { radius: 8 },
                        typography: { color: 'white1', fontSize: 16, fontWeight: 600 },
                    },
                }}
                animate={[
                    {
                        onClick: { action: 'back' }
                    },
                ] as any}
            >
                ← Go Back
            </Frame>
        </Frame>
    ),
};

/**
 * Overlay Actions - DSL Syntax
 * Demonstrates overlay open/swap/close actions from any trigger
 * Note: These emit custom events that need to be handled by your overlay system
 */
export const OverlayActions: Story = {
    render: () => {
        const [overlayMessage, setOverlayMessage] = React.useState('No overlay action yet');

        React.useEffect(() => {
            const handleOpenOverlay = (e: CustomEvent) => {
                setOverlayMessage(`Open overlay: ${e.detail.overlayId}`);
            };
            const handleSwapOverlay = (e: CustomEvent) => {
                setOverlayMessage(`Swap overlay: ${e.detail.overlayId}`);
            };
            const handleCloseOverlay = (e: CustomEvent) => {
                setOverlayMessage(`Close overlay: ${e.detail.overlayId}`);
            };

            window.addEventListener('noiir:openOverlay', handleOpenOverlay as EventListener);
            window.addEventListener('noiir:swapOverlay', handleSwapOverlay as EventListener);
            window.addEventListener('noiir:closeOverlay', handleCloseOverlay as EventListener);

            return () => {
                window.removeEventListener('noiir:openOverlay', handleOpenOverlay as EventListener);
                window.removeEventListener('noiir:swapOverlay', handleSwapOverlay as EventListener);
                window.removeEventListener('noiir:closeOverlay', handleCloseOverlay as EventListener);
            };
        }, []);

        return (
            <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
                <Frame
                    variant="display"
                    variants={{
                        display: {
                            fill: { type: 'solid', color: 'gray2' },
                            autoLayout: { width: 300, paddingHorizontal: 16, paddingVertical: 12, alignment: 'center' },
                            appearance: { radius: 8 },
                            typography: { color: 'gray9', fontSize: 14, fontWeight: 500, textAlign: 'center' },
                        },
                    }}
                >
                    {overlayMessage}
                </Frame>

                <Frame autoLayout={{ flow: 'horizontal', gap: 12 }}>
                    <Frame
                        id="open-overlay-btn"
                        variant="default"
                        variants={{
                            default: {
                                fill: { type: 'solid', color: 'blue5' },
                                autoLayout: { paddingHorizontal: 16, paddingVertical: 8, alignment: 'center' },
                                appearance: { radius: 6 },
                                typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
                            },
                        }}
                        animate={[
                            {
                                onClick: { action: 'openOverlay', overlayId: 'modal-1' }
                            },
                        ] as any}
                    >
                        Open Overlay
                    </Frame>

                    <Frame
                        id="swap-overlay-btn"
                        variant="default"
                        variants={{
                            default: {
                                fill: { type: 'solid', color: 'purple5' },
                                autoLayout: { paddingHorizontal: 16, paddingVertical: 8, alignment: 'center' },
                                appearance: { radius: 6 },
                                typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
                            },
                        }}
                        animate={[
                            {
                                onClick: { action: 'swapOverlay', overlayId: 'modal-2' }
                            },
                        ] as any}
                    >
                        Swap Overlay
                    </Frame>

                    <Frame
                        id="close-overlay-btn"
                        variant="default"
                        variants={{
                            default: {
                                fill: { type: 'solid', color: 'red5' },
                                autoLayout: { paddingHorizontal: 16, paddingVertical: 8, alignment: 'center' },
                                appearance: { radius: 6 },
                                typography: { color: 'white1', fontSize: 14, fontWeight: 500 },
                            },
                        }}
                        animate={[
                            {
                                onClick: { action: 'closeOverlay', overlayId: 'modal-1' }
                            },
                        ] as any}
                    >
                        Close Overlay
                    </Frame>
                </Frame>
            </Frame>
        );
    },
};

/**
 * Combined Actions - DSL Syntax
 * Multiple actions triggered from different events
 */
export const CombinedActions: Story = {
    render: () => {
        const [logs, setLogs] = React.useState<string[]>([]);

        const addLog = (message: string) => {
            setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`].slice(-5));
        };

        return (
            <Frame autoLayout={{ flow: 'vertical', gap: 16, alignment: 'center' }}>
                <Frame
                    variant="log-display"
                    variants={{
                        'log-display': {
                            fill: { type: 'solid', color: 'gray1' },
                            autoLayout: { width: 350, paddingHorizontal: 16, paddingVertical: 12, flow: 'vertical', gap: 4 },
                            appearance: { radius: 8 },
                            typography: { color: 'gray9', fontSize: 12, fontFamily: 'monospace' },
                        },
                    }}
                >
                    {logs.length === 0 ? 'Action logs will appear here...' : logs.map((log, i) => (
                        <div key={i}>{log}</div>
                    ))}
                </Frame>

                <Frame
                    id="multi-action-btn"
                    variant="primary"
                    variants={{
                        primary: {
                            fill: {
                                type: 'solid', color: 'gradient',
                                gradient: {
                                    type: 'linear',
                                    angle: 45,
                                    stops: [
                                        { color: 'purple5', position: 0 },
                                        { color: 'pink5', position: 100 },
                                    ],
                                },
                            },
                            autoLayout: { paddingHorizontal: 24, paddingVertical: 12, alignment: 'center' },
                            appearance: { radius: 8 },
                            typography: { color: 'white1', fontSize: 16, fontWeight: 600 },
                        },
                    }}
                    animate={[
                        {
                            onClick: { action: () => addLog('Custom function executed') }
                        },
                        {
                            mouseEnter: { action: () => addLog('Mouse entered') }
                        },
                        {
                            mouseLeave: { action: () => addLog('Mouse left') }
                        },
                    ] as any}
                >
                    Trigger Multiple Actions
                </Frame>
            </Frame>
        );
    },
};
