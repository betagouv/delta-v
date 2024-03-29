import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Register bad request error',
    publicMessage: 'Mauvaise requête',
    code: ErrorCodes.EMAIL_ALREADY_EXIST_BAD_REQUEST,
    statusCode: HttpStatuses.BAD_REQUEST,
    context: {
      validationErrors: [
        {
          name: 'email',
          message: 'Email déjà utilisé',
        },
      ],
    },
  });
