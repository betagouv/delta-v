import { faker } from '@faker-js/faker';
import type { Alpha2Code } from 'i18n-iso-countries';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { AmountProduct } from '../../../../src/api/common/services/amountProducts/globalAmount.service';
import { TobaccoGroup } from '../../../../src/api/common/services/amountProducts/tobacco/tobacco.service';
import { DetailedShoppingProduct } from '../../../../src/api/common/services/detailedShoppingProduct';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import { productEntityFactory } from '../../../helpers/factories/product.factory';

describe('TobaccoGroup', () => {
  describe('getSimulationGrouped for non EU and Andorra and Border Swiss', () => {
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
      [
        false,
        'CH',
        'under',
        [
          { name: 'cigarette', value: 10 },
          { name: 'cigar', value: 5 },
          { name: 'tobacco', value: 2 },
          { name: 'tobacco', value: 10 },
        ],
        true,
      ],
      [
        true,
        'CH',
        'over',
        [
          { name: 'cigarette', value: 12 },
          { name: 'cigarillos', value: 6 },
          { name: 'cigar', value: 3 },
          { name: 'tobacco', value: 13 },
        ],
        true,
      ],
    ])(
      'should return %p if the maximum is exceeded - in %p when total is %p maximum',
      (expectedResult, country, value, dataProducts, border = false) => {
        const detailedShoppingProducts: DetailedShoppingProduct[] = dataProducts.map(
          (dataProduct): DetailedShoppingProduct => {
            const detailedShoppingProduct = new DetailedShoppingProduct();
            detailedShoppingProduct.product = productEntityFactory({
              amountProduct: dataProduct.name as AmountProduct,
            });
            detailedShoppingProduct.shoppingProduct = {
              originalValue: dataProduct.value,
              id: faker.string.uuid(),
              customId: faker.string.uuid(),
              customName: faker.lorem.word(),
              currency: 'EUR',
            };
            detailedShoppingProduct.currency = currencyEntityFactory({ value: 1 });

            return detailedShoppingProduct;
          },
        );

        const tobaccoGroup = new TobaccoGroup({
          travelerData: {
            meanOfTransport: MeansOfTransport.PLANE,
            country: country as Alpha2Code,
            age: 30,
            border,
          },
          detailedShoppingProducts,
        });

        const results = tobaccoGroup.getSimulationGrouped();

        expect(results[0].isOverMaximum).toEqual(expectedResult);
        expect(results[0].group).toEqual('allTobaccoProducts');
        expect(results[0].detailedShoppingProducts.length).toEqual(dataProducts.length);
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
        const detailedShoppingProducts: DetailedShoppingProduct[] = dataProducts.map(
          (dataProduct): DetailedShoppingProduct => {
            const detailedShoppingProduct = new DetailedShoppingProduct();
            detailedShoppingProduct.product = productEntityFactory({
              amountProduct: dataProduct.name as AmountProduct,
            });
            detailedShoppingProduct.shoppingProduct = {
              originalValue: dataProduct.value,
              id: faker.string.uuid(),
              customId: faker.string.uuid(),
              customName: faker.lorem.word(),
              currency: 'EUR',
            };
            detailedShoppingProduct.currency = currencyEntityFactory({ value: 1 });

            return detailedShoppingProduct;
          },
        );

        const tobaccoGroup = new TobaccoGroup({
          travelerData: {
            meanOfTransport: MeansOfTransport.PLANE,
            country: country as Alpha2Code,
            age: 30,
            border: false,
          },
          detailedShoppingProducts,
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
