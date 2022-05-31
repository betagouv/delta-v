import React from 'react';

import BoatIcon from '@/public/assets/icons/Boat.svg';
import CalculatorIcon from '@/public/assets/icons/Calculator.svg';
import CarIcon from '@/public/assets/icons/Car.svg';
import CategoryAccessoryIcon from '@/public/assets/icons/Category-Accessory.svg';
import CategoryMackUpIcon from '@/public/assets/icons/Category-Beauty-Mackup.svg';
import CategoryBeautyProductsIcon from '@/public/assets/icons/Category-Beauty-Products.svg';
import CategoryClothesIcon from '@/public/assets/icons/Category-Clothes.svg';
import CategoryFabricsIcon from '@/public/assets/icons/Category-Fabrics.svg';
import CategoryFoodIcon from '@/public/assets/icons/Category-Food.svg';
import CategoryHightechIcon from '@/public/assets/icons/Category-Hightech.svg';
import CategoryJewelryIcon from '@/public/assets/icons/Category-Jewelry.svg';
import CategoryLeatherGoodsIcon from '@/public/assets/icons/Category-Leather-Goods.svg';
import CategoryShoesIcon from '@/public/assets/icons/Category-Shoes.svg';
import CategoryWigIcon from '@/public/assets/icons/Category-Wig.svg';
import LuggagesIcon from '@/public/assets/icons/Luggages.svg';
import MailIcon from '@/public/assets/icons/Mail.svg';
import OtherIcon from '@/public/assets/icons/Other.svg';
import PhoneIcon from '@/public/assets/icons/Phone.svg';
import PlaneIcon from '@/public/assets/icons/Plane.svg';
import QuestionIcon from '@/public/assets/icons/Question.svg';
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
  | 'question'
  | 'categoryAccessory'
  | 'categoryBeautyProducts'
  | 'categoryJewelry'
  | 'categoryFood'
  | 'categoryClothes'
  | 'categoryFabrics'
  | 'categoryShoes'
  | 'categoryLeatherGoods'
  | 'categoryMackup'
  | 'categoryHighTech'
  | 'categoryWig';

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
    case 'question':
      return QuestionIcon;
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
    case 'categoryBeautyProducts':
      return CategoryBeautyProductsIcon;
    case 'categoryJewelry':
      return CategoryJewelryIcon;
    case 'categoryFood':
      return CategoryFoodIcon;
    case 'categoryMackup':
      return CategoryMackUpIcon;
    case 'categoryHighTech':
      return CategoryHightechIcon;
    case 'categoryWig':
      return CategoryWigIcon;
    default:
      return undefined;
  }
};

export const SvgIcon: React.FC<ISvgIconProps> = ({ name }: ISvgIconProps) => {
  const Svg = getSvgFromName(name);
  return <Svg />;
};
