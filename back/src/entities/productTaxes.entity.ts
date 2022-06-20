import currency from 'currency.js';
import { v4 as uuid } from 'uuid';
import { CompleteShoppingProduct } from '../api/simulator/services';

export interface ProductTaxesInterface {
  id: string;
  name: string;
  customName?: string;
  unitPrice: number;
  customDuty: number;
  vat: number;
  setFromProductTaxes(productTaxes: ProductTaxesInterface): ProductTaxesInterface;
  setFromCompleteShoppingProduct(
    completeShoppingProduct: CompleteShoppingProduct,
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
  amount?: number;
  unitPrice?: number;
  customDuty?: number;
  vat?: number;
}

export const LIMIT_UNIQUE_CUSTOM_DUTY = 700;
export const UNIQUE_CUSTOM_DUTY = 2.5;

export class ProductTaxes implements ProductTaxesInterface {
  private _id: string;
  private _name: string;
  private _customName?: string;
  private _unitPrice: number;
  private _vat: number;
  private _customDuty: number;

  constructor({
    id,
    name,
    customName,
    unitPrice,
    customDuty,
    vat,
  }: ProductTaxesConstructorOptions) {
    this._id = id ?? uuid();
    this._name = name ?? '';
    this._customName = customName;
    this._unitPrice = unitPrice ?? 0;
    this._customDuty = customDuty ?? 0;
    this._vat = vat ?? 0;

    return this;
  }

  setFromProductTaxes = (productTaxes: ProductTaxesInterface): ProductTaxesInterface => {
    this._id = productTaxes.id;
    this._name = productTaxes.name;
    this._customName = productTaxes.customName;
    this._unitPrice = productTaxes.unitPrice;
    this._customDuty = productTaxes.customDuty;
    this._vat = productTaxes.vat;

    return this;
  };

  setFromCompleteShoppingProduct = (
    completeShoppingProduct: CompleteShoppingProduct,
  ): ProductTaxesInterface => {
    const {
      name: customName,
      price,
      product: { customDuty, vat, id, name },
    } = completeShoppingProduct;

    this._id = id;
    this._name = name;
    this._customName = customName;
    this._unitPrice = price;
    this._customDuty = customDuty ?? 0;
    this._vat = vat ?? 0;

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

  get unitPrice(): number {
    return this._unitPrice;
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
    return currency(this.unitPrice).multiply(this.vat).divide(100).value;
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
