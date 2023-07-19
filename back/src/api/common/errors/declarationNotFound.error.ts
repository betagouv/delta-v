import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (id?: string): IAppError =>
  buildError({
    message: 'Declaration not found',
    publicMessage: 'Declaration introuvable',
    code: ErrorCodes.DECLARATION_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
    context: {
      id,
    },
  });
