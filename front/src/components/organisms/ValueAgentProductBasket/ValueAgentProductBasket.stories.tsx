import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';

import { ValueAgentProductBasket, ValueAgentProductBasketProps } from './ValueAgentProductBasket';
import { DetailedProduct } from '@/stores/simulator/appState.store';

const meta: Meta<typeof ValueAgentProductBasket> = {
  title: 'Components/Business/ValueAgentProductBaskets',
  component: ValueAgentProductBasket,
};

export default meta;

const product1: DetailedProduct = {
  id: '1000',
  customId: '10',
  name: faker.commerce.productName(),
  customName: faker.commerce.productName(),
  customDuty: 5,
  vat: 20,
  unitPrice: 250,
  originalCurrency: 'EUR',
  originalPrice: 250,
  rateCurrency: 1,
  unitCustomDuty: 12.5,
  unitVat: 50,
  unitTaxes: 62.5,
};

const product2: DetailedProduct = {
  id: '1000',
  customId: '109',
  name: faker.commerce.productName(),
  customName: faker.commerce.productName(),
  customDuty: 5,
  vat: 20,
  unitPrice: 250,
  originalCurrency: 'EUR',
  originalPrice: 250,
  rateCurrency: 1,
  unitCustomDuty: 12.5,
  unitVat: 50,
  unitTaxes: 62.5,
};

const item1: ValueAgentProductBasketProps = {
  product: product1,
  nomenclatures: [
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
  ],
  deletable: true,
  detailsButton: true,
  onDelete: (id) => console.log(id),
};

const item2: ValueAgentProductBasketProps = {
  product: product1,
  nomenclatures: [
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
  ],
  deletable: true,
  detailsButton: false,
  onDelete: (id) => console.log(id),
};

const item3: ValueAgentProductBasketProps = {
  product: product1,
  nomenclatures: [
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
  ],
  deletable: false,
  detailsButton: true,
  onDelete: (id) => console.log(id),
};

const item4: ValueAgentProductBasketProps = {
  product: product2,
  nomenclatures: [
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
  ],
  deletable: false,
  onDelete: (id) => console.log(id),
};

export const Base = () => {
  return (
    <div className="flex flex-col gap-8">
      <ValueAgentProductBasket {...item1} />
      <ValueAgentProductBasket {...item2} />
      <ValueAgentProductBasket {...item3} />
      <ValueAgentProductBasket {...item4} />
    </div>
  );
};
