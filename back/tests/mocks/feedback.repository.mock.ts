import { Feedback } from '../../src/entities/feedback.entity';
import { AppDataSource } from '../../src/loader/database';
import {
  FeedbackRepository,
  FeedbackRepositoryInterface,
} from '../../src/repositories/feedback.repository';

interface FeedbackRepositoryMockOptions {
  getOne?: Feedback;
}

export const feedbackRepositoryMock = (
  options: FeedbackRepositoryMockOptions,
): FeedbackRepositoryInterface => {
  const feedbackRepository = AppDataSource.manager.withRepository(FeedbackRepository);
  feedbackRepository.createOne = jest.fn().mockResolvedValue(undefined);
  feedbackRepository.getOneById = jest.fn().mockResolvedValue(options.getOne);
  return feedbackRepository;
};
