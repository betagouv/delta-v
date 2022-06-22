import { v4 as uuidv4 } from 'uuid';
import { checkUser } from '../../../../../src/api/user/getAverage/services/checkUser.service';
import { User } from '../../../../../src/entities/user.entity';

describe('test checkUser', () => {
  it('should be ok', () => {
    const user: User = {
      id: uuidv4(),
      ban: false,
      notes: [10, 15, 20],
    };

    checkUser(user);
  });
  it('should return error 404 - user not found', () => {
    const user = undefined;

    expect.assertions(2);
    try {
      checkUser(user);
    } catch (error: any) {
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe('user-not-found');
    }
  });
  it('should return error 403 - user not found', () => {
    const user: User = {
      id: uuidv4(),
      ban: true,
      notes: [10, 15, 20],
    };

    expect.assertions(2);
    try {
      checkUser(user);
    } catch (error: any) {
      expect(error.statusCode).toBe(403);
      expect(error.code).toBe('user-forbidden');
    }
  });
});
