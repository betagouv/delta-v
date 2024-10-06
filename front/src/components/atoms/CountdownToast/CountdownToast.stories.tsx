import { Meta } from '@storybook/react';

import { CountdownToast } from './CountdownToast';

export default {
  title: 'Components/Atoms/CountdownToast ',
  component: CountdownToast,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <CountdownToast
      onTimeout={() => {
        console.log('onTimeout');
      }}
    />
    <br />
  </div>
);
