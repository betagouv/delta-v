import { Repository } from 'typeorm';
import UserEntity, { User } from '../entities/user.entity';
import { AppDataSource } from '../loader/database';

export type UserRepositoryInterface = Repository<UserEntity> & {
  getOneByEmail(email: string): Promise<User | null>;
  getOneById(id: string): Promise<User | null>;
  createUser(user: User): Promise<void>;
  updateUser(userId: string, user: Partial<User>): Promise<void>;
  validateUserAccount(id: string): Promise<void>;
};

export const UserRepository: UserRepositoryInterface = AppDataSource.getRepository(
  UserEntity,
).extend({
  async createUser(user: User): Promise<void> {
    await this.createQueryBuilder('user').insert().into(UserEntity).values(user).execute();
  },
  async updateUser(userId: string, user: Partial<User>): Promise<void> {
    await this.createQueryBuilder('user').update().set(user).where({ id: userId }).execute();
  },
  getOneByEmail(email: string): Promise<User | null> {
    return this.createQueryBuilder('user').where('user.email ILIKE :email', { email }).getOne();
  },
  getOneById(id: string): Promise<User | null> {
    return this.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
  },
  async validateUserAccount(id: string): Promise<void> {
    await this.createQueryBuilder('user')
      .update(UserEntity)
      .set({ enabled: true })
      .where({ id })
      .execute();
  },
});
