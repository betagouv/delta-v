import { faker } from '@faker-js/faker';
import type { Alpha2Code } from 'i18n-iso-countries';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { getFranchiseAmount } from '../../../../src/api/common/services/valueProducts';

const meansOfTransportCases = [
  [MeansOfTransport.PLANE, 430],
  [MeansOfTransport.BOAT, 430],
  [MeansOfTransport.CAR, 300],
  [MeansOfTransport.TRAIN, 300],
  [MeansOfTransport.OTHER, 300],
];

export const euCountries = [
  'BE',
  'BG',
  'CZ',
  'DK',
  'DE',
  'EE',
  'IE',
  'GR',
  'ES',
  'FR',
  'HR',
  'IT',
  'CY',
  'LV',
  'LT',
  'LU',
  'HU',
  'MT',
  'NL',
  'AT',
  'PL',
  'PT',
  'RO',
  'SI',
  'SK',
  'FI',
  'SE',
];

const euCountriesCase = euCountries.map((country) => [country, true]);
const countriesCase = [...euCountriesCase, ['US', false], ['UK', false], ['RU', false]];

describe('Franchise Service', () => {
  describe('test function getFranchiseAmount', () => {
    describe('Test from different countries', () => {
      test.each(countriesCase)(
        'the country %p, shoule return %ply infinity',
        (country, isEuCountry) => {
          const result = getFranchiseAmount({
            border: true,
            age: faker.number.int({ min: 15 }),
            country: country as Alpha2Code,
          });
          if (isEuCountry) {
            expect(result).toBe(Infinity);
          } else {
            expect(result).not.toBe(Infinity);
          }
        },
      );
    });
    describe('is border user', () => {
      describe('is adult > 15', () => {
        it('should return 75', () => {
          const result = getFranchiseAmount({
            border: true,
            age: faker.number.int({ min: 15 }),
            country: 'US',
          });
          expect(result).toBe(75);
        });
      });
      describe('is not adult < 15', () => {
        it('should return 40', () => {
          const result = getFranchiseAmount({
            border: true,
            age: faker.number.int({ max: 14 }),
            country: 'US',
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
              age: faker.number.int({ min: 15 }),
              meanOfTransport: meanOfTransport as MeansOfTransport,
              country: 'US',
            });
            expect(result).toBe(franchise);
          },
        );
        it('should return 900 for Andorre travelers', () => {
          const result = getFranchiseAmount({
            border: false,
            age: faker.number.int({ min: 15 }),
            meanOfTransport: MeansOfTransport.PLANE,
            country: 'AD',
          });
          expect(result).toBe(900);
        });
      });
      describe('is not adult < 15', () => {
        it('should return 150', () => {
          const result = getFranchiseAmount({
            border: false,
            age: faker.number.int({ max: 14 }),
            country: 'US',
          });
          expect(result).toBe(150);
        });
        it('should return 450 for Andorre travelers', () => {
          const result = getFranchiseAmount({
            border: false,
            age: faker.number.int({ max: 14 }),
            meanOfTransport: MeansOfTransport.PLANE,
            country: 'AD',
          });
          expect(result).toBe(450);
        });
      });
    });
  });
});
