import { Meta } from '@storybook/react';

import { Search } from './Search';
import { Product } from '@/model/product';
import { productFactory } from '@/tests/factories/Product.factory';
import { SearchType } from '@/utils/search';

export default {
  title: 'Components/Organisms/Search',
  component: Search,
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
    <Search onSearch={() => arrayProducts} />
    <br />
  </div>
);
