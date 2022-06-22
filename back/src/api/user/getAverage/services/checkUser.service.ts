import { User } from '../../../../entities/user.entity';
import userForbiddenError from '../../../common/errors/userForbidden.error';
import userNotFoundError from '../../../common/errors/userNotFound.error';

export const checkUser = (user?: User): void => {
  if (!user) {
    throw userNotFoundError();
  }

  if (user.ban) {
    throw userForbiddenError();
  }
};
