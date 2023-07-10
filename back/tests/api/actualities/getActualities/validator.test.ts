import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { getActualitiesValidator } from '../../../../src/api/actuality/getActualities/validator';

const validator = getActualitiesValidator;

const { isValid } = validatorHelper(validator);

const queryParams = {
  search: faker.string.nanoid(21),
  tags: ',nomenclature,taxes',
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  limit: 10,
  offset: 0,
};

describe('getActualities validator', () => {
  it('should validate proper data with all data', () => {
    const validData = {
      query: queryParams,
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
  it('should not validate data tags not good', () => {
    const validData = {
      query: {
        ...queryParams,
        tags: ',nomenclature,submitted',
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should validate proper data without tags', () => {
    const validData = {
      query: {
        ...queryParams,
        tags: undefined,
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
  it('should not validate data offset less than 0', () => {
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
