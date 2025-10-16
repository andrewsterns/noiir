export type AnimationDuration = number | string;
export declare const DURATION_PRESETS: {
    readonly instant: 0;
    readonly fast: 150;
    readonly normal: 300;
    readonly slow: 500;
    readonly slower: 700;
};
export type DurationPreset = keyof typeof DURATION_PRESETS;
export declare function getDuration(duration: AnimationDuration): number;
export declare function isValidDuration(duration: AnimationDuration): boolean;
export declare function getDurationAsString(duration: AnimationDuration): string;
export declare function getAvailableDurations(): {
    name: DurationPreset;
    value: number;
}[];
