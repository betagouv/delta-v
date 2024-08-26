import { NextFunction, Response } from 'express';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { agentConnectService } from '../../../../core/agentConnect/client';

import { AppDataSource } from '../../../../loader/database';
import { UserRepository } from '../../../../repositories/user.repository';
import { HttpStatuses } from '../../../../core/httpStatuses';
import { IAuthenticateRequest } from './validator';

import { service } from './service';

type AuthenticateRequest = ValidatedRequest<IAuthenticateRequest>;

export default async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { code, state, nonce } = req.body;
    if (req.session && (state !== req.session.state || nonce !== req.session.nonce)) {
      throw new Error('Invalid state or nonce parameter');
    }

    const { idToken } = await service({
      code,
      state: req.session.state,
      nonce: req.session.nonce,
      agentConnectService,
      userRepository: AppDataSource.manager.withRepository(UserRepository),
    });

    // Après avoir vérifié l'id_token
    if (req.session) {
      req.session.idToken = idToken;
    }

    return res.status(HttpStatuses.OK).send();
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid state or nonce parameter') {
      return res.status(HttpStatuses.BAD_REQUEST).send({ error: 'Invalid authentication request' });
    }
    // Ajoutez d'autres cas d'erreur spécifiques à AgentConnect
    return next(error);
  }
};
