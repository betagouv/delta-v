import { Product } from '../../../../entities/product.entity';
import { ProductRepositoryInterface } from '../../../../repositories/product.repository';
import { ShoppingProduct } from '../shoppingProducts';

interface GetAllMatchingProductsOptions {
  shoppingProducts: ShoppingProduct[];
  productRepository: ProductRepositoryInterface;
}

export const getAllMatchingProducts = async ({
  shoppingProducts,
  productRepository,
}: GetAllMatchingProductsOptions): Promise<Product[]> => {
  const productIds = shoppingProducts.map(({ id }) => id).filter((id) => id) as string[];

  const uniqueProductIds = [...new Set(productIds)];

  return productRepository.getManyByIds(uniqueProductIds);
};
