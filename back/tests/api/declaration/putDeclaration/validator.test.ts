import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { putDeclarationValidator } from '../../../../src/api/declaration/putDeclaration/validator';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import {
  DeclarationData,
  prepareDeclarationData,
} from '../../../helpers/prepareContext/declarationData';

const { isValid } = validatorHelper(putDeclarationValidator);
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
      body: {
        ...defaultValidBody,
      },
    };
    expect(isValid(data)).toBe(true);
  });
  it('should not validate data - ID not uuid', () => {
    const data = {
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
      body: {
        ...defaultValidBody,
        border: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - bad format border', () => {
    const data = {
      body: {
        ...defaultValidBody,
        border: 'bad',
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - age undefiend', () => {
    const data = {
      body: {
        ...defaultValidBody,
        age: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - bad format age', () => {
    const data = {
      body: {
        ...defaultValidBody,
        age: 'bad',
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - country undefiend', () => {
    const data = {
      body: {
        ...defaultValidBody,
        country: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - bad country', () => {
    const data = {
      body: {
        ...defaultValidBody,
        country: 'bad',
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing mean of transport', () => {
    const data = {
      body: {
        ...defaultValidBody,
        MeansOfTransport: undefined,
        border: false,
        age: 18,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should validate data - missing mean of transport but age < 15', () => {
    const data = {
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
      body: {
        ...defaultValidBody,
        border: false,
        age: 18,
        meanOfTransport,
      },
    };
    expect(isValid(data)).toBe(result);
  });
  it('should not validate data - missing authorEmail', () => {
    const data = {
      body: {
        ...defaultValidBody,
        authorEmail: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should validate data - missing authorId', () => {
    const data = {
      body: {
        ...defaultValidBody,
        authorId: undefined,
      },
    };
    expect(isValid(data)).toBe(true);
  });
  it('should not validate data - missing authorFullName', () => {
    const data = {
      body: {
        ...defaultValidBody,
        authorFullName: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing authorType', () => {
    const data = {
      body: {
        ...defaultValidBody,
        authorType: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing declarantAddress', () => {
    const data = {
      body: {
        ...defaultValidBody,
        declarantAddress: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing declarantEmail', () => {
    const data = {
      body: {
        ...defaultValidBody,
        declarantEmail: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing declarantFirstName', () => {
    const data = {
      body: {
        ...defaultValidBody,
        declarantFirstName: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing declarantLastName', () => {
    const data = {
      body: {
        ...defaultValidBody,
        declarantLastName: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
});
