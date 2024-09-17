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
  try {
    const refreshToken = req.session.refreshToken;

    // Clear the session
    if (req.session) {
      await new Promise<void>((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Remove the refresh token from Redis
    if (refreshToken) {
      await redisClient.del(refreshToken);
    }
  } catch (error) {
    console.error('Error in logout callback service:', error);
    throw error;
  }
};
