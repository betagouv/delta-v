import { authenticateValidator } from '../../../../../src/api/authentication/agentConnect/authenticate/validator';
import { validatorHelper } from '../../../../../src/core/testHelpers';

describe('AgentConnect authenticate validator', () => {
  const validator = authenticateValidator;
  const { isValid, getParsedData } = validatorHelper(validator);

  it('should validate proper data', () => {
    const validData = {
      body: {
        code: 'mockCode',
        state: 'mockState',
        nonce: 'mockNonce',
      },
    };
    expect(isValid(validData)).toBe(true);
    expect(getParsedData(validData)).toEqual(validData);
  });

  it('should invalidate data with missing properties', () => {
    const invalidData = {
      body: {
        code: 'mockCode',
        state: 'mockState',
      },
    };
    expect(isValid(invalidData)).toBe(false);
  });

  it('should invalidate data with extra properties', () => {
    const invalidData = {
      body: {
        code: 'mockCode',
        state: 'mockState',
        nonce: 'mockNonce',
        extraProp: 'value',
      },
    };
    expect(isValid(invalidData)).toBe(false);
  });
});
