import { AxiosResponse } from 'axios';

export type TAgeCategory = 0 | 10 | 12 | 16 | 18 | null;

export interface ICommonResponse {
  message: string;
  code: string;
}

export interface IValidationError {
  name: string;
  message: string;
}

export interface IErrorResponse extends ICommonResponse {
  statusCode: number;
  context?: {
    validationErrors?: IValidationError[];
  };
}

export interface MutationSuccessCallback<T = ICommonResponse> {
  onSuccess?: (data: T) => void;
}

export interface MutationAxiosResponse<T = AxiosResponse<IErrorResponse, any>> {
  response: T;
}
