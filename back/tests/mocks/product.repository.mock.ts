import { Product } from '../../src/entities/product.entity';
import ProductRepository, {
  ProductRepositoryInterface,
} from '../../src/repositories/product.repository';

interface IProductMockOptions {
  getAll?: Product[];
}

export const productRepositoryMock = (options: IProductMockOptions): ProductRepositoryInterface => {
  const productRepository = new ProductRepository();
  productRepository.getAll = jest.fn().mockResolvedValue(options.getAll);
  return productRepository;
};
