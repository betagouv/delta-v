import { Brackets, SelectQueryBuilder } from 'typeorm';
import { DeclarationEntityInterface } from '../../entities/declaration.entity';

export default class DeclarationQueryBuilder extends SelectQueryBuilder<DeclarationEntityInterface> {
  public whereSearch(search?: string): this {
    if (search) {
      this.andWhere(
        new Brackets((qb) => {
          qb.orWhere('declaration.id ILIKE :search', { search: `%${search}%` })
            .orWhere('declaration.declarantEmail ILIKE :search', { search: `%${search}%` })
            .orWhere('declaration.declarantLastName ILIKE :search', { search: `%${search}%` })
            .orWhere('declaration.declarantFirstName ILIKE :search', { search: `%${search}%` });
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

  public whereSearchPublicId(searchPublicId?: string): this {
    if (searchPublicId) {
      this.andWhere('declaration.publicId ~ :searchPublicId', { searchPublicId });
    }

    return this;
  }
}
