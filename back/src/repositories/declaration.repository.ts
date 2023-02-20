import { EntityRepository, TreeRepository } from 'typeorm';
import { DeclarationEntity, DeclarationEntityInterface } from '../entities/declaration.entity';

export interface DeclarationRepositoryInterface extends TreeRepository<DeclarationEntity> {
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface>;
}

@EntityRepository(DeclarationEntity)
export default class DeclarationRepository
  extends TreeRepository<DeclarationEntity>
  implements DeclarationRepositoryInterface
{
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface> {
    return this.save(declaration);
  }
}
