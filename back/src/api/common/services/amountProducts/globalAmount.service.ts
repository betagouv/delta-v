import { DetailedShoppingProduct } from '../detailedShoppingProduct';
import { TravelerData } from '../traveler';
import { AlcoholGroup, AmountAlcoholGroup, AmountAlcoholProduct } from './alcohol/alcohol.service';
import { AmountTobaccoGroup, AmountTobaccoProduct, TobaccoGroup } from './tobacco/tobacco.service';

export type AmountProductGroup = AmountTobaccoGroup | AmountAlcoholGroup;
export type AmountProduct = AmountTobaccoProduct | AmountAlcoholProduct;

export interface AmountGroup {
  group: AmountProductGroup;
  detailedShoppingProducts: DetailedShoppingProduct[];
  isOverMaximum: boolean;
}

export interface ProductMaximum {
  maximum: number;
  groupName: AmountProductGroup;
  products: {
    productType: AmountProduct;
    ratio: number;
    maximum?: number;
  }[];
}

export const checkAmountProducts = (
  detailedShoppingProducts: DetailedShoppingProduct[],
  travelerData: TravelerData,
): AmountGroup[] => {
  const amountResult: AmountGroup[] = [];

  const tobaccoGroup = new TobaccoGroup({ detailedShoppingProducts, travelerData });
  const tobaccoGroupResult = tobaccoGroup.getSimulationGrouped();
  if (tobaccoGroupResult.length > 0) {
    amountResult.push(...tobaccoGroupResult);
  }

  const alcoholGroup = new AlcoholGroup({ detailedShoppingProducts, travelerData });
  const alcoholGroupResult = alcoholGroup.getSimulationGrouped();

  if (alcoholGroupResult.length > 0) {
    amountResult.push(...alcoholGroupResult);
  }
  return amountResult;
};
