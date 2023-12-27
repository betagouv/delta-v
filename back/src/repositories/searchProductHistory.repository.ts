/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import {
  SearchProductHistory,
  SearchProductHistoryEntity,
  SearchProductHistoryEntityInterface,
} from '../entities/searchProductHistory.entity';

export type SearchProductHistoryRepositoryInterface = {
  createOne(searchProductHistory: SearchProductHistory): Promise<SearchProductHistory>;
  getByAgentId(
    agentId: string,
    withProducts?: boolean,
  ): Promise<SearchProductHistoryEntityInterface[]>;
  removeOld(userId: string): Promise<void>;
} & Repository<SearchProductHistoryEntity>;

export const SearchProductHistoryRepository: SearchProductHistoryRepositoryInterface =
  AppDataSource.getRepository(SearchProductHistoryEntity).extend({
    createOne(searchProductHistory: SearchProductHistory): Promise<SearchProductHistory> {
      return this.save(searchProductHistory);
    },
    getByAgentId(agentId: string, withProducts?: boolean) {
      const query = this.createQueryBuilder('search_product_history')
        .where({ userId: agentId })
        .orderBy('search_product_history.searchDate', 'DESC');
      if (withProducts) {
        query.leftJoinAndSelect('search_product_history.product', 'product');
      }
      return query.getMany();
    },
    async removeOld(userId: string) {
      const mostRecentInHistorySubRequest = AppDataSource.getRepository(SearchProductHistoryEntity)
        .createQueryBuilder('search_product_history')
        .select('search_product_history.productId')
        .where('search_product_history.userId = :userId', { userId })
        .orderBy('search_product_history.searchDate', 'DESC')
        .limit(10)
        .getQuery();

      await this.createQueryBuilder('search_product_history')
        .delete()
        .from(SearchProductHistoryEntity)
        .where(`productId NOT IN (${mostRecentInHistorySubRequest})`)
        .andWhere('userId = :userId', { userId })
        .execute();
    },
  });
