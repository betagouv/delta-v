import { Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import { Config, ConfigEntity } from '../entities/config.entity';

export type ConfigRepositoryInterface = {
  putOne(config: Config): Promise<void>;
  getOne(userId: string): Promise<Config | null>;
} & Repository<ConfigEntity>;

export const ConfigRepository: ConfigRepositoryInterface = AppDataSource.getRepository(
  ConfigEntity,
).extend({
  async putOne(config: Config): Promise<void> {
    await this.save(config);
  },

  async getOne(userId: string): Promise<Config | null> {
    return await this.createQueryBuilder('config')
      .where('config.userId = :userId', { userId })
      .getOne();
  },
});
