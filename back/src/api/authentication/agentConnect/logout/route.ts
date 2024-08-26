import { NextFunction, Response } from 'express';
import { agentConnectService } from '../../../../core/agentConnect/client';
import { CustomSession, ValidatedRequest } from '../../../../core/utils/validatedExpressRequest';
import { service } from './service';

type LogoutRequest = ValidatedRequest<Request>;

export default (req: LogoutRequest, res: Response, next: NextFunction): void => {
  try {
    const idToken = req.session?.idToken;
    if (!idToken) {
      res.status(400).json({ error: 'No active session' });
      return;
    }

    const { logoutUrl } = service({ idToken, agentConnectService });

    // Effacer la session
    if (req.session) {
      req.session = {} as CustomSession;
    }

    res.redirect(logoutUrl);
  } catch (error) {
    return next(error);
  }
};
