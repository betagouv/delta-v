import { faker } from '@faker-js/faker';
import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';
import { service } from '../../../src/api/simulator/service';
import { HttpStatuses } from '../../../src/core/httpStatuses';
import { productEntityFactory } from '../../helpers/factories/product.factory';
import { productRepositoryMock } from '../../mocks/product.repository.mock';

describe('test simulator service', () => {
  it('should simulate declaration - total < 700 use 2.5% by default for custom duty', async () => {
    const product1 = productEntityFactory({ customDuty: 12, vat: 20 });
    const product2 = productEntityFactory({ customDuty: 5, vat: 20 });
    const shopingProduct1 = {
      id: product1.id,
      amount: 3,
      price: 85,
    };
    const shopingProduct2 = {
      id: product2.id,
      amount: 5,
      price: 40,
    };
    const productRepository = productRepositoryMock({ getManyByIds: [product1, product2] });
    const result = await service({
      border: false,
      age: 18,
      shopingProducts: [shopingProduct1, shopingProduct2],
      productRepository,
    });
    expect(result).toEqual({
      products: [
        {
          name: product1.name,
          amount: 3,
          unitPrice: 85,
          totalPrice: 255,
          customDuty: 12,
          vat: 20,
          totalCustomDuty: 30.6,
          totalVat: 51,
        },
        {
          name: product2.name,
          amount: 5,
          unitPrice: 40,
          totalPrice: 200,
          customDuty: 5,
          vat: 20,
          totalCustomDuty: 10,
          totalVat: 40,
        },
      ],
      total: 455,
      totalCustomDuty: 11.375,
      totalVat: 91,
    });
  });
  test.each([
    [96, 800, 12],
    [16.25, 650, 12],
    [13, 650, 2],
  ])(
    'should simulate declaration with total custom duty %p€ - totalProducts = %p and customDuty = %p',
    async (totalCustomDutyExpected, totalProducts, customDuty) => {
      const product1 = productEntityFactory({ customDuty, vat: 20 });
      const shopingProduct1 = {
        id: product1.id,
        amount: 1,
        price: totalProducts,
      };
      const productRepository = productRepositoryMock({ getManyByIds: [product1] });
      const result = await service({
        border: false,
        age: 18,
        shopingProducts: [shopingProduct1],
        productRepository,
      });
      expect(result.totalCustomDuty).toEqual(totalCustomDutyExpected);
    },
  );
  it('should throw error - product not found', async () => {
    const product = productEntityFactory({ customDuty: 12, vat: 20 });
    const shopingProduct = {
      id: product.id,
      amount: 3,
      price: 150,
    };
    const productRepository = productRepositoryMock({ getManyByIds: [] });

    expect.assertions(2);
    try {
      await service({
        border: false,
        age: 18,
        shopingProducts: [shopingProduct],
        productRepository,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.statusCode).toBe(HttpStatuses.NOT_FOUND);
      expect(error.code).toBe('PRODUCT_NOT_FOUND');
    }
  });
  describe('border user', () => {
    describe('adult user', () => {
      it('should return 0 taxes - user with total < 75', async () => {
        const product = productEntityFactory({ customDuty: 12, vat: 20 });
        const shopingProduct = {
          id: product.id,
          amount: 2,
          price: 30,
        };
        const productRepository = productRepositoryMock({ getManyByIds: [product] });

        const result = await service({
          shopingProducts: [shopingProduct],
          border: true,
          age: faker.datatype.number({ precision: 1, min: 15 }),
          productRepository,
        });

        expect(result.totalCustomDuty).toEqual(0);
        expect(result.totalVat).toEqual(0);
      });
      it('should return taxes - user with total > 75', async () => {
        const product = productEntityFactory({ customDuty: 12, vat: 20 });
        const shopingProduct = {
          id: product.id,
          amount: 2,
          price: 40,
        };
        const productRepository = productRepositoryMock({ getManyByIds: [product] });

        const result = await service({
          shopingProducts: [shopingProduct],
          border: true,
          age: faker.datatype.number({ precision: 1, min: 15 }),
          productRepository,
        });

        expect(result.totalCustomDuty).not.toEqual(0);
        expect(result.totalVat).not.toEqual(0);
      });
    });
    describe('not adult user', () => {
      it('should return 0 taxes - user with total < 40', async () => {
        const product = productEntityFactory({ customDuty: 12, vat: 20 });
        const shopingProduct = {
          id: product.id,
          amount: 2,
          price: 18,
        };
        const productRepository = productRepositoryMock({ getManyByIds: [product] });

        const result = await service({
          shopingProducts: [shopingProduct],
          border: true,
          age: faker.datatype.number({ precision: 1, max: 15 }),
          productRepository,
        });

        expect(result.totalCustomDuty).toEqual(0);
        expect(result.totalVat).toEqual(0);
      });
      it('should return taxes - user with total > 40', async () => {
        const product = productEntityFactory({ customDuty: 12, vat: 20 });
        const shopingProduct = {
          id: product.id,
          amount: 2,
          price: 22,
        };
        const productRepository = productRepositoryMock({ getManyByIds: [product] });

        const result = await service({
          shopingProducts: [shopingProduct],
          border: true,
          age: faker.datatype.number({ precision: 1, max: 15 }),
          productRepository,
        });

        expect(result.totalCustomDuty).not.toEqual(0);
        expect(result.totalVat).not.toEqual(0);
      });
    });
  });
  describe('not border user', () => {
    describe('adult user', () => {
      test.each([
        [0, 0, 425, MeansOfTransport.PLANE],
        [0, 0, 425, MeansOfTransport.BOAT],
        [0, 0, 285, MeansOfTransport.TRAIN],
        [0, 0, 285, MeansOfTransport.CAR],
        [0, 0, 285, MeansOfTransport.OTHER],
      ])(
        'should return %p for totalCustomDuty and %p for vat - user with total = %p and mean of transport = %p',
        async (totalCustomDuty, totalVat, total, meanOfTransport) => {
          const product = productEntityFactory({ customDuty: 12, vat: 20 });
          const shopingProduct = {
            id: product.id,
            amount: 1,
            price: total,
            meanOfTransport,
          };
          const productRepository = productRepositoryMock({ getManyByIds: [product] });

          const result = await service({
            shopingProducts: [shopingProduct],
            border: false,
            age: faker.datatype.number({ precision: 1, min: 15 }),
            meanOfTransport,
            productRepository,
          });

          expect(result.totalCustomDuty).toEqual(totalCustomDuty);
          expect(result.totalVat).toEqual(totalVat);
        },
      );
      test.each([
        [0, 0, 435, MeansOfTransport.PLANE],
        [0, 0, 435, MeansOfTransport.BOAT],
        [0, 0, 301, MeansOfTransport.TRAIN],
        [0, 0, 301, MeansOfTransport.CAR],
        [0, 0, 301, MeansOfTransport.OTHER],
      ])(
        'should not return %p for totalCustomDuty and %p for vat - user with total = %p and mean of transport = %p',
        async (totalCustomDuty, totalVat, total, meanOfTransport) => {
          const product = productEntityFactory({ customDuty: 12, vat: 20 });
          const shopingProduct = {
            id: product.id,
            amount: 1,
            price: total,
          };
          const productRepository = productRepositoryMock({ getManyByIds: [product] });

          const result = await service({
            shopingProducts: [shopingProduct],
            border: false,
            age: faker.datatype.number({ precision: 1, min: 15 }),
            meanOfTransport,
            productRepository,
          });

          expect(result.totalCustomDuty).not.toEqual(totalCustomDuty);
          expect(result.totalVat).not.toEqual(totalVat);
        },
      );
    });
    describe('not adult user', () => {
      it('should return 0 taxes - user with total < 150', async () => {
        const product = productEntityFactory({ customDuty: 12, vat: 20 });
        const shopingProduct = {
          id: product.id,
          amount: 2,
          price: 74,
        };
        const productRepository = productRepositoryMock({ getManyByIds: [product] });

        const result = await service({
          shopingProducts: [shopingProduct],
          border: false,
          age: faker.datatype.number({ precision: 1, max: 15 }),
          productRepository,
        });

        expect(result.totalCustomDuty).toEqual(0);
        expect(result.totalVat).toEqual(0);
      });
      it('should return taxes - user with total > 150', async () => {
        const product = productEntityFactory({ customDuty: 12, vat: 20 });
        const shopingProduct = {
          id: product.id,
          amount: 2,
          price: 76,
        };
        const productRepository = productRepositoryMock({ getManyByIds: [product] });

        const result = await service({
          shopingProducts: [shopingProduct],
          border: false,
          age: faker.datatype.number({ precision: 1, max: 15 }),
          productRepository,
        });

        expect(result.totalCustomDuty).not.toEqual(0);
        expect(result.totalVat).not.toEqual(0);
      });
    });
  });
});