import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { deleteFavoriteValidator } from '../../../../src/api/favorite/deleteFavorite/validator';

describe('deleteFavorite validator', () => {
  const validator = deleteFavoriteValidator;
  const validData = {
    params: {
      productId: faker.string.uuid(),
    },
  };
  const { isValid } = validatorHelper(validator);
  it('should validate proper data', () => {
    expect(isValid(validData)).toBeTruthy();
  });
  it('should be invalid - productId undefined', () => {
    const data = {
      params: {
        ...validData.params,
        productId: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - productId not uuid', () => {
    const data = {
      params: {
        ...validData.params,
        productId: 'not uuid',
      },
    };

    expect(isValid(data)).toBe(false);
  });
});
