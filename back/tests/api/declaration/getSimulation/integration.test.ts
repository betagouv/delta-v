import { faker } from '@faker-js/faker';
import type { Alpha2Code } from 'i18n-iso-countries';
import request from 'supertest';
import api from '../../../../src/api';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { Product } from '../../../../src/entities/product.entity';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { prepareContextProduct } from '../../../utils/prepareContext/product';

const testApp = buildTestApp(api);
const testDb = testDbManager();

const prepareContext = async (customDutyProduct1 = 10): Promise<Product[]> => {
  const product1 = await prepareContextProduct({ testDb, vat: 20, customDuty: customDutyProduct1 });
  const product2 = await prepareContextProduct({ testDb, vat: 20, customDuty: 12 });
  const product3 = await prepareContextProduct({ testDb, vat: 20, customDuty: 12 });

  await testDb.persistCurrency(currencyEntityFactory({ id: 'EUR', name: 'Euro', value: 1 }));
  await testDb.persistCurrency(currencyEntityFactory({ id: 'USD', name: 'Dollar', value: 1.2 }));

  return [product1, product2, product3];
};

export interface ShoppingProduct {
  id?: string;
  customId: string;
  customName?: string;
  originalValue: number;
  currency: string;
}

const prepareProductPrice = async (value = 500): Promise<ShoppingProduct[]> => {
  const products = await prepareContext();
  const shoppingProducts: ShoppingProduct[] = [
    {
      id: products[0].id,
      customId: faker.string.uuid(),
      originalValue: value,
      currency: 'EUR',
    },
  ];

  return shoppingProducts;
};

interface SimulateEndpointOptions {
  products?: Product[];
  shoppingProducts: ShoppingProduct[];
  border?: boolean;
  age?: number;
  country?: Alpha2Code;
  meanOfTransport?: MeansOfTransport;
}
export interface ProductTaxesDetails {
  id: string;
  name: string;
  unitPrice: number;
  customDuty: number;
  vat: number;
  unitCustomDuty: number;
  unitVat: number;
  unitTaxes: number;
}

