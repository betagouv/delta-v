import { Alpha2Code } from 'i18n-iso-countries';
import { CompleteShoppingProduct } from '../shoppingProducts';
import { AlcoholGroup, AmountAlcoholGroup, AmountAlcoholProduct } from './alcohol/alcohol.service';
import { AmountTobaccoGroup, AmountTobaccoProduct, TobaccoGroup } from './tobacco/tobacco.service';

export type AmountProductGroup = AmountTobaccoGroup | AmountAlcoholGroup;
export type AmountProduct = AmountTobaccoProduct | AmountAlcoholProduct;

export interface AmountGroup {
  group: AmountProductGroup;
  completeShoppingProducts: CompleteShoppingProduct[];
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
  completeShoppingProducts: CompleteShoppingProduct[],
  country: Alpha2Code,
): AmountGroup[] => {
  const amountResult: AmountGroup[] = [];

  const tobaccoGroup = new TobaccoGroup({ completeShoppingProducts, country });
  const tobaccoGroupResult = tobaccoGroup.getSimulationGrouped();
  if (tobaccoGroupResult.length > 0) {
    amountResult.push(...tobaccoGroupResult);
  }

  const alcoholGroup = new AlcoholGroup({ completeShoppingProducts, country });
  const alcoholGroupResult = alcoholGroup.getSimulationGrouped();

  if (alcoholGroupResult.length > 0) {
    amountResult.push(...alcoholGroupResult);
  }
  return amountResult;
};
