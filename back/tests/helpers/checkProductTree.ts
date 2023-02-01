import { Product } from '../../src/entities/product.entity';

export const checkProductTree = (product: Product, expectedProduct?: Product): void => {
  expect(product.id).toEqual(expectedProduct?.id);
  if (product.subProducts) {
    if (!expectedProduct?.subProducts) {
      fail('expectedProduct.subProducts is undefined');
    }
    expect(product.subProducts.length).toEqual(expectedProduct.subProducts.length);
    product.subProducts.forEach((subProduct, index) => {
      checkProductTree(subProduct, expectedProduct.subProducts?.[index]);
    });
  }
};
