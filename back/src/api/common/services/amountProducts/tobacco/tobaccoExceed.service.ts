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

interface ProductWithAmountRatio {
  detailedTobaccoShoppingProduct: DetailedShoppingProduct;
  amountWithRatio: number;
  ratio: number;
}

export class TobaccoExceed {
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

  private getProductWithRatio = (
    amountTobaccoProduct: AmountTobaccoProduct,
    ratio: number,
  ): ProductWithAmountRatio[] => {
    const products = this.getSpecificProducts(amountTobaccoProduct);

    return products.map((product) => ({
      detailedTobaccoShoppingProduct: product,
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
    return productMaximum.products.reduce(
      (totalProducts, amount) => {
        const productsWithRatio = this.getProductWithRatio(
          amount.productType as AmountTobaccoProduct,
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
    switch (this.countryType) {
      case CountryType.NON_EU:
        if (this.border) {
          return this.getExcessProductsByMaximum(getProductMaximumBorder());
        }
        return this.getExcessProductsByMaximum(getProductMaximumNonEU());
      case CountryType.ANDORRA:
        return this.getExcessProductsByMaximum(getProductMaximumAndorra());
      default:
        return this.getExcessProductsByMaximum(getProductMaximumEU());
    }
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
        const clonedProduct = product.detailedTobaccoShoppingProduct.clone();
        const productValue = product.detailedTobaccoShoppingProduct.getDefaultCurrencyValue();
        const taxableValue = Math.ceil(productValue * excessRatio);
        const { taxableValue: newTaxableValue, remainingExcess: newRemainingExcess } =
          this.checkAmountToTax(taxableValue, remainingExcess, product.ratio);
        console.log('newTaxableValue', newTaxableValue);
        console.log('newRemainingExcess', newRemainingExcess);
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
