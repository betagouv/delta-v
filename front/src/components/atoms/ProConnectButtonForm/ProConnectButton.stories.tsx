import React from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';

import { ProConnectButtonForm, ProConnectButtonFormProps } from './ProConnectButtonForm';

export default {
  title: 'Components/Atoms/ProConnectButtonForm',
  component: ProConnectButtonForm,
} as Meta;

const Template: Story<ProConnectButtonFormProps> = (args) => <ProConnectButtonForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: action('AgentConnect button clicked'),
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  onSubmit: action('AgentConnect button clicked'),
};

export const Disabled = Template.bind({});
Disabled.args = {
  onSubmit: action('AgentConnect button clicked'),
};

export const Loading = Template.bind({});
Loading.args = {
  onSubmit: action('AgentConnect button clicked'),
};
