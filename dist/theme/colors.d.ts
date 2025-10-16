/**
 * Design System Colors
 * Converted from colors.css for TypeScript usage
 */
export declare const colors: {
    readonly primary: {
        readonly 1: "#f4f6fb";
        readonly 2: "#e7ebfa";
        readonly 3: "#c7d3f5";
        readonly 4: "#9aaef0";
        readonly 5: "#6a84e8";
        readonly 6: "#495fd5";
        readonly 7: "#3545b0";
        readonly 8: "#27368c";
        readonly 9: "#1d2967";
        readonly 10: "#161f4c";
        readonly 11: "#0f1634";
        readonly 12: "#0a0b1e";
    };
    readonly secondary: {
        readonly 1: "#f6f7f8";
        readonly 2: "#eceef0";
        readonly 3: "#dadde1";
        readonly 4: "#b4b8bf";
        readonly 5: "#8a9099";
        readonly 6: "#666c74";
        readonly 7: "#4c5158";
        readonly 8: "#36393f";
        readonly 9: "#25272b";
        readonly 10: "#1b1c1f";
        readonly 11: "#101113";
        readonly 12: "#070708";
    };
    readonly accent: {
        readonly 1: "#faf6ff";
        readonly 2: "#f0e8ff";
        readonly 3: "#dfccff";
        readonly 4: "#c2a5ff";
        readonly 5: "#9f77f5";
        readonly 6: "#8458e8";
        readonly 7: "#6b3fca";
        readonly 8: "#532fa4";
        readonly 9: "#3d227d";
        readonly 10: "#2c175b";
        readonly 11: "#1d0f3c";
        readonly 12: "#0f061f";
    };
    readonly neutral: {
        readonly 1: "#f5f5f6";
        readonly 2: "#e8e8ea";
        readonly 3: "#cfcfd3";
        readonly 4: "#a8a8ad";
        readonly 5: "#7d7d83";
        readonly 6: "#57575d";
        readonly 7: "#3d3d42";
        readonly 8: "#28282c";
        readonly 9: "#1a1a1e";
        readonly 10: "#121215";
        readonly 11: "#0a0a0c";
        readonly 12: "#000000";
    };
    readonly success: {
        readonly 1: "#f0fdf4";
        readonly 2: "#dcfce7";
        readonly 3: "#bbf7d0";
        readonly 4: "#86efac";
        readonly 5: "#4ade80";
        readonly 6: "#22c55e";
        readonly 7: "#16a34a";
        readonly 8: "#15803d";
        readonly 9: "#166534";
        readonly 10: "#14532d";
        readonly 11: "#052e16";
        readonly 12: "#021c08";
    };
    readonly warning: {
        readonly 1: "#fffbeb";
        readonly 2: "#fef3c7";
        readonly 3: "#fde68a";
        readonly 4: "#fcd34d";
        readonly 5: "#fbbf24";
        readonly 6: "#f59e0b";
        readonly 7: "#d97706";
        readonly 8: "#b45309";
        readonly 9: "#92400e";
        readonly 10: "#78350f";
        readonly 11: "#451a03";
        readonly 12: "#1c0a01";
    };
    readonly error: {
        readonly 1: "#fef2f2";
        readonly 2: "#fee2e2";
        readonly 3: "#fecaca";
        readonly 4: "#fca5a5";
        readonly 5: "#f87171";
        readonly 6: "#ef4444";
        readonly 7: "#dc2626";
        readonly 8: "#b91c1c";
        readonly 9: "#991b1b";
        readonly 10: "#7f1d1d";
        readonly 11: "#450a0a";
        readonly 12: "#1a0404";
    };
};
/**
 * Color utility functions
 */
export declare const colorUtils: {
    /**
     * Convert hex to rgba
     */
    hexToRgba: (hex: string, alpha?: number) => string;
};
/**
 * Helper function to resolve color strings like 'primary3' or hex colors
 */
export declare const resolveColor: (colorInput: string) => string;
/**
 * Type definitions for colors
 */
export type ColorScale = typeof colors.primary;
export type ColorKey = keyof typeof colors;
export type ColorShade = keyof ColorScale;
/**
 * Re-export for convenience
 */
export default colors;
