import request from 'supertest';
import api from '../../../../src/api';
import { sortCurrencies } from '../../../../src/utils/currency.util';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';

const testApp = buildTestApp(api);
const testDb = testDbManager();

describe('test get all currencies API', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should return all currencies', async () => {
    const currencies = await Promise.all([
      testDb.persistCurrency(currencyEntityFactory()),
      testDb.persistCurrency(currencyEntityFactory()),
      testDb.persistCurrency(currencyEntityFactory()),
    ]);
    const { status, body } = await request(testApp).get('/api/currency');
    expect(status).toBe(200);
    expect(body).toMatchObject({
      currencies: currencies
        .sort(sortCurrencies)
        .map((currency) => ({ id: currency.id, name: currency.name })),
    });
  });
});