interface SimulateEndpointResponse {
  productTaxesDetails?: ProductTaxesDetails[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status: any;
}

const simulateEndpoint = async ({
  products,
  shoppingProducts,
  border = false,
  age = faker.number.int({ min: 15 }),
  meanOfTransport = MeansOfTransport.CAR,
  country = 'US',
}: SimulateEndpointOptions): Promise<SimulateEndpointResponse> => {
  const { status, body } = await request(testApp)
    .post('/api/simulator')
    .send({ shoppingProducts, border, age, country, meanOfTransport });

  if (!products) {
    return { status, body };
  }

  const productTaxesDetails = shoppingProducts.map(
    (shoppingProduct, index: number): ProductTaxesDetails => {
      const unitCustomDuty =
        (shoppingProduct.originalValue * (products[index]?.customDuty ?? 0)) / 100;
      const unitVat = (shoppingProduct.originalValue * (products[index]?.vat ?? 0)) / 100;
      return {
        id: products[index]?.id,
        name: products[index]?.name,
        unitPrice: shoppingProduct.originalValue,
        customDuty: products[index]?.customDuty ?? 0,
        vat: products[index]?.vat ?? 0,
        unitCustomDuty,
        unitVat,
        unitTaxes: unitCustomDuty + unitVat,
      };
    },
  );

  return { productTaxesDetails, body, status };
};

describe('test simulator API', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should simulate declaration - under franchise', async () => {
    const products = await prepareContext();
    const shoppingProducts: ShoppingProduct[] = [
      {
        id: products[0].id,
        customName: 'product1',
        customId: faker.string.uuid(),
        originalValue: 50,
        currency: 'USD',
      },
      {
        id: products[1].id,
        customName: 'product2',
        customId: faker.string.uuid(),
        originalValue: 100,
        currency: 'EUR',
      },
      {
        id: products[1].id,
        customName: 'product3',
        customId: faker.string.uuid(),
        originalValue: 100,
        currency: 'EUR',
      },
      {
        customName: 'cproduct1',
        customId: faker.string.uuid(),
        originalValue: 10,
        currency: 'USD',
      },
      {
        customName: 'cproduct2',
        customId: faker.string.uuid(),
        originalValue: 20,
        currency: 'EUR',
      },
      {
        customName: 'cproduct3',
        customId: faker.string.uuid(),
        originalValue: 30,
        currency: 'EUR',
      },
    ];

    const { body, status } = await simulateEndpoint({
      products,
      shoppingProducts,
    });
    expect(status).toBe(200);

    expect(body.valueProducts.length).toBe(3);
    expect(body.customProducts.length).toBe(3);

    expect(body).toMatchObject({
      total: 300,
      totalCustomDuty: 0,
      totalVat: 0,
      totalTaxes: 0,
      franchiseAmount: 300,
      canCalculateTaxes: true,
    });
  });
  it('should simulate declaration - over franchise', async () => {
    const products = await prepareContext();
    const shoppingProducts: ShoppingProduct[] = [
      {
        id: products[0].id,
        customName: 'product1',
        customId: faker.string.uuid(),
        originalValue: 50,
        currency: 'USD',
      },
      {
        id: products[1].id,
        customName: 'product2',
        customId: faker.string.uuid(),
        originalValue: 300,
        currency: 'EUR',
      },
      {
        id: products[1].id,
        customName: 'product3',
        customId: faker.string.uuid(),
        originalValue: 500,
        currency: 'EUR',
      },
      {
        customName: 'cproduct1',
        customId: faker.string.uuid(),
        originalValue: 10,
        currency: 'USD',
      },
      {
        customName: 'cproduct2',
        customId: faker.string.uuid(),
        originalValue: 20,
        currency: 'EUR',
      },
      {
        customName: 'cproduct3',
        customId: faker.string.uuid(),
        originalValue: 30,
        currency: 'EUR',
      },
    ];

    const { body, status } = await simulateEndpoint({
      products,
      shoppingProducts,
    });
    expect(status).toBe(200);

    expect(body.valueProducts.length).toBe(0);
    expect(body.customProducts.length).toBe(6);

    expect(body).toMatchObject({
      total: 900,
      totalCustomDuty: 0,
      totalVat: 0,
      totalTaxes: 0,
      franchiseAmount: 300,
      canCalculateTaxes: false,
    });
  });
  test.each([
    [96, 800, 12],
    [16.25, 650, 12],
    [13, 650, 2],
  ])(
    'should simulate declaration with total custom duty %p€ - totalProducts = %p€ and customDuty = %p€',
    async (totalCustomDutyExpected, totalProducts, customDuty) => {
      const products = await prepareContext(customDuty);
      const shoppingProducts: ShoppingProduct[] = [
        {
          id: products[0].id,
          customId: faker.string.uuid(),
          originalValue: totalProducts,
          currency: 'EUR',
        },
      ];

      const { body, status } = await simulateEndpoint({
        products,
        shoppingProducts,
      });
      expect(status).toBe(200);

      expect(body.totalCustomDuty).toEqual(totalCustomDutyExpected);
    },
  );

  describe('manage taxes with franchises', () => {
    describe('border user', () => {
      describe('adult user', () => {
        it('should pay franchise - total > 75 ', async () => {
          const shoppingProducts = await prepareProductPrice(80);
          const { body, status } = await simulateEndpoint({
            shoppingProducts,
            border: true,
            age: faker.number.int({ min: 15 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toBeGreaterThan(0);
          expect(body.totalVat).toBeGreaterThan(0);
        });
        it('should not pay franchise - total < 75 ', async () => {
          const shoppingProducts = await prepareProductPrice(70);
          const { body, status } = await simulateEndpoint({
            shoppingProducts,
            border: true,
            age: faker.number.int({ min: 15 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toEqual(0);
          expect(body.totalVat).toEqual(0);
        });
      });
      describe('not adult user', () => {
        it('should pay franchise - total > 40 ', async () => {
          const shoppingProducts = await prepareProductPrice(41);
          const { body, status } = await simulateEndpoint({
            shoppingProducts,
            border: true,
            age: faker.number.int({ max: 14 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toBeGreaterThan(0);
          expect(body.totalVat).toBeGreaterThan(0);
        });
        it('should not pay franchise - total < 40 ', async () => {
          const shoppingProducts = await prepareProductPrice(39);
          const { body, status } = await simulateEndpoint({
            shoppingProducts,
            border: true,
            age: faker.number.int({ max: 14 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toEqual(0);
          expect(body.totalVat).toEqual(0);
        });
      });
    });
    describe('not border user', () => {
      describe('adult user', () => {
        test.each([
          [450, MeansOfTransport.PLANE],
          [432, MeansOfTransport.BOAT],
          [302, MeansOfTransport.TRAIN],
          [310, MeansOfTransport.CAR],
          [301, MeansOfTransport.OTHER],
        ])('should pay - total = %p and meanOfTransport = %p', async (total, meanOfTransport) => {
          const shoppingProducts = await prepareProductPrice(total);
          const { body, status } = await simulateEndpoint({
            shoppingProducts,
            border: false,
            age: faker.number.int({ min: 15 }),
            meanOfTransport,
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toBeGreaterThan(0);
          expect(body.totalVat).toBeGreaterThan(0);
        });
        test.each([
          [425, MeansOfTransport.PLANE],
          [420, MeansOfTransport.BOAT],
          [150, MeansOfTransport.TRAIN],
          [255, MeansOfTransport.CAR],
          [299, MeansOfTransport.OTHER],
        ])(
          'should not pay - total = %p and meanOfTransport = %p',
          async (total, meanOfTransport) => {
            const shoppingProducts = await prepareProductPrice(total);
            const { body, status } = await simulateEndpoint({
              shoppingProducts,
              border: false,
              age: faker.number.int({ min: 15 }),
              meanOfTransport,
            });
            expect(status).toBe(200);
            expect(body.totalCustomDuty).toEqual(0);
            expect(body.totalVat).toEqual(0);
          },
        );
      });
      describe('not adult user', () => {
        it('should pay franchise - total > 150 ', async () => {
          const shoppingProducts = await prepareProductPrice(151);
          const { body, status } = await simulateEndpoint({
            shoppingProducts,
            border: false,
            age: faker.number.int({ max: 14 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toBeGreaterThan(0);
          expect(body.totalVat).toBeGreaterThan(0);
        });
        it('should not pay franchise - total < 150 ', async () => {
          const shoppingProducts = await prepareProductPrice(149);
          const { body, status } = await simulateEndpoint({
            shoppingProducts,
            border: false,
            age: faker.number.int({ max: 14 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toEqual(0);
          expect(body.totalVat).toEqual(0);
        });
      });
    });
  });
});
