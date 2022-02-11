import { Response, NextFunction, Request } from 'express';
import { getCustomRepository } from 'typeorm';
import { HttpStatuses } from '../../core/httpStatuses';
import TestRepository from '../../repositories/test.repository';
import serializer from './serializer';

import service from './service';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const testId = await service(getCustomRepository(TestRepository));

    const response = serializer(testId);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
