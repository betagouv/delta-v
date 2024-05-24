import { DataSource } from 'typeorm';
import { Currency, CurrencyEntity } from '../../src/entities/currency.entity';
import {
  DeclarationEntity,
  DeclarationEntityInterface,
} from '../../src/entities/declaration.entity';
import { Product, ProductEntity } from '../../src/entities/product.entity';
import { AppDataSource, initDatabase } from '../../src/loader/database';
import UserEntity, { User } from '../../src/entities/user.entity';
import { News, NewsEntity } from '../../src/entities/news.entity';
import { FavoriteEntity, FavoriteEntityInterface } from '../../src/entities/favorite.entity';
import {
  SearchProductHistory,
  SearchProductHistoryEntity,
} from '../../src/entities/searchProductHistory.entity';
import { ConfigEntity, ConfigEntityInterface } from '../../src/entities/config.entity';

export interface ITestDbManager {
  getConnection: () => DataSource;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  persistProduct: (args: Product) => Promise<Product>;
  persistSearchProductHistory: (args: SearchProductHistory) => Promise<SearchProductHistory>;
  persistCurrency: (args: Currency) => Promise<Currency>;
  persistUser: (args: User) => Promise<User>;
  persistDeclaration: (args: DeclarationEntityInterface) => Promise<DeclarationEntityInterface>;
  persistActuality: (args: News) => Promise<News>;
  persistFavorite: (args: FavoriteEntityInterface) => Promise<FavoriteEntityInterface>;
  persistConfig: (args: ConfigEntityInterface) => Promise<ConfigEntityInterface>;
  getCurrencies: () => Promise<Currency[]>;
  getDeclarations: () => Promise<DeclarationEntityInterface[]>;
  getDeclaration: (id: string) => Promise<DeclarationEntityInterface | null>;
  getUser: (id: string) => Promise<User | null>;
  getSearchProductHistory: (
    productId: string,
    userId: string,
  ) => Promise<SearchProductHistory | null>;
  clear: () => Promise<void>;
}

const ENTITIES = [
  SearchProductHistoryEntity,
  DeclarationEntity,
  ProductEntity,
  CurrencyEntity,
  UserEntity,
  NewsEntity,
  FavoriteEntity,
  ConfigEntity,
];

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
    persistSearchProductHistory: async (
      args: SearchProductHistory,
    ): Promise<SearchProductHistory> => connection.manager.save(SearchProductHistoryEntity, args),
    persistCurrency: async (args: Currency): Promise<Currency> =>
      connection.manager.save(CurrencyEntity, args),
    persistUser: async (args: User): Promise<User> => connection.manager.save(UserEntity, args),
    persistDeclaration: async (
      args: DeclarationEntityInterface,
    ): Promise<DeclarationEntityInterface> => connection.manager.save(DeclarationEntity, args),
    persistFavorite: async (args: FavoriteEntityInterface): Promise<FavoriteEntityInterface> =>
      connection.manager.save(FavoriteEntity, args),
    persistConfig: async (args: ConfigEntityInterface): Promise<ConfigEntityInterface> =>
      connection.manager.save(ConfigEntity, args),
    persistActuality: async (args: News): Promise<News> =>
      connection.manager.save(NewsEntity, args),
    getCurrencies: async (): Promise<Currency[]> => connection.manager.find(CurrencyEntity),
    getDeclarations: async (): Promise<DeclarationEntity[]> =>
      connection.manager.find(DeclarationEntity),
    getDeclaration: async (id: string): Promise<DeclarationEntity | null> =>
      connection.manager
        .createQueryBuilder(DeclarationEntity, 'declaration')
        .addSelect('declaration.products')
        .where('declaration.id = :id', { id })
        .getOne(),
    getUser: async (id: string): Promise<User | null> =>
      connection.manager.findOne(UserEntity, { where: { id } }),
    getSearchProductHistory: async (
      productId: string,
      userId: string,
    ): Promise<SearchProductHistory | null> =>
      connection.manager.findOne(SearchProductHistoryEntity, { where: { productId, userId } }),
    clear: async (): Promise<void> => {
      for (const entity of ENTITIES) {
        await connection.manager.delete(entity, true);
      }
    },
  };
};
