import { faker } from '@faker-js/faker';
import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';
import { service } from '../../../src/api/simulator/service';
import {
  AmountTobaccoProduct,
  GroupedTobacco,
} from '../../../src/api/simulator/services/amountProducts/tobacco/tobacco.service';
import { HttpStatuses } from '../../../src/core/httpStatuses';
import { ProductType } from '../../../src/entities/product.entity';
import { productEntityFactory } from '../../helpers/factories/product.factory';
import { productRepositoryMock } from '../../mocks/product.repository.mock';

describe('test simulator service', () => {
  it('should simulate declaration', async () => {
    const product1 = productEntityFactory({ customDuty: 12, vat: 20 });
    const product2 = productEntityFactory({ customDuty: 5, vat: 20 });
    const product3 = productEntityFactory({
      customDuty: 5,
      vat: 20,
      productType: ProductType.amount,
      amountProduct: AmountTobaccoProduct.cigarette,
    });
    const shoppingProduct1 = {
      id: product1.id,
      customId: faker.datatype.uuid(),
      customName: 'product 1',
      value: 85,
    };
    const shoppingProduct2 = {
      customId: faker.datatype.uuid(),
      id: product2.id,
      value: 40,
    };
    const shoppingProduct3 = {
      customId: faker.datatype.uuid(),
      customName: 'product 3',
      id: product3.id,
      value: 300,
    };
    const productRepository = productRepositoryMock({
      getManyByIds: [product1, product2, product3],
    });
    const result = await service({
      border: false,
      age: 18,
      shoppingProducts: [shoppingProduct1, shoppingProduct2, shoppingProduct3],
      meanOfTransport: MeansOfTransport.TRAIN,
      productRepository,
      country: 'US',
    });
    expect(result).toMatchObject({
      valueProducts: [
        {
          _id: product2.id,
          _name: product2.name,
          _customName: undefined,
          _customId: shoppingProduct2.customId,
          _unitPrice: 40,
          _customDuty: 0,
          _vat: 0,
        },
        {
          _id: product1.id,
          _name: product1.name,
          _customName: 'product 1',
          _customId: shoppingProduct1.customId,
          _unitPrice: 85,
          _customDuty: 0,
          _vat: 0,
        },
      ],
      amountProducts: [
        {
          group: GroupedTobacco.allTobaccoProducts,
          isOverMaximum: true,
          completeShoppingProducts: [
            {
              id: product3.id,
              customName: 'product 3',
              customId: shoppingProduct3.customId,
              value: 300,
              product: {
                id: product3.id,
              },
            },
          ],
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
        customId: faker.datatype.uuid(),
        value: totalProducts,
      };
      const productRepository = productRepositoryMock({ getManyByIds: [product1] });
      const result = await service({
        border: false,
        age: 18,
        shoppingProducts: [shoppingProduct1],
        productRepository,
        country: 'US',
      });
      const totalCustomDuty = result.valueProducts.reduce(
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
      customId: faker.datatype.uuid(),
      value: 150,
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
  it('should return empty amount product', async () => {
    const product = productEntityFactory({ customDuty: 12, vat: 20 });
    const shoppingProduct = {
      id: product.id,
      customId: faker.datatype.uuid(),
      value: 150,
    };
    const productRepository = productRepositoryMock({ getManyByIds: [product] });

    const result = await service({
      border: false,
      age: 18,
      shoppingProducts: [shoppingProduct],
      productRepository,
      country: 'US',
    });
    expect(result.amountProducts).toEqual([]);
  });
});
