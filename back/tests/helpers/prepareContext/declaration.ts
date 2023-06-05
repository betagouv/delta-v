import { DeclarationEntityInterface } from '../../../src/entities/declaration.entity';
import { declarationEntityFactory } from '../factories/declaration.factory';
import { ITestDbManager } from '../testDb.helper';

interface IPrepareContextDeclarationOptions {
  testDb: ITestDbManager;
  saveDeclaration?: boolean;
}

export const prepareContextDeclaration = async ({
  testDb,
  saveDeclaration = true,
}: IPrepareContextDeclarationOptions): Promise<DeclarationEntityInterface> => {
  const declaration = declarationEntityFactory({});

  if (saveDeclaration) {
    await testDb.persistDeclaration(declaration);
  }

  return declaration;
};
