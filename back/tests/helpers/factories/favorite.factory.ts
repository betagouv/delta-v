import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { Favorite } from '../../../src/entities/favorite.entity';

const buildSchema = (): Favorite => {
  return {
    productId: faker.string.uuid(),
    userId: faker.string.uuid(),
  };
};

export const favoriteEntityFactory = (args?: Partial<Favorite>): Favorite =>
  buildFactory<Favorite>({
    ...buildSchema(),
  })(args);
