import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Declaration status change forbidden.',
    publicMessage: 'Declaration status change forbidden.',
    code: ErrorCodes.DECLARATION_STATUS_CHANGE_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
