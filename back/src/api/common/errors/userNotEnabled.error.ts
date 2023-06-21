import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User not enabled',
    publicMessage: 'Compte non activé',
    code: ErrorCodes.USER_NOT_ENABLED_UNAUTHORIZED,
    statusCode: HttpStatuses.UNAUTHORIZED,
  });
