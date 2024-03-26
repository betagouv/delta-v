import React from 'react';

import { Meta, Story } from '@storybook/react';

import { colorStringList } from '../../../utils/stories';
import { Icon, IIconProps } from './Icon';
import { getAllAvailableIcons } from './selection.utils';

const allIcons = getAllAvailableIcons();
export default {
  title: 'Components/Atoms/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: {
        type: 'select',
        options: allIcons,
      },
      defaultValue: 'web',
    },
    color: {
      control: {
        type: 'select',
        options: colorStringList,
      },
      defaultValue: 'primary',
    },
  },
} as Meta;

const Template: Story<IIconProps> = (args) => (
  <div
    style={{
      width: '50px',
      height: '100px',
      textAlign: 'center',
    }}
  >
    <Icon {...args} />
    <p>{args.name}</p>
  </div>
);

export const Basic = Template.bind({});
