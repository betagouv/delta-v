import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'No product to simulate',
    publicMessage: 'No product to simulate',
    code: ErrorCodes.NO_PRODUCT_TO_SIMULATE,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
