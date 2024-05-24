import path from 'path';
import type { Express } from 'express';
import request from 'supertest';

import { faker } from '@faker-js/faker';
import { testDbManager } from '../../../helpers/testDb.helper';
import buildTestApp from '../../../helpers/testApp.helper';
import { HttpStatuses } from '../../../../src/core/httpStatuses';
import { AppDataSource } from '../../../../src/loader/database';
import { ResponseCodes } from '../../../../src/api/common/enums/responseCodes.enum';
import { prepareContextUser } from '../../../helpers/prepareContext/user';
import { clearEventEmitterMock, eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import api from '../../../../src/api';
import { FeedbackRepository } from '../../../../src/repositories/feedback.repository';
import { S3Service } from '../../../../src/api/feedback/putFeedback/services/s3.service';

const testDb = testDbManager();

describe('putFeedback route', () => {
  let testApp: Express;

  beforeAll(async () => {
    await testDb.connect();
    testApp = buildTestApp(api);
  });

  beforeEach(async () => {
    await testDb.clear();
    clearEventEmitterMock();
  });

  afterAll(async () => {
    await testDb.disconnect();
  });

  test('should return success with code 200', async () => {
    const { accessToken, user } = await prepareContextUser({ testDb });

    const comment = 'test comment';
    const feedbackId = faker.string.uuid();

    const spy = jest.spyOn<any, string>(S3Service.prototype, 'upload').mockImplementation(() => ({
      Location: 'fake url',
    }));

    const firstFilePath = path.resolve(__dirname, './assets/image.jpg');
    const { status, body } = await request(testApp)
      .put(`/api/feedback/${feedbackId}`)
      .field({ comment })
      .set('Content-Type', 'multipart/form-data')
      .attach('file', firstFilePath)
      .set('Authorization', `Bearer ${accessToken}`);

    spy.mockClear();

    expect(status).toBe(HttpStatuses.OK);
    expect(body.code).toEqual(ResponseCodes.FEEDBACK_UPDATED);

    const storedFeedback = await AppDataSource.manager
      .withRepository(FeedbackRepository)
      .getOneById(feedbackId);

    expect(storedFeedback).toBeDefined();
    if (storedFeedback) {
      expect(storedFeedback.email).toEqual(user.email);
      expect(storedFeedback.comment).toEqual(comment);
      expect(storedFeedback.userId).toEqual(user.id);
      expect(storedFeedback.pictureUrl).toEqual('fake url');
    }

    expect(eventEmitterMock.emitSendEmail.mock.calls.length).toBe(1);
  });
});
