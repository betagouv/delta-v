import { faker } from '@faker-js/faker';
import { hashPassword } from '../../../src/api/authentication/common/services/password.service';
import { User } from '../../../src/entities/user.entity';
import { ITestDbManager } from '../testDb.helper';
import { userEntityFactory } from '../factories/user.factory';
import {
  generateAccessToken,
  generateRefreshToken,
<<<<<<< HEAD
  generateResetPasswordToken,
=======
>>>>>>> 7972cd9 (validate email endpoint)
  generateValidationToken,
} from '../../../src/core/jwt/generateToken';

interface IPrepareContextUserOptions {
  testDb: ITestDbManager;
  saveUser?: boolean;
  blocked?: boolean;
  enabled?: boolean;
  douaneEmail?: boolean;
  userId?: string;
  expiredRefreshToken?: boolean;
  addRefreshToken?: boolean;
<<<<<<< HEAD
=======
  addValidationToken?: boolean;
>>>>>>> 7972cd9 (validate email endpoint)
  addUpdateEmailToken?: boolean;
}

interface IPrepareContextUserResponse {
  user: User;
  clearPassword: string;
  accessToken: string;
  refreshToken: string | null;
  validationToken: string | null;
<<<<<<< HEAD
  resetPasswordToken: string | null;
=======
>>>>>>> 7972cd9 (validate email endpoint)
}

export const prepareContextUser = async ({
  testDb,
  blocked = false,
  enabled = true,
  saveUser = true,
  douaneEmail = true,
  userId = '8e339c8f-2187-46a9-8c30-aa15d3ebc330',
  expiredRefreshToken = false,
  addRefreshToken = false,
}: IPrepareContextUserOptions): Promise<IPrepareContextUserResponse> => {
  const password = 'Password95';
  const hashedPassword = await hashPassword(password);
  const user = userEntityFactory({
    password: hashedPassword,
    id: userId,
    blocked,
    enabled,
    email: douaneEmail
      ? `${faker.name.firstName().toLowerCase()}.${faker.name
          .lastName()
          .toLocaleLowerCase()}@douane.finances.gouv.fr`
      : faker.internet.email(),
  });

  if (saveUser) {
    await testDb.persistUser(user);
  }
  const accessToken = await generateAccessToken({ email: user.email, userId });
  const refreshToken = addRefreshToken
    ? await generateRefreshToken(
        {
          email: user.email,
          userId,
        },
        expiredRefreshToken ? '-1' : undefined,
      )
    : null;

  const validationToken = await generateValidationToken({ email: user.email, userId });
<<<<<<< HEAD
  const resetPasswordToken = await generateResetPasswordToken({ email: user.email, userId });
=======
>>>>>>> 7972cd9 (validate email endpoint)

  return {
    user,
    clearPassword: password,
    accessToken,
    refreshToken,
    validationToken,
<<<<<<< HEAD
    resetPasswordToken,
=======
>>>>>>> 7972cd9 (validate email endpoint)
  };
};
