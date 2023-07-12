import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';

import { SummaryDeclaration } from './SummaryDeclaration';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { MeansOfTransport } from '@/stores/simulator/appState.store';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

export default {
  title: 'Components/Business/SummaryDeclaration',
  component: SummaryDeclaration,
} as Meta;

const declarationResponse: DeclarationResponse = {
  authorEmail: faker.internet.email(),
  authorFullName: faker.name.findName(),
  authorId: faker.datatype.uuid(),
  declarantAddressStreet: faker.address.streetAddress(),
  declarantAddressCity: faker.address.city(),
  declarantAddressPostalCode: faker.address.zipCode(),
  declarantPhoneNumber: faker.phone.phoneNumber(),
  declarantAge: 25,
  declarantBorder: false,
  declarantCountry: 'NA',
  declarantEmail: faker.internet.email(),
  declarantFirstName: faker.name.firstName(),
  declarantLastName: faker.name.lastName(),
  declarantMeanOfTransport: MeansOfTransport.PLANE,
  franchiseAmount: 0,
  id: faker.datatype.uuid(),
  publicId: faker.datatype.uuid(),
  status: DeclarationStatus.SUBMITTED,
  totalAmount: faker.datatype.number(),
  totalCustomDutyAmount: faker.datatype.number(),
  totalTaxesAmount: faker.datatype.number(),
  totalVatAmount: faker.datatype.number(),
  versionDate: faker.date.recent(),
  products: [
    {
      id: 'test',
      name: 'Vètements Adulte',
      customName: 'Jean Levis',
      customId: '12',
      customDuty: 0.05,
      vat: 0.1,
      unitPrice: 400,
      originalCurrency: 'EUR',
      originalPrice: 400,
      rateCurrency: 1,
      unitCustomDuty: 0,
      unitVat: 0,
      unitTaxes: 0,
    },
    {
      id: 'test2',
      name: 'Smartphone',
      customName: 'Iphone 11',
      customId: '13',
      customDuty: 0.05,
      vat: 0.1,
      unitPrice: 200,
      originalCurrency: 'EUR',
      originalPrice: 200,
      rateCurrency: 1,
      unitCustomDuty: 10,
      unitVat: 20,
      unitTaxes: 30,
    },
  ],
};

export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <SummaryDeclaration declarationResponse={declarationResponse} />
    <br />
  </div>
);
