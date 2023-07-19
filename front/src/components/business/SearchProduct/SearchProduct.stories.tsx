import { Meta } from '@storybook/react';

import { SearchProduct } from './SearchProduct';
import { Product } from '@/model/product';
import { productFactory } from '@/tests/factories/Product.factory';
import { SearchType } from '@/utils/search';

export default {
  title: 'Components/Business/SearchProduct',
  component: SearchProduct,
} as Meta;

const arrayProducts: SearchType<Product>[] = [
  {
    ...productFactory(),
    rank: 5,
    rankedValue: 'hého',
  },
  {
    ...productFactory(),
    rank: 2,
    rankedValue: 'salut',
  },
];

export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <SearchProduct onSearch={() => arrayProducts} />
    <br />
  </div>
);
