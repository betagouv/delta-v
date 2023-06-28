import { ContactDetails, MeansOfTransportAndCountry } from '@/stores/declaration/appState.store';
import { ShoppingProduct } from '@/stores/simulator/appState.store';

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

export interface MutationAxiosResponse<T = IErrorResponse> {
  response: T;
}

export interface BaseAPIResponse {
  message: string;
  code: string;
}

export interface ValidationError {
  name: string;
  message: string;
}

export interface ErrorResponse extends BaseAPIResponse {
  statusCode: number;
  context?: {
    validationErrors?: ValidationError[];
  };
}

export type CreateFeedbackParams = {
  feedbackId: string;
  comment: string;
};

export type CreateDeclarationParams = {
  declarationId: string;
  contactDetails: ContactDetails;
  meansOfTransportAndCountry: MeansOfTransportAndCountry;
  shoppingProducts: ShoppingProduct[];
  border?: boolean;
};

export type ChangeStatusOfDeclarationParams = {
  declarationId: string;
  status: string;
};

export type GetOneDeclarationParams = {
  declarationId: string;
  contactDetails: ContactDetails;
  meansOfTransportAndCountry: MeansOfTransportAndCountry;
  shoppingProducts: ShoppingProduct[];
  border?: boolean;
};
