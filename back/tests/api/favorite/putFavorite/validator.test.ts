import { faker } from '@faker-js/faker';
import { putFavoriteValidator } from '../../../../src/api/favorite/putFavorite/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';
describe('putFavorite validator', () => {
  const validator = putFavoriteValidator;
  const validData = {
    body: {
      productId: faker.string.uuid(),
      name: faker.commerce.productName(),
    },
  };
  const { isValid } = validatorHelper(validator);
  it('should validate proper data', () => {
    expect(isValid(validData)).toBeTruthy();
  });
  it('should be invalid - name undefined', () => {
    const data = {
      body: {
        ...validData.body,
        name: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - productId undefined', () => {
    const data = {
      body: {
        ...validData.body,
        productId: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - productId not uuid', () => {
    const data = {
      body: {
        ...validData.body,
        productId: 'not uuid',
      },
    };

    expect(isValid(data)).toBe(false);
  });
});
