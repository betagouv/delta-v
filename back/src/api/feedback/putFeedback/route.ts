import { Response, NextFunction } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import { AppDataSource } from '../../../loader/database';
import { FeedbackRepository } from '../../../repositories/feedback.repository';
import { eventEmitter } from '../../../core/eventManager/eventManager';
import { serializePutFeedback } from './serializer';
import { service } from './service';

import { PutFeedbackRequest } from './validator';

type PutDeclaration = ValidatedRequest<PutFeedbackRequest>;

export default async (
  req: PutDeclaration,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { feedbackId } = req.params;
    const { comment } = req.body;

    const { email, userId } = req.jwt;

    await service({
      feedbackId,
      comment,
      email,
      userId,
      feedbackRepository: AppDataSource.manager.withRepository(FeedbackRepository),
      eventEmitter,
    });

    const response = serializePutFeedback();

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
