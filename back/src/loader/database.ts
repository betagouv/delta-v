import path from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';
import { buildConfig } from './databaseConfig';

const config = buildConfig();
const buildPath = (ext: string): string => path.resolve(__dirname, '..', 'migrations', `*.${ext}`);

export const entitiesPath = path.join(__dirname, '..', 'entities');

const cache: Pick<BaseConnectionOptions, 'cache'> =
  process.env.NODE_ENV !== 'test'
    ? {
        cache: {
          type: 'ioredis',
          options: config.DB_CACHE_REDIS_URL,
        },
      }
    : {};

const dbEnvConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  entities: [path.join(entitiesPath, '**', '*.ts'), path.join(entitiesPath, '**', '*.js')],
  logging: config.DB_LOGGING,
  synchronize: false,
  migrations: [buildPath('ts'), buildPath('js')],
  ...cache,
};

export const AppDataSource = new DataSource(dbEnvConfig);

export const initDatabase = async (): Promise<void> => {
  await AppDataSource.initialize();
};
