import { loginValidator } from '../../../../src/api/authentication/login/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';

describe('login validator', () => {
  const validator = loginValidator;
  const { isValid, getParsedData } = validatorHelper(validator);
  it('should validate proper data', () => {
    const validData = {
      body: {
        email: 'email@gmail.com',
        password: 'p',
      },
    };

    expect(isValid(validData)).toBe(true);
  });
  it('should be invalid - email bad format', () => {
    const validData = {
      body: {
        email: 'u',
        password: 'p',
      },
    };

    expect(isValid(validData)).toBe(false);
    try {
      getParsedData(validData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('should be invalid - email should be provided', () => {
    const validData = {
      body: {
        password: 'p',
      },
    };

    expect(isValid(validData)).toBe(false);
    try {
      getParsedData(validData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('should be invalid - password should be provided', () => {
    const validData = {
      body: {
        email: 'email@gmail.com',
      },
    };

    expect(isValid(validData)).toBe(false);
    try {
      getParsedData(validData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
