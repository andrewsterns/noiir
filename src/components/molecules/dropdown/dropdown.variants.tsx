
export type DropdownVariant = 'default' | 'minimalBw';

export interface DropdownVariantConfig {
  button?: {
    variant?: string;
    fill?: any;
    stroke?: any;
    appearance?: any;
    typography?: any;
    effects?: any;
  };
  list?: {
    fill?: any;
    stroke?: any;
    appearance?: any;
    typography?: any;
    effects?: any;
  };
}

export const DROPDOWN_VARIANTS: Record<DropdownVariant, DropdownVariantConfig> = {
  default: {},
  minimalBw: {
    button: {
      variant: 'outline',
      fill: { type: 'solid', color: 'white' },
      stroke: { type: 'solid', color: 'black', weight: 1 },
      appearance: { radius: 8 },
      typography: { color: 'black', fontWeight: 500, fontSize: 16 },
      effects: undefined,
    },
    list: {
      fill: { type: 'solid', color: 'white' },
      stroke: { type: 'solid', color: 'black', weight: 1 },
      appearance: { radius: 8 },
      typography: { color: 'black', fontWeight: 400, fontSize: 16 },
      effects: undefined,
    },
  },
};
