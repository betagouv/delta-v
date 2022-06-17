import React from 'react';

import Add from '@/public/assets/icons/Add.svg';
import Basket from '@/public/assets/icons/Basket.svg';
import Boat from '@/public/assets/icons/Boat.svg';
import Calculator from '@/public/assets/icons/Calculator.svg';
import Car from '@/public/assets/icons/Car.svg';
import CategoryAccessory from '@/public/assets/icons/categories/Accessory.svg';
import CategoryAccordions from '@/public/assets/icons/categories/Accordions.svg';
import CategoryAdultClothes from '@/public/assets/icons/categories/Adult-Clothes.svg';
import CategoryAlcohol from '@/public/assets/icons/categories/Alcohol.svg';
import CategoryArt from '@/public/assets/icons/categories/Art.svg';
import CategoryMackUp from '@/public/assets/icons/categories/Beauty-Mackup.svg';
import CategoryBeautyProducts from '@/public/assets/icons/categories/Beauty-Products.svg';
import CategoryBedding from '@/public/assets/icons/categories/Bedding.svg';
import CategoryBinoculars from '@/public/assets/icons/categories/Binoculars.svg';
import CategoryBooks from '@/public/assets/icons/categories/Books.svg';
import CategoryCarRadio from '@/public/assets/icons/categories/Car-Radio.svg';
import CategoryCar from '@/public/assets/icons/categories/Car.svg';
import CategoryChildrenClothes from '@/public/assets/icons/categories/Children-Clothes.svg';
import CategoryCigarettes from '@/public/assets/icons/categories/Cigarettes.svg';
import CategoryClothes from '@/public/assets/icons/categories/Clothes.svg';
import CategoryCopper from '@/public/assets/icons/categories/Copper.svg';
import CategoryDecoration from '@/public/assets/icons/categories/Decoration.svg';
import CategoryDishes from '@/public/assets/icons/categories/Dishes.svg';
import CategoryDVDPlayer from '@/public/assets/icons/categories/DVD-Player.svg';
import CategoryElectricGuitar from '@/public/assets/icons/categories/Electric-Guitar.svg';
import CategoryElectronicCigarettes from '@/public/assets/icons/categories/Electronic-Cigarettes.svg';
import CategoryFabricGloves from '@/public/assets/icons/categories/Fabric-Gloves.svg';
import CategoryFabrics from '@/public/assets/icons/categories/Fabrics.svg';
import CategoryFashion from '@/public/assets/icons/categories/Fashion.svg';
import CategoryFishing from '@/public/assets/icons/categories/Fishing.svg';
import CategoryFood from '@/public/assets/icons/categories/Food.svg';
import CategoryFurniture from '@/public/assets/icons/categories/Furniture.svg';
import CategoryGolf from '@/public/assets/icons/categories/Golf.svg';
import CategoryGPS from '@/public/assets/icons/categories/GPS.svg';
import CategoryGuitar from '@/public/assets/icons/categories/Guitar.svg';
import CategoryHightech from '@/public/assets/icons/categories/Hightech.svg';
import CategoryHobbies from '@/public/assets/icons/categories/Hobbies.svg';
import CategoryHouse from '@/public/assets/icons/categories/House.svg';
import CategoryJewelry from '@/public/assets/icons/categories/Jewelry.svg';
import CategoryLamp from '@/public/assets/icons/categories/Lamp.svg';
import CategoryLeatherAccessory from '@/public/assets/icons/categories/Leather-Accessory.svg';
import CategoryLeatherGoods from '@/public/assets/icons/categories/Leather-Goods.svg';
import CategoryMirror from '@/public/assets/icons/categories/Mirror.svg';
import CategoryMusicBox from '@/public/assets/icons/categories/Music-Box.svg';
import CategoryMusic from '@/public/assets/icons/categories/Music.svg';
import CategoryNumericPiano from '@/public/assets/icons/categories/Numeric-Piano.svg';
import CategoryOther from '@/public/assets/icons/categories/Other.svg';
import CategoryPiano from '@/public/assets/icons/categories/Piano.svg';
import CategoryRims from '@/public/assets/icons/categories/Rims.svg';
import CategoryScarf from '@/public/assets/icons/categories/Scarf.svg';
import CategoryShoes from '@/public/assets/icons/categories/Shoes.svg';
import CategorySki from '@/public/assets/icons/categories/Ski.svg';
import CategorySocks from '@/public/assets/icons/categories/Socks.svg';
import CategorySports from '@/public/assets/icons/categories/Sports.svg';
import CategorySynthesizer from '@/public/assets/icons/categories/Synthesizer.svg';
import CategoryTelevision from '@/public/assets/icons/categories/Television.svg';
import CategoryTennis from '@/public/assets/icons/categories/Tennis.svg';
import CategoryTie from '@/public/assets/icons/categories/Tie.svg';
import CategoryTire from '@/public/assets/icons/categories/Tire.svg';
import CategoryVarious from '@/public/assets/icons/categories/Various.svg';
import CategoryViolins from '@/public/assets/icons/categories/Violins.svg';
import CategoryWig from '@/public/assets/icons/categories/Wig.svg';
import CategoryWindsurf from '@/public/assets/icons/categories/Windsurf.svg';
import CategoryWoodenFloor from '@/public/assets/icons/categories/Wooden-Floor.svg';
import AinIcon from '@/public/assets/icons/City-Ain.svg';
import HauteSavoieIcon from '@/public/assets/icons/City-Haute-Savoie.svg';
import Luggages from '@/public/assets/icons/Luggages.svg';
import Mail from '@/public/assets/icons/Mail.svg';
import Other from '@/public/assets/icons/Other.svg';
import Phone from '@/public/assets/icons/Phone.svg';
import Plane from '@/public/assets/icons/Plane.svg';
import Question from '@/public/assets/icons/Question.svg';
import Train from '@/public/assets/icons/Train.svg';

