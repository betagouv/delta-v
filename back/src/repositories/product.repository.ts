import { EntityRepository, TreeRepository } from 'typeorm';
import { Product, ProductEntity } from '../entities/product.entity';

export interface ProductRepositoryInterface extends TreeRepository<ProductEntity> {
  getAll(): Promise<Product[]>;
  getManyByIds(ids: string[]): Product[] | Promise<Product[]>;
}

@EntityRepository(ProductEntity)
export default class ProductRepository
  extends TreeRepository<ProductEntity>
  implements ProductRepositoryInterface
{
  getAll(): Promise<Product[]> {
    return this.findTrees();
  }
  getManyByIds(ids: string[]): Product[] | Promise<Product[]> {
    if (!ids.length) {
      return [];
    }
    return this.createQueryBuilder('product')
      .where('product.id IN (:...ids)')
      .setParameters({
        ids,
      })
      .getMany();
  }
}
