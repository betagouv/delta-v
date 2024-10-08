import { IProcessor } from 'typeorm-fixtures-cli';
import { User } from '../../src/entities/user.entity';

const preProcessUserFixture = (fields: User): Partial<User> => {
  const { ...values } = fields;
  return { ...values };
};

export default class UserProcessor implements IProcessor<User> {
  preProcess(name: string, fields: User): Partial<User> {
    return preProcessUserFixture(fields);
  }
}
