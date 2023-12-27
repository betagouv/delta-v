import { SearchProductHistoryEntityInterface } from '../../../entities/searchProductHistory.entity';
import { SearchProductHistoryRepositoryInterface } from '../../../repositories/searchProductHistory.repository';

export interface GetSearchProductHistoryServiceOptions {
  userId: string;
  searchProductHistoryRepository: SearchProductHistoryRepositoryInterface;
}

export const service = async ({
  userId,
  searchProductHistoryRepository,
}: GetSearchProductHistoryServiceOptions): Promise<SearchProductHistoryEntityInterface[]> => {
  return searchProductHistoryRepository.getByAgentId(userId, true);
};
