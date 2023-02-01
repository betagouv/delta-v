import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../../src/core/testHelpers';
import { simulateValidator } from '../../../../src/api/declaration/getSimulation/validator';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';

const { isValid } = validatorHelper(simulateValidator);

const defaultValidBody = {
  shoppingProducts: [
    {
      id: faker.datatype.uuid(),
      customName: faker.commerce.productName(),
      customId: faker.datatype.uuid(),
      originalValue: 85,
      currency: 'EUR',
    },
    {
      id: faker.datatype.uuid(),
      customId: faker.datatype.uuid(),
      originalValue: 40,
      currency: 'EUR',
    },
    {
      customName: faker.commerce.productName(),
      customId: faker.datatype.uuid(),
      originalValue: 85,
      currency: 'USD',
    },
  ],
  border: true,
  age: 20,
  country: faker.address.countryCode('alpha-2'),
};

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
            id: faker.datatype.string(),
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
            id: faker.datatype.uuid(),
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
});
