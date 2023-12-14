import { SearchProductHistoryEntityInterface } from '../../../entities/searchProductHistory.entity';
import { SearchProductHistoryRepositoryInterface } from '../../../repositories/searchProductHistory.repository';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';

export interface GetSearchProductHistoryServiceOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
  searchProductHistoryRepository: SearchProductHistoryRepositoryInterface;
}

export const service = async ({
  userId,
  userRepository,
  searchProductHistoryRepository,
}: GetSearchProductHistoryServiceOptions): Promise<SearchProductHistoryEntityInterface[]> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  return (await searchProductHistoryRepository.getByAgentId(
    userId,
    true,
  )) as SearchProductHistoryEntityInterface[];
};
