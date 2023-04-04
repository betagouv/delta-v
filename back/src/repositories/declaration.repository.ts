import { Repository } from 'typeorm';
import { DeclarationEntity, DeclarationEntityInterface } from '../entities/declaration.entity';
import { AppDataSource } from '../loader/database';

export type DeclarationRepositoryInterface = {
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface>;
<<<<<<< HEAD
} & Repository<DeclarationEntity>;
=======
  getOne(declarationId: string): Promise<DeclarationEntityInterface | undefined>;
}
>>>>>>> 1b4a787 (WIP)

export const DeclarationRepository: DeclarationRepositoryInterface = AppDataSource.getRepository(
  DeclarationEntity,
).extend({
  createOne(declaration: DeclarationEntityInterface): Promise<DeclarationEntityInterface> {
    return this.save(declaration);
<<<<<<< HEAD
  },
});
=======
  }

  getOne(declarationId: string): Promise<DeclarationEntityInterface | undefined> {
    return this.createQueryBuilder('declaration')
      .where('declaration.id = :declarationId', {
        declarationId,
      })
      .getOne();
  }
}
>>>>>>> 1b4a787 (WIP)
