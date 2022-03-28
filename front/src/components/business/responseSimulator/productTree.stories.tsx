import React from 'react';

import { Meta } from '@storybook/react';

// eslint-disable-next-line import/no-extraneous-dependencies

import { ResponseData, ResponseSimulator } from './responseSimulator';

export default {
  title: 'Components/Business/responseSimulator',
  component: ResponseSimulator,
} as Meta;

export const WithVariant = () => {
  const responseData: ResponseData = {
    products: [
      {
        name: 'Cuir',
        amount: 2,
        unitPrice: 100,
        totalPrice: 200,
        totalCustomDuty: 6,
        totalVat: 40,
        customDuty: 3,
        vat: 20,
      },
      {
        name: 'Perruques et autres articles en cheveux',
        amount: 4,
        unitPrice: 30,
        totalPrice: 120,
        totalCustomDuty: 2.64,
        totalVat: 24,
        customDuty: 2.2,
        vat: 20,
      },
      {
        name: 'Bijoux en métaux précieux',
        amount: 1,
        unitPrice: 350,
        totalPrice: 350,
        totalCustomDuty: 8.75,
        totalVat: 70,
        customDuty: 2.5,
        vat: 20,
      },
    ],
    total: 670,
    totalCustomDuty: 16.75,
    totalVat: 134,
  };
  return <ResponseSimulator response={responseData} />;
};
