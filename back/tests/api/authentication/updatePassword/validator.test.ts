import { updatePasswordValidator } from '../../../../src/api/authentication/updatePassword/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';

describe('updatePassword validator', () => {
  const validator = updatePasswordValidator;
  const { isValid, getParsedData } = validatorHelper(validator);

  const bodyData = {
    currentPassword: 'Azertyuiop123&é',
    newPassword: 'Azertyuiop123&',
    newPasswordVerification: 'Azertyuiop123&',
  };
  it('should validate proper data', () => {
    const validData = {
      body: {
        ...bodyData,
      },
    };

    expect(isValid(validData)).toBe(true);
  });
  it('should be invalid - currentPassword bad format', () => {
    const validData = {
      body: {
        ...bodyData,
        currentPassword: 'password',
      },
    };

    expect(isValid(validData)).toBe(false);
    try {
      getParsedData(validData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('should be invalid - newPassword bad format', () => {
    const validData = {
      body: {
        ...bodyData,
        newPassword: 'password',
      },
    };

    expect(isValid(validData)).toBe(false);
    try {
      getParsedData(validData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('should be invalid - newPassword same than currentPassword', () => {
    const validData = {
      body: {
        ...bodyData,
        newPassword: bodyData.currentPassword,
      },
    };

    expect(isValid(validData)).toBe(false);
    try {
      getParsedData(validData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('should be invalid - newPasswordVerification not same than newPassword', () => {
    const validData = {
      body: {
        ...bodyData,
        newPasswordVerification: `${bodyData.newPassword}2`,
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
