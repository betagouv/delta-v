import { faker } from '@faker-js/faker';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { AmountTobaccoProduct } from '../../../../src/api/common/services/amountProducts/tobacco/tobacco.service';
import { service } from '../../../../src/api/declaration/getSimulation/service';
import { ProductType } from '../../../../src/entities/product.entity';
import { ShoppingProduct } from '../../../../src/entities/productTaxes.entity';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { currencyRepositoryMock } from '../../../mocks/currency.repository.mock';
import { productRepositoryMock } from '../../../mocks/product.repository.mock';

describe('test declaration service', () => {
  it('should save declaration', async () => {
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
  });
});
