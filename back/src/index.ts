import { ILogger } from './core/logger';
import bootstrap from './loader';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      logger: ILogger;
    }
  }
}

void bootstrap();
