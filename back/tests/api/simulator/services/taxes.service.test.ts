import { getTotalCustomDuty } from '../../../../src/api/simulator/services';

describe('get total custom duty', () => {
  test.each([
    [50, 750, 50],
    [16.25, 650, 50],
    [10, 650, 10],
  ])(
    'should return %p custom duty - total = %p and defaultCustomDuty = %p',
    (expectedResult, total, totalCustomDuty) => {
      const result = getTotalCustomDuty(total, totalCustomDuty);

      expect(result).toBe(expectedResult);
    },
  );
});
