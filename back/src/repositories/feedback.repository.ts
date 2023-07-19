import { Repository } from 'typeorm';
import { AppDataSource } from '../loader/database';
import { Feedback, FeedbackEntity } from '../entities/feedback.entity';

export type FeedbackRepositoryInterface = {
  createOne(feedback: Feedback): Promise<void>;
  getOneById(id: string): Promise<Feedback | null>;
} & Repository<FeedbackEntity>;

export const FeedbackRepository: FeedbackRepositoryInterface = AppDataSource.getRepository(
  FeedbackEntity,
).extend({
  async createOne(feedback: Feedback): Promise<void> {
    await this.save(feedback);
  },
  async getOneById(id: string): Promise<Feedback | null> {
    return await this.createQueryBuilder('feedback').where('feedback.id = :id', { id }).getOne();
  },
});
