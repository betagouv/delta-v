/* eslint-disable @typescript-eslint/unbound-method */
import { userRepositoryMock } from '../../../mocks/user.repository.mock';
import { userEntityFactory } from '../../../helpers/factories/user.factory';
import service from '../../../../src/api/authentication/validateEmail/service';
import invalidTokenError from '../../../../src/api/common/errors/invalidToken.error';
import { generateValidationToken } from '../../../../src/core/jwt/generateToken';
import userNotFoundError from '../../../../src/api/common/errors/userNotFound.error';
import userBlockedError from '../../../../src/api/common/errors/userBlocked.error';

describe('refresh service', () => {
  it('should refresh token correctly', async () => {
    const user = userEntityFactory({});
    const token = await generateValidationToken({ userId: user.id, email: user.email });
    const userRepository = userRepositoryMock({ getOneById: user });

    await service({
      token,
      userRepository,
    });

    expect(userRepository.getOneById).toBeCalledWith(user.id);
  });
  it('should not refresh token - refresh token not found', async () => {
    const token = '9a0948fe-df90-4141-87e4-995ab7b790cf';
    const user = userEntityFactory({});
    const userRepository = userRepositoryMock({ getOneById: user });

    await expect(
      service({
        token,
        userRepository,
      }),
    ).rejects.toMatchObject(invalidTokenError());
  });
  it('should not refresh token - user not found in database', async () => {
    const user = userEntityFactory({});
    const token = await generateValidationToken({ userId: user.id, email: user.email });
    const userRepository = userRepositoryMock({ getOneById: undefined });

    await expect(
      service({
        token,
        userRepository,
      }),
    ).rejects.toMatchObject(userNotFoundError());
  });
  it('should not refresh token - user blocked', async () => {
    const user = userEntityFactory({ blocked: true });
    const token = await generateValidationToken({ userId: user.id, email: user.email });
    const userRepository = userRepositoryMock({ getOneById: user });

    await expect(
      service({
        token,
        userRepository,
      }),
    ).rejects.toMatchObject(userBlockedError());
  });
});
