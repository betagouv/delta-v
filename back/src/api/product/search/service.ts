import jsonata from 'jsonata';
import { Product } from '../../../entities/product.entity';
import { ProductRepositoryInterface } from '../../../repositories/product.repository';

interface GetAllProductService {
  search: string;
  productRepository: ProductRepositoryInterface;
}

const searchProducts = (search: string, products: Product[]): Product[] => {
  const result =
    jsonata(`products.**[\`name\` ~> /${search}/i or \`info\` ~> /${search}/i]`).evaluate({
      products,
    }) ?? [];

  delete result.sequence;

  return result;
};

export const service = async ({
  search,
  productRepository,
}: GetAllProductService): Promise<Product[]> => {
  const allProducts = await productRepository.getAll();

  return searchProducts(search, allProducts);
};
