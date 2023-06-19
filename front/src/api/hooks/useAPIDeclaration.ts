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

export type UseDeclarationParams = {
  limit?: number;
  offset?: number;
  search: string | null;
  searchPublicId: string | null;
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

// QUERY
export const useDeclaration = (id: string) =>
  useQuery(['declaration', { id }], () => getDeclaration(id));

export const useDeclarationWithPublicId = (publicId: string) =>
  useQuery(['declaration', { publicId }], () => getDeclarationWithPublicId(publicId));

export const useDeclarations = ({
  limit,
  offset,
  search,
  searchPublicId = null,
}: UseDeclarationParams) => {
  return useQuery(
    ['declaration', limit, offset, search, searchPublicId],
    () => getDeclarations({ limit, offset, search, searchPublicId }),
    {
      keepPreviousData: true,
    },
  );
};
