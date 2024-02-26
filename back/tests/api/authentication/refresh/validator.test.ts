import { refreshValidator } from '../../../../src/api/authentication/refresh/validator';
import { zodValidatorHelper } from '../../../../src/core/testHelpers/zodValidator.helper';

describe('refresh validator', () => {
  const validator = refreshValidator;
  const { isValid } = zodValidatorHelper(validator);
  const validData = {
    body: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  };

  it('should validate proper data', () => {
    expect(isValid(validData)).toBe(true);
  });
  it('should be invalid - accessToken bad format', () => {
    const data = {
      body: {
        ...validData.body,
        accessToken: '710032dc',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - refreshToken bad format', () => {
    const data = {
      body: {
        ...validData.body,
        refreshToken: '710032dc',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - accessToken should be provided', () => {
    const data = {
      body: {
        ...validData.body,
        accessToken: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - refreshToken should be provided', () => {
    const data = {
      body: {
        ...validData.body,
        refreshToken: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
});
