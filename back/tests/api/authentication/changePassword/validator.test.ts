import { faker } from '@faker-js/faker';
import { passwordRegex } from '../../../../src/api/authentication/common/const/regex';
import { changePasswordValidator } from '../../../../src/api/authentication/changePassword/validator';
import { zodValidatorHelper } from '../../../../src/core/testHelpers/zodValidator.helper';

describe('change password validator', () => {
  const validator = changePasswordValidator;
  const { isValid } = zodValidatorHelper(validator);
  const validData = {
    body: {
      oldPassword: faker.string.alphanumeric(),
      newPassword: faker.helpers.fromRegExp(passwordRegex),
    },
  };

  it('should validate proper data', () => {
    expect(isValid(validData)).toBe(true);
  });

  it('should be invalid - old password bad format', () => {
    const data = {
      body: {
        ...validData.body,
        oldPassword: 12,
      },
    };
    expect(isValid(data)).toBe(false);
  });

  it('should be invalid - old password not provided', () => {
    const data = {
      body: {
        ...validData.body,
        oldPassword: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });

  it('should be invalid - new password bad format', () => {
    const data = {
      body: {
        ...validData.body,
        newPassword: 12,
      },
    };
    expect(isValid(data)).toBe(false);
  });

  it('should be invalid - new password not provided', () => {
    const data = {
      body: {
        ...validData.body,
        newPassword: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });

  it.each([
    ['Pass95*', 'More than 8 characters'],
    ['Passwordddd*', 'Must contain at least one number'],
    ['password95*', 'Must contain at least one uppercase character'],
    ['PASSWORD95*', 'Must contain at least one lowercase character'],
    ['Password95', 'Must contain at least one special character'],
  ])(
    "should be invalid - new password (%s) doesn't match the regex rule : %s",
    (password, rule) => {
      const data = {
        body: {
          ...validData.body,
          newPassword: password,
        },
      };

      expect(isValid(data)).toBe(false);
    },
  );
});
