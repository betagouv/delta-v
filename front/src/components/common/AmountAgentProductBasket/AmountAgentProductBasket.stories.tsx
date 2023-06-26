import { Meta } from '@storybook/react';

import { AmountAgentProductBasket } from './AmountAgentProductBasket';
import { AmountAgentProductBasketGroup } from './AmountAgentProductBasketGroup';
import { AmountProduct } from '@/model/product';
import { AmountProductInterface, GroupedAmountProduct } from '@/stores/simulator/appState.store';

export default {
  title: 'Components/Common/AmountProductBasket',
  component: AmountAgentProductBasket,
} as Meta;

const amountProduct: AmountProductInterface = {
  id: '12',
  customId: '12',
  name: 'Produit',
  customName: 'Produit 1',
  amount: 500,
  amountProduct: AmountProduct.tobacco,
};

const groupedOverMaxProduct: GroupedAmountProduct = {
  group: 'alcoholIntermediate',
  products: [amountProduct, amountProduct, amountProduct],
  isOverMaximum: true,
};

const groupedProduct: GroupedAmountProduct = {
  group: 'alcoholIntermediate',
  products: [amountProduct, amountProduct, amountProduct],
  isOverMaximum: false,
};

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Base product basket :</p>
    <br />
    <AmountAgentProductBasket
      product={amountProduct}
      onButtonClick={() => console.log('clicked')}
    />
    <br />
    <p>Product basket with error:</p>
    <br />
    <AmountAgentProductBasket
      product={amountProduct}
      containError
      onButtonClick={() => console.log('clicked')}
    />
    <br />
  </div>
);

export const group = (): JSX.Element => (
  <div className="gap-12 p-3 flex flex-col">
    <div>
      <p>Group over maximum limit :</p>
      <br />
      <AmountAgentProductBasketGroup amountProductGroup={groupedOverMaxProduct} />
    </div>
    <div>
      <p>Group under maximum limit :</p>
      <br />
      <AmountAgentProductBasketGroup amountProductGroup={groupedProduct} />
    </div>
  </div>
);
