import { NextFunction, Response } from 'express';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { agentConnectService } from '../../../../core/agentConnect/client';
import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { getRedisConnection } from '../../../../loader/redis'; // Import the Redis connection
import { IAuthenticateRequest } from './validator';
import { service } from './service';

type AuthenticateRequest = ValidatedRequest<IAuthenticateRequest>;

export default async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { state } = req.query;
    const nonce = req.session.nonce;

    if (!state || state !== req.session.state || !nonce) {
      throw new Error('Invalid state or nonce parameter');
    }

    const redisClient = getRedisConnection();

    const { idToken, accessToken, refreshToken } = await service({
      req,
      state,
      nonce,
      agentConnectService,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
      redisClient,
    });

    // Après avoir vérifié l'id_token
    if (req.session) {
      req.session.idToken = idToken;
      req.session.refreshToken = refreshToken;
    }

    return res.send({ accessToken, refreshToken }).status(HttpStatuses.OK);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid state or nonce parameter') {
      return res.status(HttpStatuses.BAD_REQUEST).send({ error: 'Invalid authentication request' });
    }
    return next(error);
    // Ajoutez d'autres cas d'erreur spécifiques à AgentConnect
  }
};
