import { Meta } from '@storybook/react';

import { Faqs } from './Faqs';

export default {
  title: 'Components/Business/Faqs',
  component: Faqs,
} as Meta;

const items = [
  {
    title: 'Vêtements',
    faqs: [
      {
        id: '1',
        question: 'Vêtements',
        answer: 'Vêtements',
      },
      {
        id: '2',
        question: 'Tissus',
        answer: 'Tissus',
      },
      {
        id: '3',
        question: 'Chaussures',
        answer: 'Chaussures',
      },
    ],
  },
  {
    title: 'Chaussures',
    faqs: [
      {
        id: '1',
        question: 'Vêtements',
        answer: 'Vêtements',
      },
      {
        id: '2',
        question: 'Tissus',
        answer: 'Tissus',
      },
      {
        id: '3',
        question: 'Chaussures',
        answer: 'Chaussures',
      },
    ],
  },
  {
    title: 'Maroquinerie',
    faqs: [
      {
        id: '1',
        question: 'Vêtements',
        answer: 'Vêtements',
      },
      {
        id: '2',
        question: 'Tissus',
        answer: 'Tissus',
      },
      {
        id: '3',
        question: 'Chaussures',
        answer: 'Chaussures',
      },
    ],
  },
];

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <br />
    <Faqs items={items} />
    <br />
  </div>
);
