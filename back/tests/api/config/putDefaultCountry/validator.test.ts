import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { putDefaultCountryValidator } from '../../../../src/api/config/putDefaultCountry/validator';
import { Alpha2CodeEnum } from '../../../../src/utils/country.util';
describe('putDefaultCountry validator', () => {
  const validator = putDefaultCountryValidator;
  const validData = {
    body: {
      country: faker.helpers.enumValue(Alpha2CodeEnum),
    },
  };
  const { isValid } = validatorHelper(validator);

  it('should validate proper data - country value provided', () => {
    expect(isValid(validData)).toBeTruthy();
  });

  it('should validate proper data - null country value provided', () => {
    const data = {
      body: {
        ...validData.body,
        country: null,
      },
    };
    expect(isValid(data)).toBeTruthy();
  });

  it('should be invalid - country undefined', () => {
    const data = {
      body: {
        ...validData.body,
        country: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });

  it('should be invalid - country bad format', () => {
    const data = {
      body: {
        ...validData.body,
        country: 12,
      },
    };

    expect(isValid(data)).toBe(false);
  });
});
