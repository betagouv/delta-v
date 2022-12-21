import { CountryType, getCountryType } from '../../../../../utils/country.util';
import { DetailedShoppingProduct } from '../../detailedShoppingProduct';
import { TravelerData } from '../../traveler';
import { AmountGroup, ProductMaximum } from '../globalAmount.service';
import {
  getProductMaximumNonEU,
  getProductMaximumAndorra,
  getProductMaximumEU,
  getProductMaximumBorder,
} from './maximum.services';

export const MAXIMUM_WINE_EU = 90;
export const MAXIMUM_SPARKLING_WINE_EU = 60;

export enum AmountAlcoholProduct {
  strongAlcohol = 'strongAlcohol',
  softAlcohol = 'softAlcohol',
  beer = 'beer',
  wine = 'wine',
  sparklingWine = 'sparklingWine',
  spiritDrink = 'spiritDrink',
  alcoholIntermediate = 'alcoholIntermediate',
}

export enum GroupedAlcohol {
  groupedAlcohol = 'groupedAlcohol',
}

export type AmountAlcoholGroup = AmountAlcoholProduct | GroupedAlcohol;

interface AlcoholGroupConstructor {
  travelerData: TravelerData;
  detailedShoppingProducts: DetailedShoppingProduct[];
}

export class AlcoholGroup {
  private countryType: CountryType;
  private border: boolean;
  private detailedAlcoholShoppingProducts: DetailedShoppingProduct[];

  constructor({ travelerData, detailedShoppingProducts }: AlcoholGroupConstructor) {
    this.countryType = getCountryType(travelerData.country);
    this.border = travelerData.border;
    this.detailedAlcoholShoppingProducts = detailedShoppingProducts.filter(
      (detailedShoppingProduct) => {
        const alcoholValues = Object.values(AmountAlcoholProduct);
        return detailedShoppingProduct.product?.amountProduct
          ? alcoholValues.includes(
              detailedShoppingProduct.product.amountProduct as AmountAlcoholProduct,
            )
          : false;
      },
    );
  }

  private getSpecificProducts = (
    amountAlcoholProduct?: AmountAlcoholProduct,
  ): DetailedShoppingProduct[] => {
    if (!amountAlcoholProduct) {
      return this.detailedAlcoholShoppingProducts;
    }
    return this.detailedAlcoholShoppingProducts.filter(
      (detailedShoppingProduct) =>
        detailedShoppingProduct.product?.amountProduct === amountAlcoholProduct,
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

  private getTotalAmount = (amountAlcoholProduct?: AmountAlcoholProduct): number => {
    return this.getSpecificProducts(amountAlcoholProduct).reduce(
      (totalAmount, detailedShoppingProduct) => {
        return totalAmount + detailedShoppingProduct.getDefaultCurrencyValue();
      },
      0,
    );
  };

  private getSimulationGroupedWithCountry = (productsMaximum: ProductMaximum[]): AmountGroup[] => {
    const commonProducts = productsMaximum
      .map((productMaximum) => {
        const { totalAmount, detailedShoppingProducts } = productMaximum.products.reduce(
          (totalProducts, amount) => {
            const amountWithRatio =
              amount.ratio * this.getTotalAmount(amount.productType as AmountAlcoholProduct);
            const products = this.getSpecificProducts(amount.productType as AmountAlcoholProduct);
            return {
              totalAmount: totalProducts.totalAmount + amountWithRatio,
              detailedShoppingProducts: [...totalProducts.detailedShoppingProducts, ...products],
            };
          },
          { totalAmount: 0, detailedShoppingProducts: [] as unknown as DetailedShoppingProduct[] },
        );

        return {
          group: productMaximum.groupName,
          detailedShoppingProducts,
          isOverMaximum: totalAmount > productMaximum.maximum,
        };
      })
      .filter((commonProduct) => commonProduct.detailedShoppingProducts.length > 0);

    const wineForEu = this.countryType === CountryType.EU ? this.getSimulationForWineEU() : [];

    return [...commonProducts, ...wineForEu];
  };

  private getSimulationForWineEU = (): AmountGroup[] => {
    const wineProducts = this.getSpecificProducts(AmountAlcoholProduct.wine);
    const wineAmount = wineProducts.length > 0 ? this.getTotalAmount(AmountAlcoholProduct.wine) : 0;
    const sparklingWineProducts = this.getSpecificProducts(AmountAlcoholProduct.sparklingWine);
    const sparklingWineAmount =
      sparklingWineProducts.length > 0
        ? this.getTotalAmount(AmountAlcoholProduct.sparklingWine)
        : 0;

    const amountGroups = [];
    if (wineProducts.length > 0) {
      amountGroups.push({
        group: AmountAlcoholProduct.wine,
        detailedShoppingProducts: wineProducts,
        isOverMaximum: wineAmount + sparklingWineAmount > MAXIMUM_WINE_EU,
      });
    }
    if (sparklingWineProducts.length > 0) {
      amountGroups.push({
        group: AmountAlcoholProduct.sparklingWine,
        detailedShoppingProducts: sparklingWineProducts,
        isOverMaximum: sparklingWineAmount > MAXIMUM_SPARKLING_WINE_EU,
      });
    }

    return amountGroups;
  };
}
