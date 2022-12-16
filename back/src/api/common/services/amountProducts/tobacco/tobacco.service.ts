import { CountryType, getCountryType } from '../../../../../utils/country.util';
import { DetailedShoppingProduct } from '../../detailedShoppingProduct';
import { TravelerData } from '../../traveler';
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
  travelerData: TravelerData;
  detailedShoppingProducts: DetailedShoppingProduct[];
}

export class TobaccoGroup {
  private countryType: CountryType;
  private border: boolean;
  private detailedTobaccoShoppingProducts: DetailedShoppingProduct[];

  constructor({ travelerData, detailedShoppingProducts }: TobaccoGroupConstructor) {
    this.border = travelerData.border;
    this.countryType = getCountryType(travelerData.country);
    this.detailedTobaccoShoppingProducts = detailedShoppingProducts.filter(
      (detailedShoppingProduct) => {
        const tobaccoValues = Object.values(AmountTobaccoProduct);
        return detailedShoppingProduct.product?.amountProduct
          ? tobaccoValues.includes(
              detailedShoppingProduct.product.amountProduct as AmountTobaccoProduct,
            )
          : false;
      },
    );
  }

  private getSpecificProducts = (
    amountTobaccoProduct?: AmountTobaccoProduct,
  ): DetailedShoppingProduct[] => {
    if (!amountTobaccoProduct) {
      return this.detailedTobaccoShoppingProducts;
    }
    return this.detailedTobaccoShoppingProducts.filter(
      (detailedTobaccoShoppingProduct) =>
        detailedTobaccoShoppingProduct.product?.amountProduct === amountTobaccoProduct,
    );
  };

  private getTotalAmount = (amountTobaccoProduct?: AmountTobaccoProduct): number => {
    return this.getSpecificProducts(amountTobaccoProduct).reduce(
      (totalAmount, detailedTobaccoShoppingProduct) => {
        return totalAmount + detailedTobaccoShoppingProduct.getDefaultCurrencyValue();
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
        const { totalAmount, detailedTobaccoShoppingProducts } = productMaximum.products.reduce(
          (totalProducts, amount) => {
            const amountWithRatio =
              amount.ratio * this.getTotalAmount(amount.productType as AmountTobaccoProduct);
            const products = this.getSpecificProducts(amount.productType as AmountTobaccoProduct);
            return {
              totalAmount: totalProducts.totalAmount + amountWithRatio,
              detailedTobaccoShoppingProducts: [
                ...totalProducts.detailedTobaccoShoppingProducts,
                ...products,
              ],
            };
          },
          {
            totalAmount: 0,
            detailedTobaccoShoppingProducts: [] as unknown as DetailedShoppingProduct[],
          },
        );

        return {
          group: productMaximum.groupName,
          detailedShoppingProducts: detailedTobaccoShoppingProducts,
          isOverMaximum: totalAmount > productMaximum.maximum,
        };
      })
      .filter((commonProduct) => commonProduct.detailedShoppingProducts.length > 0);
  };
}
