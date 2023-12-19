import {
  SearchProductHistory,
  SearchProductHistoryEntityInterface,
} from '../../src/entities/searchProductHistory.entity';
import { AppDataSource } from '../../src/loader/database';
import {
  SearchProductHistoryRepository,
  SearchProductHistoryRepositoryInterface,
} from '../../src/repositories/searchProductHistory.repository';

interface SearchProductHistoryRepositoryMockOptions {
  getByAgentId?: SearchProductHistory[] | SearchProductHistoryEntityInterface[] | null;
}

export const searchProductHistoryRepositoryMock = ({
  getByAgentId,
}: SearchProductHistoryRepositoryMockOptions): SearchProductHistoryRepositoryInterface => {
  const searchProductHistoryRepository = AppDataSource.manager.withRepository(
    SearchProductHistoryRepository,
  );
  searchProductHistoryRepository.createOne = jest.fn().mockResolvedValue(undefined);
  searchProductHistoryRepository.getByAgentId = jest.fn().mockResolvedValue(getByAgentId);
  searchProductHistoryRepository.removeOld = jest.fn().mockResolvedValue(undefined);
  return searchProductHistoryRepository;
};
