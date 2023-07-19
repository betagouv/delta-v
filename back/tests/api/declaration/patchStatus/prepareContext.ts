import {
  DeclarationEntity,
  DeclarationStatus,
  ProductDeclaration,
} from '../../../../src/entities/declaration.entity';
import { ProductDisplayTypes } from '../../../../src/entities/product.entity';
import { DeclarationRepositoryInterface } from '../../../../src/repositories/declaration.repository';
import { ProductRepositoryInterface } from '../../../../src/repositories/product.repository';
import { declarationEntityFactory } from '../../../helpers/factories/declaration.factory';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { productDeclarationFactory } from '../../../helpers/factories/productDeclaration.factory';
import { declarationRepositoryMock } from '../../../mocks/declaration.repository.mock';
import { productRepositoryMock } from '../../../mocks/product.repository.mock';

interface PrepareContextOptions {
  initialStatus: DeclarationStatus;
  addProduct?: ProductDeclaration;
  productUndefine?: boolean;
  defaultDeclaration?: Partial<DeclarationEntity>;
  notManagedProduct?: boolean;
}

interface PrepareContextResult {
  declarationRepository: DeclarationRepositoryInterface;
  productRepository: ProductRepositoryInterface;
  currentDeclaration: DeclarationEntity;
}

export const prepareContext = ({
  initialStatus,
  addProduct,
  productUndefine = false,
  defaultDeclaration = {},
  notManagedProduct = false,
}: PrepareContextOptions): PrepareContextResult => {
  const declarationProduct = productDeclarationFactory({ currency: 'EUR' });
  const productFactories = [productEntityFactory({ id: declarationProduct.id })];
  const currentDeclaration = declarationEntityFactory({
    ...defaultDeclaration,
    status: initialStatus,
    products: [declarationProduct],
  });

  if (addProduct) {
    currentDeclaration.products.push(addProduct);
  }

  if (addProduct && productUndefine) {
    productFactories.push(
      productEntityFactory({
        id: addProduct.id,
        productDisplayTypes: notManagedProduct
          ? ProductDisplayTypes.notManaged
          : ProductDisplayTypes.addable,
      }),
    );
  }

  const declarationRepository = declarationRepositoryMock({
    getOne: currentDeclaration,
  });

  const productRepository = productRepositoryMock({
    getManyByIds: productFactories,
  });

  return {
    declarationRepository,
    productRepository,
    currentDeclaration,
  };
};
