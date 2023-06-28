import { useMutation } from 'react-query';

import { createFeedbackRequest } from '../lib/feedback';
import { CreateFeedbackParams, ErrorResponse } from '../lib/types';

export const useCreateFeedbackMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation<void, ErrorResponse, CreateFeedbackParams>(createFeedbackRequest, {
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
