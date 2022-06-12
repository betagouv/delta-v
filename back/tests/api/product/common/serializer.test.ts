import { productSerializer } from '../../../../src/api/product/common/serializer';
import { productEntityFactory } from '../../../helpers/factories/product.factory';

describe('test get all product serializer', () => {
  it('should serialize products', () => {
    const childrenProduct1 = productEntityFactory();
    const parentProduct1 = productEntityFactory({ subProducts: [childrenProduct1] });
    const serializedProduct = productSerializer(parentProduct1);
    expect(serializedProduct).toMatchObject({
      id: parentProduct1.id,
      name: parentProduct1.name,
      info: parentProduct1.info,
      childrenQuestion: parentProduct1.childrenQuestion,
      customDuty: parentProduct1.customDuty,
      vat: parentProduct1.vat,
      nomenclatures: parentProduct1.nomenclatures,
      finalProduct: parentProduct1.finalProduct,
      productDisplayTypes: parentProduct1.productDisplayTypes,
    });

    expect(serializedProduct.subProducts).toMatchObject([
      {
        id: childrenProduct1.id,
      },
    ]);
  });
});
