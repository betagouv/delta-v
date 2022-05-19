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
    href: '/test/',
  },
  {
    title: 'Tissus',
    svgNames: 'categoryFabrics',
    href: '/',
  },
  {
    title: 'Chaussures',
    svgNames: 'categoryShoes',
    href: '/',
  },
  {
    title: 'Maroquinerie',
    svgNames: 'categoryLeatherGoods',
    href: '/',
  },
  {
    title: 'Accessoires',
    svgNames: 'categoryAccessory',
    href: '/',
  },
];

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <br />
    <CategoryList items={items} title="Catégories" />
    <br />
  </div>
);
