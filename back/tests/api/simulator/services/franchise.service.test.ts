import { faker } from '@faker-js/faker';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import {
  getFranchiseAmount,
  isFreeFranchise,
} from '../../../../src/api/simulator/services/franchise.service';

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
  describe('test function isFreeFranchise', () => {
    describe('is border user', () => {
      describe('is adult > 15', () => {
        test.each([
          [true, 50],
          [false, 500],
        ])('should return %p - with total = %p', (expectedResult, total) => {
          const result = isFreeFranchise({
            total,
            border: true,
            age: faker.datatype.number({ precision: 1, min: 15 }),
          });
          expect(result).toBe(expectedResult);
        });
      });
      describe('is not adult < 15', () => {
        test.each([
          [true, 35],
          [false, 45],
        ])('should return %p - with total = %p', (expectedResult, total) => {
          const result = isFreeFranchise({
            total,
            border: true,
            age: faker.datatype.number({ precision: 1, max: 15 }),
          });
          expect(result).toBe(expectedResult);
        });
      });
    });
    describe('is not border user', () => {
      describe('is adult > 15', () => {
        test.each([
          [true, 425, MeansOfTransport.PLANE],
          [false, 435, MeansOfTransport.PLANE],
          [true, 425, MeansOfTransport.BOAT],
          [false, 435, MeansOfTransport.BOAT],
          [true, 299, MeansOfTransport.TRAIN],
          [false, 301, MeansOfTransport.TRAIN],
          [true, 299, MeansOfTransport.CAR],
          [false, 301, MeansOfTransport.CAR],
          [true, 299, MeansOfTransport.OTHER],
          [false, 301, MeansOfTransport.OTHER],
        ])(
          'should return %p - with total = %p and meanOfTransport = %p ',
          (expectedResult, total, meanOfTransport) => {
            const result = isFreeFranchise({
              total,
              border: false,
              age: faker.datatype.number({ precision: 1, min: 15 }),
              meanOfTransport: meanOfTransport,
            });
            expect(result).toBe(expectedResult);
          },
        );
      });
      describe('is not adult < 15', () => {
        test.each([
          [true, 145],
          [false, 155],
        ])('should return %p - with total = %p', (expectedResult, total) => {
          const result = isFreeFranchise({
            total,
            border: false,
            age: faker.datatype.number({ precision: 1, max: 15 }),
          });
          expect(result).toBe(expectedResult);
        });
      });
    });
  });
});
