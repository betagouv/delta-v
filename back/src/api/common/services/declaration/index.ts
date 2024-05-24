import currency from 'currency.js';
import type { Alpha2Code } from 'i18n-iso-countries';
import {
  getTotalProductsTaxes,
  LIMIT_UNIQUE_CUSTOM_DUTY,
  ProductTaxes,
  ProductTaxesInterface,
  UNIQUE_CUSTOM_DUTY,
} from '../../../../entities/productTaxes.entity';
import { CurrencyRepositoryInterface } from '../../../../repositories/currency.repository';
import { ProductRepositoryInterface } from '../../../../repositories/product.repository';
import { MeansOfTransport } from '../../enums/meansOfTransport.enum';
import { AmountGroup, checkAmountProducts } from '../amountProducts/globalAmount.service';
import { DetailedShoppingProduct } from '../detailedShoppingProduct';
import { initDetailedShoppingProducts } from '../detailedShoppingProduct/detailedShoppingProducts';
import { ShoppingProduct } from '../shoppingProducts';
import { TravelerData } from '../traveler';
import { getFranchiseAmount, manageFreeProducts } from '../valueProducts';

interface InputDeclaration {
  travelerData: TravelerData;
  shoppingProducts: ShoppingProduct[];
}

export interface Declaration {
  inputDeclaration: InputDeclaration;
}

interface GenerateDeclarationOptions {
  border: boolean;
  age: number;
  country: Alpha2Code;
  meanOfTransport?: MeansOfTransport;
  shoppingProducts: ShoppingProduct[];
  productRepository: ProductRepositoryInterface;
  currencyRepository: CurrencyRepositoryInterface;
}

export const generateDeclaration = async ({
  shoppingProducts,
  productRepository,
  currencyRepository,
  ...travelerData
}: GenerateDeclarationOptions): Promise<Declaration> => {
  const inputDeclaration: InputDeclaration = {
    travelerData,
    shoppingProducts,
  };

  const detailedShoppingProducts = await initDetailedShoppingProducts({
    shoppingProducts,
    productRepository,
    currencyRepository,
  });

  return new Declaration({ inputDeclaration, detailedShoppingProducts });
};

interface DeclarationConstructorOptions {
  inputDeclaration: InputDeclaration;
  detailedShoppingProducts: DetailedShoppingProduct[];
}

export class Declaration {
  inputDeclaration: InputDeclaration;
  detailedShoppingProducts: DetailedShoppingProduct[];
  defaultProductsTaxes: ProductTaxesInterface[];
  uncompletedRealProductsTaxes: ProductTaxesInterface[];
  total: number;
  franchiseAmount: number;

  constructor({ inputDeclaration, detailedShoppingProducts }: DeclarationConstructorOptions) {
    this.inputDeclaration = inputDeclaration;
    this.detailedShoppingProducts = detailedShoppingProducts;
    this.total = this.getTotalProducts();
    this.franchiseAmount = this.getFranchiseAmount();
    this.defaultProductsTaxes = this.getDefaultProductTaxes();
    this.uncompletedRealProductsTaxes = this.getUncompletedProductTaxes();
  }

  getAmountProductsGrouped(): AmountGroup[] {
    return checkAmountProducts(this.detailedShoppingProducts, this.inputDeclaration.travelerData);
  }

  private getFranchiseAmount(): number {
    return getFranchiseAmount(this.inputDeclaration.travelerData);
  }

  private getTotalProducts(): number {
    return this.detailedShoppingProducts
      .filter((detailedShoppingProduct) => !detailedShoppingProduct.isAmountProduct())
      .reduce((total, shoppingProduct) => {
        return currency(shoppingProduct.getDefaultCurrencyValue()).add(total).value;
      }, 0);
  }

  private getDefaultProductTaxes(): ProductTaxesInterface[] {
    const productTaxes = this.detailedShoppingProducts
      .filter((detailedShoppingProduct) => detailedShoppingProduct.isValueProduct())
      .map((detailedShoppingProduct) => {
        return new ProductTaxes({}).setFromDetailedShoppingProduct(detailedShoppingProduct);
      });

    if (this.total <= this.franchiseAmount) {
      return productTaxes.map((product) => product.resetFreeTaxesDetails());
    }

    return productTaxes;
  }

  private hasUncompletedProduct(): boolean {
    return !!this.detailedShoppingProducts.find((detailedShoppingProduct) =>
      detailedShoppingProduct.isUncompletedProduct(),
    );
  }

  private getUncompletedProductTaxes(): ProductTaxesInterface[] {
    if (!this.canCalculateTaxes()) {
      return this.detailedShoppingProducts
        .filter((detailedShoppingProduct) => !detailedShoppingProduct.isAmountProduct())
        .map((detailedShoppingProduct) => {
          return new ProductTaxes({}).setFromDetailedShoppingProduct(detailedShoppingProduct);
        });
    }
    return this.detailedShoppingProducts
      .filter((detailedShoppingProduct) => detailedShoppingProduct.isUncompletedProduct())
      .map((detailedShoppingProduct) => {
        return new ProductTaxes({}).setFromDetailedShoppingProduct(detailedShoppingProduct);
      });
  }

  private getUsualProductTaxes(): ProductTaxesInterface[] {
    const productsTaxes = this.defaultProductsTaxes.map((product) =>
      new ProductTaxes({}).setFromProductTaxes(product),
    );

    return manageFreeProducts({
      franchiseAmount: this.franchiseAmount,
      productsTaxes: productsTaxes,
    });
  }

  private getUniqueRateProductTaxes(): ProductTaxesInterface[] {
    const productsTaxes = this.defaultProductsTaxes.map((product) =>
      new ProductTaxes({}).setFromProductTaxes(product),
    );
    const uniqueRateProducts = productsTaxes.map((product) => {
      const newProduct = new ProductTaxes({}).setFromProductTaxes(product);
      newProduct.setCustomDuty(UNIQUE_CUSTOM_DUTY);
      return newProduct;
    });

    return manageFreeProducts({
      franchiseAmount: this.franchiseAmount,
      productsTaxes: uniqueRateProducts,
    });
  }

  getRealProductsTaxes(): ProductTaxesInterface[] {
    if (!this.canCalculateTaxes()) {
      return [];
    }
    const usualProductTaxes = this.getUsualProductTaxes();
    if (this.total > LIMIT_UNIQUE_CUSTOM_DUTY) {
      return usualProductTaxes;
    }

    const uniqueRateProductTaxes = this.getUniqueRateProductTaxes();

    if (getTotalProductsTaxes(usualProductTaxes) < getTotalProductsTaxes(uniqueRateProductTaxes)) {
      return usualProductTaxes;
    }
    return uniqueRateProductTaxes;
  }

  canCalculateTaxes = (): boolean => {
    if (this.total <= this.franchiseAmount) {
      return true;
    }

    if (this.hasUncompletedProduct()) {
      return false;
    }

    return true;
  };

  canCreateDeclaration = (): boolean => {
    if (this.detailedShoppingProducts.length <= 0) {
      return false;
    }

    const hasOverMaximumAmountProduct = this.getAmountProductsGrouped().find(
      (amountGroup) => amountGroup.isOverMaximum,
    );
    if (hasOverMaximumAmountProduct) {
      return false;
    }

    return true;
  };
}
