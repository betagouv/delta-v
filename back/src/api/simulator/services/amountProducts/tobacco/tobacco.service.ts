import { Alpha2Code } from 'i18n-iso-countries';
import { CountryType, getCountryType } from '../../../../../utils/country.util';
import { CompleteShoppingProduct } from '../../shoppingProducts';
import { AmountGroup, ProductMaximum } from '../globalAmount.service';
import {
  getProductMaximumAndorra,
  getProductMaximumBorder,
  getProductMaximumEU,
  getProductMaximumNonEU,
} from './maximum.services';

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
  border: boolean;
  completeShoppingProducts: CompleteShoppingProduct[];
}

export class TobaccoGroup {
  private countryType: CountryType;
  private border: boolean;
  private completeTobaccoShoppingProducts: CompleteShoppingProduct[];

  constructor({ country, border, completeShoppingProducts }: TobaccoGroupConstructor) {
    this.border = border;
    this.countryType = getCountryType(country);
    this.completeTobaccoShoppingProducts = completeShoppingProducts.filter(
      (completeShoppingProducts) => {
        const tobaccoValues = Object.values(AmountTobaccoProduct);
        return completeShoppingProducts.product.amountProduct
          ? tobaccoValues.includes(
              completeShoppingProducts.product.amountProduct as AmountTobaccoProduct,
            )
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

  private getTotalAmount = (amountTobaccoProduct?: AmountTobaccoProduct): number => {
    return this.getSpecificProducts(amountTobaccoProduct).reduce(
      (accumulator, completeShoppingProduct) => {
        return accumulator + completeShoppingProduct.value;
      },
      0,
    );
  };

  public getSimulationGrouped = (): AmountGroup[] => {
    switch (this.countryType) {
      case CountryType.NON_EU:
        if (this.border) {
          return this.getSimulationGroupedWithCountry(getProductMaximumBorder());
        }
        return this.getSimulationGroupedWithCountry(getProductMaximumNonEU());
      case CountryType.ANDORRA:
        return this.getSimulationGroupedWithCountry(getProductMaximumAndorra());
      default:
        return this.getSimulationGroupedWithCountry(getProductMaximumEU());
    }
  };

  private getSimulationGroupedWithCountry = (productsMaximum: ProductMaximum[]): AmountGroup[] => {
    return productsMaximum
      .map((productMaximum) => {
        const { totalAmount, completeShoppingProducts } = productMaximum.products.reduce(
          (accumulator, amount) => {
            const amountWithRatio =
              amount.ratio * this.getTotalAmount(amount.productType as AmountTobaccoProduct);
            const products = this.getSpecificProducts(amount.productType as AmountTobaccoProduct);
            return {
              totalAmount: accumulator.totalAmount + amountWithRatio,
              completeShoppingProducts: [...accumulator.completeShoppingProducts, ...products],
            };
          },
          { totalAmount: 0, completeShoppingProducts: [] as unknown as CompleteShoppingProduct[] },
        );

        return {
          group: productMaximum.groupName,
          completeShoppingProducts: completeShoppingProducts,
          isOverMaximum: totalAmount > productMaximum.maximum,
        };
      })
      .filter((commonProduct) => commonProduct.completeShoppingProducts.length > 0);
  };
}
