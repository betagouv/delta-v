import type { Alpha2Code } from 'i18n-iso-countries';

import { ContactDetails, MeansOfTransportAndCountry } from '@/stores/declaration/appState.store';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

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

export interface FavoriteResponse {
  productId: string;
  name: string;
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
  file?: File;
};

export type CreateFavoriteParams = {
  productId: string;
  name: string;
};

export type CreateDeclarationParams = {
  declarationId: string;
  contactDetails: ContactDetails;
  meansOfTransportAndCountry: MeansOfTransportAndCountry;
  shoppingProducts: ShoppingProduct[];
  border?: boolean;
  authorType?: 'agent' | 'user';
};

export type ChangeStatusOfDeclarationParams = {
  declarationId: string;
  status: DeclarationStatus;
};

export type GetOneDeclarationParams = {
  declarationId: string;
  contactDetails: ContactDetails;
  meansOfTransportAndCountry: MeansOfTransportAndCountry;
  shoppingProducts: ShoppingProduct[];
  border?: boolean;
};

export type PutDefaultCountryParams = {
  country: Alpha2Code | null;
};
