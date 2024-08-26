import { NextFunction, Response } from 'express';
import { agentConnectService } from '../../../../core/agentConnect/client';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { service } from './service';

type InitiateRequest = ValidatedRequest<Request>;

export default (req: InitiateRequest, res: Response, next: NextFunction): void => {
  try {
    const { state, nonce, authorizationUrl } = service({ agentConnectService });

    if (req.session) {
      req.session.state = state;
      req.session.nonce = nonce;
    }

    res.redirect(authorizationUrl);
  } catch (error) {
    return next(error);
  }
};
