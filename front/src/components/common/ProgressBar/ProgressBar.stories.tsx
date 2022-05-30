import { Meta } from '@storybook/react';

import { ProgressBar } from './ProgressBar';

export default {
  title: 'Components/Common/ProgressBar',
  component: ProgressBar,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Progress bar 15% :</p>
    <br />
    <ProgressBar progression={15} />
    <br />
    <p>Progress bar 50% :</p>
    <br />
    <ProgressBar progression={50} />
    <br />
    <p>Progress bar 75% :</p>
    <br />
    <ProgressBar progression={75} />
    <br />
  </div>
);
