import path from 'path';
import { createConnection, Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { buildConfig } from './databaseConfig';

export const buildConnectionOptions = (
  connectionConfig?: PostgresConnectionOptions,
): PostgresConnectionOptions => {
  const config = buildConfig();
  const buildPath = (ext: string): string =>
    path.resolve(__dirname, '..', 'migrations', `*.${ext}`);

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
    cli: {
      migrationsDir: './src/migrations',
    },
    ...connectionConfig,
  };

  return dbEnvConfig;
};

export const initDatabase = (connectionConfig?: PostgresConnectionOptions): Promise<Connection> => {
  return createConnection(buildConnectionOptions(connectionConfig));
};

export const entitiesPath = path.join(__dirname, '..', 'entities');
