/* eslint-disable @typescript-eslint/unbound-method */
import { faker } from '@faker-js/faker';
import { feedbackRepositoryMock } from '../../../mocks/feedback.repository.mock';
import { eventEmitterMock } from '../../../mocks/eventEmitter.mock';
import { service } from '../../../../src/api/feedback/putFeedback/service';

describe('putFeedback service', () => {
  it('should put feedback correctly', async () => {
    const feedbackRepository = feedbackRepositoryMock({});
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
    });
    expect(feedbackRepository.createOne).toBeCalled();
  });
});
