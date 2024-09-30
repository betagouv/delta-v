import { Request, Response, NextFunction } from 'express';
import { CustomSession } from '../../src/core/utils/validatedExpressRequest';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const testSessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/api/set-session-for-test' && req.method === 'POST') {
    const sessionData = req.body as Partial<CustomSession>;
    Object.assign(req.session, sessionData);
    res.sendStatus(200);
  } else {
    next();
  }
};
