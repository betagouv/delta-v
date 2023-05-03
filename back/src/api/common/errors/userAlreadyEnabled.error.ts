import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User already enabled',
    publicMessage: 'User already enabled',
    code: ErrorCodes.USER_ALREADY_ENABLED_UNAUTHORIZED,
    statusCode: HttpStatuses.UNAUTHORIZED,
  });
