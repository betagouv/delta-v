import { Meta } from '@storybook/react';

import { Faqs } from './Faqs';

export default {
  title: 'Components/Business/Faqs',
  component: Faqs,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <br />
    <Faqs />
    <br />
  </div>
);
