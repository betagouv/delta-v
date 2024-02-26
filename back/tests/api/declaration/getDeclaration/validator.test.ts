import { faker } from '@faker-js/faker';
import { getOneDeclarationValidator } from '../../../../src/api/declaration/getDeclaration/validator';
import { zodValidatorHelper } from '../../../../src/core/testHelpers/zodValidator.helper';

const validator = getOneDeclarationValidator;

const { isValid } = zodValidatorHelper(validator);

describe('getOneDeclaration validator', () => {
  it('should validate proper data', () => {
    const validData = {
      params: {
        declarationId: faker.string.uuid(),
      },
    };
    expect(isValid(validData)).toBe(true);
  });

  it('should throw error - declarationId required', () => {
    const validData = {
      params: {},
    };

    expect(isValid(validData)).toBe(false);
  });

  it('should throw error - declarationId not UUID format', () => {
    const validData = {
      declarationId: `${faker.string.uuid()}ABC`,
    };

    expect(isValid(validData)).toBe(false);
  });
});
