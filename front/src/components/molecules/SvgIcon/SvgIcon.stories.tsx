import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { SvgIcon } from './SvgIcon';

export default {
  title: 'Components/Common/SvgIcon',
  component: SvgIcon,
} as Meta;

export const Base = (): JSX.Element => {
  return (
    <div className="h-10 w-10">
      <SvgIcon name="car" />
    </div>
  );
};
