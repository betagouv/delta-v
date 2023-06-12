import React from 'react';

import { Meta } from '@storybook/react';

import { TaxTable } from './TaxTable';
import { DeclarationResponse, MeansOfTransport } from '@/stores/declaration/appState.store';
import { DetailedProduct } from '@/stores/simulator/appState.store';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

export default {
  title: 'Components/Common/TaxTable',
  component: TaxTable,
} as Meta;

const valueProducts: DetailedProduct[] = [
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

const simulatorResponse: DeclarationResponse = {
  products: valueProducts,
  declarantAge: 25,
  declarantFirstName: 'Jean',
  declarantLastName: 'Dupont',
  declarantEmail: 'jean@dupont',
  declarantPhoneNumber: '0123456789',
  authorEmail: 'jean@dupont',
  authorFullName: 'Jean Dupont',
  authorId: '123',
  declarantCountry: 'AD',
  publicId: '123',
  declarantMeanOfTransport: MeansOfTransport.CAR,
  id: '123',
  status: DeclarationStatus.PAID,
  franchiseAmount: 0,
  totalAmount: 0,
  totalCustomDutyAmount: 0,
  totalVatAmount: 0,
  totalTaxesAmount: 0,
  versionDate: new Date('2022-01-01'),
  declarantBorder: false,
  declarantAddressCity: 'Paris',
  declarantAddressPostalCode: '75000',
  declarantAddressStreet: 'Rue de Paris',
};

export const withVariant = (): JSX.Element => (
  <div style={{ background: 'lightgrey' }}>
    <TaxTable declarationResponse={simulatorResponse} />
  </div>
);
