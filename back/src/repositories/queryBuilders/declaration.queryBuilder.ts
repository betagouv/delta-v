import { Brackets, SelectQueryBuilder } from 'typeorm';
import { DeclarationEntityInterface } from '../../entities/declaration.entity';

export default class DeclarationQueryBuilder extends SelectQueryBuilder<DeclarationEntityInterface> {
  public whereSearch(search?: string): this {
    if (search) {
      this.setParameter('search', `%${search}%`).andWhere(
        new Brackets((qb) => {
          qb.orWhere('declaration.publicId ILIKE :searchStartWith', {
            searchStartWith: `${search}%`,
          })
            .orWhere('declaration.declarantEmail ILIKE :search')
            .orWhere('declaration.declarantLastName ILIKE :search')
            .orWhere('declaration.declarantFirstName ILIKE :search');
        }),
      );
    }

    return this;
  }

  public whereStatus(status?: string): this {
    if (status) {
      this.andWhere(':status ~ declaration.status::text', { status });
    }

    return this;
  }

  public whereMeanOfTransports(meanOfTransports?: string): this {
    if (meanOfTransports) {
      this.andWhere(':meanOfTransports ~ declaration.declarantMeanOfTransport', {
        meanOfTransports,
      });
    }

    return this;
  }

  public whereStartDate(startDate?: Date): this {
    if (startDate) {
      this.andWhere('declaration.versionDate >= :startDate', {
        startDate,
      });
    }

    return this;
  }

  public whereEndDate(endDate?: Date): this {
    if (endDate) {
      this.andWhere('declaration.versionDate <= :endDate', {
        endDate,
      });
    }

    return this;
  }

  public whereSearchPublicId(searchPublicId?: string): this {
    if (searchPublicId) {
      this.andWhere('declaration.publicId ILIKE :searchPublicId', {
        searchPublicId: `${searchPublicId}%`,
      });
    }

    return this;
  }
}
