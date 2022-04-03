import { faker } from '@faker-js/faker';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { getFranchiseAmount } from '../../../../src/api/simulator/services/franchise.service';

const meansOfTransportCases = [
  [MeansOfTransport.PLANE, 430],
  [MeansOfTransport.BOAT, 430],
  [MeansOfTransport.CAR, 300],
  [MeansOfTransport.TRAIN, 300],
  [MeansOfTransport.OTHER, 300],
];

describe('Franchise Service', () => {
  describe('test function getFranchiseAmount', () => {
    describe('is border user', () => {
      describe('is adult > 15', () => {
        it('should return 75', () => {
          const result = getFranchiseAmount({
            border: true,
            age: faker.datatype.number({ precision: 1, min: 15 }),
          });
          expect(result).toBe(75);
        });
      });
      describe('is not adult < 15', () => {
        it('should return 40', () => {
          const result = getFranchiseAmount({
            border: true,
            age: faker.datatype.number({ precision: 1, max: 15 }),
          });
          expect(result).toBe(40);
        });
      });
    });
    describe('is not border user', () => {
      describe('is adult > 15', () => {
        test.each(meansOfTransportCases)(
          'with mean of transport %p - should return %p',
          (meanOfTransport, franchise) => {
            const result = getFranchiseAmount({
              border: false,
              age: faker.datatype.number({ precision: 1, min: 15 }),
              meanOfTransport: meanOfTransport as MeansOfTransport,
            });
            expect(result).toBe(franchise);
          },
        );
      });
      describe('is not adult < 15', () => {
        it('should return 150', () => {
          const result = getFranchiseAmount({
            border: false,
            age: faker.datatype.number({ precision: 1, max: 15 }),
          });
          expect(result).toBe(150);
        });
      });
    });
  });
});
