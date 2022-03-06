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
      price: 85,
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
});
