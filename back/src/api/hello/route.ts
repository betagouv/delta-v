import { Response, NextFunction, Request } from 'express';
import { HttpStatuses } from '../../core/httpStatuses';
import serializer from './serializer';

import service from './service';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const testId = await service();

    const response = serializer(testId);

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
