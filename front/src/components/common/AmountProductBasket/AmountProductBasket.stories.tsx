import { Meta } from '@storybook/react';

import { AmountProductBasket } from './AmountProductBasket';
import { AmountProduct } from '@/model/product';
import { AmountProductInterface } from '@/stores/simulator/appState.store';

export default {
  title: 'Components/Common/AmountProductBasket',
  component: AmountProductBasket,
} as Meta;

const amountProduct: AmountProductInterface = {
  id: '12',
  customId: '12',
  name: 'Produit',
  customName: 'Produit 1',
  amount: 5,
  amountProduct: AmountProduct.cigarette,
};

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Product basket :</p>
    <br />
    <AmountProductBasket
      product={amountProduct}
      // eslint-disable-next-line no-alert
      onUpdateProduct={() => alert('On Update')}
      // eslint-disable-next-line no-alert
      onDeleteProduct={() => alert('On Delete')}
    />
    <br />
  </div>
);
