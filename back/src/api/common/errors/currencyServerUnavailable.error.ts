import { ErrorCodes } from '../enums/errorCodes.enum';
import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (context: any): IAppError =>
  buildError({
    message: 'Unable to sync currencies',
    publicMessage: 'Unable to sync currencies',
    code: ErrorCodes.CURRENCIES_SERVER_UNAVAILABLE,
    statusCode: HttpStatuses.SERVICE_UNAVAILABLE,
    context,
  });
