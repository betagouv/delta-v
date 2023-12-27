import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Favorite not found',
    publicMessage: 'Favoris introuvable',
    code: ErrorCodes.FAVORITE_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
