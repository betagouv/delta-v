import { Redis } from 'ioredis';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { ILogoutCallbackRequest } from './validator';

interface ILogoutCallbackServiceOptions {
  req: ValidatedRequest<ILogoutCallbackRequest>;
  redisClient: Redis;
}

export const service = async ({
  req,
  redisClient,
}: ILogoutCallbackServiceOptions): Promise<void> => {
  const refreshToken = req.session.refreshToken;

  if (req.session) {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  if (refreshToken) {
    await redisClient.del(refreshToken);
  }
};
