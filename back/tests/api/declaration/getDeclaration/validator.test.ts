import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { getOneDeclarationValidator } from '../../../../src/api/declaration/getDeclaration/validator';

const validator = getOneDeclarationValidator;

const { isValid } = validatorHelper(validator);

describe('getOneDeclaration validator', () => {
  it('should validate proper data', () => {
    const validData = {
      params: {
        declarationId: faker.datatype.uuid(),
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
});
