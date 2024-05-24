import { faker } from '@faker-js/faker';
import type { Alpha2Code } from 'i18n-iso-countries';
import request from 'supertest';
import api from '../../../../src/api';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { Product } from '../../../../src/entities/product.entity';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import { prepareDeclarationData } from '../../../helpers/prepareContext/declarationData';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { prepareContextProduct } from '../../../utils/prepareContext/product';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import { prepareContextDeclaration } from '../../../helpers/prepareContext/declaration';

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

interface SimulateEndpointOptions {
  declarationId?: string;
  products?: Product[];
  shoppingProducts: ShoppingProduct[];
  border?: boolean;
  age?: number;
  country?: Alpha2Code;
  meanOfTransport?: MeansOfTransport;
  accessToken: string;
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
  declarationId = faker.string.uuid(),
  products,
  shoppingProducts,
  border = false,
  age = faker.number.int({ min: 15, max: 100 }),
  meanOfTransport = MeansOfTransport.CAR,
  country = 'US',
  accessToken,
}: SimulateEndpointOptions): Promise<SimulateEndpointResponse> => {
  const declarationData = prepareDeclarationData();
  const { status, body } = await request(testApp)
    .put(`/api/declaration/${declarationId}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      ...declarationData,
      declarationId: undefined,
      shoppingProducts,
      border,
      age,
      country,
      meanOfTransport,
    });

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

describe('test put declaration API', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
    clearEventEmitterMock();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should put declaration', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });
    const products = await prepareContext();
    const declarationId = faker.string.uuid();
    const age = faker.number.int({ min: 15, max: 100 });
    const country = 'US';
    const meanOfTransport = MeansOfTransport.CAR;
    const border = false;
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
    ];

    const { body, status } = await simulateEndpoint({
      declarationId,
      products,
      shoppingProducts,
      age,
      border,
      country,
      meanOfTransport,
      accessToken,
    });

    expect(status).toBe(200);
    expect(body.code).toBe(ResponseCodes.DECLARATION_UPDATED);

    const dbDeclarations = await testDb.getDeclarations();
    expect(dbDeclarations.length).toBe(1);
    expect(dbDeclarations[0]).toMatchObject({
      id: declarationId,
      canCalculateTaxes: true,
      totalVatAmount: 121.17,
      totalCustomDutyAmount: 64.17,
      totalTaxesAmount: 185.34,
      franchiseAmount: 300,
      totalAmount: 841.67,
      declarantBorder: border,
      declarantAge: age,
      declarantCountry: country,
      declarantMeanOfTransport: meanOfTransport,
      authorEmail: user.email,
      authorId: user.id,
    });

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });
  it('should put declaration - with custom product and under franchise', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });
    const products = await prepareContext();
    const declarationId = faker.string.uuid();
    const age = faker.number.int({ min: 15, max: 100 });
    const country = 'US';
    const meanOfTransport = MeansOfTransport.CAR;
    const border = false;
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
      declarationId,
      products,
      shoppingProducts,
      age,
      border,
      country,
      meanOfTransport,
      accessToken,
    });

    expect(status).toBe(200);
    expect(body.code).toBe(ResponseCodes.DECLARATION_UPDATED);

    const dbDeclarations = await testDb.getDeclarations();
    expect(dbDeclarations.length).toBe(1);
    expect(dbDeclarations[0]).toMatchObject({
      id: declarationId,
      canCalculateTaxes: false,
      totalVatAmount: 0,
      totalCustomDutyAmount: 0,
      totalTaxesAmount: 0,
      franchiseAmount: 300,
      totalAmount: 900,
      declarantBorder: border,
      declarantAge: age,
      declarantCountry: country,
      declarantMeanOfTransport: meanOfTransport,
      authorEmail: user.email,
      authorId: user.id,
    });

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });
  it('should put declaration - declaration already exist', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });
    const declaration = await prepareContextDeclaration({ testDb });
    const products = await prepareContext();
    const age = faker.number.int({ min: 15, max: 100 });
    const country = 'US';
    const meanOfTransport = MeansOfTransport.CAR;
    const border = false;
    const shoppingProducts: ShoppingProduct[] = [
      {
        id: products[0].id,
        customName: 'product1',
        customId: faker.string.uuid(),
        originalValue: 50,
        currency: 'USD',
      },
    ];

    const { body, status } = await simulateEndpoint({
      declarationId: declaration.id,
      products,
      shoppingProducts,
      age,
      border,
      country,
      meanOfTransport,
      accessToken,
    });

    expect(status).toBe(200);
    expect(body.code).toBe(ResponseCodes.DECLARATION_UPDATED);

    const dbDeclarations = await testDb.getDeclarations();
    expect(dbDeclarations.length).toBe(1);
    expect(dbDeclarations[0]).toMatchObject({
      id: declaration.id,
      canCalculateTaxes: true,
      totalVatAmount: 0,
      totalCustomDutyAmount: 0,
      totalTaxesAmount: 0,
      franchiseAmount: 300,
      totalAmount: 41.67,
      declarantBorder: border,
      declarantAge: age,
      declarantCountry: country,
      declarantMeanOfTransport: meanOfTransport,
      authorEmail: user.email,
      authorId: user.id,
    });

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(0);
  });
  it('should put declaration - with custom products', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    const products = await prepareContext();
    const declarationId = faker.string.uuid();
    const age = faker.number.int({ min: 15, max: 100 });
    const country = 'US';
    const meanOfTransport = MeansOfTransport.CAR;
    const border = false;
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
        id: undefined,
        customName: 'product3',
        customId: faker.string.uuid(),
        originalValue: 500,
        currency: 'EUR',
      },
    ];

    const { body, status } = await simulateEndpoint({
      declarationId,
      products,
      shoppingProducts,
      age,
      border,
      country,
      meanOfTransport,
      accessToken,
    });

    expect(status).toBe(200);
    expect(body.code).toBe(ResponseCodes.DECLARATION_UPDATED);

    const dbDeclaration = await testDb.getDeclaration(declarationId);
    expect(dbDeclaration).not.toBeNull();

    const customDbProduct = dbDeclaration?.products.find((product) => !product.id);
    expect(customDbProduct).toMatchObject({
      customName: 'product3',
      customId: shoppingProducts[2].customId,
      originalValue: shoppingProducts[2].originalValue,
      currency: shoppingProducts[2].currency,
    });

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });
});
