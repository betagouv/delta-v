import { hash, genSalt } from 'bcrypt';
import { IProcessor } from 'typeorm-fixtures-cli';
import { User } from '../../src/entities/user.entity';

const preProcessUserFixture = async (fields: User): Promise<Partial<User>> => {
  const { password, ...values } = fields;
  const salt = await genSalt(10);
  const passwordHash = await hash(password, salt);
  return { ...values, password: passwordHash };
};

export default class UserProcessor implements IProcessor<User> {
  async preProcess(name: string, fields: User): Promise<Partial<User>> {
    return preProcessUserFixture(fields);
  }
}
