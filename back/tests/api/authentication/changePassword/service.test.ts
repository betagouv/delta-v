/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import service, {
  IChangePasswordServiceOptions,
} from '../../../../src/api/authentication/changePassword/service';
import { passwordRegex } from '../../../../src/api/authentication/common/const/regex';
import { hashPassword } from '../../../../src/api/authentication/common/services/password.service';
import userNotFoundError from '../../../../src/api/common/errors/userNotFound.error';
import badCredentialsError from '../../../../src/api/common/errors/badCredentials.error';

interface IPrepareValidContextResponse {
  serviceOptions: IChangePasswordServiceOptions;
}

const prepareValidContext = async (): Promise<IPrepareValidContextResponse> => {
  const oldPassword = faker.helpers.fromRegExp(passwordRegex);
  const hashedOldPassword = await hashPassword(oldPassword);
  const newPassword = faker.helpers.fromRegExp(passwordRegex);
  const user = userEntityFactory({ password: hashedOldPassword });
  const userRepository = userRepositoryMock({ getOneById: user });

  const serviceOptions: IChangePasswordServiceOptions = {
    oldPassword,
    newPassword,
    userId: user.id,
    userRepository,
  };
  return {
    serviceOptions,
  };
};

describe('change password service', () => {
  it('should change password with success', async () => {
    const { serviceOptions } = await prepareValidContext();
    await service({
      ...serviceOptions,
    });
    expect(serviceOptions.userRepository.updateUser).toHaveBeenCalled();
  });

  it('should not change password - user not found', async () => {
    const { serviceOptions } = await prepareValidContext();
    const userRepository = userRepositoryMock({ getOneById: null });
    await expect(
      service({
        ...serviceOptions,
        userRepository,
      }),
    ).rejects.toThrow(userNotFoundError());

    expect(serviceOptions.userRepository.updateUser).not.toHaveBeenCalled();
  });

  it('should not change password - invalid old password', async () => {
    const { serviceOptions } = await prepareValidContext();
    const invalidOldPassword = faker.helpers.fromRegExp(passwordRegex);
    await expect(
      service({
        ...serviceOptions,
        oldPassword: invalidOldPassword,
      }),
    ).rejects.toThrow(badCredentialsError());

    expect(serviceOptions.userRepository.updateUser).not.toHaveBeenCalled();
  });
});
