import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Email not provided',
    publicMessage: 'Email non fournie',
    code: ErrorCodes.EMAIL_NOT_PROVIDED,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
