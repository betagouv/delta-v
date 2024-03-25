import { Meta } from '@storybook/react';

import { CategoryList, Item } from './CategoryList';

export default {
  title: 'Components/Molecules/CategoryList',
  component: CategoryList,
} as Meta;

const items: Item[] = [
  {
    title: 'Vêtements',
    svgNames: 'categoryClothes',
    id: '/test/',
  },
  {
    title: 'Tissus',
    svgNames: 'categoryFabrics',
    id: '/',
  },
  {
    title: 'Chaussures',
    svgNames: 'categoryShoes',
    id: '/',
  },
  {
    title: 'Maroquinerie',
    svgNames: 'categoryLeatherGoods',
    id: '/',
  },
  {
    title: 'Accessoires',
    svgNames: 'categoryAccessory',
    id: '/',
  },
];

export const listDisplay = (): JSX.Element => (
  <div className="p-3">
    <br />
    <CategoryList
      items={items}
      title="Catégories"
      onSelectProduct={() => console.log('clicked')}
      onClick={() => console.log('clicked')}
    />
    <br />
  </div>
);

export const cardDisplay = (): JSX.Element => (
  <div className="p-3">
    <br />
    <CategoryList
      items={items}
      title="Catégories"
      displayType="card"
      onSelectProduct={() => console.log('clicked')}
      onClick={() => console.log('clicked')}
    />
    <br />
  </div>
);
