import { service } from '../../../../src/api/user/getAverage/service';
import { User } from '../../../../src/entities/user.entity';
import { userRepositoryMock } from '../../../mocks/user.repository.mock';

describe('Test getAverage Service', () => {
  it('should return average and status correctly', async () => {
    const userId = 'e22730cc-499e-4863-8695-5e0d073c2fc9';
    const user: User = {
      id: userId,
      ban: false,
      notes: [10, 14, 18],
    };
    const userRepository = userRepositoryMock({ getOne: user });

    const result = await service({ userId, userRepository });

    expect(result).toMatchObject({ average: 14, status: 'accepted' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(userRepository.getOne).toBeCalledWith(userId);
  });
});
