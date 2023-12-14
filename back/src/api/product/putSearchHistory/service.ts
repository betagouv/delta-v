import { ProductRepositoryInterface } from '../../../repositories/product.repository';
import { SearchProductHistoryRepositoryInterface } from '../../../repositories/searchProductHistory.repository';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import productNotFoundError from '../../common/errors/productNotFound.error';
import userNotFoundError from '../../common/errors/userNotFound.error';

export interface PatchSearchProductHistoryOptions {
  productId: string;
  userId: string;
  productRepository: ProductRepositoryInterface;
  userRepository: UserRepositoryInterface;
  searchProductHistoryRepository: SearchProductHistoryRepositoryInterface;
}

export const service = async ({
  productId,
  userId,
  productRepository,
  userRepository,
  searchProductHistoryRepository,
}: PatchSearchProductHistoryOptions): Promise<void> => {
  const product = await productRepository.getManyByIds([productId]);
  if (product.length < 1) {
    throw productNotFoundError();
  }

  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  await searchProductHistoryRepository.createOne({ productId, userId, searchDate: new Date() });
  await searchProductHistoryRepository.removeOld(userId);
};
