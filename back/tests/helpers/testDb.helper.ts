import { Connection } from 'typeorm';
import { initDatabase } from '../../src/loader/database';
import TestEntity, { ITestEntity } from '../../src/entities/test.entity';

export interface ITestDbManager {
  getConnection: () => Connection;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  persistTest: (test: ITestEntity) => Promise<ITestEntity>;
  clear: () => Promise<void>;
}

const ENTITIES = [TestEntity];

export const testDbManager = (): ITestDbManager => {
  let connection: Connection;

  return {
    getConnection: (): Connection => connection,
    connect: async (): Promise<void> => {
      connection = await initDatabase();
    },
    disconnect: async (): Promise<void> => {
      await connection.close();
    },
    persistTest: async (args: ITestEntity): Promise<ITestEntity> =>
      connection.manager.save(TestEntity, args),
    clear: async (): Promise<void> => {
      await Promise.all(
        ENTITIES.map(async (entity) => {
          await connection.manager.delete(entity, true);
        }),
      );
    },
  };
};
