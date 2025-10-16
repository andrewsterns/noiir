import React from 'react';
declare const _default: {
    title: string;
    component: {
        (props: import("../Frame").FrameProps): React.DOMElement<{
            onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
            onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
            onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
            id: string | undefined;
            className: string | undefined;
            style: React.CSSProperties;
        }, Element>;
        displayName: string;
    };
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
    };
};
export default _default;
export declare const BasicClickAnimation: () => import("react/jsx-runtime").JSX.Element;
export declare const HoverAnimation: () => import("react/jsx-runtime").JSX.Element;
export declare const CardHoverEffect: () => import("react/jsx-runtime").JSX.Element;
export declare const ButtonStateCycle: () => import("react/jsx-runtime").JSX.Element;
export declare const DifferentAnimationTypes: () => import("react/jsx-runtime").JSX.Element;
export declare const InteractiveDemo: () => import("react/jsx-runtime").JSX.Element;
export declare const ClickCounter: () => import("react/jsx-runtime").JSX.Element;
export declare const CursorDemo: () => import("react/jsx-runtime").JSX.Element;
export declare const PolymorphicFrame: () => import("react/jsx-runtime").JSX.Element;
