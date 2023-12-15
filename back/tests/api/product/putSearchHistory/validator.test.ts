import { faker } from '@faker-js/faker';
import { putSearchProductHistoryValidator } from '../../../../src/api/product/putSearchHistory/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';

describe('put one node validator', () => {
  const validator = putSearchProductHistoryValidator;
  const { isValid } = validatorHelper(validator);
  const validData = {
    body: {
      productId: faker.string.uuid(),
    },
  };
  it('should validate proper data', () => {
    expect(isValid(validData)).toBe(true);
  });

  it('should be invalid - productId bad format', () => {
    const data = {
      body: {
        ...validData.body,
        productId: 12,
      },
    };
    expect(isValid(data)).toBe(false);
  });

  it('should be invalid - productId not provided', () => {
    const data = {
      body: {
        ...validData.body,
        productId: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
});
