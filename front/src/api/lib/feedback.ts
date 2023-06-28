import axios from 'axios';

import { CreateFeedbackParams } from './types';

export const createFeedbackRequest = async (params: CreateFeedbackParams): Promise<void> => {
  const bodyParams = {
    comment: params.comment,
  };

  await axios.put(`/feedback/${params.feedbackId}/`, bodyParams);
};
