import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Unauthorized access',
    publicMessage: 'Invalid token',
    code: ErrorCodes.INVALID_TOKEN_UNAUTHORIZED,
    statusCode: HttpStatuses.UNAUTHORIZED,
  });
