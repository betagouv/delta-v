import { Meta } from '@storybook/react';

// eslint-disable-next-line import/order
import { Typography } from '../Typography';
// eslint-disable-next-line import/no-extraneous-dependencies

import { SvgIcon, SvgNames } from './SvgIcon';

export default {
  title: 'Resources/SvgIcons',
} as Meta;

const iconNames: SvgNames[] = [
  'boat',
  'car',
  'other',
  'plane',
  'train',
  'luggages',
  'calculator',
  'phone',
  'mail',
  'question',
];
const categoryIcon: SvgNames[] = [
  'categoryAccessory',
  'categoryClothes',
  'categoryFabrics',
  'categoryShoes',
  'categoryLeatherGoods',
  'categoryMackup',
  'categoryBeautyProducts',
  'categoryJewelry',
  'categoryHighTech',
  'categoryWig',
  'categoryFood',
];

export const Base = (): JSX.Element => {
  return (
    <div>
      <Typography tag="h2">Icon classiques : </Typography>
      <div className="flex flex-row space-x-5">
        {iconNames.map((name) => (
          <div className="flex h-14 w-20 flex-col text-center">
            <SvgIcon name={name} />
            <span>{name}</span>
          </div>
        ))}
      </div>
      <Typography tag="h2">Icon Categories : </Typography>
      <div className="grid grid-cols-8">
        {categoryIcon.map((name) => (
          <div className="flex h-14 w-20 flex-col text-center">
            <SvgIcon name={name} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
