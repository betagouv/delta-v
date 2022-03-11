import { faker } from '@faker-js/faker';
import { getProductVat } from '../../../../src/api/simulator/services';
import { productEntityFactory } from '../../../helpers/factories/product.factory';

describe('getProductVat', () => {
  it('should return good vat', () => {
    const amount = faker.datatype.number({ min: 0, max: 10, precision: 1 });
    const price = faker.datatype.number({ min: 0, max: 5000, precision: 1 });
    const vat = faker.datatype.number({ min: 0, max: 100, precision: 1 });
    const product = productEntityFactory({ vat });
    const result = getProductVat({ id: product.id, amount, price, product });
    expect(result).toBe((amount * price * vat) / 100);
  });
});
