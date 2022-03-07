import { faker } from '@faker-js/faker';
import { validatorHelper } from '../../../src/core/testHelpers';
import { simulateValidator } from '../../../src/api/simulator/validator';

const { isValid } = validatorHelper(simulateValidator);

describe('test simulator validator', () => {
  it('should validate data', () => {
    const validData = {
      body: {
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
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should not validate data - ID not uuid', () => {
    const validData = {
      body: {
        shopingProducts: [
          {
            id: faker.datatype.string(),
            amount: 0,
            price: 85,
          },
        ],
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should not validate data - ID not defined', () => {
    const validData = {
      body: {
        shopingProducts: [
          {
            amount: 0,
            price: 85,
          },
        ],
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should not validate data - amount should be higher than 0', () => {
    const validData = {
      body: {
        shopingProducts: [
          {
            id: faker.datatype.uuid(),
            amount: 0,
            price: 85,
          },
        ],
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should not validate data - price should be higher than 0', () => {
    const validData = {
      body: {
        shopingProducts: [
          {
            id: faker.datatype.uuid(),
            amount: 1,
            price: 0,
          },
        ],
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it("should not validate data - shopingProducts can't be empty", () => {
    const validData = {
      body: {
        shopingProducts: [],
      },
    };
    expect(isValid(validData)).toBe(false);
  });
});
