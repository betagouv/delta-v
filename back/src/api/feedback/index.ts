import { Router } from 'express';
import { putFeedback } from './putFeedback';

export const feedbackRouter = Router().use(putFeedback);
