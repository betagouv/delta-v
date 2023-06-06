import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { Feedback } from '../../../src/entities/feedback.entity';

const buildSchema = (): Feedback => {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    comment: faker.lorem.sentence(),
    email: faker.internet.email(),
  };
};

export const feedbackEntityFactory = (args?: Partial<Feedback>): Feedback =>
  buildFactory<Feedback>({
    ...buildSchema(),
  })(args);
