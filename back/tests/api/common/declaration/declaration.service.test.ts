import { MeansOfTransport } from '../../../../src/api/common/enums/meansOfTransport.enum';
import { UNIQUE_CUSTOM_DUTY } from '../../../../src/entities/productTaxes.entity';
import { DeclarationFactory } from '../../../helpers/factories/declaration.factory';
import { DetailedShoppingProductFactory } from '../../../helpers/factories/detailedShoppingProduct.factory';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { ShoppingProductFactory } from '../../../helpers/factories/shoppingProduct.factory';

describe('declaration', () => {
  it('should take under franchise rate', () => {
    const detailedShoppingProduct1 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 10 }),
      product: productEntityFactory({ customDuty: 10 }),
    });
    const detailedShoppingProduct2 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 10 }),
      product: productEntityFactory({ customDuty: 10 }),
    });
    const detailedShoppingProduct3 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 10 }),
      product: productEntityFactory({ customDuty: 10 }),
    });
    const detailedShoppingProduct4 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 10 }),
      product: productEntityFactory({ customDuty: 10 }),
    });
    const detailedShoppingProduct = DeclarationFactory({
      shoppingProducts: [
        detailedShoppingProduct1.shoppingProduct,
        detailedShoppingProduct2.shoppingProduct,
        detailedShoppingProduct3.shoppingProduct,
        detailedShoppingProduct4.shoppingProduct,
      ],
      detailedShoppingProducts: [
        detailedShoppingProduct1,
        detailedShoppingProduct2,
        detailedShoppingProduct3,
        detailedShoppingProduct4,
      ],
      travelerData: {
        age: 30,
        border: false,
        country: 'US',
        meanOfTransport: MeansOfTransport.PLANE,
      },
    });

    const productsTaxes = detailedShoppingProduct.getRealProductsTaxes();

    productsTaxes.forEach((productTaxes) => {
      expect(productTaxes.customDuty === 0).toBeTruthy();
    });
  });
  it('should take usual custom duty', () => {
    const productCustomDuty = 10;
    const detailedShoppingProduct1 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 300 }),
      product: productEntityFactory({ customDuty: productCustomDuty }),
    });
    const detailedShoppingProduct2 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 300 }),
      product: productEntityFactory({ customDuty: productCustomDuty }),
    });
    const detailedShoppingProduct3 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 300 }),
      product: productEntityFactory({ customDuty: productCustomDuty }),
    });
    const detailedShoppingProduct4 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 300 }),
      product: productEntityFactory({ customDuty: productCustomDuty }),
    });
    const detailedShoppingProduct = DeclarationFactory({
      shoppingProducts: [
        detailedShoppingProduct1.shoppingProduct,
        detailedShoppingProduct2.shoppingProduct,
        detailedShoppingProduct3.shoppingProduct,
        detailedShoppingProduct4.shoppingProduct,
      ],
      detailedShoppingProducts: [
        detailedShoppingProduct1,
        detailedShoppingProduct2,
        detailedShoppingProduct3,
        detailedShoppingProduct4,
      ],
      travelerData: {
        age: 30,
        border: false,
        country: 'US',
        meanOfTransport: MeansOfTransport.PLANE,
      },
    });

    const productsTaxes = detailedShoppingProduct.getRealProductsTaxes();

    const freeProduct = productsTaxes.filter((productTaxes) => productTaxes.customDuty === 0);

    expect(freeProduct.length === 1).toBeTruthy();

    const usualRateProduct = productsTaxes.filter(
      (productTaxes) => productTaxes.customDuty === productCustomDuty,
    );

    expect(usualRateProduct.length === 3).toBeTruthy();
  });
  it('should take unique custom duty', () => {
    const productCustomDuty = 10;
    const detailedShoppingProduct1 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 150 }),
      product: productEntityFactory({ customDuty: productCustomDuty }),
    });
    const detailedShoppingProduct2 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 150 }),
      product: productEntityFactory({ customDuty: productCustomDuty }),
    });
    const detailedShoppingProduct3 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 150 }),
      product: productEntityFactory({ customDuty: productCustomDuty }),
    });
    const detailedShoppingProduct4 = DetailedShoppingProductFactory({
      shoppingProduct: ShoppingProductFactory({ originalValue: 150 }),
      product: productEntityFactory({ customDuty: productCustomDuty }),
    });
    const detailedShoppingProduct = DeclarationFactory({
      shoppingProducts: [
        detailedShoppingProduct1.shoppingProduct,
        detailedShoppingProduct2.shoppingProduct,
        detailedShoppingProduct3.shoppingProduct,
        detailedShoppingProduct4.shoppingProduct,
      ],
      detailedShoppingProducts: [
        detailedShoppingProduct1,
        detailedShoppingProduct2,
        detailedShoppingProduct3,
        detailedShoppingProduct4,
      ],
      travelerData: {
        age: 30,
        border: false,
        country: 'US',
        meanOfTransport: MeansOfTransport.PLANE,
      },
    });

    const productsTaxes = detailedShoppingProduct.getRealProductsTaxes();

    const freeProduct = productsTaxes.filter((productTaxes) => productTaxes.customDuty === 0);

    expect(freeProduct.length === 2).toBeTruthy();

    const usualRateProduct = productsTaxes.filter(
      (productTaxes) => productTaxes.customDuty === UNIQUE_CUSTOM_DUTY,
    );

    expect(usualRateProduct.length === 2).toBeTruthy();
  });
});
