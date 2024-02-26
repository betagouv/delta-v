import { ValidateEmailValidator } from '../../../../src/api/authentication/validateEmail/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';
describe('validate email validator', () => {
  const validator = ValidateEmailValidator;
  const { isValid, getParsedData } = validatorHelper(validator);
  it('should validate proper data', () => {
    const validData = {
      body: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtaWx5LmhpbGxzQGRvdWFuZS5maW5hbmNlcy5nb3V2LmZyIiwidXNlcklkIjoiOGUzMzljOGYtMjE4Ny00NmE5LThjMzAtYWExNWQzZWJjMzMwIiwiaWF0IjoxNjgzNTQ0MjYyLCJleHAiOjE2ODM4MDM0NjJ9.REqn_FKTQxPM3Co2brsthhLo9pgqYetnw89omqtaJ4I',
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
