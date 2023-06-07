import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';

import { CartProductCard, CartProductCardProps } from './CartProductCard';
import { CartProductCards, CartProductCardsProps } from './CartProductCards';
import { DetailedProduct } from '@/stores/simulator/appState.store';

const meta: Meta<typeof CartProductCard> = {
  title: 'Components/Business/CartProductCards',
  component: CartProductCard,
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

const item1: CartProductCardProps = {
  product: product1,
  declaredPrice: faker.lorem.sentence(3),
  vatAmount: faker.lorem.sentence(3),
  relatedWords: [],
  nomenclatures: [
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
  ],
  deletable: true,
  bgColor: 'selectable',
  detailsButton: true,
  setSelectedId: () => {},
  isChecked: true,
  onCheckedChange: () => {},
};

const item2: CartProductCardProps = {
  product: product2,
  declaredPrice: faker.lorem.sentence(3),
  vatAmount: faker.lorem.sentence(3),
  relatedWords: [],
  nomenclatures: [
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
    faker.datatype.number({ min: 1000, max: 9999 }).toString(),
  ],
  deletable: true,
  bgColor: 'selectable',
  setSelectedId: () => {},
  isChecked: false,
  onCheckedChange: () => {},
};

const CART_PRODUCT_CARDS_DATA: CartProductCardsProps = {
  items: [item1, item2],
};

export const Selectable = () => {
  return (
    <div>
      <CartProductCards {...CART_PRODUCT_CARDS_DATA} />
    </div>
  );
};
