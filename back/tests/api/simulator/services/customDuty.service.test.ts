import { faker } from '@faker-js/faker';
import { getProductCustomDuty } from '../../../../src/api/simulator/services';
import { productEntityFactory } from '../../../helpers/factories/product.factory';

describe('getProductCustomDuty', () => {
  it('should return good custom duty', () => {
    const amount = faker.datatype.number({ min: 0, max: 10, precision: 1 });
    const price = faker.datatype.number({ min: 0, max: 5000, precision: 1 });
    const customDuty = faker.datatype.number({ min: 0, max: 100, precision: 1 });
    const product = productEntityFactory({ customDuty });
    const result = getProductCustomDuty({ id: product.id, amount, price, product });
    expect(result).toBe((amount * price * customDuty) / 100);
  });
});
