import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { SearchProductHistory } from '../../../src/entities/searchProductHistory.entity';

const buildSchema = (): SearchProductHistory => {
  return {
    productId: faker.string.uuid(),
    userId: faker.string.uuid(),
    searchDate: faker.date.past(),
  };
};

export const searchProductHistoryEntityFactory = (
  args?: Partial<SearchProductHistory>,
): SearchProductHistory =>
  buildFactory<SearchProductHistory>({
    ...buildSchema(),
  })(args);
