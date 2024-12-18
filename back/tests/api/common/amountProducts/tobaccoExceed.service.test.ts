import { Alpha2Code } from 'i18n-iso-countries';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { DetailedShoppingProduct } from '../../../../src/api/common/services/detailedShoppingProduct';
import { TobaccoExceed } from '../../../../src/api/common/services/amountProducts/tobacco/tobaccoExceed.service';
import { getDetailedShoppingProductFromData } from './helpers/getDetailedShoppingProductFromData';

describe('TobaccoExceed', () => {
  describe('getSimulationGrouped for non EU and Andorra and Border Swiss', () => {
    it.each([
      [
        'US',
        [
          { name: 'cigarette', exceedValue: 0 },
          { name: 'cigarillos', exceedValue: 0 },
          { name: 'tobacco', exceedValue: 0 },
        ],
        [
          { name: 'cigarette', value: 50 },
          { name: 'cigarillos', value: 25 },
          { name: 'tobacco', value: 62 },
        ],
      ],
      [
        'US',
        [
          { name: 'cigarette', exceedValue: 20 },
          { name: 'cigarillos', exceedValue: 9 },
          { name: 'cigar', exceedValue: 12 },
          { name: 'tobacco', exceedValue: 17 },
        ],
        [
          { name: 'cigarette', value: 60 },
          { name: 'cigarillos', value: 25 },
          { name: 'cigar', value: 35 },
          { name: 'tobacco', value: 62 },
        ],
      ],
      [
        'AD',
        [
          { name: 'cigarette', exceedValue: 21 },
          { name: 'cigarillos', exceedValue: 26 },
          { name: 'cigar', exceedValue: 5 },
          { name: 'tobacco', exceedValue: 15 },
        ],
        [
          { name: 'cigarette', value: 60 },
          { name: 'cigarillos', value: 75 },
          { name: 'cigar', value: 12 },
          { name: 'tobacco', value: 62 },
        ],
      ],
      [
        'CH',
        [
          { name: 'cigarette', exceedValue: 0 },
          { name: 'cigarillos', exceedValue: 1 },
          { name: 'cigar', exceedValue: 1 },
          { name: 'tobacco', exceedValue: 0 },
        ],
        [
          { name: 'cigarette', value: 12 },
          { name: 'cigarillos', value: 6 },
          { name: 'cigar', value: 3 },
          { name: 'tobacco', value: 13 },
        ],
        true,
      ],
    ])('should return exceed value', (country, expectedExceed, dataProducts, border = false) => {
      const detailedShoppingProducts: DetailedShoppingProduct[] = dataProducts.map(
        (dataProduct): DetailedShoppingProduct => {
          return getDetailedShoppingProductFromData(dataProduct);
        },
      );

      const tobaccoExceed = new TobaccoExceed({
        travelerData: {
          meanOfTransport: MeansOfTransport.PLANE,
          country: country as Alpha2Code,
          age: 30,
          border,
        },
        detailedShoppingProducts,
      });

      const results = tobaccoExceed.getExcessProducts();

      results.map((result) => {
        const matchingResult = expectedExceed.find(
          (expected) => expected.name === result.shoppingProduct?.customName,
        );
        expect(result.taxableValue).toEqual(matchingResult?.exceedValue);
      });
    });

    it('should return upper round tobacco', () => {
      const tobaccoExceed = new TobaccoExceed({
        travelerData: {
          meanOfTransport: MeansOfTransport.PLANE,
          country: 'US',
          age: 30,
          border: false,
        },
        detailedShoppingProducts: [
          getDetailedShoppingProductFromData({ name: 'cigar', value: 20 }),
          getDetailedShoppingProductFromData({ name: 'cigarillos', value: 40 }),
          getDetailedShoppingProductFromData({ name: 'cigarette', value: 79 }),
          getDetailedShoppingProductFromData({ name: 'tobacco', value: 100 }),
        ],
      });

      const results = tobaccoExceed.getExcessProducts();

      expect(
        results.find((result) => result.shoppingProduct?.customName === 'tobacco')?.taxableValue,
      ).toEqual(34);
    });

    it('should return exceed from EU', () => {
      const tobaccoExceed = new TobaccoExceed({
        travelerData: {
          meanOfTransport: MeansOfTransport.PLANE,
          country: 'ES',
          age: 30,
          border: false,
        },
        detailedShoppingProducts: [
          getDetailedShoppingProductFromData({ name: 'cigar', value: 250 }),
          getDetailedShoppingProductFromData({ name: 'cigarillos', value: 399 }),
          getDetailedShoppingProductFromData({ name: 'cigarette', value: 1000 }),
          getDetailedShoppingProductFromData({ name: 'tobacco', value: 999 }),
        ],
      });

      const results = tobaccoExceed.getExcessProducts();

      console.log('results', results);

      expect(
        results.find((result) => result.shoppingProduct?.customName === 'cigar')?.taxableValue,
      ).toEqual(50);
      expect(
        results.find((result) => result.shoppingProduct?.customName === 'cigarette')?.taxableValue,
      ).toEqual(200);
    });
  });
});
