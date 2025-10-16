import { Frame } from '../../Frame';
const meta = {
    title: 'Frame/Properties/Stroke',
    component: Frame,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Stroke properties control the border appearance of frames including none, solid colors, and gradients.'
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
export const StrokeNone = {
    args: {
        children: 'No Stroke',
        autoLayout: {
            flow: 'horizontal',
            gap: 10,
            padding: 10,
            alignment: 'center',
            width: 280,
            height: 200
        },
        appearance: { radius: 16 },
        fill: { type: 'solid', color: 'neutral2' },
        stroke: { type: 'none' }
    },
    parameters: {
        docs: {
            description: {
                story: 'Frame with no stroke applied.'
            }
        }
    }
};
export const StrokeSolid = {
    args: {
        children: 'Solid Stroke',
        autoLayout: { flow: 'horizontal', alignment: 'center', width: 280, height: 200 },
        appearance: { radius: 16 },
        fill: { type: 'solid', color: 'neutral2' },
        stroke: {
            type: 'solid',
            color: '#3B82F6',
            weight: 3,
            position: 'inside'
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Frame with a solid color stroke.'
            }
        }
    }
};
export const StrokeSolidThick = {
    args: {
        children: 'Thick Solid Stroke',
        autoLayout: { flow: 'horizontal', alignment: 'center', width: 280, height: 200 },
        appearance: { radius: 16 },
        fill: { type: 'solid', color: 'neutral2' },
        stroke: {
            type: 'solid',
            color: '#EF4444',
            weight: 8,
            position: 'center'
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Frame with a thick solid stroke in center position.'
            }
        }
    }
};
export const StrokeSolidOutside = {
    args: {
        children: 'Outside Stroke',
        autoLayout: { flow: 'horizontal', alignment: 'center', width: 280, height: 200 },
        appearance: { radius: 16 },
        fill: { type: 'solid', color: 'neutral2' },
        stroke: {
            type: 'solid',
            color: '#10B981',
            weight: 4,
            position: 'outside'
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Frame with stroke positioned outside the frame bounds.'
            }
        }
    }
};
export const StrokeGradient = {
    args: {
        children: 'Gradient Stroke',
        autoLayout: { flow: 'horizontal', alignment: 'center', width: 280, height: 200 },
        appearance: { radius: 16 },
        fill: { type: 'solid', color: 'neutral2' },
        stroke: {
            type: 'gradient',
            weight: 4,
            stops: [
                { color: '#3B82F6', position: 0 },
                { color: '#EF4444', position: 1 }
            ],
            gradientType: 'linear',
            angle: 45
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Frame with a gradient stroke (simplified - uses first gradient color).'
            }
        }
    }
};
export const StrokeDashed = {
    args: {
        children: 'Dashed Stroke',
        autoLayout: { flow: 'horizontal', alignment: 'center', width: 280, height: 200 },
        appearance: { radius: 16 },
        fill: { type: 'solid', color: 'neutral2' },
        stroke: {
            type: 'solid',
            color: '#8B5CF6',
            weight: 2,
            position: 'inside',
            dashPattern: [8, 4]
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Frame with a dashed stroke pattern.'
            }
        }
    }
};
