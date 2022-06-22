import { getAverage } from '../../../../../src/api/user/getAverage/services/getAverage.service';

describe('test getAverage', () => {
  it('should return average from array of number', () => {
    const arrayNumber: number[] = [10, 14, 12];

    const result = getAverage(arrayNumber);

    expect(result).toEqual(12);
  });
  it('should return 0 when the array of number is empty', () => {
    const arrayNumber: number[] = [];

    const result = getAverage(arrayNumber);

    expect(result).toEqual(0);
  });
});
