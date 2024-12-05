import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Unauthorized: Only customs officers emails are allowed',
    publicMessage: 'Email non autorisé',
    code: ErrorCodes.UNAUTHORIZED_EMAIL,
    statusCode: HttpStatuses.UNAUTHORIZED,
  });
