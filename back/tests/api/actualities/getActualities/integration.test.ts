import request from 'supertest';
import api from '../../../../src/api';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { prepareContextActuality } from '../../../helpers/prepareContext/actuality';
import { News, NewsTags } from '../../../../src/entities/news.entity';
import { newsEntityFactory } from '../../../helpers/factories/news.factory';

const testApp = buildTestApp(api);
const testDb = testDbManager();

describe('getActualities endpoint', () => {
  beforeAll(async () => {
    await testDb.connect();
  });

  beforeEach(async () => {
    await testDb.clear();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });
  it('should return a actuality', async () => {
    const dataActuality: Partial<News> = {
      title: 'AZER5aeba268YUIOPQ',
      content: 'AZERTYUIOPQ 5aeba268 AZERTYUIOPQ',
      tags: [NewsTags.NOMENCLATURE],
      creationDate: new Date('10/10/2020'),
    };
    const actuality = [];
    actuality.push(
      await prepareContextActuality({
        testDb,
        dataActuality: newsEntityFactory(dataActuality),
      }),
    );
    actuality.push(
      await prepareContextActuality({
        testDb,
        dataActuality: newsEntityFactory({
          ...dataActuality,
          content: 'AZERTYUIOPQ AZERTYUIOPQ',
        }),
      }),
    );
    actuality.push(
      await prepareContextActuality({
        testDb,
        dataActuality: newsEntityFactory({
          ...dataActuality,
          title: 'AZERT5YUIOPQ',
        }),
      }),
    );
    actuality.push(
      await prepareContextActuality({
        testDb,
        dataActuality: newsEntityFactory({
          ...dataActuality,
          tags: [NewsTags.TAXES],
        }),
      }),
    );
    actuality.push(
      await prepareContextActuality({
        testDb,
        dataActuality: newsEntityFactory({
          ...dataActuality,
          creationDate: new Date('10/10/2021'),
        }),
      }),
    );
    const { status, body } = await request(testApp)
      .get(`/api/actuality`)
      .query({
        search: '5aeba268',
        tags: NewsTags.NOMENCLATURE,
        startDate: new Date('10/10/2020'),
        endDate: new Date('11/10/2020'),
      });
    expect(status).toBe(200);

    expect(body.actualities.length).toBe(3);
    expect(body.actualities).toMatchObject([
      {
        id: actuality[0].id,
      },
      {
        id: actuality[1].id,
      },
      {
        id: actuality[2].id,
      },
    ]);
  });
  it('should return 200 with empty array', async () => {
    await prepareContextActuality({ testDb });
    const actuality = await prepareContextActuality({ testDb, saveActuality: false });

    const { status, body } = await request(testApp)
      .get(`/api/actuality`)
      .query({
        search: `${actuality.id.slice(0, 6)}ABC`,
      });

    expect(status).toBe(200);
    expect(body.actualities).toEqual([]);
  });
});
