import { EntityRepository, Repository } from 'typeorm';
import { User, UserEntity } from '../entities/user.entity';

export interface UserRepositoryInterface extends Repository<UserEntity> {
  getOne(id: string): Promise<User | undefined>;
}

@EntityRepository(UserEntity)
export default class UserRepository
  extends Repository<UserEntity>
  implements UserRepositoryInterface
{
  getOne(id: string): Promise<User | undefined> {
    return this.createQueryBuilder().where({ id }).getOne();
  }
}
