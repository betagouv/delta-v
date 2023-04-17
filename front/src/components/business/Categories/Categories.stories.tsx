import { faker } from '@faker-js/faker';
import { Meta, Story } from '@storybook/react';

import { Categories, CategoriesProps } from './Categories';
import { SvgNames } from '@/components/common/SvgIcon';

const svgNamesArray = [
  'logo',
  'logoFrenchRepublic',
  'logoFrenchDouane',
  'logoDouane',
  'add',
  'home',
  'info',
  'arrowRight',
  'basketColor',
  'boat',
  'car',
  'plane',
  'plants',
  'train',
  'traveler',
  'other',
  'pet',
] as SvgNames[];

export default {
  title: 'Components/Business/Categories',
  component: Categories,
} as Meta;

export const Playground: Story<CategoriesProps> = (args) => <Categories {...args} />;

const CATEGORIES_DATA = {
  title: faker.lorem.words(4),
  categories: [
    { name: faker.commerce.product(), icon: faker.helpers.arrayElement(svgNamesArray) },
    { name: faker.commerce.product(), icon: faker.helpers.arrayElement(svgNamesArray) },
    { name: faker.commerce.product(), icon: faker.helpers.arrayElement(svgNamesArray) },
    { name: faker.commerce.product(), icon: faker.helpers.arrayElement(svgNamesArray) },
    { name: faker.commerce.product(), icon: faker.helpers.arrayElement(svgNamesArray) },
    { name: faker.commerce.product(), icon: faker.helpers.arrayElement(svgNamesArray) },
    { name: faker.commerce.product(), icon: faker.helpers.arrayElement(svgNamesArray) },
  ],
};

Playground.args = CATEGORIES_DATA;

export const Base = (): JSX.Element => {
  return (
    <div>
      <Categories {...CATEGORIES_DATA} />
    </div>
  );
};
