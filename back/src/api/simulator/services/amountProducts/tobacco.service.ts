import { Alpha2Code } from 'i18n-iso-countries';
import { CountryType, getCountryType } from '../../../../utils/country.util';
import { CompleteShoppingProduct } from '../shoppingProducts';
import { AmountGroup } from './globalAmount.service';

export const MAXIMUM_TOBACCO_NON_EU = 200;
export const MAXIMUM_TOBACCO_ANDORRA = 300;
export const MAXIMUM_TOBACCO_CIGARETTE_EU = 800;
export const MAXIMUM_TOBACCO_CIGARILLOS_EU = 400;
export const MAXIMUM_TOBACCO_CIGAR_EU = 200;
export const MAXIMUM_TOBACCO_TOBACCO_EU = 1000;

export enum AmountTobaccoProduct {
  cigarette = 'cigarette',
  cigarillos = 'cigarillos',
  cigar = 'cigar',
  tobacco = 'tobacco',
}

export enum GroupedTobacco {
  allTobaccoProducts = 'allTobaccoProducts',
}

export type AmountTobaccoGroup = AmountTobaccoProduct | GroupedTobacco;

interface TobaccoGroupConstructor {
  country: Alpha2Code;
  completeShoppingProducts: CompleteShoppingProduct[];
}

export class TobaccoGroup {
  private countryType: CountryType;
  private completeTobaccoShoppingProducts: CompleteShoppingProduct[];

  constructor({ country, completeShoppingProducts }: TobaccoGroupConstructor) {
    this.countryType = getCountryType(country);
    this.completeTobaccoShoppingProducts = completeShoppingProducts.filter(
      (completeShoppingProducts) => {
        const tobaccoValues = Object.values(AmountTobaccoProduct);
        return completeShoppingProducts.product.amountProduct
          ? tobaccoValues.includes(completeShoppingProducts.product.amountProduct)
          : false;
      },
    );
  }

  private getSpecificProducts = (
    amountTobaccoProduct?: AmountTobaccoProduct,
  ): CompleteShoppingProduct[] => {
    if (!amountTobaccoProduct) {
      return this.completeTobaccoShoppingProducts;
    }
    return this.completeTobaccoShoppingProducts.filter(
      (completeShoppingProducts) =>
        completeShoppingProducts.product.amountProduct === amountTobaccoProduct,
    );
  };

  public getSimulationGrouped = (): AmountGroup[] => {
    switch (this.countryType) {
      case CountryType.NON_EU:
      case CountryType.ANDORRA:
        return this.getSimulationForGroupedProducts();
      default:
        return this.getSimulationForEachProducts();
    }
  };

  private getSimulationForGroupedProducts = (): AmountGroup[] => {
    return this.completeTobaccoShoppingProducts.length > 0
      ? [
          {
            completeShoppingProducts: this.completeTobaccoShoppingProducts,
            group: GroupedTobacco.allTobaccoProducts,
            isOverMaximum: this.isOverMaximum(),
          },
        ]
      : [];
  };

  private getSimulationForEachProducts = (): AmountGroup[] => {
    return [
      AmountTobaccoProduct.cigarette,
      AmountTobaccoProduct.cigarillos,
      AmountTobaccoProduct.cigar,
      AmountTobaccoProduct.tobacco,
    ]
      .map((groupName) => ({
        completeShoppingProducts: this.getSpecificProducts(groupName),
        group: groupName,
        isOverMaximum: this.isOverMaximum(groupName),
      }))
      .filter((amountGroup) => amountGroup.completeShoppingProducts.length > 0);
  };

  private isOverMaximum = (amountTobaccoProduct?: AmountTobaccoProduct): boolean => {
    const totalAmount = this.getSpecificProducts(amountTobaccoProduct).reduce(
      (accumulator, amount) => {
        const amountWithRatio = amount.value * this.getRatio(amount.product.amountProduct);
        return accumulator + amountWithRatio;
      },
      0,
    );
    return totalAmount > this.getMaximum(amountTobaccoProduct);
  };

  private getMaximum = (amountTobaccoProduct?: AmountTobaccoProduct): number => {
    switch (this.countryType) {
      case CountryType.ANDORRA:
        return MAXIMUM_TOBACCO_ANDORRA;
      case CountryType.NON_EU:
        return MAXIMUM_TOBACCO_NON_EU;
      case CountryType.EU:
        switch (amountTobaccoProduct) {
          case AmountTobaccoProduct.cigarette:
            return MAXIMUM_TOBACCO_CIGARETTE_EU;
          case AmountTobaccoProduct.cigarillos:
            return MAXIMUM_TOBACCO_CIGARILLOS_EU;
          case AmountTobaccoProduct.cigar:
            return MAXIMUM_TOBACCO_CIGAR_EU;
          case AmountTobaccoProduct.tobacco:
            return MAXIMUM_TOBACCO_TOBACCO_EU;
          default:
            return 0;
        }
      default:
        return 0;
    }
  };

  private getRatio = (amountTobaccoProduct?: AmountTobaccoProduct): number => {
    if (this.countryType === CountryType.EU) {
      return 1;
    }
    switch (amountTobaccoProduct) {
      case AmountTobaccoProduct.cigarette:
        return 1;
      case AmountTobaccoProduct.cigarillos:
        return 2;
      case AmountTobaccoProduct.cigar:
        return 4;
      case AmountTobaccoProduct.tobacco:
        if (this.countryType === CountryType.ANDORRA) {
          return 0.75;
        }
        return 0.8;
      default:
        return 0;
    }
  };
}
