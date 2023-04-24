import { DataSource } from 'typeorm';
import { Currency, CurrencyEntity } from '../../src/entities/currency.entity';
import {
  DeclarationEntity,
  DeclarationEntityInterface,
} from '../../src/entities/declaration.entity';
import { Product, ProductEntity } from '../../src/entities/product.entity';
import { AppDataSource, initDatabase } from '../../src/loader/database';

export interface ITestDbManager {
  getConnection: () => DataSource;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  persistProduct: (args: Product) => Promise<Product>;
  persistCurrency: (args: Currency) => Promise<Currency>;
  getCurrencies: () => Promise<Currency[]>;
  getDeclarations: () => Promise<DeclarationEntityInterface[]>;
  clear: () => Promise<void>;
}

const ENTITIES = [DeclarationEntity, ProductEntity, CurrencyEntity];

export const testDbManager = (): ITestDbManager => {
  const connection = AppDataSource;

  return {
    getConnection: (): DataSource => connection,
    connect: async (): Promise<void> => {
      await initDatabase();
    },
    disconnect: async (): Promise<void> => {
      await connection.destroy();
    },
    persistProduct: async (args: Product): Promise<Product> =>
      connection.manager.save(ProductEntity, args),
    persistCurrency: async (args: Currency): Promise<Currency> =>
      connection.manager.save(CurrencyEntity, args),
    getCurrencies: async (): Promise<Currency[]> => connection.manager.find(CurrencyEntity),
    getDeclarations: async (): Promise<DeclarationEntity[]> =>
      connection.manager.find(DeclarationEntity),
    clear: async (): Promise<void> => {
      await Promise.all(
        ENTITIES.map(async (entity) => {
          await connection.manager.delete(entity, true);
        }),
      );
    },
  };
};
