import currency from 'currency.js';
import { v4 as uuid } from 'uuid';
import { DetailedShoppingProduct } from '../api/common/services/detailedShoppingProduct';
import { Product } from './product.entity';

export interface ShoppingProduct {
  id: string;
  customId: string;
  customName?: string;
  originalValue: number;
  currency: string;
}

export interface CompleteShoppingProduct extends ShoppingProduct {
  product: Product;
  value: number;
  valueCurrency?: number;
  rateCurrency?: number;
}

export interface ProductTaxesInterface {
  id?: string;
  name?: string;
  customId: string;
  customName?: string;
  unitPrice: number;
  originalPrice: number;
  originalCurrency?: string;
  rateCurrency: number;
  customDuty: number;
  vat: number;
  notManagedProduct: boolean;
  setFromProductTaxes(productTaxes: ProductTaxesInterface): ProductTaxesInterface;
  setFromDetailedShoppingProduct(
    detailedShoppingProduct: DetailedShoppingProduct,
  ): ProductTaxesInterface;
  getUnitCustomDuty(): number;
  getUnitVat(): number;
  getUnitTaxes(): number;
  resetFreeTaxesDetails(): ProductTaxesInterface;
  setCustomDuty(customDuty: number): ProductTaxesInterface;
}
export interface ProductTaxesConstructorOptions {
  id?: string;
  name?: string;
  customName?: string;
  customId?: string;
  amount?: number;
  unitPrice?: number;
  customDuty?: number;
  originalPrice?: number;
  originalCurrency?: string;
  rateCurrency?: number;
  vat?: number;
  notManagedProduct?: boolean;
}

export const LIMIT_UNIQUE_CUSTOM_DUTY = 700;
export const UNIQUE_CUSTOM_DUTY = 2.5;

export class ProductTaxes implements ProductTaxesInterface {
  private _id?: string;
  private _name?: string;
  private _customId: string;
  private _customName?: string;
  private _unitPrice: number;
  private _originalPrice: number;
  private _originalCurrency?: string;
  private _rateCurrency: number;
  private _vat: number;
  private _customDuty: number;
  private _notManagedProduct: boolean;

  constructor({
    id,
    name,
    customName,
    customId,
    unitPrice,
    customDuty,
    originalPrice,
    originalCurrency,
    rateCurrency,
    vat,
  }: ProductTaxesConstructorOptions) {
    this._id = id ?? uuid();
    this._name = name ?? '';
    this._customId = customId ?? uuid();
    this._customName = customName;
    this._unitPrice = unitPrice ?? 0;
    this._customDuty = customDuty ?? 0;
    this._originalPrice = originalPrice ?? 0;
    this._originalCurrency = originalCurrency ?? 'EUR';
    this._rateCurrency = rateCurrency ?? 1;
    this._vat = vat ?? 0;
    this._notManagedProduct = false;

    return this;
  }

  setFromProductTaxes = (productTaxes: ProductTaxesInterface): ProductTaxesInterface => {
    this._id = productTaxes.id;
    this._name = productTaxes.name;
    this._customName = productTaxes.customName;
    this._customId = productTaxes.customId;
    this._unitPrice = productTaxes.unitPrice;
    this._originalPrice = productTaxes.originalPrice;
    this._originalCurrency = productTaxes.originalCurrency;
    this._rateCurrency = productTaxes.rateCurrency;
    this._customDuty = productTaxes.customDuty;
    this._vat = productTaxes.vat;
    this._notManagedProduct = productTaxes.notManagedProduct;

    return this;
  };

  setFromDetailedShoppingProduct = (
    detailedShoppingProduct: DetailedShoppingProduct,
  ): ProductTaxesInterface => {
    const {
      shoppingProduct: { customName, customId },
    } = detailedShoppingProduct;

    const id = detailedShoppingProduct.product?.id;
    const name = detailedShoppingProduct.product?.name;

    this._id = id;
    this._name = name;
    this._customName = customName;
    this._customId = customId;
    this._unitPrice = detailedShoppingProduct.getDefaultCurrencyValue();
    this._originalPrice = detailedShoppingProduct.shoppingProduct.originalValue;
    this._originalCurrency = detailedShoppingProduct.shoppingProduct.currency;
    this._rateCurrency = detailedShoppingProduct.currency?.value ?? 1;
    this._customDuty = detailedShoppingProduct.product?.customDuty ?? 0;
    this._vat = detailedShoppingProduct.product?.vat ?? 0;
    this._notManagedProduct = detailedShoppingProduct.isNotManagedShoppingProduct();

    return this;
  };

  get id(): string | undefined {
    return this._id;
  }

  get name(): string | undefined {
    return this._name;
  }

  get customName(): string | undefined {
    return this._customName;
  }

  get customId(): string {
    return this._customId;
  }

  get unitPrice(): number {
    return this._unitPrice;
  }

  get originalPrice(): number {
    return this._originalPrice;
  }

  get originalCurrency(): string | undefined {
    return this._originalCurrency;
  }

  get rateCurrency(): number {
    return this._rateCurrency;
  }

  get customDuty(): number {
    return this._customDuty;
  }

  get vat(): number {
    return this._vat;
  }

  get notManagedProduct(): boolean {
    return this._notManagedProduct;
  }

  getUnitCustomDuty = (): number => {
    return currency(this.unitPrice).multiply(this.customDuty).divide(100).value;
  };

  getUnitVat = (): number => {
    return currency(this.unitPrice).add(this.getUnitCustomDuty()).multiply(this.vat).divide(100)
      .value;
  };

  getUnitTaxes = (): number => {
    return currency(this.getUnitCustomDuty()).add(this.getUnitVat()).value;
  };

  resetFreeTaxesDetails = (): ProductTaxesInterface => {
    this._customDuty = 0;
    this._vat = 0;
    return this;
  };

  setCustomDuty = (customDuty: number): ProductTaxesInterface => {
    this._customDuty = customDuty;
    return this;
  };
}

export const getTotalProductsTaxes = (productsTaxes: ProductTaxesInterface[]): number => {
  return currency(getTotalProductsVat(productsTaxes)).add(getTotalProductsCustomDuty(productsTaxes))
    .value;
};

const getTotalProductsVat = (productsTaxes: ProductTaxesInterface[]): number => {
  return productsTaxes.reduce((total, ProductTaxes) => {
    return currency(total).add(ProductTaxes.getUnitVat()).value;
  }, 0);
};

const getTotalProductsCustomDuty = (ProductsTaxesDetails: ProductTaxesInterface[]): number => {
  return ProductsTaxesDetails.reduce((total, productTaxesDetails) => {
    return currency(total).add(productTaxesDetails.getUnitCustomDuty()).value;
  }, 0);
};
