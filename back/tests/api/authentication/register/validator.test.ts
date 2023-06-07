import { registerValidator } from '../../../../src/api/authentication/register/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';

describe('register validator', () => {
  const validator = registerValidator;
  const validData = {
    body: {
      email: 'firstname.lastname@douane.finances.gouv.fr',
      password: 'Password95',
    },
  };
  const { isValid } = validatorHelper(validator);
  it('should validate proper data', () => {
    expect(isValid(validData)).toBeTruthy();
  });
  it('should be invalid - email bad format', () => {
    const data = {
      body: {
        ...validData.body,
        email: 'u',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - email not douane', () => {
    const data = {
      body: {
        ...validData.body,
        email: 'email@gmail.com',
      },
    };

    expect(isValid(data)).toBeFalsy();
  });
  it('should be invalid - password bad format - less than 8 char', () => {
    const data = {
      body: {
        ...validData.body,
        password: 'Passw95',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - password bad format - without number', () => {
    const data = {
      body: {
        ...validData.body,
        password: 'Passwordddd',
      },
    };

    expect(isValid(data)).toBeFalsy();
  });
  it('should be invalid - password bad format - without uppercase', () => {
    const data = {
      body: {
        ...validData.body,
        password: 'password95',
      },
    };

    expect(isValid(data)).toBeFalsy();
  });
  it('should be invalid - password bad format - without lowercase', () => {
    const data = {
      body: {
        ...validData.body,
        password: 'PASSWORD95',
      },
    };

    expect(isValid(data)).toBeFalsy();
  });
  it('should be invalid - email should be provided', () => {
    const data = {
      body: {
        ...validData.body,
        email: undefined,
      },
    };

    expect(isValid(data)).toBeFalsy();
  });
  it('should be invalid - password should be provided', () => {
    const data = {
      body: {
        ...validData.body,
        password: undefined,
      },
    };

    expect(isValid(data)).toBeFalsy();
  });
});
