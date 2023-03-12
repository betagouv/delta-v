import React from 'react';

import { Meta } from '@storybook/react';

import { TaxTable } from './TaxTable';
import { DetailedProduct } from '@/stores/simulator/appState.store';

export default {
  title: 'Components/Common/TaxTable',
  component: TaxTable,
} as Meta;

const detailedProduct: DetailedProduct[] = [
  {
    id: '1000',
    customId: '10',
    name: 'Produit',
    customName: 'Produit 1',
    customDuty: 5,
    vat: 20,
    unitPrice: 250,
    originalCurrency: 'EUR',
    originalPrice: 250,
    rateCurrency: 1,
    unitCustomDuty: 12.5,
    unitVat: 50,
    unitTaxes: 62.5,
  },
  {
    id: '1200',
    customId: '12',
    name: 'Produit',
    customName: 'Produit 1',
    customDuty: 5,
    vat: 20,
    unitPrice: 250,
    originalCurrency: 'EUR',
    originalPrice: 250,
    rateCurrency: 1,
    unitCustomDuty: 12.5,
    unitVat: 50,
    unitTaxes: 50.5,
  },
];

export const withVariant = (): JSX.Element => (
  <div style={{ background: 'lightgrey' }}>
    <TaxTable data={detailedProduct} />
  </div>
);
