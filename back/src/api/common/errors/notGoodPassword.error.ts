import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Mot de passe actuel incorrect',
    publicMessage: 'Le mot de passe saisi est incorrect',
    code: ErrorCodes.NOT_GOOD_PASSWORD,
    statusCode: HttpStatuses.UNAUTHORIZED,
    context: {
      validationErrors: [
        {
          name: 'currentPassword',
          message: 'Mot de passe actuel incorrect',
        },
      ],
    },
  });
