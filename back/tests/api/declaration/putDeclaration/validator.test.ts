import { faker } from '@faker-js/faker';
import { putDeclarationValidator } from '../../../../src/api/declaration/putDeclaration/validator';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import {
  DeclarationData,
  prepareDeclarationData,
} from '../../../helpers/prepareContext/declarationData';
import { zodValidatorHelper } from '../../../../src/core/testHelpers/zodValidator.helper';

const { isValid } = zodValidatorHelper(putDeclarationValidator);
const declarationData = prepareDeclarationData();

interface ShoppingProduct {
  id?: string;
  customName?: string;
  customId: string;
  originalValue: number;
  currency?: string;
}

const defaultValidBody: Partial<DeclarationData> & {
  shoppingProducts: ShoppingProduct[];
} = {
  ...declarationData,
  shoppingProducts: [
    {
      id: faker.string.uuid(),
      customName: faker.commerce.productName(),
      customId: faker.string.uuid(),
      originalValue: 85,
      currency: 'EUR',
    },
    {
      id: faker.string.uuid(),
      customId: faker.string.uuid(),
      originalValue: 40,
      currency: 'EUR',
    },
    {
      customName: faker.commerce.productName(),
      customId: faker.string.uuid(),
      originalValue: 85,
      currency: 'USD',
    },
  ],
};

delete defaultValidBody.declarationId;

describe('test simulator validator', () => {
  it('should validate data', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
      },
    };
    expect(isValid(data)).toBe(true);
  });
  it('should not validate data - ID not uuid', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        shoppingProducts: [
          {
            id: faker.string.sample(),
            originalValue: 85,
            currency: 'EUR',
          },
        ],
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - ID not defined', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        shoppingProducts: [
          {
            originalValue: 85,
            currency: 'EUR',
          },
        ],
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - price should be higher than 0', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        shoppingProducts: [
          {
            id: faker.string.uuid(),
            originalValue: 0,
            currency: 'EUR',
          },
        ],
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing border', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        border: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should validate data - good format border', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        border: 'false',
      },
    };
    expect(isValid(data)).toBe(true);
  });
  it('should not validate data - bad format border', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        border: 'bad',
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - age undefiend', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        age: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - bad format age', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        age: 'bad',
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - country undefiend', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        country: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - bad country', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        country: 'bad',
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing mean of transport', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        meanOfTransport: undefined,
        border: false,
        age: 18,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should validate data - missing mean of transport but age < 15', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        border: false,
        age: 12,
      },
    };
    expect(isValid(data)).toBe(true);
  });
  test.each([
    [true, MeansOfTransport.BOAT],
    [true, MeansOfTransport.CAR],
    [true, MeansOfTransport.OTHER],
    [true, MeansOfTransport.PLANE],
    [true, MeansOfTransport.TRAIN],
    [false, 'teebdefgrg'],
  ])('validate data should be %p - with mean of transport = %p', (result, meanOfTransport) => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        border: false,
        age: 18,
        meanOfTransport,
      },
    };
    expect(isValid(data)).toBe(result);
  });
  it('should not validate data - missing authorType', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        authorType: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing declarantAddress', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        declarantAddressStreet: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing declarantEmail', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        declarantEmail: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing declarantFirstName', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        declarantFirstName: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing declarantLastName', () => {
    const data = {
      params: {
        declarationId: faker.string.uuid(),
      },
      body: {
        ...defaultValidBody,
        declarantLastName: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
});
