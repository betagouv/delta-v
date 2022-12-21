import { Meta } from '@storybook/react';

import { ValueProductBasket } from './ValueProductBasket';

export default {
  title: 'Components/Common/ProductBasket',
  component: ValueProductBasket,
} as Meta;

const detailedProduct = {
  id: '12',
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
  unitTaxes: 62.5,
};

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Product basket :</p>
    <br />
    <ValueProductBasket
      detailedProduct={detailedProduct}
      // eslint-disable-next-line no-alert
      onUpdateProduct={() => alert('On Update')}
      // eslint-disable-next-line no-alert
      onDeleteProduct={() => alert('On Delete')}
    />
    <br />
  </div>
);
