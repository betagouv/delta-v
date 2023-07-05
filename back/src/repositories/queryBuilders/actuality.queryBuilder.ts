import { Brackets, SelectQueryBuilder } from 'typeorm';
import { News } from '../../entities/news.entity';

export default class ActualityQueryBuilder extends SelectQueryBuilder<News> {
  public whereSearch(search?: string): this {
    if (search) {
      this.setParameter('search', `%${search}%`).andWhere(
        new Brackets((qb) => {
          qb.orWhere('actuality.title ILIKE :search').orWhere('actuality.content ILIKE :search');
        }),
      );
    }

    return this;
  }

  public whereTags(tags?: string): this {
    if (tags) {
      const newTags = tags.split(',');
      this.andWhere(
        new Brackets((qb) => {
          newTags.map((tag, index) => {
            const parameterName = `${tag}__${index}`;
            qb.orWhere(`actuality.tags ~ :${parameterName}`, { [parameterName]: tag });
          });
        }),
      );
    }

    return this;
  }

  public whereStartDate(startDate?: Date): this {
    if (startDate) {
      this.andWhere('actuality.creationDate >= :startDate', {
        startDate,
      });
    }

    return this;
  }

  public whereEndDate(endDate?: Date): this {
    if (endDate) {
      this.andWhere('actuality.creationDate <= :endDate', {
        endDate,
      });
    }

    return this;
  }
}
