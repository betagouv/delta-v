import { Meta } from '@storybook/react';

// eslint-disable-next-line import/order
import { Typography } from '../Typography';
// eslint-disable-next-line import/no-extraneous-dependencies

import { SvgIcon, SvgNames } from './SvgIcon';

export default {
  title: 'Resources/SvgIcons',
} as Meta;

const iconNames: SvgNames[] = [
  'add',
  'arrowRight',
  'boat',
  'car',
  'other',
  'plane',
  'train',
  'liteSearch',
  'luggages',
  'calculator',
  'phone',
  'mail',
  'question',
  'search',
];
const categoryIcon: SvgNames[] = [
  'categoryAccessory',
  'categoryAccordions',
  'categoryAdultClothes',
  'categoryAlcohol',
  'categoryArt',
  'categoryBamboo',
  'categoryMackup',
  'categoryBeautyProducts',
  'categoryBedding',
  'categoryBinoculars',
  'categoryBooks',
  'categoryCarRadio',
  'categoryCar',
  'categoryCD',
  'categoryChildrenClothes',
  'categoryCigarettes',
  'categoryClothes',
  'categoryCologne',
  'categoryCopper',
  'categoryCotton',
  'categoryDecoration',
  'categoryDishes',
  'categoryDVDPlayer',
  'categoryDVD',
  'categoryElectricGuitar',
  'categoryElectronicCigarettes',
  'categoryFabricGloves',
  'categoryFabrics',
  'categoryFashion',
  'categoryFishing',
  'categoryFood',
  'categoryFurniture',
  'categoryGameConsole',
  'categoryGlass',
  'categoryGolf',
  'categoryGPS',
  'categoryGuitar',
  'categoryHighTech',
  'categoryHobbies',
  'categoryHouse',
  'categoryJewelry',
  'categoryLamp',
  'categoryLaptop',
  'categoryLeather',
  'categoryLeatherAccessory',
  'categoryLeatherGoods',
  'categoryMetal',
  'categoryMirror',
  'categoryMP3',
  'categoryMusicBox',
  'categoryMusic',
  'categoryNumericPiano',
  'categoryOther',
  'categoryPerfume',
  'categoryPiano',
  'categoryPlastic',
  'categoryRattan',
  'categoryRims',
  'categoryScarf',
  'categorySilk',
  'categoryShoes',
  'categorySki',
  'categorySmartphone',
  'categorySocks',
  'categorySports',
  'categorySunglasses',
  'categorySynthesizer',
  'categoryTablet',
  'categoryTelevision',
  'categoryTennis',
  'categoryTextile',
  'categoryTie',
  'categoryTire',
  'categoryVarious',
  'categoryVideoGame',
  'categoryViolins',
  'categoryWatches',
  'categoryWig',
  'categoryWindsurf',
  'categoryWood',
  'categoryWoodenFloor',
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
      <div className="grid grid-cols-8 content-center">
        {categoryIcon.map((name) => (
          <div className="mb-2 flex h-20 w-20 flex-col border p-2 text-center">
            <SvgIcon name={name} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
