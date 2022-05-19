import React from 'react';

import BoatIcon from '@/public/assets/icons/Boat.svg';
import CalculatorIcon from '@/public/assets/icons/Calculator.svg';
import CarIcon from '@/public/assets/icons/Car.svg';
import CategoryAccessoryIcon from '@/public/assets/icons/Category-Accessory.svg';
import CategoryClothesIcon from '@/public/assets/icons/Category-Clothes.svg';
import CategoryFabricsIcon from '@/public/assets/icons/Category-Fabrics.svg';
import CategoryLeatherGoodsIcon from '@/public/assets/icons/Category-Leather-Goods.svg';
import CategoryShoesIcon from '@/public/assets/icons/Category-Shoes.svg';
import LuggagesIcon from '@/public/assets/icons/Luggages.svg';
import MailIcon from '@/public/assets/icons/Mail.svg';
import OtherIcon from '@/public/assets/icons/Other.svg';
import PhoneIcon from '@/public/assets/icons/Phone.svg';
import PlaneIcon from '@/public/assets/icons/Plane.svg';
import TrainIcon from '@/public/assets/icons/Train.svg';

export type SvgNames =
  | 'boat'
  | 'car'
  | 'plane'
  | 'train'
  | 'other'
  | 'luggages'
  | 'calculator'
  | 'phone'
  | 'mail'
  | 'categoryAccessory'
  | 'categoryClothes'
  | 'categoryFabrics'
  | 'categoryShoes'
  | 'categoryLeatherGoods';

export interface ISvgIconProps {
  name: SvgNames;
}

const getSvgFromName = (name: SvgNames): any => {
  switch (name) {
    case 'boat':
      return BoatIcon;
    case 'car':
      return CarIcon;
    case 'other':
      return OtherIcon;
    case 'plane':
      return PlaneIcon;
    case 'train':
      return TrainIcon;
    case 'luggages':
      return LuggagesIcon;
    case 'calculator':
      return CalculatorIcon;
    case 'phone':
      return PhoneIcon;
    case 'mail':
      return MailIcon;
    case 'categoryAccessory':
      return CategoryAccessoryIcon;
    case 'categoryClothes':
      return CategoryClothesIcon;
    case 'categoryFabrics':
      return CategoryFabricsIcon;
    case 'categoryShoes':
      return CategoryShoesIcon;
    case 'categoryLeatherGoods':
      return CategoryLeatherGoodsIcon;
    default:
      return undefined;
  }
};

export const SvgIcon: React.FC<ISvgIconProps> = ({ name }: ISvgIconProps) => {
  const Svg = getSvgFromName(name);
  return <Svg />;
};
