import { AmountGroup } from '../../../src/api/common/services/amountProducts/globalAmount.service';
import { GroupedTobacco } from '../../../src/api/common/services/amountProducts/tobacco/tobacco.service';
import { DetailedShoppingProduct } from '../../../src/api/common/services/detailedShoppingProduct';
import { serializeSimulator } from '../../../src/api/simulator/serializer';
import { currencyEntityFactory } from '../../helpers/factories/currency.factory';
import { productEntityFactory } from '../../helpers/factories/product.factory';
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

    const detailedShoppingProduct = new DetailedShoppingProduct();
    detailedShoppingProduct.product = productEntityFactory({ id: '12', name: 'product3' });
    detailedShoppingProduct.shoppingProduct = {
      id: '12',
      customId: '12',
      customName: 'product3 custom',
      originalValue: 200,
      currency: 'EUR',
    };
    detailedShoppingProduct.currency = currencyEntityFactory({ value: 1 });
    const group3: AmountGroup = {
      detailedShoppingProducts: [detailedShoppingProduct],
      group: GroupedTobacco.allTobaccoProducts,
      isOverMaximum: true,
    };
    const serializedData = serializeSimulator({
      franchiseAmount: 500,
      valueProducts: [product1, product2],
      customProducts: [],
      amountProducts: [group3],
    });

    expect(serializedData).toMatchObject({
      valueProducts: [
        {
          customName: 'product1',
          customId: product1.customId,
          unitPrice: 85,
          customDuty: 12,
          vat: 20,
          unitCustomDuty: 10.2,
          unitVat: 19.04,
          unitTaxes: 29.24,
        },
        {
          customName: 'product2',
          customId: product2.customId,
          unitPrice: 100,
          customDuty: 5,
          vat: 20,
          unitCustomDuty: 5,
          unitVat: 21,
          unitTaxes: 26,
        },
      ],
      amountProducts: [
        {
          group: 'allTobaccoProducts',
          products: [
            {
              id: '12',
              name: 'product3',
              customName: 'product3 custom',
              amount: 200,
            },
          ],
          isOverMaximum: true,
        },
      ],
      total: 185,
      totalCustomDuty: 15.2,
      totalVat: 40.04,
      totalTaxes: 55.24,
      franchiseAmount: 500,
    });
  });
});
