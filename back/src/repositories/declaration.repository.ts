import { Repository } from 'typeorm';
import { DeclarationEntity, DeclarationEntityInterface } from '../entities/declaration.entity';
import { AppDataSource } from '../loader/database';

export type UpdateDeclaration = Partial<Omit<DeclarationEntityInterface, 'id'>>;

export type DeclarationRepositoryInterface = {
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface>;
  getOne(declarationId: string): Promise<DeclarationEntityInterface | null>;
  updateOne(declarationId: string, declaration: UpdateDeclaration): Promise<void>;
} & Repository<DeclarationEntity>;

export const DeclarationRepository: DeclarationRepositoryInterface = AppDataSource.getRepository(
  DeclarationEntity,
).extend({
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
});
