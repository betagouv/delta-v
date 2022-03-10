import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { searchProductsValidator } from '../../../../src/api/product/search/validator';

const { isValid } = validatorHelper(searchProductsValidator);

describe('test search product validator', () => {
  it('should validate data', () => {
    const validData = {
      query: {
        search: faker.datatype.string(),
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should not validate data - sarch empty', () => {
    const validData = {
      query: {
        search: '',
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should not validate data - search not defined', () => {
    const validData = {
      query: {},
    };
    expect(isValid(validData)).toBe(false);
  });
});
