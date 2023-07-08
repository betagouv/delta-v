import {
  DeclarationEntityInterface,
  DeclarationStatus,
} from '../../../../entities/declaration.entity';
import declarationStatusChangeCustomProductForbiddenError from '../../../common/errors/declarationStatusChangeCustomProductForbidden.error';

export const checkCustomProducts = (
  declaration: DeclarationEntityInterface,
  newStatus: DeclarationStatus,
): void => {
  const badStatusWithCustomProducts = [DeclarationStatus.VALIDATED, DeclarationStatus.PAID];
  declaration.products.forEach((product) => {
    if (!product.id && badStatusWithCustomProducts.includes(newStatus)) {
      throw declarationStatusChangeCustomProductForbiddenError();
    }
  });
};
