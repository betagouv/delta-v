import { resetPasswordValidator } from '../../../../src/api/authentication/resetPassword/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';
describe('reset password validator', () => {
  const validator = resetPasswordValidator;
  const { isValid } = validatorHelper(validator);
  const validData = {
    body: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      password: 'Password95*',
    },
  };

  it('should validate proper data', () => {
    expect(isValid(validData)).toBe(true);
  });
  it('should be invalid - token bad format', () => {
    const data = {
      body: {
        ...validData.body,
        token: '710032dc',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - token should be provided', () => {
    const data = {
      body: {
        ...validData.body,
        token: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - password should be provided', () => {
    const data = {
      body: {
        ...validData.body,
        password: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - password bad format - less than 8 char', () => {
    const data = {
      body: {
        ...validData.body,
        password: 'Pass95*',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - password bad format - without number', () => {
    const data = {
      body: {
        ...validData.body,
        password: 'Passwordddd*',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - password bad format - without uppercase', () => {
    const data = {
      body: {
        ...validData.body,
        password: 'password95*',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - password bad format - without lowercase', () => {
    const data = {
      body: {
        ...validData.body,
        password: 'PASSWORD95*',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - password bad format - without special char', () => {
    const data = {
      body: {
        ...validData.body,
        password: 'Password95',
      },
    };

    expect(isValid(data)).toBe(false);
  });
});
