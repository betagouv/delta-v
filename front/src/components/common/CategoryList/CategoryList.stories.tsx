import { Meta } from '@storybook/react';

import { CategoryList, Item } from './CategoryList';

export default {
  title: 'Components/Common/CategoryList',
  component: CategoryList,
} as Meta;

const items: Item[] = [
  {
    title: 'Vêtements',
    svgNames: 'categoryClothes',
    to: '/test/',
  },
  {
    title: 'Tissus',
    svgNames: 'categoryFabrics',
    to: '/',
  },
  {
    title: 'Chaussures',
    svgNames: 'categoryShoes',
    to: '/',
  },
  {
    title: 'Maroquinerie',
    svgNames: 'categoryLeatherGoods',
    to: '/',
  },
  {
    title: 'Accessoires',
    svgNames: 'categoryAccessory',
    to: '/',
  },
];

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <br />
    <CategoryList items={items} title="Catégories" />
    <br />
  </div>
);
