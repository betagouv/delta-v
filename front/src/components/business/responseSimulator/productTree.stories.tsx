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
        id: '1',
        name: 'Cuir',
        amount: 2,
        unitPrice: 100,
        unitVat: 20,
        unitCustomDuty: 3,
        unitTaxes: 25,
        totalPrice: 200,
        totalCustomDuty: 6,
        totalVat: 40,
        totalTaxes: 46,
        customDuty: 3,
        vat: 20,
      },
      {
        id: '2',
        name: 'Perruques et autres articles en cheveux',
        amount: 4,
        unitPrice: 30,
        unitVat: 20,
        unitCustomDuty: 3,
        unitTaxes: 25,
        totalPrice: 120,
        totalCustomDuty: 2.64,
        totalVat: 24,
        totalTaxes: 46,
        customDuty: 2.2,
        vat: 20,
      },
      {
        id: '3',
        name: 'Bijoux en métaux précieux',
        amount: 1,
        unitPrice: 350,
        unitVat: 20,
        unitCustomDuty: 3,
        unitTaxes: 25,
        totalPrice: 350,
        totalCustomDuty: 8.75,
        totalVat: 70,
        totalTaxes: 46,
        customDuty: 2.5,
        vat: 20,
      },
    ],
    total: 670,
    totalCustomDuty: 16.75,
    totalVat: 134,
    totalTaxes: 46,
    franchiseAmount: 430,
  };
  return <ResponseSimulator response={responseData} />;
};
