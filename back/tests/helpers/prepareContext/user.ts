/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { faker } from '@faker-js/faker';
import { hashPassword } from '../../../src/api/authentication/common/services/password.service';
import { User } from '../../../src/entities/user.entity';
import { ITestDbManager } from '../testDb.helper';
import { userEntityFactory } from '../factories/user.factory';
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetPasswordToken,
  generateValidationToken,
} from '../../../src/core/jwt/generateToken';
// @typescript-eslint/no-unnecessary-type-assertion

interface IPrepareContextUserOptions {
  testDb: ITestDbManager;
  saveUser?: boolean;
  blocked?: boolean;
  enabled?: boolean;
  douaneEmail?: boolean;
  userId?: string;
  expiredRefreshToken?: boolean;
  addUpdateEmailToken?: boolean;
}

interface IPrepareContextUserResponse {
  user: User;
  clearPassword: string;
  accessToken: string;
  refreshToken: string | null;
  validationToken: string | null;
  resetPasswordToken: string | null;
}

export const prepareContextUser = async ({
  testDb,
  blocked = false,
  enabled = true,
  saveUser = true,
  douaneEmail = true,
  userId = '8e339c8f-2187-46a9-8c30-aa15d3ebc330',
  expiredRefreshToken = false,
}: IPrepareContextUserOptions): Promise<IPrepareContextUserResponse> => {
  const password = 'Password95*';
  const hashedPassword = await hashPassword(password);
  const user = userEntityFactory({
    password: hashedPassword,
    id: userId,
    blocked,
    enabled,
    email: douaneEmail
      ? `${faker.string.alpha({ casing: 'lower', length: 5 })}.${faker.string.alpha({
          casing: 'lower',
          length: 5,
        })}@douane.finances.gouv.fr`
      : faker.internet.email(),
  });

  if (saveUser) {
    await testDb.persistUser(user);
  }
  const accessToken = await generateAccessToken({
    email: user.email,
    userId,
    isAgent: true,
    name: 'John',
    lastName: 'Doe',
  });
  const refreshToken = await generateRefreshToken(
    {
      email: user.email,
      userId,
    },
    expiredRefreshToken ? '-1' : undefined,
  );
  const validationToken = await generateValidationToken({ email: user.email, userId });
  const resetPasswordToken = await generateResetPasswordToken({ email: user.email, userId });

  return {
    user,
    clearPassword: password,
    accessToken,
    refreshToken,
    validationToken,
    resetPasswordToken,
  };
};
