import { Meta } from '@storybook/react';

import { AmountProductBasket } from './AmountProductBasket';
import { AmountProductBasketGroup } from './AmountProductBasketGroup';
import { AmountProduct } from '@/model/product';
import { AmountProductInterface, GroupedAmountProduct } from '@/stores/simulator/appState.store';

export default {
  title: 'Components/Common/AmountProductBasket',
  component: AmountProductBasket,
} as Meta;

const amountProduct: AmountProductInterface = {
  id: '12',
  customId: '12',
  name: 'Produit',
  customName: 'Produit 1',
  amount: 500,
  amountProduct: AmountProduct.tobacco,
};

const groupedProduct: GroupedAmountProduct = {
  group: 'alcoholIntermediate',
  products: [amountProduct, amountProduct, amountProduct],
  isOverMaximum: true,
};

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Base product basket :</p>
    <br />
    <AmountProductBasket product={amountProduct} onButtonClick={() => console.log('clicked')} />
    <br />
    <p>Product basket with error:</p>
    <br />
    <AmountProductBasket
      product={amountProduct}
      containError
      onButtonClick={() => console.log('clicked')}
    />
    <br />
  </div>
);

export const group = (): JSX.Element => (
  <div className="p-3">
    <AmountProductBasketGroup amountProductGroup={groupedProduct} />
  </div>
);
