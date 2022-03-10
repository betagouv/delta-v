import request from 'supertest';
import api from '../../../src/api';
import { ShopingProduct } from '../../../src/api/simulator/services';
import { Product } from '../../../src/entities/product.entity';
import buildTestApp from '../../helpers/testApp.helper';
import { testDbManager } from '../../helpers/testDb.helper';
import { prepareContextProduct } from '../../utils/prepareContext/product';

const testApp = buildTestApp(api);
const testDb = testDbManager();

const prepareContext = async (): Promise<Product[]> => {
  const product1 = await prepareContextProduct({ testDb, vat: 20, customDuty: 5 });
  const product2 = await prepareContextProduct({ testDb, vat: 20, customDuty: 12 });

  return [product1, product2];
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
    const { status, body } = await request(testApp)
      .post('/api/simulator')
      .send({ shopingProducts });
    expect(status).toBe(200);

    const finalProducts = shopingProducts.map((shopingProduct, index: number) => {
      return {
        name: products[index].name,
        amount: shopingProduct.amount,
        unitPrice: shopingProduct.price,
        totalPrice: shopingProduct.amount * shopingProduct.price,
        customDuty: products[index].customDuty,
        vat: products[index].vat,
        totalCustomDuty:
          (shopingProduct.amount * shopingProduct.price * (products[index].customDuty ?? 0)) / 100,
        totalVat: (shopingProduct.amount * shopingProduct.price * (products[index].vat ?? 0)) / 100,
      };
    });

    expect(body).toEqual({
      products: finalProducts,
      total: 1650,
      totalCustomDuty: 187.5,
      totalVat: 330,
    });
  });
});
