import { getStatus } from '../../../../../src/api/user/getAverage/services/getStatus.service';

describe('test getStatus', () => {
  test.each([[12], [10]])('should return accepted if avg is >= 10 - with value %d', (average) => {
    const status = getStatus(average);

    expect(status).toEqual('accepted');
  });
  test.each([[9], [8]])(
    'should return catch-up if avg is < 10 and >= 8 - with value %d',
    (average) => {
      const status = getStatus(average);

      expect(status).toEqual('catch-up');
    },
  );
  it('should return refused if avg is < 8 - with value 7', () => {
    const average = 7;

    const status = getStatus(average);

    expect(status).toEqual('refused');
  });
});
