import { Product } from '../../../entities/product.entity';
import { ProductRepositoryInterface } from '../../../repositories/product.repository';
import productNotFoundError from '../../common/errors/productNotFound.error';

export interface ShoppingProduct {
  id: string;
  customId: string;
  customName?: string;
  value: number;
}

export interface CompleteShoppingProduct extends ShoppingProduct {
  product: Product;
}

interface GetAllProductsOptions {
  shoppingProducts: ShoppingProduct[];
  productRepository: ProductRepositoryInterface;
}

export const getCompleteProducts = async ({
  shoppingProducts,
  productRepository,
}: GetAllProductsOptions): Promise<CompleteShoppingProduct[]> => {
  const productIds = shoppingProducts.map(({ id }) => id);
  const products = await productRepository.getManyByIds(productIds);

  return getCompleteShoppingProducts(shoppingProducts, products);
};

const getCompleteShoppingProduct = (
  shoppingProduct: ShoppingProduct,
  products: Product[],
): CompleteShoppingProduct => {
  const currentProduct = products.find((product) => product.id === shoppingProduct.id);

  if (!currentProduct) {
    throw productNotFoundError(shoppingProduct.id);
  }

  return {
    ...shoppingProduct,
    product: currentProduct,
  };
};

export const getCompleteShoppingProducts = (
  shoppingProducts: ShoppingProduct[],
  products: Product[],
): CompleteShoppingProduct[] => {
  return shoppingProducts.map((shoppingProduct) =>
    getCompleteShoppingProduct(shoppingProduct, products),
  );
};