export type SvgNames =
  | 'add'
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
  | 'basket'
  | 'ain'
  | 'hauteSavoie'
  | 'categoryAccessory'
  | 'categoryAccordions'
  | 'categoryAdultClothes'
  | 'categoryAlcohol'
  | 'categoryArt'
  | 'categoryBeautyProducts'
  | 'categoryBedding'
  | 'categoryBinoculars'
  | 'categoryBooks'
  | 'categoryCarRadio'
  | 'categoryCar'
  | 'categoryChildrenClothes'
  | 'categoryCigarettes'
  | 'categoryClothes'
  | 'categoryCopper'
  | 'categoryDecoration'
  | 'categoryDishes'
  | 'categoryDVDPlayer'
  | 'categoryElectricGuitar'
  | 'categoryElectronicCigarettes'
  | 'categoryFabricGloves'
  | 'categoryFabrics'
  | 'categoryFashion'
  | 'categoryFishing'
  | 'categoryGolf'
  | 'categoryGPS'
  | 'categoryGuitar'
  | 'categoryFood'
  | 'categoryFurniture'
  | 'categoryShoes'
  | 'categoryMackup'
  | 'categoryHighTech'
  | 'categoryHobbies'
  | 'categoryHouse'
  | 'categoryJewelry'
  | 'categoryLamp'
  | 'categoryLeatherAccessory'
  | 'categoryLeatherGoods'
  | 'categoryMirror'
  | 'categoryMusicBox'
  | 'categoryMusic'
  | 'categoryNumericPiano'
  | 'categoryOther'
  | 'categoryPiano'
  | 'categoryRims'
  | 'categoryScarf'
  | 'categorySki'
  | 'categorySocks'
  | 'categorySocks'
  | 'categorySports'
  | 'categorySynthesizer'
  | 'categoryTelevision'
  | 'categoryTennis'
  | 'categoryTie'
  | 'categoryTire'
  | 'categoryVarious'
  | 'categoryViolins'
  | 'categoryWig'
  | 'categoryWindsurf'
  | 'categoryWoodenFloor';

export interface ISvgIconProps {
  name: SvgNames;
}

