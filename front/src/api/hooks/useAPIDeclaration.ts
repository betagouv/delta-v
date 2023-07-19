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
import { DeclarationStatus } from '@/utils/declarationStatus.util';

export type UseDeclarationParams = {
  limit?: number;
  offset?: number;
  search: string | null;
  searchPublicId: string | null;
  status?: string;
  meanOfTransports?: string;
  startDate?: Date;
  endDate?: Date;
  onSuccess?: (data: DeclarationResponse[]) => void;
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

interface OnSuccessChangeStatusOptions {
  data: ChangeStatusOfDeclarationResponse;
  newStatus: DeclarationStatus;
}

interface OnSuccessGetDeclarationOptions {
  data: DeclarationResponse;
  newStatus?: DeclarationStatus;
}

export const useChangeStatusOfDeclarationMutation = ({
  onSuccess,
}: {
  onSuccess?: ({ data, newStatus }: OnSuccessChangeStatusOptions) => void;
}) => {
  return useMutation<
    ChangeStatusOfDeclarationResponse,
    ErrorResponse,
    ChangeStatusOfDeclarationParams
  >(changeStatusOfDeclarationRequest, {
    onSuccess: (data: ChangeStatusOfDeclarationResponse, params) => {
      if (onSuccess) {
        onSuccess({ data, newStatus: params.status });
      }
    },
  });
};

export const useDeclarationMutation = ({
  onSuccess,
}: {
  onSuccess?: ({ data, newStatus }: OnSuccessGetDeclarationOptions) => void;
}) => {
  return useMutation<
    DeclarationResponse,
    ErrorResponse,
    { id: string; fromNewStatus?: DeclarationStatus }
  >(getDeclaration, {
    onSuccess: (data: DeclarationResponse, params) => {
      if (onSuccess) {
        onSuccess({ data, newStatus: params.fromNewStatus });
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
  onSuccess,
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
      onSuccess(data: DeclarationResponse[]) {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    },
  );
};
