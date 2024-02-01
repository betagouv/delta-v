/* eslint-disable @typescript-eslint/unbound-method */
import { promises } from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { feedbackRepositoryMock } from '../../../mocks/feedback.repository.mock';
import { eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import { service } from '../../../../src/api/feedback/putFeedback/service';
import { s3MockService } from '../../../mocks/s3.service.mock';

describe('putFeedback service', () => {
  it('should put feedback correctly with file', async () => {
    const feedbackRepository = feedbackRepositoryMock({});
    const s3Service = s3MockService({ upload: 'fake upload' });
    const email = 'test@gmail.com';
    const userId = faker.string.uuid();
    const feedbackId = faker.string.uuid();
    const comment = 'test comment';

    const firstFilePath = path.resolve(__dirname, './assets/image.jpg');
    const file = {
      fieldname: 'file',
      originalname: 'image.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: await promises.readFile(firstFilePath),
      size: 10 * 1024 * 1024,
      destination: '',
      filename: 'image.jpg',
      path: '',
    };

    await service({
      feedbackId,
      email,
      userId,
      comment,
      feedbackRepository,
      eventEmitter: eventEmitterMock,
      file: file as Express.Multer.File,
      s3Service,
    });
    expect(feedbackRepository.createOne).toHaveBeenCalled();
    expect(eventEmitterMock.emitSendEmail).toHaveBeenCalled();
    expect(s3Service.upload).toHaveBeenCalled();
  });
  it('should put feedback correctly without file', async () => {
    const feedbackRepository = feedbackRepositoryMock({});
    const s3Service = s3MockService({ upload: 'fake upload' });
    const email = 'test@gmail.com';
    const userId = faker.string.uuid();
    const feedbackId = faker.string.uuid();
    const comment = 'test comment';

    await service({
      feedbackId,
      email,
      userId,
      comment,
      feedbackRepository,
      eventEmitter: eventEmitterMock,
      s3Service,
    });
    expect(feedbackRepository.createOne).toHaveBeenCalled();
    expect(eventEmitterMock.emitSendEmail).toHaveBeenCalled();
    expect(s3Service.upload).not.toHaveBeenCalled();
  });
});
