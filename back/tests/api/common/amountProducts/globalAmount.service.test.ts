import { faker } from '@faker-js/faker';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import {
  AmountProduct,
  checkAmountProducts,
} from '../../../../src/api/common/services/amountProducts/globalAmount.service';
import { DetailedShoppingProduct } from '../../../../src/api/common/services/detailedShoppingProduct';
import { productEntityFactory } from '../../../helpers/factories/product.factory';

describe('checkAmountProducts', () => {
  it('should return %p - %p is in tobacco group', () => {
    const detailedShoppingProduct1 = new DetailedShoppingProduct();
    detailedShoppingProduct1.product = productEntityFactory({
      amountProduct: 'cigarette' as AmountProduct,
    });
    detailedShoppingProduct1.currency = undefined;
    detailedShoppingProduct1.shoppingProduct = {
      id: faker.datatype.uuid(),
      customId: faker.datatype.uuid(),
      originalValue: 50,
      customName: 'marlboro',
      currency: 'EUR',
    };

    const detailedShoppingProduct2 = new DetailedShoppingProduct();
    detailedShoppingProduct2.product = productEntityFactory({
      amountProduct: 'cigar' as AmountProduct,
    });
    detailedShoppingProduct2.currency = undefined;
    detailedShoppingProduct2.shoppingProduct = {
      id: faker.datatype.uuid(),
      customId: faker.datatype.uuid(),
      customName: 'cubain',
      currency: 'EUR',
      originalValue: 10,
    };

    const detailedShoppingProduct3 = new DetailedShoppingProduct();
    detailedShoppingProduct3.product = productEntityFactory({
      amountProduct: 'tobacco' as AmountProduct,
    });
    detailedShoppingProduct3.currency = undefined;
    detailedShoppingProduct3.shoppingProduct = {
      id: faker.datatype.uuid(),
      customId: faker.datatype.uuid(),
      customName: 'tabac Camel',
      currency: 'EUR',
      originalValue: 30,
    };

    const detailedShoppingProduct4 = new DetailedShoppingProduct();
    detailedShoppingProduct4.product = productEntityFactory({
      amountProduct: 'cigarette' as AmountProduct,
    });
    detailedShoppingProduct4.currency = undefined;
    detailedShoppingProduct4.shoppingProduct = {
      id: faker.datatype.uuid(),
      customId: faker.datatype.uuid(),
      customName: 'cigarette Camel',
      currency: 'EUR',
      originalValue: 10,
    };

    const result = checkAmountProducts(
      [
        detailedShoppingProduct1,
        detailedShoppingProduct2,
        detailedShoppingProduct3,
        detailedShoppingProduct4,
      ],
      {
        age: 30,
        border: false,
        country: 'US',
        meanOfTransport: MeansOfTransport.TRAIN,
      },
    );

    expect(result[0]).toMatchObject({
      group: 'allTobaccoProducts',
      isOverMaximum: false,
    });
  });
});
