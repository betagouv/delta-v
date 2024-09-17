import { NextFunction, Response } from 'express';
import { agentConnectService } from '../../../../core/agentConnect/client';
import { ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { service } from './service';

type LogoutRequest = ValidatedRequest<Request>;

export default (req: LogoutRequest, res: Response, next: NextFunction): void => {
  try {
    const idToken = req.session?.idToken;
    if (!idToken) {
      res.status(400).json({ error: 'No active session' });
      return;
    }

    const { logoutUrl, state } = service({ idToken, agentConnectService });

    // Stocker le state dans la session
    req.session.logoutState = state;

    res.redirect(logoutUrl);
  } catch (error) {
    return next(error);
  }
};
