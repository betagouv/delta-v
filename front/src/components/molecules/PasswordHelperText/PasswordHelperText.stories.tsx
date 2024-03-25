import { Meta } from '@storybook/react';

import { PasswordHelperText } from './PasswordHelperText';

export default {
  title: 'Components/Common/PasswordHelperText',
  component: PasswordHelperText,
} as Meta;

export const withVariant = (): JSX.Element => {
  return (
    <div className="p-3">
      <PasswordHelperText password="Password9" />
    </div>
  );
};
