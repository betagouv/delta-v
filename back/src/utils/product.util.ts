import { Product } from '../entities/product.entity';

export const sortProducts = (productA: Product, productB: Product): number => {
  return productA.positionRank.localeCompare(productB.positionRank);
};
