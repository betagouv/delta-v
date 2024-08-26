import React from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';

import { AgentConnectButton, AgentConnectButtonProps } from './AgentConnectButton';

export default {
  title: 'Components/Atoms/AgentConnectButton',
  component: AgentConnectButton,
} as Meta;

const Template: Story<AgentConnectButtonProps> = (args) => <AgentConnectButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: action('AgentConnect button clicked'),
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  onClick: action('AgentConnect button clicked'),
};

export const Disabled = Template.bind({});
Disabled.args = {
  onClick: action('AgentConnect button clicked'),
};

export const Loading = Template.bind({});
Loading.args = {
  onClick: action('AgentConnect button clicked'),
};
