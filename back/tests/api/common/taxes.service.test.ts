import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';
import { ProductTaxes } from '../../../src/entities/productTaxes.entity';
import { currencyEntityFactory } from '../../helpers/factories/currency.factory';
import { DeclarationFactory } from '../../helpers/factories/declaration.factory';
import { DetailedShoppingProductFactory } from '../../helpers/factories/detailedShoppingProduct.factory';
import { productEntityFactory } from '../../helpers/factories/product.factory';
import { ShoppingProductFactory } from '../../helpers/factories/shoppingProduct.factory';
describe('taxes service', () => {
  describe('manageProductTaxesDetails', () => {
    test.each([
      [5, 750, 5],
      [2.5, 650, 5],
      [2, 650, 2],
    ])(
      'should use %p custom duty - total = %p and CustomDuty product = %p',
      (expectedUsedCustomDuty, total, productCustomDuty) => {
        const declaration = DeclarationFactory({
          travelerData: {
            age: 30,
            border: false,
            country: 'US',
            meanOfTransport: MeansOfTransport.PLANE,
          },
          detailedShoppingProducts: [
            DetailedShoppingProductFactory({
              shoppingProduct: ShoppingProductFactory({ originalValue: total }),
              product: productEntityFactory({ customDuty: productCustomDuty, vat: 20 }),
              currency: currencyEntityFactory({ value: 1 }),
            }),
          ],
        });

        const productsTaxes = declaration.getRealProductsTaxes();

        expect(productsTaxes[0].customDuty).toBe(expectedUsedCustomDuty);
      },
    );
  });
  describe('getProductTaxesDetails', () => {
    const highCustomDutyProduct = productEntityFactory({ customDuty: 12, vat: 20 });
    const lowCustomDutyProduct = productEntityFactory({ customDuty: 5, vat: 20 });
    const detailedShoppingProduct1 = DetailedShoppingProductFactory({
      shoppingProduct: { id: highCustomDutyProduct.id },
      product: highCustomDutyProduct,
      currency: currencyEntityFactory({ value: 1 }),
    });
    const detailedShoppingProduct2 = DetailedShoppingProductFactory({
      shoppingProduct: { id: lowCustomDutyProduct.id },
      product: lowCustomDutyProduct,
      currency: currencyEntityFactory({ value: 1 }),
    });

    it('should be return products taxes - low taxes', () => {
      const productTaxes = new ProductTaxes({});
      productTaxes.setFromDetailedShoppingProduct(detailedShoppingProduct1);

      expect(productTaxes).toMatchObject({
        _id: highCustomDutyProduct.id,
        _name: highCustomDutyProduct.name,
        _unitPrice: detailedShoppingProduct1.shoppingProduct.originalValue,
        _vat: detailedShoppingProduct1.product?.vat,
        _customDuty: detailedShoppingProduct1.product?.customDuty,
      });
    });
    it('should be return products taxes - high taxes', () => {
      const productTaxes = new ProductTaxes({});
      productTaxes.setFromDetailedShoppingProduct(detailedShoppingProduct2);

      expect(productTaxes).toMatchObject({
        _id: lowCustomDutyProduct.id,
        _name: lowCustomDutyProduct.name,
        _unitPrice: detailedShoppingProduct2.shoppingProduct.originalValue,
        _vat: detailedShoppingProduct2.product?.vat,
        _customDuty: detailedShoppingProduct2.product?.customDuty,
      });
    });
  });
});
