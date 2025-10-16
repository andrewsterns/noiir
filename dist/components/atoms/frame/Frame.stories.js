import { Frame } from './Frame';
const meta = {
    title: 'Atoms/Frame',
    component: Frame,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Frame component - The foundation of Figma layouts. For detailed property controls, see the individual property stories under "Frame/Properties/".'
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
export const Default = {
    args: {
        children: 'Hello Frame',
        autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 120 },
        fill: { type: 'solid', color: 'neutral1' },
        appearance: { radius: 8 },
        typography: { color: 'neutral9', fontSize: 16, fontWeight: 400, textAlign: 'center' },
        stroke: { type: 'solid', color: 'neutral5' }
    }
};
export const UnifiedFillAPI = {
    args: {
        children: 'API Demo',
        autoLayout: { flow: 'horizontal', alignment: 'center', width: 200, height: 150 },
        fill: { type: 'solid', color: 'primary6' },
        appearance: { radius: 8 }
    }
};
