import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (id?: string): IAppError =>
  buildError({
    message: 'Product not found',
    publicMessage: 'Product not found',
    code: ErrorCodes.PRODUCT_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
    context: {
      id,
    },
  });
