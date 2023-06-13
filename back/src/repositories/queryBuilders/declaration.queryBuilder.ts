import { Brackets, SelectQueryBuilder } from 'typeorm';
import { DeclarationEntityInterface } from '../../entities/declaration.entity';

export default class DeclarationQueryBuilder extends SelectQueryBuilder<DeclarationEntityInterface> {
  public whereSearch(search?: string): this {
    if (search) {
      this.andWhere(
        new Brackets((qb) => {
          qb.orWhere('declaration.description ILIKE :search', { search: `%${search}%` })
            .orWhere('declaration.id ILIKE :search', { search: `%${search}%` })
            .orWhere('declaration.address ILIKE :search', { search: `%${search}%` })
            .orWhere('declaration.email ILIKE :search', { search: `%${search}%` })
            .orWhere('department.name ILIKE :search', { search: `%${search}%` })
            .orWhere('department.description ILIKE :search', { search: `%${search}%` })
            .orWhere('agent.firstName ILIKE :search', { search: `%${search}%` })
            .orWhere('agent.lastName ILIKE :search', { search: `%${search}%` });
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
