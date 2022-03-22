import { faker } from '@faker-js/faker';
import request from 'supertest';
import api from '../../../src/api';
import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';
import { ProductTaxesDetails, ShopingProduct } from '../../../src/api/simulator/services';
import { Product } from '../../../src/entities/product.entity';
import buildTestApp from '../../helpers/testApp.helper';
import { testDbManager } from '../../helpers/testDb.helper';
import { prepareContextProduct } from '../../utils/prepareContext/product';

const testApp = buildTestApp(api);
const testDb = testDbManager();

const prepareContext = async (customDytyProduct1 = 5): Promise<Product[]> => {
  const product1 = await prepareContextProduct({ testDb, vat: 20, customDuty: customDytyProduct1 });
  const product2 = await prepareContextProduct({ testDb, vat: 20, customDuty: 12 });

  return [product1, product2];
};

const prepareProductPrice = async (price = 500): Promise<ShopingProduct[]> => {
  const products = await prepareContext();
  const shopingProducts: ShopingProduct[] = [
    {
      id: products[0].id,
      amount: 1,
      price,
    },
  ];

  return shopingProducts;
};

interface SimulateEndpointOptions {
  products?: Product[];
  shopingProducts: ShopingProduct[];
  border?: boolean;
  age?: number;
  meanOfTransport?: MeansOfTransport;
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
  shopingProducts,
  border = false,
  age = faker.datatype.number({ precision: 1, min: 15 }),
  meanOfTransport = MeansOfTransport.CAR,
}: SimulateEndpointOptions): Promise<SimulateEndpointResponse> => {
  const { status, body } = await request(testApp)
    .post('/api/simulator')
    .send({ shopingProducts, border, age, meanOfTransport });

  if (!products) {
    return { status, body };
  }

  const productTaxesDetails = shopingProducts.map(
    (shopingProduct, index: number): ProductTaxesDetails => {
      return {
        name: products[index].name,
        amount: shopingProduct.amount,
        unitPrice: shopingProduct.price,
        totalPrice: shopingProduct.amount * shopingProduct.price,
        customDuty: products[index].customDuty ?? 0,
        vat: products[index].vat ?? 0,
        totalCustomDuty:
          (shopingProduct.amount * shopingProduct.price * (products[index].customDuty ?? 0)) / 100,
        totalVat: (shopingProduct.amount * shopingProduct.price * (products[index].vat ?? 0)) / 100,
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
  it('should simulate declaration', async () => {
    const products = await prepareContext();
    const shopingProducts: ShopingProduct[] = [
      {
        id: products[0].id,
        amount: 3,
        price: 50,
      },
      {
        id: products[1].id,
        amount: 5,
        price: 300,
      },
    ];

    const { body, status, productTaxesDetails } = await simulateEndpoint({
      products,
      shopingProducts,
    });
    expect(status).toBe(200);

    expect(body).toEqual({
      products: productTaxesDetails,
      total: 1650,
      totalCustomDuty: 187.5,
      totalVat: 330,
    });
  });
  test.each([
    [96, 800, 12],
    [16.25, 650, 12],
    [13, 650, 2],
  ])(
    'should simulate declaration with total custom duty %p€ - totalProducts = %p and customDuty = %p',
    async (totalCustomDutyExpected, totalProducts, customDuty) => {
      const products = await prepareContext(customDuty);
      const shopingProducts: ShopingProduct[] = [
        {
          id: products[0].id,
          amount: 1,
          price: totalProducts,
        },
      ];

      const { body, status } = await simulateEndpoint({
        products,
        shopingProducts,
      });
      expect(status).toBe(200);

      expect(body.totalCustomDuty).toEqual(totalCustomDutyExpected);
    },
  );

  describe('manage taxes with franchises', () => {
    describe('border user', () => {
      describe('adult user', () => {
        it('should pay franchise - total > 75 ', async () => {
          const shopingProducts = await prepareProductPrice(80);
          const { body, status } = await simulateEndpoint({
            shopingProducts,
            border: true,
            age: faker.datatype.number({ precision: 1, min: 15 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toBeGreaterThan(0);
          expect(body.totalVat).toBeGreaterThan(0);
        });
        it('should not pay franchise - total < 75 ', async () => {
          const shopingProducts = await prepareProductPrice(70);
          const { body, status } = await simulateEndpoint({
            shopingProducts,
            border: true,
            age: faker.datatype.number({ precision: 1, min: 15 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toEqual(0);
          expect(body.totalVat).toEqual(0);
        });
      });
      describe('not adult user', () => {
        it('should pay franchise - total > 40 ', async () => {
          const shopingProducts = await prepareProductPrice(41);
          const { body, status } = await simulateEndpoint({
            shopingProducts,
            border: true,
            age: faker.datatype.number({ precision: 1, max: 15 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toBeGreaterThan(0);
          expect(body.totalVat).toBeGreaterThan(0);
        });
        it('should not pay franchise - total < 40 ', async () => {
          const shopingProducts = await prepareProductPrice(39);
          const { body, status } = await simulateEndpoint({
            shopingProducts,
            border: true,
            age: faker.datatype.number({ precision: 1, max: 15 }),
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
          const shopingProducts = await prepareProductPrice(total);
          const { body, status } = await simulateEndpoint({
            shopingProducts,
            border: false,
            age: faker.datatype.number({ precision: 1, min: 15 }),
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
            const shopingProducts = await prepareProductPrice(total);
            const { body, status } = await simulateEndpoint({
              shopingProducts,
              border: false,
              age: faker.datatype.number({ precision: 1, min: 15 }),
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
          const shopingProducts = await prepareProductPrice(151);
          const { body, status } = await simulateEndpoint({
            shopingProducts,
            border: false,
            age: faker.datatype.number({ precision: 1, max: 15 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toBeGreaterThan(0);
          expect(body.totalVat).toBeGreaterThan(0);
        });
        it('should not pay franchise - total < 150 ', async () => {
          const shopingProducts = await prepareProductPrice(149);
          const { body, status } = await simulateEndpoint({
            shopingProducts,
            border: false,
            age: faker.datatype.number({ precision: 1, max: 15 }),
          });
          expect(status).toBe(200);
          expect(body.totalCustomDuty).toEqual(0);
          expect(body.totalVat).toEqual(0);
        });
      });
    });
  });
});
