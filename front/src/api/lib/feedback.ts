import axios from 'axios';

import { CreateFeedbackParams } from './types';

export const createFeedbackRequest = async (params: CreateFeedbackParams): Promise<void> => {
  console.log('🚀 ~ createFeedbackRequest ~ params:', params);
  const formData = new FormData();

  formData.append('comment', params.comment);

  if (params.file) {
    formData.append('file', params.file);
  }

  await axios.put(`/feedback/${params.feedbackId}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
