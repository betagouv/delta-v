import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Bad credentials',
    publicMessage: 'Informations de connexion incorrectes',
    code: ErrorCodes.BAD_CREDENTIALS,
    statusCode: HttpStatuses.UNAUTHORIZED,
  });
