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
    const newStatus = status?.replace(',', '');
    if (status) {
      this.andWhere(':status ~ declaration.status::text', { status: newStatus });
    }

    return this;
  }

  public whereMeanOfTransports(meanOfTransports?: string): this {
    const newMeanOfTransports = meanOfTransports?.replace(',', '');
    if (meanOfTransports) {
      this.andWhere(':meanOfTransport ~ declaration.declarantMeanOfTransport', {
        meanOfTransport: newMeanOfTransports,
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
    console.log(
      '🚀 ~ file: declaration.queryBuilder.ts:53 ~ DeclarationQueryBuilder ~ whereEndDate ~ endDate:',
      endDate,
    );
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
