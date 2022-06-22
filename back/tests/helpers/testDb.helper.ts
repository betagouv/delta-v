import { Connection } from 'typeorm';
import { Product, ProductEntity } from '../../src/entities/product.entity';
import { User, UserEntity } from '../../src/entities/user.entity';
import { initDatabase } from '../../src/loader/database';

export interface ITestDbManager {
  getConnection: () => Connection;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  persistProduct: (args: Product) => Promise<Product>;
  persistUser: (args: User) => Promise<User>;
  clear: () => Promise<void>;
}

const ENTITIES = [ProductEntity, UserEntity];

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
    persistProduct: async (args: Product): Promise<Product> =>
      connection.manager.save(ProductEntity, args),
    persistUser: async (args: User): Promise<User> => connection.manager.save(UserEntity, args),
    clear: async (): Promise<void> => {
      await Promise.all(
        ENTITIES.map(async (entity) => {
          await connection.manager.delete(entity, true);
        }),
      );
    },
  };
};
