import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { patchStatusValidator } from '../../../../src/api/declaration/patchStatus/validator';
import { DeclarationStatus } from '../../../../src/entities/declaration.entity';

const { isValid } = validatorHelper(patchStatusValidator);

const defaultValidBody = {
  status: DeclarationStatus.DRAFT,
};

const defaultValidParams = {
  declarationId: faker.string.uuid(),
};

describe('test patch status validator', () => {
  it.each([
    [
      DeclarationStatus.DRAFT,
      DeclarationStatus.SUBMITTED,
      DeclarationStatus.VALIDATED,
      DeclarationStatus.PAID,
      DeclarationStatus.REFUSED_ERROR,
      DeclarationStatus.REFUSED_LITIGATION,
    ],
  ])('should validate data - with status value %d', (status) => {
    const data = {
      body: {
        ...defaultValidBody,
        status,
      },
      params: {
        ...defaultValidParams,
      },
    };
    expect(isValid(data)).toBe(true);
  });
  it('should not validate data - declarationId required', () => {
    const data = {
      body: {
        ...defaultValidBody,
      },
      params: {
        ...defaultValidParams,
        declarationId: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - declarationId not uuid', () => {
    const data = {
      body: {
        ...defaultValidBody,
      },
      params: {
        ...defaultValidParams,
        declarationId: `${faker.string.uuid()}ABC`,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - status required', () => {
    const data = {
      body: {
        ...defaultValidBody,
        status: undefined,
      },
      params: {
        ...defaultValidParams,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - status not valid', () => {
    const data = {
      body: {
        ...defaultValidBody,
        status: 'not valid status',
      },
      params: {
        ...defaultValidParams,
      },
    };
    expect(isValid(data)).toBe(false);
  });
});
