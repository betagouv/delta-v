import request from 'supertest';
import api from '../../../../src/api';
import buildTestApp from '../../../helpers/testApp.helper';
import { testDbManager } from '../../../helpers/testDb.helper';
import { prepareContextActuality } from '../../../helpers/prepareContext/actuality';
import { News, NewsTags } from '../../../../src/entities/news.entity';
import { newsEntityFactory } from '../../../helpers/factories/news.factory';
import { prepareContextUser } from '../../../helpers/prepareContext/user';

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
  it('should return only first actuality with content on search', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    const dataActuality: Partial<News> = {
      title: 'AZERYUIOPQ',
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
    const { status, body } = await request(testApp)
      .get(`/api/actuality`)
      .query({
        search: '5aeba268',
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(200);

    expect(body.actualities.length).toBe(1);
    expect(body.actualities).toMatchObject([
      {
        id: actuality[0].id,
      },
    ]);
  });
  it('should return only first actuality with title on search', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    const dataActuality: Partial<News> = {
      title: 'AZER5aeba268YUIOPQ',
      content: 'AZERTYUIOPQ AZERTYUIOPQ',
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
          title: 'AZERTYUIOPQ',
        }),
      }),
    );

    const { status, body } = await request(testApp)
      .get(`/api/actuality`)
      .query({
        search: '5aeba268',
      })
      .set('Authorization', `Bearer ${accessToken}`);
    expect(status).toBe(200);

    expect(body.actualities.length).toBe(1);
    expect(body.actualities).toMatchObject([
      {
        id: actuality[0].id,
      },
    ]);
  });
  it('should return only fist actuality with date between startDate and endDate', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
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
          creationDate: new Date('10/10/2021'),
        }),
      }),
    );
    const { status, body } = await request(testApp)
      .get(`/api/actuality`)
      .query({
        startDate: new Date('10/10/2020'),
        endDate: new Date('11/10/2020'),
      })
      .set('Authorization', `Bearer ${accessToken}`);
    expect(status).toBe(200);

    expect(body.actualities.length).toBe(1);
    expect(body.actualities).toMatchObject([
      {
        id: actuality[0].id,
      },
    ]);
  });
  it('should return all actualities with taxes or nomenclature tags', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    const dataActuality: Partial<News> = {
      title: 'AZER5aeba268YUIOPQ',
      content: 'AZERTYUIOPQ 5aeba268 AZERTYUIOPQ',
      tags: [NewsTags.LEGAL],
      creationDate: new Date('10/10/2020'),
    };
    const actuality = [];
    actuality.push(
      await prepareContextActuality({
        testDb,
      }),
    );
    actuality.push(
      await prepareContextActuality({
        testDb,
        dataActuality: newsEntityFactory({
          ...dataActuality,
          tags: [NewsTags.TAXES, NewsTags.NOMENCLATURE],
        }),
      }),
    );
    actuality.push(
      await prepareContextActuality({
        testDb,
        dataActuality: newsEntityFactory({
          ...dataActuality,
          tags: [NewsTags.TAXES, NewsTags.LEGAL],
        }),
      }),
    );
    actuality.push(
      await prepareContextActuality({
        testDb,
        dataActuality: newsEntityFactory({
          ...dataActuality,
          tags: [NewsTags.NOMENCLATURE, NewsTags.LEGAL],
        }),
      }),
    );
    actuality.push(
      await prepareContextActuality({
        testDb,
        dataActuality: newsEntityFactory({
          ...dataActuality,
          tags: [NewsTags.NOMENCLATURE],
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
    const { status, body } = await request(testApp)
      .get(`/api/actuality`)
      .query({
        tags: `${NewsTags.NOMENCLATURE},${NewsTags.TAXES}`,
      })
      .set('Authorization', `Bearer ${accessToken}`);
    expect(status).toBe(200);

    expect(body.actualities.length).toBe(5);
    expect(body.actualities).toMatchObject([
      {
        id: actuality[1].id,
      },
      {
        id: actuality[2].id,
      },
      {
        id: actuality[3].id,
      },
      {
        id: actuality[4].id,
      },
      {
        id: actuality[5].id,
      },
    ]);
  });
  it('should return 200 with empty array', async () => {
    const { accessToken } = await prepareContextUser({ testDb });
    await prepareContextActuality({ testDb });
    const actuality = await prepareContextActuality({ testDb, saveActuality: false });

    const { status, body } = await request(testApp)
      .get(`/api/actuality`)
      .query({
        search: `${actuality.id.slice(0, 6)}`,
      })
      .set('Authorization', `Bearer ${accessToken}`);

    expect(status).toBe(200);
    expect(body.actualities).toEqual([]);
  });
});
