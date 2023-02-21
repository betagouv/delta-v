import { faker } from '@faker-js/faker';
import { Alpha2Code } from 'i18n-iso-countries';
import request from 'supertest';
import api from '../../../../src/api';
import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { Product } from '../../../../src/entities/product.entity';
import { currencyEntityFactory } from '../../../helpers/factories/currency.factory';
import { prepareDeclarationData } from '../../../helpers/prepareContext/declarationData';
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

interface SimulateEndpointOptions {
  declarationId?: string;
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
  declarationId = faker.datatype.uuid(),
  products,
  shoppingProducts,
  border = false,
  age = faker.datatype.number({ precision: 1, min: 15 }),
  meanOfTransport = MeansOfTransport.CAR,
  country = 'US',
}: SimulateEndpointOptions): Promise<SimulateEndpointResponse> => {
  const declarationData = prepareDeclarationData();
  const { status, body } = await request(testApp)
    .put(`/api/declaration/${declarationId}`)
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
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should simulate declaration', async () => {
    const products = await prepareContext();
    const declarationId = faker.datatype.uuid();
    const age = faker.datatype.number({ precision: 1, min: 15 });
    const country = 'US';
    const meanOfTransport = MeansOfTransport.CAR;
    const border = false;
    const shoppingProducts: ShoppingProduct[] = [
      {
        id: products[0].id,
        customName: 'product1',
        customId: faker.datatype.uuid(),
        originalValue: 50,
        currency: 'USD',
      },
      {
        id: products[1].id,
        customName: 'product2',
        customId: faker.datatype.uuid(),
        originalValue: 300,
        currency: 'EUR',
      },
      {
        id: products[1].id,
        customName: 'product3',
        customId: faker.datatype.uuid(),
        originalValue: 500,
        currency: 'EUR',
      },
      {
        customName: 'cproduct1',
        customId: faker.datatype.uuid(),
        originalValue: 10,
        currency: 'USD',
      },
      {
        customName: 'cproduct2',
        customId: faker.datatype.uuid(),
        originalValue: 20,
        currency: 'EUR',
      },
      {
        customName: 'cproduct3',
        customId: faker.datatype.uuid(),
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
    });

    expect(status).toBe(200);

    expect(body.valueProducts.length).toBe(3);
    expect(body.customProducts.length).toBe(3);

    expect(body).toMatchObject({
      total: 900,
      totalCustomDuty: 64.17,
      totalVat: 121.17,
      totalTaxes: 185.34,
      franchiseAmount: 300,
    });

    expect(body.valueProducts[1]).toMatchObject({
      unitPrice: 41.67,
      originalPrice: 50,
      originalCurrency: 'USD',
      rateCurrency: 1.2,
      customDuty: 10,
      vat: 20,
      unitCustomDuty: 4.17,
      unitVat: 9.17,
      unitTaxes: 13.34,
    });

    expect(body.customProducts[0]).toMatchObject({
      unitPrice: 8.33,
      originalPrice: 10,
      originalCurrency: 'USD',
      rateCurrency: 1.2,
      customDuty: 0,
      vat: 0,
      unitCustomDuty: 0,
      unitVat: 0,
      unitTaxes: 0,
    });

    const dbDeclarations = await testDb.getDeclarations();
    expect(dbDeclarations.length).toBe(1);
    expect(dbDeclarations[0]).toMatchObject({
      id: declarationId,
      totalVatAmount: 121.17,
      totalCustomDutyAmount: 64.17,
      totalTaxesAmount: 185.34,
      franchiseAmount: 300,
      totalAmount: 900,
      declarantBorder: border,
      declarantAge: age,
      declarantCountry: country,
      declarantMeanOfTransport: meanOfTransport,
    });
  });
});