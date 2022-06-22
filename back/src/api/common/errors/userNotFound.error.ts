import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';

export default (): IAppError =>
  buildError({
    message: 'Product not found',
    publicMessage: 'Product not found',
    code: 'user-not-found',
    statusCode: HttpStatuses.NOT_FOUND,
  });
