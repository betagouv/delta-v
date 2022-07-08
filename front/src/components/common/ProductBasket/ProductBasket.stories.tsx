import { Meta } from '@storybook/react';

import { ProductBasket } from './ProductBasket';
import { Product, ProductDisplayTypes } from '@/model/product';

export default {
  title: 'Components/Common/ProductBasket',
  component: ProductBasket,
} as Meta;

const product: Product = {
  id: 'b47dab76-acca-4d78-ba3b-7323b17dcb8b',
  name: 'Vêtement pour adulte',
  icon: 'categoryAdultClothes',
  finalProduct: true,
  productDisplayTypes: ProductDisplayTypes.radio,
  info: 'Vêtement pour adulte.',
  childrenQuestion: 'Est-il en cuir ?',
  customDuty: null,
  vat: null,
  nomenclatures: null,
  subProducts: [],
  relatedWords: [],
};

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Product basket :</p>
    <br />
    <ProductBasket
      basketProduct={{
        shoppingProduct: { id: '12', product, price: 25.99, name: 'Jean Levis', amount: 1 },
      }}
      // eslint-disable-next-line no-alert
      onUpdateProduct={() => alert('On Update')}
      // eslint-disable-next-line no-alert
      onDeleteProduct={() => alert('On Delete')}
    />
    <br />
  </div>
);
