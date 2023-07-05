import { News } from '../../../src/entities/news.entity';
import { newsEntityFactory } from '../factories/news.factory';
import { ITestDbManager } from '../testDb.helper';

interface IPrepareContextActualityOptions {
  testDb: ITestDbManager;
  dataActuality?: Partial<News>;
  saveActuality?: boolean;
}

export const prepareContextActuality = async ({
  testDb,
  dataActuality = {},
  saveActuality = true,
}: IPrepareContextActualityOptions): Promise<News> => {
  const actuality = newsEntityFactory(dataActuality);

  if (saveActuality) {
    await testDb.persistActuality(actuality);
  }

  return actuality;
};
