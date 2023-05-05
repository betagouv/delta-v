import { ValidateEmailValidator } from '../../../../src/api/authentication/validateEmail/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';

describe('validate email validator', () => {
  const validator = ValidateEmailValidator;
  const { isValid, getParsedData } = validatorHelper(validator);
  it('should validate proper data', () => {
    const validData = {
      body: {
        token: 'dbbb22c0-ed37-49e3-ac39-e61871f47027',
      },
    };

    expect(isValid(validData)).toBe(true);
  });
  it('should be invalid - missing validation token', () => {
    const validData = {
      body: {},
    };

    expect(isValid(validData)).toBe(false);
    try {
      getParsedData(validData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
