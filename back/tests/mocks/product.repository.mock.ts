import { Product } from '../../src/entities/product.entity';
import { AppDataSource } from '../../src/loader/database';
import {
  ProductRepository,
  ProductRepositoryInterface,
} from '../../src/repositories/product.repository';

interface IProductMockOptions {
  getAll?: Product[] | null;
  getManyByIds?: Product[];
  getOneById?: Product | null;
}

export const productRepositoryMock = (options: IProductMockOptions): ProductRepositoryInterface => {
  const productRepository = AppDataSource.manager.withRepository(ProductRepository);
  productRepository.getAll = jest.fn().mockResolvedValue(options.getAll);
  productRepository.getManyByIds = jest.fn().mockResolvedValue(options.getManyByIds);
  productRepository.getOneById = jest.fn().mockResolvedValue(options.getOneById);
  return productRepository;
};
