import { Meta } from '@storybook/react';

import { Faqs } from './Faqs';
import { BlocElements } from '@/staticData';

export default {
  title: 'Components/Business/Faqs',
  component: Faqs,
} as Meta;

const searchData: BlocElements[] = [];

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <br />
    <Faqs faqData={searchData} />
    <br />
  </div>
);
