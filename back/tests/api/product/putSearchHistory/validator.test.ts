import { faker } from '@faker-js/faker';
import { putSearchProductHistoryValidator } from '../../../../src/api/product/putSearchHistory/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';

describe('put one node validator', () => {
  const validator = putSearchProductHistoryValidator;
  const { isValid } = validatorHelper(validator);
  const validData = {
    body: {
      productId: faker.string.uuid(),
      searchValue: faker.commerce.product(),
    },
  };

  it('should validate proper data - searchValue provided', () => {
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

  it('should be invalid - searchValue bad format', () => {
    const data = {
      body: {
        ...validData.body,
        searchValue: 12,
      },
    };
    expect(isValid(data)).toBe(false);
  });

  it('should be invalid - searchValue not provided', () => {
    const data = {
      body: {
        ...validData.body,
        searchValue: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
});
