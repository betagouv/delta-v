import path from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { buildConfig } from './databaseConfig';

const config = buildConfig();
const buildPath = (ext: string): string => path.resolve(__dirname, '..', 'migrations', `*.${ext}`);

export const entitiesPath = path.join(__dirname, '..', 'entities');

const dbEnvConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: config.POSTGRESQL_ADDON_URI,
  entities: [path.join(entitiesPath, '**', '*.ts'), path.join(entitiesPath, '**', '*.js')],
  logging: config.DB_LOGGING,
  synchronize: false,
  migrations: [buildPath('ts'), buildPath('js')],
};

export const AppDataSource = new DataSource(dbEnvConfig);

export const initDatabase = async (): Promise<void> => {
  await AppDataSource.initialize();
};
