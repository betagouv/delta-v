import { Response, NextFunction, Request } from 'express';
import { getRepository } from 'typeorm';
import { HttpStatuses } from '../../core/httpStatuses';
import TestEntity from '../../entities/test.entity';
import serializer from './serializer';

import service from './service';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const testId = await service(getRepository(TestEntity));

    const response = serializer(testId);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
