import {
  CompleteShopingProduct,
  manageProductTaxeDetails,
} from '../../../../src/api/simulator/services';
import { ProductTaxes } from '../../../../src/entities/productTaxes.entity';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { productTaxesEntityFactory } from '../../../helpers/factories/productTaxes.factory';
describe('taxes service', () => {
  describe('manageProductTaxeDetails', () => {
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

        const productsTaxes = manageProductTaxeDetails({
          total,
          franchiseAmount: 430,
          productsTaxes: [productTaxes],
        });

        expect(productsTaxes[0].customDuty).toBe(expectedUsedCustomDuty);
      },
    );
  });
  describe('getProductTaxesDetails', () => {
    const highCustomDutyProdyct = productEntityFactory({ customDuty: 12, vat: 20 });
    const lowCustomDutyProdyct = productEntityFactory({ customDuty: 5, vat: 20 });
    const completeShopingProduct1: CompleteShopingProduct = {
      id: highCustomDutyProdyct.id,
      amount: 1,
      price: 50,
      product: highCustomDutyProdyct,
    };
    const completeShopingProduct2: CompleteShopingProduct = {
      id: lowCustomDutyProdyct.id,
      amount: 1,
      price: 50,
      product: lowCustomDutyProdyct,
    };
    it('should be return products taxes - low taxes', () => {
      const productTaxe = new ProductTaxes({});
      productTaxe.setFromCompleteShopingProduct(completeShopingProduct1);

      expect(productTaxe).toMatchObject({
        _id: highCustomDutyProdyct.id,
        _name: highCustomDutyProdyct.name,
        _amount: 1,
        _unitPrice: 50,
        _vat: 20,
        _customDuty: 12,
      });
    });
    it('should be return products taxes - high taxes', () => {
      const productTaxe = new ProductTaxes({});
      productTaxe.setFromCompleteShopingProduct(completeShopingProduct2);

      expect(productTaxe).toMatchObject({
        _id: lowCustomDutyProdyct.id,
        _name: lowCustomDutyProdyct.name,
        _amount: 1,
        _unitPrice: 50,
        _vat: 20,
        _customDuty: 5,
      });
    });
  });
});
