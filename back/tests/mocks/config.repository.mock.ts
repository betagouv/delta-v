import { Config } from '../../src/entities/config.entity';
import { AppDataSource } from '../../src/loader/database';
import {
  ConfigRepository,
  ConfigRepositoryInterface,
} from '../../src/repositories/config.repository';

interface ConfigRepositoryMockOptions {
  putOne?: null;
  getOne?: Config;
}

export const configRepositoryMock = (
  options: ConfigRepositoryMockOptions,
): ConfigRepositoryInterface => {
  const configRepository = AppDataSource.manager.withRepository(ConfigRepository);
  configRepository.putOne = jest.fn().mockResolvedValue(null);
  configRepository.getOne = jest.fn().mockResolvedValue(options.getOne);
  return configRepository;
};
