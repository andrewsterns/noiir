import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Group } from '../../__components__/group/group';
import { Frame } from '../../__components__/frame/Frame';
import { AnimateProvider } from '../../__frame-core__/animate/animate.props';

const meta: Meta<typeof Group> = {
	title: 'Core/Group',
	component: Group,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Group is a pure container for organizing Frames. It does not apply styling or layout.'
			}
		}
	},
	tags: ['autodocs']
};

export default meta;
type GroupStory = StoryObj<typeof Group>;

export const BasicGroup: GroupStory = {
	name: 'Basic Group',
	render: () => (
		<Group id="basicGroup">
			<Frame autoLayout={{ width: 100, height: 100 }} fill={{ type: 'solid', color: 'primary6' }} />
			<Frame autoLayout={{ width: 100, height: 100 }} fill={{ type: 'solid', color: 'accent6' }} />
			<Frame autoLayout={{ width: 100, height: 100 }} fill={{ type: 'solid', color: 'success6' }} />
		</Group>
	),
	parameters: {
		docs: {
			description: {
				story: 'A Group containing three Frames. No animation or styling is applied by Group.'
			}
		}
	}
};

export const AnimatedGroup: GroupStory = {
    name: 'Group with Animation',
    render: () => (
        <AnimateProvider>
            <Group id="grandparent"
            animate={[
                           
                            { onClick: { toVariant: 'parent.childGroup.ownFrame.active', curve: 'ease-in', duration: '0.5s' } }
                        ]}
            >
                <Group id="parent"
                >
                    <Group
                        id="childGroup"
                        animate={[
                            { onClick: { toVariant: 'parent.siblingGroup.nestedFrame.active', curve: 'ease-in', duration: '1s' } },
                        
                        ]}
                    >
                        <Frame
                            id="ownFrame"
                            variant="default"
                            variants={{ default: { fill: { type: 'solid', color: 'primary6' } }, active: { fill: { type: 'solid', color: 'gray6' } } }}
                            autoLayout={{ width: 120, height: 120 }}
                        >click</Frame>
                    </Group>
                    <Group id="siblingGroup">
                        <Frame
                            id="nestedFrame"
                            variant="default"
                            variants={{ default: { fill: { type: 'solid', color: 'accent6' } }, active: { fill: { type: 'solid', color: 'red3' } } }}
                            autoLayout={{ width: 120, height: 120 }}
                        ></Frame>
                    </Group>
                </Group>
            </Group>
        </AnimateProvider>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Groups with hierarchical animation: clicking childGroup triggers variant changes on deeply nested frames using dot-separated paths.'
            }
        }
    }
};
