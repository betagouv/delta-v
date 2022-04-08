import currency from 'currency.js';
import { v4 as uuid } from 'uuid';
import { CompleteShopingProduct } from '../api/simulator/services';

export interface ProductTaxesInterface {
  id: string;
  name: string;
  amount: number;
  unitPrice: number;
  customDuty: number;
  vat: number;
  setFromProductTaxes(productTaxes: ProductTaxesInterface): ProductTaxesInterface;
  setFromCompleteShopingProduct(
    completeShopingProduct: CompleteShopingProduct,
  ): ProductTaxesInterface;
  getTotalPrice(): number;
  getUnitCustomDuty(): number;
  getUnitVat(): number;
  getUnitTaxes(): number;
  getTotalCustomDuty(): number;
  getTotalVat(): number;
  getTotalTaxes(): number;
  resetAmount(): ProductTaxesInterface;
  addProduct(amount: number): ProductTaxesInterface;
  resetFreeTaxeDetails(): ProductTaxesInterface;
  setCustomDuty(customDuty: number): ProductTaxesInterface;
}
export interface ProductTaxesConstructorOptions {
  id?: string;
  name?: string;
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
  private _amount: number;
  private _unitPrice: number;
  private _vat: number;
  private _customDuty: number;

  constructor({ id, name, amount, unitPrice, customDuty, vat }: ProductTaxesConstructorOptions) {
    this._id = id ?? uuid();
    this._name = name ?? '';
    this._amount = amount ?? 0;
    this._unitPrice = unitPrice ?? 0;
    this._customDuty = customDuty ?? 0;
    this._vat = vat ?? 0;

    return this;
  }

  setFromProductTaxes = (productTaxes: ProductTaxesInterface): ProductTaxesInterface => {
    this._id = productTaxes.id;
    this._name = productTaxes.name;
    this._amount = productTaxes.amount;
    this._unitPrice = productTaxes.unitPrice;
    this._customDuty = productTaxes.customDuty;
    this._vat = productTaxes.vat;

    return this;
  };

  setFromCompleteShopingProduct = (
    completeShopingProduct: CompleteShopingProduct,
  ): ProductTaxesInterface => {
    const {
      amount,
      price,
      product: { customDuty, vat, id, name },
    } = completeShopingProduct;

    this._id = id;
    this._name = name;
    this._amount = amount;
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

  get amount(): number {
    return this._amount;
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

  getTotalCustomDuty = (): number => {
    return currency(this.getUnitCustomDuty()).multiply(this.amount).value;
  };

  getTotalVat = (): number => {
    return currency(this.getUnitVat()).multiply(this.amount).value;
  };

  getTotalTaxes = (): number => {
    return currency(this.getTotalCustomDuty()).add(this.getTotalVat()).value;
  };

  getTotalPrice = (): number => {
    return currency(this.unitPrice).multiply(this.amount).value;
  };

  resetAmount = (): ProductTaxesInterface => {
    this._amount = 1;
    return this;
  };

  addProduct = (amount = 1): ProductTaxesInterface => {
    this._amount += amount;
    return this;
  };

  resetFreeTaxeDetails = (): ProductTaxesInterface => {
    this._customDuty = 0;
    this._vat = 0;
    return this;
  };

  setCustomDuty = (customDuty: number): ProductTaxesInterface => {
    this._customDuty = customDuty;
    return this;
  };
}
