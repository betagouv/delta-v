import { CountryType, getCountryType } from '../../../../../utils/country.util';
import { DetailedShoppingProduct } from '../../detailedShoppingProduct';
import { TravelerData } from '../../traveler';
import { ProductMaximum } from '../globalAmount.service';
import {
  getProductMaximumAndorra,
  getProductMaximumBorder,
  getProductMaximumEU,
  getProductMaximumNonEU,
} from './maximum.services';
import {
  AmountAlcoholProduct,
  MAXIMUM_WINE_EU,
  MAXIMUM_SPARKLING_WINE_EU,
} from './alcohol.service';

interface AlcoholGroupConstructor {
  travelerData: TravelerData;
  detailedShoppingProducts: DetailedShoppingProduct[];
}

interface ProductWithAmountRatio {
  detailedAlcoholShoppingProduct: DetailedShoppingProduct;
  amountWithRatio: number;
  ratio: number;
}

export class AlcoholExceed {
  private countryType: CountryType;
  private border: boolean;
  private detailedAlcoholShoppingProducts: DetailedShoppingProduct[];

  constructor({ travelerData, detailedShoppingProducts }: AlcoholGroupConstructor) {
    this.border = travelerData.border;
    this.countryType = getCountryType(travelerData.country);
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
      (detailedAlcoholShoppingProduct) =>
        detailedAlcoholShoppingProduct.product?.amountProduct === amountAlcoholProduct,
    );
  };

  private getProductWithRatio = (
    amountAlcoholProduct: AmountAlcoholProduct,
    ratio: number,
  ): ProductWithAmountRatio[] => {
    const products = this.getSpecificProducts(amountAlcoholProduct);

    return products.map((product) => ({
      detailedAlcoholShoppingProduct: product,
      amountWithRatio: product.getDefaultCurrencyValue() * ratio,
      ratio,
    }));
  };

  private checkProductFromMaximum = (
    productMaximum: ProductMaximum,
  ): {
    totalAmount: number;
    productsWithAmountRatio: ProductWithAmountRatio[];
  } => {
    console.log('🚀 ~ AlcoholExceed ~ checkProductFromMaximum ~ productMaximum:', productMaximum);
    return productMaximum.products.reduce(
      (totalProducts, amount) => {
        const productsWithRatio = this.getProductWithRatio(
          amount.productType as AmountAlcoholProduct,
          amount.ratio,
        );
        const amountWithRatio = productsWithRatio.reduce(
          (sum, product) => sum + product.amountWithRatio,
          0,
        );
        return {
          totalAmount: totalProducts.totalAmount + amountWithRatio,
          productsWithAmountRatio: [...totalProducts.productsWithAmountRatio, ...productsWithRatio],
        };
      },
      { totalAmount: 0, productsWithAmountRatio: [] as ProductWithAmountRatio[] },
    );
  };

  public getExcessProducts = (): DetailedShoppingProduct[] => {
    let euExcessProducts: DetailedShoppingProduct[] = [];
    let wineExcessProducts: DetailedShoppingProduct[] = [];

    switch (this.countryType) {
      case CountryType.NON_EU:
        if (this.border) {
          return this.getExcessProductsByMaximum(getProductMaximumBorder());
        }
        return this.getExcessProductsByMaximum(getProductMaximumNonEU());
      case CountryType.ANDORRA:
        return this.getExcessProductsByMaximum(getProductMaximumAndorra());
      default:
        euExcessProducts = this.getExcessProductsByMaximum(getProductMaximumEU());
        wineExcessProducts = this.getExcessWineProductsForEU();
        return [...euExcessProducts, ...wineExcessProducts];
    }
  };

  private getExcessWineProductsForEU = (): DetailedShoppingProduct[] => {
    const wineProducts = this.getSpecificProducts(AmountAlcoholProduct.wine);
    const sparklingWineProducts = this.getSpecificProducts(AmountAlcoholProduct.sparklingWine);
    const excessProducts: DetailedShoppingProduct[] = [];

    // Handle sparkling wine excess
    const sparklingWineAmount = sparklingWineProducts.reduce(
      (sum, product) => sum + product.getDefaultCurrencyValue(),
      0,
    );
    if (sparklingWineAmount > MAXIMUM_SPARKLING_WINE_EU) {
      const excessRatio = (sparklingWineAmount - MAXIMUM_SPARKLING_WINE_EU) / sparklingWineAmount;
      sparklingWineProducts.forEach((product) => {
        const clonedProduct = product.clone();
        clonedProduct.taxableValue = Math.ceil(product.getDefaultCurrencyValue() * excessRatio);
        excessProducts.push(clonedProduct);
      });
    }

    const sparklingWineTaxedAmount = excessProducts.reduce(
      (sum, product) => sum + (product.taxableValue ?? 0),
      0,
    );

    // Handle combined wine excess
    const wineAmount = wineProducts.reduce(
      (sum, product) => sum + product.getDefaultCurrencyValue(),
      0,
    );
    const totalWineAmount = wineAmount + sparklingWineAmount - sparklingWineTaxedAmount;
    console.log({ totalWineAmount });
    if (totalWineAmount > MAXIMUM_WINE_EU) {
      const excessAmount = totalWineAmount - MAXIMUM_WINE_EU;
      console.log({ excessAmount });
      const excessRatio = excessAmount / wineAmount;
      console.log({ excessRatio });

      wineProducts.forEach((product) => {
        const clonedProduct = product.clone();
        clonedProduct.taxableValue = Math.ceil(product.getDefaultCurrencyValue() * excessRatio);
        excessProducts.push(clonedProduct);
      });

      // Only add sparkling wine to excess if it wasn't already added due to its own limit
      if (sparklingWineAmount <= MAXIMUM_SPARKLING_WINE_EU) {
        sparklingWineProducts.forEach((product) => {
          const clonedProduct = product.clone();
          clonedProduct.taxableValue = Math.ceil(product.getDefaultCurrencyValue() * excessRatio);
          excessProducts.push(clonedProduct);
        });
      }
    }

    return excessProducts;
  };

  private getExcessProductsByMaximum = (
    productsMaximum: ProductMaximum[],
  ): DetailedShoppingProduct[] => {
    const excessProducts: DetailedShoppingProduct[] = [];

    productsMaximum.forEach((productMaximum) => {
      const { totalAmount, productsWithAmountRatio } = this.checkProductFromMaximum(productMaximum);
      if (totalAmount < productMaximum.maximum) {
        return;
      }
      const excessAmount = totalAmount - productMaximum.maximum;
      const excessRatio = excessAmount / totalAmount;

      excessProducts.push(
        ...this.getExcessProductsFromRatio(excessAmount, excessRatio, productsWithAmountRatio),
      );
    });

    return excessProducts;
  };

  private getExcessProductsFromRatio = (
    excessAmount: number,
    excessRatio: number,
    productsWithAmountRatio: ProductWithAmountRatio[],
  ): DetailedShoppingProduct[] => {
    const excessProducts: DetailedShoppingProduct[] = [];
    let remainingExcess = excessAmount;

    productsWithAmountRatio
      .sort((a, b) => b.ratio - a.ratio)
      .forEach((product) => {
        const clonedProduct = product.detailedAlcoholShoppingProduct.clone();
        const productValue = product.detailedAlcoholShoppingProduct.getDefaultCurrencyValue();
        const taxableValue = Math.ceil(productValue * excessRatio);
        const { taxableValue: newTaxableValue, remainingExcess: newRemainingExcess } =
          this.checkAmountToTax(taxableValue, remainingExcess, product.ratio);
        clonedProduct.taxableValue = newTaxableValue;
        remainingExcess = newRemainingExcess;
        excessProducts.push(clonedProduct);
      });

    return excessProducts;
  };

  private checkAmountToTax(
    calculatedTaxableValue: number,
    remainingExcess: number,
    ratio: number,
  ): { taxableValue: number; remainingExcess: number } {
    if (calculatedTaxableValue <= remainingExcess) {
      return {
        taxableValue: calculatedTaxableValue,
        remainingExcess: remainingExcess - calculatedTaxableValue * ratio,
      };
    }

    const tempTaxableValue = Math.floor(remainingExcess / ratio);
    remainingExcess = remainingExcess % ratio;
    if (remainingExcess === 1 && ratio === 1) {
      return {
        taxableValue: tempTaxableValue + 1,
        remainingExcess: 0,
      };
    } else if (remainingExcess > 0 && remainingExcess < 0.5) {
      return {
        taxableValue: tempTaxableValue,
        remainingExcess: 0,
      };
    } else if (remainingExcess > 0.5 && remainingExcess < 1) {
      return {
        taxableValue: tempTaxableValue + 1,
        remainingExcess: 0,
      };
    }
    return {
      taxableValue: tempTaxableValue,
      remainingExcess,
    };
  }
}
