import { faker } from '@faker-js/faker';
import {
  CompleteShoppingProduct,
  ProductTaxes,
  ProductTaxesConstructorOptions,
} from '../../src/entities/productTaxes.entity';
import { productEntityFactory } from '../helpers/factories/product.factory';

describe('ProductTaxes entity', () => {
  const defaultOptions: ProductTaxesConstructorOptions = {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    unitPrice: faker.datatype.number({ max: 1000, min: 0, precision: 0.01 }),
    customDuty: faker.datatype.number({ max: 100, min: 0, precision: 0.01 }),
    vat: faker.datatype.number({ max: 100, min: 0, precision: 0.01 }),
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
    it('should update an object with setFromCompleteShoppingProduct', () => {
      const completeShoppingProduct: CompleteShoppingProduct = {
        id: faker.datatype.uuid(),
        value: faker.datatype.number({ max: 1000, min: 0, precision: 0.01 }),
        customName: faker.datatype.string(),
        customId: faker.datatype.uuid(),
        product: productEntityFactory({
          customDuty: faker.datatype.number({ max: 100, min: 0, precision: 0.01 }),
          vat: faker.datatype.number({ max: 100, min: 0, precision: 0.01 }),
        }),
      };
      const productTaxes = new ProductTaxes({});
      productTaxes.setFromCompleteShoppingProduct(completeShoppingProduct);
      expect(productTaxes.id).toEqual(completeShoppingProduct.product.id);
      expect(productTaxes.customName).toEqual(completeShoppingProduct.customName);
      expect(productTaxes.unitPrice).toEqual(completeShoppingProduct.value);
      expect(productTaxes.name).toEqual(completeShoppingProduct.product.name);
      expect(productTaxes.customDuty).toEqual(completeShoppingProduct.product.customDuty);
      expect(productTaxes.vat).toEqual(completeShoppingProduct.product.vat);
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
      [6, 100, 6],
      [14, 70, 20],
      [0, 200, 0],
    ])('should return %i, with unit price %i and vat %i', (unitVat, unitPrice, vat) => {
      const options: ProductTaxesConstructorOptions = {
        ...defaultOptions,
        unitPrice,
        vat,
      };
      const productTaxes = new ProductTaxes(options);
      const result = productTaxes.getUnitVat();
      expect(result).toEqual(unitVat);
    });
  });
  describe('getUnitTaxes', () => {
    test.each([
      [4.5, 50, 6, 3],
      [8, 100, 6, 2],
      [24.5, 70, 20, 15],
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
