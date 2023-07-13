import {
  DeclarationEntityInterface,
  DeclarationStatus,
} from '../../../../entities/declaration.entity';
import { ProductDisplayTypes } from '../../../../entities/product.entity';
import { ProductRepositoryInterface } from '../../../../repositories/product.repository';
import declarationStatusChangeCustomProductForbiddenError from '../../../common/errors/declarationStatusChangeCustomProductForbidden.error';
import { DetailedShoppingProduct } from '../../../common/services/detailedShoppingProduct';
import { initDetailedShoppingProductsWithoutCurrencies } from '../../../common/services/detailedShoppingProduct/detailedShoppingProducts';

interface CheckCustomProductsOptions {
  declaration: DeclarationEntityInterface;
  newStatus: DeclarationStatus;
  productRepository: ProductRepositoryInterface;
}

const isNotManagedProduct = (shoppingProduct: DetailedShoppingProduct): boolean => {
  if (!shoppingProduct.shoppingProduct?.id) {
    return true;
  }

  if (shoppingProduct.product?.productDisplayTypes === ProductDisplayTypes.notManaged) {
    return true;
  }

  return false;
};

export const checkCustomProducts = async ({
  declaration,
  newStatus,
  productRepository,
}: CheckCustomProductsOptions): Promise<void> => {
  const isUnderFranchise = declaration.franchiseAmount > declaration.totalAmount;
  if (isUnderFranchise) {
    return;
  }

  const detailedShoppingProducts = await initDetailedShoppingProductsWithoutCurrencies({
    shoppingProducts: declaration.products,
    productRepository,
  });

  const badStatusWithCustomProducts = [DeclarationStatus.VALIDATED, DeclarationStatus.PAID];
  detailedShoppingProducts.forEach((shoppingProduct) => {
    if (isNotManagedProduct(shoppingProduct) && badStatusWithCustomProducts.includes(newStatus)) {
      throw declarationStatusChangeCustomProductForbiddenError();
    }
  });
};
