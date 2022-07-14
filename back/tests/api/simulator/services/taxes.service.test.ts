import { manageProductTaxesDetails } from '../../../../src/api/simulator/services';
import {
  CompleteShoppingProduct,
  ProductTaxes,
} from '../../../../src/entities/productTaxes.entity';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { productTaxesEntityFactory } from '../../../helpers/factories/productTaxes.factory';
describe('taxes service', () => {
  describe('manageProductTaxesDetails', () => {
    test.each([
      [5, 750, 5],
      [2.5, 650, 5],
      [2, 650, 2],
    ])(
      'should use %p custom duty - total = %p and CustomDuty product = %p',
      (expectedUsedCustomDuty, total, productCustomDuty) => {
        const productTaxes = productTaxesEntityFactory({
          customDuty: productCustomDuty,
          unitPrice: total,
        });

        const productsTaxes = manageProductTaxesDetails({
          total,
          franchiseAmount: 430,
          productsTaxes: [productTaxes],
        });

        expect(productsTaxes[0].customDuty).toBe(expectedUsedCustomDuty);
      },
    );
  });
  describe('getProductTaxesDetails', () => {
    const highCustomDutyProduct = productEntityFactory({ customDuty: 12, vat: 20 });
    const lowCustomDutyProduct = productEntityFactory({ customDuty: 5, vat: 20 });
    const completeShoppingProduct1: CompleteShoppingProduct = {
      id: highCustomDutyProduct.id,
      name: 'Hello',
      value: 50,
      product: highCustomDutyProduct,
    };
    const completeShoppingProduct2: CompleteShoppingProduct = {
      id: lowCustomDutyProduct.id,
      name: 'Hello 2',
      value: 50,
      product: lowCustomDutyProduct,
    };
    it('should be return products taxes - low taxes', () => {
      const productTaxes = new ProductTaxes({});
      productTaxes.setFromCompleteShoppingProduct(completeShoppingProduct1);

      expect(productTaxes).toMatchObject({
        _id: highCustomDutyProduct.id,
        _name: highCustomDutyProduct.name,
        _unitPrice: 50,
        _vat: 20,
        _customDuty: 12,
      });
    });
    it('should be return products taxes - high taxes', () => {
      const productTaxes = new ProductTaxes({});
      productTaxes.setFromCompleteShoppingProduct(completeShoppingProduct2);

      expect(productTaxes).toMatchObject({
        _id: lowCustomDutyProduct.id,
        _name: lowCustomDutyProduct.name,
        _unitPrice: 50,
        _vat: 20,
        _customDuty: 5,
      });
    });
  });
});
