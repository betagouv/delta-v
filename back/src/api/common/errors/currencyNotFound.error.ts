import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Currency not found',
    publicMessage: 'Currency not found',
    code: ErrorCodes.CURRENCY_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
