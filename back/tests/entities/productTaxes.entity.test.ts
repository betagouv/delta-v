import { faker } from '@faker-js/faker';
import { CompleteShopingProduct } from '../../src/api/simulator/services';
import {
  ProductTaxes,
  ProductTaxesConstructorOptions,
} from '../../src/entities/productTaxes.entity';
import { productEntityFactory } from '../helpers/factories/product.factory';

describe('ProductTaxes entity', () => {
  const defaultOptions: ProductTaxesConstructorOptions = {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(),
    amount: faker.datatype.number({ max: 100, min: 1, precision: 1 }),
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
      expect(productTaxes.amount).toEqual(0);
      expect(productTaxes.customDuty).toEqual(0);
      expect(productTaxes.vat).toEqual(0);
      expect(productTaxes.unitPrice).toEqual(0);
    });
    it('should creat an object with gave values', () => {
      const options: ProductTaxesConstructorOptions = { ...defaultOptions };
      const productTaxes = new ProductTaxes(options);
      expect(productTaxes.id).toEqual(options.id);
      expect(productTaxes.name).toEqual(options.name);
      expect(productTaxes.amount).toEqual(options.amount);
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
      expect(productTaxes2.amount).toEqual(options.amount);
      expect(productTaxes2.customDuty).toEqual(options.customDuty);
      expect(productTaxes2.vat).toEqual(options.vat);
      expect(productTaxes2.unitPrice).toEqual(options.unitPrice);
    });
  });
  describe('setFromCompleteShopingProduct', () => {
    it('should update an object with setFromCompleteShopingProduct', () => {
      const completeShopingProduct: CompleteShopingProduct = {
        id: faker.datatype.uuid(),
        price: faker.datatype.number({ max: 1000, min: 0, precision: 0.01 }),
        amount: faker.datatype.number({ max: 100, min: 1, precision: 1 }),
        product: productEntityFactory({
          customDuty: faker.datatype.number({ max: 100, min: 0, precision: 0.01 }),
          vat: faker.datatype.number({ max: 100, min: 0, precision: 0.01 }),
        }),
      };
      const productTaxes = new ProductTaxes({});
      productTaxes.setFromCompleteShopingProduct(completeShopingProduct);
      expect(productTaxes.id).toEqual(completeShopingProduct.product.id);
      expect(productTaxes.amount).toEqual(completeShopingProduct.amount);
      expect(productTaxes.unitPrice).toEqual(completeShopingProduct.price);
      expect(productTaxes.name).toEqual(completeShopingProduct.product.name);
      expect(productTaxes.customDuty).toEqual(completeShopingProduct.product.customDuty);
      expect(productTaxes.vat).toEqual(completeShopingProduct.product.vat);
    });
  });
  describe('getUnitCustomDuty', () => {
    test.each([
      [3, 50, 2, 6],
      [6, 100, 5, 6],
      [14, 70, 5, 20],
      [0, 200, 5, 0],
    ])(
      'should return %i, with unit price %i and amount %i and customDuty %i',
      (unitCustomDuty, unitPrice, amount, customDuty) => {
        const options: ProductTaxesConstructorOptions = {
          ...defaultOptions,
          amount,
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
      [3, 50, 2, 6],
      [6, 100, 5, 6],
      [14, 70, 5, 20],
      [0, 200, 5, 0],
    ])(
      'should return %i, with unit price %i and amount %i and vat %i',
      (unitVat, unitPrice, amount, vat) => {
        const options: ProductTaxesConstructorOptions = {
          ...defaultOptions,
          amount,
          unitPrice,
          vat,
        };
        const productTaxes = new ProductTaxes(options);
        const result = productTaxes.getUnitVat();
        expect(result).toEqual(unitVat);
      },
    );
  });
  describe('getUnitTaxes', () => {
    test.each([
      [4.5, 50, 2, 6, 3],
      [8, 100, 5, 6, 2],
      [24.5, 70, 5, 20, 15],
      [4, 200, 5, 0, 2],
    ])(
      'should return %i, with unit price %i and amount %i and vat %i and customDuty %i',
      (unitTaxes, unitPrice, amount, vat, customDuty) => {
        const options: ProductTaxesConstructorOptions = {
          ...defaultOptions,
          amount,
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
  describe('getTotalPrice', () => {
    test.each([
      [100, 50, 2],
      [500, 100, 5],
      [350, 70, 5],
      [1000, 200, 5],
    ])('should return %i, with unit price %i and amount %i', (totalPrice, unitPrice, amount) => {
      const options: ProductTaxesConstructorOptions = {
        ...defaultOptions,
        amount,
        unitPrice,
      };
      const productTaxes = new ProductTaxes(options);
      const result = productTaxes.getTotalPrice();
      expect(result).toEqual(totalPrice);
    });
  });
  describe('getTotalCustomDuty', () => {
    test.each([
      [6, 50, 2, 6],
      [30, 100, 5, 6],
      [70, 70, 5, 20],
      [0, 200, 5, 0],
    ])(
      'should return %i, with unit price %i, amount %i and customDuty %i ',
      (totalCustomDuty, unitPrice, amount, customDuty) => {
        const options: ProductTaxesConstructorOptions = {
          ...defaultOptions,
          amount,
          unitPrice,
          customDuty,
        };
        const productTaxes = new ProductTaxes(options);
        const result = productTaxes.getTotalCustomDuty();
        expect(result).toEqual(totalCustomDuty);
      },
    );
  });
  describe('getTotalCustomDuty', () => {
    test.each([
      [6, 50, 2, 6],
      [30, 100, 5, 6],
      [70, 70, 5, 20],
      [0, 200, 5, 0],
    ])(
      'should return %i, with unit price %i, amount %i and vat %i ',
      (totalVat, unitPrice, amount, vat) => {
        const options: ProductTaxesConstructorOptions = {
          ...defaultOptions,
          amount,
          unitPrice,
          vat,
        };
        const productTaxes = new ProductTaxes(options);
        const result = productTaxes.getTotalVat();
        expect(result).toEqual(totalVat);
      },
    );
  });
  describe('getTotalTaxes', () => {
    test.each([
      [9, 50, 2, 6, 3],
      [40, 100, 5, 6, 2],
      [122.5, 70, 5, 20, 15],
      [20, 200, 5, 0, 2],
    ])(
      'should return %i, with unit price %i, amount %i, vat %i and customDuty %i',
      (totalVat, unitPrice, amount, vat, customDuty) => {
        const options: ProductTaxesConstructorOptions = {
          ...defaultOptions,
          amount,
          unitPrice,
          customDuty,
          vat,
        };
        const productTaxes = new ProductTaxes(options);
        const result = productTaxes.getTotalTaxes();
        expect(result).toEqual(totalVat);
      },
    );
  });
  describe('resetAmount', () => {
    it('should reset the amount', () => {
      const options: ProductTaxesConstructorOptions = {
        ...defaultOptions,
        amount: 5,
      };
      const productTaxes = new ProductTaxes(options);
      productTaxes.resetAmount();
      expect(productTaxes.amount).toEqual(1);
    });
  });
  describe('resetAmount', () => {
    it('should add amount', () => {
      const options: ProductTaxesConstructorOptions = {
        ...defaultOptions,
        amount: 5,
      };
      const productTaxes = new ProductTaxes(options);
      productTaxes.addProduct(10);
      expect(productTaxes.amount).toEqual(15);
    });
    it('should add amount - default value 1', () => {
      const options: ProductTaxesConstructorOptions = {
        ...defaultOptions,
        amount: 5,
      };
      const productTaxes = new ProductTaxes(options);
      productTaxes.addProduct();
      expect(productTaxes.amount).toEqual(6);
    });
  });
  describe('resetFreeTaxeDetails', () => {
    it('should reset the taxes to free', () => {
      const options: ProductTaxesConstructorOptions = {
        ...defaultOptions,
        vat: 15,
        customDuty: 12,
      };
      const productTaxes = new ProductTaxes(options);
      productTaxes.resetFreeTaxeDetails();
      expect(productTaxes.vat).toEqual(0);
      expect(productTaxes.customDuty).toEqual(0);
    });
  });
});
