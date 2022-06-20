import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';
import { service } from '../../../src/api/simulator/service';
import { HttpStatuses } from '../../../src/core/httpStatuses';
import { productEntityFactory } from '../../helpers/factories/product.factory';
import { productRepositoryMock } from '../../mocks/product.repository.mock';

describe('test simulator service', () => {
  it('should simulate declaration', async () => {
    const product1 = productEntityFactory({ customDuty: 12, vat: 20 });
    const product2 = productEntityFactory({ customDuty: 5, vat: 20 });
    const shoppingProduct1 = {
      id: product1.id,
      price: 85,
    };
    const shoppingProduct2 = {
      id: product2.id,
      price: 40,
    };
    const productRepository = productRepositoryMock({ getManyByIds: [product1, product2] });
    const result = await service({
      border: false,
      age: 18,
      shoppingProducts: [shoppingProduct1, shoppingProduct2],
      meanOfTransport: MeansOfTransport.TRAIN,
      productRepository,
      country: 'US',
    });
    expect(result).toMatchObject({
      products: [
        {
          _id: product1.id,
          _name: product1.name,
          _unitPrice: 85,
          _customDuty: 0,
          _vat: 0,
        },
        {
          _id: product2.id,
          _name: product2.name,
          _unitPrice: 40,
          _customDuty: 0,
          _vat: 0,
        },
      ],
      franchiseAmount: 300,
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
      const shoppingProduct1 = {
        id: product1.id,
        price: totalProducts,
      };
      const productRepository = productRepositoryMock({ getManyByIds: [product1] });
      const result = await service({
        border: false,
        age: 18,
        shoppingProducts: [shoppingProduct1],
        productRepository,
        country: 'US',
      });
      const totalCustomDuty = result.products.reduce(
        (acc, product) => acc + product.getUnitCustomDuty(),
        0,
      );
      expect(totalCustomDuty).toEqual(totalCustomDutyExpected);
    },
  );
  it('should throw error - product not found', async () => {
    const product = productEntityFactory({ customDuty: 12, vat: 20 });
    const shoppingProduct = {
      id: product.id,
      price: 150,
    };
    const productRepository = productRepositoryMock({ getManyByIds: [] });

    expect.assertions(2);
    try {
      await service({
        border: false,
        age: 18,
        shoppingProducts: [shoppingProduct],
        productRepository,
        country: 'US',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.statusCode).toBe(HttpStatuses.NOT_FOUND);
      expect(error.code).toBe('PRODUCT_NOT_FOUND');
    }
  });
});
