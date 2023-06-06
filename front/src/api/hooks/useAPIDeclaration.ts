import { useMutation, useQuery } from 'react-query';

import {
  createDeclarationRequest,
  CreateDeclarationResponse,
  getDeclaration,
} from '../lib/declaration';
import { CreateDeclarationParams, ErrorResponse } from '../lib/types';

export const useCreateDeclarationMutation = ({
  onSuccess,
}: {
  onSuccess?: (data: CreateDeclarationResponse) => void;
}) => {
  return useMutation<CreateDeclarationResponse, ErrorResponse, CreateDeclarationParams>(
    (params: CreateDeclarationParams) => createDeclarationRequest(params),
    {
      onSuccess: (data: CreateDeclarationResponse) => {
        if (onSuccess) {
          onSuccess(data);
        }
      },
    },
  );
};

// QUERY
export const useDeclaration = (id: string) =>
  useQuery(['declaration', { id }], () => getDeclaration(id));
