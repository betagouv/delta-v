import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { News } from '../../../src/entities/news.entity';

const buildSchema = (): News => {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.word(),
    content: faker.lorem.paragraph(),
    creationDate: faker.date.past(),
    tags: [],
  };
};

export const newsEntityFactory = (args?: Partial<News>): News =>
  buildFactory<News>({
    ...buildSchema(),
  })(args);
