import { Repository } from 'typeorm';
import { News, NewsEntity } from '../entities/news.entity';
import { AppDataSource } from '../loader/database';
import ActualityQueryBuilder from './queryBuilders/actuality.queryBuilder';

interface GetAllOptions {
  limit: number;
  offset: number;
  search?: string;
  tags?: string;
  startDate?: Date;
  endDate?: Date;
}

export type UpdateActuality = Partial<Omit<News, 'id'>>;

export type ActualityRepositoryInterface = {
  getOne(actualityId: string): Promise<News | null>;
  getAll(options: GetAllOptions): Promise<News[]>;
} & Repository<NewsEntity>;

export const ActualityRepository: ActualityRepositoryInterface = AppDataSource.getRepository(
  NewsEntity,
).extend({
  actualityQueryBuilder(): ActualityQueryBuilder {
    return new ActualityQueryBuilder(this.createQueryBuilder('actuality'));
  },
  createOne(actuality: News): Promise<News> {
    return this.save(actuality);
  },
  getOne(actualityId: string): Promise<News | null> {
    return this.createQueryBuilder('actuality')
      .addSelect('actuality.products')
      .where('actuality.id = :actualityId', {
        actualityId,
      })
      .getOne();
  },
  getAll({ limit, offset, search, tags, startDate, endDate }: GetAllOptions): Promise<News[]> {
    const query = this.actualityQueryBuilder()
      .whereSearch(search)
      .whereTags(tags)
      .whereStartDate(startDate)
      .whereEndDate(endDate)
      .orderBy('actuality.creationDate', 'DESC')
      .limit(limit)
      .offset(offset);

    return query.getMany();
  },
});
