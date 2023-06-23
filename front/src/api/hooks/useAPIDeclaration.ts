import { useMutation, useQuery } from 'react-query';

import {
  changeStatusOfDeclarationRequest,
  ChangeStatusOfDeclarationResponse,
  createDeclarationRequest,
  CreateDeclarationResponse,
  getDeclaration,
  getDeclarations,
  getDeclarationWithPublicId,
} from '../lib/declaration';
import {
  ChangeStatusOfDeclarationParams,
  CreateDeclarationParams,
  ErrorResponse,
} from '../lib/types';
import { DeclarationResponse } from '@/stores/declaration/appState.store';

export type UseDeclarationParams = {
  limit?: number;
  offset?: number;
  search: string | null;
  searchPublicId: string | null;
  status?: string;
  meanOfTransports?: string;
  startDate?: Date;
  endDate?: Date;
};

export const useCreateDeclarationMutation = ({
  onSuccess,
}: {
  onSuccess?: (data: CreateDeclarationResponse) => void;
}) => {
  return useMutation<CreateDeclarationResponse, ErrorResponse, CreateDeclarationParams>(
    createDeclarationRequest,
    {
      onSuccess: (data: CreateDeclarationResponse) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    },
  );
};

export const useChangeStatusOfDeclarationMutation = ({
  onSuccess,
}: {
  onSuccess?: (data: ChangeStatusOfDeclarationResponse) => void;
}) => {
  return useMutation<
    ChangeStatusOfDeclarationResponse,
    ErrorResponse,
    ChangeStatusOfDeclarationParams
  >(changeStatusOfDeclarationRequest, {
    onSuccess: (data: ChangeStatusOfDeclarationResponse) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};

export const useDeclarationMutation = ({
  onSuccess,
}: {
  onSuccess?: (data: DeclarationResponse) => void;
}) => {
  return useMutation<DeclarationResponse, ErrorResponse, string>(getDeclaration, {
    onSuccess: (data: DeclarationResponse) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};

// QUERY
export const useDeclarationWithPublicId = (publicId: string) =>
  useQuery(['declaration', { publicId }], () => getDeclarationWithPublicId(publicId));

export const useDeclarations = ({
  limit,
  offset,
  search,
  status,
  meanOfTransports,
  startDate,
  endDate,
  searchPublicId = null,
}: UseDeclarationParams) => {
  return useQuery(
    [
      'declaration',
      limit,
      offset,
      search,
      status,
      meanOfTransports,
      startDate,
      endDate,
      searchPublicId,
    ],
    () =>
      getDeclarations({
        limit,
        offset,
        search,
        status,
        meanOfTransports,
        startDate,
        endDate,
        searchPublicId,
      }),
    {
      keepPreviousData: true,
    },
  );
};