const getSvgFromName = (name: SvgNames): any => {
  switch (name) {
    case 'add':
      return Add;
    case 'boat':
      return Boat;
    case 'car':
      return Car;
    case 'other':
      return Other;
    case 'plane':
      return Plane;
    case 'train':
      return Train;
    case 'luggages':
      return Luggages;
    case 'calculator':
      return Calculator;
    case 'phone':
      return Phone;
    case 'mail':
      return Mail;
    case 'question':
      return Question;
    case 'basket':
      return Basket;
    case 'ain':
      return AinIcon;
    case 'hauteSavoie':
      return HauteSavoieIcon;
    case 'categoryAccessory':
      return CategoryAccessory;
    case 'categoryAccordions':
      return CategoryAccordions;
    case 'categoryAdultClothes':
      return CategoryAdultClothes;
    case 'categoryAlcohol':
      return CategoryAlcohol;
    case 'categoryArt':
      return CategoryArt;
    case 'categoryClothes':
      return CategoryClothes;
    case 'categoryShoes':
      return CategoryShoes;
    case 'categoryBeautyProducts':
      return CategoryBeautyProducts;
    case 'categoryBedding':
      return CategoryBedding;
    case 'categoryBinoculars':
      return CategoryBinoculars;
    case 'categoryBooks':
      return CategoryBooks;
    case 'categoryCarRadio':
      return CategoryCarRadio;
    case 'categoryCar':
      return CategoryCar;
    case 'categoryChildrenClothes':
      return CategoryChildrenClothes;
    case 'categoryCigarettes':
      return CategoryCigarettes;
    case 'categoryCopper':
      return CategoryCopper;
    case 'categoryDecoration':
      return CategoryDecoration;
    case 'categoryDishes':
      return CategoryDishes;
    case 'categoryDVDPlayer':
      return CategoryDVDPlayer;
    case 'categoryElectricGuitar':
      return CategoryElectricGuitar;
    case 'categoryElectronicCigarettes':
      return CategoryElectronicCigarettes;
    case 'categoryFabricGloves':
      return CategoryFabricGloves;
    case 'categoryFabrics':
      return CategoryFabrics;
    case 'categoryFashion':
      return CategoryFashion;
    case 'categoryFishing':
      return CategoryFishing;
    case 'categoryFood':
      return CategoryFood;
    case 'categoryFurniture':
      return CategoryFurniture;
    case 'categoryGolf':
      return CategoryGolf;
    case 'categoryGPS':
      return CategoryGPS;
    case 'categoryGuitar':
      return CategoryGuitar;
    case 'categoryMackup':
      return CategoryMackUp;
    case 'categoryHighTech':
      return CategoryHightech;
    case 'categoryHobbies':
      return CategoryHobbies;
    case 'categoryHouse':
      return CategoryHouse;
    case 'categoryJewelry':
      return CategoryJewelry;
    case 'categoryLamp':
      return CategoryLamp;
    case 'categoryLeatherAccessory':
      return CategoryLeatherAccessory;
    case 'categoryLeatherGoods':
      return CategoryLeatherGoods;
    case 'categoryMirror':
      return CategoryMirror;
    case 'categoryMusicBox':
      return CategoryMusicBox;
    case 'categoryMusic':
      return CategoryMusic;
    case 'categoryNumericPiano':
      return CategoryNumericPiano;
    case 'categoryOther':
      return CategoryOther;
    case 'categoryPiano':
      return CategoryPiano;
    case 'categoryRims':
      return CategoryRims;
    case 'categoryScarf':
      return CategoryScarf;
    case 'categorySki':
      return CategorySki;
    case 'categorySocks':
      return CategorySocks;
    case 'categorySports':
      return CategorySports;
    case 'categorySynthesizer':
      return CategorySynthesizer;
    case 'categoryTelevision':
      return CategoryTelevision;
    case 'categoryTennis':
      return CategoryTennis;
    case 'categoryTie':
      return CategoryTie;
    case 'categoryTire':
      return CategoryTire;
    case 'categoryVarious':
      return CategoryVarious;
    case 'categoryViolins':
      return CategoryViolins;
    case 'categoryWig':
      return CategoryWig;
    case 'categoryWindsurf':
      return CategoryWindsurf;
    case 'categoryWoodenFloor':
      return CategoryWoodenFloor;
    default:
      return CategoryOther;
  }
};

export const SvgIcon: React.FC<ISvgIconProps> = ({ name }: ISvgIconProps) => {
  const Svg = getSvgFromName(name);
  return <Svg />;
};
