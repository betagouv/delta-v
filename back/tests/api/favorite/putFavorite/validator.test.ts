import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { putFavoriteValidator } from '../../../../src/api/favorite/putFavorite/validator';

describe('putFavorite validator', () => {
  const validator = putFavoriteValidator;
  const validData = {
    body: {
      productId: faker.string.uuid(),
    },
  };
  const { isValid } = validatorHelper(validator);
  it('should validate proper data', () => {
    expect(isValid(validData)).toBeTruthy();
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
