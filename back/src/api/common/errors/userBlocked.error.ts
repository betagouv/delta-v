import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User blocked',
    publicMessage: 'User blocked',
    code: ErrorCodes.USER_BLOCKED_UNAUTHORIZED,
    statusCode: HttpStatuses.UNAUTHORIZED,
  });
