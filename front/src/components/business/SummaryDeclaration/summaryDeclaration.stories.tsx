import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';

import { SummaryDeclaration } from './SummaryDeclaration';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { MeansOfTransport, ProductStatus } from '@/stores/simulator/appState.store';
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
  canCalculateTaxes: true,
  products: [
    {
      id: faker.datatype.uuid(),
      status: ProductStatus.AMOUNT_PRODUCT,
      name: faker.commerce.productName(),
      customDuty: faker.datatype.number(),
      customId: faker.datatype.uuid(),
      notManagedProduct: false,
      originalCurrency: faker.finance.currencyCode(),
      originalPrice: faker.datatype.number(),
      rateCurrency: faker.datatype.number(),
      unitCustomDuty: faker.datatype.number(),
      unitTaxes: faker.datatype.number(),
      unitVat: faker.datatype.number(),
      vat: faker.datatype.number(),
      unitPrice: faker.datatype.number(),
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
