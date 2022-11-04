import { faker } from '@faker-js/faker';
import {
  checkAmountProducts,
  AmountProduct,
} from '../../../../../src/api/simulator/services/amountProducts/globalAmount.service';
import { CompleteShoppingProduct } from '../../../../../src/entities/productTaxes.entity';
import { productEntityFactory } from '../../../../helpers/factories/product.factory';

describe('checkAmountProducts', () => {
  it('should return %p - %p is in tobacco group', () => {
    const completeProduct1: CompleteShoppingProduct = {
      product: productEntityFactory({
        amountProduct: 'cigarette' as AmountProduct,
      }),
      id: faker.datatype.uuid(),
      customId: faker.datatype.uuid(),
      originalValue: 50,
      customName: 'marlboro',
      currency: 'EUR',
      value: 50,
    };
    const completeProduct2: CompleteShoppingProduct = {
      product: productEntityFactory({
        amountProduct: 'cigar' as AmountProduct,
      }),
      id: faker.datatype.uuid(),
      customId: faker.datatype.uuid(),
      value: 10,
      customName: 'cubain',
      currency: 'EUR',
      originalValue: 10,
    };
    const completeProduct3: CompleteShoppingProduct = {
      product: productEntityFactory({
        amountProduct: 'tobacco' as AmountProduct,
      }),
      id: faker.datatype.uuid(),
      customId: faker.datatype.uuid(),
      value: 30,
      customName: 'tabac Camel',
      currency: 'EUR',
      originalValue: 30,
    };
    const completeProduct4: CompleteShoppingProduct = {
      product: productEntityFactory({
        amountProduct: 'cigarette' as AmountProduct,
      }),
      id: faker.datatype.uuid(),
      customId: faker.datatype.uuid(),
      value: 10,
      customName: 'cigarette Camel',
      currency: 'EUR',
      originalValue: 10,
    };

    const result = checkAmountProducts(
      [completeProduct1, completeProduct2, completeProduct3, completeProduct4],
      'US',
      false,
    );

    expect(result[0]).toMatchObject({
      group: 'allTobaccoProducts',
      isOverMaximum: false,
    });
  });
});
