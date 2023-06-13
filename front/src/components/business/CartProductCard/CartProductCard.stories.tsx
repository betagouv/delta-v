import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';

import { CartProductCard, CartProductCardProps } from './CartProductCard';
import { productFactory } from '@/tests/factories/Product.factory';

const product = productFactory({});

const meta: Meta<typeof CartProductCard> = {
  title: 'Components/Business/CartProductCard',
  component: CartProductCard,
};

export default meta;

const CART_PRODUCT_CARD_DATA: CartProductCardProps = {
  product,
  declaredPrice: faker.lorem.sentence(3),
  vatAmount: faker.lorem.sentence(3),
};

export const Base = () => (
  <div>
    <CartProductCard
      {...CART_PRODUCT_CARD_DATA}
      detailsButton
      productDetails={faker.lorem.paragraph()}
    />
  </div>
);

export const WithoutDetails = () => (
  <div>
    <CartProductCard {...CART_PRODUCT_CARD_DATA} />
  </div>
);

export const Selectable = () => (
  <div>
    <CartProductCard {...CART_PRODUCT_CARD_DATA} checkbox bgColor="selectable" />
  </div>
);
