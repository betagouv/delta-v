import { Repository } from 'typeorm';
import { DeclarationEntity, DeclarationEntityInterface } from '../entities/declaration.entity';
import { AppDataSource } from '../loader/database';

export type DeclarationRepositoryInterface = {
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface>;
} & Repository<DeclarationEntity>;

export const DeclarationRepository: DeclarationRepositoryInterface = AppDataSource.getRepository(
  DeclarationEntity,
).extend({
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface> {
    return this.save(declaration);
  },
});
