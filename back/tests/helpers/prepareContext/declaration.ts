import { DeclarationEntityInterface } from '../../../src/entities/declaration.entity';
import { declarationEntityFactory } from '../factories/declaration.factory';
import { ITestDbManager } from '../testDb.helper';

interface IPrepareContextDeclarationOptions {
  testDb: ITestDbManager;
  dataDeclaration?: Partial<DeclarationEntityInterface>;
  saveDeclaration?: boolean;
}

export const prepareContextDeclaration = async ({
  testDb,
  dataDeclaration = {},
  saveDeclaration = true,
}: IPrepareContextDeclarationOptions): Promise<DeclarationEntityInterface> => {
  const declaration = declarationEntityFactory(dataDeclaration);

  if (saveDeclaration) {
    await testDb.persistDeclaration(declaration);
  }

  return declaration;
};
