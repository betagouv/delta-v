import { faker } from '@faker-js/faker';
import { DetailedShoppingProduct } from '../../src/api/common/services/detailedShoppingProduct';
import {
  ProductTaxes,
  ProductTaxesConstructorOptions,
} from '../../src/entities/productTaxes.entity';
import { currencyEntityFactory } from '../helpers/factories/currency.factory';
import { productEntityFactory } from '../helpers/factories/product.factory';

describe('ProductTaxes entity', () => {
  const defaultOptions: ProductTaxesConstructorOptions = {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    unitPrice: faker.number.float({ max: 1000, min: 0, precision: 0.01 }),
    customDuty: faker.number.float({ max: 100, min: 0, precision: 0.01 }),
    vat: faker.number.float({ max: 100, min: 0, precision: 0.01 }),
  };
  describe('constructor', () => {
    it('should creat an object with default values', () => {
      const productTaxes = new ProductTaxes({});
      expect(productTaxes.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
      expect(productTaxes.name).toEqual('');
      expect(productTaxes.customDuty).toEqual(0);
      expect(productTaxes.vat).toEqual(0);
      expect(productTaxes.unitPrice).toEqual(0);
    });
    it('should creat an object with gave values', () => {
      const options: ProductTaxesConstructorOptions = { ...defaultOptions };
      const productTaxes = new ProductTaxes(options);
      expect(productTaxes.id).toEqual(options.id);
      expect(productTaxes.name).toEqual(options.name);
      expect(productTaxes.customDuty).toEqual(options.customDuty);
      expect(productTaxes.vat).toEqual(options.vat);
      expect(productTaxes.unitPrice).toEqual(options.unitPrice);
    });
  });
  describe('setFromProductTaxes', () => {
    it('should update an object with ProductTaxes', () => {
      const options: ProductTaxesConstructorOptions = { ...defaultOptions };
      const productTaxes = new ProductTaxes(options);
      const productTaxes2 = new ProductTaxes({});
      productTaxes2.setFromProductTaxes(productTaxes);
      expect(productTaxes2.id).toEqual(options.id);
      expect(productTaxes2.name).toEqual(options.name);
      expect(productTaxes2.customDuty).toEqual(options.customDuty);
      expect(productTaxes2.vat).toEqual(options.vat);
      expect(productTaxes2.unitPrice).toEqual(options.unitPrice);
    });
  });
  describe('setFromCompleteShoppingProduct', () => {
    it('should update an object with setFromDetailedShoppingProduct', () => {
      const detailedShoppingProduct = new DetailedShoppingProduct();
      detailedShoppingProduct.shoppingProduct = {
        id: faker.string.uuid(),
        originalValue: faker.number.float({ max: 1000, min: 0, precision: 0.01 }),
        customName: faker.string.sample(),
        customId: faker.string.uuid(),
        currency: 'EUR',
      };
      detailedShoppingProduct.product = productEntityFactory({
        customDuty: faker.number.float({ max: 100, min: 0, precision: 0.01 }),
        vat: faker.number.float({ max: 100, min: 0, precision: 0.01 }),
      });
      detailedShoppingProduct.currency = currencyEntityFactory({
        value: 1,
      });
      const productTaxes = new ProductTaxes({});
      productTaxes.setFromDetailedShoppingProduct(detailedShoppingProduct);
      expect(productTaxes.id).toEqual(detailedShoppingProduct.product.id);
      expect(productTaxes.customName).toEqual(detailedShoppingProduct.shoppingProduct.customName);
      expect(productTaxes.unitPrice).toEqual(detailedShoppingProduct.getDefaultCurrencyValue());
      expect(productTaxes.name).toEqual(detailedShoppingProduct.product.name);
      expect(productTaxes.customDuty).toEqual(detailedShoppingProduct.product.customDuty);
      expect(productTaxes.vat).toEqual(detailedShoppingProduct.product.vat);
    });
  });
  describe('getUnitCustomDuty', () => {
    test.each([
      [3, 50, 6],
      [6, 100, 6],
      [14, 70, 20],
      [0, 200, 0],
    ])(
      'should return %i, with unit price %i and customDuty %i',
      (unitCustomDuty, unitPrice, customDuty) => {
        const options: ProductTaxesConstructorOptions = {
          ...defaultOptions,
          unitPrice,
          customDuty,
        };
        const productTaxes = new ProductTaxes(options);
        const result = productTaxes.getUnitCustomDuty();
        expect(result).toEqual(unitCustomDuty);
      },
    );
  });
  describe('getUnitVat', () => {
    test.each([
      [3, 50, 6],
      [6.01, 100, 6],
      [14.01, 70, 20],
      [0, 200, 0],
    ])('should return %i, with unit price %i and vat %i', (unitVat, unitPrice, vat) => {
      const options: ProductTaxesConstructorOptions = {
        ...defaultOptions,
        unitPrice,
        vat,
        customDuty: 0.1,
      };
      const productTaxes = new ProductTaxes(options);
      const result = productTaxes.getUnitVat();
      expect(result).toEqual(unitVat);
    });
  });
  describe('getUnitTaxes', () => {
    test.each([
      [4.59, 50, 6, 3],
      [8.12, 100, 6, 2],
      [26.6, 70, 20, 15],
      [4, 200, 0, 2],
    ])(
      'should return %i, with unit price %i and vat %i and customDuty %i',
      (unitTaxes, unitPrice, vat, customDuty) => {
        const options: ProductTaxesConstructorOptions = {
          ...defaultOptions,
          unitPrice,
          customDuty,
          vat,
        };
        const productTaxes = new ProductTaxes(options);
        const result = productTaxes.getUnitTaxes();
        expect(result).toEqual(unitTaxes);
      },
    );
  });
  describe('resetFreeTaxesDetails', () => {
    it('should reset the taxes to free', () => {
      const options: ProductTaxesConstructorOptions = {
        ...defaultOptions,
        vat: 15,
        customDuty: 12,
      };
      const productTaxes = new ProductTaxes(options);
      productTaxes.resetFreeTaxesDetails();
      expect(productTaxes.vat).toEqual(0);
      expect(productTaxes.customDuty).toEqual(0);
    });
  });
});
