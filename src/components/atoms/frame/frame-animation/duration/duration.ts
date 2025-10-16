// Duration logic for frame animation

// Duration can be a number (ms) or a CSS time string (e.g. '300ms', '0.5s')
export type AnimationDuration = number | string;

// Predefined duration presets
export const DURATION_PRESETS = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
} as const;

export type DurationPreset = keyof typeof DURATION_PRESETS;

// Convert duration to milliseconds
export function getDuration(duration: AnimationDuration): number {
  if (typeof duration === 'number') {
    return Math.max(0, duration); // Ensure non-negative
  }

  if (typeof duration === 'string') {
    // Check if it's a preset name
    if (duration in DURATION_PRESETS) {
      return DURATION_PRESETS[duration as DurationPreset];
    }

    // Convert CSS time string to ms
    const trimmed = duration.trim().toLowerCase();
    if (trimmed.endsWith('ms')) {
      return Math.max(0, parseFloat(trimmed));
    }
    if (trimmed.endsWith('s')) {
      return Math.max(0, parseFloat(trimmed) * 1000);
    }

    // Try to parse as plain number
    const parsed = parseFloat(trimmed);
    if (!isNaN(parsed)) {
      return Math.max(0, parsed);
    }
  }

  // Default fallback
  return DURATION_PRESETS.normal;
}

// Validate duration value
export function isValidDuration(duration: AnimationDuration): boolean {
  if (typeof duration === 'number') {
    return duration >= 0;
  }

  if (typeof duration === 'string') {
    // Check presets
    if (duration in DURATION_PRESETS) {
      return true;
    }

    // Check CSS time formats
    const trimmed = duration.trim().toLowerCase();
    if (trimmed.endsWith('ms') || trimmed.endsWith('s')) {
      return !isNaN(parseFloat(trimmed));
    }

    // Check plain numbers
    return !isNaN(parseFloat(trimmed));
  }

  return false;
}

// Get duration as CSS string
export function getDurationAsString(duration: AnimationDuration): string {
  const ms = getDuration(duration);
  return `${ms}ms`;
}

// Get all available duration presets
export function getAvailableDurations(): { name: DurationPreset; value: number }[] {
  return Object.entries(DURATION_PRESETS).map(([name, value]) => ({
    name: name as DurationPreset,
    value,
  }));
}
