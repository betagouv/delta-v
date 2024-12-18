import { faker } from '@faker-js/faker';
import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';
import { TravelerData } from '../../../src/api/common/services/traveler';
import { buildFactory } from '../../../src/core/testHelpers';

export const buildSchema = (): TravelerData => ({
  age: faker.number.int({ min: 1, max: 100 }),
  border: faker.datatype.boolean(),
  country: 'FR',
  meanOfTransport: MeansOfTransport.PLANE,
});

export const travelerDataFactory = (args?: Partial<TravelerData>): TravelerData =>
  buildFactory<TravelerData>({
    ...buildSchema(),
  })(args);
