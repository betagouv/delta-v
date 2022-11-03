import { Product } from '../../../entities/product.entity';
import { ProductRepositoryInterface } from '../../../repositories/product.repository';

interface GetAllProductService {
  productRepository: ProductRepositoryInterface;
}

export const service = async ({ productRepository }: GetAllProductService): Promise<Product[]> =>
  productRepository.getAll();
