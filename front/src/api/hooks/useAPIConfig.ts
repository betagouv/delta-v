import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getDefaultCountryRequest, putDefaultCountryRequest } from '../lib/config';
import { ErrorResponse, PutDefaultCountryParams } from '../lib/types';

export const usePutDefaultCountryMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation<void, ErrorResponse, PutDefaultCountryParams>(putDefaultCountryRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['defaultCountry'] });
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export const useGetDefaultCountry = () => useQuery('defaultCountry', getDefaultCountryRequest);
