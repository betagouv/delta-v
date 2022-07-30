import { Alpha2Code } from 'i18n-iso-countries';
import { CountryType, getCountryType } from '../../../../../utils/country.util';
import { CompleteShoppingProduct } from '../../shoppingProducts';
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
  country: Alpha2Code;
  border: boolean;
  completeShoppingProducts: CompleteShoppingProduct[];
}

export class AlcoholGroup {
  private countryType: CountryType;
  private border: boolean;
  private completeAlcoholShoppingProducts: CompleteShoppingProduct[];

  constructor({ country, completeShoppingProducts, border }: AlcoholGroupConstructor) {
    this.countryType = getCountryType(country);
    this.border = border;
    this.completeAlcoholShoppingProducts = completeShoppingProducts.filter(
      (completeShoppingProducts) => {
        const alcoholValues = Object.values(AmountAlcoholProduct);
        return completeShoppingProducts.product.amountProduct
          ? alcoholValues.includes(
              completeShoppingProducts.product.amountProduct as AmountAlcoholProduct,
            )
          : false;
      },
    );
  }

  private getSpecificProducts = (
    amountAlcoholProduct?: AmountAlcoholProduct,
  ): CompleteShoppingProduct[] => {
    if (!amountAlcoholProduct) {
      return this.completeAlcoholShoppingProducts;
    }
    return this.completeAlcoholShoppingProducts.filter(
      (completeShoppingProducts) =>
        completeShoppingProducts.product.amountProduct === amountAlcoholProduct,
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
      (accumulator, completeShoppingProduct) => {
        return accumulator + completeShoppingProduct.value;
      },
      0,
    );
  };

  private getSimulationGroupedWithCountry = (productsMaximum: ProductMaximum[]): AmountGroup[] => {
    const commonProducts = productsMaximum
      .map((productMaximum) => {
        const { totalAmount, completeShoppingProducts } = productMaximum.products.reduce(
          (accumulator, amount) => {
            const amountWithRatio =
              amount.ratio * this.getTotalAmount(amount.productType as AmountAlcoholProduct);
            const products = this.getSpecificProducts(amount.productType as AmountAlcoholProduct);
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
        completeShoppingProducts: wineProducts,
        isOverMaximum: wineAmount + sparklingWineAmount > MAXIMUM_WINE_EU,
      });
    }
    if (sparklingWineProducts.length > 0) {
      amountGroups.push({
        group: AmountAlcoholProduct.sparklingWine,
        completeShoppingProducts: sparklingWineProducts,
        isOverMaximum: sparklingWineAmount > MAXIMUM_SPARKLING_WINE_EU,
      });
    }

    return amountGroups;
  };
}
