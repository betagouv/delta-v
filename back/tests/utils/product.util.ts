import { Product } from '../../src/entities/product.entity';

export interface LiteProduct {
  id: string;
  subProducts?: LiteProduct[];
}

export const cleanTreeProducts = (product: Product, withSubproducts = true): LiteProduct => {
  const liteProduct: LiteProduct = {
    id: product.id,
  };
  if (withSubproducts && product.subProducts) {
    liteProduct.subProducts = product.subProducts.map((product) =>
      cleanTreeProducts(product, withSubproducts),
    );
  }

  return liteProduct;
};
