import { serializeSimulator } from '../../../src/api/simulator/serializer';
import { productTaxesEntityFactory } from '../../helpers/factories/productTaxes.factory';

describe('test serializer', () => {
  it('should serialize data', () => {
    const product1 = productTaxesEntityFactory({
      amount: 1,
      unitPrice: 85,
      customDuty: 12,
      vat: 20,
    });
    const product2 = productTaxesEntityFactory({
      amount: 2,
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
          amount: 1,
          unitPrice: 85,
          customDuty: 12,
          vat: 20,
          totalPrice: 85,
          unitCustomDuty: 10.2,
          unitVat: 17,
          unitTaxes: 27.2,
          totalCustomDuty: 10.2,
          totalVat: 17,
          totalTaxes: 27.2,
        },
        {
          amount: 2,
          unitPrice: 100,
          customDuty: 5,
          vat: 20,
          totalPrice: 200,
          unitCustomDuty: 5,
          unitVat: 20,
          unitTaxes: 25,
          totalCustomDuty: 10,
          totalVat: 40,
          totalTaxes: 50,
        },
      ],
      total: 285,
      totalCustomDuty: 20.2,
      totalVat: 57,
      totalTaxes: 77.2,
      franchiseAmount: 500,
    });
  });
});
