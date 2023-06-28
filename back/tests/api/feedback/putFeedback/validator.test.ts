import { validatorHelper } from '../../../../src/core/testHelpers';
import { putFeedbackValidator } from '../../../../src/api/feedback/putFeedback/validator';

describe('putFeedback validator', () => {
  const validator = putFeedbackValidator;
  const validData = {
    body: {
      comment: 'test comment',
    },
  };
  const { isValid } = validatorHelper(validator);
  it('should validate proper data', () => {
    expect(isValid(validData)).toBeTruthy();
  });
  it('should be invalid - comment length < 10', () => {
    const data = {
      body: {
        ...validData.body,
        comment: 'test',
      },
    };

    expect(isValid(data)).toBe(false);
  });
});
