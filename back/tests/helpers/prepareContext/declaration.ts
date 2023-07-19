import {
  DeclarationEntityInterface,
  ProductDeclaration,
} from '../../../src/entities/declaration.entity';
import { declarationEntityFactory } from '../factories/declaration.factory';
import { productDeclarationFactory } from '../factories/productDeclaration.factory';
import { ITestDbManager } from '../testDb.helper';

interface IPrepareContextDeclarationOptions {
  testDb: ITestDbManager;
  dataDeclaration?: Partial<DeclarationEntityInterface>;
  saveDeclaration?: boolean;
  productDeclaration?: Partial<ProductDeclaration>;
}

export const prepareContextDeclaration = async ({
  testDb,
  dataDeclaration = {},
  saveDeclaration = true,
  productDeclaration,
}: IPrepareContextDeclarationOptions): Promise<DeclarationEntityInterface> => {
  const declaration = declarationEntityFactory(dataDeclaration);

  if (productDeclaration) {
    declaration.products = [productDeclarationFactory(productDeclaration)];
  }

  if (saveDeclaration) {
    await testDb.persistDeclaration(declaration);
  }

  return declaration;
};
