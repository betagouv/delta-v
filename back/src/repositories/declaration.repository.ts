import { Repository } from 'typeorm';
import { DeclarationEntity, DeclarationEntityInterface } from '../entities/declaration.entity';
import { AppDataSource } from '../loader/database';
import DeclarationQueryBuilder from './queryBuilders/declaration.queryBuilder';

interface GetAllOptions {
  limit: number;
  offset: number;
  search?: string;
  searchPublicId?: string;
}

export type UpdateDeclaration = Partial<Omit<DeclarationEntityInterface, 'id'>>;

export type DeclarationRepositoryInterface = {
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface>;
  getOne(declarationId: string): Promise<DeclarationEntityInterface | null>;
  updateOne(declarationId: string, declaration: UpdateDeclaration): Promise<void>;
  getAll(options: GetAllOptions): Promise<DeclarationEntityInterface[]>;
  getOneWithPublicId(publicDeclarationId: string): Promise<DeclarationEntityInterface | null>;
} & Repository<DeclarationEntity>;

export const DeclarationRepository: DeclarationRepositoryInterface = AppDataSource.getRepository(
  DeclarationEntity,
).extend({
  declarationQueryBuilder(): DeclarationQueryBuilder {
    return new DeclarationQueryBuilder(this.createQueryBuilder('declaration'));
  },
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface> {
    return this.save(declaration);
  },
  getOne(declarationId: string): Promise<DeclarationEntityInterface | null> {
    return this.createQueryBuilder('declaration')
      .addSelect('declaration.products')
      .where('declaration.id = :declarationId', {
        declarationId,
      })
      .getOne();
  },
  async updateOne(declarationId, declaration) {
    await this.createQueryBuilder('declaration')
      .update(DeclarationEntity)
      .set(declaration)
      .where({ id: declarationId })
      .execute();
  },
  getOneWithPublicId(publicDeclarationId: string): Promise<DeclarationEntityInterface | null> {
    return this.createQueryBuilder('declaration')
      .addSelect('declaration.products')
      .where('declaration.publicId = :publicDeclarationId', {
        publicDeclarationId,
      })
      .getOne();
  },
  getAll({
    limit,
    offset,
    search,
    searchPublicId,
  }: GetAllOptions): Promise<DeclarationEntityInterface[]> {
    const query = this.declarationQueryBuilder()
      .addSelect('declaration.products')
      .whereSearch(search)
      .whereSearchPublicId(searchPublicId)
      .limit(limit)
      .offset(offset);

    return query.getMany();
  },
});
