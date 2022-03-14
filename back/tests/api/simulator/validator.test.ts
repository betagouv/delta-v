import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../src/core/testHelpers';
import { simulateValidator } from '../../../src/api/simulator/validator';

const { isValid, getParsedData } = validatorHelper(simulateValidator);

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
  border: false,
  adult: true,
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
  it("should not validate data - shopingProducts can't be empty", () => {
    const data = {
      body: {
        ...defalutValidBody,
        shopingProducts: [],
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
  it('should not validate data - default value adult', () => {
    const data = {
      body: {
        ...defalutValidBody,
        adult: undefined,
      },
    };

    expect(isValid(data)).toBe(true);
    expect(getParsedData(data).body.adult).toBe(true);
  });
  it('should not validate data - bad format adult', () => {
    const data = {
      body: {
        ...defalutValidBody,
        adult: 'bad',
      },
    };
    expect(isValid(data)).toBe(false);
  });
});
