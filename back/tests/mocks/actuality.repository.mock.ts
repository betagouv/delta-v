import { News } from '../../src/entities/news.entity';
import { AppDataSource } from '../../src/loader/database';
import {
  ActualityRepository,
  ActualityRepositoryInterface,
} from '../../src/repositories/actuality.repository';

interface ActualityRepositoryMockOptions {
  getAll?: News[];
}

export const actualityRepositoryMock = (
  options: ActualityRepositoryMockOptions,
): ActualityRepositoryInterface => {
  const actualityRepository = AppDataSource.manager.withRepository(ActualityRepository);
  actualityRepository.getAll = jest.fn().mockResolvedValue(options.getAll);
  return actualityRepository;
};
