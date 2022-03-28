import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../src/core/testHelpers';
import { simulateValidator } from '../../../src/api/simulator/validator';
import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';

const { isValid } = validatorHelper(simulateValidator);

const defalutValidBody = {
  shopingProducts: [
    {
      id: faker.datatype.uuid(),
      amount: 3,
      price: 85,
    },
    {
      id: faker.datatype.uuid(),
      amount: 5,
      price: 40,
    },
  ],
  border: true,
  age: 20,
};

describe('test simulator validator', () => {
  it('should validate data', () => {
    const data = {
      body: {
        ...defalutValidBody,
      },
    };
    expect(isValid(data)).toBe(true);
  });
  it('should not validate data - ID not uuid', () => {
    const data = {
      body: {
        ...defalutValidBody,
        shopingProducts: [
          {
            id: faker.datatype.string(),
            amount: 0,
            price: 85,
          },
        ],
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - ID not defined', () => {
    const data = {
      body: {
        ...defalutValidBody,
        shopingProducts: [
          {
            amount: 0,
            price: 85,
          },
        ],
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - amount should be higher than 0', () => {
    const data = {
      body: {
        ...defalutValidBody,
        shopingProducts: [
          {
            id: faker.datatype.uuid(),
            amount: 0,
            price: 85,
          },
        ],
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - price should be higher than 0', () => {
    const data = {
      body: {
        ...defalutValidBody,
        shopingProducts: [
          {
            id: faker.datatype.uuid(),
            amount: 1,
            price: 0,
          },
        ],
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing border', () => {
    const data = {
      body: {
        ...defalutValidBody,
        border: undefined,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - bad format border', () => {
    const data = {
      body: {
        ...defalutValidBody,
        border: 'bad',
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - age undefiend', () => {
    const data = {
      body: {
        ...defalutValidBody,
        age: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - bad format age', () => {
    const data = {
      body: {
        ...defalutValidBody,
        age: 'bad',
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should not validate data - missing mean of transport', () => {
    const data = {
      body: {
        ...defalutValidBody,
        border: false,
        age: 18,
      },
    };
    expect(isValid(data)).toBe(false);
  });
  it('should validate data - missing mean of transport but age < 15', () => {
    const data = {
      body: {
        ...defalutValidBody,
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
        ...defalutValidBody,
        border: false,
        age: 18,
        meanOfTransport,
      },
    };
    expect(isValid(data)).toBe(result);
  });
});
