import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { getGetDeclarationsValidator } from '../../../../src/api/declaration/getDeclarations/validator';

const validator = getGetDeclarationsValidator;

const { isValid } = validatorHelper(validator);

const queryParams = {
  searchPublicId: faker.string.nanoid(21),
  search: faker.string.nanoid(21),
  status: ',validated,submitted',
  meanOfTransports: ',car,train',
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  limit: 10,
  offset: 0,
};

describe('getDeclarations validator', () => {
  it('should validate proper data with all data', () => {
    const validData = {
      query: queryParams,
    };
    expect(isValid(validData)).toBe(true);
  });
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
  it('should not validate data limit less than 0', () => {
    const validData = {
      query: {
        ...queryParams,
        limit: -1,
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should not validate data limit more than 100', () => {
    const validData = {
      query: {
        ...queryParams,
        limit: 101,
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should not validate data meanOfTransports not good', () => {
    const validData = {
      query: {
        ...queryParams,
        meanOfTransports: ',train,submitted',
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should validate proper data without meanOfTransports', () => {
    const validData = {
      query: {
        ...queryParams,
        meanOfTransports: undefined,
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should not validate data status not good', () => {
    const validData = {
      query: {
        ...queryParams,
        status: ',train,submitted',
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should validate proper data without status', () => {
    const validData = {
      query: {
        ...queryParams,
        status: undefined,
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should not validate data endDate should be after startDate', () => {
    const validData = {
      query: {
        ...queryParams,
        endDate: faker.date.past(),
        startDate: faker.date.future(),
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should validate proper data without startDate', () => {
    const validData = {
      query: {
        ...queryParams,
        startDate: undefined,
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should validate proper data without endDate', () => {
    const validData = {
      query: {
        ...queryParams,
        endDate: undefined,
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
  it('should not validate data offset more than 0', () => {
    const validData = {
      query: {
        ...queryParams,
        offset: -1,
      },
    };
    expect(isValid(validData)).toBe(false);
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
