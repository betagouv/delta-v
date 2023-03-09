import { Meta } from '@storybook/react';

import { NomenclatureCard, NomenclatureCardProps } from './NomenclatureCard';
import { AmountProduct, ProductDisplayTypes, ProductType } from '@/model/product';

const meta: Meta<typeof NomenclatureCard> = {
  title: 'Components/Business/NomenclatureCard',
  component: NomenclatureCard,
};

export default meta;

const NOMENCLATURE_CARD_DATA: NomenclatureCardProps = {
  product: {
    id: 'cf9f2f7a-5732-4792-90eb-3fcb444b84eb',
    icon: 'categoryCigarette',
    name: 'Cigarettes',
    info: 'Cigarettes',
    relatedWords: [
      'manteaux',
      'vestes',
      'cabans',
      'capes',
      'anoraks',
      'blousons',
      'manteaux',
      'vestes',
      'cabans',
      'capes',
      'anoraks',
      'blousons',
    ],
    finalProduct: true,
    productDisplayTypes: ProductDisplayTypes.addable,
    amountProduct: AmountProduct.cigarette,
    productType: ProductType.amount,
    countries: ['FR'],
    childrenQuestion: null,
    subProducts: [],
    nomenclatures: ['3304', '3305', '3308'],
  },
};

export const Base = () => (
  <div>
    <NomenclatureCard product={NOMENCLATURE_CARD_DATA.product} />
  </div>
);
