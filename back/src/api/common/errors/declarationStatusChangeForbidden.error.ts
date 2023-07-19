import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Declaration status change forbidden.',
    publicMessage: 'Changement de statut de déclaration non autorisé',
    code: ErrorCodes.DECLARATION_STATUS_CHANGE_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
