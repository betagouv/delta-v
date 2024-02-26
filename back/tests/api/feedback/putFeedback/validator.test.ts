import { faker } from '@faker-js/faker';
import { putFeedbackValidator } from '../../../../src/api/feedback/putFeedback/validator';
import { validatorHelper } from '../../../../src/core/testHelpers';

describe('putFeedback validator', () => {
  const validator = putFeedbackValidator;
  const validData = {
    body: {
      comment: 'test comment',
    },
    params: {
      feedbackId: faker.string.uuid(),
    },
  };
  const { isValid, getParsedData } = validatorHelper(validator);
  it('should validate proper data', () => {
    console.log(getParsedData(validData));

    expect(isValid(validData)).toBeTruthy();
  });
  it('should be invalid - comment length < 10', () => {
    const data = {
      body: {
        ...validData.body,
        comment: 'test',
      },
      params: {
        ...validData.params,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - feedbackId undefined', () => {
    const data = {
      body: {
        ...validData.body,
      },
      params: {
        ...validData.params,
        feedbackId: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - comment undefined', () => {
    const data = {
      body: {
        ...validData.body,
        comment: undefined,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - params undefined', () => {
    const data = {
      body: {
        ...validData.body,
      },
    };

    expect(isValid(data)).toBe(false);
  });
  it('should be invalid - body undefined', () => {
    const data = {
      params: {
        ...validData.params,
      },
    };

    expect(isValid(data)).toBe(false);
  });
});
