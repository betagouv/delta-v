import { hashPassword } from '../../../src/api/authentication/common/services/password.service';
import { generateAccessToken } from '../../../src/core/jwt/accessToken';
import { generateRefreshToken } from '../../../src/core/jwt/refreshToken';
import { User } from '../../../src/entities/user.entity';
import { ITestDbManager } from '../testDb.helper';
import { userEntityFactory } from '../factories/user.factory';

interface IPrepareContextUserOptions {
  testDb: ITestDbManager;
  saveUser?: boolean;
  blocked?: boolean;
  enabled?: boolean;
  userId?: string;
  expiredRefreshToken?: boolean;
  addRefreshToken?: boolean;
  addEmailValidationToken?: boolean;
  addUpdateEmailToken?: boolean;
  addResetPasswordToken?: boolean;
}

interface IPrepareContextUserResponse {
  user: User;
  clearPassword: string;
  accessToken: string;
  refreshToken: string | null;
}

export const prepareContextUser = async ({
  testDb,
  blocked = false,
  enabled = true,
  saveUser = true,
  userId = '8e339c8f-2187-46a9-8c30-aa15d3ebc330',
  expiredRefreshToken = false,
  addRefreshToken = false,
}: IPrepareContextUserOptions): Promise<IPrepareContextUserResponse> => {
  const password = 'Password95';
  const hashedPassword = await hashPassword(password);
  const user = userEntityFactory({ password: hashedPassword, id: userId, blocked, enabled });

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

  return {
    user,
    clearPassword: password,
    accessToken,
    refreshToken,
  };
};
