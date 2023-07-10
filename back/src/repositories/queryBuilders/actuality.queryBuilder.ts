import { Brackets, SelectQueryBuilder } from 'typeorm';
import { News } from '../../entities/news.entity';

export default class ActualityQueryBuilder extends SelectQueryBuilder<News> {
  public whereSearch(search?: string): this {
    if (!search) {
      return this;
    }

    return this.setParameter('search', `%${search}%`).andWhere(
      new Brackets((qb) => {
        qb.orWhere('actuality.title ILIKE :search').orWhere('actuality.content ILIKE :search');
      }),
    );
  }

  public whereTags(tags?: string): this {
    if (!tags) {
      return this;
    }

    const newTags = tags.split(',');
    return this.andWhere(
      new Brackets((qb) => {
        newTags.map((tag) => {
          qb.orWhere(`actuality.tags ~ :${tag}`, { [tag]: tag });
        });
      }),
    );
  }

  public whereStartDate(startDate?: Date): this {
    if (!startDate) {
      return this;
    }

    return this.andWhere('actuality.creationDate >= :startDate', {
      startDate,
    });
  }

  public whereEndDate(endDate?: Date): this {
    if (!endDate) {
      return this;
    }

    return this.andWhere('actuality.creationDate <= :endDate', {
      endDate,
    });
  }
}
