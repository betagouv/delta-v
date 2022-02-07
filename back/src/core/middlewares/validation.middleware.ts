/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema, ValidationResult, ValidationOptions, ValidationError } from 'joi';

import { HttpStatuses } from '../httpStatuses';

const DEFAULT_ERROR_MESSAGE = 'Bad Request';
const DEFAULT_ERROR_CODE = 'bad-request';

const JOI_OPTIONS: ValidationOptions = { abortEarly: false };

export interface IRequestValidatorSchema {
  headers?: ObjectSchema<any>;
  params?: ObjectSchema<any>;
  query?: ObjectSchema<any>;
  cookies?: ObjectSchema<any>;
  body?: ObjectSchema<any>;
  file?: ObjectSchema<any>;
}

interface IErrorResponse {
  message: string;
  code: string;
  statusCode: number;
  context: {
    validationErrors: {
      name: string | undefined;
      message: string;
      path: (string | number)[];
      type: string;
    }[];
  };
}

function buildValidator(schema: IRequestValidatorSchema): ObjectSchema<IRequestValidatorSchema> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Joi.object({
    headers: Joi.any(),
    params: Joi.any(),
    query: Joi.any(),
    cookies: Joi.any(),
    body: Joi.any(),
    file: Joi.any(),
    ...schema,
  })
    .required()
    .min(1);
}

const buildErrorMessage = (options: IValidationMiddlewareOptions | undefined): string =>
  options?.message ?? DEFAULT_ERROR_MESSAGE;

const buildErrorResponse = (
  error: ValidationError,
  options: IValidationMiddlewareOptions | undefined,
): IErrorResponse => ({
  message: buildErrorMessage(options),
  code: options?.code || DEFAULT_ERROR_CODE,
  statusCode: HttpStatuses.BAD_REQUEST,
  context: {
    validationErrors: error.details.map((detail) => ({
      name: detail.context?.key,
      message: detail.message,
      path: detail.path,
      type: detail.type,
    })),
  },
});

function validate(
  validator: ObjectSchema<IRequestValidatorSchema>,
  data: any,
): ValidationResult['value'] {
  const result = validator.validate(data, JOI_OPTIONS);

  if (result.error) {
    throw result.error;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result.value;
}

interface IExtendedRequest extends Request {
  file?: any;
}

export interface IValidationMiddlewareOptions {
  message?: string;
  code?: string;
}

/**
 * Build validation middleware.
 * @param schema Joi validator schema or schema builder function (allows to use TranslationFunction when generating error messages)
 * @param options.message Message content or function that responds with message
 * @param options.code Error code
 */
export function buildValidationMiddleware(
  schema: IRequestValidatorSchema,
  options?: IValidationMiddlewareOptions,
) {
  return function validationMiddleware(
    request: IExtendedRequest,
    response: Response,
    next: NextFunction,
  ): Response | void {
    const { headers, params, query, body, cookies, file } = request;

    try {
      const validator = buildValidator(schema);

      const validationResult = validate(validator, {
        headers,
        params,
        query,
        body,
        cookies,
        file,
      });

      request.headers = validationResult.headers;
      request.params = validationResult.params;
      request.query = validationResult.query;
      request.cookies = validationResult.cookies;
      request.body = validationResult.body;
      request.file = validationResult.file;

      return next();
    } catch (error: any) {
      if (error.isJoi && error instanceof ValidationError) {
        const validationResponse = buildErrorResponse(error, options);

        // request.logger.warn({
        //   message: 'Validation failed',
        //   context: { validationResponse },
        // });

        return response.status(HttpStatuses.BAD_REQUEST).send(validationResponse);
      }

      return next(error);
    }
  };
}
