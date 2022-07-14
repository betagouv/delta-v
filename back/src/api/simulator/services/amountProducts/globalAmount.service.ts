import { Alpha2Code } from 'i18n-iso-countries';
import { CompleteShoppingProduct } from '../shoppingProducts';
import { AmountTobaccoGroup, AmountTobaccoProduct, TobaccoGroup } from './tobacco.service';

export type AmountProductGroup = AmountTobaccoGroup;
export type AmountProduct = AmountTobaccoProduct;

export interface AmountGroup {
  group: AmountProductGroup;
  completeShoppingProducts: CompleteShoppingProduct[];
  isOverMaximum: boolean;
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
  return amountResult;
};
