import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { getAverageValidator } from '../../../../src/api/user/getAverage/validator';

const { isValid } = validatorHelper(getAverageValidator);

describe('test getAverage validator', () => {
  it('should validate data', () => {
    const validData = {
      params: {
        id: '010a8e30-1f77-4c3f-8474-9b6f14ad2a4d',
      },
    };
    const result = isValid(validData);

    expect(result).toBeTruthy();
  });
  it('should not validate data - bad format uuid', () => {
    const validData = {
      params: {
        id: faker.datatype.string(),
      },
    };
    const result = isValid(validData);

    expect(result).toBeFalsy();
  });
  it('should not validate data - missing id', () => {
    const validData = {
      params: {},
    };
    const result = isValid(validData);

    expect(result).toBeFalsy();
  });
});
