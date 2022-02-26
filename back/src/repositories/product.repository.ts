import { EntityRepository, TreeRepository } from 'typeorm';
import { Product, ProductEntity } from '../entities/product.entity';

export interface ProductRepositoryInterface extends TreeRepository<ProductEntity> {
  getAll(): Promise<Product[]>;
}

@EntityRepository(ProductEntity)
export default class ProductRepository extends TreeRepository<ProductEntity> {
  getAll(): Promise<Product[]> {
    return this.findTrees();
  }
}
