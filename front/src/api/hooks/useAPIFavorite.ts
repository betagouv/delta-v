import { useMutation, useQuery } from 'react-query';

import { createFavoriteRequest, getFavorites, removeFavoriteRequest } from '../lib/favorite';
import { CreateFavoriteParams, ErrorResponse } from '../lib/types';

export const useCreateFavoriteMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation<void, ErrorResponse, CreateFavoriteParams>(createFavoriteRequest, {
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export const useRemoveFavoriteMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation<void, ErrorResponse, string>(removeFavoriteRequest, {
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export const useFavorites = ({ onSuccess }: { onSuccess?: (data: string[]) => void }) => {
  return useQuery(['favorite'], () => getFavorites(), {
    keepPreviousData: true,
    onSuccess(data: string[]) {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};
