import type { RequestHandler } from 'express';
import cors from 'cors';

export const corsMiddleware: RequestHandler = cors();
