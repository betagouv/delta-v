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
  ): Promise<SearchProductHistory[] | SearchProductHistoryEntityInterface[]>;
  removeOld(userId: string): Promise<void>;
} & Repository<SearchProductHistoryEntity>;

export const SearchProductHistoryRepository: SearchProductHistoryRepositoryInterface =
  AppDataSource.getRepository(SearchProductHistoryEntity).extend({
    createOne(searchProductHistory: SearchProductHistory): Promise<SearchProductHistory> {
      return this.save(searchProductHistory);
    },
    getByAgentId(agentId: string, withProducts?: boolean) {
      if (withProducts) {
        return this.createQueryBuilder('search_product_history')
          .leftJoinAndSelect('search_product_history.product', 'product')
          .where({ userId: agentId })
          .orderBy('search_product_history.searchDate', 'DESC')
          .getMany();
      }
      return this.createQueryBuilder('search_product_history').where({ userId: agentId }).getMany();
    },
    async removeOld(userId: string) {
      const subRequest = AppDataSource.getRepository(SearchProductHistoryEntity)
        .createQueryBuilder('search_product_history')
        .select('search_product_history.productId')
        .where('search_product_history.userId = :userId', { userId })
        .orderBy('search_product_history.searchDate', 'DESC')
        .limit(3)
        .getQuery();

      await this.createQueryBuilder('search_product_history')
        .delete()
        .from(SearchProductHistoryEntity)
        .where(`productId NOT IN (${subRequest})`)
        .andWhere('userId = :userId')
        .setParameter('userId', userId)
        .execute();
    },
  });
