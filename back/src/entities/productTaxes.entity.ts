import currency from 'currency.js';
import { v4 as uuid } from 'uuid';
import { CompleteCustomShoppingProduct } from '../api/simulator/services/shoppingProducts';
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
  id: string;
  name: string;
  customId: string;
  customName?: string;
  unitPrice: number;
  originalPrice: number;
  originalCurrency: string;
  rateCurrency: number;
  customDuty: number;
  vat: number;
  setFromProductTaxes(productTaxes: ProductTaxesInterface): ProductTaxesInterface;
  setFromCompleteShoppingProduct(
    completeShoppingProduct: CompleteShoppingProduct,
  ): ProductTaxesInterface;
  setFromCompleteCustomShoppingProduct(
    completeCustomShoppingProduct: CompleteCustomShoppingProduct,
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
}

export const LIMIT_UNIQUE_CUSTOM_DUTY = 700;
export const UNIQUE_CUSTOM_DUTY = 2.5;

export class ProductTaxes implements ProductTaxesInterface {
  private _id: string;
  private _name: string;
  private _customId: string;
  private _customName?: string;
  private _unitPrice: number;
  private _originalPrice: number;
  private _originalCurrency: string;
  private _rateCurrency: number;
  private _vat: number;
  private _customDuty: number;

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

    return this;
  };

  setFromCompleteShoppingProduct = (
    completeShoppingProduct: CompleteShoppingProduct,
  ): ProductTaxesInterface => {
    const {
      customName,
      customId,
      value,
      product: { customDuty, vat, id, name },
    } = completeShoppingProduct;

    this._id = id;
    this._name = name;
    this._customName = customName;
    this._customId = customId;
    this._unitPrice = value;
    this._originalPrice = completeShoppingProduct.originalValue;
    this._originalCurrency = completeShoppingProduct.currency;
    this._rateCurrency = completeShoppingProduct.rateCurrency ?? 1;
    this._customDuty = customDuty ?? 0;
    this._vat = vat ?? 0;

    return this;
  };

  setFromCompleteCustomShoppingProduct = (
    completeCustomShoppingProducts: CompleteCustomShoppingProduct,
  ): ProductTaxesInterface => {
    const { customName, customId, value } = completeCustomShoppingProducts;

    this._id = customId;
    this._name = customName;
    this._customName = customName;
    this._customId = customId;
    this._unitPrice = value;
    this._originalPrice = completeCustomShoppingProducts.originalValue;
    this._originalCurrency = completeCustomShoppingProducts.currency;
    this._rateCurrency = completeCustomShoppingProducts.rateCurrency ?? 1;
    this._customDuty = 0;
    this._vat = 0;

    return this;
  };

  get id(): string {
    return this._id;
  }

  get name(): string {
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

  get originalCurrency(): string {
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
