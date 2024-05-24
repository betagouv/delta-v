import { faker } from '@faker-js/faker';
import type { Alpha2Code } from 'i18n-iso-countries';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { AlcoholGroup } from '../../../../src/api/common/services/amountProducts/alcohol/alcohol.service';
import { AmountProduct } from '../../../../src/api/common/services/amountProducts/globalAmount.service';
import { DetailedShoppingProduct } from '../../../../src/api/common/services/detailedShoppingProduct';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import { productEntityFactory } from '../../../helpers/factories/product.factory';

describe('AlcoholGroup', () => {
  describe('getSimulationGrouped for non EU and Andorra and Border Swiss', () => {
    it.each([
      [
        false,
        'US',
        'under',
        [
          { name: 'softAlcohol', value: 1 },
          { name: 'strongAlcohol', value: 0.5 },
        ],
      ],
      [
        true,
        'US',
        'over',
        [
          { name: 'softAlcohol', value: 1 },
          { name: 'strongAlcohol', value: 0.6 },
        ],
      ],
      [
        false,
        'AD',
        'under',
        [
          { name: 'softAlcohol', value: 1.5 },
          { name: 'strongAlcohol', value: 0.75 },
        ],
      ],
      [
        true,
        'AD',
        'over',
        [
          { name: 'softAlcohol', value: 1.6 },
          { name: 'strongAlcohol', value: 0.75 },
        ],
      ],
      [
        false,
        'CH',
        'under',
        [
          { name: 'softAlcohol', value: 0.2 },
          { name: 'strongAlcohol', value: 0.1 },
        ],
        true,
      ],
      [
        true,
        'CH',
        'over',
        [
          { name: 'softAlcohol', value: 0.3 },
          { name: 'strongAlcohol', value: 0.25 },
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

        const alcoholGroup = new AlcoholGroup({
          travelerData: {
            meanOfTransport: MeansOfTransport.PLANE,
            country: country as Alpha2Code,
            age: 30,
            border,
          },
          detailedShoppingProducts,
        });

        const results = alcoholGroup.getSimulationGrouped();

        expect(results[0].isOverMaximum).toEqual(expectedResult);
        expect(results[0].group).toEqual('groupedAlcohol');
        expect(results[0].detailedShoppingProducts.length).toEqual(dataProducts.length);
        expect(results.length).toEqual(1);
      },
    );
  });
  describe('getSimulationGrouped for EU countries', () => {
    it.each([
      [
        'BE',
        'beer',
        [
          { name: 'beer', value: 120, isOver: true },
          { name: 'wine', value: 90, isOver: false },
          { name: 'spiritDrink', value: 11, isOver: true },
          { name: 'alcoholIntermediate', value: 19, isOver: false },
        ],
      ],
      [
        'BE',
        'beer',
        [
          { name: 'beer', value: 100, isOver: false },
          { name: 'wine', value: 95, isOver: true },
          { name: 'spiritDrink', value: 9, isOver: false },
          { name: 'alcoholIntermediate', value: 21, isOver: true },
        ],
      ],
      [
        'IT',
        'wine',
        [
          { name: 'wine', value: 35, isOver: true },
          { name: 'sparklingWine', value: 60, isOver: false },
        ],
      ],
      [
        'PL',
        'no one',
        [
          { name: 'wine', value: 25, isOver: false },
          { name: 'sparklingWine', value: 65, isOver: true },
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

        const alcoholGroup = new AlcoholGroup({
          travelerData: {
            meanOfTransport: MeansOfTransport.PLANE,
            country: country as Alpha2Code,
            age: 30,
            border: false,
          },
          detailedShoppingProducts,
        });

        const results = alcoholGroup.getSimulationGrouped();
        dataProducts.map((dataProduct) => {
          const matchingResult = results.find((result) => result.group === dataProduct.name);
          expect(matchingResult?.isOverMaximum).toEqual(dataProduct.isOver);
        });

        expect(results.length).toEqual(dataProducts.length);
      },
    );
  });
});
