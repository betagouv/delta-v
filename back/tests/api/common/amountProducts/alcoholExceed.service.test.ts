import { Alpha2Code } from 'i18n-iso-countries';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { DetailedShoppingProduct } from '../../../../src/api/common/services/detailedShoppingProduct';
import { AlcoholExceed } from '../../../../src/api/common/services/amountProducts/alcohol/alcoholExceed.service';
import { getDetailedShoppingProductFromData } from './helpers/getDetailedShoppingProductFromData';

describe('AlcoholExceed', () => {
  describe('getExcessProducts for non EU, Andorra and Border Swiss', () => {
    it.each([
      [
        'US',
        [
          { name: 'wine', exceedValue: 0 },
          { name: 'softAlcohol', exceedValue: 0 },
          { name: 'beer', exceedValue: 0 },
        ],
        [
          { name: 'wine', value: 1 },
          { name: 'softAlcohol', value: 1 },
          { name: 'beer', value: 8 },
        ],
      ],
      [
        'US',
        [
          { name: 'strongAlcohol', exceedValue: 2 },
          { name: 'softAlcohol', exceedValue: 0 },
          { name: 'beer', exceedValue: 4 },
        ],
        [
          { name: 'strongAlcohol', value: 2 },
          { name: 'softAlcohol', value: 2 },
          { name: 'beer', value: 20 },
        ],
      ],
      [
        'AD',
        [
          { name: 'strongAlcohol', exceedValue: 3 },
          { name: 'softAlcohol', exceedValue: 1 },
          { name: 'beer', exceedValue: 0 },
        ],
        [
          { name: 'strongAlcohol', value: 4 },
          { name: 'softAlcohol', value: 2 },
          { name: 'beer', value: 20 },
        ],
      ],
      [
        'CH',
        [
          { name: 'strongAlcohol', exceedValue: 1 },
          { name: 'softAlcohol', exceedValue: 0 },
          { name: 'beer', exceedValue: 1 },
        ],
        [
          { name: 'strongAlcohol', value: 1 },
          { name: 'softAlcohol', value: 0.5 },
          { name: 'beer', value: 5 },
        ],
        true,
      ],
    ])(
      'should return exceed value for country %s',
      (country, expectedExceed, dataProducts, border = false) => {
        const detailedShoppingProducts: DetailedShoppingProduct[] = dataProducts.map(
          (dataProduct): DetailedShoppingProduct => {
            return getDetailedShoppingProductFromData(dataProduct);
          },
        );

        const alcoholExceed = new AlcoholExceed({
          travelerData: {
            meanOfTransport: MeansOfTransport.PLANE,
            country: country as Alpha2Code,
            age: 30,
            border,
          },
          detailedShoppingProducts,
        });

        const results = alcoholExceed.getExcessProducts();

        results.map((result) => {
          const matchingResult = expectedExceed.find(
            (expected) => expected.name === result.shoppingProduct?.customName,
          );
          expect(result.taxableValue).toEqual(matchingResult?.exceedValue);
        });
      },
    );

    it('should return upper round beer', () => {
      const alcoholExceed = new AlcoholExceed({
        travelerData: {
          meanOfTransport: MeansOfTransport.PLANE,
          country: 'US',
          age: 30,
          border: false,
        },
        detailedShoppingProducts: [
          getDetailedShoppingProductFromData({ name: 'strongAlcohol', value: 2 }),
          getDetailedShoppingProductFromData({ name: 'softAlcohol', value: 2 }),
          getDetailedShoppingProductFromData({ name: 'beer', value: 20 }),
        ],
      });

      const results = alcoholExceed.getExcessProducts();

      expect(
        results.find((result) => result.shoppingProduct?.customName === 'beer')?.taxableValue,
      ).toEqual(4);
    });

    it('should return exceed from EU', () => {
      const alcoholExceed = new AlcoholExceed({
        travelerData: {
          meanOfTransport: MeansOfTransport.PLANE,
          country: 'ES',
          age: 30,
          border: false,
        },
        detailedShoppingProducts: [
          getDetailedShoppingProductFromData({ name: 'spiritDrink', value: 15 }),
          getDetailedShoppingProductFromData({ name: 'alcoholIntermediate', value: 25 }),
          getDetailedShoppingProductFromData({ name: 'beer', value: 150 }),
          getDetailedShoppingProductFromData({ name: 'wine', value: 100 }),
          getDetailedShoppingProductFromData({ name: 'sparklingWine', value: 80 }),
        ],
      });

      const results = alcoholExceed.getExcessProducts();

      expect(
        results.find((result) => result.shoppingProduct?.customName === 'spiritDrink')
          ?.taxableValue,
      ).toEqual(5);
      expect(
        results.find((result) => result.shoppingProduct?.customName === 'alcoholIntermediate')
          ?.taxableValue,
      ).toEqual(5);
      expect(
        results.find((result) => result.shoppingProduct?.customName === 'beer')?.taxableValue,
      ).toEqual(40);
      expect(
        results.find((result) => result.shoppingProduct?.customName === 'wine')?.taxableValue,
      ).toEqual(70);
      expect(
        results.find((result) => result.shoppingProduct?.customName === 'sparklingWine')
          ?.taxableValue,
      ).toEqual(20);
    });

    it('should handle wine and sparkling wine EU limits separately', () => {
      const alcoholExceed = new AlcoholExceed({
        travelerData: {
          meanOfTransport: MeansOfTransport.PLANE,
          country: 'ES',
          age: 30,
          border: false,
        },
        detailedShoppingProducts: [
          getDetailedShoppingProductFromData({ name: 'wine', value: 50 }),
          getDetailedShoppingProductFromData({ name: 'sparklingWine', value: 70 }),
        ],
      });

      const results = alcoholExceed.getExcessProducts();

      expect(
        results.find((result) => result.shoppingProduct?.customName === 'sparklingWine')
          ?.taxableValue,
      ).toEqual(10);
      expect(
        results.find((result) => result.shoppingProduct?.customName === 'wine')?.taxableValue,
      ).toEqual(20);
    });
  });
});
