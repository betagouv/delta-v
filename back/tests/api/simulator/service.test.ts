import { service } from '../../../src/api/simulator/service';
import { HttpStatuses } from '../../../src/core/httpStatuses';
import { productEntityFactory } from '../../helpers/factories/product.factory';
import { productRepositoryMock } from '../../mocks/product.repository.mock';

describe('test simulator service', () => {
  it('should simulate declaration', async () => {
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
      totalCustomDuty: 40.6,
      totalVat: 91,
    });
  });
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
      await service({ shopingProducts: [shopingProduct], productRepository });
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
          adult: true,
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
          adult: true,
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
          adult: false,
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
          adult: false,
          productRepository,
        });

        expect(result.totalCustomDuty).not.toEqual(0);
        expect(result.totalVat).not.toEqual(0);
      });
    });
  });
  describe('not border user', () => {
    describe('adult user', () => {
      it('should return 0 taxes - user with total < 300', async () => {
        const product = productEntityFactory({ customDuty: 12, vat: 20 });
        const shopingProduct = {
          id: product.id,
          amount: 2,
          price: 145,
        };
        const productRepository = productRepositoryMock({ getManyByIds: [product] });

        const result = await service({
          shopingProducts: [shopingProduct],
          border: false,
          adult: true,
          productRepository,
        });

        expect(result.totalCustomDuty).toEqual(0);
        expect(result.totalVat).toEqual(0);
      });
      it('should return taxes - user with total > 300', async () => {
        const product = productEntityFactory({ customDuty: 12, vat: 20 });
        const shopingProduct = {
          id: product.id,
          amount: 2,
          price: 155,
        };
        const productRepository = productRepositoryMock({ getManyByIds: [product] });

        const result = await service({
          shopingProducts: [shopingProduct],
          border: false,
          adult: true,
          productRepository,
        });

        expect(result.totalCustomDuty).not.toEqual(0);
        expect(result.totalVat).not.toEqual(0);
      });
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
          adult: false,
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
          adult: false,
          productRepository,
        });

        expect(result.totalCustomDuty).not.toEqual(0);
        expect(result.totalVat).not.toEqual(0);
      });
    });
  });
});
