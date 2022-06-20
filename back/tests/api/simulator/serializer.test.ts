import { serializeSimulator } from '../../../src/api/simulator/serializer';
import { productTaxesEntityFactory } from '../../helpers/factories/productTaxes.factory';

describe('test serializer', () => {
  it('should serialize data', () => {
    const product1 = productTaxesEntityFactory({
      customName: 'product1',
      unitPrice: 85,
      customDuty: 12,
      vat: 20,
    });
    const product2 = productTaxesEntityFactory({
      customName: 'product2',
      unitPrice: 100,
      customDuty: 5,
      vat: 20,
    });
    const serializedData = serializeSimulator({
      franchiseAmount: 500,
      products: [product1, product2],
    });

    expect(serializedData).toMatchObject({
      products: [
        {
          customName: 'product1',
          unitPrice: 85,
          customDuty: 12,
          vat: 20,
          unitCustomDuty: 10.2,
          unitVat: 17,
          unitTaxes: 27.2,
        },
        {
          customName: 'product2',
          unitPrice: 100,
          customDuty: 5,
          vat: 20,
          unitCustomDuty: 5,
          unitVat: 20,
          unitTaxes: 25,
        },
      ],
      total: 185,
      totalCustomDuty: 15.2,
      totalVat: 37,
      totalTaxes: 52.2,
      franchiseAmount: 500,
    });
  });
});
