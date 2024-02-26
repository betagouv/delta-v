import { faker } from '@faker-js/faker';
import { getOneDeclarationWithPublicIdValidator } from '../../../../src/api/declaration/getDeclarationWithPublicId/validator';
import { zodValidatorHelper } from '../../../../src/core/testHelpers/zodValidator.helper';

const validator = getOneDeclarationWithPublicIdValidator;

const { isValid } = zodValidatorHelper(validator);

describe('getOneDeclarationWithPublicId validator', () => {
  it('should validate proper data', () => {
    const validData = {
      params: {
        publicDeclarationId: faker.string.nanoid(10),
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

  it('should throw error - declarationId not nanoId format', () => {
    const validData = {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      publicDeclarationId: `${faker.string.nanoid()}ABC`,
    };

    expect(isValid(validData)).toBe(false);
  });
});
