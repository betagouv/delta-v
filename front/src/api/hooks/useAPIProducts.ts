import { useMutation, useQuery } from 'react-query';

import {
  PutSearchProductHistoryParams,
  getSearchProductHistoryRequest,
  putSearchProductHistoryRequest,
} from '../lib/products';
import { ErrorResponse, ICommonResponse } from '../lib/types';

export const useGetSearchProductHistory = () => useQuery('user', getSearchProductHistoryRequest);

export const usePutSearchProductHistoryMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation<ICommonResponse, ErrorResponse, PutSearchProductHistoryParams>(
    putSearchProductHistoryRequest,
    {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
      },
    },
  );
};
