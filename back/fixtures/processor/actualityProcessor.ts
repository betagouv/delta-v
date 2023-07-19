import { IProcessor } from 'typeorm-fixtures-cli';
import { faker } from '@faker-js/faker';
import { NewsEntity, NewsTags } from '../../src/entities/news.entity';

const preProcessActualityFixture = (fields: NewsEntity): Partial<NewsEntity> => {
  const firstElement = faker.helpers.arrayElement([
    NewsTags.NOMENCLATURE,
    NewsTags.LEGAL,
    NewsTags.TAXES,
  ]);
  const { ...values } = fields;
  return {
    ...values,
    id: faker.string.uuid(),
    title: faker.lorem.word(),
    content: faker.lorem.paragraph(),
    creationDate: faker.date.past(),
    tags:
      faker.number.int({ min: 1, max: 2 }) % 2 === 0
        ? [firstElement]
        : [
            firstElement,
            faker.helpers.arrayElement(
              [NewsTags.NOMENCLATURE, NewsTags.LEGAL, NewsTags.TAXES].filter(
                (tag) => tag !== firstElement,
              ),
            ),
          ],
  };
};

export default class ActualityProcessor implements IProcessor<NewsEntity> {
  preProcess(name: string, fields: NewsEntity): Partial<NewsEntity> {
    return preProcessActualityFixture(fields);
  }
}
