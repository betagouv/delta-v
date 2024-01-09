import { ProductRepositoryInterface } from '../../../repositories/product.repository';
import { SearchProductHistoryRepositoryInterface } from '../../../repositories/searchProductHistory.repository';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import productNotFoundError from '../../common/errors/productNotFound.error';
import userNotFoundError from '../../common/errors/userNotFound.error';

export interface PutSearchProductHistoryServiceOptions {
  productId: string;
  searchValue?: string;
  userId: string;
  productRepository: ProductRepositoryInterface;
  userRepository: UserRepositoryInterface;
  searchProductHistoryRepository: SearchProductHistoryRepositoryInterface;
}

export const service = async ({
  productId,
  searchValue,
  userId,
  productRepository,
  userRepository,
  searchProductHistoryRepository,
}: PutSearchProductHistoryServiceOptions): Promise<void> => {
  const product = await productRepository.getOneById(productId);
  if (!product) {
    throw productNotFoundError();
  }

  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  await searchProductHistoryRepository.createOne({
    productId,
    userId,
    searchValue,
    searchDate: new Date(),
  });
  await searchProductHistoryRepository.removeOld(userId);
};
