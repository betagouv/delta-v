import { useMutation, useQuery } from 'react-query';

import { createFavoriteRequest, getFavorites, removeFavoriteRequest } from '../lib/favorite';
import { CreateFavoriteParams, ErrorResponse, FavoriteResponse } from '../lib/types';

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

export const useFavorites = ({ onSuccess }: { onSuccess?: (data: FavoriteResponse[]) => void }) => {
  return useQuery(['favorite'], () => getFavorites(), {
    keepPreviousData: true,
    onSuccess(data: FavoriteResponse[]) {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};
