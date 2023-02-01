import { faker } from '@faker-js/faker';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import {
  AmountTobaccoProduct,
  GroupedTobacco,
} from '../../../../src/api/common/services/amountProducts/tobacco/tobacco.service';
import { service } from '../../../../src/api/declaration/getSimulation/service';
import { ProductType } from '../../../../src/entities/product.entity';
import { ShoppingProduct } from '../../../../src/entities/productTaxes.entity';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { currencyRepositoryMock } from '../../../mocks/currency.repository.mock';
import { productRepositoryMock } from '../../../mocks/product.repository.mock';

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
    const shoppingProduct1: ShoppingProduct = {
      id: product1.id,
      customId: faker.datatype.uuid(),
      customName: 'product 1',
      originalValue: 85,
      currency: 'EUR',
    };
    const shoppingProduct2: ShoppingProduct = {
      customId: faker.datatype.uuid(),
      id: product2.id,
      originalValue: 40,
      currency: 'USD',
    };
    const shoppingProduct3: ShoppingProduct = {
      customId: faker.datatype.uuid(),
      customName: 'product 3',
      id: product3.id,
      originalValue: 300,
      currency: 'EUR',
    };

    const productRepository = productRepositoryMock({
      getManyByIds: [product1, product2, product3],
    });

    const currencyRepository = currencyRepositoryMock({
      getManyByIds: [
        currencyEntityFactory({ id: 'EUR', value: 1 }),
        currencyEntityFactory({ id: 'USD', value: 1.2 }),
      ],
    });

    const result = await service({
      border: false,
      age: 18,
      shoppingProducts: [shoppingProduct1, shoppingProduct2, shoppingProduct3],
      meanOfTransport: MeansOfTransport.TRAIN,
      productRepository,
      currencyRepository,
      country: 'US',
    });
    expect(result).toMatchObject({
      valueProducts: [
        {
          _id: product2.id,
          _name: product2.name,
          _customName: undefined,
          _customId: shoppingProduct2.customId,
          _unitPrice: 33.33,
          _customDuty: 0,
          _originalPrice: 40,
          _originalCurrency: 'USD',
          _rateCurrency: 1.2,
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
          detailedShoppingProducts: [
            {
              shoppingProduct: {
                id: product3.id,
                customName: 'product 3',
                customId: shoppingProduct3.customId,
                originalValue: 300,
              },
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
      const shoppingProduct1: ShoppingProduct = {
        id: product1.id,
        customId: faker.datatype.uuid(),
        originalValue: totalProducts,
        currency: 'EUR',
      };
      const productRepository = productRepositoryMock({ getManyByIds: [product1] });

      const currencyRepository = currencyRepositoryMock({
        getManyByIds: [currencyEntityFactory({ id: 'EUR', value: 1 })],
      });

      const result = await service({
        border: false,
        age: 18,
        shoppingProducts: [shoppingProduct1],
        productRepository,
        currencyRepository,
        country: 'US',
      });
      const totalCustomDuty = result.valueProducts.reduce(
        (acc, product) => acc + product.getUnitCustomDuty(),
        0,
      );
      expect(totalCustomDuty).toEqual(totalCustomDutyExpected);
    },
  );
  it('should not throw error - product not found', async () => {
    const product = productEntityFactory({ customDuty: 12, vat: 20 });
    const shoppingProduct: ShoppingProduct = {
      id: product.id,
      customId: faker.datatype.uuid(),
      originalValue: 150,
      currency: 'EUR',
    };
    const productRepository = productRepositoryMock({ getManyByIds: [] });

    const currencyRepository = currencyRepositoryMock({
      getManyByIds: [currencyEntityFactory({ id: 'EUR', value: 1 })],
    });

    const result = await service({
      border: false,
      age: 18,
      shoppingProducts: [shoppingProduct],
      productRepository,
      currencyRepository,
      country: 'US',
    });

    expect(result.customProducts[0].getUnitTaxes()).toEqual(0);
  });
  it('should return empty amount product', async () => {
    const product = productEntityFactory({ customDuty: 12, vat: 20 });
    const shoppingProduct: ShoppingProduct = {
      id: product.id,
      customId: faker.datatype.uuid(),
      originalValue: 150,
      currency: 'EUR',
    };
    const productRepository = productRepositoryMock({ getManyByIds: [product] });
    const currencyRepository = currencyRepositoryMock({
      getManyByIds: [currencyEntityFactory({ id: 'EUR', value: 1 })],
    });

    const result = await service({
      border: false,
      age: 18,
      shoppingProducts: [shoppingProduct],
      productRepository,
      currencyRepository,
      country: 'US',
    });
    expect(result.amountProducts).toEqual([]);
  });
});
