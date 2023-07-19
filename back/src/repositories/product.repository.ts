import { TreeRepository } from 'typeorm';
import { Product, ProductEntity } from '../entities/product.entity';
import { AppDataSource } from '../loader/database';

export type ProductRepositoryInterface = {
  getAll(): Promise<Product[]>;
  getManyByIds(ids: string[]): Product[] | Promise<Product[]>;
} & TreeRepository<ProductEntity>;

export const ProductRepository: ProductRepositoryInterface = AppDataSource.getTreeRepository(
  ProductEntity,
).extend({
  getAll(): Promise<Product[]> {
    return this.findTrees();
  },
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
  },
});
