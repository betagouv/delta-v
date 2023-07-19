import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Declaration status change forbidden - custom product in the basket.',
    publicMessage:
      'Changement de statut de déclaration non autorisé. Il y a un produit non référencé dans notre base de données dans le panier.',
    code: ErrorCodes.DECLARATION_CUSTOM_PRODUCT_STATUS_CHANGE_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
