import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { User } from '../../../src/entities/user.entity';

const buildSchema = (): User => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  password: faker.lorem.word(),
  blocked: false,
  enabled: true,
});

export const userEntityFactory = (args?: Partial<User>): User =>
  buildFactory<User>({
    ...buildSchema(),
  })(args);
