import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { getGetDeclarationsValidator } from '../../../../src/api/declaration/getDeclarations/validator';

const validator = getGetDeclarationsValidator;

const { isValid } = validatorHelper(validator);

const queryParams = {
  searchPublicId: faker.string.nanoid(21),
  search: faker.string.nanoid(21),
  limit: 10,
  offset: 0,
};

describe('getDeclarations validator', () => {
  it('should validate proper data without searchPublicId', () => {
    const validData = {
      query: {
        ...queryParams,
        searchPublicId: undefined,
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should validate proper data without limit', () => {
    const validData = {
      query: {
        ...queryParams,
        limit: undefined,
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should validate proper data without offset', () => {
    const validData = {
      query: {
        ...queryParams,
        offset: undefined,
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should validate proper data without search', () => {
    const validData = {
      query: {
        ...queryParams,
        search: undefined,
      },
    };
    expect(isValid(validData)).toBe(true);
  });
});
