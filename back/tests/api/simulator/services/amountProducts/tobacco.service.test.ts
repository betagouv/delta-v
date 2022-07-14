import { faker } from '@faker-js/faker';
import { Alpha2Code } from 'i18n-iso-countries';
import { AmountProduct } from '../../../../../src/api/simulator/services/amountProducts/globalAmount.service';
import { TobaccoGroup } from '../../../../../src/api/simulator/services/amountProducts/tobacco.service';
import { productEntityFactory } from '../../../../helpers/factories/product.factory';

describe('TobaccoGroup', () => {
  describe('getSimulationGrouped for non EU and Andorra', () => {
    it.each([
      [
        false,
        'US',
        'under',
        [
          { name: 'cigarette', value: 50 },
          { name: 'cigarillos', value: 25 },
          { name: 'tobacco', value: 62 },
        ],
      ],
      [
        true,
        'US',
        'over',
        [
          { name: 'cigarette', value: 60 },
          { name: 'cigarillos', value: 25 },
          { name: 'cigar', value: 12 },
          { name: 'tobacco', value: 62 },
        ],
      ],
      [
        false,
        'AD',
        'under',
        [
          { name: 'cigarette', value: 60 },
          { name: 'cigar', value: 12 },
          { name: 'tobacco', value: 62 },
        ],
      ],
      [
        true,
        'AD',
        'over',
        [
          { name: 'cigarette', value: 60 },
          { name: 'cigarillos', value: 75 },
          { name: 'cigar', value: 12 },
          { name: 'tobacco', value: 62 },
        ],
      ],
    ])(
      'should return %p if the maximum is exceeded - in %p when total is %p maximum',
      (expectedResult, country, value, dataProducts) => {
        const completeShoppingProducts = dataProducts.map((dataProduct) => ({
          product: productEntityFactory({ amountProduct: dataProduct.name as AmountProduct }),
          value: dataProduct.value,
          id: faker.datatype.uuid(),
          name: faker.random.word(),
        }));

        const tobaccoGroup = new TobaccoGroup({
          country: country as Alpha2Code,
          completeShoppingProducts,
        });

        const results = tobaccoGroup.getSimulationGrouped();

        expect(results[0].isOverMaximum).toEqual(expectedResult);
        expect(results[0].group).toEqual('allTobaccoProducts');
        expect(results[0].completeShoppingProducts.length).toEqual(dataProducts.length);
        expect(results.length).toEqual(1);
      },
    );
  });
  describe('getSimulationGrouped for EU countries', () => {
    it.each([
      [
        'BE',
        'cigarette and cigar',
        [
          { name: 'cigarette', value: 900, isOver: true },
          { name: 'cigarillos', value: 400, isOver: false },
          { name: 'cigar', value: 201, isOver: true },
          { name: 'tobacco', value: 1000, isOver: false },
        ],
      ],
      [
        'IT',
        'cigarillos and tobacco',
        [
          { name: 'cigarette', value: 800, isOver: false },
          { name: 'cigarillos', value: 430, isOver: true },
          { name: 'tobacco', value: 1001, isOver: true },
        ],
      ],
      [
        'PL',
        'no one',
        [
          { name: 'cigarette', value: 600, isOver: false },
          { name: 'cigarillos', value: 350, isOver: false },
          { name: 'cigar', value: 198, isOver: false },
          { name: 'tobacco', value: 900, isOver: false },
        ],
      ],
    ])(
      'should get mixed result for country %p - %p are over the maximum',
      (country, value, dataProducts) => {
        const completeShoppingProducts = dataProducts.map((dataProduct) => ({
          product: productEntityFactory({ amountProduct: dataProduct.name as AmountProduct }),
          value: dataProduct.value,
          id: faker.datatype.uuid(),
          name: faker.random.word(),
        }));

        const tobaccoGroup = new TobaccoGroup({
          country: country as Alpha2Code,
          completeShoppingProducts,
        });

        const results = tobaccoGroup.getSimulationGrouped();
        dataProducts.map((dataProduct) => {
          const matchingResult = results.find((result) => result.group === dataProduct.name);
          expect(matchingResult?.isOverMaximum).toEqual(dataProduct.isOver);
        });

        expect(results.length).toEqual(dataProducts.length);
      },
    );
  });
});
