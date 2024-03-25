import { Meta } from '@storybook/react';

// eslint-disable-next-line import/order
import { Typography } from '../../atoms/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies

import { SvgIcon, SvgNames } from './SvgIcon';

export default {
  title: 'Resources/SvgIcons',
} as Meta;

const iconNames: SvgNames[] = [
  'logo',
  'logoAgent',
  'logoFrenchRepublic',
  'logoFrenchDouane',
  'logoDouane',
  'add',
  'arrowRight',
  'basketColor',
  'bigArrowRight',
  'boat',
  'car',
  'folder',
  'forbidden',
  'other',
  'pet',
  'plane',
  'plants',
  'train',
  'traveler',
  'liteSearch',
  'luggages',
  'calculator',
  'coffee',
  'completeBasket',
  'dairy',
  'download',
  'douanier',
  'phone',
  'mail',
  'meat',
  'medication',
  'milk',
  'money',
  'officerCap',
  'question',
  'search',
  'sweets',
  'tea',
  'info',
  'watch',
];
const categoryIcon: SvgNames[] = [
  'categoryAccessory',
  'categoryAccordions',
  'categoryAdultClothes',
  'categoryAdvertisingCatalog',
  'categoryAlcohol',
  'categoryAlcoholIntermediate',
  'categoryArt',
  'categoryBamboo',
  'categoryMackup',
  'categoryBeautyProducts',
  'categoryBedding',
  'categoryBeer',
  'categoryBinoculars',
  'categoryBooks',
  'categoryCarRadio',
  'categoryCar',
  'categoryCD',
  'categoryCeramic',
  'categoryChildrenClothes',
  'categoryCigarette',
  'categoryCigarillos',
  'categoryCigar',
  'categoryClothes',
  'categoryCologne',
  'categoryCommonGround',
  'categoryCopper',
  'categoryCotton',
  'categoryCrystal',
  'categoryDecoration',
  'categoryDishes',
  'categoryDVDPlayer',
  'categoryDVD',
  'categoryEarthenware',
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
  'categoryPercussionInstrument',
  'categoryPerfume',
  'categoryPhoto',
  'categoryPiano',
  'categoryPlastic',
  'categoryPorcelain',
  'categoryRattan',
  'categoryRims',
  'categorySandstone',
  'categoryScarf',
  'categorySilk',
  'categoryShoes',
  'categorySki',
  'categorySmartphone',
  'categorySocks',
  'categorySoftAlcohol',
  'categorySpiritDrink',
  'categorySports',
  'categoryStrongAlcohol',
  'categorySunglasses',
  'categorySynthesizer',
  'categoryTablet',
  'categoryTelevision',
  'categoryTennis',
  'categoryTextile',
  'categoryTie',
  'categoryTire',
  'categoryTobacco',
  'categoryVarious',
  'categoryVideoGame',
  'categoryViolins',
  'categoryWatches',
  'categoryWig',
  'categoryWindsurf',
  'categoryWine',
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
